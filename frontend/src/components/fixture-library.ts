import { LitElement, css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { downloadOfl, errorMessage, searchOfl, uploadFixture } from "../api";
import type { Translate } from "../i18n";
import type { HomeAssistant } from "../types";
import type { FixturesResult, FixtureSummary, OflSearchResult } from "../types_dmx";
import { safeDefine } from "../utils/define";
import { alert, icon, sharedStyles } from "../utils/ui";
import "./dialog";

const OFL_URL = "https://open-fixture-library.org";

/**
 * Fixture library: list installed/bundled fixtures, upload OFL JSON files and
 * search/download from the Open Fixture Library. Fires `fixtures-changed` and `closed`.
 */
export class AluFixtureLibrary extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public t!: Translate;
  @property({ attribute: false }) public library?: FixturesResult;

  @state() private _filter = "";
  @state() private _query = "";
  @state() private _results?: OflSearchResult[];
  @state() private _busy?: string;
  @state() private _message?: { type: "success" | "error"; text: string };

  @query("input[type=file]") private _fileInput?: HTMLInputElement;

  private _installedKeys(): Set<string> {
    return new Set(
      (this.library?.fixtures ?? [])
        .filter((f) => f.installed && f.manufacturer_key && f.fixture_key)
        .map((f) => `${f.manufacturer_key}/${f.fixture_key}`)
    );
  }

  private _changed(fixture: FixtureSummary) {
    this._message = { type: "success", text: this.t("dmxFixtureAdded", { name: fixture.name, file: fixture.file ?? "" }) };
    this.dispatchEvent(new CustomEvent("fixtures-changed", { detail: { fixture } }));
  }

  private async _search(ev?: Event) {
    ev?.preventDefault();
    const query = this._query.trim();
    if (!query) return;
    this._busy = "search";
    this._message = undefined;
    try {
      this._results = await searchOfl(this.hass, query);
    } catch (err) {
      this._results = undefined;
      this._message = { type: "error", text: this.t("dmxOflError", { error: errorMessage(err) }) };
    } finally {
      this._busy = undefined;
    }
  }

  private async _download(key: string) {
    this._busy = key;
    this._message = undefined;
    try {
      this._changed(await downloadOfl(this.hass, key));
    } catch (err) {
      this._message = { type: "error", text: this.t("dmxOflError", { error: errorMessage(err) }) };
    } finally {
      this._busy = undefined;
    }
  }

  private async _upload(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this._busy = "upload";
    this._message = undefined;
    try {
      this._changed(await uploadFixture(this.hass, file.name, await file.text()));
    } catch (err) {
      this._message = { type: "error", text: this.t("dmxUploadError", { error: errorMessage(err) }) };
    } finally {
      this._busy = undefined;
    }
  }

  private _renderFixture(fixture: FixtureSummary) {
    const t = this.t;
    const modes = fixture.modes.map((m) => `${m.name} (${m.width})`).join(", ");
    return html`<li>
      <div class="name">
        ${fixture.name}
        ${fixture.key !== fixture.name ? html`<code>${fixture.key}</code>` : nothing}
        <span class="badge ${fixture.installed ? "installed" : "bundled"}">
          ${fixture.installed ? t("dmxInstalled") : t("dmxBundled")}
        </span>
      </div>
      <div class="muted">${modes}${fixture.file ? html` · ${fixture.file}` : nothing}</div>
    </li>`;
  }

  protected render() {
    const t = this.t;
    const library = this.library;
    const filter = this._filter.trim().toLowerCase();
    const fixtures = (library?.fixtures ?? []).filter(
      (f) => !filter || [f.name, ...f.aliases, f.manufacturer_key ?? ""].some((v) => v.toLowerCase().includes(filter))
    );
    const installed = this._installedKeys();
    return html`
      <artnetui-dialog open wide .heading=${t("dmxLibrary")} .subtitle=${t("dmxLibrarySubtitle", { folder: library?.folder ?? "fixtures" })} .closeLabel=${t("close")}>
        ${this._message ? alert(this._message.type, this._message.text) : nothing}
        ${library && !library.folder_exists ? alert("info", t("dmxFolderMissing", { folder: library.folder ?? "fixtures" })) : nothing}
        ${(library?.errors ?? []).map((e) => alert("warning", html`<code>${e.file}</code>: ${e.error}`))}

        <section>
          <h3>${t("dmxOflTitle")}</h3>
          <p class="muted">${t("dmxOflHint")} <a href=${OFL_URL} target="_blank" rel="noreferrer">open-fixture-library.org</a></p>
          <form class="search" @submit=${this._search}>
            <input
              type="search"
              placeholder=${t("dmxOflPlaceholder")}
              .value=${this._query}
              @input=${(ev: Event) => (this._query = (ev.target as HTMLInputElement).value)}
            />
            <button type="submit" ?disabled=${!this._query.trim() || this._busy !== undefined}>
              ${icon("mdi:magnify")} ${this._busy === "search" ? t("loading") : t("dmxSearch")}
            </button>
            <button type="button" ?disabled=${this._busy !== undefined} @click=${() => this._fileInput?.click()}>
              ${icon("mdi:upload")} ${this._busy === "upload" ? t("loading") : t("dmxUpload")}
            </button>
            <input type="file" accept=".json,application/json" hidden @change=${this._upload} />
          </form>
          ${this._results
            ? this._results.length
              ? html`<ul class="results">
                  ${this._results.map((result) => {
                    const done = installed.has(result.key);
                    return html`<li>
                      <div>
                        <div class="name">${result.name}</div>
                        <div class="muted"><code>${result.key}</code></div>
                      </div>
                      <button ?disabled=${done || this._busy !== undefined} @click=${() => this._download(result.key)}>
                        ${icon("mdi:download")}
                        ${done ? t("dmxInstalled") : this._busy === result.key ? t("loading") : t("dmxDownload")}
                      </button>
                    </li>`;
                  })}
                </ul>`
              : html`<p class="muted">${t("dmxOflNoResults")}</p>`
            : nothing}
        </section>

        <section>
          <h3>${t("dmxAvailable", { count: library?.fixtures.length ?? 0 })}</h3>
          <input
            type="search"
            placeholder=${t("dmxFilter")}
            .value=${this._filter}
            @input=${(ev: Event) => (this._filter = (ev.target as HTMLInputElement).value)}
          />
          ${library
            ? html`<ul class="fixtures">${fixtures.map((f) => this._renderFixture(f))}</ul>`
            : html`<p class="muted">${t("loading")}</p>`}
          <p class="muted">${t("dmxBundledExplain")}</p>
        </section>

        <button slot="actions" class="primary" @click=${() => this.dispatchEvent(new CustomEvent("closed"))}>${t("close")}</button>
      </artnetui-dialog>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }
      section {
        display: grid;
        gap: 8px;
        margin: 12px 0;
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
      }
      p {
        margin: 0;
      }
      a {
        color: var(--primary-color);
      }
      .search {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 8px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 4px;
        max-height: 40vh;
        overflow: auto;
      }
      li {
        padding: 6px 8px;
        border: var(--alu-border);
        border-radius: 8px;
      }
      .results li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .name {
        font-weight: 500;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .badge {
        font-size: 0.7rem;
        font-weight: normal;
        padding: 1px 8px;
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .badge.installed {
        background: rgba(76, 175, 80, 0.2);
      }
      @media (max-width: 600px) {
        .search {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}

safeDefine("artnetui-fixture-library", AluFixtureLibrary);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-fixture-library": AluFixtureLibrary;
  }
}
