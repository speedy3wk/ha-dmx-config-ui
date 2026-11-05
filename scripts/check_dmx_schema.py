"""Check the generated `dmx:` YAML against DMX itself.

Usage: python scripts/check_dmx_schema.py <path to a Breina/ha-artnet-led checkout>

1. Every validation case without errors is rendered and validated with the
   integration's CONFIG_SCHEMA.
2. The channel count we compute for each bundled/test fixture mode must match
   the number of channels DMX's parser yields for that mode.
"""

from __future__ import annotations

import importlib
import json
from pathlib import Path
import sys
import types
from typing import Any

import yaml

REPO = Path(__file__).resolve().parent.parent


def _load_breina(breina: Path) -> tuple[Any, Any]:
    for missing in ("netifaces",):
        try:
            importlib.import_module(missing)
        except ImportError:
            stub = types.ModuleType(missing)
            stub.AF_INET = 2  # type: ignore[attr-defined]
            stub.gateways = dict  # type: ignore[attr-defined]
            stub.ifaddresses = lambda *_: {}  # type: ignore[attr-defined]
            stub.interfaces = list  # type: ignore[attr-defined]
            sys.modules[missing] = stub
    sys.path.insert(0, str(REPO))
    import custom_components

    custom_components.__path__.append(str(breina / "custom_components"))
    integration = importlib.import_module("custom_components.dmx")
    parser = importlib.import_module("custom_components.dmx.fixture.parser")
    return integration.CONFIG_SCHEMA, parser.parse


def main(breina: Path) -> int:
    schema, parse = _load_breina(breina)
    from custom_components.dmx_config_ui.files import render_dmx_yaml
    from custom_components.dmx_config_ui.fixtures import (
        BUNDLED_DIR,
        load_fixture_dir,
    )
    from custom_components.dmx_config_ui.model_dmx import normalize_config

    failures: list[str] = []

    def check_schema(name: str, config: dict[str, Any]) -> None:
        try:
            schema({"dmx": yaml.safe_load(render_dmx_yaml(config))})
        except Exception as err:
            failures.append(f"schema: {name}: {err}")
        else:
            print(f"ok   schema: {name}")

    cases = json.loads((REPO / "tests/fixtures/dmx_validation_cases.json").read_text())
    for case in cases:
        if not any(issue["severity"] == "error" for issue in case["expected"]):
            check_schema(case["name"], normalize_config(case["config"]))

    bundled, errors = load_fixture_dir(BUNDLED_DIR, "bundled")
    failures += [f"bundled fixture: {error}" for error in errors]
    test_fixtures, errors = load_fixture_dir(REPO / "tests/fixtures/ofl", "test")
    failures += [f"test fixture: {error}" for error in errors]
    for fixture, folder in [(f, BUNDLED_DIR) for f in bundled] + [
        (f, REPO / "tests/fixtures/ofl") for f in test_fixtures
    ]:
        model = parse(str(folder / fixture["file"]))
        for mode in fixture["modes"]:
            expected = len(model.select_mode(mode["key"]))
            if expected != mode["width"]:
                failures.append(
                    f"width: {fixture['file']} / {mode['key']}: ours {mode['width']}, "
                    f"ha-artnet-led {expected}"
                )
        print(f"ok   widths: {fixture['file']} ({len(fixture['modes'])} modes)")

    for failure in failures:
        print(f"FAIL {failure}")
    return 1 if failures else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.exit(main(Path(sys.argv[1]).resolve()))
