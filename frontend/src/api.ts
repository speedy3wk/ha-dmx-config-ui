import type {
  DeployResult,
  HomeAssistant,
  PreviewResult,
  StatusResult,
  UiConfig
} from "./types";

const DOMAIN = "ha_artnet_led_uiconfig";

export const fetchConfig = (hass: HomeAssistant) =>
  hass.callWS<UiConfig>({ type: `${DOMAIN}/get` });

export const saveConfig = (hass: HomeAssistant, config: UiConfig) =>
  hass.callWS<{ status: string; config: UiConfig }>({ type: `${DOMAIN}/save`, config });

export const previewConfig = (hass: HomeAssistant, config: UiConfig) =>
  hass.callWS<PreviewResult>({ type: `${DOMAIN}/preview`, config });

export const deployConfig = (hass: HomeAssistant, config: UiConfig) =>
  hass.callWS<DeployResult>({ type: `${DOMAIN}/deploy`, config });

export const fetchStatus = (hass: HomeAssistant) =>
  hass.callWS<StatusResult>({ type: `${DOMAIN}/status` });

export const importExisting = (hass: HomeAssistant) =>
  hass.callWS<UiConfig>({ type: `${DOMAIN}/import_existing` });

export const errorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
};
