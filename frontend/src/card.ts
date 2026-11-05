import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import "./panel";
import type { HomeAssistant } from "./types";
import { safeDefine } from "./utils/define";

const CARD_TYPE = "dmx-config-ui";

/** Dashboard card embedding the editor (`type: custom:dmx-config-ui`). */
export class DmxConfigUiCard extends LitElement {
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
      <dmx-config-ui-panel embedded .hass=${this.hass}></dmx-config-ui-panel>
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

safeDefine(CARD_TYPE, DmxConfigUiCard);

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
    name: "DMX Config UI",
    description: "Visual editor for ha-artnet-led Art-Net and DMX configurations (admin only)."
  });
}
