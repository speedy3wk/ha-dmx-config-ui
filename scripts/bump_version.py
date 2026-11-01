"""Set the release version in all places that carry it.

Usage: python scripts/bump_version.py 0.2.1
"""

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
VERSION_RE = re.compile(r"^\d+\.\d+\.\d+(?:[-.][0-9A-Za-z.]+)?$")


def _replace(path: Path, pattern: str, replacement: str, count: int) -> None:
    text = path.read_text(encoding="utf-8")
    new, found = re.subn(pattern, replacement, text, count=count, flags=re.MULTILINE)
    if found != count:
        raise SystemExit(f"{path}: expected {count} version entries, found {found}")
    path.write_text(new, encoding="utf-8")


def _json_version(path: Path, version: str, count: int = 1) -> None:
    # Text substitution keeps the original formatting of the file.
    _replace(path, r'^(\s*"version": )"[^"]*"', rf'\g<1>"{version}"', count)


def main() -> int:
    if len(sys.argv) != 2 or not VERSION_RE.match(sys.argv[1]):
        print(__doc__)
        return 1
    version = sys.argv[1]
    _json_version(ROOT / "custom_components/ha_artnet_led_uiconfig/manifest.json", version)
    _json_version(ROOT / "frontend/package.json", version)
    _json_version(ROOT / "frontend/package-lock.json", version, count=2)
    _replace(ROOT / "pyproject.toml", r'^version = "[^"]*"', f'version = "{version}"', 1)
    print(f"Version set to {version}. Rebuild the frontend: cd frontend && npm run build")
    return 0


if __name__ == "__main__":
    sys.exit(main())
