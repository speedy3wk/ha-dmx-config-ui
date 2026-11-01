import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import "./panel";
import type { HomeAssistant } from "./types";
import { safeDefine } from "./utils/define";

const CARD_TYPE = "ha-artnet-led-uiconfig";

/** Dashboard card embedding the editor (`type: custom:ha-artnet-led-uiconfig`). */
export class ArtnetLedUiConfigCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  public setConfig(_config: Record<string, unknown>) {
    // The card has no options; the configuration lives in the integration.
  }

  public getCardSize() {
    return 12;
  }

  public getGridOptions() {
    return { columns: "full", min_columns: 6 };
  }

  public static getStubConfig() {
    return {};
  }

  protected render() {
    return html`<ha-card>
      <ha-artnet-led-uiconfig-panel embedded .hass=${this.hass}></ha-artnet-led-uiconfig-panel>
    </ha-card>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
  `;
}

safeDefine(CARD_TYPE, ArtnetLedUiConfigCard);

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
}

const registry = window as unknown as { customCards?: CustomCardEntry[] };
registry.customCards = registry.customCards ?? [];
if (!registry.customCards.some((card) => card.type === CARD_TYPE)) {
  registry.customCards.push({
    type: CARD_TYPE,
    name: "Art-Net LED UI Config",
    description: "Visual editor for ha-artnet-led lights (admin only)."
  });
}
