"""Constants for DMX Config UI."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "ha_artnet_led_uiconfig"
ARTNET_DOMAIN: Final = "artnet_led"
DMX_DOMAIN: Final = "dmx"

PANEL_URL_PATH: Final = "artnet-led-uiconfig"
PANEL_TITLE: Final = "DMX Config UI"
PANEL_ICON: Final = "mdi:spotlight-beam"
PANEL_COMPONENT: Final = "ha-artnet-led-uiconfig-panel"

STATIC_PATH: Final = f"/api/{DOMAIN}"
BUNDLE_FILE: Final = "ha-artnet-led-uiconfig.js"

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
WS_MIGRATE: Final = f"{DOMAIN}/migrate"

TARGET_ARTNET: Final = "artnet_led"
TARGET_DMX: Final = "dmx"

CONF_INCLUDE_FILE: Final = "include_file"
DEFAULT_INCLUDE_FILE: Final = "ha_artnet_led_uiconfig.yaml"
INCLUDE_KEY: Final = "light artnet_uiconfig"
DMX_INCLUDE_FILE: Final = "ha_artnet_led_uiconfig_dmx.yaml"
CONFIGURATION_BACKUP: Final = "configuration.yaml.dmx_config_ui.bak"

ISSUE_RESTART_REQUIRED: Final = "restart_required"
ISSUE_INCLUDE_MISSING: Final = "include_missing"
ISSUE_DMX_INCLUDE_MISSING: Final = "dmx_include_missing"

STORE_KEY: Final = f"{DOMAIN}.config"
STORE_VERSION: Final = 2
DMX_STORE_KEY: Final = f"{DOMAIN}.dmx"
DMX_STORE_VERSION: Final = 1
ARTNET_LED_URL: Final = "https://github.com/Breina/ha-artnet-led"
