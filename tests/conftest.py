"""Shared fixtures."""

from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ha_artnet_led_uiconfig.const import DOMAIN


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable loading custom integrations in all tests."""
    return


@pytest.fixture
def sample_config() -> dict:
    return {
        "title": "",
        "nodes": [
            {
                "host": "192.168.0.10",
                "node_type": "artnet-direct",
                "max_fps": 25,
                "refresh_every": 120,
                "universes": [
                    {
                        "id": 0,
                        "send_partial_universe": True,
                        "devices": [
                            {"channel": 1, "name": "Küche: Spot #1", "type": "dimmer"},
                            {
                                "channel": 2,
                                "name": "rgb lamp",
                                "type": "rgbw",
                                "channel_setup": "rgbw",
                            },
                            {
                                "channel": 10,
                                "name": "warm",
                                "type": "color_temp",
                                "min_temp": "2700K",
                                "max_temp": "6500K",
                            },
                            {
                                "channel": 20,
                                "name": "fixed",
                                "type": "fixed",
                                "channel_setup": [255, 0],
                            },
                        ],
                    }
                ],
            }
        ],
    }


@pytest.fixture
async def setup_integration(hass: HomeAssistant) -> MockConfigEntry:
    assert await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, title="Art-Net LED UI Config", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry
