/**
 * Constants and channel math mirroring
 * custom_components/ha_artnet_led_uiconfig/model.py (keep both in sync).
 */
import type { ChannelSetup, ChannelToken, DeviceConfig, DeviceType, UniverseConfig } from "./types";

export const NODE_TYPES = ["artnet-direct", "artnet-controller", "sacn", "kinet"] as const;
export const DEVICE_TYPES: DeviceType[] = [
  "fixed",
  "binary",
  "dimmer",
  "color_temp",
  "rgb",
  "rgbw",
  "rgbww",
  "xy"
];
export const CORRECTIONS = ["linear", "quadratic", "cubic", "quadruple"] as const;
export const CHANNEL_SIZES: Record<string, number> = { "8bit": 1, "16bit": 2, "24bit": 3, "32bit": 4 };
export const BYTE_ORDERS = ["big", "little"] as const;
export const TEMP_TYPES: DeviceType[] = ["color_temp", "rgbww"];

export const ALLOWED_SETUP_CHARS: Record<DeviceType, string> = {
  fixed: "",
  binary: "",
  dimmer: "d",
  color_temp: "dcChHtT",
  rgb: "drRgGbBuUwW",
  rgbw: "drRgGbBuUwW",
  rgbww: "dcChHtTrRgGbBuU",
  xy: "dxy"
};

export const DEFAULT_SETUP: Record<DeviceType, ChannelSetup> = {
  fixed: [255],
  binary: "d",
  dimmer: "d",
  color_temp: "ch",
  rgb: "rgb",
  rgbw: "rgbw",
  rgbww: "rgbch",
  xy: "dxy"
};

/** Upstream defaults, shown as placeholders. */
export const NODE_DEFAULTS = {
  node_type: "artnet-direct",
  max_fps: 25,
  refresh_every: 120,
  port: 6454
};

export const DMX_CHANNELS = 512;
export const MAX_UNIVERSE = 1024;
export const TEMP_PATTERN = /^\d+[kK]$/;

export const deviceType = (device: Partial<DeviceConfig>): DeviceType =>
  (device.type as DeviceType) || "dimmer";

/** Device types that support a configurable channel_setup. */
export const hasChannelSetup = (type: DeviceType) => type !== "dimmer" && type !== "binary";

export const supportsTemp = (type: DeviceType) => TEMP_TYPES.includes(type);

export const setupTokens = (setup: ChannelSetup | undefined | null): ChannelToken[] => {
  if (setup === undefined || setup === null || setup === "") return [];
  if (Array.isArray(setup)) return [...setup];
  return String(setup).split("");
};

/** Store letters as a compact string and anything containing numbers as a list. */
export const tokensToSetup = (tokens: ChannelToken[]): ChannelSetup | undefined => {
  if (!tokens.length) return undefined;
  if (tokens.every((token) => typeof token === "string" && token.length === 1)) {
    return tokens.join("");
  }
  return [...tokens];
};

export const logicalWidth = (device: Partial<DeviceConfig>): number => {
  const type = deviceType(device);
  if (type === "dimmer" || type === "binary") return 1;
  const setup = device.channel_setup || DEFAULT_SETUP[type] || "d";
  return Math.max(1, setupTokens(setup).length);
};

export const byteSize = (device: Partial<DeviceConfig>) =>
  CHANNEL_SIZES[device.channel_size || "8bit"] ?? 1;

export const deviceWidth = (device: Partial<DeviceConfig>) => logicalWidth(device) * byteSize(device);

export const deviceRange = (device: Partial<DeviceConfig>): [number, number] => {
  const start = Number(device.channel) || 1;
  return [start, start + deviceWidth(device) - 1];
};

export const entitySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

/** First channel where a device of the given width fits without overlapping others. */
export const nextFreeChannel = (
  universe: UniverseConfig,
  width: number,
  ignoreIndex?: number
): number => {
  const ranges = universe.devices
    .filter((_, index) => index !== ignoreIndex)
    .map((device) => deviceRange(device))
    .sort((a, b) => a[0] - b[0]);
  let candidate = 1;
  for (const [start, end] of ranges) {
    if (candidate + width - 1 < start) break;
    if (end >= candidate) candidate = end + 1;
  }
  return Math.min(candidate, DMX_CHANNELS);
};

/** Name that does not collide (by entity slug) with any of the given names. */
export const uniqueName = (base: string, existing: string[]): string => {
  const slugs = new Set(existing.map(entitySlug));
  if (base && !slugs.has(entitySlug(base))) return base;
  const stem = (base || "light").replace(/_\d+$/, "");
  for (let index = 2; ; index++) {
    const candidate = `${stem}_${index}`;
    if (!slugs.has(entitySlug(candidate))) return candidate;
  }
};

/**
 * Drop fields that make no sense for the device type (e.g. after changing the type),
 * mirroring what upstream would reject or ignore.
 */
export const cleanDeviceForType = (device: DeviceConfig): DeviceConfig => {
  const type = deviceType(device);
  const next: DeviceConfig = { ...device };
  if (!supportsTemp(type)) {
    delete next.min_temp;
    delete next.max_temp;
  }
  if (!hasChannelSetup(type)) {
    delete next.channel_setup;
  } else if (next.channel_setup !== undefined) {
    const allowed = ALLOWED_SETUP_CHARS[type];
    const valid = setupTokens(next.channel_setup).every((token) =>
      typeof token === "number" ? token >= 0 && token <= 255 : allowed.includes(token)
    );
    if (!valid) delete next.channel_setup;
  }
  if ((CHANNEL_SIZES[next.channel_size || "8bit"] ?? 1) === 1) {
    delete next.byte_order;
  }
  return next;
};

export interface Occupant {
  index: number;
  name: string;
  start: number;
  end: number;
}

/** Map of DMX slot (1-based) to the devices occupying it. */
export const channelOccupancy = (universe: UniverseConfig): Map<number, Occupant[]> => {
  const map = new Map<number, Occupant[]>();
  universe.devices.forEach((device, index) => {
    const [start, end] = deviceRange(device);
    for (let slot = start; slot <= Math.min(end, DMX_CHANNELS); slot++) {
      const list = map.get(slot) ?? [];
      list.push({ index, name: device.name, start, end });
      map.set(slot, list);
    }
  });
  return map;
};
