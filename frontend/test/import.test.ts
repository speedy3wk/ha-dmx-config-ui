import { describe, expect, it } from "vitest";
import { ImportError, configFromJson, configFromYaml } from "../src/import";

const ENTRY = `
- platform: artnet_led
  host: 192.168.0.10
  max_fps: 25
  universes:
    0:
      send_partial_universe: true
      devices:
        - channel: 1
          name: lamp
          type: rgb
          channel_setup: rgbw
    3:
      devices:
        - channel: 10
          name: fixed
          type: fixed
          channel_setup: [255, "128"]
`;

describe("configFromYaml", () => {
  it("parses a list of platform entries", () => {
    const config = configFromYaml(ENTRY);
    expect(config.nodes).toHaveLength(1);
    const node = config.nodes[0];
    expect(node.host).toBe("192.168.0.10");
    expect(node.universes.map((u) => u.id)).toEqual([0, 3]);
    expect(node.universes[0].devices[0]).toEqual({
      channel: 1,
      name: "lamp",
      type: "rgb",
      channel_setup: "rgbw"
    });
    expect(node.universes[1].devices[0].channel_setup).toEqual([255, 128]);
  });

  it("parses light: blocks and ignores other platforms and HA tags", () => {
    const config = configFromYaml(`
homeassistant: !include_dir_named packages
light:
  - platform: template
    lights: {}
  - platform: artnet_led
    host: a
    universes: {1: {devices: []}}
light artnet_uiconfig: !include ha_artnet_led_uiconfig.yaml
light extra:
  platform: artnet_led
  host: b
  universes:
    2:
      devices: []
`);
    expect(config.nodes.map((n) => n.host)).toEqual(["a", "b"]);
    expect(config.nodes[1].universes[0].id).toBe(2);
  });

  it("accepts a single entry", () => {
    expect(configFromYaml("platform: artnet_led\nhost: x\nuniverses: {}").nodes[0].host).toBe("x");
  });

  it("rejects invalid or empty input", () => {
    expect(() => configFromYaml("foo: [")).toThrow(ImportError);
    expect(() => configFromYaml("sensor: []")).toThrow(ImportError);
  });
});

describe("configFromJson", () => {
  it("round-trips an exported config", () => {
    const config = { title: "", nodes: [{ host: "h", universes: [{ id: 0, devices: [] }] }] };
    expect(configFromJson(JSON.stringify(config))).toEqual(config);
  });

  it("rejects other JSON", () => {
    expect(() => configFromJson("[]")).toThrow(ImportError);
    expect(() => configFromJson("{")).toThrow(ImportError);
  });
});
