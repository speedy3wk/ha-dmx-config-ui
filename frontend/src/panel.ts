import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import {
  deployConfig,
  errorMessage,
  fetchConfig,
  fetchFixtures,
  fetchStatus,
  importExisting,
  migrateLegacy,
  previewConfig,
  saveConfig,
  type AnyConfig
} from "./api";
import "./components/dialog";
import "./components/dmx-editor";
import "./components/editor";
import "./components/fixture-library";
import "./components/migrate-dialog";
import { issueText, languageOf, translator, type TextKey, type Translate } from "./i18n";
import { ImportError, configFromJson, configFromYaml } from "./import";
import { dmxHasContent, isDmxConfig, normalizeDmxConfig } from "./model_dmx";
import { exampleConfig, exampleDmxConfig } from "./sample";
import type {
  DeployResult,
  HomeAssistant,
  PreviewResult,
  StatusResult,
  Target,
  UiConfig,
  ValidationIssue
} from "./types";
import { emptyConfig } from "./types";
import { emptyDmxConfig, type DmxConfig, type FixturesResult, type MigrationResult } from "./types_dmx";
import { haElement, safeDefine } from "./utils/define";
import { newNode } from "./utils/mutate";
import { alert, icon, sharedStyles } from "./utils/ui";
import { IssueIndex, validateConfig } from "./validation";
import { errorsOnly, validateDmxConfig } from "./validation_dmx";

declare const __VERSION__: string;
export const FRONTEND_VERSION = __VERSION__;

const HISTORY_LIMIT = 100;
const TARGET_STORAGE_KEY = "ha_artnet_led_uiconfig.target";
const TARGETS: Target[] = ["dmx", "artnet_led"];

interface ConfirmState {
  title: TextKey;
  text: TextKey;
  action: () => void;
}

interface DeployState {
  target: Target;
  preview?: PreviewResult;
  result?: DeployResult;
  error?: string;
  busy: boolean;
}

interface MigrateState {
  result?: MigrationResult;
  error?: string;
}

/** One editable document per backend, each with its own undo history. */
interface Doc {
  config?: AnyConfig;
  saved: string;
  history: string[];
  future: string[];
}

const emptyDoc = (): Doc => ({ saved: "", history: [], future: [] });
const loadedDoc = (config: AnyConfig): Doc => ({ config, saved: JSON.stringify(config), history: [], future: [] });
const isError = (issue: ValidationIssue) => (issue.severity ?? "error") === "error";

const navigate = (path: string) => {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
};

const readStoredTarget = (): Target | undefined => {
  try {
    const value = window.localStorage.getItem(TARGET_STORAGE_KEY);
    return value === "dmx" || value === "artnet_led" ? value : undefined;
  } catch {
    return undefined;
  }
};

