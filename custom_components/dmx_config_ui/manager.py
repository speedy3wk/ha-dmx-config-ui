"""Business logic: storage, preview, deploy and repair handling."""

from __future__ import annotations

from collections.abc import Mapping
import logging
from pathlib import Path
from typing import Any

from homeassistant import config as conf_util
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.storage import Store
from homeassistant.loader import IntegrationNotFound, async_get_integration

from .const import (
    ARTNET_DOMAIN,
    CONF_INCLUDE_FILE,
    DEFAULT_INCLUDE_FILE,
    DMX_DOMAIN,
    DOMAIN,
    INCLUDE_KEY,
    ISSUE_INCLUDE_MISSING,
    ISSUE_RESTART_REQUIRED,
    STORE_KEY,
    STORE_VERSION,
)
from .files import (
    CONFIGURATION_FILE,
    add_include,
    is_included,
    read_text,
    render_yaml,
    unified_diff,
    write_text,
)
from .manager_dmx import DmxManager
from .model import (
    PLATFORM,
    ConfigFormatError,
    from_platform_entries,
    normalize_config,
    validate_config,
)

_LOGGER = logging.getLogger(__name__)

type DmxConfigUiConfigEntry = ConfigEntry[UiConfigManager]


class ConfigStore(Store[dict[str, Any]]):
    """Store with migration from the 0.1.x format."""

    async def _async_migrate_func(
        self, old_major_version: int, old_minor_version: int, old_data: dict[str, Any]
    ) -> dict[str, Any]:
        if old_major_version < 2:
            try:
                return normalize_config(old_data)
            except ConfigFormatError:
                _LOGGER.warning("Stored configuration is invalid, starting with an empty one")
                return {"title": "", "nodes": []}
        return old_data


class UiConfigManager:
    """Owns the stored UI configuration and the generated include file."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, version: str) -> None:
        self.hass = hass
        self.entry = entry
        self.version = version
        self.store = ConfigStore(hass, STORE_VERSION, STORE_KEY)
        self.dmx = DmxManager(hass, self)

    @property
    def include_file(self) -> str:
        return self.entry.options.get(CONF_INCLUDE_FILE, DEFAULT_INCLUDE_FILE)

    @property
    def include_path(self) -> Path:
        return Path(self.hass.config.path(self.include_file))

    @property
    def configuration_path(self) -> Path:
        return Path(self.hass.config.path(CONFIGURATION_FILE))

    # ----------------------------------------------------------------- storage

    async def async_get_config(self) -> dict[str, Any]:
        data = await self.store.async_load()
        try:
            return normalize_config(data)
        except ConfigFormatError:
            _LOGGER.warning("Stored configuration is invalid, returning an empty one")
            return {"title": "", "nodes": []}

    async def async_save_config(self, raw: Any) -> dict[str, Any]:
        config = normalize_config(raw)
        await self.store.async_save(config)
        return config

    # ------------------------------------------------------------------- files

    async def async_read(self, path: Path) -> str | None:
        return await self.hass.async_add_executor_job(read_text, path)

    async def async_write(self, path: Path, content: str) -> None:
        await self.hass.async_add_executor_job(write_text, path, content)

    async def async_is_included(self) -> bool:
        return is_included(await self.async_read(self.configuration_path), self.include_file)

    async def _async_backend(self, domain: str) -> dict[str, Any]:
        try:
            integration = await async_get_integration(self.hass, domain)
        except IntegrationNotFound:
            return {"installed": False, "loaded": False, "version": None}
        return {
            "installed": True,
            "loaded": domain in self.hass.config.components,
            "version": str(integration.version) if integration.version else None,
        }

    def restart_pending(self) -> bool:
        issue = ir.async_get(self.hass).async_get_issue(DOMAIN, ISSUE_RESTART_REQUIRED)
        return issue is not None and issue.active

    # ----------------------------------------------------------------- actions

    async def async_preview(self, raw: Any | None = None) -> dict[str, Any]:
        config = normalize_config(raw) if raw is not None else await self.async_get_config()
        content = render_yaml(config)
        current = await self.async_read(self.include_path)
        return {
            "yaml": content,
            "current": current,
            "diff": unified_diff(current, content, self.include_file),
            "changed": current != content,
            "path": self.include_file,
            "errors": validate_config(config),
        }

    async def async_deploy(self, raw: Any | None = None) -> dict[str, Any]:
        if raw is not None:
            config = await self.async_save_config(raw)
        else:
            config = await self.async_get_config()

        errors = validate_config(config)
        if errors:
            return {"status": "invalid", "errors": errors, "path": self.include_file}

        content = render_yaml(config)
        current = await self.async_read(self.include_path)
        changed = current != content
        if changed:
            await self.async_write(self.include_path, content)
            _LOGGER.info("Wrote %s", self.include_path)

        included = await self.async_is_included()
        self._update_include_issue(included)

        check_error: str | None = None
        if included:
            check_error = await conf_util.async_check_ha_config_file(self.hass)
            if changed:
                self.create_restart_issue()

        return {
            "status": "written" if changed else "unchanged",
            "path": self.include_file,
            "included": included,
            "check_error": check_error,
            "restart_required": self.restart_pending(),
        }

    async def async_status(self) -> dict[str, Any]:
        included = await self.async_is_included()
        exists = await self.hass.async_add_executor_job(self.include_path.exists)
        artnet = await self._async_backend(ARTNET_DOMAIN)
        return {
            "version": self.version,
            "path": self.include_file,
            "include_key": INCLUDE_KEY,
            "file_exists": exists,
            "included": included,
            "restart_required": self.restart_pending(),
            "artnet_led_installed": artnet["installed"],
            "backends": {
                ARTNET_DOMAIN: artnet,
                DMX_DOMAIN: await self._async_backend(DMX_DOMAIN),
            },
            "dmx": await self.dmx.async_status(),
        }

    async def async_fix_include(self) -> None:
        current = await self.async_read(self.configuration_path)
        updated = add_include(current, self.include_file)
        if updated != current:
            await self.async_write(self.configuration_path, updated)
            _LOGGER.info("Added include for %s to %s", self.include_file, CONFIGURATION_FILE)
        self._update_include_issue(True)
        self.create_restart_issue()

    async def async_import_existing(self) -> dict[str, Any]:
        """Collect artnet_led platforms from the current Home Assistant configuration."""
        hass_config = await conf_util.async_hass_config_yaml(self.hass)
        entries: list[Mapping[str, Any]] = []
        for key in conf_util.extract_domain_configs(hass_config, "light"):
            value = hass_config.get(key)
            items = value if isinstance(value, list) else [value]
            entries.extend(
                item
                for item in items
                if isinstance(item, Mapping) and item.get("platform") == PLATFORM
            )
        return from_platform_entries(entries)

    # ------------------------------------------------------------------ issues

    def _update_include_issue(self, included: bool) -> None:
        if included:
            ir.async_delete_issue(self.hass, DOMAIN, ISSUE_INCLUDE_MISSING)
            return
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            ISSUE_INCLUDE_MISSING,
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_INCLUDE_MISSING,
            translation_placeholders={
                "include_file": self.include_file,
                "include_line": f"{INCLUDE_KEY}: !include {self.include_file}",
            },
        )

    def create_restart_issue(self, include_file: str | None = None) -> None:
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            ISSUE_RESTART_REQUIRED,
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_RESTART_REQUIRED,
            translation_placeholders={"include_file": include_file or self.include_file},
        )


def async_get_manager(hass: HomeAssistant) -> UiConfigManager | None:
    """Return the manager of the loaded config entry, if any."""
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        return entry.runtime_data
    return None
