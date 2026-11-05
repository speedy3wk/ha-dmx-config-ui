"""Business logic for the `dmx` target."""

from __future__ import annotations

from collections.abc import Mapping
import logging
from pathlib import Path
import shutil
from typing import TYPE_CHECKING, Any

from homeassistant import config as conf_util
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.storage import Store

from .const import (
    CONFIGURATION_BACKUP,
    DMX_DOMAIN,
    DMX_INCLUDE_FILE,
    DMX_STORE_KEY,
    DMX_STORE_VERSION,
    DOMAIN,
    ISSUE_DMX_INCLUDE_MISSING,
)
from .files import (
    CONFIGURATION_FILE,
    add_dmx_include,
    find_top_level_block,
    is_included,
    render_dmx_yaml,
    unified_diff,
    write_text,
)
from .fixtures import (
    BUNDLED_DIR,
    FixtureError,
    find_fixture,
    load_fixture_dir,
    merge_fixtures,
    parse_fixture_text,
    safe_file_name,
)
from .model_common import ConfigFormatError
from .model_dmx import (
    DEFAULT_FOLDER,
    empty_config,
    from_yaml,
    has_errors,
    is_safe_folder,
    normalize_config,
    used_fixtures,
    validate_config,
)
from .ofl import OflError, async_download, async_search

if TYPE_CHECKING:
    from .manager import UiConfigManager

_LOGGER = logging.getLogger(__name__)


