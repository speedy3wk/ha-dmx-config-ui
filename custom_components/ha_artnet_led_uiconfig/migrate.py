"""Convert an ha-artnet-led 0.x (`artnet_led`) UI config into a 1.x (`dmx`) UI config.

Follows https://github.com/Breina/ha-artnet-led/blob/platform-refactor2/docs/migration.md:
every legacy light type maps to a generic Open Fixture Library fixture.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from typing import Any

from homeassistant.util import slugify

from .fixtures import find_fixture
from .model import DEFAULT_SETUP
from .model_dmx import ARTNET_DEFAULT_PORT, empty_config, normalize_config

# Legacy curve names -> dmx curve names
CURVE_MAP = {"linear": "linear", "quadratic": "quadratic", "cubic": "cubic", "quadruple": "quartic"}
BITS = {"8bit": 8, "16bit": 16, "24bit": 24, "32bit": 32}


def _pick_fixture(device: Mapping[str, Any]) -> tuple[str | None, str | None, list[str]]:
    """Return (fixture shortName/name, mode suffix, warnings) for a legacy device."""
    kind = device.get("type") or "dimmer"
    setup = device.get("channel_setup")
    setup_str = setup if isinstance(setup, str) else None
    default = DEFAULT_SETUP.get(kind)
    warnings: list[str] = []
    custom_setup = setup is not None and setup != default

    if kind in ("dimmer", "binary"):
        if kind == "binary":
            warnings.append("binary_as_dimmer")
        return "DeskCh", None, warnings
    if kind == "rgb":
        if setup_str == "drgb":
            return "DRGB", None, warnings
        if custom_setup:
            warnings.append("channel_setup")
        return "RGB", None, warnings
    if kind == "rgbw":
        if custom_setup:
            warnings.append("channel_setup")
        return "RGBW", None, warnings
    if kind == "rgbww":
        # Generic fixture order is R G B WarmWhite ColdWhite ("rgbhc").
        if (setup_str or default) != "rgbhc":
            warnings.append("channel_setup")
        return "RGBWW", None, warnings
    if kind == "color_temp":
        order = setup_str or default
        if order == "dt":
            return "Color Temperature Fader", None, warnings
        if order == "hc":
            return "CW/WW Fader", "W/C", warnings
        if order != "ch":
            warnings.append("channel_setup")
        return "CW/WW Fader", "C/W", warnings
    return None, None, [f"unsupported_type:{kind}"]


def _pick_mode(
    fixture: Mapping[str, Any] | None, bits: int, suffix: str | None
) -> tuple[str | None, bool]:
    """Find the mode for a bit depth, e.g. '16 bit' or '8 bit C/W'.

    Returns (mode key as used in the `mode:` option, exact match).
    """
    if fixture is None:
        return None, False
    modes = [(str(m["name"]), str(m.get("key") or m["name"])) for m in fixture["modes"]]
    wanted = f"{bits} bit" + (f" {suffix}" if suffix else "")
    for name, key in modes:
        if name.lower() == wanted.lower():
            return key, True
    candidates = [(n, k) for n, k in modes if n.lower().startswith(f"{bits} bit")]
    if suffix:
        candidates = [(n, k) for n, k in candidates if n.endswith(suffix)] or candidates
    if candidates:
        return candidates[0][1], True
    return (modes[-1][1] if modes else None), False


def _port_address(universe_id: int) -> dict[str, int]:
    """Split a legacy universe id so ha-artnet-led 1.x computes the same port address.

    1.x uses `net << 13 | subnet << 9 | universe` with a 9 bit universe.
    """
    if universe_id <= 0x1FF:
        return {"net": 0, "subnet": 0, "universe": universe_id}
    return {
        "net": (universe_id >> 13) & 0xF,
        "subnet": (universe_id >> 9) & 0xF,
        "universe": universe_id & 0x1FF,
    }


def migrate(config: Mapping[str, Any], fixtures: Iterable[Mapping[str, Any]]) -> dict[str, Any]:
    """Return {"config": dmx_config, "warnings": [...], "fixtures": [...used names]}."""
    fixtures = list(fixtures)
    result = empty_config()
    warnings: list[dict[str, Any]] = []
    used: set[str] = set()
    sacn_universes: dict[int, dict[str, Any]] = {}
    artnet_universes: dict[tuple[int, int, int], dict[str, Any]] = {}

    def warn(code: str, device: str | None = None, **params: Any) -> None:
        warnings.append({"code": code, "device": device, "params": params})

    for node_index, node in enumerate(config.get("nodes", [])):
        node_type = node.get("node_type") or "artnet-direct"
        host = node.get("host_override") or node.get("host") or ""
        if node_type == "kinet":
            warn("kinet_unsupported", None, node=node_index, host=host)
            continue
        if node.get("max_fps") is not None:
            result["max_fps"] = min(43, int(node["max_fps"]))
        if node.get("refresh_every") is not None:
            protocol_key = "sacn" if node_type == "sacn" else "artnet"
            result[protocol_key]["refresh_every"] = node["refresh_every"]

        for universe in node.get("universes", []):
            universe_id = int(universe.get("id", 0))
            if node_type == "sacn":
                number = universe_id
                if number < 1:
                    warn("sacn_universe_zero", None, host=host)
                    number = 1
                target = sacn_universes.setdefault(
                    number, {"universe": number, "unicast_addresses": [], "devices": []}
                )
                if host and not any(h["host"] == host for h in target["unicast_addresses"]):
                    target["unicast_addresses"].append({"host": host})
            else:
                address = _port_address(universe_id)
                ident = (address["net"], address["subnet"], address["universe"])
                target = artnet_universes.setdefault(
                    ident, {**address, "manual_nodes": [], "devices": []}
                )
                port = node.get("port_override") or node.get("port")
                if host and not any(h["host"] == host for h in target["manual_nodes"]):
                    entry: dict[str, Any] = {"host": host}
                    if port and port != ARTNET_DEFAULT_PORT:
                        entry["port"] = port
                    target["manual_nodes"].append(entry)
                if universe.get("send_partial_universe") is False:
                    target["send_partial_universe"] = False

            for device in universe.get("devices", []):
                name = device.get("friendly_name") or device.get("name") or ""
                fixture_name, suffix, notes = _pick_fixture(device)
                for note in notes:
                    if note.startswith("unsupported_type:"):
                        warn("type_unsupported", name, type=note.split(":", 1)[1])
                    else:
                        warn(note, name, channel_setup=device.get("channel_setup"))
                if fixture_name is None:
                    continue
                fixture = find_fixture(fixtures, fixture_name)
                bits = BITS.get(device.get("channel_size") or "8bit", 8)
                mode, exact = _pick_mode(fixture, bits, suffix)
                if not exact:
                    warn("bit_depth", name, bits=bits, mode=mode)
                if device.get("byte_order") == "little":
                    warn("byte_order", name)
                if device.get("transition") is not None:
                    warn("transition", name)
                if device.get("min_temp") or device.get("max_temp"):
                    warn("color_temp_range", name)

                new_device: dict[str, Any] = {
                    "name": name,
                    "start_address": device.get("channel", 1),
                    "fixture": fixture_name,
                    "entity_id_prefix": slugify(str(device.get("name") or name)) or None,
                }
                if mode and fixture and len(fixture["modes"]) > 1:
                    new_device["mode"] = mode
                curve = device.get("output_correction") or universe.get("output_correction")
                if curve and curve != "linear":
                    new_device["output_correction"] = {"curve": CURVE_MAP.get(curve, "linear")}
                target["devices"].append(new_device)
                used.add(fixture_name)

    result["artnet"]["universes"] = list(artnet_universes.values())
    result["sacn"]["universes"] = list(sacn_universes.values())
    if used:
        # dmx entity ids are "<prefix>_<fixture fingerprint>", so they never match the old ones.
        warn("entity_ids_change")
    return {"config": normalize_config(result), "warnings": warnings, "fixtures": sorted(used)}
