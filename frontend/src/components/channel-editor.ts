import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ALLOWED_SETUP_CHARS, DEFAULT_SETUP, setupTokens, tokensToSetup } from "../model";
import type { Translate, TextKey } from "../i18n";
import type { ChannelSetup, ChannelToken, DeviceType } from "../types";
import { safeDefine } from "../utils/define";
import { icon, sharedStyles } from "../utils/ui";

const COLORS: Record<string, string> = {
  r: "#e53935",
  g: "#43a047",
  b: "#1e88e5",
  w: "#e0e0e0",
  c: "#b3e5fc",
  h: "#ffcc80",
  t: "#ffe082",
  d: "#9e9e9e",
  u: "#ab47bc",
  x: "#7e57c2",
  y: "#5c6bc0"
};

const formatSetup = (setup: ChannelSetup) =>
  Array.isArray(setup) ? `[${setup.join(", ")}]` : `"${setup}"`;

/** Visual editor for a device's channel_setup. Fires `value-changed` with {value}. */
export class AluChannelEditor extends LitElement {
  @property() public type: DeviceType = "rgb";
  @property({ attribute: false }) public value?: ChannelSetup;
  @property({ attribute: false }) public t!: Translate;
  @property({ attribute: false }) public errors: string[] = [];

  @state() private _static = "";
  @state() private _dragIndex?: number;

  private get _tokens(): ChannelToken[] {
    return setupTokens(this.value);
  }

  private _emit(tokens: ChannelToken[]) {
    this.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: tokensToSetup(tokens) } })
    );
  }

  private _append(token: ChannelToken) {
    this._emit([...this._tokens, token]);
  }

  private _remove(index: number) {
    this._emit(this._tokens.filter((_, i) => i !== index));
  }

  private _move(from: number, to: number) {
    const tokens = [...this._tokens];
    if (to < 0 || to >= tokens.length || from === to) return;
    const [item] = tokens.splice(from, 1);
    tokens.splice(to, 0, item);
    this._emit(tokens);
  }

  private _addStatic() {
    const value = Number(this._static);
    if (this._static === "" || !Number.isInteger(value) || value < 0 || value > 255) return;
    this._append(value);
    this._static = "";
  }

  private _label(token: ChannelToken) {
    return typeof token === "number"
      ? this.t("staticToken", { value: token })
      : this.t(`ch_${token}` as TextKey);
  }

  private _chip(token: ChannelToken) {
    const color = typeof token === "number" ? "transparent" : COLORS[token.toLowerCase()];
    return html`<span class="chip" style="--chip:${color ?? "#9e9e9e"}">${token}</span>`;
  }

  protected render() {
    const letters = ALLOWED_SETUP_CHARS[this.type].split("");
    const tokens = this._tokens;
    return html`
      <div class="wrap">
        <div class="head">
          <strong>${this.t("channelSetup")}</strong>
          <span class="muted">${this.t("channelSetupDefault", { value: formatSetup(DEFAULT_SETUP[this.type]) })}</span>
        </div>
        <p class="muted hint">${this.t("channelSetupHint")}</p>
        <div class="body">
          <div class="palette" aria-label=${this.t("palette")}>
            ${letters.map(
              (letter) => html`
                <button class="token" title=${this._label(letter)} @click=${() => this._append(letter)}>
                  ${this._chip(letter)}<span class="desc">${this._label(letter)}</span>
                </button>
              `
            )}
            <div class="static">
              <input
                type="number"
                min="0"
                max="255"
                inputmode="numeric"
                placeholder=${this.t("staticValue")}
                aria-label=${this.t("staticValue")}
                .value=${this._static}
                @input=${(ev: Event) => (this._static = (ev.target as HTMLInputElement).value)}
                @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && (ev.preventDefault(), this._addStatic())}
              />
              <button @click=${this._addStatic}>${icon("mdi:plus")} ${this.t("add")}</button>
            </div>
          </div>
          <ol class="sequence" @dragover=${(ev: DragEvent) => ev.preventDefault()}>
            ${tokens.length
              ? tokens.map(
                  (token, index) => html`
                    <li
                      draggable="true"
                      class=${this._dragIndex === index ? "dragging" : ""}
                      @dragstart=${(ev: DragEvent) => {
                        this._dragIndex = index;
                        ev.dataTransfer?.setData("text/plain", String(index));
                      }}
                      @dragend=${() => (this._dragIndex = undefined)}
                      @drop=${(ev: DragEvent) => {
                        ev.preventDefault();
                        if (this._dragIndex !== undefined) this._move(this._dragIndex, index);
                        this._dragIndex = undefined;
                      }}
                    >
                      <span class="pos">${index + 1}</span>
                      ${this._chip(token)}
                      <span class="desc">${this._label(token)}</span>
                      <button class="icon" title=${this.t("moveUp")} aria-label=${this.t("moveUp")} ?disabled=${index === 0} @click=${() => this._move(index, index - 1)}>
                        ${icon("mdi:arrow-up")}
                      </button>
                      <button class="icon" title=${this.t("moveDown")} aria-label=${this.t("moveDown")} ?disabled=${index === tokens.length - 1} @click=${() => this._move(index, index + 1)}>
                        ${icon("mdi:arrow-down")}
                      </button>
                      <button class="icon danger" title=${this.t("remove")} aria-label=${this.t("remove")} @click=${() => this._remove(index)}>
                        ${icon("mdi:delete-outline")}
                      </button>
                    </li>
                  `
                )
              : html`<li class="none muted">${this.t("noChannels")}</li>`}
          </ol>
        </div>
        ${this.errors.map((error) => html`<div class="error">${error}</div>`)}
        ${tokens.length
          ? html`<div class="row">
              <code>${formatSetup(tokensToSetup(tokens)!)}</code>
              <span class="spacer"></span>
              <button @click=${() => this._emit([])}>${this.t("resetDefault")}</button>
            </div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .wrap {
        display: grid;
        gap: 8px;
        border: var(--alu-border);
        border-radius: var(--alu-radius);
        padding: 12px;
      }
      .head {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
      }
      .hint {
        margin: 0;
      }
      .body {
        display: grid;
        gap: 12px;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
      @media (max-width: 640px) {
        .body {
          grid-template-columns: 1fr;
        }
      }
      .palette {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        align-content: start;
      }
      .token {
        justify-content: flex-start;
        text-align: left;
      }
      .desc {
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        box-sizing: border-box;
        border-radius: 6px;
        font-weight: 700;
        font-family: var(--ha-font-family-code, monospace);
        background: var(--chip);
        color: #000;
        border: var(--alu-border);
      }
      .static {
        grid-column: 1 / -1;
        display: flex;
        gap: 6px;
      }
      .sequence {
        list-style: none;
        margin: 0;
        padding: 8px;
        border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
        border-radius: 8px;
        display: grid;
        gap: 4px;
        align-content: start;
        min-height: 120px;
      }
      .sequence li {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 2px 4px;
        border-radius: 6px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        cursor: grab;
      }
      .sequence li.dragging {
        opacity: 0.4;
      }
      .sequence li.none {
        background: none;
        cursor: default;
        padding: 8px;
      }
      .sequence .desc {
        flex: 1;
      }
      .pos {
        width: 20px;
        text-align: right;
        color: var(--alu-muted);
        font-size: 0.75rem;
      }
      .error {
        color: var(--alu-error);
        font-size: 0.8rem;
      }
    `
  ];
}

safeDefine("artnetui-channel-editor", AluChannelEditor);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-channel-editor": AluChannelEditor;
  }
}
