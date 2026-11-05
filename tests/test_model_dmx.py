"""Tests for the ha-artnet-led 1.x (`dmx:`) model."""

from __future__ import annotations

import pytest
import yaml

from custom_components.dmx_config_ui.files import render_dmx_yaml
from custom_components.dmx_config_ui.model import ConfigFormatError
from custom_components.dmx_config_ui.model_dmx import (
    device_width,
    empty_config,
    from_yaml,
    has_errors,
    normalize_config,
    port_address_label,
    to_yaml_dict,
    used_fixtures,
)

FIXTURES = [{"aliases": ["RGB"], "modes": [{"key": "8bit", "name": "8 bit", "width": 3}]}]

CONFIG = {
    "fixtures_folder": "fixtures/ofl",
    "max_fps": 30,
    "artnet": {
        "refresh_every": 0.8,
        "universes": [
            {
                "universe": 1,
                "manual_nodes": [{"host": "10.0.0.2"}, {"host": "10.0.0.9", "port": 6455}],
                "devices": [
                    {"name": "Bar: links", "start_address": 1, "fixture": "RGB", "mode": "8bit"},
                    {
                        "name": "Spot",
                        "start_address": 4,
                        "fixture": "DeskCh",
                        "entity_id_prefix": "spot",
                        "output_correction": {"curve": "quadratic"},
                    },
                ],
            },
            {"net": 1, "subnet": 2, "universe": 3, "send_partial_universe": False, "devices": []},
        ],
    },
    "sacn": {
        "source_name": "HA",
        "priority": 150,
        "universes": [
            {
                "universe": 7,
                "unicast_addresses": [{"host": "10.0.0.3", "port": 5568}],
                "devices": [
                    {
                        "name": "Fader",
                        "start_address": 1,
                        "fixture": "RGB",
                        "output_correction": {"curve": "cubic", "min": 0.1, "max": 0.9},
                    }
                ],
            }
        ],
    },
}


def test_empty() -> None:
    config = empty_config()
    assert normalize_config(None) == config
    assert to_yaml_dict(config) == {"fixtures": {"folder": "fixtures"}}


def test_to_yaml_dict() -> None:
    result = to_yaml_dict(normalize_config(CONFIG))
    assert result["fixtures"] == {"folder": "fixtures/ofl"}
    assert result["animation"] == {"max_fps": 30}
    artnet = result["artnet"]
    assert artnet["refresh_every"] == 0.8
    first, second = artnet["universes"]
    assert first == {
        1: {
            "compatibility": {
                "manual_nodes": [{"host": "10.0.0.2"}, {"host": "10.0.0.9", "port": 6455}]
            },
            "devices": [
                {"Bar: links": {"start_address": 1, "fixture": "RGB", "mode": "8bit"}},
                {
                    "Spot": {
                        "start_address": 4,
                        "fixture": "DeskCh",
                        "entity_id_prefix": "spot",
                        "output_correction": "quadratic",
                    }
                },
            ],
        }
    }
    assert second == {"1/2/3": {"compatibility": {"send_partial_universe": False}, "devices": []}}
    sacn = result["sacn"]
    assert sacn["source_name"] == "HA" and sacn["priority"] == 150
    assert sacn["universes"] == [
        {
            7: {
                "compatibility": {"unicast_addresses": [{"host": "10.0.0.3"}]},
                "devices": [
                    {
                        "Fader": {
                            "start_address": 1,
                            "fixture": "RGB",
                            "output_correction": {"curve": "cubic", "min": 0.1, "max": 0.9},
                        }
                    }
                ],
            }
        }
    ]


def test_protocol_without_universes_is_omitted() -> None:
    config = normalize_config({"artnet": {"refresh_every": 1, "universes": []}})
    assert "artnet" not in to_yaml_dict(config)


def test_roundtrip_through_yaml() -> None:
    config = normalize_config(CONFIG)
    loaded = yaml.safe_load(render_dmx_yaml(config))
    imported = from_yaml(loaded)
    assert to_yaml_dict(imported) == to_yaml_dict(config)
    # Default ports are dropped on output.
    assert imported["sacn"]["universes"][0]["unicast_addresses"] == [{"host": "10.0.0.3"}]
    assert imported["artnet"] == config["artnet"]


@pytest.mark.parametrize(
    "value",
    [
        [],
        {"artnet": {"universes": [{"1": {}, "2": {}}]}},
        {"artnet": {"universes": [{"a/b/c": {"devices": []}}]}},
        {"artnet": {"universes": [{"1/2": {"devices": []}}]}},
        {"sacn": {"universes": [{1: {"devices": ["x"]}}]}},
    ],
)
def test_from_yaml_rejects(value) -> None:
    with pytest.raises(ConfigFormatError):
        from_yaml(value)


def test_from_yaml_none() -> None:
    assert from_yaml(None) == empty_config()


def test_from_yaml_preserves_unrecognized_fields() -> None:
    source = {
        "fixtures": {"folder": "fixtures", "future_fixture_option": True},
        "animation": {"max_fps": 24, "future_animation_option": 3},
        "future_top_level_option": {"enabled": True},
        "artnet": {
            "future_artnet_option": "keep",
            "universes": [
                {
                    1: {
                        "future_universe_option": "keep",
                        "compatibility": {
                            "future_compatibility_option": True,
                            "manual_nodes": [{"host": "10.0.0.2", "future_node_option": "keep"}],
                        },
                        "devices": [
                            {
                                "Spot": {
                                    "start_address": 1,
                                    "fixture": "RGB",
                                    "future_device_option": "keep",
                                    "output_correction": {
                                        "curve": "linear",
                                        "future_curve_option": 0.5,
                                    },
                                }
                            }
                        ],
                    }
                }
            ],
        },
    }

    result = to_yaml_dict(from_yaml(source))
    assert result["future_top_level_option"] == {"enabled": True}
    assert result["fixtures"]["future_fixture_option"] is True
    assert result["animation"]["future_animation_option"] == 3
    artnet = result["artnet"]
    assert artnet["future_artnet_option"] == "keep"
    universe = artnet["universes"][0][1]
    assert universe["future_universe_option"] == "keep"
    assert universe["compatibility"]["future_compatibility_option"] is True
    assert universe["compatibility"]["manual_nodes"][0]["future_node_option"] == "keep"
    device = universe["devices"][0]["Spot"]
    assert device["future_device_option"] == "keep"
    assert device["output_correction"]["future_curve_option"] == 0.5


def test_helpers() -> None:
    config = normalize_config(CONFIG)
    assert used_fixtures(config) == {"RGB", "DeskCh"}
    universe = config["artnet"]["universes"][1]
    assert port_address_label(universe) == "1/2/3"
    device = config["artnet"]["universes"][0]["devices"][0]
    assert device_width(device, FIXTURES) == 3
    assert device_width({**device, "mode": "16bit"}, FIXTURES) is None
    assert device_width({**device, "fixture": "x"}, FIXTURES) is None
    assert has_errors([{"severity": "warning"}]) is False
    assert has_errors([{"severity": "warning"}, {"severity": "error"}]) is True
