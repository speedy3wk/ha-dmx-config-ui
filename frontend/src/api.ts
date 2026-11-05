import type {
  DeployResult,
  HomeAssistant,
  PreviewResult,
  StatusResult,
  Target,
  UiConfig
} from "./types";
import type {
  DmxConfig,
  FixtureSummary,
  FixturesResult,
  MigrationResult,
  OflSearchResult
} from "./types_dmx";

const DOMAIN = "dmx_config_ui";

export type AnyConfig = UiConfig | DmxConfig;

export const fetchConfig = <T extends AnyConfig = UiConfig>(
  hass: HomeAssistant,
  target: Target = "artnet_led"
) => hass.callWS<T>({ type: `${DOMAIN}/get`, target });

export const saveConfig = <T extends AnyConfig = UiConfig>(
  hass: HomeAssistant,
  config: T,
  target: Target = "artnet_led"
) => hass.callWS<{ status: string; config: T }>({ type: `${DOMAIN}/save`, config, target });

export const previewConfig = (hass: HomeAssistant, config: AnyConfig, target: Target = "artnet_led") =>
  hass.callWS<PreviewResult>({ type: `${DOMAIN}/preview`, config, target });

export const deployConfig = (hass: HomeAssistant, config: AnyConfig, target: Target = "artnet_led") =>
  hass.callWS<DeployResult>({ type: `${DOMAIN}/deploy`, config, target });

export const fetchStatus = (hass: HomeAssistant) =>
  hass.callWS<StatusResult>({ type: `${DOMAIN}/status` });

export const importExisting = <T extends AnyConfig = UiConfig>(
  hass: HomeAssistant,
  target: Target = "artnet_led"
) => hass.callWS<T>({ type: `${DOMAIN}/import_existing`, target });

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

export const migrateLegacy = (hass: HomeAssistant, config?: UiConfig) =>
  hass.callWS<MigrationResult>({ type: `${DOMAIN}/migrate`, ...(config ? { config } : {}) });

export const errorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
};
