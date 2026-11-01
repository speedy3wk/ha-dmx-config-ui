import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import {
  deployConfig,
  errorMessage,
  fetchConfig,
  fetchStatus,
  importExisting,
  previewConfig,
  saveConfig
} from "./api";
import "./components/dialog";
import "./components/editor";
import { issueText, languageOf, translator, type TextKey, type Translate } from "./i18n";
import { ImportError, configFromJson, configFromYaml } from "./import";
import { exampleConfig } from "./sample";
import type {
  DeployResult,
  HomeAssistant,
  PreviewResult,
  StatusResult,
  UiConfig,
  ValidationIssue
} from "./types";
import { emptyConfig } from "./types";
import { haElement, safeDefine } from "./utils/define";
import { newNode } from "./utils/mutate";
import { alert, icon, sharedStyles } from "./utils/ui";
import { IssueIndex, validateConfig } from "./validation";

declare const __VERSION__: string;
export const FRONTEND_VERSION = __VERSION__;

const HISTORY_LIMIT = 100;

interface ConfirmState {
  title: TextKey;
  text: TextKey;
  action: () => void;
}

interface DeployState {
  preview?: PreviewResult;
  result?: DeployResult;
  error?: string;
  busy: boolean;
}

const navigate = (path: string) => {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
};

