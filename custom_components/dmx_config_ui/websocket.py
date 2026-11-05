"""Admin-only websocket API used by the panel."""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
import voluptuous as vol

from .const import (
    WS_DEPLOY,
    WS_FIXTURE_UPLOAD,
    WS_FIXTURES,
    WS_GET,
    WS_IMPORT_EXISTING,
    WS_OFL_DOWNLOAD,
    WS_OFL_SEARCH,
    WS_PREVIEW,
    WS_SAVE,
    WS_STATUS,
)
from .manager import UiConfigManager, async_get_manager
from .model_common import ConfigFormatError

type _Handler = Callable[
    [HomeAssistant, websocket_api.ActiveConnection, dict[str, Any], UiConfigManager],
    Awaitable[None],
]


def _with_manager(
    func: _Handler,
) -> Callable[[HomeAssistant, websocket_api.ActiveConnection, dict[str, Any]], Awaitable[None]]:
    @wraps(func)
    async def wrapper(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
    ) -> None:
        manager = async_get_manager(hass)
        if manager is None:
            connection.send_error(msg["id"], "not_loaded", "Integration is not loaded")
            return
        try:
            await func(hass, connection, msg, manager)
        except ConfigFormatError as err:
            connection.send_error(msg["id"], websocket_api.ERR_INVALID_FORMAT, str(err))
        except HomeAssistantError as err:
            connection.send_error(msg["id"], websocket_api.ERR_HOME_ASSISTANT_ERROR, str(err))

    return wrapper


@websocket_api.websocket_command({vol.Required("type"): WS_GET})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_get(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_get_config())


@websocket_api.websocket_command({vol.Required("type"): WS_SAVE, vol.Required("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_save(hass, connection, msg, manager: UiConfigManager) -> None:
    config = await manager.dmx.async_save_config(msg["config"])
    connection.send_result(msg["id"], {"status": "ok", "config": config})


@websocket_api.websocket_command({vol.Required("type"): WS_PREVIEW, vol.Optional("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_preview(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_preview(msg.get("config")))


@websocket_api.websocket_command({vol.Required("type"): WS_DEPLOY, vol.Optional("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_deploy(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_deploy(msg.get("config")))


@websocket_api.websocket_command({vol.Required("type"): WS_STATUS})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_status(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.async_status())


@websocket_api.websocket_command({vol.Required("type"): WS_IMPORT_EXISTING})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_import_existing(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_import_existing())


@websocket_api.websocket_command({vol.Required("type"): WS_FIXTURES, vol.Optional("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_fixtures(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_fixtures(msg.get("config")))


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_FIXTURE_UPLOAD,
        vol.Required("file_name"): vol.All(str, vol.Length(min=1, max=200)),
        vol.Required("content"): vol.All(str, vol.Length(min=2, max=2_000_000)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_fixture_upload(hass, connection, msg, manager: UiConfigManager) -> None:
    result = await manager.dmx.async_upload_fixture(msg["file_name"], msg["content"])
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {vol.Required("type"): WS_OFL_SEARCH, vol.Required("query"): vol.All(str, vol.Length(max=100))}
)
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_ofl_search(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_ofl_search(msg["query"]))


@websocket_api.websocket_command(
    {vol.Required("type"): WS_OFL_DOWNLOAD, vol.Required("key"): vol.All(str, vol.Length(max=200))}
)
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_ofl_download(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.dmx.async_ofl_download(msg["key"]))


@callback
def async_register(hass: HomeAssistant) -> None:
    for handler in (
        ws_get,
        ws_save,
        ws_preview,
        ws_deploy,
        ws_status,
        ws_import_existing,
        ws_fixtures,
        ws_fixture_upload,
        ws_ofl_search,
        ws_ofl_download,
    ):
        websocket_api.async_register_command(hass, handler)
