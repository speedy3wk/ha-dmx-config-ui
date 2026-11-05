"""Tests for the artnet_led (0.x) -> dmx (1.x) migration."""

from __future__ import annotations

import pytest

from custom_components.dmx_config_ui.fixtures import BUNDLED_DIR, load_fixture_dir
from custom_components.dmx_config_ui.migrate import migrate
from custom_components.dmx_config_ui.model import normalize_config
from custom_components.dmx_config_ui.model_dmx import has_errors, validate_config

FIXTURES = load_fixture_dir(BUNDLED_DIR, "bundled")[0]


def _migrate(*nodes: dict) -> dict:
    return migrate(normalize_config({"nodes": list(nodes)}), FIXTURES)


def _devices(result: dict, protocol: str = "artnet") -> list[dict]:
    return [d for u in result["config"][protocol]["universes"] for d in u["devices"]]


def _codes(result: dict) -> list[tuple[str, str | None]]:
    return [(w["code"], w["device"]) for w in result["warnings"]]


@pytest.mark.parametrize(
    ("device", "fixture", "mode"),
    [
        ({"type": "dimmer"}, "DeskCh", "8bit"),
        ({"type": "dimmer", "channel_size": "16bit"}, "DeskCh", "16bit"),
        ({"type": "rgb"}, "RGB", "8bit"),
        ({"type": "rgb", "channel_setup": "drgb", "channel_size": "16bit"}, "DRGB", "16bit"),
        ({"type": "rgbw"}, "RGBW", "8bit"),
        ({"type": "rgbww", "channel_setup": "rgbhc"}, "RGBWW", "8bit"),
        ({"type": "color_temp"}, "CW/WW Fader", "8bit-cw"),
        ({"type": "color_temp", "channel_setup": "hc"}, "CW/WW Fader", "8bit-wc"),
        ({"type": "color_temp", "channel_setup": "dt"}, "Color Temperature Fader", "8bit"),
    ],
)
def test_type_mapping(device: dict, fixture: str, mode: str | None) -> None:
    result = _migrate(
        {
            "host": "1.2.3.4",
            "universes": [{"id": 0, "devices": [{"channel": 5, "name": "Lamp", **device}]}],
        }
    )
    (migrated,) = _devices(result)
    assert migrated["fixture"] == fixture
    assert migrated.get("mode") == mode
    assert migrated["start_address"] == 5
    assert migrated["entity_id_prefix"] == "lamp"
    assert _codes(result) == [("entity_ids_change", None)]
    assert result["fixtures"] == [fixture]
    assert not has_errors(validate_config(result["config"], FIXTURES))


def test_full_example() -> None:
    result = _migrate(
        {
            "host": "10.0.0.2",
            "max_fps": 60,
            "refresh_every": 120,
            "universes": [
                {
                    "id": 0x2C05,
                    "output_correction": "quadruple",
                    "devices": [
                        {"channel": 1, "name": "Küche Spot", "type": "dimmer"},
                        {"channel": 2, "name": "Strip", "type": "rgbww"},
                        {"channel": 10, "name": "Fix", "type": "fixed"},
                        {"channel": 11, "name": "Relay", "type": "binary"},
                        {"channel": 12, "name": "Le", "type": "rgb", "byte_order": "little"},
                        {"channel": 20, "name": "Slow", "type": "rgb", "transition": 2},
                        {"channel": 30, "name": "Tw", "type": "color_temp", "min_temp": "2700K"},
                        {"channel": 40, "name": "Deep", "type": "rgb", "channel_size": "32bit"},
                    ],
                }
            ],
        },
        {
            "host": "10.0.0.3",
            "port": 6455,
            "node_type": "sacn",
            "universes": [{"id": 0, "devices": [{"channel": 1, "name": "S", "type": "rgbw"}]}],
        },
        {"host": "10.0.0.4", "node_type": "kinet", "universes": []},
    )
    config = result["config"]
    assert config["max_fps"] == 43
    assert config["artnet"]["refresh_every"] == 120
    (universe,) = config["artnet"]["universes"]
    assert (universe["net"], universe["subnet"], universe["universe"]) == (1, 6, 5)
    assert universe["manual_nodes"] == [{"host": "10.0.0.2"}]
    names = [d["name"] for d in universe["devices"]]
    assert names == ["Küche Spot", "Strip", "Relay", "Le", "Slow", "Tw", "Deep"]
    assert universe["devices"][0]["entity_id_prefix"] == "kuche_spot"
    assert universe["devices"][0]["output_correction"] == {"curve": "quartic"}
    assert universe["devices"][-1]["mode"] == "24bit"

    (sacn,) = config["sacn"]["universes"]
    assert sacn["universe"] == 1
    assert sacn["unicast_addresses"] == [{"host": "10.0.0.3"}]

    assert _codes(result) == [
        ("channel_setup", "Strip"),
        ("type_unsupported", "Fix"),
        ("binary_as_dimmer", "Relay"),
        ("byte_order", "Le"),
        ("transition", "Slow"),
        ("color_temp_range", "Tw"),
        ("bit_depth", "Deep"),
        ("sacn_universe_zero", None),
        ("kinet_unsupported", None),
        ("entity_ids_change", None),
    ]
    assert not has_errors(validate_config(config, FIXTURES))


def test_empty() -> None:
    result = _migrate()
    assert result["warnings"] == [] and result["fixtures"] == []
    assert result["config"]["artnet"]["universes"] == []
