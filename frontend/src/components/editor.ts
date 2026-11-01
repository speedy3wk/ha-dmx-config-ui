import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { issueText, type Translate } from "../i18n";
import {
  CORRECTIONS,
  NODE_DEFAULTS,
  NODE_TYPES,
  deviceRange,
  deviceType,
  deviceWidth
} from "../model";
import type { DeviceConfig, NodeConfig, Path, UiConfig, UniverseConfig } from "../types";
import { safeDefine } from "../utils/define";
import {
  clone,
  duplicateDevice,
  duplicateUniverse,
  moveItem,
  newDevice,
  newNode,
  newUniverse
} from "../utils/mutate";
import { checkField, icon, numberField, selectField, sharedStyles, textField } from "../utils/ui";
import { IssueIndex } from "../validation";
import { deviceColor } from "./channel-map";
import type { DeviceLocation, DeviceSaveDetail } from "./device-dialog";
import "./channel-map";
import "./device-dialog";

const TYPE_ICONS: Record<string, string> = {
  fixed: "mdi:lightbulb",
  binary: "mdi:toggle-switch-outline",
  dimmer: "mdi:brightness-6",
  color_temp: "mdi:thermometer",
  rgb: "mdi:palette",
  rgbw: "mdi:palette",
  rgbww: "mdi:palette",
  xy: "mdi:palette-swatch"
};

/** Visual editor for the whole configuration. Fires `config-changed` with {config}. */
export class AluEditor extends LitElement {
  @property({ attribute: false }) public config!: UiConfig;
  @property({ attribute: false }) public issues = new IssueIndex();
  @property({ attribute: false }) public t!: Translate;

  @state() private _editing?: { location: DeviceLocation; device: DeviceConfig };

