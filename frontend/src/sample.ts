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
