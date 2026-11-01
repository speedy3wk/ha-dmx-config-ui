"""Tests for setup, unload and storage migration."""

from __future__ import annotations

from typing import Any

from homeassistant.components import frontend
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import CoreState, HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ha_artnet_led_uiconfig.const import (
    DOMAIN,
    ISSUE_RESTART_REQUIRED,
    PANEL_URL_PATH,
    STORE_KEY,
)


def _panel(hass: HomeAssistant) -> Any:
    return hass.data[frontend.DATA_PANELS].get(PANEL_URL_PATH)


async def test_setup_registers_panel(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    assert setup_integration.state is ConfigEntryState.LOADED
    panel = _panel(hass)
    assert panel is not None
    assert panel.require_admin
    module_url = panel.config["_panel_custom"]["module_url"]
    assert module_url.startswith(f"/api/{DOMAIN}/ha-artnet-led-uiconfig.js?v=")


async def test_unload_and_reload(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    assert await hass.config_entries.async_unload(setup_integration.entry_id)
    await hass.async_block_till_done()
    assert _panel(hass) is None

    assert await hass.config_entries.async_setup(setup_integration.entry_id)
    await hass.async_block_till_done()
    assert _panel(hass) is not None

    assert await hass.config_entries.async_reload(setup_integration.entry_id)
    await hass.async_block_till_done()
    assert _panel(hass) is not None


async def test_storage_migration_from_v1(hass: HomeAssistant, hass_storage: dict[str, Any]) -> None:
    hass_storage[STORE_KEY] = {
        "version": 1,
        "minor_version": 1,
        "key": STORE_KEY,
        "data": {
            "type": "ha_artnet_led_uiconfig",
            "title": "",
            "nodes": [{"host": "1.2.3.4", "port": None, "universes": [{"id": 0, "devices": []}]}],
        },
    }
    assert await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    config = await entry.runtime_data.async_get_config()
    assert config == {
        "title": "",
        "nodes": [{"host": "1.2.3.4", "universes": [{"id": 0, "devices": []}]}],
    }


async def test_restart_issue_cleared_on_startup(hass: HomeAssistant) -> None:
    ir.async_create_issue(
        hass,
        DOMAIN,
        ISSUE_RESTART_REQUIRED,
        is_fixable=True,
        severity=ir.IssueSeverity.WARNING,
        translation_key=ISSUE_RESTART_REQUIRED,
    )
    hass.set_state(CoreState.not_running)
    assert await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    assert ir.async_get(hass).async_get_issue(DOMAIN, ISSUE_RESTART_REQUIRED) is None