export class ArtnetLedUiConfigPanel extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow = false;
  @property({ attribute: false }) public panel?: { config?: { version?: string } };
  /** Rendered inside a dashboard card: no app header. */
  @property({ type: Boolean, reflect: true }) public embedded = false;

  @state() private _docs: Record<Target, Doc> = { artnet_led: emptyDoc(), dmx: emptyDoc() };
  @state() private _target: Target = "artnet_led";
  @state() private _issues = new IssueIndex();
  @state() private _status?: StatusResult;
  @state() private _fixtures?: FixturesResult;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _toast?: { type: "success" | "error" | "info"; text: string };
  @state() private _menuOpen = false;
  @state() private _confirm?: ConfirmState;
  @state() private _importOpen = false;
  @state() private _importText = "";
  @state() private _importError?: string;
  @state() private _deploy?: DeployState;
  @state() private _migrate?: MigrateState;
  @state() private _libraryOpen = false;

  @query("input[type=file]") private _fileInput?: HTMLInputElement;

  private _loadStarted = false;
  private _targetChosen = false;
  private _fixturesFolder?: string;
  private _toastTimer?: number;

  private get _t(): Translate {
    return translator(languageOf(this.hass));
  }

  private get _doc(): Doc {
    return this._docs[this._target];
  }

  private get _config(): AnyConfig | undefined {
    return this._doc.config;
  }

  private get _legacy(): UiConfig | undefined {
    return this._docs.artnet_led.config as UiConfig | undefined;
  }

  private get _dmx(): DmxConfig | undefined {
    return this._docs.dmx.config as DmxConfig | undefined;
  }

  private _isDirty(target: Target) {
    const doc = this._docs[target];
    return doc.config !== undefined && JSON.stringify(doc.config) !== doc.saved;
  }

  private get _dirty() {
    return this._isDirty(this._target);
  }

  private get _modalOpen() {
    return this._importOpen || Boolean(this._deploy || this._confirm || this._migrate) || this._libraryOpen;
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
    const keys = ["_docs", "_target", "_fixtures"];
    if (keys.some((key) => (changed as Map<string, unknown>).has(key))) {
      const config = this._config;
      if (!config) this._issues = new IssueIndex();
      else if (this._target === "dmx") {
        this._issues = new IssueIndex(validateDmxConfig(config as DmxConfig, this._fixtures?.fixtures));
      } else this._issues = new IssueIndex(validateConfig(config as UiConfig));
    }
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("hass") && this.hass && !this._loadStarted) {
      this._loadStarted = true;
      void this._load();
    }
    const folder = this._dmx?.fixtures_folder;
    if (this._target === "dmx" && folder !== undefined && folder !== this._fixturesFolder) {
      this._fixturesFolder = folder;
      void this._loadFixtures();
    }
  }

  private _onBeforeUnload = (ev: BeforeUnloadEvent) => {
    if (this._isDirty("artnet_led") || this._isDirty("dmx")) ev.preventDefault();
  };

  private _onKeyDown = (ev: KeyboardEvent) => {
    if (!(ev.ctrlKey || ev.metaKey) || !this.isConnected || !this._config) return;
    if (this._modalOpen) return;
    const key = ev.key.toLowerCase();
    if (key === "s") {
      ev.preventDefault();
      void this._save();
      return;
    }
    // Let text fields keep their native undo; dialogs of child editors handle their own keys.
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

  private _patchDoc(target: Target, patch: Partial<Doc>) {
    this._docs = { ...this._docs, [target]: { ...this._docs[target], ...patch } };
  }

  private _setConfig(config: AnyConfig, target: Target = this._target) {
    const doc = this._docs[target];
    this._patchDoc(target, {
      config,
      history: doc.config ? [...doc.history, JSON.stringify(doc.config)].slice(-HISTORY_LIMIT) : doc.history,
      future: []
    });
  }

  private _undo() {
    const doc = this._doc;
    if (!doc.history.length || !doc.config) return;
    this._patchDoc(this._target, {
      future: [JSON.stringify(doc.config), ...doc.future],
      config: JSON.parse(doc.history[doc.history.length - 1]),
      history: doc.history.slice(0, -1)
    });
  }

  private _redo() {
    const doc = this._doc;
    if (!doc.future.length || !doc.config) return;
    this._patchDoc(this._target, {
      history: [...doc.history, JSON.stringify(doc.config)],
      config: JSON.parse(doc.future[0]),
      future: doc.future.slice(1)
    });
  }

  private _selectTarget(target: Target) {
    this._target = target;
    this._menuOpen = false;
    try {
      window.localStorage.setItem(TARGET_STORAGE_KEY, target);
    } catch {
      // storage is optional
    }
  }

  private _initialTarget(status: StatusResult): Target {
    const stored = readStoredTarget();
    if (stored) return stored;
    const backends = status.backends;
    const legacyContent = Boolean(this._legacy?.nodes.length);
    if (backends?.dmx.installed && !(backends.artnet_led.installed && legacyContent)) return "dmx";
    if (!backends?.artnet_led.installed && dmxHasContent(this._dmx)) return "dmx";
    return "artnet_led";
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

  private _hasContent(target: Target = this._target) {
    return target === "dmx" ? dmxHasContent(this._dmx) : Boolean(this._legacy?.nodes.length);
  }

  // ------------------------------------------------------------------ backend

  private async _load() {
    if (!this.hass) return;
    this._loadError = undefined;
    try {
      const [legacy, dmx, status] = await Promise.all([
        fetchConfig<UiConfig>(this.hass, "artnet_led"),
        fetchConfig<DmxConfig>(this.hass, "dmx"),
        fetchStatus(this.hass)
      ]);
      this._docs = {
        artnet_led: loadedDoc(legacy ?? emptyConfig()),
        dmx: loadedDoc(dmx ?? emptyDmxConfig())
      };
      this._status = status;
      this._fixturesFolder = undefined;
      if (!this._targetChosen) {
        this._targetChosen = true;
        this._target = this._initialTarget(status);
      }
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

  private async _loadFixtures() {
    const folder = this._dmx?.fixtures_folder;
    if (!this.hass || folder === undefined) return;
    try {
      this._fixtures = await fetchFixtures(this.hass, { ...emptyDmxConfig(), fixtures_folder: folder });
    } catch (err) {
      this._showToast("error", errorMessage(err));
    }
  }

  private async _save() {
    const target = this._target;
    const config = this._config;
    if (!this.hass || !config || this._saving) return;
    this._saving = true;
    try {
      const result = await saveConfig<AnyConfig>(this.hass, config, target);
      if (JSON.stringify(result.config) !== JSON.stringify(config)) {
        this._patchDoc(target, { config: result.config });
      }
      this._patchDoc(target, { saved: JSON.stringify(this._docs[target].config) });
      this._showToast("success", this._t("saved"));
    } catch (err) {
      this._showToast("error", `${this._t("saveError")}: ${errorMessage(err)}`);
    } finally {
      this._saving = false;
    }
  }

  private async _openDeploy() {
    const target = this._target;
    const config = this._config;
    if (!this.hass || !config) return;
    this._deploy = { target, busy: true };
    try {
      this._deploy = { target, busy: false, preview: await previewConfig(this.hass, config, target) };
    } catch (err) {
      this._deploy = { target, busy: false, error: errorMessage(err) };
    }
  }

  private async _runDeploy() {
    const deploy = this._deploy;
    const config = deploy && this._docs[deploy.target].config;
    if (!this.hass || !deploy || !config) return;
    this._deploy = { ...deploy, busy: true, error: undefined };
    try {
      const result = await deployConfig(this.hass, config, deploy.target);
      if (result.status !== "invalid") this._patchDoc(deploy.target, { saved: JSON.stringify(config) });
      this._deploy = { ...deploy, busy: false, result };
      void this._refreshStatus();
      if (deploy.target === "dmx" && result.installed_fixtures?.length) void this._loadFixtures();
    } catch (err) {
      this._deploy = { ...deploy, busy: false, error: errorMessage(err) };
    }
  }

  private async _openMigrate() {
    if (!this.hass) return;
    this._migrate = {};
    try {
      this._migrate = { result: await migrateLegacy(this.hass, this._legacy) };
    } catch (err) {
      this._migrate = { error: errorMessage(err) };
    }
  }

  private _applyMigration() {
    const result = this._migrate?.result;
    this._migrate = undefined;
    if (!result) return;
    this._setConfig(result.config, "dmx");
    this._selectTarget("dmx");
  }

  // ------------------------------------------------------------------ actions

  private _menuAction(action: () => void) {
    this._menuOpen = false;
    action();
  }

  private _replaceConfig(config: AnyConfig, target: Target) {
    this._confirmIf(
      this._hasContent(target),
      { title: "confirmImportTitle", text: "confirmImportText" },
      () => {
        this._setConfig(config, target);
        this._selectTarget(target);
      }
    );
  }

  private _importYaml() {
    try {
      const config = configFromYaml(this._importText);
      this._importOpen = false;
      this._importText = "";
      this._importError = undefined;
      this._replaceConfig(config, "artnet_led");
    } catch (err) {
      this._importError = this._t("importFailed", {
        error: err instanceof ImportError ? err.message : errorMessage(err)
      });
    }
  }

  private async _importExisting() {
    if (!this.hass) return;
    const target = this._target;
    try {
      if (target === "dmx") {
        const config = await importExisting<DmxConfig>(this.hass, "dmx");
        if (!dmxHasContent(config)) {
          this._showToast("info", this._t("importNothingDmx"));
          return;
        }
        this._replaceConfig(config, "dmx");
        return;
      }
      const config = await importExisting<UiConfig>(this.hass, "artnet_led");
      if (!config.nodes.length) {
        this._showToast("info", this._t("importNothing"));
        return;
      }
      this._replaceConfig(config, "artnet_led");
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
      if (!file.name.endsWith(".json")) {
        this._replaceConfig(configFromYaml(text), "artnet_led");
        return;
      }
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new ImportError((err as Error).message);
      }
      // Exported files of both formats are accepted; the matching tab is selected.
      if (isDmxConfig(data)) this._replaceConfig(normalizeDmxConfig(data), "dmx");
      else this._replaceConfig(configFromJson(text), "artnet_led");
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
    link.download = this._target === "dmx" ? "dmx-uiconfig.json" : "artnet-led-uiconfig.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  private _emptied(): AnyConfig {
    if (this._target === "dmx") {
      const config = this._dmx!;
      return {
        ...config,
        artnet: { ...config.artnet, universes: [] },
        sacn: { ...config.sacn, universes: [] }
      };
    }
    return { ...this._legacy!, nodes: [] };
  }

  // ------------------------------------------------------------------- render

  private _openRepairsButton(extraClass = "") {
    return html`<button class=${extraClass} @click=${() => navigate("/config/repairs")}>${this._t("openRepairs")}</button>`;
  }

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
    const backends = status.backends;
    if (this._target === "artnet_led") {
      // Without 0.x but with 1.x installed the tab badge is enough.
      if (!status.artnet_led_installed && !backends?.dmx.installed) {
        banners.push(alert("warning", t("artnetMissing")));
      }
      if (!status.included && (status.file_exists || this._hasContent("artnet_led"))) {
        banners.push(
          alert(
            "warning",
            html`${t("includeMissing", { path: status.path })}
              <pre class="include">${status.include_key}: !include ${status.path}</pre>
              ${this._openRepairsButton()}`
          )
        );
      }
    } else {
      const dmx = status.dmx;
      if (backends && !backends.dmx.installed) banners.push(alert("warning", t("dmxMissing")));
      if (dmx && !dmx.included && (dmx.file_exists || this._hasContent("dmx"))) {
        banners.push(
          alert(
            "warning",
            html`${t("includeMissing", { path: dmx.path })}
              <pre class="include">dmx: !include ${dmx.path}</pre>
              ${dmx.foreign_block ? html`<p>${t("dmxForeignBlock")}</p>` : nothing}
              ${this._openRepairsButton()}`
          )
        );
      }
      if (backends?.dmx.installed && this._hasContent("artnet_led") && !this._hasContent("dmx")) {
        banners.push(
          alert(
            "info",
            html`${t("dmxSuggestMigrate")}
              <button class="inline" @click=${this._openMigrate}>${t("migrateFrom0x")}</button>`
          )
        );
      }
      const fixtureErrors = this._fixtures?.errors ?? [];
      if (fixtureErrors.length) {
        banners.push(
          alert(
            "warning",
            html`${t("dmxFixtureErrors")}
              <ul class="issues">
                ${fixtureErrors.map((e) => html`<li><code>${e.file}</code>: ${e.error}</li>`)}
              </ul>`
          )
        );
      }
    }
    if (status.restart_required) {
      banners.push(
        alert("info", html`${t("restartPending")} ${this._openRepairsButton("inline")}`)
      );
    }
    return banners;
  }

  private _renderTabs() {
    const t = this._t;
    const backends = this._status?.backends;
    return html`
      <div class="tabs" role="tablist">
        ${TARGETS.map((target) => {
          const info = backends?.[target];
          const active = target === this._target;
          return html`
            <button
              role="tab"
              class="tab ${active ? "active" : ""}"
              aria-selected=${active}
              @click=${() => this._selectTarget(target)}
            >
              <span class="tab-title">
                ${icon(target === "dmx" ? "mdi:spotlight-beam" : "mdi:lightbulb")}
                ${t(target === "dmx" ? "tabDmx" : "tabLegacy")}
                ${this._isDirty(target) ? html`<span class="dot" title=${t("unsaved")}></span>` : nothing}
              </span>
              <span class="tab-sub">${t(target === "dmx" ? "tabDmxSub" : "tabLegacySub")}</span>
              ${info
                ? html`<span class="badge ${info.installed ? "ok" : "missing"}">
                    ${info.installed
                      ? t("backendInstalled", {
                          version: target === "dmx" || !info.version ? "" : `v${info.version}`
                        }).trim()
                      : t("backendMissing")}
                  </span>`
                : nothing}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderMenu() {
    const t = this._t;
    const dmx = this._target === "dmx";
    const item = (label: string, action: () => void, options: { danger?: boolean; disabled?: boolean } = {}) =>
      html`<button role="menuitem" class=${options.danger ? "danger" : ""} ?disabled=${options.disabled} @click=${() =>
        this._menuAction(action)}>${label}</button>`;
    return html`
      <div class="menu-backdrop" @click=${() => (this._menuOpen = false)}></div>
      <div class="menu" role="menu">
        ${dmx
          ? html`${item(t("migrateFrom0x"), () => void this._openMigrate(), { disabled: !this._hasContent("artnet_led") })}
              ${item(t("dmxLibrary"), () => (this._libraryOpen = true))}
              <hr />`
          : item(t("importYaml"), () => (this._importOpen = true))}
        ${item(t("importExisting"), () => void this._importExisting())}
        ${item(t("importJson"), () => this._fileInput?.click())}
        ${item(t("exportJson"), () => this._exportJson())}
        <hr />
        ${item(t("loadExample"), () =>
          this._confirmIf(this._hasContent(), { title: "confirmExampleTitle", text: "confirmExampleText" }, () =>
            this._setConfig(dmx ? exampleDmxConfig() : exampleConfig())
          )
        )}
        ${item(
          t("clearAll"),
          () =>
            this._confirmIf(true, { title: "confirmClearTitle", text: "confirmClearText" }, () =>
              this._setConfig(this._emptied())
            ),
          { danger: true, disabled: !this._hasContent() }
        )}
        ${item(t("reload"), () =>
          this._confirmIf(
            this._isDirty("artnet_led") || this._isDirty("dmx"),
            { title: "confirmReloadTitle", text: "confirmReloadText" },
            () => void this._load()
          )
        )}
      </div>
    `;
  }

  private _renderToolbar() {
    const t = this._t;
    const issues = this._issues.issues;
    const errorCount = issues.filter(isError).length;
    const warningCount = issues.length - errorCount;
    const doc = this._doc;
    return html`
      <div class="toolbar">
        <button class="icon" title="${t("undo")} (Ctrl+Z)" aria-label=${t("undo")} ?disabled=${!doc.history.length} @click=${this._undo}>
          ${icon("mdi:undo")}
        </button>
        <button class="icon" title="${t("redo")} (Ctrl+Shift+Z)" aria-label=${t("redo")} ?disabled=${!doc.future.length} @click=${this._redo}>
          ${icon("mdi:redo")}
        </button>
        ${this._target === "dmx"
          ? html`<button @click=${() => (this._libraryOpen = true)}>${icon("mdi:bookshelf")} ${t("dmxLibrary")}</button>`
          : html`<button @click=${() => this._setConfig({ ...this._legacy!, nodes: [...this._legacy!.nodes, newNode()] })}>
              ${icon("mdi:plus")} ${t("addNode")}
            </button>`}
        <div class="menu-wrap">
          <button aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${() => (this._menuOpen = !this._menuOpen)}>
            ${icon("mdi:dots-vertical")} ${t("more")}
          </button>
          ${this._menuOpen ? this._renderMenu() : nothing}
        </div>
        <input
          type="file"
          accept=${this._target === "dmx" ? ".json,application/json" : ".json,.yaml,.yml,application/json"}
          hidden
          @change=${this._importFile}
        />
        <span class="spacer"></span>
        ${errorCount ? html`<span class="state error">${t("errorsCount", { count: errorCount })}</span>` : nothing}
        ${warningCount ? html`<span class="state warning">${t("warningsCount", { count: warningCount })}</span>` : nothing}
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

  private _renderWarnings(issues: ValidationIssue[]) {
    const warnings = issues.filter((issue) => !isError(issue));
    return warnings.length
      ? alert("warning", html`${this._t("deployWarnings")}${this._renderIssues(warnings)}`)
      : nothing;
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
          ? html`${alert("error", t("deployInvalid"))}${this._renderIssues(errorsOnly(result.errors ?? []))}`
          : alert("success", t(result.status === "written" ? "deployWritten" : "deployUnchanged", { path: result.path }))}
        ${result.installed_fixtures?.length
          ? alert("info", t("deployFixturesInstalled", { files: result.installed_fixtures.join(", ") }))
          : nothing}
        ${this._renderWarnings(result.warnings ?? [])}
        ${result.check_error
          ? alert("error", html`${t("deployCheckError")}<pre>${result.check_error}</pre>`)
          : nothing}
        ${result.status !== "invalid" && result.included === false ? alert("warning", t("deployNotIncluded")) : nothing}
        ${result.restart_required ? alert("info", t("deployRestart")) : nothing}
      `;
    } else if (preview) {
      const errors = errorsOnly(preview.errors);
      canDeploy = !errors.length;
      body = html`
        <p class="muted">${t("deployTarget", { path: preview.path })}</p>
        ${errors.length
          ? html`${alert("error", t("deployInvalid"))}${this._renderIssues(errors)}`
          : html`${this._renderWarnings(preview.errors)}
            ${preview.changed ? this._renderDiff(preview.diff) : alert("info", t("deployNoChanges"))}`}
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

  private _renderMigrateDialog() {
    const migrate = this._migrate;
    if (!migrate) return nothing;
    return html`
      <artnetui-migrate-dialog
        .t=${this._t}
        .result=${migrate.result}
        .error=${migrate.error}
        ?replacing=${this._hasContent("dmx")}
        @apply=${this._applyMigration}
        @closed=${() => (this._migrate = undefined)}
      ></artnetui-migrate-dialog>
    `;
  }

  private _renderLibrary() {
    if (!this._libraryOpen || !this.hass) return nothing;
    return html`
      <artnetui-fixture-library
        .hass=${this.hass}
        .t=${this._t}
        .library=${this._fixtures}
        @fixtures-changed=${() => void this._loadFixtures()}
        @closed=${() => (this._libraryOpen = false)}
      ></artnetui-fixture-library>
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

  private _renderEditor() {
    const t = this._t;
    if (this._target === "dmx") {
      return html`
        <artnetui-dmx-editor
          .config=${this._dmx!}
          .fixtures=${this._fixtures?.fixtures}
          .issues=${this._issues}
          .t=${t}
          @config-changed=${(ev: CustomEvent<{ config: DmxConfig }>) => this._setConfig(ev.detail.config, "dmx")}
          @open-library=${() => (this._libraryOpen = true)}
        ></artnetui-dmx-editor>
      `;
    }
    return html`
      <artnetui-editor
        .config=${this._legacy!}
        .issues=${this._issues}
        .t=${t}
        @config-changed=${(ev: CustomEvent<{ config: UiConfig }>) => this._setConfig(ev.detail.config, "artnet_led")}
      ></artnetui-editor>
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
      content = html`${this._renderTabs()} ${this._renderBanners()} ${this._renderToolbar()} ${this._renderEditor()}`;
    }
    return html`
      ${this._renderHeader()}
      <div class="content">${content}</div>
      ${this._renderDeployDialog()} ${this._renderImportDialog()} ${this._renderMigrateDialog()}
      ${this._renderLibrary()} ${this._renderConfirmDialog()}
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
      .state.warning {
        color: var(--warning-color, #ffa600);
      }
      .tabs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 8px;
      }
      .tab {
        display: grid;
        justify-items: start;
        gap: 2px;
        padding: 10px 14px;
        text-align: left;
        border-radius: var(--alu-radius);
        border: var(--alu-border);
        background: var(--card-background-color, var(--primary-background-color));
        color: var(--primary-text-color);
        cursor: pointer;
        height: auto;
      }
      .tab.active {
        border-color: var(--primary-color);
        box-shadow: inset 0 -3px 0 var(--primary-color);
      }
      .tab-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
      }
      .tab-sub {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .tab .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--warning-color, #ffa600);
      }
      .badge {
        font-size: 0.72rem;
        padding: 1px 8px;
        border-radius: 10px;
        margin-top: 4px;
      }
      .badge.ok {
        background: rgba(67, 160, 71, 0.15);
        color: var(--success-color, #43a047);
      }
      .badge.missing {
        background: rgba(127, 127, 127, 0.15);
        color: var(--alu-muted);
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
