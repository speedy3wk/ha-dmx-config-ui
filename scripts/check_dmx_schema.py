"""Check the generated `dmx:` YAML against ha-artnet-led 1.x itself.

Usage: python scripts/check_dmx_schema.py <path to a Breina/ha-artnet-led checkout>

1. Every validation case without errors is rendered and validated with the
   integration's CONFIG_SCHEMA.
2. A migrated legacy configuration is validated the same way, and every
   fixture/mode it references must be selectable with ha-artnet-led's parser.
3. The channel count we compute for each bundled/test fixture mode must match
   the number of channels ha-artnet-led's parser yields for that mode.
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
LEGACY_EXAMPLE: dict[str, Any] = {
    "nodes": [
        {
            "host": "10.0.0.2",
            "max_fps": 60,
            "refresh_every": 120,
            "universes": [
                {
                    "id": 1,
                    "output_correction": "quadruple",
                    "devices": [
                        {
                            "channel": 1,
                            "name": "Küche Spot",
                            "type": "dimmer",
                            "channel_size": "16bit",
                        },
                        {"channel": 3, "name": "Strip", "type": "rgbww"},
                        {
                            "channel": 10,
                            "name": "Warm",
                            "type": "color_temp",
                            "channel_setup": "hc",
                        },
                        {"channel": 12, "name": "Cold", "type": "color_temp"},
                        {
                            "channel": 14,
                            "name": "Tunable",
                            "type": "color_temp",
                            "channel_setup": "dt",
                        },
                        {"channel": 30, "name": "Wash", "type": "rgb", "channel_setup": "drgb"},
                        {"channel": 40, "name": "Relay", "type": "binary"},
                        {"channel": 41, "name": "Bar", "type": "rgb", "channel_size": "16bit"},
                    ],
                }
            ],
        },
        {
            "host": "10.0.0.3",
            "node_type": "sacn",
            "universes": [{"id": 2, "devices": [{"channel": 1, "name": "S", "type": "rgbw"}]}],
        },
    ]
}


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
    from custom_components.ha_artnet_led_uiconfig.files import render_dmx_yaml
    from custom_components.ha_artnet_led_uiconfig.fixtures import (
        BUNDLED_DIR,
        find_fixture,
        load_fixture_dir,
    )
    from custom_components.ha_artnet_led_uiconfig.migrate import migrate
    from custom_components.ha_artnet_led_uiconfig.model import (
        normalize_config as normalize_legacy,
    )
    from custom_components.ha_artnet_led_uiconfig.model_dmx import (
        iter_universes,
        normalize_config,
    )

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
    migrated = migrate(normalize_legacy(LEGACY_EXAMPLE), bundled)["config"]
    check_schema("migrated legacy example", migrated)

    parsed: dict[str, Any] = {}
    for fixture in bundled:
        parsed[fixture["key"]] = parse(str(BUNDLED_DIR / fixture["file"]))
    for _, _, universe in iter_universes(migrated):
        for device in universe["devices"]:
            summary = find_fixture(bundled, device["fixture"])
            if summary is None:
                failures.append(f"migration: unknown fixture {device['fixture']}")
                continue
            model = parsed[summary["key"]]
            mode = device.get("mode") or next(iter(model.modes))
            try:
                model.select_mode(mode)
            except Exception as err:
                failures.append(f"migration: {device['name']}: {err}")
            else:
                print(f"ok   migration: {device['name']} -> {device['fixture']} / {mode}")

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
