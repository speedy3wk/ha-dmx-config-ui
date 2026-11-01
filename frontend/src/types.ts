export type ChannelToken = string | number;
export type ChannelSetup = string | ChannelToken[];
export type Path = Array<string | number>;

export type DeviceType =
  | "fixed"
  | "binary"
  | "dimmer"
  | "color_temp"
  | "rgb"
  | "rgbw"
  | "rgbww"
  | "xy";

export interface DeviceConfig {
  channel: number;
  name: string;
  friendly_name?: string;
  type?: DeviceType;
  transition?: number;
  output_correction?: string;
  channel_size?: string;
  channel_setup?: ChannelSetup;
  byte_order?: string;
  min_temp?: string;
  max_temp?: string;
}

export interface UniverseConfig {
  id: number;
  send_partial_universe?: boolean;
  output_correction?: string;
  devices: DeviceConfig[];
}

export interface NodeConfig {
  host: string;
  host_override?: string;
  port?: number;
  port_override?: number;
  max_fps?: number;
  refresh_every?: number;
  node_type?: string;
  universes: UniverseConfig[];
}

export interface UiConfig {
  title?: string;
  nodes: NodeConfig[];
}

export interface ValidationIssue {
  path: Path;
  code: string;
  message: string;
  params?: Record<string, string | number>;
  /** dmx issues may be warnings; everything else is an error. */
  severity?: "error" | "warning";
}

export interface PreviewResult {
  yaml: string;
  current: string;
  diff: string;
  changed: boolean;
  path: string;
  errors: ValidationIssue[];
}

export interface DeployResult {
  status: "written" | "unchanged" | "invalid";
  path: string;
  included?: boolean;
  check_error?: string | null;
  restart_required?: boolean;
  errors?: ValidationIssue[];
  /** dmx only */
  warnings?: ValidationIssue[];
  installed_fixtures?: string[];
}

export interface StatusResult {
  version: string;
  path: string;
  include_key: string;
  file_exists: boolean;
  included: boolean;
  restart_required: boolean;
  artnet_led_installed: boolean;
  backends?: Record<Target, BackendInfo>;
  dmx?: DmxStatus;
}

export interface BackendInfo {
  installed: boolean;
  loaded: boolean;
  version: string | null;
}

export interface DmxStatus {
  path: string;
  file_exists: boolean;
  included: boolean;
  foreign_block: boolean;
}

export type Target = "artnet_led" | "dmx";

/** Minimal subset of the Home Assistant frontend object we rely on. */
export interface HomeAssistant {
  language?: string;
  locale?: { language?: string };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

export const emptyConfig = (): UiConfig => ({ title: "", nodes: [] });
