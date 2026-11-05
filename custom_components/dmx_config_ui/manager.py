"""Shared business logic for the DMX configuration manager."""

from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.loader import IntegrationNotFound, async_get_integration

from .const import DMX_DOMAIN, DOMAIN, ISSUE_RESTART_REQUIRED
from .files import CONFIGURATION_FILE, read_text, write_text
from .manager_dmx import DmxManager

type DmxConfigUiConfigEntry = ConfigEntry[UiConfigManager]


class UiConfigManager:
    """Own common integration state and the DMX configuration manager."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, version: str) -> None:
        self.hass = hass
        self.entry = entry
        self.version = version
        self.dmx = DmxManager(hass, self)

    @property
    def configuration_path(self) -> Path:
        return Path(self.hass.config.path(CONFIGURATION_FILE))

    async def async_read(self, path: Path) -> str | None:
        return await self.hass.async_add_executor_job(read_text, path)

    async def async_write(self, path: Path, content: str) -> None:
        await self.hass.async_add_executor_job(write_text, path, content)

    async def _async_backend(self) -> dict[str, object]:
        try:
            integration = await async_get_integration(self.hass, DMX_DOMAIN)
        except IntegrationNotFound:
            return {"installed": False, "loaded": False, "version": None}
        return {
            "installed": True,
            "loaded": DMX_DOMAIN in self.hass.config.components,
            "version": str(integration.version) if integration.version else None,
        }

    def restart_pending(self) -> bool:
        issue = ir.async_get(self.hass).async_get_issue(DOMAIN, ISSUE_RESTART_REQUIRED)
        return issue is not None and issue.active

    async def async_status(self) -> dict[str, object]:
        return {
            "version": self.version,
            "restart_required": self.restart_pending(),
            "backends": {DMX_DOMAIN: await self._async_backend()},
            "dmx": await self.dmx.async_status(),
        }

    def create_restart_issue(self, include_file: str) -> None:
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            ISSUE_RESTART_REQUIRED,
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_RESTART_REQUIRED,
            translation_placeholders={"include_file": include_file},
        )


def async_get_manager(hass: HomeAssistant) -> UiConfigManager | None:
    """Return the manager of the loaded config entry, if any."""
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        return entry.runtime_data
    return None
