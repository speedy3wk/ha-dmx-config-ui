import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/import";
import { IssueIndex, validateConfig } from "../src/validation";

interface Case {
  name: string;
  config: unknown;
  expected: Array<{ path: Array<string | number>; code: string }>;
}

const cases: Case[] = JSON.parse(
  readFileSync(new URL("../../tests/fixtures/validation_cases.json", import.meta.url), "utf8")
);

describe("validateConfig parity with model.py", () => {
  it.each(cases.map((c) => [c.name, c] as const))("%s", (_name, testCase) => {
    const issues = validateConfig(normalizeConfig(testCase.config));
    expect(issues.map(({ path, code }) => ({ path, code }))).toEqual(testCase.expected);
  });
});

describe("IssueIndex", () => {
  it("indexes exact paths and ancestors", () => {
    const index = new IssueIndex([
      { path: ["nodes", 0, "universes", 0, "devices", 1, "name"], code: "required", message: "" }
    ]);
    expect(index.at(["nodes", 0, "universes", 0, "devices", 1, "name"])).toHaveLength(1);
    expect(index.within(["nodes", 0, "universes", 0])).toHaveLength(1);
    expect(index.within(["nodes", 1])).toHaveLength(0);
    expect(index.at(["nodes", 0])).toHaveLength(0);
  });
});
