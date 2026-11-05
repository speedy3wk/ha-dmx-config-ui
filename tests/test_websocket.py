"""Tests for the websocket API, deploy and repairs."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import AsyncMock, patch

from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.setup import async_setup_component
import pytest
from pytest_homeassistant_custom_component.common import async_mock_service
import yaml

from custom_components.dmx_config_ui.const import (
    DOMAIN,
    ISSUE_INCLUDE_MISSING,
    ISSUE_RESTART_REQUIRED,
)

CHECK = "homeassistant.config.async_check_ha_config_file"


@pytest.fixture
def config_dir(hass: HomeAssistant, tmp_path: Path) -> Path:
    hass.config.config_dir = str(tmp_path)
    return tmp_path


async def _ws(hass_ws_client, hass: HomeAssistant, **msg) -> dict:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(msg)
    return await client.receive_json()


def _issue(hass: HomeAssistant, issue_id: str):
    return ir.async_get(hass).async_get_issue(DOMAIN, issue_id)


@pytest.mark.parametrize(
    "msg",
    [
        {"type": f"{DOMAIN}/get"},
        {"type": f"{DOMAIN}/save", "config": {"nodes": []}},
        {"type": f"{DOMAIN}/deploy"},
        {"type": f"{DOMAIN}/status"},
        {"type": f"{DOMAIN}/preview"},
        {"type": f"{DOMAIN}/import_existing"},
    ],
)
async def test_admin_required(
    hass: HomeAssistant, setup_integration, hass_ws_client, hass_admin_user, msg
) -> None:
    hass_admin_user.groups = []
    response = await _ws(hass_ws_client, hass, **msg)
    assert not response["success"]
    assert response["error"]["code"] == "unauthorized"


async def test_get_save_roundtrip(
    hass: HomeAssistant, setup_integration, hass_ws_client, sample_config
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/get"})
    assert (await client.receive_json())["result"] == {"title": "", "nodes": []}

    await client.send_json_auto_id({"type": f"{DOMAIN}/save", "config": sample_config})
    saved = await client.receive_json()
    assert saved["success"]

    await client.send_json_auto_id({"type": f"{DOMAIN}/get"})
    assert (await client.receive_json())["result"] == saved["result"]["config"]


async def test_save_rejects_bad_structure(
    hass: HomeAssistant, setup_integration, hass_ws_client
) -> None:
    response = await _ws(hass_ws_client, hass, type=f"{DOMAIN}/save", config={"nodes": "x"})
    assert not response["success"]
    assert response["error"]["code"] == "invalid_format"


async def test_not_loaded(hass: HomeAssistant, setup_integration, hass_ws_client) -> None:
    await hass.config_entries.async_unload(setup_integration.entry_id)
    response = await _ws(hass_ws_client, hass, type=f"{DOMAIN}/get")
    assert response["error"]["code"] == "not_loaded"


async def test_preview(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client, sample_config
) -> None:
    response = await _ws(hass_ws_client, hass, type=f"{DOMAIN}/preview", config=sample_config)
    result = response["result"]
    assert result["changed"] is True
    assert result["current"] is None
    assert result["errors"] == []
    assert "+- platform: artnet_led" in result["diff"]
    assert yaml.safe_load(result["yaml"])[0]["host"] == "192.168.0.10"


async def test_deploy_invalid(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client
) -> None:
    bad = {"nodes": [{"host": "", "universes": []}]}
    result = (await _ws(hass_ws_client, hass, type=f"{DOMAIN}/deploy", config=bad))["result"]
    assert result["status"] == "invalid"
    assert {e["code"] for e in result["errors"]} == {"required"}
    assert not (config_dir / "dmx_config_ui.yaml").exists()


async def test_deploy_without_include(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client, sample_config
) -> None:
    (config_dir / "configuration.yaml").write_text("default_config:\n")
    with patch(CHECK, AsyncMock(return_value=None)) as check:
        result = (await _ws(hass_ws_client, hass, type=f"{DOMAIN}/deploy", config=sample_config))[
            "result"
        ]
    assert result["status"] == "written"
    assert result["included"] is False
    assert result["restart_required"] is False
    check.assert_not_called()
    written = (config_dir / "dmx_config_ui.yaml").read_text()
    assert yaml.safe_load(written)[0]["platform"] == "artnet_led"
    assert _issue(hass, ISSUE_INCLUDE_MISSING) is not None
    assert _issue(hass, ISSUE_RESTART_REQUIRED) is None


async def test_deploy_with_include(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client, sample_config
) -> None:
    (config_dir / "configuration.yaml").write_text("light: !include dmx_config_ui.yaml\n")
    client = await hass_ws_client(hass)
    with patch(CHECK, AsyncMock(return_value=None)):
        await client.send_json_auto_id({"type": f"{DOMAIN}/deploy", "config": sample_config})
        first = (await client.receive_json())["result"]
        await client.send_json_auto_id({"type": f"{DOMAIN}/deploy"})
        second = (await client.receive_json())["result"]

    assert first == {
        "status": "written",
        "path": "dmx_config_ui.yaml",
        "included": True,
        "check_error": None,
        "restart_required": True,
    }
    assert second["status"] == "unchanged"
    assert second["restart_required"] is True
    assert _issue(hass, ISSUE_INCLUDE_MISSING) is None

    await client.send_json_auto_id({"type": f"{DOMAIN}/status"})
    status = (await client.receive_json())["result"]
    assert status["included"] and status["file_exists"] and status["restart_required"]
    assert status["artnet_led_installed"] is False
    assert status["version"] == "0.3.1"


async def test_deploy_reports_check_error(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client, sample_config
) -> None:
    (config_dir / "configuration.yaml").write_text("light: !include dmx_config_ui.yaml\n")
    with patch(CHECK, AsyncMock(return_value="Integration error: artnet_led")):
        result = (await _ws(hass_ws_client, hass, type=f"{DOMAIN}/deploy", config=sample_config))[
            "result"
        ]
    assert result["check_error"] == "Integration error: artnet_led"


async def test_import_existing(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client
) -> None:
    (config_dir / "configuration.yaml").write_text(
        "light:\n  - platform: template\n    lights: {}\nlight old: !include old.yaml\n"
    )
    (config_dir / "old.yaml").write_text(
        "- platform: artnet_led\n"
        "  host: 10.0.0.5\n"
        "  universes:\n"
        "    1:\n"
        "      devices:\n"
        "        - channel: 3\n"
        "          name: spot\n"
    )
    result = (await _ws(hass_ws_client, hass, type=f"{DOMAIN}/import_existing"))["result"]
    assert result == {
        "title": "",
        "nodes": [
            {
                "host": "10.0.0.5",
                "universes": [{"id": 1, "devices": [{"channel": 3, "name": "spot"}]}],
            }
        ],
    }


async def _run_fix(hass: HomeAssistant, hass_client, issue_id: str) -> dict:
    assert await async_setup_component(hass, "repairs", {})
    client = await hass_client()
    resp = await client.post(
        "/api/repairs/issues/fix", json={"handler": DOMAIN, "issue_id": issue_id}
    )
    data = await resp.json()
    assert data["step_id"] == "confirm"
    resp = await client.post(f"/api/repairs/issues/fix/{data['flow_id']}", json={})
    return await resp.json()


async def test_include_fix_flow(
    hass: HomeAssistant, config_dir, setup_integration, hass_ws_client, hass_client, sample_config
) -> None:
    configuration = config_dir / "configuration.yaml"
    configuration.write_text("light:\n  - platform: template\n")
    with patch(CHECK, AsyncMock(return_value=None)):
        await _ws(hass_ws_client, hass, type=f"{DOMAIN}/deploy", config=sample_config)
    assert _issue(hass, ISSUE_INCLUDE_MISSING)

    result = await _run_fix(hass, hass_client, ISSUE_INCLUDE_MISSING)
    assert result["type"] == "create_entry"
    assert configuration.read_text().endswith(
        "\n\nlight dmx_config_ui: !include dmx_config_ui.yaml\n"
    )
    assert _issue(hass, ISSUE_INCLUDE_MISSING) is None
    assert _issue(hass, ISSUE_RESTART_REQUIRED) is not None


async def test_restart_fix_flow(hass: HomeAssistant, setup_integration, hass_client) -> None:
    setup_integration.runtime_data.create_restart_issue()
    restart = async_mock_service(hass, "homeassistant", "restart")
    with patch(CHECK, AsyncMock(return_value=None)):
        result = await _run_fix(hass, hass_client, ISSUE_RESTART_REQUIRED)
    await hass.async_block_till_done()
    assert result["type"] == "create_entry"
    assert len(restart) == 1


async def test_restart_fix_flow_invalid_config(
    hass: HomeAssistant, setup_integration, hass_client
) -> None:
    setup_integration.runtime_data.create_restart_issue()
    restart = async_mock_service(hass, "homeassistant", "restart")
    with patch(CHECK, AsyncMock(return_value="broken")):
        result = await _run_fix(hass, hass_client, ISSUE_RESTART_REQUIRED)
    await hass.async_block_till_done()
    assert result["type"] == "abort"
    assert result["reason"] == "config_invalid"
    assert restart == []
