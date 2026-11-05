"""Tests for the Open Fixture Library summaries."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from custom_components.dmx_config_ui.fixtures import (
    BUNDLED_DIR,
    FixtureError,
    find_fixture,
    find_mode,
    load_fixture_dir,
    merge_fixtures,
    parse_fixture_text,
    safe_file_name,
    summarize_fixture,
)

OFL = Path(__file__).parent / "fixtures" / "ofl"


def _summary(name: str) -> dict:
    return summarize_fixture(json.loads((OFL / name).read_text()), file=name)


def _modes(summary: dict) -> dict[str, int]:
    return {mode["key"]: mode["width"] for mode in summary["modes"]}


def test_bundled_generics() -> None:
    fixtures, errors = load_fixture_dir(BUNDLED_DIR, "bundled")
    assert errors == []
    assert {f["key"] for f in fixtures} == {
        "RGB",
        "DRGB",
        "RGBW",
        "RGBWW",
        "DeskCh",
        "CW/WW Fader",
        "Color Temperature Fader",
    }
    rgbww = find_fixture(fixtures, "RGBWW")
    assert _modes(rgbww) == {"8bit": 5, "16bit": 10, "24bit": 15}
    assert [m["name"] for m in rgbww["modes"]] == ["8 bit", "16 Bit", "24 Bit"]
    assert find_fixture(fixtures, "rgbww-fader") is rgbww
    assert find_fixture(fixtures, "nope") is None


def test_moving_head_entities() -> None:
    summary = _summary("lightmaxx-dj-scan-led.json")
    (mode,) = summary["modes"]
    assert mode["key"] == "Normal"
    assert mode["width"] == 7 and mode["exact"]
    assert mode["entities"] == {"light": 1, "number": 3, "select": 4}
    assert {c["name"] for c in mode["channels"]} >= {"Pan", "Tilt"}


def test_fine_channels_and_matrix() -> None:
    hydrabeam = _summary("cameo-hydrabeam-300-rgbw.json")
    assert _modes(hydrabeam) == {"6ch": 6, "10ch": 10, "16ch": 16, "26ch": 26, "42ch": 42}
    assert hydrabeam["aliases"] == ["CLHB300RGBW", "Hydrabeam 300 RGBW"]
    assert find_mode(hydrabeam, "16ch")["entities"]["light"] == 4

    flare = _summary("tmb-solaris-flare.json")
    widths = _modes(flare)
    assert widths["RGB8bit"] == 3
    assert widths["RGB16bit"] == 6
    assert all(mode["exact"] for mode in flare["modes"])
    pixel_mode = next(m for m in flare["modes"] if m["name"] == "Advanced RGB Strobe 12-Pixel")
    assert pixel_mode["width"] == 43
    assert pixel_mode["entities"]["light"] == 13
    assert any(c["kind"] == "fine" for c in find_mode(flare, "RGB16bit")["channels"])


def test_find_mode_uses_short_name() -> None:
    fixture = find_fixture(load_fixture_dir(BUNDLED_DIR, "bundled")[0], "RGB")
    assert find_mode(fixture, None)["key"] == "8bit"
    assert find_mode(fixture, "16bit")["width"] == 6
    assert find_mode(fixture, "16 bit") is None


def test_merge_prefers_installed() -> None:
    bundled, _ = load_fixture_dir(BUNDLED_DIR, "bundled")
    installed = [{**find_fixture(bundled, "RGB"), "source": "folder", "file": "my-rgb.json"}]
    merged = merge_fixtures(installed, bundled)
    assert len(merged) == len(bundled)
    rgb = find_fixture(merged, "RGB")
    assert rgb["installed"] is True and rgb["file"] == "my-rgb.json"
    assert find_fixture(merged, "RGBW")["installed"] is False
    assert [f["name"] for f in merged] == sorted((f["name"] for f in merged), key=str.lower)


def test_load_dir_collects_errors(tmp_path: Path) -> None:
    (tmp_path / "broken.json").write_text("{")
    (tmp_path / "nomodes.json").write_text('{"name": "x", "availableChannels": {}}')
    (tmp_path / "ok.json").write_text((OFL / "lightmaxx-dj-scan-led.json").read_text())
    (tmp_path / "readme.txt").write_text("ignored")
    fixtures, errors = load_fixture_dir(tmp_path, "folder")
    assert [f["file"] for f in fixtures] == ["ok.json"]
    assert sorted(e["file"] for e in errors) == ["broken.json", "nomodes.json"]
    assert load_fixture_dir(tmp_path / "missing", "folder") == ([], [])


@pytest.mark.parametrize(
    "text",
    ["", "[]", '{"name": 1}', '{"name": "x", "modes": []}', "x" * (2 * 1024 * 1024 + 1)],
)
def test_parse_rejects(text: str) -> None:
    with pytest.raises(FixtureError):
        parse_fixture_text(text)


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("cameo/hydrabeam-300-rgbw", "cameo-hydrabeam-300-rgbw.json"),
        ("../../etc/passwd", "etc-passwd.json"),
        ("My Fixture", "my-fixture.json"),
        ("...", "fixture.json"),
    ],
)
def test_safe_file_name(name: str, expected: str) -> None:
    assert safe_file_name(name) == expected
