import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { issueText, type Translate } from "../i18n";
import { IssueIndex } from "../issue-index";
import {
  ARTNET_DEFAULT_PORT,
  DEFAULT_FOLDER,
  DMX_DEFAULTS,
  SACN_DEFAULT_PORT,
  allDevices,
  dmxDeviceWidth,
  dmxOccupancy,
  findFixture,
  findMode,
  newArtnetUniverse,
  newSacnUniverse,
  nextFreeAddress,
  portAddressLabel,
  uniqueDmxName
} from "../model_dmx";
import type { Path, ValidationIssue } from "../types";
import type {
  ArtnetUniverse,
  DmxConfig,
  DmxDevice,
  DmxHost,
  DmxProtocol,
  DmxUniverse,
  FixtureSummary,
  SacnUniverse
} from "../types_dmx";
import { safeDefine } from "../utils/define";
import { clone, moveItem } from "../utils/mutate";
import { checkField, icon, numberField, sharedStyles, textField } from "../utils/ui";
import { deviceColor } from "./channel-map";
import type { DmxDeviceLocation, DmxDeviceSaveDetail } from "./dmx-device-dialog";
import "./channel-map";
import "./dmx-device-dialog";

const isError = (issue: ValidationIssue) => (issue.severity ?? "error") === "error";

/** Visual editor for DMX. Fires `config-changed` with {config} and `open-library`. */
export class AluDmxEditor extends LitElement {
  @property({ attribute: false }) public config!: DmxConfig;
  @property({ attribute: false }) public fixtures?: FixtureSummary[];
  @property({ attribute: false }) public issues = new IssueIndex();
  @property({ attribute: false }) public t!: Translate;

  @state() private _editing?: { location: DmxDeviceLocation; device: DmxDevice };