class DmxManager:
    """Owns the stored dmx UI configuration, its include file and the fixture folder."""

    def __init__(self, hass: HomeAssistant, parent: UiConfigManager) -> None:
        self.hass = hass
        self.parent = parent
        self.store: Store[dict[str, Any]] = Store(hass, DMX_STORE_VERSION, DMX_STORE_KEY)
        self.include_file = DMX_INCLUDE_FILE

    @property
    def include_path(self) -> Path:
        return Path(self.hass.config.path(self.include_file))

    def fixtures_path(self, config: Mapping[str, Any]) -> Path:
        folder = str(config.get("fixtures_folder") or DEFAULT_FOLDER)
        if not is_safe_folder(folder):
            raise HomeAssistantError(
                f"Fixtures folder '{folder}' must stay inside the config folder"
            )
        return Path(self.hass.config.path(folder.strip()))

    # ----------------------------------------------------------------- storage

    async def async_get_config(self) -> dict[str, Any]:
        data = await self.store.async_load()
        try:
            return normalize_config(data)
        except ConfigFormatError:
            _LOGGER.warning("Stored dmx configuration is invalid, returning an empty one")
            return empty_config()

    async def async_save_config(self, raw: Any) -> dict[str, Any]:
        config = normalize_config(raw)
        await self.store.async_save(config)
        return config

    async def _async_config(self, raw: Any | None) -> dict[str, Any]:
        return normalize_config(raw) if raw is not None else await self.async_get_config()

    # ---------------------------------------------------------------- fixtures

    def _load_fixtures(self, folder: Path) -> dict[str, Any]:
        installed, errors = load_fixture_dir(folder, "folder")
        bundled, _ = load_fixture_dir(BUNDLED_DIR, "bundled")
        return {
            "fixtures": merge_fixtures(installed, bundled),
            "errors": errors,
            "folder_exists": folder.is_dir(),
        }

    async def async_fixtures(self, raw: Any | None = None) -> dict[str, Any]:
        config = await self._async_config(raw)
        try:
            folder = self.fixtures_path(config)
        except HomeAssistantError as err:
            bundled, _ = await self.hass.async_add_executor_job(
                load_fixture_dir, BUNDLED_DIR, "bundled"
            )
            return {
                "fixtures": merge_fixtures([], bundled),
                "errors": [{"file": config.get("fixtures_folder"), "error": str(err)}],
                "folder_exists": False,
                "folder": config.get("fixtures_folder"),
            }
        result = await self.hass.async_add_executor_job(self._load_fixtures, folder)
        return {**result, "folder": config.get("fixtures_folder")}

    async def _async_write_fixture(self, folder: Path, file_name: str, content: str) -> str:
        target = folder / safe_file_name(Path(file_name).stem)
        await self.hass.async_add_executor_job(write_text, target, content)
        _LOGGER.info("Stored fixture %s", target)
        return target.name

    async def async_upload_fixture(self, file_name: str, content: str) -> dict[str, Any]:
        try:
            summary = parse_fixture_text(content)
        except FixtureError as err:
            raise HomeAssistantError(f"Invalid fixture: {err}") from err
        config = await self.async_get_config()
        stored = await self._async_write_fixture(self.fixtures_path(config), file_name, content)
        return {**summary, "file": stored, "installed": True}

    async def async_ofl_search(self, query: str) -> list[dict[str, str]]:
        try:
            return await async_search(async_get_clientsession(self.hass), query)
        except OflError as err:
            raise HomeAssistantError(str(err)) from err

    async def async_ofl_download(self, key: str) -> dict[str, Any]:
        try:
            content, summary = await async_download(async_get_clientsession(self.hass), key)
        except OflError as err:
            raise HomeAssistantError(str(err)) from err
        config = await self.async_get_config()
        stored = await self._async_write_fixture(
            self.fixtures_path(config), key.replace("/", "-"), content
        )
        return {**summary, "file": stored, "installed": True, "source": "folder"}

    def _install_bundled(
        self, folder: Path, fixtures: list[dict[str, Any]], names: set[str]
    ) -> list[str]:
        installed: list[str] = []
        for name in sorted(names):
            fixture = find_fixture(fixtures, name)
            if fixture is None or fixture.get("installed") or not fixture.get("file"):
                continue
            folder.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(BUNDLED_DIR / fixture["file"], folder / fixture["file"])
            installed.append(fixture["file"])
        return installed

    # ----------------------------------------------------------------- actions

    async def async_preview(self, raw: Any | None = None) -> dict[str, Any]:
        config = await self._async_config(raw)
        fixtures = (await self.async_fixtures(config))["fixtures"]
        content = render_dmx_yaml(config)
        current = await self.parent.async_read(self.include_path)
        return {
            "yaml": content,
            "current": current,
            "diff": unified_diff(current, content, self.include_file),
            "changed": current != content,
            "path": self.include_file,
            "errors": validate_config(config, fixtures),
        }

    async def async_deploy(self, raw: Any | None = None) -> dict[str, Any]:
        config = (
            await self.async_save_config(raw) if raw is not None else await self.async_get_config()
        )
        fixtures = (await self.async_fixtures(config))["fixtures"]
        issues = validate_config(config, fixtures)
        if has_errors(issues):
            return {"status": "invalid", "errors": issues, "path": self.include_file}

        installed = await self.hass.async_add_executor_job(
            self._install_bundled, self.fixtures_path(config), fixtures, used_fixtures(config)
        )

        content = render_dmx_yaml(config)
        current = await self.parent.async_read(self.include_path)
        changed = current != content or bool(installed)
        if current != content:
            await self.parent.async_write(self.include_path, content)
            _LOGGER.info("Wrote %s", self.include_path)

        included = await self.async_is_included()
        configuration = await self.parent.async_read(self.parent.configuration_path)
        self._update_include_issue(included, configuration)

        check_error: str | None = None
        if included:
            check_error = await conf_util.async_check_ha_config_file(self.hass)
            if changed:
                self.parent.create_restart_issue(self.include_file)

        return {
            "status": "written" if changed else "unchanged",
            "path": self.include_file,
            "included": included,
            "check_error": check_error,
            "restart_required": self.parent.restart_pending(),
            "installed_fixtures": installed,
            "warnings": issues,
        }

    async def async_is_included(self) -> bool:
        configuration = await self.parent.async_read(self.parent.configuration_path)
        return is_included(configuration, self.include_file)

    async def async_status(self) -> dict[str, Any]:
        configuration = await self.parent.async_read(self.parent.configuration_path)
        exists = await self.hass.async_add_executor_job(self.include_path.exists)
        included = is_included(configuration, self.include_file)
        return {
            "path": self.include_file,
            "file_exists": exists,
            "included": included,
            "foreign_block": not included
            and find_top_level_block(configuration, DMX_DOMAIN) is not None,
        }

    async def async_fix_include(self) -> dict[str, Any]:
        current = await self.parent.async_read(self.parent.configuration_path)
        updated, replaced = add_dmx_include(current, self.include_file)
        if replaced and current is not None:
            backup = Path(self.hass.config.path(CONFIGURATION_BACKUP))
            await self.parent.async_write(backup, current)
            _LOGGER.warning(
                "Replaced the existing dmx: block in %s (backup: %s)", CONFIGURATION_FILE, backup
            )
        if updated != current:
            await self.parent.async_write(self.parent.configuration_path, updated)
        self._update_include_issue(True, updated)
        self.parent.create_restart_issue(self.include_file)
        return {"replaced": replaced, "backup": CONFIGURATION_BACKUP if replaced else None}

    async def async_import_existing(self) -> dict[str, Any]:
        """Read the current `dmx:` configuration (resolving includes) into a UI config."""
        hass_config = await conf_util.async_hass_config_yaml(self.hass)
        return from_yaml(hass_config.get(DMX_DOMAIN))

    # ------------------------------------------------------------------ issues

    def _update_include_issue(self, included: bool, configuration: str | None) -> None:
        if included:
            ir.async_delete_issue(self.hass, DOMAIN, ISSUE_DMX_INCLUDE_MISSING)
            return
        foreign = find_top_level_block(configuration, DMX_DOMAIN) is not None
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            ISSUE_DMX_INCLUDE_MISSING,
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_DMX_INCLUDE_MISSING,
            translation_placeholders={
                "include_file": self.include_file,
                "include_line": f"{DMX_DOMAIN}: !include {self.include_file}",
                "backup_file": CONFIGURATION_BACKUP if foreign else "-",
            },
        )
