"""Data model, validation and conversion for `dmx:` configurations.

The rules mirror CONFIG_SCHEMA in custom_components/dmx/setup/config_processor.py of
https://github.com/Breina/ha-artnet-led.
This module is intentionally free of Home Assistant imports so it can be unit tested.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
import re
from typing import Any

from .fixtures import find_fixture, find_mode
from .model_common import (
    ConfigFormatError,
    _as_dict,
    _as_list,
    _compact,
    _opt_bool,
    _opt_number,
    _opt_str,
)

DMX_DOMAIN = "dmx"
CURVES = ("linear", "quadratic", "cubic", "quartic", "sine")
DEFAULT_FOLDER = "fixtures"
DMX_CHANNELS = 512
MAX_START_ADDRESS = 511
PREFIX_PATTERN = re.compile(r"^[a-z0-9_]+$")

ARTNET_DEFAULT_PORT = 6454
SACN_DEFAULT_PORT = 5568

_PROTOCOL_KEYS = {
    "artnet": ("refresh_every", "rate_limit"),
    "sacn": (
        "source_name",
        "priority",
        "interface_ip",
        "sync_address",
        "multicast_ttl",
        "enable_preview_data",
        "refresh_every",
        "rate_limit",
    ),
}


def empty_config() -> dict[str, Any]:
    return {
        "fixtures_folder": DEFAULT_FOLDER,
        "artnet": {"universes": []},
        "sacn": {"universes": []},
    }


def _extra(data: Mapping[str, Any], known: Iterable[str]) -> dict[str, Any] | None:
    extra = data.get("_extra")
    result = dict(extra) if isinstance(extra, Mapping) else {}
    reserved = {*known, "_extra"}
    result.update({key: value for key, value in data.items() if key not in reserved})
    return result or None


# --------------------------------------------------------------------------- #
# Normalization (structural, lenient - used for storage/autosave)
# --------------------------------------------------------------------------- #


def _hosts(raw: Any, path: list[str | int]) -> list[dict[str, Any]]:
    result = []
    for index, item in enumerate(_as_list(raw, path)):
        data = _as_dict(item, [*path, index])
        result.append(
            _compact(
                {
                    "host": _opt_str(data.get("host"), [*path, index, "host"]) or "",
                    "port": _opt_number(data.get("port"), [*path, index, "port"], integer=True),
                    "_extra": _extra(data, {"host", "port"}),
                }
            )
        )
    return result


def _output_correction(raw: Any, path: list[str | int]) -> dict[str, Any] | None:
    if raw is None or raw == "":
        return None
    if isinstance(raw, str):
        return {"curve": raw.strip()}
    data = _as_dict(raw, path)
    result = _compact(
        {
            "curve": _opt_str(data.get("curve"), [*path, "curve"]),
            "min": _opt_number(data.get("min"), [*path, "min"], integer=False),
            "max": _opt_number(data.get("max"), [*path, "max"], integer=False),
            "_extra": _extra(data, {"curve", "min", "max"}),
        }
    )
    return result or None


def normalize_device(raw: Any, path: list[str | int]) -> dict[str, Any]:
    data = _as_dict(raw, path)
    start = _opt_number(data.get("start_address"), [*path, "start_address"], integer=True)
    return _compact(
        {
            "name": _opt_str(data.get("name"), [*path, "name"]) or "",
            "start_address": 1 if start is None else start,
            "fixture": _opt_str(data.get("fixture"), [*path, "fixture"]) or "",
            "mode": _opt_str(data.get("mode"), [*path, "mode"]),
            "entity_id_prefix": _opt_str(data.get("entity_id_prefix"), [*path, "entity_id_prefix"]),
            "output_correction": _output_correction(
                data.get("output_correction"), [*path, "output_correction"]
            ),
            "_extra": _extra(
                data,
                {
                    "name",
                    "start_address",
                    "fixture",
                    "mode",
                    "entity_id_prefix",
                    "output_correction",
                },
            ),
        }
    )


def _devices(raw: Any, path: list[str | int]) -> list[dict[str, Any]]:
    return [
        normalize_device(device, [*path, index]) for index, device in enumerate(_as_list(raw, path))
    ]


def _artnet_universe(raw: Any, path: list[str | int]) -> dict[str, Any]:
    data = _as_dict(raw, path)

    def number(key: str, default: int) -> int:
        value = _opt_number(data.get(key), [*path, key], integer=True)
        return default if value is None else int(value)

    return _compact(
        {
            "net": number("net", 0),
            "subnet": number("subnet", 0),
            "universe": number("universe", 0),
            "send_partial_universe": _opt_bool(
                data.get("send_partial_universe"), [*path, "send_partial_universe"]
            ),
            "manual_nodes": _hosts(data.get("manual_nodes"), [*path, "manual_nodes"]),
            "devices": _devices(data.get("devices"), [*path, "devices"]),
            "_extra": _extra(
                data,
                {
                    "net",
                    "subnet",
                    "universe",
                    "send_partial_universe",
                    "manual_nodes",
                    "devices",
                    "_compatibility_extra",
                },
            ),
            "_compatibility_extra": data.get("_compatibility_extra"),
        }
    )


def _sacn_universe(raw: Any, path: list[str | int]) -> dict[str, Any]:
    data = _as_dict(raw, path)
    universe = _opt_number(data.get("universe"), [*path, "universe"], integer=True)
    return _compact(
        {
            "universe": 1 if universe is None else universe,
            "unicast_addresses": _hosts(
                data.get("unicast_addresses"), [*path, "unicast_addresses"]
            ),
            "devices": _devices(data.get("devices"), [*path, "devices"]),
            "_extra": _extra(
                data, {"universe", "unicast_addresses", "devices", "_compatibility_extra"}
            ),
            "_compatibility_extra": data.get("_compatibility_extra"),
        }
    )


def _protocol(raw: Any, path: list[str | int], kind: str) -> dict[str, Any]:
    data = _as_dict(raw or {}, path)
    result: dict[str, Any] = {}
    for key in _PROTOCOL_KEYS[kind]:
        key_path = [*path, key]
        if key in ("source_name", "interface_ip"):
            result[key] = _opt_str(data.get(key), key_path)
        elif key == "enable_preview_data":
            result[key] = _opt_bool(data.get(key), key_path)
        else:
            result[key] = _opt_number(
                data.get(key), key_path, integer=key not in ("refresh_every", "rate_limit")
            )
    universe_factory = _artnet_universe if kind == "artnet" else _sacn_universe
    result["universes"] = [
        universe_factory(universe, [*path, "universes", index])
        for index, universe in enumerate(_as_list(data.get("universes"), [*path, "universes"]))
    ]
    result["_extra"] = _extra(data, {*_PROTOCOL_KEYS[kind], "universes"})
    return _compact(result)


def normalize_config(raw: Any) -> dict[str, Any]:
    """Return a cleaned copy of a dmx UI config. Raises ConfigFormatError on bad structure."""
    if raw is None:
        return empty_config()
    data = _as_dict(raw, [])
    return _compact(
        {
            "fixtures_folder": _opt_str(data.get("fixtures_folder"), ["fixtures_folder"])
            or DEFAULT_FOLDER,
            "max_fps": _opt_number(data.get("max_fps"), ["max_fps"], integer=True),
            "fixtures_extra": data.get("fixtures_extra"),
            "animation_extra": data.get("animation_extra"),
            "artnet": _protocol(data.get("artnet"), ["artnet"], "artnet"),
            "sacn": _protocol(data.get("sacn"), ["sacn"], "sacn"),
            "_extra": _extra(
                data,
                {
                    "fixtures_folder",
                    "max_fps",
                    "fixtures_extra",
                    "animation_extra",
                    "artnet",
                    "sacn",
                },
            ),
        }
    )


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #


def port_address_label(universe: Mapping[str, Any]) -> str:
    net, subnet, number = universe.get("net", 0), universe.get("subnet", 0), universe["universe"]
    return str(number) if not net and not subnet else f"{net}/{subnet}/{number}"


def iter_universes(config: Mapping[str, Any]) -> Iterable[tuple[str, int, Mapping[str, Any]]]:
    for protocol in ("artnet", "sacn"):
        for index, universe in enumerate(config.get(protocol, {}).get("universes", [])):
            yield protocol, index, universe


def device_width(
    device: Mapping[str, Any], fixtures: Iterable[Mapping[str, Any]] | None
) -> int | None:
    """DMX footprint of a device, or None if the fixture/mode is unknown."""
    if fixtures is None:
        return None
    fixture = find_fixture(fixtures, str(device.get("fixture") or ""))
    if fixture is None:
        return None
    mode = find_mode(fixture, device.get("mode"))
    return None if mode is None else int(mode["width"])


# --------------------------------------------------------------------------- #
# Strict validation (used before deploy)
# --------------------------------------------------------------------------- #


def _issue(
    path: list[str | int], code: str, message: str, severity: str = "error"
) -> dict[str, Any]:
    return {"path": path, "code": code, "message": message, "severity": severity}


def _range(
    issues: list[dict[str, Any]], value: Any, path: list[str | int], low: float, high: float
) -> bool:
    if value is None:
        return True
    if not isinstance(value, (int, float)) or isinstance(value, bool) or not low <= value <= high:
        issues.append(_issue(path, "range", f"must be between {low:g} and {high:g}"))
        return False
    return True


def _validate_hosts(issues: list[dict[str, Any]], hosts: Any, path: list[str | int]) -> None:
    for index, host in enumerate(hosts or []):
        if not str(host.get("host") or "").strip():
            issues.append(_issue([*path, index, "host"], "required", "host is required"))
        _range(issues, host.get("port"), [*path, index, "port"], 1, 65535)


def _validate_device(
    issues: list[dict[str, Any]],
    device: Mapping[str, Any],
    path: list[str | int],
    fixtures: list[Mapping[str, Any]] | None,
) -> int | None:
    if not str(device.get("name") or "").strip():
        issues.append(_issue([*path, "name"], "required", "name is required"))
    start_ok = _range(
        issues, device.get("start_address"), [*path, "start_address"], 1, MAX_START_ADDRESS
    )
    prefix = device.get("entity_id_prefix")
    if prefix is not None and not PREFIX_PATTERN.match(str(prefix)):
        issues.append(
            _issue([*path, "entity_id_prefix"], "prefix", "use lowercase letters, digits and _")
        )

    correction = device.get("output_correction")
    if correction:
        curve = correction.get("curve")
        if curve is not None and curve not in CURVES:
            issues.append(
                _issue(
                    [*path, "output_correction", "curve"],
                    "choice",
                    f"must be one of: {', '.join(CURVES)}",
                )
            )
        low_ok = _range(issues, correction.get("min"), [*path, "output_correction", "min"], 0, 1)
        high_ok = _range(issues, correction.get("max"), [*path, "output_correction", "max"], 0, 1)
        low, high = correction.get("min"), correction.get("max")
        if low_ok and high_ok and low is not None and high is not None and low >= high:
            issues.append(
                _issue([*path, "output_correction", "min"], "min_max", "min must be below max")
            )

    fixture_name = str(device.get("fixture") or "").strip()
    if not fixture_name:
        issues.append(_issue([*path, "fixture"], "required", "fixture is required"))
        return None
    if fixtures is None:
        return None
    fixture = find_fixture(fixtures, fixture_name)
    if fixture is None:
        issues.append(
            _issue(
                [*path, "fixture"],
                "fixture_unknown",
                f"fixture '{fixture_name}' is not in the fixtures folder",
                "warning",
            )
        )
        return None
    mode = find_mode(fixture, device.get("mode"))
    if mode is None:
        modes = ", ".join(str(m.get("key", m["name"])) for m in fixture["modes"])
        issues.append(_issue([*path, "mode"], "mode_unknown", f"must be one of: {modes}"))
        return None
    if not mode.get("exact", True):
        issues.append(
            _issue(
                [*path, "mode"],
                "width_estimated",
                "channel count of this mode could only be estimated",
                "warning",
            )
        )
    width = int(mode["width"])
    start = device.get("start_address")
    if start_ok and isinstance(start, int) and start + width - 1 > DMX_CHANNELS:
        issues.append(
            _issue(
                [*path, "start_address"],
                "overflow",
                f"device ends at channel {start + width - 1} (> {DMX_CHANNELS})",
            )
        )
    return width


def validate_config(
    config: Mapping[str, Any], fixtures: list[Mapping[str, Any]] | None = None
) -> list[dict[str, Any]]:
    """Return problems that would make DMX reject or misbehave on the config.

    `fixtures` is the list of fixture summaries (see fixtures.py). If omitted,
    fixture/mode/footprint checks are skipped.
    """
    issues: list[dict[str, Any]] = []
    if not str(config.get("fixtures_folder") or "").strip():
        issues.append(_issue(["fixtures_folder"], "required", "folder is required"))
    elif not is_safe_folder(str(config["fixtures_folder"])):
        issues.append(_issue(["fixtures_folder"], "folder", "must stay inside the config folder"))
    _range(issues, config.get("max_fps"), ["max_fps"], 1, 43)

    for protocol in ("artnet", "sacn"):
        settings = config.get(protocol, {})
        _range(issues, settings.get("refresh_every"), [protocol, "refresh_every"], 0, 9999)
        _range(issues, settings.get("rate_limit"), [protocol, "rate_limit"], 0, 9999)

    sacn = config.get("sacn", {})
    _range(issues, sacn.get("priority"), ["sacn", "priority"], 0, 200)
    _range(issues, sacn.get("multicast_ttl"), ["sacn", "multicast_ttl"], 1, 255)
    _range(issues, sacn.get("sync_address"), ["sacn", "sync_address"], 0, 63999)
    if len(str(sacn.get("source_name") or "")) > 63:
        issues.append(_issue(["sacn", "source_name"], "length", "max. 63 characters"))

    names: set[str] = set()
    prefixes: set[str] = set()
    seen_universes: dict[str, set[tuple[int, ...]]] = {"artnet": set(), "sacn": set()}

    for protocol, index, universe in iter_universes(config):
        universe_path: list[str | int] = [protocol, "universes", index]
        if protocol == "artnet":
            ok = all(
                [
                    _range(issues, universe.get("net"), [*universe_path, "net"], 0, 15),
                    _range(issues, universe.get("subnet"), [*universe_path, "subnet"], 0, 15),
                    _range(issues, universe.get("universe"), [*universe_path, "universe"], 0, 511),
                ]
            )
            ident: tuple[int, ...] = (
                universe.get("net", 0),
                universe.get("subnet", 0),
                universe.get("universe"),
            )
            _validate_hosts(issues, universe.get("manual_nodes"), [*universe_path, "manual_nodes"])
        else:
            ok = _range(issues, universe.get("universe"), [*universe_path, "universe"], 1, 63999)
            ident = (universe.get("universe"),)
            _validate_hosts(
                issues, universe.get("unicast_addresses"), [*universe_path, "unicast_addresses"]
            )
        if ok and ident in seen_universes[protocol]:
            issues.append(_issue([*universe_path, "universe"], "duplicate", "duplicate universe"))
        seen_universes[protocol].add(ident)

        occupied: list[tuple[int, int, str]] = []
        for device_index, device in enumerate(universe.get("devices", [])):
            device_path: list[str | int] = [*universe_path, "devices", device_index]
            width = _validate_device(issues, device, device_path, fixtures)

            name = str(device.get("name") or "").strip()
            if name:
                if name in names:
                    issues.append(_issue([*device_path, "name"], "duplicate", "duplicate name"))
                names.add(name)
            prefix = device.get("entity_id_prefix")
            if prefix:
                if prefix in prefixes:
                    issues.append(
                        _issue([*device_path, "entity_id_prefix"], "duplicate", "duplicate prefix")
                    )
                prefixes.add(prefix)

            start = device.get("start_address")
            if width and isinstance(start, int) and 1 <= start <= MAX_START_ADDRESS:
                end = start + width - 1
                for other_start, other_end, other_name in occupied:
                    if start <= other_end and other_start <= end:
                        issues.append(
                            _issue(
                                [*device_path, "start_address"],
                                "overlap",
                                f"channels {start}-{end} overlap with '{other_name}' "
                                f"({other_start}-{other_end})",
                            )
                        )
                        break
                occupied.append((start, end, name))

    return issues


def has_errors(issues: Iterable[Mapping[str, Any]]) -> bool:
    return any(issue.get("severity", "error") == "error" for issue in issues)


def used_fixtures(config: Mapping[str, Any]) -> set[str]:
    return {
        str(device["fixture"])
        for _, _, universe in iter_universes(config)
        for device in universe.get("devices", [])
        if device.get("fixture")
    }


# --------------------------------------------------------------------------- #
# Conversion to / from the `dmx:` YAML format
# --------------------------------------------------------------------------- #


def _host_entries(hosts: Iterable[Mapping[str, Any]], default_port: int) -> list[dict[str, Any]]:
    entries = []
    for host in hosts:
        entry: dict[str, Any] = dict(host.get("_extra") or {})
        entry["host"] = host["host"]
        if host.get("port") not in (None, default_port):
            entry["port"] = host["port"]
        entries.append(entry)
    return entries


def _device_entry(device: Mapping[str, Any]) -> dict[str, Any]:
    entry: dict[str, Any] = dict(device.get("_extra") or {})
    entry.update({"start_address": device["start_address"], "fixture": device["fixture"]})
    if device.get("mode"):
        entry["mode"] = device["mode"]
    if device.get("entity_id_prefix"):
        entry["entity_id_prefix"] = device["entity_id_prefix"]
    correction = device.get("output_correction")
    if correction:
        if set(correction) == {"curve"}:
            entry["output_correction"] = correction["curve"]
        else:
            entry["output_correction"] = {
                **(correction.get("_extra") or {}),
                **{key: value for key, value in correction.items() if key != "_extra"},
            }
    return {device["name"]: entry}


def is_safe_folder(folder: str) -> bool:
    """Relative path that stays inside the configuration directory."""
    normalized = folder.strip().replace("\\", "/")
    if not normalized or normalized.startswith("/") or re.match(r"^[A-Za-z]:", normalized):
        return False
    return ".." not in normalized.split("/")


def to_yaml_dict(config: Mapping[str, Any]) -> dict[str, Any]:
    """Convert a UI config into the value of the `dmx:` key."""
    result: dict[str, Any] = dict(config.get("_extra") or {})
    fixtures = dict(config.get("fixtures_extra") or {})
    fixtures["folder"] = config.get("fixtures_folder") or DEFAULT_FOLDER
    result["fixtures"] = fixtures
    animation = dict(config.get("animation_extra") or {})
    if config.get("max_fps") is not None:
        animation["max_fps"] = config["max_fps"]
    if animation:
        result["animation"] = animation

    for protocol in ("artnet", "sacn"):
        settings = config.get(protocol, {})
        universes = settings.get("universes", [])
        if not universes:
            continue
        block: dict[str, Any] = dict(settings.get("_extra") or {})
        block.update(
            {
                key: settings[key]
                for key in _PROTOCOL_KEYS[protocol]
                if settings.get(key) is not None
            }
        )
        entries = []
        for universe in universes:
            body: dict[str, Any] = dict(universe.get("_extra") or {})
            compatibility: dict[str, Any] = dict(universe.get("_compatibility_extra") or {})
            if protocol == "artnet":
                key: int | str = (
                    universe["universe"]
                    if not universe.get("net") and not universe.get("subnet")
                    else port_address_label(universe)
                )
                if universe.get("send_partial_universe") is False:
                    compatibility["send_partial_universe"] = False
                if universe.get("manual_nodes"):
                    compatibility["manual_nodes"] = _host_entries(
                        universe["manual_nodes"], ARTNET_DEFAULT_PORT
                    )
            else:
                key = universe["universe"]
                if universe.get("unicast_addresses"):
                    compatibility["unicast_addresses"] = _host_entries(
                        universe["unicast_addresses"], SACN_DEFAULT_PORT
                    )
            if compatibility:
                body["compatibility"] = compatibility
            body["devices"] = [_device_entry(device) for device in universe.get("devices", [])]
            entries.append({key: body})
        block["universes"] = entries
        result[protocol] = block
    return result


def _parse_port_address(key: Any, path: list[str | int]) -> dict[str, int]:
    if isinstance(key, bool):
        raise ConfigFormatError(path, "invalid port address")
    if isinstance(key, int):
        return {"net": 0, "subnet": 0, "universe": key}
    parts = str(key).strip().split("/")
    try:
        numbers = [int(part) for part in parts]
    except ValueError as err:
        raise ConfigFormatError(path, f"invalid port address '{key}'") from err
    if len(numbers) == 1:
        return {"net": 0, "subnet": 0, "universe": numbers[0]}
    if len(numbers) == 3:
        return {"net": numbers[0], "subnet": numbers[1], "universe": numbers[2]}
    raise ConfigFormatError(path, f"invalid port address '{key}'")


def _single_key(item: Any, path: list[str | int]) -> tuple[Any, Any]:
    data = _as_dict(item, path)
    if len(data) != 1:
        raise ConfigFormatError(path, "expected a single key")
    ((key, value),) = data.items()
    return key, value


def from_yaml(dmx: Any) -> dict[str, Any]:
    """Convert the value of an existing `dmx:` key into a UI config."""
    if dmx is None:
        return empty_config()
    data = _as_dict(dmx, ["dmx"])
    fixtures = _as_dict(data.get("fixtures") or {}, ["dmx", "fixtures"])
    animation = _as_dict(data.get("animation") or {}, ["dmx", "animation"])
    raw: dict[str, Any] = {
        "fixtures_folder": fixtures.get("folder"),
        "max_fps": animation.get("max_fps"),
        "fixtures_extra": _extra(fixtures, {"folder"}),
        "animation_extra": _extra(animation, {"max_fps"}),
        "_extra": _extra(data, {"fixtures", "animation", "artnet", "sacn"}),
    }
    for protocol in ("artnet", "sacn"):
        block = data.get(protocol)
        if block is None:
            continue
        block = _as_dict(block, ["dmx", protocol])
        settings: dict[str, Any] = {key: block.get(key) for key in _PROTOCOL_KEYS[protocol]}
        settings["_extra"] = _extra(block, {*_PROTOCOL_KEYS[protocol], "universes"})
        universes = []
        for index, item in enumerate(_as_list(block.get("universes"), [protocol, "universes"])):
            path: list[str | int] = [protocol, "universes", index]
            key, body = _single_key(item, path)
            body = _as_dict(body or {}, path)
            compatibility = _as_dict(body.get("compatibility") or {}, [*path, "compatibility"])
            devices = []
            for device_index, device_item in enumerate(
                _as_list(body.get("devices"), [*path, "devices"])
            ):
                name, device = _single_key(device_item, [*path, "devices", device_index])
                device_data = _as_dict(device or {}, [*path, "devices"])
                devices.append(
                    {
                        **device_data,
                        "name": name,
                        "_extra": _extra(
                            device_data,
                            {
                                "start_address",
                                "fixture",
                                "mode",
                                "entity_id_prefix",
                                "output_correction",
                            },
                        ),
                    }
                )
            if protocol == "artnet":
                universe = {
                    **_parse_port_address(key, path),
                    "send_partial_universe": compatibility.get("send_partial_universe"),
                    "manual_nodes": compatibility.get("manual_nodes"),
                    "_extra": _extra(body, {"compatibility", "devices"}),
                    "_compatibility_extra": _extra(
                        compatibility, {"send_partial_universe", "manual_nodes"}
                    ),
                }
            else:
                universe = {
                    "universe": key,
                    "unicast_addresses": compatibility.get("unicast_addresses"),
                    "_extra": _extra(body, {"compatibility", "devices"}),
                    "_compatibility_extra": _extra(compatibility, {"unicast_addresses"}),
                }
            universe["devices"] = devices
            universes.append(universe)
        settings["universes"] = universes
        raw[protocol] = settings
    return normalize_config(raw)
