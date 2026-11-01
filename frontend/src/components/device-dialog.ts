import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { issueText, type Translate } from "../i18n";
import {
  BYTE_ORDERS,
  CHANNEL_SIZES,
  CORRECTIONS,
  DEVICE_TYPES,
  DMX_CHANNELS,
  byteSize,
  cleanDeviceForType,
  deviceRange,
  deviceType,
  deviceWidth,
  entitySlug,
  hasChannelSetup,
  nextFreeChannel,
  supportsTemp
} from "../model";
import type { DeviceConfig, DeviceType, Path, UiConfig } from "../types";
import { safeDefine } from "../utils/define";
import { numberField, selectField, sharedStyles, textField } from "../utils/ui";
import { IssueIndex, validateConfig } from "../validation";
import "./channel-editor";
import "./dialog";

export interface DeviceLocation {
  node: number;
  universe: number;
  /** -1 for a new device */
  device: number;
}

export interface DeviceSaveDetail {
  device: DeviceConfig;
  from: DeviceLocation;
  to: { node: number; universe: number };
}

/** Dialog to create/edit a single light. Fires `device-save` and `closed`. */
export class AluDeviceDialog extends LitElement {
  @property({ attribute: false }) public t!: Translate;
  @property({ attribute: false }) public config!: UiConfig;
  @property({ attribute: false }) public location!: DeviceLocation;
  @property({ attribute: false }) public device!: DeviceConfig;

