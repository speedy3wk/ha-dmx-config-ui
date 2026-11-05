"""Tests for the `dmx` target: websocket API, deploy, OFL and repairs."""

from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import AsyncMock, patch

from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.setup import async_setup_component
import pytest
import yaml

from custom_components.dmx_config_ui.const import (
    CONFIGURATION_BACKUP,
    DMX_INCLUDE_FILE,
    DOMAIN,
    ISSUE_DMX_INCLUDE_MISSING,
    ISSUE_RESTART_REQUIRED,
)
from custom_components.dmx_config_ui.ofl import OFL_BASE, OFL_SEARCH

CHECK = "homeassistant.config.async_check_ha_config_file"
OFL_FIXTURES = Path(__file__).parent / "fixtures" / "ofl"
INCLUDE_LINE = f"dmx: !include {DMX_INCLUDE_FILE}\n"

DMX_CONFIG = {
    "artnet": {
        "universes": [
            {
                "universe": 1,
                "devices": [
                    {"name": "Strip", "start_address": 1, "fixture": "RGB", "mode": "16bit"},
                    {"name": "Spot", "start_address": 7, "fixture": "DeskCh"},
                ],
            }
        ]
    }
}


@pytest.fixture
def config_dir(hass: HomeAssistant, tmp_path: Path) -> Path:
    hass.config.config_dir = str(tmp_path)
    return tmp_path


@pytest.fixture
async def ws(hass: HomeAssistant, hass_ws_client):
    client = await hass_ws_client(hass)

    async def send(**msg) -> dict:
        await client.send_json_auto_id(msg)
        return await client.receive_json()

    return send


def _issue(hass: HomeAssistant, issue_id: str):
    return ir.async_get(hass).async_get_issue(DOMAIN, issue_id)


async def _run_fix(hass: HomeAssistant, hass_client, issue_id: str) -> dict:
    assert await async_setup_component(hass, "repairs", {})
    client = await hass_client()
    response = await client.post(
        "/api/repairs/issues/fix", json={"handler": DOMAIN, "issue_id": issue_id}
    )
    data = await response.json()
    assert data["step_id"] == "confirm"
    response = await client.post(f"/api/repairs/issues/fix/{data['flow_id']}", json={})
    return await response.json()


@pytest.mark.parametrize(
    "msg",
    [
        {"type": f"{DOMAIN}/fixtures"},
        {"type": f"{DOMAIN}/fixtures/upload", "file_name": "a.json", "content": "{}"},
        {"type": f"{DOMAIN}/ofl/search", "query": "rgb"},
        {"type": f"{DOMAIN}/ofl/download", "key": "a/b"},
        {"type": f"{DOMAIN}/get"},
    ],
)
async def test_admin_required(
    hass: HomeAssistant, setup_integration, ws, hass_admin_user, msg
) -> None:
    hass_admin_user.groups = []
    response = await ws(**msg)
    assert response["error"]["code"] == "unauthorized"


async def test_get_save_roundtrip(hass: HomeAssistant, setup_integration, ws) -> None:
    empty = (await ws(type=f"{DOMAIN}/get"))["result"]
    assert empty["fixtures_folder"] == "fixtures"
    assert empty["artnet"]["universes"] == []

    saved = (await ws(type=f"{DOMAIN}/save", config=DMX_CONFIG))["result"]
    assert saved["status"] == "ok"
    assert (await ws(type=f"{DOMAIN}/get"))["result"] == saved["config"]


async def test_status(hass: HomeAssistant, config_dir, setup_integration, ws) -> None:
    status = (await ws(type=f"{DOMAIN}/status"))["result"]
    assert status["backends"] == {
        "dmx": {"installed": False, "loaded": False, "version": None},
    }
    assert status["dmx"] == {
        "path": DMX_INCLUDE_FILE,
        "file_exists": False,
        "included": False,
        "foreign_block": False,
    }
    (config_dir / "configuration.yaml").write_text("dmx:\n  artnet: {}\n")
    status = (await ws(type=f"{DOMAIN}/status"))["result"]
    assert status["dmx"]["foreign_block"] is True


