import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { issueText, type TextKey, type Translate } from "../i18n";
import {
  CURVES,
  DMX_CHANNELS,
  MAX_START_ADDRESS,
  findFixture,
  findMode,
  nextFreeAddress,
  portAddressLabel,
  slugify
} from "../model_dmx";
import type { Path, ValidationIssue } from "../types";
import type { DmxConfig, DmxDevice, DmxProtocol, FixtureMode, FixtureSummary } from "../types_dmx";
import { safeDefine } from "../utils/define";
import { icon, numberField, selectField, sharedStyles, textField } from "../utils/ui";
import { IssueIndex } from "../validation";
import { validateDmxConfig } from "../validation_dmx";
import "./dialog";

export interface DmxDeviceLocation {
  protocol: DmxProtocol;
  universe: number;
  /** -1 for a new device */
  device: number;
}

export interface DmxDeviceSaveDetail {
  device: DmxDevice;
  from: DmxDeviceLocation;
  to: { protocol: DmxProtocol; universe: number };
}

const KIND_KEYS: Record<string, TextKey> = {
  number: "kind_number",
  select: "kind_select",
  fine: "kind_fine",
  switching: "kind_switching",
  empty: "kind_empty",
  unknown: "kind_unknown"
};

/** Dialog to create/edit a single dmx fixture instance. Fires `device-save`, `open-library` and `closed`. */
export class AluDmxDeviceDialog extends LitElement {
  @property({ attribute: false }) public t!: Translate;
  @property({ attribute: false }) public config!: DmxConfig;
  @property({ attribute: false }) public fixtures?: FixtureSummary[];
  @property({ attribute: false }) public location!: DmxDeviceLocation;
  @property({ attribute: false }) public device!: DmxDevice;