  @state() private _draft!: DeviceConfig;
  @state() private _target = "0:0";

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("device") || changed.has("location")) {
      this._draft = { ...this.device };
      this._target = `${this.location.node}:${this.location.universe}`;
    }
  }

  private get _targetLoc() {
    const [node, universe] = this._target.split(":").map(Number);
    return { node, universe };
  }

  /** Validate the draft in place of the original device to get live errors. */
  private _issues(): { index: IssueIndex; path: Path } {
    const config: UiConfig = structuredClone(this.config);
    const { node, universe, device } = this.location;
    if (device >= 0) config.nodes[node].universes[universe].devices.splice(device, 1);
    const target = this._targetLoc;
    const devices = config.nodes[target.node].universes[target.universe].devices;
    const sameUniverse = target.node === node && target.universe === universe && device >= 0;
    const index = sameUniverse ? device : devices.length;
    devices.splice(index, 0, this._draft);
    return {
      index: new IssueIndex(validateConfig(config)),
      path: ["nodes", target.node, "universes", target.universe, "devices", index]
    };
  }

  private _set<K extends keyof DeviceConfig>(key: K, value: DeviceConfig[K] | undefined) {
    const next = { ...this._draft } as DeviceConfig;
    if (value === undefined) delete next[key];
    else next[key] = value;
    this._draft = key === "type" || key === "channel_size" ? cleanDeviceForType(next) : next;
  }

  private _nextFree() {
    const { node, universe, device } = this.location;
    const target = this._targetLoc;
    const ignore = target.node === node && target.universe === universe ? device : undefined;
    const uni = this.config.nodes[target.node].universes[target.universe];
    this._set("channel", nextFreeChannel(uni, deviceWidth(this._draft), ignore));
  }

  private _save() {
    this.dispatchEvent(
      new CustomEvent<DeviceSaveDetail>("device-save", {
        detail: { device: cleanDeviceForType(this._draft), from: this.location, to: this._targetLoc }
      })
    );
  }

  protected render() {
    if (!this._draft) return nothing;
    const t = this.t;
    const draft = this._draft;
    const type = deviceType(draft);
    const { index, path } = this._issues();
    const err = (key: string) => index.at([...path, key]).map((issue) => issueText(t, issue));
    const [start, end] = deviceRange(draft);
    const slug = entitySlug(draft.name || "");
    const targets = this.config.nodes.flatMap((node, n) =>
      node.universes.map((universe, u) => ({
        value: `${n}:${u}`,
        label: `${node.host || `${t("node")} ${n + 1}`} · ${t("universe")} ${universe.id}`
      }))
    );

    return html`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device < 0 ? t("newLight") : t("editLight")}
        .closeLabel=${t("close")}
      >
        <div class="grid">
          ${textField({
            label: t("name"),
            required: true,
            value: draft.name,
            errors: err("name"),
            helper: slug ? t("nameHelper", { slug }) : undefined,
            onChange: (value) => this._set("name", value ?? "")
          })}
          ${textField({
            label: t("friendlyName"),
            value: draft.friendly_name,
            onChange: (value) => this._set("friendly_name", value)
          })}
          ${selectField({
            label: t("type"),
            value: type,
            options: DEVICE_TYPES,
            errors: err("type"),
            onChange: (value) => this._set("type", (value as DeviceType) ?? "dimmer")
          })}
          ${targets.length > 1
            ? selectField({
                label: t("targetUniverse"),
                value: this._target,
                options: targets,
                onChange: (value) => value && (this._target = value)
              })
            : nothing}
          <div class="channel">
            ${numberField({
              label: t("channel"),
              required: true,
              value: draft.channel,
              min: 1,
              max: DMX_CHANNELS,
              errors: err("channel"),
              helper: t("channelHelper", { start, end, width: deviceWidth(draft) }),
              onChange: (value) => this._set("channel", value ?? 1)
            })}
            <button class="link" @click=${this._nextFree}>${t("nextFree")}</button>
          </div>
          ${type !== "binary" && type !== "fixed"
            ? numberField({
                label: t("transition"),
                value: draft.transition,
                min: 0,
                max: 999,
                step: "any",
                placeholder: "0",
                errors: err("transition"),
                onChange: (value) => this._set("transition", value)
              })
            : nothing}
          ${type !== "binary"
            ? selectField({
                label: t("outputCorrection"),
                value: draft.output_correction,
                options: CORRECTIONS,
                emptyLabel: `${t("default")} (universe)`,
                errors: err("output_correction"),
                onChange: (value) => this._set("output_correction", value)
              })
            : nothing}
          ${type !== "binary"
            ? selectField({
                label: t("channelSize"),
                value: draft.channel_size,
                options: Object.keys(CHANNEL_SIZES),
                emptyLabel: `${t("default")} (8bit)`,
                errors: err("channel_size"),
                onChange: (value) => this._set("channel_size", value)
              })
            : nothing}
          ${byteSize(draft) > 1
            ? selectField({
                label: t("byteOrder"),
                value: draft.byte_order,
                options: BYTE_ORDERS,
                emptyLabel: `${t("default")} (big)`,
                errors: err("byte_order"),
                onChange: (value) => this._set("byte_order", value)
              })
            : nothing}
          ${supportsTemp(type)
            ? html`
                ${textField({
                  label: t("minTemp"),
                  value: draft.min_temp,
                  placeholder: "2700K",
                  errors: err("min_temp"),
                  onChange: (value) => this._set("min_temp", value)
                })}
                ${textField({
                  label: t("maxTemp"),
                  value: draft.max_temp,
                  placeholder: "6500K",
                  errors: err("max_temp"),
                  onChange: (value) => this._set("max_temp", value)
                })}
              `
            : nothing}
        </div>
        ${hasChannelSetup(type)
          ? html`<artnetui-channel-editor
              .type=${type}
              .value=${draft.channel_setup}
              .t=${t}
              .errors=${err("channel_setup")}
              @value-changed=${(ev: CustomEvent) => this._set("channel_setup", ev.detail.value)}
            ></artnetui-channel-editor>`
          : nothing}
        <button slot="actions" @click=${() => this.dispatchEvent(new CustomEvent("closed"))}>
          ${t("cancel")}
        </button>
        <button slot="actions" class="primary" @click=${this._save}>${t("apply")}</button>
      </artnetui-dialog>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .grid {
        margin-bottom: 16px;
      }
      .channel {
        display: grid;
        gap: 2px;
      }
      button.link {
        justify-self: start;
        background: none;
        border: none;
        padding: 0;
        min-height: 24px;
        color: var(--primary-color);
        font-size: 0.8rem;
      }
    `
  ];
}

safeDefine("artnetui-device-dialog", AluDeviceDialog);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-device-dialog": AluDeviceDialog;
  }
}
