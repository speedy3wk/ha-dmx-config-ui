import type {
  DeployResult,
  HomeAssistant,
  PreviewResult,
  StatusResult
} from "./types";
import type {
  DmxConfig,
  FixtureSummary,
  FixturesResult,
  OflSearchResult
} from "./types_dmx";

const DOMAIN = "dmx_config_ui";

export const fetchConfig = (hass: HomeAssistant) =>
  hass.callWS<DmxConfig>({ type: `${DOMAIN}/get` });

export const saveConfig = (hass: HomeAssistant, config: DmxConfig) =>
  hass.callWS<{ status: string; config: DmxConfig }>({ type: `${DOMAIN}/save`, config });

export const previewConfig = (hass: HomeAssistant, config: DmxConfig) =>
  hass.callWS<PreviewResult>({ type: `${DOMAIN}/preview`, config });

export const deployConfig = (hass: HomeAssistant, config: DmxConfig) =>
  hass.callWS<DeployResult>({ type: `${DOMAIN}/deploy`, config });

export const fetchStatus = (hass: HomeAssistant) =>
  hass.callWS<StatusResult>({ type: `${DOMAIN}/status` });

export const importExisting = (hass: HomeAssistant) =>
  hass.callWS<DmxConfig>({ type: `${DOMAIN}/import_existing` });

export const fetchFixtures = (hass: HomeAssistant, config?: DmxConfig) =>
  hass.callWS<FixturesResult>({ type: `${DOMAIN}/fixtures`, ...(config ? { config } : {}) });

export const uploadFixture = (hass: HomeAssistant, fileName: string, content: string) =>
  hass.callWS<FixtureSummary>({
    type: `${DOMAIN}/fixtures/upload`,
    file_name: fileName,
    content
  });

export const searchOfl = (hass: HomeAssistant, query: string) =>
  hass.callWS<OflSearchResult[]>({ type: `${DOMAIN}/ofl/search`, query });

export const downloadOfl = (hass: HomeAssistant, key: string) =>
  hass.callWS<FixtureSummary>({ type: `${DOMAIN}/ofl/download`, key });

export const errorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
};
