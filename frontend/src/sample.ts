import type { DmxConfig } from "./types_dmx";

export const exampleDmxConfig = (): DmxConfig => ({
  fixtures_folder: "fixtures",
  max_fps: 30,
  artnet: {
    universes: [
      {
        net: 0,
        subnet: 0,
        universe: 0,
        devices: [
          { name: "Living room dimmer", start_address: 1, fixture: "DeskCh", mode: "16bit" },
          { name: "Kitchen strip", start_address: 3, fixture: "RGBW", mode: "8bit", entity_id_prefix: "kitchen_strip" },
          {
            name: "Bar RGB",
            start_address: 7,
            fixture: "RGB",
            mode: "16bit",
            output_correction: { curve: "quadratic" }
          }
        ]
      }
    ]
  },
  sacn: { universes: [] }
});
