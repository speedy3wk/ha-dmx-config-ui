/**
 * Import helpers: pasted ha-artnet-led YAML and exported JSON files.
 * Mirrors from_platform_entries()/normalize_config() in model.py (lenient).
 */
import { load } from "js-yaml";
import type { ChannelSetup, DeviceConfig, NodeConfig, UiConfig, UniverseConfig } from "./types";

export class ImportError extends Error {}

type Raw = Record<string, unknown>;

const isObject = (value: unknown): value is Raw =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const optStr = (value: unknown): string | undefined => {
  if (value === undefined || value === null || typeof value === "object") return undefined;
  const text = String(value).trim();
  return text || undefined;
};

const optNum = (value: unknown, integer = false): number | undefined => {
  if (value === undefined || value === null || value === "" || typeof value === "boolean") {
    return undefined;
  }
  const number = Number(value);
  if (!Number.isFinite(number)) return undefined;
  return integer ? Math.trunc(number) : number;
};

const optBool = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const optSetup = (value: unknown): ChannelSetup | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "number") return [Math.trunc(value)];
  if (typeof value === "string") return value.trim() || undefined;
  if (Array.isArray(value)) {
    const tokens = value
      .map((item) => {
        if (typeof item === "number") return Math.trunc(item);
        const text = String(item).trim();
        return /^\d+$/.test(text) ? Number(text) : text;
      })
      .filter((item) => item !== "");
    return tokens.length ? tokens : undefined;
  }
  return undefined;
};

const compact = <T extends object>(data: T): T =>
  Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) as T;

const normalizeDevice = (raw: unknown): DeviceConfig => {
  const data = isObject(raw) ? raw : {};
  return compact({
    channel: optNum(data.channel, true) ?? 1,
    name: optStr(data.name) ?? "",
    friendly_name: optStr(data.friendly_name),
    type: optStr(data.type) as DeviceConfig["type"],
    transition: optNum(data.transition),
    output_correction: optStr(data.output_correction),
    channel_size: optStr(data.channel_size),
    channel_setup: optSetup(data.channel_setup),
    byte_order: optStr(data.byte_order),
    min_temp: optStr(data.min_temp),
    max_temp: optStr(data.max_temp)
  });
};

const normalizeUniverse = (raw: unknown, fallbackId: number): UniverseConfig => {
  const data = isObject(raw) ? raw : {};
  return compact({
    id: optNum(data.id, true) ?? fallbackId,
    send_partial_universe: optBool(data.send_partial_universe),
    output_correction: optStr(data.output_correction),
    devices: Array.isArray(data.devices) ? data.devices.map(normalizeDevice) : []
  });
};

const normalizeNode = (raw: unknown): NodeConfig => {
  const data = isObject(raw) ? raw : {};
  return compact({
    host: optStr(data.host) ?? "",
    host_override: optStr(data.host_override),
    port: optNum(data.port, true),
    port_override: optNum(data.port_override, true),
    max_fps: optNum(data.max_fps, true),
    refresh_every: optNum(data.refresh_every),
    node_type: optStr(data.node_type),
    universes: Array.isArray(data.universes)
      ? data.universes.map((universe, index) => normalizeUniverse(universe, index))
      : []
  });
};

export const normalizeConfig = (raw: unknown): UiConfig => {
  if (!isObject(raw) || !Array.isArray(raw.nodes)) {
    throw new ImportError("expected an object with a 'nodes' list");
  }
  return { title: optStr(raw.title) ?? "", nodes: raw.nodes.map(normalizeNode) };
};

const platformEntryToNode = (entry: Raw): NodeConfig => {
  const universes = entry.universes;
  const list = isObject(universes)
    ? Object.entries(universes).map(([id, value]) => ({ ...(isObject(value) ? value : {}), id }))
    : Array.isArray(universes)
      ? universes
      : [];
  return normalizeNode({ ...entry, universes: list });
};

/** Collect artnet_led platform entries from any of the supported YAML layouts. */
const collectEntries = (data: unknown): Raw[] => {
  if (Array.isArray(data)) {
    return data.filter(isObject).filter((item) => !item.platform || item.platform === "artnet_led");
  }
  if (!isObject(data)) return [];
  if (data.platform !== undefined || data.universes !== undefined) {
    return collectEntries([data]);
  }
  // `light:` / `light xyz:` blocks of a configuration.yaml
  return Object.entries(data)
    .filter(([key]) => key === "light" || key.startsWith("light "))
    .flatMap(([, value]) => collectEntries(Array.isArray(value) ? value : [value]));
};

// Tolerate HA specific tags like !include / !secret when parsing pasted YAML.
const stripTags = (text: string) => text.replace(/!(include\w*|secret|env_var|input)\b[^\n]*/g, "null");

export const configFromYaml = (text: string): UiConfig => {
  let data: unknown;
  try {
    data = load(stripTags(text));
  } catch (err) {
    throw new ImportError((err as Error).message);
  }
  const entries = collectEntries(data);
  if (!entries.length) {
    throw new ImportError("no artnet_led configuration found");
  }
  return { title: "", nodes: entries.map(platformEntryToNode) };
};

export const configFromJson = (text: string): UiConfig => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new ImportError((err as Error).message);
  }
  return normalizeConfig(data);
};
