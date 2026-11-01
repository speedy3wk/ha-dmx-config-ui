"""Config and options flow for Art-Net LED UI Config."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlowWithReload,
)
from homeassistant.core import callback
import voluptuous as vol

from .const import CONF_INCLUDE_FILE, DEFAULT_INCLUDE_FILE, DOMAIN
from .files import is_valid_include_file


class HaArtnetLedUiConfigFlow(ConfigFlow, domain=DOMAIN):
    """Single-instance config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is None:
            return self.async_show_form(step_id="user", data_schema=vol.Schema({}))
        return self.async_create_entry(title="Art-Net LED UI Config", data={})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlowHandler:
        return OptionsFlowHandler()


class OptionsFlowHandler(OptionsFlowWithReload):
    """Configure the target include file."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            include_file = user_input[CONF_INCLUDE_FILE].strip()
            if is_valid_include_file(include_file):
                return self.async_create_entry(data={CONF_INCLUDE_FILE: include_file})
            errors[CONF_INCLUDE_FILE] = "invalid_include_file"

        current = self.config_entry.options.get(CONF_INCLUDE_FILE, DEFAULT_INCLUDE_FILE)
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({vol.Required(CONF_INCLUDE_FILE, default=current): str}),
            errors=errors,
        )
