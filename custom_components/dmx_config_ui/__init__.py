"""DMX Config UI: a WYSIWYG editor for the DMX integration."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv, issue_registry as ir
from homeassistant.loader import async_get_integration

from . import websocket
from .const import (
    BUNDLE_FILE,
    DOMAIN,
    ISSUE_RESTART_REQUIRED,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_PATH,
)
from .manager import DmxConfigUiConfigEntry, UiConfigManager

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

FRONTEND_DIR = Path(__file__).parent / "frontend" / "dist"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    websocket.async_register(hass)
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_PATH, str(FRONTEND_DIR), cache_headers=True)]
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: DmxConfigUiConfigEntry) -> bool:
    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version)
    entry.runtime_data = UiConfigManager(hass, entry, version)

    if not hass.is_running:
        # A pending restart has just happened.
        ir.async_delete_issue(hass, DOMAIN, ISSUE_RESTART_REQUIRED)

    if not (FRONTEND_DIR / BUNDLE_FILE).exists():
        _LOGGER.error("Frontend bundle missing at %s", FRONTEND_DIR / BUNDLE_FILE)

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_PATH}/{BUNDLE_FILE}?v={version}",
        require_admin=True,
        config={"version": version},
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: DmxConfigUiConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True
