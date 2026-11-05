/** Helpers for `dmx:` configurations, mirroring model_dmx.py / fixtures.py. */
import type {
  ArtnetUniverse,
  DmxConfig,
  DmxDevice,
  DmxHost,
  DmxProtocol,
  DmxUniverse,
  FixtureMode,
  FixtureSummary,
  SacnUniverse
} from "./types_dmx";
import { emptyDmxConfig } from "./types_dmx";

export const CURVES = ["linear", "quadratic", "cubic", "quartic", "sine"] as const;
export const DEFAULT_FOLDER = "fixtures";
export const DMX_CHANNELS = 512;
export const MAX_START_ADDRESS = 511;
export const PREFIX_PATTERN = /^[a-z0-9_]+$/;
export const PROTOCOLS: DmxProtocol[] = ["artnet", "sacn"];
export const ARTNET_DEFAULT_PORT = 6454;
export const SACN_DEFAULT_PORT = 5568;

export interface Occupant {
  index: number;
  name: string;
  start: number;
  end: number;
}
/** Defaults of DMX (setup/config_processor.py), shown as placeholders. */
export const DMX_DEFAULTS = {
  max_fps: 30,
  refresh_every: 0.8,
  rate_limit: 0.5,
  source_name: "HA sACN Controller",
  priority: 100,
  sync_address: 0,
  multicast_ttl: 64
} as const;

export const findFixture = (
  fixtures: readonly FixtureSummary[] | undefined,
  identifier: string
): FixtureSummary | undefined => fixtures?.find((fixture) => fixture.aliases.includes(identifier));

export const findMode = (fixture: FixtureSummary, mode?: string | null): FixtureMode | undefined => {
  if (!mode) return fixture.modes[0];
  return fixture.modes.find((candidate) => (candidate.key ?? candidate.name) === mode);
};

/** DMX footprint of a device, or undefined if the fixture/mode is unknown. */
export const dmxDeviceWidth = (
  device: Partial<DmxDevice>,
  fixtures: readonly FixtureSummary[] | undefined
): number | undefined => {
  const fixture = findFixture(fixtures, String(device.fixture ?? ""));
  if (!fixture) return undefined;
  return findMode(fixture, device.mode)?.width;
};

export const isSafeFolder = (folder: string): boolean => {
  const normalized = folder.trim().replace(/\\/g, "/");
  if (!normalized || normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized)) return false;
  return !normalized.split("/").includes("..");
};

/** Approximation of homeassistant.util.slugify (used for entity id prefixes). */
export const slugify = (text: string): string =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const portAddressLabel = (universe: DmxUniverse, protocol: DmxProtocol): string => {
  if (protocol === "sacn") return String(universe.universe);
  const { net = 0, subnet = 0 } = universe as ArtnetUniverse;
  return !net && !subnet ? String(universe.universe) : `${net}/${subnet}/${universe.universe}`;
};

export const universesOf = (config: DmxConfig, protocol: DmxProtocol): DmxUniverse[] =>
  config[protocol].universes;

export const allDevices = (config: DmxConfig): DmxDevice[] =>
  PROTOCOLS.flatMap((protocol) => universesOf(config, protocol).flatMap((u) => u.devices));

export const dmxOccupancy = (
  universe: DmxUniverse,
  fixtures: readonly FixtureSummary[] | undefined
): Map<number, Occupant[]> => {
  const map = new Map<number, Occupant[]>();
  universe.devices.forEach((device, index) => {
    const width = dmxDeviceWidth(device, fixtures) ?? 1;
    const start = device.start_address;
    if (!Number.isInteger(start) || start < 1) return;
    const end = start + width - 1;
    for (let slot = start; slot <= Math.min(end, DMX_CHANNELS); slot++) {
      const list = map.get(slot) ?? [];
      list.push({ index, name: device.name, start, end });
      map.set(slot, list);
    }
  });
  return map;
};

/** First start address with `width` free channels, or 1 if the universe is full. */
export const nextFreeAddress = (
  universe: DmxUniverse,
  fixtures: readonly FixtureSummary[] | undefined,
  width: number,
  ignoreIndex = -1
): number => {
  const used = new Array<boolean>(DMX_CHANNELS + 2).fill(false);
  universe.devices.forEach((device, index) => {
    if (index === ignoreIndex) return;
    const deviceWidth = dmxDeviceWidth(device, fixtures) ?? 1;
    for (let slot = device.start_address; slot < device.start_address + deviceWidth; slot++) {
      if (slot >= 1 && slot <= DMX_CHANNELS) used[slot] = true;
    }
  });
  for (let start = 1; start + width - 1 <= DMX_CHANNELS && start <= MAX_START_ADDRESS; start++) {
    let free = true;
    for (let slot = start; slot < start + width; slot++) {
      if (used[slot]) {
        free = false;
        start = slot;
        break;
      }
    }
    if (free) return start;
  }
  return 1;
};

export const uniqueDmxName = (base: string, existing: readonly string[]): string => {
  if (!existing.includes(base)) return base;
  const stem = base.replace(/\s+\d+$/, "");
  let index = 2;
  while (existing.includes(`${stem} ${index}`)) index++;
  return `${stem} ${index}`;
};

export const newArtnetUniverse = (config: DmxConfig): ArtnetUniverse => {
  const used = new Set(
    config.artnet.universes.map((u) => `${u.net ?? 0}/${u.subnet ?? 0}/${u.universe}`)
  );
  let number = 0;
  while (used.has(`0/0/${number}`) && number < 511) number++;
  return { net: 0, subnet: 0, universe: number, manual_nodes: [], devices: [] };
};

