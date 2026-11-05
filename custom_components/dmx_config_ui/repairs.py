"""Repair flows for DMX Config UI."""

from __future__ import annotations

from typing import Any

from homeassistant import config as conf_util
from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult
import voluptuous as vol

from .const import ISSUE_DMX_INCLUDE_MISSING, ISSUE_RESTART_REQUIRED
from .manager import async_get_manager


class RestartRequiredFlow(RepairsFlow):
    """Check the configuration and restart Home Assistant."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        return await self.async_step_confirm()

    async def async_step_confirm(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        if user_input is None:
            return self.async_show_form(step_id="confirm", data_schema=vol.Schema({}))

        if error := await conf_util.async_check_ha_config_file(self.hass):
            return self.async_abort(
                reason="config_invalid", description_placeholders={"error": error}
            )

        self.hass.async_create_task(
            self.hass.services.async_call("homeassistant", "restart"), eager_start=False
        )
        return self.async_create_entry(data={})


class DmxIncludeMissingFlow(RepairsFlow):
    """Point the `dmx:` key of configuration.yaml to the generated file."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        return await self.async_step_confirm()

    async def async_step_confirm(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        manager = async_get_manager(self.hass)
        if manager is None:
            return self.async_abort(reason="not_loaded")
        if user_input is None:
            return self.async_show_form(step_id="confirm", data_schema=vol.Schema({}))
        await manager.dmx.async_fix_include()
        return self.async_create_entry(data={})


async def async_create_fix_flow(
    hass: HomeAssistant, issue_id: str, data: dict[str, Any] | None
) -> RepairsFlow:
    if issue_id == ISSUE_DMX_INCLUDE_MISSING:
        return DmxIncludeMissingFlow()
    if issue_id == ISSUE_RESTART_REQUIRED:
        return RestartRequiredFlow()
    raise ValueError(f"Unknown issue {issue_id}")
