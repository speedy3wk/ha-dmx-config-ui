import type { DmxConfig } from "./types_dmx";
import type { UiConfig } from "./types";

export const exampleConfig = (): UiConfig => ({
  title: "",
  nodes: [
    {
      host: "192.168.0.10",
      max_fps: 25,
      refresh_every: 0,
      node_type: "artnet-direct",
      universes: [
        {
          id: 0,
          send_partial_universe: true,
          output_correction: "quadratic",
          devices: [
            { channel: 1, name: "my_dimmer", type: "dimmer", transition: 1, channel_size: "16bit" },
            {
              channel: 3,
              name: "my_rgb_lamp",
              type: "rgb",
              transition: 1,
              channel_size: "16bit",
              output_correction: "quadratic",
              channel_setup: "rbgw"
            },
            {
              channel: 125,
              name: "my_color_temp_lamp",
              type: "color_temp",
              min_temp: "2500K",
              max_temp: "6500K",
              channel_setup: "ch"
            },
            { channel: 41, name: "my_rgbww_lamp", type: "rgbww", transition: 10 },
            { channel: 50, name: "sp4led_1_dimmer", type: "fixed", channel_setup: [255] }
          ]
        }
      ]
    }
  ]
});

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
