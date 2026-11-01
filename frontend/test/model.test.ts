import { describe, expect, it } from "vitest";
import {
  channelOccupancy,
  cleanDeviceForType,
  deviceRange,
  deviceWidth,
  nextFreeChannel,
  tokensToSetup,
  uniqueName
} from "../src/model";
import type { UniverseConfig } from "../src/types";

describe("deviceWidth", () => {
  it.each([
    [{ type: "dimmer", channel_size: "16bit" }, 2],
    [{ type: "binary", channel_setup: "ddd" }, 1],
    [{ type: "rgb" }, 3],
    [{ type: "rgb", channel_setup: "rgbw", channel_size: "16bit" }, 8],
    [{ type: "rgbww" }, 5],
    [{ type: "color_temp" }, 2],
    [{ type: "fixed" }, 1],
    [{ type: "fixed", channel_setup: [1, 2, 3] }, 3],
    [{ type: "xy", channel_size: "32bit" }, 12],
    [{}, 1]
  ])("%j -> %i", (device, width) => {
    expect(deviceWidth(device as never)).toBe(width);
  });

  it("computes the occupied range", () => {
    expect(deviceRange({ channel: 10, name: "a", type: "rgbw" })).toEqual([10, 13]);
  });
});

const universe = (devices: UniverseConfig["devices"]): UniverseConfig => ({ id: 0, devices });

describe("nextFreeChannel", () => {
  it("finds gaps and the end", () => {
    const u = universe([
      { channel: 1, name: "a", type: "rgb" },
      { channel: 6, name: "b", type: "rgb" }
    ]);
    expect(nextFreeChannel(u, 2)).toBe(4);
    expect(nextFreeChannel(u, 3)).toBe(9);
    expect(nextFreeChannel(universe([]), 3)).toBe(1);
  });

  it("can ignore the edited device", () => {
    const u = universe([{ channel: 1, name: "a", type: "rgb" }]);
    expect(nextFreeChannel(u, 3, 0)).toBe(1);
  });
});

describe("channelOccupancy", () => {
  it("marks overlaps", () => {
    const map = channelOccupancy(
      universe([
        { channel: 1, name: "a", type: "rgb" },
        { channel: 3, name: "b", type: "dimmer" }
      ])
    );
    expect(map.size).toBe(3);
    expect(map.get(3)?.map((o) => o.name)).toEqual(["a", "b"]);
  });
});

describe("helpers", () => {
  it("uniqueName avoids slug collisions", () => {
    expect(uniqueName("Lamp", ["lamp"])).toBe("Lamp_2");
    expect(uniqueName("lamp_2", ["lamp", "lamp_2"])).toBe("lamp_3");
    expect(uniqueName("new", ["old"])).toBe("new");
  });

  it("tokensToSetup keeps letters compact", () => {
    expect(tokensToSetup(["r", "g", "b"])).toBe("rgb");
    expect(tokensToSetup(["r", 255])).toEqual(["r", 255]);
    expect(tokensToSetup([])).toBeUndefined();
  });

  it("cleanDeviceForType drops incompatible fields", () => {
    expect(
      cleanDeviceForType({
        channel: 1,
        name: "a",
        type: "rgb",
        min_temp: "2700K",
        channel_setup: "ch",
        byte_order: "little"
      })
    ).toEqual({ channel: 1, name: "a", type: "rgb" });
    expect(
      cleanDeviceForType({ channel: 1, name: "a", type: "rgbww", channel_setup: "rgbch", channel_size: "16bit", byte_order: "little" })
    ).toEqual({ channel: 1, name: "a", type: "rgbww", channel_setup: "rgbch", channel_size: "16bit", byte_order: "little" });
  });
});
