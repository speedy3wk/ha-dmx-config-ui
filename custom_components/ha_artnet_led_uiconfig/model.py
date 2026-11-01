"""Data model, validation and conversion for ha-artnet-led configurations.

The rules mirror the PLATFORM_SCHEMA of https://github.com/Breina/ha-artnet-led.
This module is intentionally free of Home Assistant imports so it can be unit tested.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
import re
from typing import Any

PLATFORM = "artnet_led"

NODE_TYPES = ("artnet-direct", "artnet-controller", "sacn", "kinet")
DEVICE_TYPES = ("fixed", "binary", "dimmer", "color_temp", "rgb", "rgbw", "rgbww", "xy")
CORRECTIONS = ("linear", "quadratic", "cubic", "quadruple")
CHANNEL_SIZES = {"8bit": 1, "16bit": 2, "24bit": 3, "32bit": 4}
BYTE_ORDERS = ("big", "little")
TEMP_TYPES = ("color_temp", "rgbww")

ALLOWED_SETUP_CHARS = {
    "fixed": "",
    "binary": "",
    "dimmer": "d",
    "color_temp": "dcChHtT",
    "rgb": "drRgGbBuUwW",
    "rgbw": "drRgGbBuUwW",
    "rgbww": "dcChHtTrRgGbBuU",
    "xy": "dxy",
}

DEFAULT_SETUP: dict[str, str | list[int]] = {
    "fixed": [255],
    "binary": "d",
    "dimmer": "d",
    "color_temp": "ch",
    "rgb": "rgb",
    "rgbw": "rgbw",
    "rgbww": "rgbch",
    "xy": "dxy",
}

DMX_CHANNELS = 512
MAX_UNIVERSE = 1024
TEMP_PATTERN = re.compile(r"^\d+[kK]$")

DEFAULT_CONFIG: dict[str, Any] = {"title": "", "nodes": []}


class ConfigFormatError(ValueError):
    """Raised when stored/received data has an invalid structure."""

    def __init__(self, path: list[str | int], message: str) -> None:
        super().__init__(f"{'.'.join(str(p) for p in path)}: {message}")
        self.path = path


# --------------------------------------------------------------------------- #
# Normalization (structural, lenient - used for storage/autosave)
# --------------------------------------------------------------------------- #


def _opt_str(value: Any, path: list[str | int]) -> str | None:
    if value is None:
        return None
    if isinstance(value, (dict, list)):
        raise ConfigFormatError(path, "expected a string")
    text = str(value).strip()
    return text or None


def _opt_number(value: Any, path: list[str | int], *, integer: bool) -> int | float | None:
    if value is None or (isinstance(value, str) and not value.strip()):
        return None
    if isinstance(value, bool):
        raise ConfigFormatError(path, "expected a number")
    try:
        number = float(value)
    except (TypeError, ValueError) as err:
        raise ConfigFormatError(path, "expected a number") from err
    if number != number or number in (float("inf"), float("-inf")):
        raise ConfigFormatError(path, "expected a finite number")
    if integer or number.is_integer():
        return int(number)
    return number


def _opt_bool(value: Any, path: list[str | int]) -> bool | None:
    if value is None:
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, str) and value.lower() in ("true", "false"):
        return value.lower() == "true"
    raise ConfigFormatError(path, "expected a boolean")


def _channel_setup(value: Any, path: list[str | int]) -> str | list[str | int] | None:
    if value is None or value == "" or value == []:
        return None
    if isinstance(value, str):
        return value.strip() or None
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return [int(value)]
    if isinstance(value, list):
        result: list[str | int] = []
        for index, item in enumerate(value):
            if isinstance(item, bool):
                raise ConfigFormatError([*path, index], "invalid channel token")
            if isinstance(item, (int, float)):
                result.append(int(item))
            elif isinstance(item, str) and item.strip():
                token = item.strip()
                result.append(int(token) if token.isdigit() else token)
            else:
                raise ConfigFormatError([*path, index], "invalid channel token")
        return result or None
    raise ConfigFormatError(path, "expected a string or list")


def _compact(data: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in data.items() if value is not None}


def _as_list(value: Any, path: list[str | int]) -> list[Any]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise ConfigFormatError(path, "expected a list")
    return value


def _as_dict(value: Any, path: list[str | int]) -> Mapping[str, Any]:
    if not isinstance(value, Mapping):
        raise ConfigFormatError(path, "expected an object")
    return value


def normalize_device(raw: Any, path: list[str | int]) -> dict[str, Any]:
    data = _as_dict(raw, path)
    channel = _opt_number(data.get("channel"), [*path, "channel"], integer=True)
    return _compact(
        {
            "channel": 1 if channel is None else channel,
            "name": _opt_str(data.get("name"), [*path, "name"]) or "",
            "friendly_name": _opt_str(data.get("friendly_name"), [*path, "friendly_name"]),
            "type": _opt_str(data.get("type"), [*path, "type"]),
            "transition": _opt_number(data.get("transition"), [*path, "transition"], integer=False),
            "output_correction": _opt_str(
                data.get("output_correction"), [*path, "output_correction"]
            ),
            "channel_size": _opt_str(data.get("channel_size"), [*path, "channel_size"]),
            "channel_setup": _channel_setup(data.get("channel_setup"), [*path, "channel_setup"]),
            "byte_order": _opt_str(data.get("byte_order"), [*path, "byte_order"]),
            "min_temp": _opt_str(data.get("min_temp"), [*path, "min_temp"]),
            "max_temp": _opt_str(data.get("max_temp"), [*path, "max_temp"]),
        }
    )


def normalize_universe(raw: Any, path: list[str | int], fallback_id: int = 0) -> dict[str, Any]:
    data = _as_dict(raw, path)
    universe_id = _opt_number(data.get("id"), [*path, "id"], integer=True)
    devices = _as_list(data.get("devices"), [*path, "devices"])
    return _compact(
        {
            "id": fallback_id if universe_id is None else universe_id,
            "send_partial_universe": _opt_bool(
                data.get("send_partial_universe"), [*path, "send_partial_universe"]
            ),
            "output_correction": _opt_str(
                data.get("output_correction"), [*path, "output_correction"]
            ),
            "devices": [
                normalize_device(device, [*path, "devices", index])
                for index, device in enumerate(devices)
            ],
        }
    )


def normalize_node(raw: Any, path: list[str | int]) -> dict[str, Any]:
    data = _as_dict(raw, path)
    universes = _as_list(data.get("universes"), [*path, "universes"])
    return _compact(
        {
            "host": _opt_str(data.get("host"), [*path, "host"]) or "",
            "host_override": _opt_str(data.get("host_override"), [*path, "host_override"]),
            "port": _opt_number(data.get("port"), [*path, "port"], integer=True),
            "port_override": _opt_number(
                data.get("port_override"), [*path, "port_override"], integer=True
            ),
            "max_fps": _opt_number(data.get("max_fps"), [*path, "max_fps"], integer=True),
            "refresh_every": _opt_number(
                data.get("refresh_every"), [*path, "refresh_every"], integer=False
            ),
            "node_type": _opt_str(data.get("node_type"), [*path, "node_type"]),
            "universes": [
                normalize_universe(universe, [*path, "universes", index], index)
                for index, universe in enumerate(universes)
            ],
        }
    )


def normalize_config(raw: Any) -> dict[str, Any]:
    """Return a cleaned copy of a UI config. Raises ConfigFormatError on bad structure."""
    if raw is None:
        return {"title": "", "nodes": []}
    data = _as_dict(raw, [])
    nodes = _as_list(data.get("nodes"), ["nodes"])
    return {
        "title": _opt_str(data.get("title"), ["title"]) or "",
        "nodes": [normalize_node(node, ["nodes", index]) for index, node in enumerate(nodes)],
    }


# --------------------------------------------------------------------------- #
# Channel math
# --------------------------------------------------------------------------- #


def device_type(device: Mapping[str, Any]) -> str:
    return device.get("type") or "dimmer"


def logical_width(device: Mapping[str, Any]) -> int:
    """Number of logical channels, matching upstream DmxBaseLight.channel_width."""
    kind = device_type(device)
    if kind in ("dimmer", "binary"):
        return 1
    setup = device.get("channel_setup") or DEFAULT_SETUP.get(kind, "d")
    return max(1, len(setup))


def byte_size(device: Mapping[str, Any]) -> int:
    return CHANNEL_SIZES.get(device.get("channel_size") or "8bit", 1)


def device_width(device: Mapping[str, Any]) -> int:
    """Number of DMX slots occupied by a device."""
    return logical_width(device) * byte_size(device)


def device_range(device: Mapping[str, Any]) -> tuple[int, int]:
    start = int(device.get("channel") or 1)
    return start, start + device_width(device) - 1


def entity_slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")


# --------------------------------------------------------------------------- #
# Strict validation (used before deploy)
# --------------------------------------------------------------------------- #


def _issue(path: list[str | int], code: str, message: str) -> dict[str, Any]:
    return {"path": path, "code": code, "message": message}


def _check_range(
    issues: list[dict[str, Any]],
    value: Any,
    path: list[str | int],
    low: float,
    high: float,
) -> None:
    if value is None:
        return
    if not isinstance(value, (int, float)) or isinstance(value, bool) or not low <= value <= high:
        issues.append(_issue(path, "range", f"must be between {low:g} and {high:g}"))


def _check_choice(
    issues: list[dict[str, Any]], value: Any, path: list[str | int], choices: Iterable[str]
) -> None:
    if value is not None and value not in choices:
        issues.append(_issue(path, "choice", f"must be one of: {', '.join(choices)}"))


def _validate_device(
    issues: list[dict[str, Any]], device: Mapping[str, Any], path: list[str | int]
) -> None:
    kind = device_type(device)
    if not str(device.get("name") or "").strip():
        issues.append(_issue([*path, "name"], "required", "name is required"))
    _check_choice(issues, device.get("type"), [*path, "type"], DEVICE_TYPES)
    _check_range(issues, device.get("channel"), [*path, "channel"], 1, DMX_CHANNELS)
    _check_range(issues, device.get("transition"), [*path, "transition"], 0, 999)
    _check_choice(
        issues, device.get("output_correction"), [*path, "output_correction"], CORRECTIONS
    )
    _check_choice(issues, device.get("channel_size"), [*path, "channel_size"], CHANNEL_SIZES)
    _check_choice(issues, device.get("byte_order"), [*path, "byte_order"], BYTE_ORDERS)
    if kind in TEMP_TYPES:
        for key in ("min_temp", "max_temp"):
            value = device.get(key)
            if value is not None and not TEMP_PATTERN.match(str(value)):
                issues.append(_issue([*path, key], "temp", "must look like 2700K"))

    setup = device.get("channel_setup")
    allowed = ALLOWED_SETUP_CHARS.get(kind)
    if setup is not None and allowed is not None and kind != "binary":
        for token in setup:
            if isinstance(token, int):
                if not 0 <= token <= 255:
                    issues.append(
                        _issue([*path, "channel_setup"], "setup_value", "static values: 0-255")
                    )
            elif token not in allowed:
                issues.append(
                    _issue(
                        [*path, "channel_setup"],
                        "setup_char",
                        f"'{token}' is not allowed for type {kind}",
                    )
                )

    channel = device.get("channel")
    if isinstance(channel, int) and 1 <= channel <= DMX_CHANNELS:
        _, end = device_range(device)
        if end > DMX_CHANNELS:
            issues.append(
                _issue([*path, "channel"], "overflow", f"device ends at channel {end} (> 512)")
            )


def validate_config(config: Mapping[str, Any]) -> list[dict[str, Any]]:
    """Return a list of problems that would make ha-artnet-led reject the config."""
    issues: list[dict[str, Any]] = []
    slugs: dict[str, list[str | int]] = {}

    for node_index, node in enumerate(config.get("nodes", [])):
        node_path: list[str | int] = ["nodes", node_index]
        if not str(node.get("host") or "").strip():
            issues.append(_issue([*node_path, "host"], "required", "host is required"))
        _check_choice(issues, node.get("node_type"), [*node_path, "node_type"], NODE_TYPES)
        _check_range(issues, node.get("port"), [*node_path, "port"], 1, 65535)
        _check_range(issues, node.get("port_override"), [*node_path, "port_override"], 1, 65535)
        _check_range(issues, node.get("max_fps"), [*node_path, "max_fps"], 1, 50)
        _check_range(issues, node.get("refresh_every"), [*node_path, "refresh_every"], 0, 9999)

        if not node.get("universes"):
            issues.append(_issue([*node_path, "universes"], "required", "at least one universe"))

        seen_ids: set[int] = set()
        for universe_index, universe in enumerate(node.get("universes", [])):
            universe_path: list[str | int] = [*node_path, "universes", universe_index]
            universe_id = universe.get("id")
            _check_range(issues, universe_id, [*universe_path, "id"], 0, MAX_UNIVERSE)
            if universe_id in seen_ids:
                issues.append(_issue([*universe_path, "id"], "duplicate", "duplicate universe id"))
            seen_ids.add(universe_id)
            _check_choice(
                issues,
                universe.get("output_correction"),
                [*universe_path, "output_correction"],
                CORRECTIONS,
            )

            occupied: list[tuple[int, int, str]] = []
            for device_index, device in enumerate(universe.get("devices", [])):
                device_path: list[str | int] = [*universe_path, "devices", device_index]
                _validate_device(issues, device, device_path)

                slug = entity_slug(str(device.get("name") or ""))
                if slug:
                    if slug in slugs:
                        issues.append(
                            _issue([*device_path, "name"], "duplicate", "duplicate light name")
                        )
                    else:
                        slugs[slug] = device_path

                if isinstance(device.get("channel"), int):
                    start, end = device_range(device)
                    for other_start, other_end, other_name in occupied:
                        if start <= other_end and other_start <= end:
                            issues.append(
                                _issue(
                                    [*device_path, "channel"],
                                    "overlap",
                                    f"channels {start}-{end} overlap with '{other_name}' "
                                    f"({other_start}-{other_end})",
                                )
                            )
                            break
                    occupied.append((start, end, str(device.get("name") or "")))

    return issues


# --------------------------------------------------------------------------- #
# Conversion to / from the ha-artnet-led platform format
# --------------------------------------------------------------------------- #

_NODE_KEYS = (
    "host",
    "host_override",
    "port",
    "port_override",
    "max_fps",
    "refresh_every",
    "node_type",
)
_DEVICE_KEYS = (
    "channel",
    "name",
    "friendly_name",
    "type",
    "transition",
    "output_correction",
    "channel_size",
    "byte_order",
    "min_temp",
    "max_temp",
    "channel_setup",
)


def to_platform_entries(config: Mapping[str, Any]) -> list[dict[str, Any]]:
    """Convert a UI config into `light:` platform entries for ha-artnet-led."""
    entries: list[dict[str, Any]] = []
    for node in config.get("nodes", []):
        entry: dict[str, Any] = {"platform": PLATFORM}
        for key in _NODE_KEYS:
            if node.get(key) not in (None, ""):
                entry[key] = node[key]
        universes: dict[int, dict[str, Any]] = {}
        for universe in node.get("universes", []):
            universe_entry: dict[str, Any] = {}
            for key in ("send_partial_universe", "output_correction"):
                if universe.get(key) is not None:
                    universe_entry[key] = universe[key]
            devices = []
            for device in universe.get("devices", []):
                device_entry: dict[str, Any] = {}
                for key in _DEVICE_KEYS:
                    value = device.get(key)
                    if value in (None, ""):
                        continue
                    if key in ("min_temp", "max_temp") and device_type(device) not in TEMP_TYPES:
                        continue
                    device_entry[key] = list(value) if isinstance(value, list) else value
                devices.append(device_entry)
            universe_entry["devices"] = devices
            universes[int(universe.get("id", 0))] = universe_entry
        entry["universes"] = universes
        entries.append(entry)
    return entries


def from_platform_entries(entries: Iterable[Mapping[str, Any]]) -> dict[str, Any]:
    """Convert ha-artnet-led platform entries into a UI config."""
    nodes: list[dict[str, Any]] = []
    for entry in entries:
        if entry.get("platform") not in (None, PLATFORM):
            continue
        raw_universes = entry.get("universes") or {}
        if isinstance(raw_universes, Mapping):
            universes = [{**(value or {}), "id": key} for key, value in raw_universes.items()]
        else:
            universes = list(raw_universes)
        nodes.append(
            {
                **{key: entry.get(key) for key in _NODE_KEYS},
                "universes": universes,
            }
        )
    return normalize_config({"title": "", "nodes": nodes})
