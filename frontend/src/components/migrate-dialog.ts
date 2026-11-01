import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { TextKey, Translate } from "../i18n";
import { allDevices } from "../model_dmx";
import type { MigrationResult, MigrationWarning } from "../types_dmx";
import { safeDefine } from "../utils/define";
import { alert, sharedStyles } from "../utils/ui";
import "./dialog";

const warningText = (t: Translate, warning: MigrationWarning): string => {
  const key = `mig_${warning.code}` as TextKey;
  const params: Record<string, string | number> = {};
  for (const [name, value] of Object.entries(warning.params ?? {})) {
    params[name] = Array.isArray(value) ? value.join("") : String(value ?? "—");
  }
  const text = t(key, params);
  return text === key ? warning.code : text;
};

/** Preview of the 0.x → 1.x migration. Fires `apply` and `closed`. */
export class AluMigrateDialog extends LitElement {
  @property({ attribute: false }) public t!: Translate;
  @property({ attribute: false }) public result?: MigrationResult;
  @property({ attribute: false }) public error?: string;
  @property({ type: Boolean }) public replacing = false;

  protected render() {
    const t = this.t;
    const result = this.result;
    let body: unknown = html`<p>${t("loading")}</p>`;
    if (this.error) body = alert("error", this.error);
    else if (result) {
      const devices = allDevices(result.config).length;
      const universes = result.config.artnet.universes.length + result.config.sacn.universes.length;
      const global = result.warnings.filter((w) => !w.device && w.code !== "entity_ids_change");
      const perDevice = result.warnings.filter((w) => w.device);
      const entityChange = result.warnings.some((w) => w.code === "entity_ids_change");
      body = devices
        ? html`
            <p>${t("migSummary", { devices, universes, fixtures: result.fixtures.join(", ") || "—" })}</p>
            ${entityChange ? alert("warning", t("mig_entity_ids_change")) : nothing}
            ${global.map((w) => alert("warning", warningText(t, w)))}
            ${perDevice.length
              ? html`<h3>${t("migNotes")}</h3>
                  <ul>
                    ${perDevice.map((w) => html`<li><strong>${w.device}</strong>: ${warningText(t, w)}</li>`)}
                  </ul>`
              : nothing}
            ${this.replacing ? alert("info", t("migReplaces")) : nothing}
            <p class="muted">${t("migNextSteps")}</p>
          `
        : html`${alert("info", t("migNothing"))}${global.map((w) => alert("warning", warningText(t, w)))}`;
    }
    const canApply = Boolean(result && allDevices(result.config).length && !this.error);
    return html`
      <artnetui-dialog open wide .heading=${t("migTitle")} .subtitle=${t("migSubtitle")} .closeLabel=${t("close")}>
        ${body}
        <button slot="actions" @click=${() => this.dispatchEvent(new CustomEvent("closed"))}>${t("cancel")}</button>
        <button slot="actions" class="primary" ?disabled=${!canApply} @click=${() => this.dispatchEvent(new CustomEvent("apply"))}>
          ${t("migApply")}
        </button>
      </artnetui-dialog>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }
      h3 {
        margin: 12px 0 4px;
        font-size: 1rem;
        font-weight: 500;
      }
      ul {
        margin: 0;
        padding-left: 20px;
        display: grid;
        gap: 4px;
      }
      p {
        margin: 8px 0;
      }
    `
  ];
}

safeDefine("artnetui-migrate-dialog", AluMigrateDialog);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-migrate-dialog": AluMigrateDialog;
  }
}