async def test_fixtures_upload(hass: HomeAssistant, config_dir, setup_integration, ws) -> None:
    listing = (await ws(type=f"{DOMAIN}/fixtures"))["result"]
    assert listing["folder"] == "fixtures"
    assert listing["folder_exists"] is False
    assert listing["errors"] == []
    assert len(listing["fixtures"]) == 7
    assert not any(f["installed"] for f in listing["fixtures"])

    content = (OFL_FIXTURES / "lightmaxx-dj-scan-led.json").read_text()
    uploaded = (
        await ws(type=f"{DOMAIN}/fixtures/upload", file_name="../My Scanner.json", content=content)
    )["result"]
    assert uploaded["file"] == "my-scanner.json"
    assert uploaded["installed"] is True
    assert (config_dir / "fixtures" / "my-scanner.json").read_text() == content

    listing = (await ws(type=f"{DOMAIN}/fixtures"))["result"]
    assert listing["folder_exists"] is True
    scanner = next(f for f in listing["fixtures"] if f["key"] == "DJ Scan LED")
    assert scanner["installed"] is True and scanner["source"] == "folder"


async def test_upload_rejects_invalid(
    hass: HomeAssistant, config_dir, setup_integration, ws
) -> None:
    response = await ws(type=f"{DOMAIN}/fixtures/upload", file_name="x.json", content="{nope")
    assert response["error"]["code"] == "home_assistant_error"
    assert not (config_dir / "fixtures").exists()


async def test_unsafe_fixtures_folder(
    hass: HomeAssistant, config_dir, setup_integration, ws
) -> None:
    await ws(type=f"{DOMAIN}/save", config={"fixtures_folder": "/etc"})
    content = (OFL_FIXTURES / "lightmaxx-dj-scan-led.json").read_text()
    response = await ws(type=f"{DOMAIN}/fixtures/upload", file_name="x.json", content=content)
    assert response["error"]["code"] == "home_assistant_error"

    listing = (await ws(type=f"{DOMAIN}/fixtures"))["result"]
    assert listing["folder_exists"] is False
    assert len(listing["fixtures"]) == 7
    assert listing["errors"][0]["file"] == "/etc"

    result = (await ws(type=f"{DOMAIN}/deploy"))["result"]
    assert result["status"] == "invalid"
    assert result["errors"][0]["code"] == "folder"


async def test_preview(hass: HomeAssistant, config_dir, setup_integration, ws) -> None:
    config = json.loads(json.dumps(DMX_CONFIG))
    config["artnet"]["universes"][0]["devices"][1]["start_address"] = 6
    result = (await ws(type=f"{DOMAIN}/preview", config=config))["result"]
    assert result["path"] == DMX_INCLUDE_FILE
    assert result["changed"] is True and result["current"] is None
    assert yaml.safe_load(result["yaml"])["artnet"]["universes"][0][1]["devices"][0] == {
        "Strip": {"start_address": 1, "fixture": "RGB", "mode": "16bit"}
    }
    assert [(e["code"], e["severity"]) for e in result["errors"]] == [("overlap", "error")]


async def test_deploy_flow(
    hass: HomeAssistant, config_dir, setup_integration, ws, hass_client
) -> None:
    configuration = config_dir / "configuration.yaml"
    configuration.write_text("default_config:\ndmx:\n  artnet:\n    universes: []\n")

    with patch(CHECK, AsyncMock(return_value=None)) as check:
        result = (await ws(type=f"{DOMAIN}/deploy", config=DMX_CONFIG))["result"]
    assert result == {
        "status": "written",
        "path": DMX_INCLUDE_FILE,
        "included": False,
        "check_error": None,
        "restart_required": False,
        "installed_fixtures": ["generic-desk-channel.json", "generic-rgb-fader.json"],
        "warnings": [],
    }
    check.assert_not_called()
    written = yaml.safe_load((config_dir / DMX_INCLUDE_FILE).read_text())
    assert written["fixtures"] == {"folder": "fixtures"}
    assert sorted(p.name for p in (config_dir / "fixtures").iterdir()) == [
        "generic-desk-channel.json",
        "generic-rgb-fader.json",
    ]
    issue = _issue(hass, ISSUE_DMX_INCLUDE_MISSING)
    assert issue.translation_placeholders["backup_file"] == CONFIGURATION_BACKUP
    fix = await _run_fix(hass, hass_client, ISSUE_DMX_INCLUDE_MISSING)
    assert fix["type"] == "create_entry"
    assert configuration.read_text() == "default_config:\n" + INCLUDE_LINE
    assert (config_dir / CONFIGURATION_BACKUP).read_text().startswith("default_config:\ndmx:\n")
    assert _issue(hass, ISSUE_DMX_INCLUDE_MISSING) is None
    restart = _issue(hass, ISSUE_RESTART_REQUIRED)
    assert restart.translation_placeholders["include_file"] == DMX_INCLUDE_FILE

    with patch(CHECK, AsyncMock(return_value=None)) as check:
        again = (await ws(type=f"{DOMAIN}/deploy"))["result"]
    check.assert_called_once()
    assert again["status"] == "unchanged"
    assert again["included"] is True
    assert again["installed_fixtures"] == []


