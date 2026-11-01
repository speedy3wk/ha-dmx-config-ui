# Art-Net LED UI Config

A Home Assistant integration that lets you configure [ha-artnet-led](https://github.com/Breina/ha-artnet-led) in a visual editor instead of hand-written YAML. It adds a sidebar panel, validates the setup live and writes the YAML file for you.

Deutsch: siehe [README.de.md](README.de.md).

## Features
- Edit nodes, universes and lamps in the sidebar panel **Art-Net LED Config**. All `artnet_led` options are supported, including `xy`, byte order, channel setups and advanced node options.
- Live validation that matches the backend: duplicate names, overlapping or overflowing DMX channels, invalid channel setups.
- A DMX channel map for each universe, a “next free channel” helper, duplicating lamps and universes, and reordering.
- Undo/redo (<kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>), save with <kbd>Ctrl</kbd>+<kbd>S</kbd>, and a warning about unsaved changes.
- Import from pasted YAML, from your existing `configuration.yaml`, or from a JSON/YAML file. Export to JSON.
- **Deploy** shows a diff, writes the YAML file atomically, checks the configuration and creates a Repairs issue for the restart that is needed.
- Languages: English and German.

## Requirements
- Home Assistant 2026.1 or newer
- [ha-artnet-led](https://github.com/Breina/ha-artnet-led) installed (for example via HACS)

## Installation (HACS custom repository)
1. In HACS, open ⋮ → **Custom repositories**.
2. Add `https://github.com/speedy3wk/ha-artnet-led-uiconfig` with the category **Integration**.
3. Install **Art-Net LED UI Config** and restart Home Assistant.
4. Go to **Settings → Devices & services → Add integration** and add **Art-Net LED UI Config**.

The panel **Art-Net LED Config** then appears in the sidebar. Only administrators can see it.

## Deploy workflow
1. Edit the configuration in the panel and click **Save**. The configuration is stored in Home Assistant's `.storage`.
2. Click **Deploy**. You get a diff against the current file. Confirm with **Write file**.
3. The integration writes `/config/ha_artnet_led_uiconfig.yaml`.
4. On first use, the file is not yet included. The panel shows the line to add, and **Settings → Repairs** offers to append it for you:
   ```yaml
   light artnet_uiconfig: !include ha_artnet_led_uiconfig.yaml
   ```
   The labelled key (`light artnet_uiconfig:`) avoids clashing with an existing `light:` section.
5. ha-artnet-led only reads its configuration at startup, so a **restart is required**. A Repairs issue appears. Fixing it checks the configuration and then restarts Home Assistant.

Deploy is blocked while the configuration has validation errors.

## Options
**Settings → Devices & services → Art-Net LED UI Config → Configure**
- **Include file**: the name of the generated file, relative to `/config`. The default is `ha_artnet_led_uiconfig.yaml`.

## Lovelace card (optional)
The editor can also be embedded as a card.
1. **Settings → Dashboards → ⋮ → Resources**: add `/api/ha_artnet_led_uiconfig/ha-artnet-led-uiconfig.js` as a *JavaScript module*.
2. Add the card:
   ```yaml
   type: custom:ha-artnet-led-uiconfig
   ```

## Migrating from 0.1.x (add-on)
Version 0.2.0 no longer needs the companion add-on/app. The integration writes the YAML file itself.
1. Uninstall the **Art-Net LED UI Config** add-on and remove its repository from the add-on store.
2. Update the integration via HACS and restart.
3. Your stored configuration is kept. An existing `light: !include ha_artnet_led_uiconfig.yaml` line keeps working and is detected.
4. If you previously maintained the config by hand, use **⋮ → Import from configuration.yaml** in the panel.

## Screenshots
**Editor with DMX channel map**

![Editor with DMX channel map](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/overview.png)

**Light dialog with channel setup editor**

![Light dialog with channel setup editor](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/light-dialog.png)

**Deploy preview with diff**

![Deploy preview with diff](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/deploy.png)

**Mobile layout (light theme)**

<img src="https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/mobile.png" alt="Mobile layout (light theme)" width="320">

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
npm run build   # writes custom_components/ha_artnet_led_uiconfig/frontend/dist/
```
The built bundle is committed, and CI checks that it is up to date. The validation rules exist twice, in `model.py` and `frontend/src/validation.ts`. Both are tested against `tests/fixtures/validation_cases.json`.

To bump the version (manifest, package.json, lock file and pyproject), run:
```bash
python scripts/bump_version.py 0.2.1
```

---
This project is fully AI-generated.
