"""Search and download fixtures from the Open Fixture Library (open-fixture-library.org)."""

from __future__ import annotations

import json
import re
from typing import Any

import aiohttp

from .fixtures import FixtureError, summarize_fixture

OFL_BASE = "https://open-fixture-library.org"
OFL_SEARCH = f"{OFL_BASE}/api/v1/get-search-results"
KEY_PATTERN = re.compile(r"^[a-z0-9][a-z0-9-]*/[a-z0-9][a-z0-9-]*$")
TIMEOUT = aiohttp.ClientTimeout(total=20)
MAX_RESULTS = 50


class OflError(Exception):
    """Raised when the Open Fixture Library cannot be reached or returns garbage."""


async def async_search(session: aiohttp.ClientSession, query: str) -> list[dict[str, str]]:
    query = query.strip()
    if len(query) < 2:
        return []
    payload = {"searchQuery": query, "manufacturersQuery": [], "categoriesQuery": []}
    try:
        async with session.post(OFL_SEARCH, json=payload, timeout=TIMEOUT) as response:
            response.raise_for_status()
            data = await response.json(content_type=None)
    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
        raise OflError(f"search failed: {err}") from err
    if not isinstance(data, list):
        raise OflError("unexpected search response")
    results = []
    for item in data[:MAX_RESULTS]:
        if isinstance(item, dict) and isinstance(item.get("key"), str):
            manufacturer, _, fixture = item["key"].partition("/")
            results.append(
                {
                    "key": item["key"],
                    "name": str(item.get("name") or item["key"]),
                    "manufacturer": manufacturer,
                    "fixture": fixture,
                }
            )
    return results


async def async_download(session: aiohttp.ClientSession, key: str) -> tuple[str, dict[str, Any]]:
    """Download a fixture. Returns (json text to store, summary)."""
    if not KEY_PATTERN.match(key):
        raise OflError(f"invalid fixture key '{key}'")
    manufacturer, fixture_key = key.split("/")
    try:
        async with session.get(f"{OFL_BASE}/{key}.json", timeout=TIMEOUT) as response:
            response.raise_for_status()
            data = await response.json(content_type=None)
    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
        raise OflError(f"download failed: {err}") from err
    if not isinstance(data, dict):
        raise OflError("unexpected fixture response")
    # The OFL "Open Fixture Library JSON" export carries these keys; the raw file does not.
    data.setdefault("fixtureKey", fixture_key)
    data.setdefault("manufacturerKey", manufacturer)
    try:
        summary = summarize_fixture(data)
    except FixtureError as err:
        raise OflError(str(err)) from err
    return json.dumps(data, indent=2, ensure_ascii=False) + "\n", summary
