/**
 * Strict validation mirroring validate_config() in
 * custom_components/dmx_config_ui/model_dmx.py (same paths, codes and severities).
 */
import {
  CURVES,
  DMX_CHANNELS,
  MAX_START_ADDRESS,
  PREFIX_PATTERN,
  PROTOCOLS,
  findFixture,
  findMode,
  isSafeFolder
} from "./model_dmx";
import type { Path, ValidationIssue } from "./types";
import type { ArtnetUniverse, DmxConfig, DmxDevice, DmxHost, FixtureSummary, SacnUniverse } from "./types_dmx";

type Issues = ValidationIssue[];
type Severity = "error" | "warning";

const issue = (
  path: Path,
  code: string,
  message: string,
  params?: ValidationIssue["params"],
  severity: Severity = "error"
): ValidationIssue => ({ path, code, message, severity, ...(params ? { params } : {}) });

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const checkRange = (issues: Issues, value: unknown, path: Path, low: number, high: number): boolean => {
  if (value === undefined || value === null) return true;
  if (!isNumber(value) || value < low || value > high) {
    issues.push(issue(path, "range", `must be between ${low} and ${high}`, { low, high }));
    return false;
  }
  return true;
};

const validateHosts = (issues: Issues, hosts: DmxHost[] | undefined, path: Path) => {
  (hosts ?? []).forEach((host, index) => {
    if (!String(host.host ?? "").trim()) {
      issues.push(issue([...path, index, "host"], "required", "host is required"));
    }
    checkRange(issues, host.port, [...path, index, "port"], 1, 65535);
  });
};

const validateDevice = (
  issues: Issues,
  device: DmxDevice,
  path: Path,
  fixtures: readonly FixtureSummary[] | undefined
): number | undefined => {
  if (!String(device.name ?? "").trim()) {
    issues.push(issue([...path, "name"], "required", "name is required"));
  }
  const startOk = checkRange(issues, device.start_address, [...path, "start_address"], 1, MAX_START_ADDRESS);
  const prefix = device.entity_id_prefix;
  if (prefix !== undefined && prefix !== null && !PREFIX_PATTERN.test(String(prefix))) {
    issues.push(issue([...path, "entity_id_prefix"], "prefix", "use lowercase letters, digits and _"));
  }

  const correction = device.output_correction;
  if (correction && Object.keys(correction).length) {
    const curve = correction.curve;
    if (curve !== undefined && curve !== null && !(CURVES as readonly string[]).includes(curve)) {
      issues.push(
        issue([...path, "output_correction", "curve"], "choice", `must be one of: ${CURVES.join(", ")}`, {
          choices: CURVES.join(", ")
        })
      );
    }
    const lowOk = checkRange(issues, correction.min, [...path, "output_correction", "min"], 0, 1);
    const highOk = checkRange(issues, correction.max, [...path, "output_correction", "max"], 0, 1);
    const { min, max } = correction;
    if (lowOk && highOk && isNumber(min) && isNumber(max) && min >= max) {
      issues.push(issue([...path, "output_correction", "min"], "min_max", "min must be below max"));
    }
  }

  const fixtureName = String(device.fixture ?? "").trim();
  if (!fixtureName) {
    issues.push(issue([...path, "fixture"], "required", "fixture is required"));
    return undefined;
  }
  if (!fixtures) return undefined;
  const fixture = findFixture(fixtures, fixtureName);
  if (!fixture) {
    issues.push(
      issue(
        [...path, "fixture"],
        "fixture_unknown",
        `fixture '${fixtureName}' is not in the fixtures folder`,
        { fixture: fixtureName },
        "warning"
      )
    );
    return undefined;
  }
  const mode = findMode(fixture, device.mode);
  if (!mode) {
    const modes = fixture.modes.map((m) => m.key ?? m.name).join(", ");
    issues.push(issue([...path, "mode"], "mode_unknown", `must be one of: ${modes}`, { choices: modes }));
    return undefined;
  }
  if (mode.exact === false) {
    issues.push(
      issue(
        [...path, "mode"],
        "width_estimated",
        "channel count of this mode could only be estimated",
        undefined,
        "warning"
      )
    );
  }
  const width = mode.width;
  const start = device.start_address;
  if (startOk && Number.isInteger(start) && start + width - 1 > DMX_CHANNELS) {
    const end = start + width - 1;
    issues.push(issue([...path, "start_address"], "overflow", `device ends at channel ${end} (> 512)`, { end }));
  }
  return width;
};