async def test_deploy_invalid_and_warnings(
    hass: HomeAssistant, config_dir, setup_integration, ws
) -> None:
    (config_dir / "configuration.yaml").write_text(INCLUDE_LINE)
    bad = {"artnet": {"universes": [{"universe": 1, "devices": [
        {"name": "a", "start_address": 1, "fixture": "RGB", "mode": "16 bit"},
    ]}]}}  # fmt: skip
    result = (await ws(type=f"{DOMAIN}/deploy", config=bad))["result"]
    assert result["status"] == "invalid"
    assert not (config_dir / DMX_INCLUDE_FILE).exists()

    unknown = {"artnet": {"universes": [{"universe": 1, "devices": [
        {"name": "a", "start_address": 1, "fixture": "Mystery"},
    ]}]}}  # fmt: skip
    with patch(CHECK, AsyncMock(return_value=None)):
        result = (await ws(type=f"{DOMAIN}/deploy", config=unknown))["result"]
    assert result["status"] == "written"
    assert result["restart_required"] is True
    assert [w["code"] for w in result["warnings"]] == ["fixture_unknown"]


async def test_import_existing(hass: HomeAssistant, config_dir, setup_integration, ws) -> None:
    (config_dir / "configuration.yaml").write_text("dmx: !include old_dmx.yaml\n")
    (config_dir / "old_dmx.yaml").write_text(
        "fixtures:\n  folder: my_fixtures\n"
        "sacn:\n  universes:\n    - 3:\n        devices:\n"
        "          - Bar:\n              start_address: 5\n              fixture: RGBW\n"
    )
    result = (await ws(type=f"{DOMAIN}/import_existing"))["result"]
    assert result["fixtures_folder"] == "my_fixtures"
    assert result["sacn"]["universes"] == [
        {
            "universe": 3,
            "unicast_addresses": [],
            "devices": [{"name": "Bar", "start_address": 5, "fixture": "RGBW"}],
        }
    ]


async def test_ofl_search(
    hass: HomeAssistant, config_dir, setup_integration, ws, aioclient_mock
) -> None:
    aioclient_mock.post(
        OFL_SEARCH,
        json=[
            {"key": "cameo/hydrabeam-300-rgbw", "name": "cameo Hydrabeam 300 RGBW"},
            {"nope": 1},
        ],
    )
    result = (await ws(type=f"{DOMAIN}/ofl/search", query="hydra"))["result"]
    assert result == [
        {
            "key": "cameo/hydrabeam-300-rgbw",
            "name": "cameo Hydrabeam 300 RGBW",
            "manufacturer": "cameo",
            "fixture": "hydrabeam-300-rgbw",
        }
    ]
    assert aioclient_mock.mock_calls[0][2]["searchQuery"] == "hydra"
    assert (await ws(type=f"{DOMAIN}/ofl/search", query="h"))["result"] == []


async def test_ofl_search_error(
    hass: HomeAssistant, config_dir, setup_integration, ws, aioclient_mock
) -> None:
    aioclient_mock.post(OFL_SEARCH, status=500)
    response = await ws(type=f"{DOMAIN}/ofl/search", query="hydra")
    assert response["error"]["code"] == "home_assistant_error"


async def test_ofl_download(
    hass: HomeAssistant, config_dir, setup_integration, ws, aioclient_mock
) -> None:
    raw = json.loads((OFL_FIXTURES / "cameo-hydrabeam-300-rgbw.json").read_text())
    raw.pop("fixtureKey", None)
    raw.pop("manufacturerKey", None)
    aioclient_mock.get(f"{OFL_BASE}/cameo/hydrabeam-300-rgbw.json", json=raw)
    result = (await ws(type=f"{DOMAIN}/ofl/download", key="cameo/hydrabeam-300-rgbw"))["result"]
    assert result["file"] == "cameo-hydrabeam-300-rgbw.json"
    assert result["key"] == "CLHB300RGBW"
    assert "hydrabeam-300-rgbw" in result["aliases"]
    stored = json.loads((config_dir / "fixtures" / "cameo-hydrabeam-300-rgbw.json").read_text())
    assert stored["fixtureKey"] == "hydrabeam-300-rgbw"
    assert stored["manufacturerKey"] == "cameo"

    response = await ws(type=f"{DOMAIN}/ofl/download", key="../etc/passwd")
    assert response["error"]["code"] == "home_assistant_error"
