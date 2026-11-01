/** Types for ha-artnet-led 1.x (`dmx:`) configurations, mirroring model_dmx.py. */

export interface DmxHost {
  host: string;
  port?: number;
  _extra?: Record<string, unknown>;
}

export interface DmxOutputCorrection {
  curve?: string;
  min?: number;
  max?: number;
  _extra?: Record<string, unknown>;
}

export interface DmxDevice {
  name: string;
  start_address: number;
  fixture: string;
  mode?: string;
  entity_id_prefix?: string;
  output_correction?: DmxOutputCorrection;
  _extra?: Record<string, unknown>;
}

export interface ArtnetUniverse {
  net?: number;
  subnet?: number;
  universe: number;
  send_partial_universe?: boolean;
  manual_nodes?: DmxHost[];
  devices: DmxDevice[];
  _extra?: Record<string, unknown>;
  _compatibility_extra?: Record<string, unknown>;
}

export interface SacnUniverse {
  universe: number;
  unicast_addresses?: DmxHost[];
  devices: DmxDevice[];
  _extra?: Record<string, unknown>;
  _compatibility_extra?: Record<string, unknown>;
}

export interface ArtnetSettings {
  refresh_every?: number;
  rate_limit?: number;
  universes: ArtnetUniverse[];
  _extra?: Record<string, unknown>;
}

export interface SacnSettings {
  source_name?: string;
  priority?: number;
  interface_ip?: string;
  sync_address?: number;
  multicast_ttl?: number;
  enable_preview_data?: boolean;
  refresh_every?: number;
  rate_limit?: number;
  universes: SacnUniverse[];
  _extra?: Record<string, unknown>;
}

export interface DmxConfig {
  fixtures_folder: string;
  max_fps?: number;
  artnet: ArtnetSettings;
  sacn: SacnSettings;
  _extra?: Record<string, unknown>;
  fixtures_extra?: Record<string, unknown>;
  animation_extra?: Record<string, unknown>;
}

export type DmxProtocol = "artnet" | "sacn";
export type DmxUniverse = ArtnetUniverse | SacnUniverse;

export type ChannelKind = "number" | "select" | "fine" | "switching" | "empty" | "unknown";

export interface FixtureChannel {
  name: string | null;
  kind: ChannelKind;
  type: string | null;
  pixel: string | null;
}

export interface FixtureMode {
  key: string;
  name: string;
  short_name?: string | null;
  width: number;
  exact: boolean;
  channels?: FixtureChannel[];
  entities?: { light: number; number: number; select: number };
}

export interface FixtureSummary {
  key: string;
  name: string;
  short_name?: string | null;
  fixture_key?: string;
  manufacturer_key?: string;
  aliases: string[];
  categories?: string[];
  modes: FixtureMode[];
  file?: string;
  source?: "folder" | "bundled";
  installed?: boolean;
}

export interface FixturesResult {
  fixtures: FixtureSummary[];
  errors: Array<{ file: string; error: string }>;
  folder_exists: boolean;
  folder?: string;
}

export interface OflSearchResult {
  key: string;
  name: string;
  manufacturer: string;
  fixture: string;
}

export interface MigrationWarning {
  code: string;
  device: string | null;
  params: Record<string, string | number | null | unknown>;
}

export interface MigrationResult {
  config: DmxConfig;
  warnings: MigrationWarning[];
  fixtures: string[];
}

export const emptyDmxConfig = (): DmxConfig => ({
  fixtures_folder: "fixtures",
  artnet: { universes: [] },
  sacn: { universes: [] }
});
