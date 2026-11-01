"""Tests for the pure data model."""

from __future__ import annotations

import pytest

from custom_components.ha_artnet_led_uiconfig.model import (
    ConfigFormatError,
    device_width,
    from_platform_entries,
    normalize_config,
    to_platform_entries,
    validate_config,
)


def _config(*devices: dict, **node: object) -> dict:
    return {
        "nodes": [
            {
                "host": "10.0.0.1",
                **node,
                "universes": [{"id": 0, "devices": list(devices)}],
            }
        ]
    }


def _codes(config: dict) -> list[str]:
    return [issue["code"] for issue in validate_config(normalize_config(config))]


@pytest.mark.parametrize(
    ("device", "width"),
    [
        ({"type": "dimmer"}, 1),
        ({"type": "dimmer", "channel_size": "16bit"}, 2),
        ({"type": "binary"}, 1),
        ({"type": "rgb"}, 3),
        ({"type": "rgbw"}, 4),
        ({"type": "rgbww"}, 5),
        ({"type": "color_temp"}, 2),
        ({"type": "xy"}, 3),
        ({"type": "fixed"}, 1),
        ({"type": "fixed", "channel_setup": [1, 2, 3]}, 3),
        ({"type": "rgb", "channel_setup": "drgbw", "channel_size": "16bit"}, 10),
        ({}, 1),
    ],
)
def test_device_width(device: dict, width: int) -> None:
    assert device_width(device) == width


def test_normalize_drops_empty_and_coerces() -> None:
    config = normalize_config(
        {
            "type": "ha_artnet_led_uiconfig",
            "nodes": [
                {
                    "host": " 1.2.3.4 ",
                    "port": "",
                    "max_fps": "30",
                    "universes": [
                        {
                            "id": "2",
                            "output_correction": "",
                            "devices": [
                                {
                                    "channel": "5",
                                    "name": "a",
                                    "transition": "1.5",
                                    "channel_setup": "255,r",
                                }
                            ],
                        }
                    ],
                    "junk": 1,
                }
            ],
        }
    )
    node = config["nodes"][0]
    assert "type" not in config
    assert node == {
        "host": "1.2.3.4",
        "max_fps": 30,
        "universes": [
            {
                "id": 2,
                "devices": [
                    {"channel": 5, "name": "a", "transition": 1.5, "channel_setup": "255,r"}
                ],
            }
        ],
    }


def test_normalize_channel_setup_list() -> None:
    config = normalize_config(_config({"name": "x", "channel_setup": ["r", "255", 3]}))
    assert config["nodes"][0]["universes"][0]["devices"][0]["channel_setup"] == ["r", 255, 3]


@pytest.mark.parametrize(
    "raw",
    [
        {"nodes": "x"},
        {"nodes": [{"universes": [{"devices": [{"channel": "abc"}]}]}]},
        {"nodes": [{"max_fps": True}]},
        {"nodes": [{"universes": [{"send_partial_universe": "maybe"}]}]},
        [],
    ],
)
def test_normalize_rejects_bad_structure(raw: object) -> None:
    with pytest.raises(ConfigFormatError):
        normalize_config(raw)


def test_valid_sample(sample_config: dict) -> None:
    assert validate_config(normalize_config(sample_config)) == []


def test_overlap_detected() -> None:
    issues = validate_config(
        normalize_config(
            _config(
                {"channel": 1, "name": "a", "type": "rgb"},
                {"channel": 3, "name": "b", "type": "dimmer"},
            )
        )
    )
    assert [issue["code"] for issue in issues] == ["overlap"]
    assert issues[0]["path"] == ["nodes", 0, "universes", 0, "devices", 1, "channel"]


def test_no_overlap_across_universes() -> None:
    config = {
        "nodes": [
            {
                "host": "h",
                "universes": [
                    {"id": 0, "devices": [{"channel": 1, "name": "a"}]},
                    {"id": 1, "devices": [{"channel": 1, "name": "b"}]},
                ],
            }
        ]
    }
    assert _codes(config) == []


@pytest.mark.parametrize(
    ("config", "code"),
    [
        (_config({"channel": 1, "name": "a"}, host=""), "required"),
        (_config({"channel": 0, "name": "a"}), "range"),
        (_config({"channel": 512, "name": "a", "type": "rgb"}), "overflow"),
        (_config({"channel": 1, "name": ""}), "required"),
        (_config({"channel": 1, "name": "a", "type": "laser"}), "choice"),
        (_config({"channel": 1, "name": "a", "type": "rgb", "channel_setup": "rgx"}), "setup_char"),
        (
            _config({"channel": 1, "name": "a", "type": "fixed", "channel_setup": [300]}),
            "setup_value",
        ),
        (_config({"channel": 1, "name": "a", "type": "color_temp", "min_temp": "warm"}), "temp"),
        (_config({"channel": 1, "name": "a"}, max_fps=60), "range"),
        (_config({"channel": 1, "name": "a"}, node_type="dmx"), "choice"),
        (_config({"channel": 1, "name": "A b"}, {"channel": 2, "name": "a_b"}), "duplicate"),
    ],
)
def test_validation_errors(config: dict, code: str) -> None:
    assert code in _codes(config)


def test_duplicate_universe_and_missing_universes() -> None:
    config = {
        "nodes": [
            {"host": "h", "universes": [{"id": 1, "devices": []}, {"id": 1, "devices": []}]},
            {"host": "i", "universes": []},
        ]
    }
    assert _codes(config) == ["duplicate", "required"]


def test_platform_roundtrip(sample_config: dict) -> None:
    config = normalize_config(sample_config)
    entries = to_platform_entries(config)
    assert entries[0]["platform"] == "artnet_led"
    assert list(entries[0]["universes"]) == [0]
    assert from_platform_entries(entries) == config


def test_temps_only_for_temp_types() -> None:
    entries = to_platform_entries(
        normalize_config(_config({"channel": 1, "name": "a", "type": "rgb", "min_temp": "2000K"}))
    )
    assert "min_temp" not in entries[0]["universes"][0]["devices"][0]


def test_from_platform_skips_other_platforms() -> None:
    config = from_platform_entries(
        [
            {"platform": "template"},
            {
                "platform": "artnet_led",
                "host": "h",
                "universes": {3: {"devices": [{"channel": 1, "name": "x"}]}},
            },
        ]
    )
    assert config["nodes"][0]["universes"][0]["id"] == 3
