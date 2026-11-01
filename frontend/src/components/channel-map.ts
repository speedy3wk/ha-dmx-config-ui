import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { DMX_CHANNELS, channelOccupancy, type Occupant } from "../model";
import type { UniverseConfig } from "../types";
import { safeDefine } from "../utils/define";

export const deviceColor = (index: number) => `hsl(${(index * 137.508) % 360} 65% 55%)`;

/** 512-slot overview of a universe. Fires `device-click` with {index}. */
export class AluChannelMap extends LitElement {
  @property({ attribute: false }) public universe?: UniverseConfig;
  /** Precomputed occupancy (used by the dmx editor); wins over `universe`. */
  @property({ attribute: false }) public occupancy?: Map<number, Occupant[]>;
  @property({ attribute: false }) public t!: Translate;

  protected render() {
    const occupancy =
      this.occupancy ?? (this.universe ? channelOccupancy(this.universe) : new Map<number, Occupant[]>());
    const cells = [];
    for (let slot = 1; slot <= DMX_CHANNELS; slot++) {
      const owners = occupancy.get(slot) ?? [];
      const overlap = owners.length > 1;
      const owner = owners[0];
      const title = owners.length
        ? `${slot}: ${owners.map((o) => `${o.name || "?"} (${o.start}–${o.end})`).join(", ")}${
            overlap ? ` – ${this.t("overlap")}` : ""
          }`
        : `${slot}: ${this.t("free")}`;
      const style = owner && !overlap ? `background:${deviceColor(owner.index)}` : "";
      cells.push(html`<div
        class="cell ${owner ? "used" : ""} ${overlap ? "overlap" : ""} ${owner?.start === slot ? "start" : ""}"
        style=${style}
        title=${title}
        @click=${() =>
          owner &&
          this.dispatchEvent(new CustomEvent("device-click", { detail: { index: owner.index } }))}
      ></div>`);
    }
    return html`
      <div class="map" role="img" aria-label=${this.t("channelMap")}>${cells}</div>
      <div class="legend">${this.t("channelsUsed", { used: occupancy.size })}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .map {
      display: grid;
      grid-template-columns: repeat(32, minmax(0, 1fr));
      gap: 1px;
    }
    .cell {
      height: 10px;
      border-radius: 2px;
      background: var(--card-background-color, #fff);
      box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    .cell.used {
      cursor: pointer;
      box-shadow: none;
    }
    .cell.start {
      box-shadow: inset 2px 0 0 rgba(0, 0, 0, 0.45);
    }
    .cell.overlap {
      background: var(--error-color, #db4437);
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 2px,
        rgba(255, 255, 255, 0.5) 2px 4px
      );
    }
    .legend {
      margin-top: 4px;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    @media (max-width: 600px) {
      .map {
        grid-template-columns: repeat(16, minmax(0, 1fr));
      }
    }
  `;
}

safeDefine("artnetui-channel-map", AluChannelMap);

declare global {
  interface HTMLElementTagNameMap {
    "artnetui-channel-map": AluChannelMap;
  }
}