export const validateDmxConfig = (
  config: DmxConfig,
  fixtures?: readonly FixtureSummary[]
): ValidationIssue[] => {
  const issues: Issues = [];
  const folder = String(config.fixtures_folder ?? "").trim();
  if (!folder) {
    issues.push(issue(["fixtures_folder"], "required", "folder is required"));
  } else if (!isSafeFolder(String(config.fixtures_folder))) {
    issues.push(issue(["fixtures_folder"], "folder", "must stay inside the config folder"));
  }
  checkRange(issues, config.max_fps, ["max_fps"], 1, 43);

  for (const protocol of PROTOCOLS) {
    const settings = config[protocol] ?? { universes: [] };
    checkRange(issues, settings.refresh_every, [protocol, "refresh_every"], 0, 9999);
    checkRange(issues, settings.rate_limit, [protocol, "rate_limit"], 0, 9999);
  }

  const sacn = config.sacn ?? { universes: [] };
  checkRange(issues, sacn.priority, ["sacn", "priority"], 0, 200);
  checkRange(issues, sacn.multicast_ttl, ["sacn", "multicast_ttl"], 1, 255);
  checkRange(issues, sacn.sync_address, ["sacn", "sync_address"], 0, 63999);
  if (String(sacn.source_name ?? "").length > 63) {
    issues.push(issue(["sacn", "source_name"], "length", "max. 63 characters"));
  }

  const names = new Set<string>();
  const prefixes = new Set<string>();

  for (const protocol of PROTOCOLS) {
    const seen = new Set<string>();
    (config[protocol]?.universes ?? []).forEach((universe, index) => {
      const universePath: Path = [protocol, "universes", index];
      let ok: boolean;
      let ident: string;
      if (protocol === "artnet") {
        const artnet = universe as ArtnetUniverse;
        ok = [
          checkRange(issues, artnet.net, [...universePath, "net"], 0, 15),
          checkRange(issues, artnet.subnet, [...universePath, "subnet"], 0, 15),
          checkRange(issues, artnet.universe, [...universePath, "universe"], 0, 511)
        ].every(Boolean);
        ident = `${artnet.net ?? 0}/${artnet.subnet ?? 0}/${artnet.universe}`;
        validateHosts(issues, artnet.manual_nodes, [...universePath, "manual_nodes"]);
      } else {
        const sacnUniverse = universe as SacnUniverse;
        ok = checkRange(issues, sacnUniverse.universe, [...universePath, "universe"], 1, 63999);
        ident = String(sacnUniverse.universe);
        validateHosts(issues, sacnUniverse.unicast_addresses, [...universePath, "unicast_addresses"]);
      }
      if (ok && seen.has(ident)) {
        issues.push(issue([...universePath, "universe"], "duplicate", "duplicate universe"));
      }
      seen.add(ident);

      const occupied: Array<[number, number, string]> = [];
      (universe.devices ?? []).forEach((device, deviceIndex) => {
        const devicePath: Path = [...universePath, "devices", deviceIndex];
        const width = validateDevice(issues, device, devicePath, fixtures);

        const name = String(device.name ?? "").trim();
        if (name) {
          if (names.has(name)) issues.push(issue([...devicePath, "name"], "duplicate", "duplicate name"));
          names.add(name);
        }
        const prefix = device.entity_id_prefix;
        if (prefix) {
          if (prefixes.has(prefix)) {
            issues.push(issue([...devicePath, "entity_id_prefix"], "duplicate", "duplicate prefix"));
          }
          prefixes.add(prefix);
        }

        const start = device.start_address;
        if (width && Number.isInteger(start) && start >= 1 && start <= MAX_START_ADDRESS) {
          const end = start + width - 1;
          for (const [otherStart, otherEnd, otherName] of occupied) {
            if (start <= otherEnd && otherStart <= end) {
              issues.push(
                issue(
                  [...devicePath, "start_address"],
                  "overlap",
                  `channels ${start}-${end} overlap with '${otherName}' (${otherStart}-${otherEnd})`,
                  { start, end, other: otherName, otherStart, otherEnd }
                )
              );
              break;
            }
          }
          occupied.push([start, end, name]);
        }
      });
    });
  }
  return issues;
};

export const errorsOnly = (issues: readonly ValidationIssue[]) =>
  issues.filter((item) => (item.severity ?? "error") === "error");