  private _commit(mutate: (config: UiConfig) => void) {
    const config = clone(this.config);
    mutate(config);
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config } }));
  }

  private _errors(path: Path) {
    return this.issues.at(path).map((issue) => issueText(this.t, issue));
  }

  // ------------------------------------------------------------------ devices

  private _openDevice(location: DeviceLocation) {
    const universe = this.config.nodes[location.node].universes[location.universe];
    const device =
      location.device >= 0 ? clone(universe.devices[location.device]) : newDevice(this.config, universe);
    this._editing = { location, device };
  }

  private _saveDevice(ev: CustomEvent<DeviceSaveDetail>) {
    const { device, from, to } = ev.detail;
    this._commit((config) => {
      const source = config.nodes[from.node].universes[from.universe].devices;
      const target = config.nodes[to.node].universes[to.universe].devices;
      if (from.device < 0) {
        target.push(device);
      } else if (from.node === to.node && from.universe === to.universe) {
        source[from.device] = device;
      } else {
        source.splice(from.device, 1);
        target.push(device);
      }
    });
    this._editing = undefined;
  }

  private _renderDevice(device: DeviceConfig, n: number, u: number, d: number, count: number) {
    const t = this.t;
    const path: Path = ["nodes", n, "universes", u, "devices", d];
    const problems = this.issues.within(path);
    const [start, end] = deviceRange(device);
    const type = deviceType(device);
    const location = { node: n, universe: u, device: d };
    const universe = this.config.nodes[n].universes[u];
    return html`
      <li class="device ${problems.length ? "invalid" : ""}">
        <span class="swatch" style="background:${deviceColor(d)}"></span>
        <button class="device-main" @click=${() => this._openDevice(location)} title=${t("edit")}>
          ${icon(TYPE_ICONS[type] ?? "mdi:lightbulb-outline")}
          <span class="device-text">
            <span class="device-name">${device.friendly_name || device.name || "—"}</span>
            <span class="device-meta">
              ${type} · ${start === end ? `${start}` : `${start}–${end}`}
              (${deviceWidth(device)} ch${device.channel_size && device.channel_size !== "8bit" ? `, ${device.channel_size}` : ""})
              ${device.friendly_name ? html` · ${device.name}` : nothing}
            </span>
            ${problems.map((issue) => html`<span class="device-error">${issueText(t, issue)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${t("moveUp")} aria-label=${t("moveUp")} ?disabled=${d === 0}
            @click=${() => this._commit((c) => moveItem(c.nodes[n].universes[u].devices, d, d - 1))}>
            ${icon("mdi:arrow-up")}
          </button>
          <button class="icon" title=${t("moveDown")} aria-label=${t("moveDown")} ?disabled=${d === count - 1}
            @click=${() => this._commit((c) => moveItem(c.nodes[n].universes[u].devices, d, d + 1))}>
            ${icon("mdi:arrow-down")}
          </button>
          <button class="icon" title=${t("duplicate")} aria-label=${t("duplicate")}
            @click=${() =>
              this._commit((c) =>
                c.nodes[n].universes[u].devices.splice(d + 1, 0, duplicateDevice(c, universe, device))
              )}>
            ${icon("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
            @click=${() => this._commit((c) => c.nodes[n].universes[u].devices.splice(d, 1))}>
            ${icon("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `;
  }

  // ---------------------------------------------------------------- universes

  private _setUniverse<K extends keyof UniverseConfig>(n: number, u: number, key: K, value: UniverseConfig[K] | undefined) {
    this._commit((config) => {
      const universe = config.nodes[n].universes[u];
      if (value === undefined) delete universe[key];
      else universe[key] = value;
    });
  }

  private _renderUniverse(universe: UniverseConfig, n: number, u: number) {
    const t = this.t;
    const path: Path = ["nodes", n, "universes", u];
    const problemCount = this.issues.within(path).length;
    return html`
      <section class="universe">
        <header>
          <h3>${t("universe")} ${universe.id}</h3>
          ${problemCount ? html`<span class="badge">${problemCount}</span>` : nothing}
          <span class="spacer"></span>
          <button class="icon" title=${t("duplicate")} aria-label=${t("duplicate")}
            @click=${() => this._commit((c) => c.nodes[n].universes.splice(u + 1, 0, duplicateUniverse(c, c.nodes[n], universe)))}>
            ${icon("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
            @click=${() => this._commit((c) => c.nodes[n].universes.splice(u, 1))}>
            ${icon("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${numberField({
            label: t("universeId"),
            required: true,
            value: universe.id,
            min: 0,
            max: 1024,
            errors: this._errors([...path, "id"]),
            onChange: (value) => this._setUniverse(n, u, "id", value ?? 0)
          })}
          ${selectField({
            label: t("outputCorrection"),
            value: universe.output_correction,
            options: CORRECTIONS,
            emptyLabel: `${t("default")} (linear)`,
            errors: this._errors([...path, "output_correction"]),
            onChange: (value) => this._setUniverse(n, u, "output_correction", value)
          })}
          ${checkField({
            label: t("sendPartial"),
            value: universe.send_partial_universe ?? true,
            onChange: (value) => this._setUniverse(n, u, "send_partial_universe", value)
          })}
        </div>
        ${universe.devices.length
          ? html`
              <details class="map">
                <summary>${t("channelMap")}</summary>
                <artnetui-channel-map
                  .universe=${universe}
                  .t=${t}
                  @device-click=${(ev: CustomEvent) =>
                    this._openDevice({ node: n, universe: u, device: ev.detail.index })}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${universe.devices.map((device, d) =>
                  this._renderDevice(device, n, u, d, universe.devices.length)
                )}
              </ul>
            `
          : html`<div class="empty">${t("noLights")}</div>`}
        <div class="row">
          <button @click=${() => this._openDevice({ node: n, universe: u, device: -1 })}>
            ${icon("mdi:plus")} ${t("addLight")}
          </button>
        </div>
      </section>
    `;
  }

  // -------------------------------------------------------------------- nodes

  private _setNode<K extends keyof NodeConfig>(n: number, key: K, value: NodeConfig[K] | undefined) {
    this._commit((config) => {
      const node = config.nodes[n];
      if (value === undefined) delete node[key];
      else node[key] = value;
    });
  }

  private _renderNode(node: NodeConfig, n: number) {
    const t = this.t;
    const path: Path = ["nodes", n];
    const err = (key: string) => this._errors([...path, key]);
    const problemCount = this.issues.within(path).length;
    const advancedOpen = Boolean(node.host_override || node.port_override || node.port);
    return html`
      <section class="node">
        <header>
          <h2>${t("node")}: ${node.host || "—"}</h2>
          ${problemCount ? html`<span class="badge">${problemCount}</span>` : nothing}
          <span class="spacer"></span>
          <button class="icon danger" title=${t("remove")} aria-label=${t("remove")}
            @click=${() => this._commit((c) => c.nodes.splice(n, 1))}>
            ${icon("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${textField({
            label: t("host"),
            required: true,
            value: node.host,
            placeholder: "192.168.0.10",
            errors: err("host"),
            onChange: (value) => this._setNode(n, "host", value ?? "")
          })}
          ${selectField({
            label: t("nodeType"),
            value: node.node_type,
            options: NODE_TYPES,
            emptyLabel: `${t("default")} (${NODE_DEFAULTS.node_type})`,
            errors: err("node_type"),
            onChange: (value) => this._setNode(n, "node_type", value)
          })}
          ${numberField({
            label: t("maxFps"),
            value: node.max_fps,
            min: 1,
            max: 50,
            placeholder: String(NODE_DEFAULTS.max_fps),
            errors: err("max_fps"),
            onChange: (value) => this._setNode(n, "max_fps", value)
          })}
          ${numberField({
            label: t("refresh"),
            value: node.refresh_every,
            min: 0,
            max: 9999,
            step: "any",
            placeholder: String(NODE_DEFAULTS.refresh_every),
            errors: err("refresh_every"),
            onChange: (value) => this._setNode(n, "refresh_every", value)
          })}
        </div>
        <details ?open=${advancedOpen}>
          <summary>${t("advanced")}</summary>
          <div class="grid">
            ${numberField({
              label: t("port"),
              value: node.port,
              min: 1,
              max: 65535,
              placeholder: String(NODE_DEFAULTS.port),
              errors: err("port"),
              onChange: (value) => this._setNode(n, "port", value)
            })}
            ${textField({
              label: t("hostOverride"),
              value: node.host_override,
              errors: err("host_override"),
              onChange: (value) => this._setNode(n, "host_override", value)
            })}
            ${numberField({
              label: t("portOverride"),
              value: node.port_override,
              min: 1,
              max: 65535,
              errors: err("port_override"),
              onChange: (value) => this._setNode(n, "port_override", value)
            })}
          </div>
        </details>
        <div class="universes">
          ${node.universes.length
            ? node.universes.map((universe, u) => this._renderUniverse(universe, n, u))
            : html`<div class="empty">${t("noUniverses")}</div>`}
          ${err("universes").map((error) => html`<div class="error">${error}</div>`)}
        </div>
        <div class="row">
          <button @click=${() => this._commit((c) => c.nodes[n].universes.push(newUniverse(c.nodes[n])))}>
            ${icon("mdi:plus")} ${t("addUniverse")}
          </button>
        </div>
      </section>
    `;
  }

  protected render() {
    const t = this.t;
    return html`
      ${this.config.nodes.length
        ? this.config.nodes.map((node, n) => this._renderNode(node, n))
        : html`<div class="empty">${t("noNodes")}</div>`}
      <div class="row">
        <button @click=${() => this._commit((c) => c.nodes.push(newNode()))}>
          ${icon("mdi:plus")} ${t("addNode")}
        </button>
      </div>
      ${this._editing
        ? html`<artnetui-device-dialog
            .t=${t}
            .config=${this.config}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @closed=${() => (this._editing = undefined)}
          ></artnetui-device-dialog>`
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
      details > .grid {
        margin-top: 8px;
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
      .device-error,
      .error {
        font-size: 0.8rem;
        color: var(--alu-error);
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
      }
    `
  ];
}

safeDefine("artnetui-editor", AluEditor);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-editor": AluEditor;
  }
}