export class ArtnetLedUiConfigPanel extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow = false;
  @property({ attribute: false }) public panel?: { config?: { version?: string } };
  /** Rendered inside a dashboard card: no app header. */
  @property({ type: Boolean, reflect: true }) public embedded = false;

  @state() private _config?: UiConfig;
  @state() private _savedJson = "";
  @state() private _history: string[] = [];
  @state() private _future: string[] = [];
  @state() private _issues = new IssueIndex();
  @state() private _status?: StatusResult;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _toast?: { type: "success" | "error" | "info"; text: string };
  @state() private _menuOpen = false;
  @state() private _confirm?: ConfirmState;
  @state() private _importOpen = false;
  @state() private _importText = "";
  @state() private _importError?: string;
  @state() private _deploy?: DeployState;

  @query("input[type=file]") private _fileInput?: HTMLInputElement;

  private _loadStarted = false;
  private _toastTimer?: number;

  private get _t(): Translate {
    return translator(languageOf(this.hass));
  }

  private get _dirty() {
    return this._config !== undefined && JSON.stringify(this._config) !== this._savedJson;
  }

  // ---------------------------------------------------------------- lifecycle

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("beforeunload", this._onBeforeUnload);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("beforeunload", this._onBeforeUnload);
    window.clearTimeout(this._toastTimer);
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("_config" as keyof ArtnetLedUiConfigPanel) && this._config) {
      this._issues = new IssueIndex(validateConfig(this._config));
    }
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("hass") && this.hass && !this._loadStarted) {
      this._loadStarted = true;
      void this._load();
    }
  }

  private _onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (this._dirty) ev.preventDefault();
  };

  private _onKeyDown = (ev: KeyboardEvent) => {
    if (!(ev.ctrlKey || ev.metaKey) || !this.isConnected || !this._config) return;
    if (this._importOpen || this._deploy || this._confirm) return;
    const key = ev.key.toLowerCase();
    if (key === "s") {
      ev.preventDefault();
      void this._save();
      return;
    }
    // Let text fields keep their native undo.
    const target = ev.composedPath()[0] as HTMLElement | undefined;
    if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
    if (key === "z" && !ev.shiftKey) {
      ev.preventDefault();
      this._undo();
    } else if ((key === "z" && ev.shiftKey) || key === "y") {
      ev.preventDefault();
      this._redo();
    }
  };

  // -------------------------------------------------------------------- state

  private _setConfig(config: UiConfig) {
    if (this._config) {
      this._history = [...this._history, JSON.stringify(this._config)].slice(-HISTORY_LIMIT);
    }
    this._future = [];
    this._config = config;
  }

  private _undo() {
    if (!this._history.length || !this._config) return;
    this._future = [JSON.stringify(this._config), ...this._future];
    this._config = JSON.parse(this._history[this._history.length - 1]);
    this._history = this._history.slice(0, -1);
  }

  private _redo() {
    if (!this._future.length || !this._config) return;
    this._history = [...this._history, JSON.stringify(this._config)];
    this._config = JSON.parse(this._future[0]);
    this._future = this._future.slice(1);
  }

  private _showToast(type: "success" | "error" | "info", text: string) {
    this._toast = { type, text };
    window.clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = undefined), 4000);
  }

  private _confirmIf(condition: boolean, confirm: Omit<ConfirmState, "action">, action: () => void) {
    if (condition) this._confirm = { ...confirm, action };
    else action();
  }

  private _hasContent() {
    return Boolean(this._config?.nodes.length);
  }

  // ------------------------------------------------------------------ backend

  private async _load() {
    if (!this.hass) return;
    this._loadError = undefined;
    try {
      const [config, status] = await Promise.all([fetchConfig(this.hass), fetchStatus(this.hass)]);
      this._config = config ?? emptyConfig();
      this._savedJson = JSON.stringify(this._config);
      this._history = [];
      this._future = [];
      this._status = status;
    } catch (err) {
      this._loadError = errorMessage(err);
    }
  }

  private async _refreshStatus() {
    if (!this.hass) return;
    try {
      this._status = await fetchStatus(this.hass);
    } catch {
      // status is informational only
    }
  }

  private async _save() {
    if (!this.hass || !this._config || this._saving) return;
    this._saving = true;
    try {
      const result = await saveConfig(this.hass, this._config);
      if (JSON.stringify(result.config) !== JSON.stringify(this._config)) {
        this._config = result.config;
      }
      this._savedJson = JSON.stringify(this._config);
      this._showToast("success", this._t("saved"));
    } catch (err) {
      this._showToast("error", `${this._t("saveError")}: ${errorMessage(err)}`);
    } finally {
      this._saving = false;
    }
  }

  private async _openDeploy() {
    if (!this.hass || !this._config) return;
    this._deploy = { busy: true };
    try {
      this._deploy = { busy: false, preview: await previewConfig(this.hass, this._config) };
    } catch (err) {
      this._deploy = { busy: false, error: errorMessage(err) };
    }
  }

  private async _runDeploy() {
    if (!this.hass || !this._config || !this._deploy) return;
    const config = this._config;
    this._deploy = { ...this._deploy, busy: true, error: undefined };
    try {
      const result = await deployConfig(this.hass, config);
      if (result.status !== "invalid") this._savedJson = JSON.stringify(config);
      this._deploy = { ...this._deploy, busy: false, result };
      void this._refreshStatus();
    } catch (err) {
      this._deploy = { ...this._deploy, busy: false, error: errorMessage(err) };
    }
  }

  // ------------------------------------------------------------------ actions

  private _menuAction(action: () => void) {
    this._menuOpen = false;
    action();
  }

  private _replaceConfig(config: UiConfig) {
    this._confirmIf(
      this._hasContent(),
      { title: "confirmImportTitle", text: "confirmImportText" },
      () => this._setConfig(config)
    );
  }

  private _importYaml() {
    try {
      const config = configFromYaml(this._importText);
      this._importOpen = false;
      this._importText = "";
      this._importError = undefined;
      this._replaceConfig(config);
    } catch (err) {
      this._importError = this._t("importFailed", {
        error: err instanceof ImportError ? err.message : errorMessage(err)
      });
    }
  }

  private async _importExisting() {
    if (!this.hass) return;
    try {
      const config = await importExisting(this.hass);
      if (!config.nodes.length) {
        this._showToast("info", this._t("importNothing"));
        return;
      }
      this._replaceConfig(config);
    } catch (err) {
      this._showToast("error", this._t("importFailed", { error: errorMessage(err) }));
    }
  }

  private async _importFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const config = file.name.endsWith(".json") ? configFromJson(text) : configFromYaml(text);
      this._replaceConfig(config);
    } catch (err) {
      this._showToast("error", this._t("importFailed", { error: errorMessage(err) }));
    }
  }

  private _exportJson() {
    if (!this._config) return;
    const blob = new Blob([JSON.stringify(this._config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "artnet-led-uiconfig.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  // ------------------------------------------------------------------- render

  private _renderBanners() {
    const t = this._t;
    const status = this._status;
    const banners = [];
    const backendVersion = this.panel?.config?.version ?? status?.version;
    if (backendVersion && backendVersion !== FRONTEND_VERSION) {
      banners.push(
        alert("warning", t("versionMismatch", { frontend: FRONTEND_VERSION, backend: backendVersion }))
      );
    }
    if (!status) return banners;
    if (!status.artnet_led_installed) {
      banners.push(alert("warning", t("artnetMissing")));
    }
    if (!status.included) {
      banners.push(
        alert(
          "warning",
          html`${t("includeMissing", { path: status.path })}
            <pre class="include">${status.include_key}: !include ${status.path}</pre>
            <button @click=${() => navigate("/config/repairs")}>${t("openRepairs")}</button>`
        )
      );
    }
    if (status.restart_required) {
      banners.push(
        alert(
          "info",
          html`${t("restartPending")}
            <button class="inline" @click=${() => navigate("/config/repairs")}>${t("openRepairs")}</button>`
        )
      );
    }
    return banners;
  }

  private _renderToolbar() {
    const t = this._t;
    const errorCount = this._issues.issues.length;
    return html`
      <div class="toolbar">
        <button class="icon" title="${t("undo")} (Ctrl+Z)" aria-label=${t("undo")} ?disabled=${!this._history.length} @click=${this._undo}>
          ${icon("mdi:undo")}
        </button>
        <button class="icon" title="${t("redo")} (Ctrl+Shift+Z)" aria-label=${t("redo")} ?disabled=${!this._future.length} @click=${this._redo}>
          ${icon("mdi:redo")}
        </button>
        <button @click=${() => this._setConfig({ ...this._config!, nodes: [...this._config!.nodes, newNode()] })}>
          ${icon("mdi:plus")} ${t("addNode")}
        </button>
        <div class="menu-wrap">
          <button aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${() => (this._menuOpen = !this._menuOpen)}>
            ${icon("mdi:dots-vertical")} ${t("more")}
          </button>
          ${this._menuOpen
            ? html`
                <div class="menu-backdrop" @click=${() => (this._menuOpen = false)}></div>
                <div class="menu" role="menu">
                  <button role="menuitem" @click=${() => this._menuAction(() => (this._importOpen = true))}>${t("importYaml")}</button>
                  <button role="menuitem" @click=${() => this._menuAction(() => void this._importExisting())}>${t("importExisting")}</button>
                  <button role="menuitem" @click=${() => this._menuAction(() => this._fileInput?.click())}>${t("importJson")}</button>
                  <button role="menuitem" @click=${() => this._menuAction(() => this._exportJson())}>${t("exportJson")}</button>
                  <hr />
                  <button role="menuitem" @click=${() =>
                    this._menuAction(() =>
                      this._confirmIf(
                        this._hasContent(),
                        { title: "confirmExampleTitle", text: "confirmExampleText" },
                        () => this._setConfig(exampleConfig())
                      )
                    )}>${t("loadExample")}</button>
                  <button role="menuitem" class="danger" ?disabled=${!this._hasContent()} @click=${() =>
                    this._menuAction(() =>
                      this._confirmIf(true, { title: "confirmClearTitle", text: "confirmClearText" }, () =>
                        this._setConfig({ ...this._config!, nodes: [] })
                      )
                    )}>${t("clearAll")}</button>
                  <button role="menuitem" @click=${() =>
                    this._menuAction(() =>
                      this._confirmIf(
                        this._dirty,
                        { title: "confirmReloadTitle", text: "confirmReloadText" },
                        () => void this._load()
                      )
                    )}>${t("reload")}</button>
                </div>
              `
            : nothing}
        </div>
        <input type="file" accept=".json,.yaml,.yml,application/json" hidden @change=${this._importFile} />
        <span class="spacer"></span>
        ${errorCount ? html`<span class="state error">${t("errorsCount", { count: errorCount })}</span>` : nothing}
        ${this._dirty ? html`<span class="state">${t("unsaved")}</span>` : nothing}
        <button ?disabled=${!this._dirty || this._saving} @click=${this._save}>
          ${this._saving ? t("saving") : t("save")}
        </button>
        <button class="primary" title=${errorCount ? t("deployBlocked") : t("deployHint")} ?disabled=${errorCount > 0} @click=${this._openDeploy}>
          ${t("deploy")}
        </button>
      </div>
      ${this._toast ? html`<div class="toast">${alert(this._toast.type, this._toast.text)}</div>` : nothing}
    `;
  }

  private _renderIssues(issues: ValidationIssue[]) {
    return html`<ul class="issues">
      ${issues.map((issue) => html`<li><code>${issue.path.join(".")}</code>: ${issueText(this._t, issue)}</li>`)}
    </ul>`;
  }

  private _renderDiff(diff: string) {
    return html`<pre class="diff">${diff.split("\n").map((line) => {
      const cls = line.startsWith("+++") || line.startsWith("---")
        ? "meta"
        : line.startsWith("+")
          ? "add"
          : line.startsWith("-")
            ? "del"
            : line.startsWith("@@")
              ? "hunk"
              : "";
      return html`<span class=${cls}>${line}\n</span>`;
    })}</pre>`;
  }

  private _renderDeployDialog() {
    const deploy = this._deploy;
    if (!deploy) return nothing;
    const t = this._t;
    const { preview, result } = deploy;
    let body: unknown = html`<p>${t("loading")}</p>`;
    let canDeploy = false;
    if (result) {
      body = html`
        ${result.status === "invalid"
          ? html`${alert("error", t("deployInvalid"))}${this._renderIssues(result.errors ?? [])}`
          : alert("success", t(result.status === "written" ? "deployWritten" : "deployUnchanged", { path: result.path }))}
        ${result.check_error
          ? alert("error", html`${t("deployCheckError")}<pre>${result.check_error}</pre>`)
          : nothing}
        ${result.status !== "invalid" && result.included === false ? alert("warning", t("deployNotIncluded")) : nothing}
        ${result.restart_required ? alert("info", t("deployRestart")) : nothing}
      `;
    } else if (preview) {
      canDeploy = !preview.errors.length;
      body = html`
        <p class="muted">${t("deployTarget", { path: preview.path })}</p>
        ${preview.errors.length
          ? html`${alert("error", t("deployInvalid"))}${this._renderIssues(preview.errors)}`
          : preview.changed
            ? this._renderDiff(preview.diff)
            : alert("info", t("deployNoChanges"))}
      `;
    }
    return html`
      <artnetui-dialog
        open
        wide
        .heading=${t("deployTitle")}
        .closeLabel=${t("close")}
        @closed=${() => !deploy.busy && (this._deploy = undefined)}
      >
        ${deploy.error ? alert("error", t("deployFailed", { error: deploy.error })) : nothing}
        ${body}
        ${result?.restart_required || (result && result.included === false)
          ? html`<button slot="actions" @click=${() => {
              this._deploy = undefined;
              navigate("/config/repairs");
            }}>${t("openRepairs")}</button>`
          : nothing}
        <button slot="actions" ?disabled=${deploy.busy} @click=${() => (this._deploy = undefined)}>
          ${result ? t("close") : t("cancel")}
        </button>
        ${result
          ? nothing
          : html`<button slot="actions" class="primary" ?disabled=${!canDeploy || deploy.busy} @click=${this._runDeploy}>
              ${deploy.busy && preview ? t("deploying") : t("deployAction")}
            </button>`}
      </artnetui-dialog>
    `;
  }

  private _renderImportDialog() {
    if (!this._importOpen) return nothing;
    const t = this._t;
    return html`
      <artnetui-dialog
        open
        .heading=${t("importYamlTitle")}
        .subtitle=${t("importYamlSubtitle")}
        .closeLabel=${t("close")}
        @closed=${() => (this._importOpen = false)}
      >
        <textarea
          rows="14"
          spellcheck="false"
          placeholder="light:\n  - platform: artnet_led\n    host: 192.168.0.10\n    universes: ..."
          .value=${this._importText}
          @input=${(ev: Event) => (this._importText = (ev.target as HTMLTextAreaElement).value)}
        ></textarea>
        ${this._importError ? alert("error", this._importError) : nothing}
        <button slot="actions" @click=${() => (this._importOpen = false)}>${t("cancel")}</button>
        <button slot="actions" class="primary" ?disabled=${!this._importText.trim()} @click=${this._importYaml}>
          ${t("importAction")}
        </button>
      </artnetui-dialog>
    `;
  }

  private _renderConfirmDialog() {
    const confirm = this._confirm;
    if (!confirm) return nothing;
    const t = this._t;
    return html`
      <artnetui-dialog open .heading=${t(confirm.title)} .closeLabel=${t("close")} @closed=${() => (this._confirm = undefined)}>
        <p>${t(confirm.text)}</p>
        <button slot="actions" @click=${() => (this._confirm = undefined)}>${t("cancel")}</button>
        <button slot="actions" class="primary" @click=${() => {
          this._confirm = undefined;
          confirm.action();
        }}>${t("confirm")}</button>
      </artnetui-dialog>
    `;
  }

  private _renderHeader() {
    if (this.embedded) return nothing;
    return html`
      <div class="header">
        ${haElement("ha-menu-button")
          ? html`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`
          : nothing}
        <div class="title">${this._t("title")}</div>
        <span class="version">v${FRONTEND_VERSION}</span>
      </div>
    `;
  }

  protected render() {
    const t = this._t;
    let content: unknown;
    if (this._loadError) {
      content = html`${alert("error", `${t("loadError")}: ${this._loadError}`)}
        <div class="row"><button @click=${this._load}>${t("reload")}</button></div>`;
    } else if (!this._config) {
      content = html`<p class="muted">${t("loading")}</p>`;
    } else {
      content = html`
        ${this._renderBanners()} ${this._renderToolbar()}
        <artnetui-editor
          .config=${this._config}
          .issues=${this._issues}
          .t=${t}
          @config-changed=${(ev: CustomEvent<{ config: UiConfig }>) => this._setConfig(ev.detail.config)}
        ></artnetui-editor>
      `;
    }
    return html`
      ${this._renderHeader()}
      <div class="content">${content}</div>
      ${this._renderDeployDialog()} ${this._renderImportDialog()} ${this._renderConfirmDialog()}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        min-height: 100%;
        background: var(--primary-background-color);
      }
      :host([embedded]) {
        background: none;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        height: var(--header-height, 56px);
        padding: 0 12px;
        background: var(--app-header-background-color, var(--primary-color));
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
        border-bottom: var(--app-header-border-bottom, none);
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .header .title {
        font-size: 1.25rem;
        flex: 1;
        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .version {
        font-size: 0.75rem;
        opacity: 0.8;
      }
      .content {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px;
        display: grid;
        gap: 16px;
      }
      :host([narrow]) .content {
        padding: 8px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        position: sticky;
        top: calc(var(--header-height, 56px) + 0px);
        z-index: 1;
        padding: 8px;
        border-radius: var(--alu-radius);
        border: var(--alu-border);
        background: var(--card-background-color, var(--primary-background-color));
      }
      :host([embedded]) .toolbar {
        top: 0;
      }
      .state {
        font-size: 0.85rem;
        color: var(--alu-muted);
      }
      .state.error {
        color: var(--alu-error);
      }
      .menu-wrap {
        position: relative;
      }
      .menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 3;
      }
      .menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 4;
        min-width: 260px;
        display: grid;
        padding: 4px 0;
        border-radius: 8px;
        border: var(--alu-border);
        background: var(--card-background-color, #fff);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }
      .menu button {
        border: none;
        border-radius: 0;
        background: none;
        justify-content: flex-start;
        padding: 8px 16px;
      }
      .menu button:hover:not(:disabled) {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .menu hr {
        width: 100%;
        border: none;
        border-top: var(--alu-border);
        margin: 4px 0;
      }
      .toast {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        min-width: min(420px, calc(100vw - 32px));
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        background: var(--card-background-color, #fff);
        border-radius: 8px;
      }
      pre.include {
        margin: 8px 0;
        padding: 8px;
        border-radius: 6px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
        white-space: pre-wrap;
        user-select: all;
      }
      button.inline {
        margin-left: 8px;
      }
      textarea {
        font-family: var(--ha-font-family-code, monospace);
        resize: vertical;
      }
      pre.diff {
        margin: 0;
        padding: 12px;
        border-radius: 8px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
        overflow: auto;
        max-height: 55vh;
      }
      pre.diff .add {
        color: var(--success-color, #43a047);
      }
      pre.diff .del {
        color: var(--error-color, #db4437);
      }
      pre.diff .hunk,
      pre.diff .meta {
        color: var(--alu-muted);
      }
      ul.issues {
        margin: 8px 0;
        padding-left: 20px;
        font-size: 0.85rem;
      }
    `
  ];
}

safeDefine("ha-artnet-led-uiconfig-panel", ArtnetLedUiConfigPanel);

declare global {
  interface HTMLElementTagNameMap {
    "ha-artnet-led-uiconfig-panel": ArtnetLedUiConfigPanel;
  }
}
