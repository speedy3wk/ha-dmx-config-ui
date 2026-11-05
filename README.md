# DMX Config UI

[![Marketplace custom repository](https://img.shields.io/badge/Marketplace-Custom-orange.svg)](https://www.home-assistant.io/integrations/marketplace/#custom-repositories)
[![Release](https://img.shields.io/github/v/release/speedy3wk/ha-dmx-config-ui.svg)](https://github.com/speedy3wk/ha-dmx-config-ui/releases)
[![CI](https://github.com/speedy3wk/ha-dmx-config-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/speedy3wk/ha-dmx-config-ui/actions/workflows/ci.yml)
[![Validate](https://github.com/speedy3wk/ha-dmx-config-ui/actions/workflows/validate.yml/badge.svg)](https://github.com/speedy3wk/ha-dmx-config-ui/actions/workflows/validate.yml)

A Home Assistant integration that lets you configure [ha-artnet-led](https://github.com/Breina/ha-artnet-led) in a visual editor instead of hand-written YAML. It supports both the stable 0.x `artnet_led` format and the 1.x beta `dmx` format, with fixture-based control for moving lights.

Deutsch: siehe [README.de.md](README.de.md).

## Features
- Switch between separate editors for the `artnet_led` 0.x and `dmx` 1.x targets. The integration detects which backend is installed.
- Configure Art-Net and sACN universes, fixtures and modes. OFL fixtures expose controls such as pan, tilt, gobo, prism and color.
- Browse or upload Open Fixture Library definitions, with a channel map and a preview of the entities each mode creates.
- Migrate legacy `artnet_led` fixtures to the new format with a preview and warnings for settings that cannot be represented exactly.
- Live validation covers duplicate IDs, address overlaps, DMX channel limits and fixture modes. A scheduled CI check also compares generated YAML and fixture channel widths with Breina's beta parser.
- The legacy editor continues to support `artnet_led` options such as `xy`, byte order, channel setups and advanced node options.
- A DMX channel map for each universe, a “next free channel” helper, duplicating lamps and universes, and reordering.
- Undo/redo (<kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>), save with <kbd>Ctrl</kbd>+<kbd>S</kbd>, and a warning about unsaved changes.
- Import from pasted YAML, from your existing `configuration.yaml`, or from a JSON/YAML file. Export to JSON.
- **Deploy** shows a diff, writes the target YAML file atomically, checks Home Assistant's configuration and creates Repairs issues when an include or restart is needed.
- Languages: English and German.

## Requirements
- Home Assistant 2026.1 or newer
- [ha-artnet-led](https://github.com/Breina/ha-artnet-led) 0.x or 1.x beta installed (the editor can also prepare a configuration before the target backend is installed)

## Installation

**Breaking change:** The integration domain changed from `ha_artnet_led_uiconfig` to `dmx_config_ui`. Existing pre-release installs must be removed and added again; saved editor settings are not migrated, while generated YAML files remain untouched.

### Marketplace (recommended, Home Assistant 2026.11+)

The [Marketplace](https://www.home-assistant.io/integrations/marketplace/) is built into Home Assistant 2026.11 and newer. DMX Config UI is installed as a custom repository.

[![Open in Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=speedy3wk&repository=ha-dmx-config-ui&category=integration)

1. Open **Settings → Marketplace** as an administrator and accept the community-content warning if prompted.
2. Select **Add from link**, enter `https://github.com/speedy3wk/ha-dmx-config-ui` and select **Add**. Connect GitHub if prompted. If asked for a content type, select **Integration**.
3. Open **DMX Config UI** and select **Install**.
4. Follow the integration setup flow. If it does not open, go to **Settings → Devices & services → Add integration** and add **DMX Config UI**. Restart only if the Marketplace requests it.

Integration updates still require a Home Assistant restart.

On older supported Home Assistant versions, add this repository to HACS as an **Integration**, install it and restart before adding the integration.
Existing HACS installations migrate automatically to the Marketplace when updating to Home Assistant 2026.11.

After installation, the **DMX Config UI** panel appears in the sidebar. Only administrators can see it.

## Editing ha-artnet-led 1.x (`dmx`)

Select the **DMX (1.0)** tab. Configure Art-Net and/or sACN universes, then add a device and choose a fixture and mode. The channel map shows the fixture's DMX footprint and the dialog previews the generated `light`, `number` and `select` entities.

The fixture library combines:
- Generic fixtures from the Open Fixture Library, bundled under its MIT license.
- Fixture definitions in `/config/fixtures` (or the configured fixture folder).
- Files uploaded in the panel or searched and downloaded from the Open Fixture Library.

Deploy writes `/config/dmx_config_ui_dmx.yaml` and adds the top-level include `dmx: !include dmx_config_ui_dmx.yaml`. If `configuration.yaml` already has a `dmx:` block, the Repairs action replaces it after backing up the original as `configuration.yaml.dmx_config_ui.bak`. A Home Assistant restart is required after deployment.

The `dmx` format is still in beta and may change upstream. The editor keeps the legacy tab separate and never rewrites its configuration when editing or migrating to `dmx`.

## Migrating from `artnet_led` 0.x

Open the **DMX (1.0)** tab and choose **Migrate from 0.x**. The assistant maps supported legacy device types to generic OFL fixtures and previews warnings before applying the result. Unsupported device types are skipped; settings such as custom channel setups, transitions, byte order, and temperature ranges may need manual review. Migration changes only the in-memory DMX document until you save or deploy it.

## Deploying `artnet_led` 0.x
1. Edit the configuration in the panel and click **Save**. The configuration is stored in Home Assistant's `.storage`.
2. Click **Deploy**. You get a diff against the current file. Confirm with **Write file**.
3. The integration writes `/config/dmx_config_ui.yaml`.
4. On first use, the file is not yet included. The panel shows the line to add, and **Settings → Repairs** offers to append it for you:
   ```yaml
   light dmx_config_ui: !include dmx_config_ui.yaml
   ```
   The labelled key (`light dmx_config_ui:`) avoids clashing with an existing `light:` section.
5. ha-artnet-led only reads its configuration at startup, so a **restart is required**. A Repairs issue appears. Fixing it checks the configuration and then restarts Home Assistant.

Deploy is blocked while the configuration has validation errors.

## Options
**Settings → Devices & services → DMX Config UI → Configure**
- **Include file**: the name of the generated file, relative to `/config`. The default is `dmx_config_ui.yaml`.

## Lovelace card (optional)
The editor can also be embedded as a card.
1. **Settings → Dashboards → ⋮ → Resources**: add `/api/dmx_config_ui/dmx-config-ui.js` as a *JavaScript module*.
2. Add the card:
   ```yaml
   type: custom:dmx-config-ui
   ```

## Migrating from 0.1.x (add-on)
Version 0.2.0 no longer needs the companion add-on/app. The integration writes the YAML file itself.
1. Uninstall the **Art-Net LED UI Config** add-on and remove its repository from the add-on store.
2. Update the integration via **Settings → Updates** (Marketplace on Home Assistant 2026.11+) or the installation method used on older supported versions, then restart.
3. The saved editor configuration from the old integration domain is not migrated. Existing generated YAML files remain untouched; set **Include file** to an existing file if you want to keep deploying to it.
4. If you previously maintained the config by hand, use **⋮ → Import from configuration.yaml** in the **Art-Net LED (0.x)** tab.

## Screenshots
**Editor with DMX channel map**

![Editor with DMX channel map](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/overview.png)

**Light dialog with channel setup editor**

![Light dialog with channel setup editor](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/light-dialog.png)

**Deploy preview with diff**

![Deploy preview with diff](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/deploy.png)

**Mobile layout (light theme)**

<img src="https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/mobile.png" alt="Mobile layout (light theme)" width="320">

**DMX fixture editor**

![DMX fixture editor with Art-Net and sACN universes](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/dmx-editor.png)

**Fixture library**

![Fixture search and library](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/fixture-library.png)

**Migration preview**

![Legacy to DMX migration preview](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/migration.png)

## Development
```bash
# Backend
python -m venv .venv && .venv/bin/pip install -r requirements_test.txt
.venv/bin/pytest tests
.venv/bin/ruff check custom_components tests scripts

# Frontend (Lit + TypeScript)
cd frontend
npm ci
npm run lint && npm test
npm run build   # writes custom_components/dmx_config_ui/frontend/dist/
```
The built bundle is committed, and CI checks that it is up to date. The validation rules exist in Python and TypeScript for both targets. Their shared cases are tested against `tests/fixtures/validation_cases.json` and `tests/fixtures/dmx_validation_cases.json`. The weekly validation workflow checks DMX output against Breina's `platform-refactor2` branch.

To bump the version (manifest, package.json, lock file and pyproject), run:
```bash
python scripts/bump_version.py 0.3.1
```

---
This project is fully AI-generated.