  private _commit(mutate: (config: DmxConfig) => void) {
    const config = clone(this.config);
    mutate(config);
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config } }));
  }

  private _errors(path: Path) {
    return this.issues.at(path).filter(isError).map((issue) => issueText(this.t, issue));
  }

  private _warnings(path: Path) {
    return this.issues
      .at(path)
      .filter((issue) => !isError(issue))
      .map((issue) => issueText(this.t, issue));
  }

  private _openLibrary() {
    this.dispatchEvent(new CustomEvent("open-library"));
  }

  // ------------------------------------------------------------------ devices

  private _newDevice(universe: DmxUniverse): DmxDevice {
    const last = universe.devices[universe.devices.length - 1];
    const fixture =
      (last && findFixture(this.fixtures, last.fixture)) ??
      findFixture(this.fixtures, "RGB") ??
      this.fixtures?.[0];
    const mode = last && fixture === findFixture(this.fixtures, last.fixture) ? last.mode : undefined;
    const width = (fixture && findMode(fixture, mode)?.width) || 1;
    const names = allDevices(this.config).map((d) => d.name);
    return {
      name: uniqueDmxName(fixture?.name ?? "Fixture", names),
      start_address: nextFreeAddress(universe, this.fixtures, width),
      fixture: fixture?.key ?? "",
      ...(mode ? { mode } : {})
    };
  }

  private _openDevice(location: DmxDeviceLocation) {
    const universe = this.config[location.protocol].universes[location.universe];
    const device =
      location.device >= 0 ? clone(universe.devices[location.device]) : this._newDevice(universe);
    this._editing = { location, device };
  }

  private _saveDevice(ev: CustomEvent<DmxDeviceSaveDetail>) {
    const { device, from, to } = ev.detail;
    this._commit((config) => {
      const source = config[from.protocol].universes[from.universe].devices;
      const target = config[to.protocol].universes[to.universe].devices;
      if (from.device < 0) target.push(device);
      else if (from.protocol === to.protocol && from.universe === to.universe) source[from.device] = device;
      else {
        source.splice(from.device, 1);
        target.push(device);
      }
    });
    this._editing = undefined;
  }

  private _duplicateDevice(universe: DmxUniverse, device: DmxDevice): DmxDevice {
    const width = dmxDeviceWidth(device, this.fixtures) ?? 1;
    const names = allDevices(this.config).map((d) => d.name);
    const copy: DmxDevice = {
      ...clone(device),
      name: uniqueDmxName(device.name || "Fixture", names),
      start_address: nextFreeAddress(universe, this.fixtures, width)
    };
    delete copy.entity_id_prefix;
    return copy;
  }

  private _renderDevice(protocol: DmxProtocol, u: number, d: number, device: DmxDevice, count: number) {
    const t = this.t;
    const path: Path = [protocol, "universes", u, "devices", d];
    const problems = this.issues.within(path);
    const errors = problems.filter(isError);
    const warnings = problems.filter((p) => !isError(p));
    const fixture = findFixture(this.fixtures, device.fixture);
    const mode = fixture ? findMode(fixture, device.mode) : undefined;
    const width = mode?.width;
    const start = device.start_address;
    const range = width && width > 1 ? `${start}–${start + width - 1}` : `${start}`;
    const universe = this.config[protocol].universes[u];
    const entities = mode?.entities;
    return html`
      <li class="device ${errors.length ? "invalid" : warnings.length ? "warning" : ""}">
        <span class="swatch" style="background:${deviceColor(d)}"></span>
        <button class="device-main" @click=${() => this._openDevice({ protocol, universe: u, device: d })} title=${t("edit")}>
          ${icon(entities && (entities.select || entities.number > 4) ? "mdi:spotlight-beam" : "mdi:lightbulb")}
          <span class="device-text">
            <span class="device-name">${device.name || "—"}</span>
            <span class="device-meta">
              ${fixture?.name ?? device.fixture ?? "?"}${mode ? ` · ${mode.name}` : ""} · ${range}
              ${width ? `(${width} ch)` : nothing}
              ${device.entity_id_prefix ? html` · <code>${device.entity_id_prefix}</code>` : nothing}
            </span>
            ${errors.map((issue) => html`<span class="device-error">${issueText(t, issue)}</span>`)}
            ${warnings.map((issue) => html`<span class="device-warning">${issueText(t, issue)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${t("moveUp")} aria-label=${t("moveUp")} ?disabled=${d === 0}
            @click=${() => this._commit((c) => moveItem(c[protocol].universes[u].devices, d, d - 1))}>
            ${icon("mdi:arrow-up")}
          </button>
          <button class="icon" title=${t("moveDown")} aria-label=${t("moveDown")} ?disabled=${d === count - 1}
            @click=${() => this._commit((c) => moveItem(c[protocol].universes[u].devices, d, d + 1))}>
            ${icon("mdi:arrow-down")}
          </button>
          <button class="icon" title=${t("duplicate")} aria-label=${t("duplicate")}
            @click=${() =>
              this._commit((c) =>
                c[protocol].universes[u].devices.splice(d + 1, 0, this._duplicateDevice(universe, device))
              )}>
            ${icon("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
            @click=${() => this._commit((c) => c[protocol].universes[u].devices.splice(d, 1))}>
            ${icon("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `;
  }

  // ---------------------------------------------------------------- universes

  private _setUniverse(protocol: DmxProtocol, u: number, key: string, value: unknown) {
    this._commit((config) => {
      const universe = config[protocol].universes[u] as unknown as Record<string, unknown>;
      if (value === undefined) delete universe[key];
      else universe[key] = value;
    });
  }

  private _renderHosts(
    protocol: DmxProtocol,
    u: number,
    key: "manual_nodes" | "unicast_addresses",
    hosts: DmxHost[],
    defaultPort: number
  ) {
    const t = this.t;
    const base: Path = [protocol, "universes", u, key];
    const update = (mutate: (list: DmxHost[]) => void) =>
      this._commit((config) => {
        const universe = config[protocol].universes[u] as unknown as Record<string, DmxHost[]>;
        universe[key] = universe[key] ?? [];
        mutate(universe[key]);
      });
    return html`
      <div class="hosts">
        <span class="label">${t(key === "manual_nodes" ? "dmxManualNodes" : "dmxUnicast")}</span>
        ${hosts.map(
          (host, index) => html`<div class="host-row">
            ${textField({
              label: t("host"),
              required: true,
              value: host.host,
              placeholder: "192.168.0.10",
              errors: this._errors([...base, index, "host"]),
              onChange: (value) => update((list) => (list[index].host = value ?? ""))
            })}
            ${numberField({
              label: t("port"),
              value: host.port,
              min: 1,
              max: 65535,
              placeholder: String(defaultPort),
              errors: this._errors([...base, index, "port"]),
              onChange: (value) =>
                update((list) => {
                  if (value === undefined) delete list[index].port;
                  else list[index].port = value;
                })
            })}
            <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
              @click=${() => update((list) => list.splice(index, 1))}>
              ${icon("mdi:delete-outline")}
            </button>
          </div>`
        )}
        <div><button class="small" @click=${() => update((list) => list.push({ host: "" }))}>${icon("mdi:plus")} ${t("dmxAddHost")}</button></div>
      </div>
    `;
  }

  private _renderUniverse(protocol: DmxProtocol, universe: DmxUniverse, u: number) {
    const t = this.t;
    const path: Path = [protocol, "universes", u];
    const problems = this.issues.within(path);
    const errorCount = problems.filter(isError).length;
    const occupancy = dmxOccupancy(universe, this.fixtures);
    const artnet = protocol === "artnet" ? (universe as ArtnetUniverse) : undefined;
    const sacn = protocol === "sacn" ? (universe as SacnUniverse) : undefined;
    return html`
      <section class="universe">
        <header>
          <h3>${t("universe")} ${portAddressLabel(universe, protocol)}</h3>
          ${errorCount ? html`<span class="badge">${errorCount}</span>` : nothing}
          <span class="spacer"></span>
          <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
            @click=${() => this._commit((c) => c[protocol].universes.splice(u, 1))}>
            ${icon("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${artnet
            ? html`
                ${numberField({
                  label: t("dmxNet"),
                  value: artnet.net ?? 0,
                  min: 0,
                  max: 15,
                  errors: this._errors([...path, "net"]),
                  onChange: (value) => this._setUniverse(protocol, u, "net", value ?? 0)
                })}
                ${numberField({
                  label: t("dmxSubnet"),
                  value: artnet.subnet ?? 0,
                  min: 0,
                  max: 15,
                  errors: this._errors([...path, "subnet"]),
                  onChange: (value) => this._setUniverse(protocol, u, "subnet", value ?? 0)
                })}
                ${numberField({
                  label: t("universe"),
                  required: true,
                  value: artnet.universe,
                  min: 0,
                  max: 511,
                  errors: this._errors([...path, "universe"]),
                  onChange: (value) => this._setUniverse(protocol, u, "universe", value ?? 0)
                })}
                ${checkField({
                  label: t("sendPartial"),
                  value: artnet.send_partial_universe ?? true,
                  onChange: (value) => this._setUniverse(protocol, u, "send_partial_universe", value ? undefined : false)
                })}
              `
            : numberField({
                label: t("universe"),
                required: true,
                value: universe.universe,
                min: 1,
                max: 63999,
                errors: this._errors([...path, "universe"]),
                onChange: (value) => this._setUniverse(protocol, u, "universe", value ?? 1)
              })}
        </div>
        <details ?open=${Boolean((artnet?.manual_nodes ?? sacn?.unicast_addresses ?? []).length)}>
          <summary>${t("dmxCompatibility")}</summary>
          ${artnet
            ? this._renderHosts(protocol, u, "manual_nodes", artnet.manual_nodes ?? [], ARTNET_DEFAULT_PORT)
            : this._renderHosts(protocol, u, "unicast_addresses", sacn?.unicast_addresses ?? [], SACN_DEFAULT_PORT)}
        </details>
        ${universe.devices.length
          ? html`
              <details class="map">
                <summary>${t("channelMap")}</summary>
                <artnetui-channel-map
                  .occupancy=${occupancy}
                  .t=${t}
                  @device-click=${(ev: CustomEvent) => this._openDevice({ protocol, universe: u, device: ev.detail.index })}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${universe.devices.map((device, d) => this._renderDevice(protocol, u, d, device, universe.devices.length))}
              </ul>
            `
          : html`<div class="empty">${t("dmxNoDevices")}</div>`}
        <div class="row">
          <button @click=${() => this._openDevice({ protocol, universe: u, device: -1 })}>
            ${icon("mdi:plus")} ${t("dmxAddDevice")}
          </button>
        </div>
      </section>
    `;
  }

  // ---------------------------------------------------------------- protocols

  private _setProtocol(protocol: DmxProtocol, key: string, value: unknown) {
    this._commit((config) => {
      const settings = config[protocol] as unknown as Record<string, unknown>;
      if (value === undefined) delete settings[key];
      else settings[key] = value;
    });
  }

  private _renderProtocol(protocol: DmxProtocol) {
    const t = this.t;
    const settings = this.config[protocol];
    const err = (key: string) => this._errors([protocol, key]);
    const shared = html`
      ${numberField({
        label: t("refresh"),
        value: settings.refresh_every,
        min: 0,
        max: 9999,
        step: "any",
        placeholder: String(DMX_DEFAULTS.refresh_every),
        errors: err("refresh_every"),
        onChange: (value) => this._setProtocol(protocol, "refresh_every", value)
      })}
      ${numberField({
        label: t("dmxRateLimit"),
        value: settings.rate_limit,
        min: 0,
        max: 9999,
        step: "any",
        placeholder: String(DMX_DEFAULTS.rate_limit),
        errors: err("rate_limit"),
        onChange: (value) => this._setProtocol(protocol, "rate_limit", value)
      })}
    `;
    const sacn = protocol === "sacn" ? this.config.sacn : undefined;
    const problems = this.issues.within([protocol]).filter(isError).length;
    return html`
      <section class="protocol">
        <header>
          <h2>${t(protocol === "artnet" ? "dmxArtnet" : "dmxSacn")}</h2>
          ${problems ? html`<span class="badge">${problems}</span>` : nothing}
          <span class="spacer"></span>
          <span class="muted">${t("dmxUniverseCount", { count: settings.universes.length })}</span>
        </header>
        <details ?open=${this.issues.within([protocol]).some((i) => i.path.length === 2)}>
          <summary>${t("dmxProtocolSettings")}</summary>
          <div class="grid">
            ${sacn
              ? html`
                  ${textField({
                    label: t("dmxSourceName"),
                    value: sacn.source_name,
                    placeholder: DMX_DEFAULTS.source_name,
                    errors: err("source_name"),
                    onChange: (value) => this._setProtocol(protocol, "source_name", value)
                  })}
                  ${numberField({
                    label: t("dmxPriority"),
                    value: sacn.priority,
                    min: 0,
                    max: 200,
                    placeholder: String(DMX_DEFAULTS.priority),
                    errors: err("priority"),
                    onChange: (value) => this._setProtocol(protocol, "priority", value)
                  })}
                  ${textField({
                    label: t("dmxInterfaceIp"),
                    value: sacn.interface_ip,
                    placeholder: "0.0.0.0",
                    errors: err("interface_ip"),
                    onChange: (value) => this._setProtocol(protocol, "interface_ip", value)
                  })}
                  ${numberField({
                    label: t("dmxSyncAddress"),
                    value: sacn.sync_address,
                    min: 0,
                    max: 63999,
                    placeholder: String(DMX_DEFAULTS.sync_address),
                    errors: err("sync_address"),
                    onChange: (value) => this._setProtocol(protocol, "sync_address", value)
                  })}
                  ${numberField({
                    label: t("dmxTtl"),
                    value: sacn.multicast_ttl,
                    min: 1,
                    max: 255,
                    placeholder: String(DMX_DEFAULTS.multicast_ttl),
                    errors: err("multicast_ttl"),
                    onChange: (value) => this._setProtocol(protocol, "multicast_ttl", value)
                  })}
                `
              : nothing}
            ${shared}
            ${sacn
              ? checkField({
                  label: t("dmxPreviewData"),
                  value: sacn.enable_preview_data,
                  onChange: (value) => this._setProtocol(protocol, "enable_preview_data", value || undefined)
                })
              : nothing}
          </div>
        </details>
        <div class="universes">
          ${settings.universes.map((universe, u) => this._renderUniverse(protocol, universe, u))}
        </div>
        <div class="row">
          <button
            @click=${() =>
              this._commit((c) =>
                protocol === "artnet"
                  ? c.artnet.universes.push(newArtnetUniverse(c))
                  : c.sacn.universes.push(newSacnUniverse(c))
              )}
          >
            ${icon("mdi:plus")} ${t(protocol === "artnet" ? "dmxAddArtnetUniverse" : "dmxAddSacnUniverse")}
          </button>
        </div>
      </section>
    `;
  }

  private _renderGeneral() {
    const t = this.t;
    return html`
      <section>
        <header>
          <h2>${t("dmxGeneral")}</h2>
        </header>
        <div class="grid">
          ${textField({
            label: t("dmxFolder"),
            required: true,
            value: this.config.fixtures_folder,
            placeholder: DEFAULT_FOLDER,
            errors: this._errors(["fixtures_folder"]),
            warnings: this._warnings(["fixtures_folder"]),
            helper: t("dmxFolderHelper", { count: this.fixtures?.length ?? 0 }),
            onChange: (value) => this._commit((c) => (c.fixtures_folder = value ?? DEFAULT_FOLDER))
          })}
          ${numberField({
            label: t("maxFps"),
            value: this.config.max_fps,
            min: 1,
            max: 43,
            placeholder: String(DMX_DEFAULTS.max_fps),
            errors: this._errors(["max_fps"]),
            onChange: (value) =>
              this._commit((c) => {
                if (value === undefined) delete c.max_fps;
                else c.max_fps = value;
              })
          })}
        </div>
      </section>
    `;
  }

  protected render() {
    const t = this.t;
    return html`
      ${this._renderGeneral()} ${this._renderProtocol("artnet")} ${this._renderProtocol("sacn")}
      ${this._editing
        ? html`<artnetui-dmx-device-dialog
            .t=${t}
            .config=${this.config}
            .fixtures=${this.fixtures}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @open-library=${this._openLibrary}
            @closed=${() => (this._editing = undefined)}
          ></artnetui-dmx-device-dialog>`
        : nothing}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: grid;
        gap: 16px;
      }
      section {
        display: grid;
        gap: 12px;
        border: var(--alu-border);
        border-radius: var(--alu-radius);
        padding: 16px;
        background: var(--card-background-color, transparent);
        min-width: 0;
      }
      section.universe {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.05));
        padding: 12px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 36px;
      }
      h2,
      h3 {
        margin: 0;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      h2 {
        font-size: 1.15rem;
      }
      h3 {
        font-size: 1rem;
      }
      .badge {
        background: var(--alu-error);
        color: #fff;
        border-radius: 10px;
        padding: 0 8px;
        font-size: 0.75rem;
        line-height: 20px;
      }
      .universes {
        display: grid;
        gap: 12px;
      }
      details > summary {
        cursor: pointer;
        color: var(--alu-muted);
        font-size: 0.85rem;
        padding: 4px 0;
      }
      details > .grid,
      details > .hosts {
        margin-top: 8px;
      }
      .hosts {
        display: grid;
        gap: 8px;
      }
      .hosts .label {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .host-row {
        display: grid;
        grid-template-columns: 2fr 1fr auto;
        gap: 8px;
        align-items: end;
      }
      .devices {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 6px;
      }
      .device {
        display: flex;
        align-items: stretch;
        gap: 8px;
        border: var(--alu-border);
        border-radius: 10px;
        background: var(--card-background-color, transparent);
        overflow: hidden;
      }
      .device.invalid {
        border-color: var(--alu-error);
      }
      .device.warning {
        border-color: var(--alu-warning);
      }
      .swatch {
        width: 6px;
        flex: none;
      }
      .device-main {
        flex: 1;
        min-width: 0;
        border: none;
        background: none;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        padding: 8px 4px;
      }
      .device-text {
        display: grid;
        min-width: 0;
      }
      .device-name {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .device-meta {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .device-error {
        font-size: 0.8rem;
        color: var(--alu-error);
      }
      .device-warning {
        font-size: 0.8rem;
        color: var(--alu-warning);
      }
      .device-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-right: 4px;
      }
      @media (max-width: 600px) {
        section {
          padding: 12px;
        }
        .device {
          flex-wrap: wrap;
        }
        .device-main {
          flex-basis: calc(100% - 20px);
        }
        .device-actions {
          width: 100%;
          border-top: var(--alu-border);
        }
        .host-row {
          grid-template-columns: 1fr 90px auto;
        }
      }
    `
  ];
}

safeDefine("artnetui-dmx-editor", AluDmxEditor);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-dmx-editor": AluDmxEditor;
  }
}
