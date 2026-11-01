"""Constants for Art-Net LED UI Config."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "ha_artnet_led_uiconfig"
ARTNET_DOMAIN: Final = "artnet_led"

PANEL_URL_PATH: Final = "artnet-led-uiconfig"
PANEL_TITLE: Final = "Art-Net LED Config"
PANEL_ICON: Final = "mdi:lightbulb-group"
PANEL_COMPONENT: Final = "ha-artnet-led-uiconfig-panel"

STATIC_PATH: Final = f"/api/{DOMAIN}"
BUNDLE_FILE: Final = "ha-artnet-led-uiconfig.js"

WS_GET: Final = f"{DOMAIN}/get"
WS_SAVE: Final = f"{DOMAIN}/save"
WS_PREVIEW: Final = f"{DOMAIN}/preview"
WS_DEPLOY: Final = f"{DOMAIN}/deploy"
WS_STATUS: Final = f"{DOMAIN}/status"
WS_IMPORT_EXISTING: Final = f"{DOMAIN}/import_existing"

CONF_INCLUDE_FILE: Final = "include_file"
DEFAULT_INCLUDE_FILE: Final = "ha_artnet_led_uiconfig.yaml"
INCLUDE_KEY: Final = "light artnet_uiconfig"

ISSUE_RESTART_REQUIRED: Final = "restart_required"
ISSUE_INCLUDE_MISSING: Final = "include_missing"

STORE_KEY: Final = f"{DOMAIN}.config"
STORE_VERSION: Final = 2
