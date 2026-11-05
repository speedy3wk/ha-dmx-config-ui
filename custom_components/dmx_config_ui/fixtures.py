"""Summaries of Open Fixture Library (OFL) fixture definitions.

DMX loads OFL JSON files from a folder. This module reads
the same files and derives what the editor needs: identifiers, modes, the DMX
footprint of every mode and a rough preview of the entities that will be created.
It intentionally has no Home Assistant imports so it can be unit tested.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from itertools import product
import json
from pathlib import Path
import re
from typing import Any

PIXEL_KEY = "$pixelKey"
LIGHT_CAPABILITIES = ("Intensity", "ColorIntensity", "ColorTemperature")
MAX_FIXTURE_BYTES = 2_000_000
BUNDLED_DIR = Path(__file__).parent / "fixtures"
_FILE_SAFE = re.compile(r"[^a-z0-9._-]+")


class FixtureError(ValueError):
    """Raised when a file is not a usable OFL fixture."""


def _capabilities(channel: Mapping[str, Any]) -> list[Mapping[str, Any]]:
    if isinstance(channel.get("capabilities"), list):
        return [c for c in channel["capabilities"] if isinstance(c, Mapping)]
    if isinstance(channel.get("capability"), Mapping):
        return [channel["capability"]]
    return []


def _pixel_names(matrix: Mapping[str, Any] | None) -> list[str]:
    if not matrix:
        return []
    keys = matrix.get("pixelKeys")
    if isinstance(keys, list):
        return [
            str(key)
            for plane in keys
            if isinstance(plane, list)
            for row in plane
            if isinstance(row, list)
            for key in row
            if key is not None
        ]
    count = matrix.get("pixelCount")
    if isinstance(count, list) and len(count) == 3:
        x_size, y_size, z_size = (max(1, int(v)) for v in count)
        return [
            f"({x + 1}, {y + 1}, {z + 1})"
            for z, y, x in product(range(z_size), range(y_size), range(x_size))
        ]
    return []


def _repeat_names(repeat_for: Any, matrix: Mapping[str, Any] | None) -> tuple[list[str], bool]:
    """Return the pixel/group names of a matrix insert and whether this is exact."""
    if isinstance(repeat_for, list):
        return [str(name) for name in repeat_for], True
    if repeat_for == "eachPixelGroup":
        groups = (matrix or {}).get("pixelGroups") or {}
        return sorted(str(name) for name in groups), True
    if isinstance(repeat_for, str) and repeat_for.startswith("eachPixel"):
        return sorted(_pixel_names(matrix)) if repeat_for == "eachPixelABC" else _pixel_names(
            matrix
        ), True
    return [], False


class _Resolver:
    """Resolve mode channel references to channel definitions."""

    def __init__(self, data: Mapping[str, Any], matrix: Mapping[str, Any] | None) -> None:
        self.available: Mapping[str, Any] = data.get("availableChannels") or {}
        self.templates: Mapping[str, Any] = data.get("templateChannels") or {}
        self.fine: dict[str, str] = {}
        self.switching: dict[str, str] = {}
        self.expanded: dict[str, tuple[str, str]] = {}
        pixels = _pixel_names(matrix) + [str(g) for g in (matrix or {}).get("pixelGroups") or {}]
        for template, channel in self.templates.items():
            aliases = (
                channel.get("fineChannelAliases") or [] if isinstance(channel, Mapping) else []
            )
            for pixel in pixels:
                self.expanded[template.replace(PIXEL_KEY, pixel)] = (template, pixel)
                for alias in aliases:
                    self.expanded[str(alias).replace(PIXEL_KEY, pixel)] = (str(alias), pixel)
        for source in (self.available, self.templates):
            for name, channel in source.items():
                if not isinstance(channel, Mapping):
                    continue
                for alias in channel.get("fineChannelAliases") or []:
                    self.fine[str(alias)] = name
                for capability in _capabilities(channel):
                    for alias in capability.get("switchChannels") or {}:
                        self.switching.setdefault(str(alias), name)

    def describe(self, lookup_name: str, pixel: str | None = None) -> dict[str, Any]:
        if pixel is None and lookup_name not in self.available and lookup_name in self.expanded:
            lookup_name, pixel = self.expanded[lookup_name]
        source = self.available if pixel is None else self.templates
        display = lookup_name if pixel is None else lookup_name.replace(PIXEL_KEY, pixel)

        if lookup_name in source and isinstance(source[lookup_name], Mapping):
            capabilities = _capabilities(source[lookup_name])
            types = [str(c.get("type")) for c in capabilities if c.get("type")]
            return {
                "name": display,
                "kind": "select" if len(capabilities) > 1 else "number",
                "type": types[0] if len(types) == 1 else None,
                "pixel": pixel,
            }
        if lookup_name in self.fine:
            return {"name": display, "kind": "fine", "type": None, "pixel": pixel}
        if lookup_name in self.switching:
            return {"name": display, "kind": "switching", "type": None, "pixel": pixel}
        return {"name": display, "kind": "unknown", "type": None, "pixel": pixel}


def _mode_channels(
    mode: Mapping[str, Any], resolver: _Resolver, matrix: Mapping[str, Any] | None
) -> tuple[list[dict[str, Any]], bool]:
    channels: list[dict[str, Any]] = []
    exact = True
    for entry in mode.get("channels") or []:
        if entry is None:
            channels.append({"name": None, "kind": "empty", "type": None, "pixel": None})
        elif isinstance(entry, str):
            channels.append(resolver.describe(entry))
        elif isinstance(entry, Mapping) and entry.get("insert") == "matrixChannels":
            names, known = _repeat_names(entry.get("repeatFor"), matrix)
            exact = exact and known
            templates = [t for t in entry.get("templateChannels") or [] if t is not None]
            if entry.get("channelOrder") == "perChannel":
                pairs = [(t, n) for t in templates for n in names]
            else:
                pairs = [(t, n) for n in names for t in templates]
            for template, pixel in pairs:
                channels.append(resolver.describe(str(template), pixel))
        else:
            exact = False
    return channels, exact


def _entity_preview(channels: Iterable[Mapping[str, Any]]) -> dict[str, int]:
    numbers = selects = 0
    lights: set[str | None] = set()
    for channel in channels:
        if channel["kind"] == "number":
            numbers += 1
            if channel["type"] in LIGHT_CAPABILITIES:
                lights.add(channel["pixel"])
        elif channel["kind"] in ("select", "switching"):
            selects += 1
    return {"light": len(lights), "number": numbers, "select": selects}


def summarize_fixture(
    data: Any, *, file: str | None = None, source: str = "folder"
) -> dict[str, Any]:
    """Return the editor's view of an OFL fixture. Raises FixtureError if unusable."""
    if not isinstance(data, Mapping):
        raise FixtureError("fixture must be a JSON object")
    name = data.get("name")
    modes = data.get("modes")
    if not isinstance(name, str) or not name.strip():
        raise FixtureError("fixture has no name")
    if not isinstance(modes, list) or not modes:
        raise FixtureError("fixture has no modes")
    if not isinstance(data.get("availableChannels") or {}, Mapping):
        raise FixtureError("availableChannels must be an object")

    matrix = data.get("matrix") if isinstance(data.get("matrix"), Mapping) else None
    resolver = _Resolver(data, matrix)
    summarized_modes = []
    for mode in modes:
        if not isinstance(mode, Mapping) or not isinstance(mode.get("name"), str):
            raise FixtureError("every mode needs a name")
        channels, exact = _mode_channels(mode, resolver, matrix)
        summarized_modes.append(
            {
                "name": mode["name"],
                # ha-artnet-led selects modes by shortName, falling back to the name.
                "key": str(mode.get("shortName") or mode["name"]),
                "short_name": mode.get("shortName"),
                "width": len(channels),
                "exact": exact and all(c["kind"] != "unknown" for c in channels),
                "channels": channels,
                "entities": _entity_preview(channels),
            }
        )

    short_name = data.get("shortName") or name
    fixture_key = data.get("fixtureKey")
    manufacturer_key = data.get("manufacturerKey")
    aliases = [str(v) for v in (short_name, fixture_key, name) if v]
    return {
        "key": str(short_name),
        "name": name,
        "short_name": data.get("shortName"),
        "fixture_key": fixture_key,
        "manufacturer_key": manufacturer_key,
        "aliases": list(dict.fromkeys(aliases)),
        "categories": [str(c) for c in data.get("categories") or []],
        "modes": summarized_modes,
        "file": file,
        "source": source,
    }


