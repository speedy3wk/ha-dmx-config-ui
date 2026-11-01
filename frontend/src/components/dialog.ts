import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { safeDefine } from "../utils/define";
import { icon, sharedStyles } from "../utils/ui";

/**
 * Modal dialog based on the native <dialog> element (top layer, focus trap, Esc).
 * Fires `closed` when dismissed by the user.
 */
export class AluDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) public open = false;
  @property() public heading = "";
  @property() public subtitle = "";
  @property() public closeLabel = "Close";
  @property({ type: Boolean }) public wide = false;

  @query("dialog") private _dialog?: HTMLDialogElement;

  protected updated(changed: PropertyValues<this>) {
    if (!changed.has("open") || !this._dialog) return;
    if (this.open && !this._dialog.open) {
      this._dialog.showModal();
    } else if (!this.open && this._dialog.open) {
      this._dialog.close();
    }
  }

  private _dismiss() {
    this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
  }

  private _onCancel(ev: Event) {
    ev.preventDefault();
    this._dismiss();
  }

  private _onClick(ev: MouseEvent) {
    // click on the backdrop (the dialog element itself, outside the surface)
    if (ev.target === this._dialog) this._dismiss();
  }

  protected render() {
    return html`
      <dialog
        class=${this.wide ? "wide" : ""}
        aria-label=${this.heading}
        @cancel=${this._onCancel}
        @click=${this._onClick}
      >
        <div class="surface">
          <header>
            <div>
              <h2>${this.heading}</h2>
              ${this.subtitle ? html`<p class="muted">${this.subtitle}</p>` : nothing}
            </div>
            <button class="icon" title=${this.closeLabel} aria-label=${this.closeLabel} @click=${this._dismiss}>
              ${icon("mdi:close")}
            </button>
          </header>
          <div class="content"><slot></slot></div>
          <footer><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      dialog {
        padding: 0;
        border: none;
        border-radius: var(--ha-dialog-border-radius, 24px);
        background: var(--mdc-theme-surface, var(--card-background-color, #fff));
        color: var(--primary-text-color);
        width: min(560px, calc(100vw - 32px));
        max-height: calc(100vh - 32px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      }
      dialog.wide {
        width: min(960px, calc(100vw - 32px));
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
      .surface {
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 32px);
      }
      header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 20px 20px 8px 24px;
      }
      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 500;
      }
      header p {
        margin: 4px 0 0;
      }
      .content {
        padding: 8px 24px;
        overflow: auto;
      }
      footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
        padding: 12px 24px 20px;
      }
      @media (max-width: 600px) {
        dialog,
        dialog.wide {
          width: 100vw;
          max-width: 100vw;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
        }
        .surface {
          height: 100%;
          max-height: 100%;
        }
        .content {
          flex: 1;
        }
      }
    `
  ];
}

safeDefine("artnetui-dialog", AluDialog);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-dialog": AluDialog;
  }
}
