"""Constants for DMX Config UI."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "dmx_config_ui"
DMX_DOMAIN: Final = "dmx"

PANEL_URL_PATH: Final = "dmx-config-ui"
PANEL_TITLE: Final = "DMX Config UI"
PANEL_ICON: Final = "mdi:spotlight-beam"
PANEL_COMPONENT: Final = "dmx-config-ui-panel"

STATIC_PATH: Final = f"/api/{DOMAIN}"
BUNDLE_FILE: Final = "dmx-config-ui.js"

WS_GET: Final = f"{DOMAIN}/get"
WS_SAVE: Final = f"{DOMAIN}/save"
WS_PREVIEW: Final = f"{DOMAIN}/preview"
WS_DEPLOY: Final = f"{DOMAIN}/deploy"
WS_STATUS: Final = f"{DOMAIN}/status"
WS_IMPORT_EXISTING: Final = f"{DOMAIN}/import_existing"
WS_FIXTURES: Final = f"{DOMAIN}/fixtures"
WS_FIXTURE_UPLOAD: Final = f"{DOMAIN}/fixtures/upload"
WS_OFL_SEARCH: Final = f"{DOMAIN}/ofl/search"
WS_OFL_DOWNLOAD: Final = f"{DOMAIN}/ofl/download"
DMX_INCLUDE_FILE: Final = "dmx_config_ui_dmx.yaml"
CONFIGURATION_BACKUP: Final = "configuration.yaml.dmx_config_ui.bak"

ISSUE_RESTART_REQUIRED: Final = "restart_required"
ISSUE_DMX_INCLUDE_MISSING: Final = "dmx_include_missing"

DMX_STORE_KEY: Final = f"{DOMAIN}.dmx"
DMX_STORE_VERSION: Final = 1
DMX_URL: Final = "https://github.com/Breina/ha-artnet-led"
