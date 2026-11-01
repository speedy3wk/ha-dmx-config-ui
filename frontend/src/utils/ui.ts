import { css, html, nothing, type TemplateResult } from "lit";
import { haElement } from "./define";

export const sharedStyles = css`
  :host {
    --alu-radius: var(--ha-card-border-radius, 12px);
    --alu-border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    --alu-error: var(--error-color, #db4437);
    --alu-warning: var(--warning-color, #ffa600);
    --alu-muted: var(--secondary-text-color, #727272);
    color: var(--primary-text-color);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, inherit));
  }

  button {
    font: inherit;
    border: var(--alu-border);
    border-radius: 8px;
    padding: 6px 12px;
    min-height: 36px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  button:hover:not(:disabled) {
    filter: brightness(1.08);
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  button.primary {
    background: var(--primary-color, #03a9f4);
    border-color: transparent;
    color: var(--text-primary-color, #fff);
  }
  button.danger {
    color: var(--alu-error);
  }
  button.icon {
    padding: 4px;
    min-width: 36px;
    justify-content: center;
    background: transparent;
    border-color: transparent;
  }
  button.icon:hover:not(:disabled) {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
  .glyph {
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .field {
    display: grid;
    gap: 4px;
    min-width: 0;
    align-content: start;
  }
  .field > span.label {
    font-size: 0.8rem;
    color: var(--alu-muted);
  }
  input,
  select,
  textarea {
    font: inherit;
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 8px 10px;
    border-radius: 8px;
    border: var(--alu-border);
    background: var(--input-fill-color, var(--card-background-color, transparent));
    color: var(--primary-text-color);
  }
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: -1px;
  }
  .field.invalid input,
  .field.invalid select {
    border-color: var(--alu-error);
  }
  .field .helper {
    font-size: 0.75rem;
    color: var(--alu-muted);
  }
  .field .error {
    font-size: 0.75rem;
    color: var(--alu-error);
  }
  label.check {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
  }
  label.check input {
    width: 18px;
    min-height: 18px;
    margin: 0;
  }

  .grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  .muted {
    color: var(--alu-muted);
    font-size: 0.85rem;
  }
  .empty {
    padding: 16px;
    border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
    border-radius: var(--alu-radius);
    color: var(--alu-muted);
    text-align: center;
  }
  .alert {
    padding: 10px 14px;
    border-radius: 8px;
    border-left: 4px solid var(--alu-warning);
    background: rgba(255, 166, 0, 0.1);
  }
  .alert.error {
    border-color: var(--alu-error);
    background: rgba(219, 68, 55, 0.1);
  }
  .alert.info,
  .alert.success {
    border-color: var(--primary-color);
    background: rgba(3, 169, 244, 0.08);
  }
  code,
  pre {
    font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 0.85rem;
  }
`;

const GLYPHS: Record<string, string> = {
  "mdi:arrow-up": "↑",
  "mdi:arrow-down": "↓",
  "mdi:delete-outline": "✕",
  "mdi:content-copy": "⧉",
  "mdi:pencil": "✎",
  "mdi:plus": "+",
  "mdi:undo": "↶",
  "mdi:redo": "↷",
  "mdi:dots-vertical": "⋮",
  "mdi:close": "✕",
  "mdi:drag": "⋮⋮"
};

export const icon = (name: string) =>
  haElement("ha-icon")
    ? html`<ha-icon .icon=${name}></ha-icon>`
    : html`<span class="glyph" aria-hidden="true">${GLYPHS[name] ?? "•"}</span>`;

export type AlertType = "info" | "warning" | "error" | "success";

export const alert = (type: AlertType, content: unknown) =>
  haElement("ha-alert")
    ? html`<ha-alert alert-type=${type}>${content}</ha-alert>`
    : html`<div class="alert ${type}" role="alert">${content}</div>`;

interface BaseField {
  label: string;
  errors?: string[];
  helper?: string | TemplateResult;
  placeholder?: string;
  required?: boolean;
}

const wrap = (opts: BaseField, control: TemplateResult) => html`
  <label class="field ${opts.errors?.length ? "invalid" : ""}">
    <span class="label">${opts.label}${opts.required ? " *" : ""}</span>
    ${control}
    ${opts.errors?.length
      ? opts.errors.map((error) => html`<span class="error">${error}</span>`)
      : opts.helper
        ? html`<span class="helper">${opts.helper}</span>`
        : nothing}
  </label>
`;

export const textField = (
  opts: BaseField & { value?: string; onChange: (value: string | undefined) => void }
) =>
  wrap(
    opts,
    html`<input
      type="text"
      .value=${opts.value ?? ""}
      placeholder=${opts.placeholder ?? ""}
      aria-invalid=${opts.errors?.length ? "true" : "false"}
      @change=${(ev: Event) => {
        const value = (ev.target as HTMLInputElement).value.trim();
        opts.onChange(value || undefined);
      }}
    />`
  );

export const numberField = (
  opts: BaseField & {
    value?: number;
    min?: number;
    max?: number;
    step?: number | "any";
    onChange: (value: number | undefined) => void;
  }
) =>
  wrap(
    opts,
    html`<input
      type="number"
      inputmode="decimal"
      .value=${opts.value === undefined || opts.value === null ? "" : String(opts.value)}
      min=${opts.min ?? ""}
      max=${opts.max ?? ""}
      step=${opts.step ?? 1}
      placeholder=${opts.placeholder ?? ""}
      aria-invalid=${opts.errors?.length ? "true" : "false"}
      @change=${(ev: Event) => {
        const raw = (ev.target as HTMLInputElement).value;
        const value = raw === "" ? undefined : Number(raw);
        opts.onChange(value === undefined || Number.isNaN(value) ? undefined : value);
      }}
    />`
  );

export const selectField = (
  opts: BaseField & {
    value?: string;
    options: ReadonlyArray<string | { value: string; label: string }>;
    /** Label of an empty option meaning "use upstream default". */
    emptyLabel?: string;
    onChange: (value: string | undefined) => void;
  }
) =>
  wrap(
    opts,
    html`<select
      aria-invalid=${opts.errors?.length ? "true" : "false"}
      @change=${(ev: Event) => opts.onChange((ev.target as HTMLSelectElement).value || undefined)}
    >
      ${opts.emptyLabel !== undefined
        ? html`<option value="" ?selected=${!opts.value}>${opts.emptyLabel}</option>`
        : nothing}
      ${opts.options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        return html`<option value=${value} ?selected=${opts.value === value}>${label}</option>`;
      })}
      ${opts.value && !opts.options.some((o) => (typeof o === "string" ? o : o.value) === opts.value)
        ? html`<option value=${opts.value} selected>${opts.value}</option>`
        : nothing}
    </select>`
  );

export const checkField = (opts: {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}) => html`
  <label class="check">
    <input
      type="checkbox"
      .checked=${Boolean(opts.value)}
      @change=${(ev: Event) => opts.onChange((ev.target as HTMLInputElement).checked)}
    />
    <span>${opts.label}</span>
  </label>
`;
