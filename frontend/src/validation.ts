/**
 * Strict validation mirroring validate_config() in
 * custom_components/dmx_config_ui/model.py (same paths and codes).
 */
import {
  ALLOWED_SETUP_CHARS,
  BYTE_ORDERS,
  CHANNEL_SIZES,
  CORRECTIONS,
  DEVICE_TYPES,
  DMX_CHANNELS,
  MAX_UNIVERSE,
  NODE_TYPES,
  TEMP_PATTERN,
  deviceRange,
  deviceType,
  entitySlug,
  supportsTemp
} from "./model";
import type { DeviceConfig, Path, UiConfig, ValidationIssue } from "./types";

type Issues = ValidationIssue[];

const issue = (
  path: Path,
  code: string,
  message: string,
  params?: ValidationIssue["params"]
): ValidationIssue => ({ path, code, message, ...(params ? { params } : {}) });

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const checkRange = (issues: Issues, value: unknown, path: Path, low: number, high: number) => {
  if (value === undefined || value === null) return;
  if (!isNumber(value) || value < low || value > high) {
    issues.push(issue(path, "range", `must be between ${low} and ${high}`, { low, high }));
  }
};

const checkChoice = (issues: Issues, value: unknown, path: Path, choices: readonly string[]) => {
  if (value === undefined || value === null) return;
  if (!choices.includes(value as string)) {
    issues.push(
      issue(path, "choice", `must be one of: ${choices.join(", ")}`, { choices: choices.join(", ") })
    );
  }
};

const validateDevice = (issues: Issues, device: DeviceConfig, path: Path) => {
  const type = deviceType(device);
  if (!String(device.name ?? "").trim()) {
    issues.push(issue([...path, "name"], "required", "name is required"));
  }
  checkChoice(issues, device.type, [...path, "type"], DEVICE_TYPES);
  checkRange(issues, device.channel, [...path, "channel"], 1, DMX_CHANNELS);
  checkRange(issues, device.transition, [...path, "transition"], 0, 999);
  checkChoice(issues, device.output_correction, [...path, "output_correction"], CORRECTIONS);
  checkChoice(issues, device.channel_size, [...path, "channel_size"], Object.keys(CHANNEL_SIZES));
  checkChoice(issues, device.byte_order, [...path, "byte_order"], BYTE_ORDERS);
  if (supportsTemp(type)) {
    for (const key of ["min_temp", "max_temp"] as const) {
      const value = device[key];
      if (value !== undefined && value !== null && !TEMP_PATTERN.test(String(value))) {
        issues.push(issue([...path, key], "temp", "must look like 2700K"));
      }
    }
  }

  const setup = device.channel_setup;
  const allowed = ALLOWED_SETUP_CHARS[type];
  if (setup !== undefined && setup !== null && allowed !== undefined && type !== "binary") {
    const tokens = Array.isArray(setup) ? setup : String(setup).split("");
    for (const token of tokens) {
      if (typeof token === "number") {
        if (token < 0 || token > 255) {
          issues.push(issue([...path, "channel_setup"], "setup_value", "static values: 0-255"));
        }
      } else if (!allowed.includes(token)) {
        issues.push(
          issue([...path, "channel_setup"], "setup_char", `'${token}' is not allowed for type ${type}`, {
            token,
            type
          })
        );
      }
    }
  }

  const channel = device.channel;
  if (Number.isInteger(channel) && channel >= 1 && channel <= DMX_CHANNELS) {
    const [, end] = deviceRange(device);
    if (end > DMX_CHANNELS) {
      issues.push(
        issue([...path, "channel"], "overflow", `device ends at channel ${end} (> 512)`, { end })
      );
    }
  }
};

export const validateConfig = (config: UiConfig): ValidationIssue[] => {
  const issues: Issues = [];
  const slugs = new Set<string>();

  (config.nodes ?? []).forEach((node, nodeIndex) => {
    const nodePath: Path = ["nodes", nodeIndex];
    if (!String(node.host ?? "").trim()) {
      issues.push(issue([...nodePath, "host"], "required", "host is required"));
    }
    checkChoice(issues, node.node_type, [...nodePath, "node_type"], NODE_TYPES);
    checkRange(issues, node.port, [...nodePath, "port"], 1, 65535);
    checkRange(issues, node.port_override, [...nodePath, "port_override"], 1, 65535);
    checkRange(issues, node.max_fps, [...nodePath, "max_fps"], 1, 50);
    checkRange(issues, node.refresh_every, [...nodePath, "refresh_every"], 0, 9999);

    if (!node.universes?.length) {
      issues.push(issue([...nodePath, "universes"], "required", "at least one universe"));
    }

    const seenIds = new Set<number>();
    (node.universes ?? []).forEach((universe, universeIndex) => {
      const universePath: Path = [...nodePath, "universes", universeIndex];
      checkRange(issues, universe.id, [...universePath, "id"], 0, MAX_UNIVERSE);
      if (seenIds.has(universe.id)) {
        issues.push(issue([...universePath, "id"], "duplicate", "duplicate universe id"));
      }
      seenIds.add(universe.id);
      checkChoice(issues, universe.output_correction, [...universePath, "output_correction"], CORRECTIONS);

      const occupied: Array<[number, number, string]> = [];
      (universe.devices ?? []).forEach((device, deviceIndex) => {
        const devicePath: Path = [...universePath, "devices", deviceIndex];
        validateDevice(issues, device, devicePath);

        const slug = entitySlug(String(device.name ?? ""));
        if (slug) {
          if (slugs.has(slug)) {
            issues.push(issue([...devicePath, "name"], "duplicate", "duplicate light name"));
          } else {
            slugs.add(slug);
          }
        }

        if (Number.isInteger(device.channel)) {
          const [start, end] = deviceRange(device);
          for (const [otherStart, otherEnd, otherName] of occupied) {
            if (start <= otherEnd && otherStart <= end) {
              issues.push(
                issue(
                  [...devicePath, "channel"],
                  "overlap",
                  `channels ${start}-${end} overlap with '${otherName}' (${otherStart}-${otherEnd})`,
                  { start, end, other: otherName, otherStart, otherEnd }
                )
              );
              break;
            }
          }
          occupied.push([start, end, String(device.name ?? "")]);
        }
      });
    });
  });

  return issues;
};

export const pathKey = (path: Path) => path.join(".");

/** Index issues by their exact path and by every ancestor path. */
export class IssueIndex {
  private readonly exact = new Map<string, ValidationIssue[]>();
  private readonly nested = new Map<string, ValidationIssue[]>();

  constructor(public readonly issues: ValidationIssue[] = []) {
    for (const item of issues) {
      const key = pathKey(item.path);
      this.exact.set(key, [...(this.exact.get(key) ?? []), item]);
      for (let length = 0; length <= item.path.length; length++) {
        const prefix = pathKey(item.path.slice(0, length));
        this.nested.set(prefix, [...(this.nested.get(prefix) ?? []), item]);
      }
    }
  }

  at(path: Path): ValidationIssue[] {
    return this.exact.get(pathKey(path)) ?? [];
  }

  within(path: Path): ValidationIssue[] {
    return this.nested.get(pathKey(path)) ?? [];
  }
}