  @state() private _draft!: DmxDevice;
  @state() private _target = "artnet:0";

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("device") || changed.has("location")) {
      this._draft = structuredClone(this.device);
      this._target = `${this.location.protocol}:${this.location.universe}`;
    }
  }

  private get _targetLoc(): { protocol: DmxProtocol; universe: number } {
    const [protocol, universe] = this._target.split(":");
    return { protocol: protocol as DmxProtocol, universe: Number(universe) };
  }

  private _issues(): { index: IssueIndex; path: Path } {
    const config: DmxConfig = structuredClone(this.config);
    const { protocol, universe, device } = this.location;
    if (device >= 0) config[protocol].universes[universe].devices.splice(device, 1);
    const target = this._targetLoc;
    const devices = config[target.protocol].universes[target.universe].devices;
    const same = target.protocol === protocol && target.universe === universe && device >= 0;
    const index = same ? device : devices.length;
    devices.splice(index, 0, this._draft);
    return {
      index: new IssueIndex(validateDmxConfig(config, this.fixtures)),
      path: [target.protocol, "universes", target.universe, "devices", index]
    };
  }

  private _set<K extends keyof DmxDevice>(key: K, value: DmxDevice[K] | undefined) {
    const next = { ...this._draft };
    if (value === undefined) delete next[key];
    else next[key] = value;
    this._draft = next;
  }

  private _setCorrection(key: "curve" | "min" | "max", value: string | number | undefined) {
    const correction = { ...(this._draft.output_correction ?? {}) } as Record<string, unknown>;
    if (value === undefined) delete correction[key];
    else correction[key] = value;
    this._set(
      "output_correction",
      Object.keys(correction).length ? (correction as DmxDevice["output_correction"]) : undefined
    );
  }

  private _setFixture(key: string | undefined) {
    const next: DmxDevice = { ...this._draft, fixture: key ?? "" };
    const fixture = findFixture(this.fixtures, next.fixture);
    // Keep the mode only if the new fixture knows it.
    if (!fixture || !next.mode || !findMode(fixture, next.mode)) delete next.mode;
    this._draft = next;
  }

  private _width(): number {
    const fixture = findFixture(this.fixtures, this._draft.fixture);
    return (fixture && findMode(fixture, this._draft.mode)?.width) || 1;
  }

  private _nextFree() {
    const { protocol, universe, device } = this.location;
    const target = this._targetLoc;
    const ignore = target.protocol === protocol && target.universe === universe ? device : -1;
    const uni = this.config[target.protocol].universes[target.universe];
    this._set("start_address", nextFreeAddress(uni, this.fixtures, this._width(), ignore));
  }

  private _save() {
    this.dispatchEvent(
      new CustomEvent<DmxDeviceSaveDetail>("device-save", {
        detail: { device: this._draft, from: this.location, to: this._targetLoc }
      })
    );
  }

  private _renderChannels(mode: FixtureMode, start: number) {
    const t = this.t;
    const channels = mode.channels ?? [];
    if (!channels.length) return nothing;
    const entities = mode.entities;
    return html`
      <details class="channels" open>
        <summary>${t("dmxChannels", { count: mode.width })}</summary>
        ${entities
          ? html`<p class="muted">
              ${t("dmxEntityPreview", { light: entities.light, number: entities.number, select: entities.select })}
            </p>`
          : nothing}
        <table>
          <thead>
            <tr><th>${t("dmxAddress")}</th><th>${t("dmxChannel")}</th><th>${t("dmxKind")}</th></tr>
          </thead>
          <tbody>
            ${channels.map(
              (channel, index) => html`<tr class=${channel.kind}>
                <td>${Number.isInteger(start) ? start + index : index + 1}</td>
                <td>${channel.name ?? "—"}${channel.type ? html` <span class="muted">(${channel.type})</span>` : nothing}</td>
                <td><span class="kind ${channel.kind}">${t(KIND_KEYS[channel.kind] ?? "kind_unknown")}</span></td>
              </tr>`
            )}
          </tbody>
        </table>
      </details>
    `;
  }

  protected render() {
    if (!this._draft) return nothing;
    const t = this.t;
    const draft = this._draft;
    const { index, path } = this._issues();
    const pick = (key: string, severity: "error" | "warning") =>
      index
        .at([...path, key])
        .filter((issue: ValidationIssue) => (issue.severity ?? "error") === severity)
        .map((issue) => issueText(t, issue));
    const err = (key: string) => pick(key, "error");
    const warn = (key: string) => pick(key, "warning");
    const correction = draft.output_correction ?? {};
    const fixture = findFixture(this.fixtures, draft.fixture);
    const mode = fixture ? findMode(fixture, draft.mode) : undefined;
    const width = mode?.width;
    const start = draft.start_address;
    const slug = slugify(draft.name || "");

    const fixtureOptions = (this.fixtures ?? []).map((item) => ({
      value: item.key,
      label: `${item.name}${item.key !== item.name ? ` (${item.key})` : ""}${
        item.installed ? "" : ` – ${t("dmxBundled")}`
      }`
    }));
    const targets = (["artnet", "sacn"] as const).flatMap((protocol) =>
      this.config[protocol].universes.map((universe, u) => ({
        value: `${protocol}:${u}`,
        label: `${t(protocol === "artnet" ? "dmxArtnet" : "dmxSacn")} · ${t("universe")} ${portAddressLabel(universe, protocol)}`
      }))
    );

    return html`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device < 0 ? t("dmxNewDevice") : t("dmxEditDevice")}
        .closeLabel=${t("close")}
      >
        <div class="grid">
          ${textField({
            label: t("name"),
            required: true,
            value: draft.name,
            errors: err("name"),
            onChange: (value) => this._set("name", value ?? "")
          })}
          ${targets.length > 1
            ? selectField({
                label: t("universe"),
                value: this._target,
                options: targets,
                onChange: (value) => value && (this._target = value)
              })
            : nothing}
        </div>
        <div class="fixture-row">
          ${selectField({
            label: t("dmxFixture"),
            required: true,
            value: draft.fixture || undefined,
            options: fixtureOptions,
            emptyLabel: draft.fixture ? undefined : `— ${t("dmxChooseFixture")} —`,
            errors: err("fixture"),
            warnings: warn("fixture"),
            helper: fixture && !fixture.installed ? t("dmxBundledHint") : undefined,
            onChange: (value) => this._setFixture(value)
          })}
          <button @click=${() => this.dispatchEvent(new CustomEvent("open-library"))}>
            ${icon("mdi:bookshelf")} ${t("dmxLibrary")}
          </button>
        </div>
        <div class="grid">
          ${fixture
            ? selectField({
                label: t("dmxMode"),
                value: draft.mode,
                options: fixture.modes.map((m) => ({ value: m.key ?? m.name, label: `${m.name} (${m.width} ch)` })),
                emptyLabel: `${t("default")} (${fixture.modes[0]?.name ?? "—"})`,
                errors: err("mode"),
                warnings: warn("mode"),
                onChange: (value) => this._set("mode", value)
              })
            : nothing}
          <div class="with-button">
            ${numberField({
              label: t("dmxStartAddress"),
              required: true,
              value: draft.start_address,
              min: 1,
              max: MAX_START_ADDRESS,
              errors: err("start_address"),
              helper: width
                ? t("dmxFootprint", {
                    start,
                    end: Number.isInteger(start) ? Math.min(start + width - 1, DMX_CHANNELS) : "?",
                    width
                  })
                : undefined,
              onChange: (value) => this._set("start_address", value ?? 1)
            })}
            <button class="small" @click=${this._nextFree}>${t("nextFree")}</button>
          </div>
          ${textField({
            label: t("dmxPrefix"),
            value: draft.entity_id_prefix,
            placeholder: slug,
            errors: err("entity_id_prefix"),
            helper: t("dmxPrefixHelper", { prefix: draft.entity_id_prefix || slug || "…" }),
            onChange: (value) => this._set("entity_id_prefix", value)
          })}
        </div>
        <details ?open=${Boolean(draft.output_correction)}>
          <summary>${t("outputCorrection")}</summary>
          <div class="grid">
            ${selectField({
              label: t("dmxCurve"),
              value: correction.curve,
              options: CURVES,
              emptyLabel: `${t("default")} (linear)`,
              errors: err("output_correction.curve"),
              onChange: (value) => this._setCorrection("curve", value)
            })}
            ${numberField({
              label: t("dmxMin"),
              value: correction.min,
              min: 0,
              max: 1,
              step: "any",
              placeholder: "0",
              errors: index.at([...path, "output_correction", "min"]).map((i) => issueText(t, i)),
              onChange: (value) => this._setCorrection("min", value)
            })}
            ${numberField({
              label: t("dmxMax"),
              value: correction.max,
              min: 0,
              max: 1,
              step: "any",
              placeholder: "1",
              errors: index.at([...path, "output_correction", "max"]).map((i) => issueText(t, i)),
              onChange: (value) => this._setCorrection("max", value)
            })}
          </div>
        </details>
        ${mode ? this._renderChannels(mode, start) : nothing}
        <button slot="actions" @click=${() => this.dispatchEvent(new CustomEvent("closed"))}>${t("cancel")}</button>
        <button slot="actions" class="primary" @click=${this._save}>${t("apply")}</button>
      </artnetui-dialog>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }
      .grid,
      .fixture-row,
      details {
        margin-bottom: 12px;
      }
      .fixture-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: start;
      }
      .fixture-row button {
        margin-top: 21px;
      }
      .with-button {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 6px;
        align-items: start;
      }
      .with-button button {
        margin-top: 21px;
        white-space: nowrap;
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
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      th,
      td {
        text-align: left;
        padding: 4px 8px;
        border-bottom: var(--alu-border);
      }
      th {
        color: var(--alu-muted);
        font-weight: 500;
      }
      tr.empty td,
      tr.fine td {
        color: var(--alu-muted);
      }
      .kind {
        font-size: 0.75rem;
        padding: 1px 8px;
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .kind.number {
        background: rgba(3, 169, 244, 0.18);
      }
      .kind.select,
      .kind.switching {
        background: rgba(156, 39, 176, 0.18);
      }
      .kind.unknown {
        background: rgba(255, 166, 0, 0.25);
      }
      @media (max-width: 600px) {
        .fixture-row {
          grid-template-columns: 1fr;
        }
        .fixture-row button {
          margin-top: 0;
        }
      }
    `
  ];
}

safeDefine("artnetui-dmx-device-dialog", AluDmxDeviceDialog);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-dmx-device-dialog": AluDmxDeviceDialog;
  }
}