def parse_fixture_text(
    text: str, *, file: str | None = None, source: str = "folder"
) -> dict[str, Any]:
    if len(text.encode("utf-8")) > MAX_FIXTURE_BYTES:
        raise FixtureError("fixture file is too large")
    try:
        data = json.loads(text)
    except json.JSONDecodeError as err:
        raise FixtureError(f"invalid JSON: {err.msg}") from err
    return summarize_fixture(data, file=file, source=source)


def load_fixture_dir(
    folder: Path, source: str
) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    """Read every *.json file of a folder. Returns (fixtures, errors)."""
    fixtures: list[dict[str, Any]] = []
    errors: list[dict[str, str]] = []
    if not folder.is_dir():
        return fixtures, errors
    for path in sorted(folder.glob("*.json")):
        try:
            fixtures.append(
                parse_fixture_text(path.read_text(encoding="utf-8"), file=path.name, source=source)
            )
        except (OSError, UnicodeDecodeError, FixtureError) as err:
            errors.append({"file": path.name, "error": str(err)})
    return fixtures, errors


def merge_fixtures(
    installed: list[dict[str, Any]], bundled: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    """Installed fixtures win; bundled ones are offered if not yet installed."""
    seen = {alias for fixture in installed for alias in fixture["aliases"]}
    merged = [{**fixture, "installed": True} for fixture in installed]
    merged.extend(
        {**fixture, "installed": False}
        for fixture in bundled
        if not seen.intersection(fixture["aliases"])
    )
    return sorted(merged, key=lambda f: f["name"].lower())


def find_fixture(
    fixtures: Iterable[Mapping[str, Any]], identifier: str
) -> Mapping[str, Any] | None:
    """Match like ha-artnet-led: fixtureKey, shortName or name."""
    for fixture in fixtures:
        if identifier in fixture["aliases"]:
            return fixture
    return None


def find_mode(fixture: Mapping[str, Any], mode: str | None) -> Mapping[str, Any] | None:
    modes = fixture["modes"]
    if not mode:
        return modes[0] if modes else None
    for candidate in modes:
        if candidate.get("key", candidate["name"]) == mode:
            return candidate
    return None


def safe_file_name(name: str) -> str:
    stem = _FILE_SAFE.sub("-", name.lower()).strip("-.") or "fixture"
    return f"{stem}.json"
