import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  dmxDeviceWidth,
  isSafeFolder,
  nextFreeAddress,
  normalizeDmxConfig,
  slugify
} from "../src/model_dmx";
import type { FixtureSummary } from "../src/types_dmx";
import { validateDmxConfig } from "../src/validation_dmx";

interface Case {
  name: string;
  config: unknown;
  fixtures: FixtureSummary[];
  expected: Array<{ path: Array<string | number>; code: string; severity: string }>;
}

const cases: Case[] = JSON.parse(
  readFileSync(new URL("../../tests/fixtures/dmx_validation_cases.json", import.meta.url), "utf8")
);

describe("validateDmxConfig parity with model_dmx.py", () => {
  it.each(cases.map((c) => [c.name, c] as const))("%s", (_name, testCase) => {
    const issues = validateDmxConfig(normalizeDmxConfig(testCase.config), testCase.fixtures);
    expect(issues.map(({ path, code, severity }) => ({ path, code, severity }))).toEqual(
      testCase.expected
    );
  });
});

const fixtures = [
  {
    key: "RGB",
    name: "RGB Fader",
    aliases: ["RGB", "rgb-fader", "RGB Fader"],
    modes: [
      { key: "8bit", name: "8 bit", width: 3, exact: true },
      { key: "16bit", name: "16 bit", width: 6, exact: true }
    ]
  }
] satisfies FixtureSummary[];

describe("dmx helpers", () => {
  it("preserves upstream fields outside the editor model", () => {
    const config = normalizeDmxConfig({
      _extra: { futureTopLevel: true },
      artnet: {
        refresh_every: 1,
        futureProtocolOption: "keep",
        universes: [
          {
            universe: 0,
            futureUniverseOption: 2,
            devices: [
              {
                name: "Spot",
                start_address: 1,
                fixture: "RGB",
                futureDeviceOption: "keep"
              }
            ]
          }
        ]
      }
    });

    expect(config._extra).toEqual({ futureTopLevel: true });
    expect(config.artnet._extra).toEqual({ futureProtocolOption: "keep" });
    expect(config.artnet.universes[0]._extra).toEqual({ futureUniverseOption: 2 });
    expect(config.artnet.universes[0].devices[0]._extra).toEqual({ futureDeviceOption: "keep" });
  });

  it("resolves widths by alias and mode key", () => {
    expect(dmxDeviceWidth({ fixture: "rgb-fader" }, fixtures)).toBe(3);
    expect(dmxDeviceWidth({ fixture: "RGB", mode: "16bit" }, fixtures)).toBe(6);
    expect(dmxDeviceWidth({ fixture: "RGB", mode: "16 bit" }, fixtures)).toBeUndefined();
    expect(dmxDeviceWidth({ fixture: "nope" }, fixtures)).toBeUndefined();
  });

  it("finds the next free address", () => {
    const universe = {
      universe: 1,
      devices: [
        { name: "a", start_address: 1, fixture: "RGB" },
        { name: "b", start_address: 7, fixture: "RGB", mode: "16bit" }
      ]
    };
    expect(nextFreeAddress(universe, fixtures, 3)).toBe(4);
    expect(nextFreeAddress(universe, fixtures, 4)).toBe(13);
    expect(nextFreeAddress(universe, fixtures, 3, 0)).toBe(1);
  });

  it("checks folders like the backend", () => {
    expect(isSafeFolder("fixtures")).toBe(true);
    expect(isSafeFolder("dmx/fixtures")).toBe(true);
    expect(isSafeFolder("../fixtures")).toBe(false);
    expect(isSafeFolder("/config/fixtures")).toBe(false);
    expect(isSafeFolder("C:\\fixtures")).toBe(false);
  });

  it("slugifies like Home Assistant", () => {
    expect(slugify("Küche Spot")).toBe("kuche_spot");
    expect(slugify("  Moving Head #2 ")).toBe("moving_head_2");
  });
});
