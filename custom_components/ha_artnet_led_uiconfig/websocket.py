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
    WS_GET,
    WS_IMPORT_EXISTING,
    WS_PREVIEW,
    WS_SAVE,
    WS_STATUS,
)
from .manager import UiConfigManager, async_get_manager
from .model import ConfigFormatError

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
    connection.send_result(msg["id"], await manager.async_get_config())


@websocket_api.websocket_command({vol.Required("type"): WS_SAVE, vol.Required("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_save(hass, connection, msg, manager: UiConfigManager) -> None:
    config = await manager.async_save_config(msg["config"])
    connection.send_result(msg["id"], {"status": "ok", "config": config})


@websocket_api.websocket_command({vol.Required("type"): WS_PREVIEW, vol.Optional("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_preview(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.async_preview(msg.get("config")))


@websocket_api.websocket_command({vol.Required("type"): WS_DEPLOY, vol.Optional("config"): dict})
@websocket_api.require_admin
@websocket_api.async_response
@_with_manager
async def ws_deploy(hass, connection, msg, manager: UiConfigManager) -> None:
    connection.send_result(msg["id"], await manager.async_deploy(msg.get("config")))


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
    connection.send_result(msg["id"], await manager.async_import_existing())


@callback
def async_register(hass: HomeAssistant) -> None:
    for handler in (ws_get, ws_save, ws_preview, ws_deploy, ws_status, ws_import_existing):
        websocket_api.async_register_command(hass, handler)
