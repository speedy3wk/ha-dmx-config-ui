import type { Path, ValidationIssue } from "./types";

const pathKey = (path: Path): string => JSON.stringify(path);

export class IssueIndex {
  private readonly exact = new Map<string, ValidationIssue[]>();
  private readonly nested = new Map<string, ValidationIssue[]>();

  constructor(public readonly issues: ValidationIssue[] = []) {
    for (const item of issues) {
      const key = pathKey(item.path);
      this.exact.set(key, [...(this.exact.get(key) ?? []), item]);
      for (let length = 0; length <= item.path.length; length++) {
        const prefix = pathKey(item.path.slice(0, length));
        this.nested.set(prefix, [...(this.nested.get(prefix) ?? []), item]);
      }
    }
  }

  public at(path: Path): ValidationIssue[] {
    return this.exact.get(pathKey(path)) ?? [];
  }

  public within(path: Path): ValidationIssue[] {
    return this.nested.get(pathKey(path)) ?? [];
  }
}