export const newSacnUniverse = (config: DmxConfig): SacnUniverse => {
  const used = new Set(config.sacn.universes.map((u) => u.universe));
  let number = 1;
  while (used.has(number) && number < 63999) number++;
  return { universe: number, unicast_addresses: [], devices: [] };
};

// --------------------------------------------------------------------------- normalization

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const extraFields = (
  data: Record<string, unknown>,
  known: readonly string[]
): Record<string, unknown> | undefined => {
  const extra = isObject(data._extra) ? { ...data._extra } : {};
  for (const [key, value] of Object.entries(data)) {
    if (key !== "_extra" && !known.includes(key)) extra[key] = value;
  }
  return Object.keys(extra).length ? extra : undefined;
};

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const num = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const str = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined;
  const text = String(value).trim();
  return text || undefined;
};

const compact = <T extends object>(value: T): T => {
  for (const key of Object.keys(value) as Array<keyof T>) {
    if (value[key] === undefined) delete value[key];
  }
  return value;
};

const hosts = (value: unknown): DmxHost[] =>
  list(value)
    .filter(isObject)
    .map((host) =>
      compact({
        host: str(host.host) ?? "",
        port: num(host.port),
        _extra: extraFields(host, ["host", "port"])
      })
    );

const device = (value: unknown): DmxDevice => {
  const data = isObject(value) ? value : {};
  let correction: DmxDevice["output_correction"];
  if (typeof data.output_correction === "string" && data.output_correction.trim()) {
    correction = { curve: data.output_correction.trim() };
  } else if (isObject(data.output_correction)) {
    correction = compact({
      curve: str(data.output_correction.curve),
      min: num(data.output_correction.min),
      max: num(data.output_correction.max),
      _extra: extraFields(data.output_correction, ["curve", "min", "max"])
    });
    if (!Object.keys(correction).length) correction = undefined;
  }
  return compact({
    name: str(data.name) ?? "",
    start_address: num(data.start_address) ?? 1,
    fixture: str(data.fixture) ?? "",
    mode: str(data.mode),
    entity_id_prefix: str(data.entity_id_prefix),
    output_correction: correction,
    _extra: extraFields(data, [
      "name",
      "start_address",
      "fixture",
      "mode",
      "entity_id_prefix",
      "output_correction"
    ])
  });
};

/** Lenient structural cleanup for imported JSON (the backend normalizes again on save). */
export const normalizeDmxConfig = (raw: unknown): DmxConfig => {
  if (!isObject(raw)) return emptyDmxConfig();
  const artnet = isObject(raw.artnet) ? raw.artnet : {};
  const sacn = isObject(raw.sacn) ? raw.sacn : {};
  const settings = (data: Record<string, unknown>, keys: string[]) =>
    compact(
      Object.fromEntries(
        keys.map((key) => [
          key,
          key === "source_name" || key === "interface_ip"
            ? str(data[key])
            : key === "enable_preview_data"
              ? typeof data[key] === "boolean"
                ? data[key]
                : undefined
              : num(data[key])
        ])
      )
    );
  const protocolSettings = (data: Record<string, unknown>, keys: string[]) =>
    compact({
      ...settings(data, keys),
      _extra: extraFields(data, [...keys, "universes"])
    });
  return compact({
    fixtures_folder: str(raw.fixtures_folder) ?? DEFAULT_FOLDER,
    max_fps: num(raw.max_fps),
    _extra: extraFields(raw, [
      "fixtures_folder",
      "max_fps",
      "fixtures_extra",
      "animation_extra",
      "artnet",
      "sacn"
    ]),
    fixtures_extra: isObject(raw.fixtures_extra) ? raw.fixtures_extra : undefined,
    animation_extra: isObject(raw.animation_extra) ? raw.animation_extra : undefined,
    artnet: {
      ...protocolSettings(artnet, ["refresh_every", "rate_limit"]),
      universes: list(artnet.universes)
        .filter(isObject)
        .map((u) =>
          compact({
            net: num(u.net) ?? 0,
            subnet: num(u.subnet) ?? 0,
            universe: num(u.universe) ?? 0,
            send_partial_universe:
              typeof u.send_partial_universe === "boolean" ? u.send_partial_universe : undefined,
            manual_nodes: hosts(u.manual_nodes),
            devices: list(u.devices).map(device),
            _extra: extraFields(u, [
              "net",
              "subnet",
              "universe",
              "send_partial_universe",
              "manual_nodes",
              "devices",
              "_compatibility_extra"
            ]),
            _compatibility_extra: isObject(u._compatibility_extra)
              ? u._compatibility_extra
              : undefined
          })
        )
    },
    sacn: {
      ...protocolSettings(sacn, [
        "source_name",
        "priority",
        "interface_ip",
        "sync_address",
        "multicast_ttl",
        "enable_preview_data",
        "refresh_every",
        "rate_limit"
      ]),
      universes: list(sacn.universes)
        .filter(isObject)
        .map((u) => ({
          universe: num(u.universe) ?? 1,
          unicast_addresses: hosts(u.unicast_addresses),
          devices: list(u.devices).map(device),
          _extra: extraFields(u, [
            "universe",
            "unicast_addresses",
            "devices",
            "_compatibility_extra"
          ]),
          _compatibility_extra: isObject(u._compatibility_extra) ? u._compatibility_extra : undefined
        }))
    }
  }) as DmxConfig;
};

export const isDmxConfig = (value: unknown): boolean =>
  isObject(value) && ("artnet" in value || "sacn" in value || "fixtures_folder" in value);

export const dmxHasContent = (config: DmxConfig | undefined): boolean =>
  Boolean(config && (config.artnet.universes.length || config.sacn.universes.length));
