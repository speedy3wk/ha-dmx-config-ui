# Art-Net LED UI Config

Eine Home-Assistant-Integration, mit der du [ha-artnet-led](https://github.com/Breina/ha-artnet-led) in einem grafischen Editor statt per Hand-YAML konfigurierst. Sie bringt ein Seitenleisten-Panel mit, prüft die Eingaben live und schreibt die YAML-Datei selbst.

English: see [README.md](README.md).

## Funktionen
- Nodes, Universes und Lampen im Panel **Art-Net LED Config** bearbeiten. Alle `artnet_led`-Optionen werden unterstützt, darunter `xy`, Byte-Order, Kanal-Setups und erweiterte Node-Optionen.
- Live-Validierung, identisch zum Backend: doppelte Namen, überlappende oder überlaufende DMX-Kanäle, ungültige Kanal-Setups.
- DMX-Kanalbelegung je Universe, Funktion „Nächster freier Kanal“, Lampen und Universes duplizieren und sortieren.
- Rückgängig/Wiederholen (<kbd>Strg</kbd>+<kbd>Z</kbd> / <kbd>Strg</kbd>+<kbd>Umschalt</kbd>+<kbd>Z</kbd>), Speichern mit <kbd>Strg</kbd>+<kbd>S</kbd>, Warnung bei ungespeicherten Änderungen.
- Import aus eingefügtem YAML, aus der bestehenden `configuration.yaml` oder aus einer JSON-/YAML-Datei. Export als JSON.
- **Deploy** zeigt einen Diff, schreibt die YAML-Datei atomar, prüft die Konfiguration und legt eine Reparatur für den nötigen Neustart an.
- Sprachen: Deutsch und Englisch.

## Voraussetzungen
- Home Assistant 2026.1 oder neuer
- [ha-artnet-led](https://github.com/Breina/ha-artnet-led) installiert (z. B. über HACS)

## Installation (HACS Custom Repository)
1. In HACS ⋮ → **Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/speedy3wk/ha-artnet-led-uiconfig` mit der Kategorie **Integration** hinzufügen.
3. **Art-Net LED UI Config** installieren und Home Assistant neu starten.
4. Unter **Einstellungen → Geräte & Dienste → Integration hinzufügen** **Art-Net LED UI Config** hinzufügen.

Danach erscheint das Panel **Art-Net LED Config** in der Seitenleiste. Nur Administratoren sehen es.

## Ablauf beim Deploy
1. Konfiguration im Panel bearbeiten und **Speichern** klicken. Die Konfiguration landet im `.storage` von Home Assistant.
2. **Deploy** klicken. Du siehst einen Diff zur aktuellen Datei. Mit **Datei schreiben** bestätigen.
3. Die Integration schreibt `/config/ha_artnet_led_uiconfig.yaml`.
4. Beim ersten Mal ist die Datei noch nicht eingebunden. Das Panel zeigt die nötige Zeile an, und unter **Einstellungen → Reparaturen** kannst du sie automatisch anhängen lassen:
   ```yaml
   light artnet_uiconfig: !include ha_artnet_led_uiconfig.yaml
   ```
   Der benannte Schlüssel (`light artnet_uiconfig:`) kollidiert nicht mit einem vorhandenen `light:`-Abschnitt.
5. ha-artnet-led liest seine Konfiguration nur beim Start, daher ist ein **Neustart nötig**. Es erscheint eine Reparatur. Wenn du sie ausführst, wird die Konfiguration geprüft und Home Assistant anschließend neu gestartet.

Solange die Konfiguration Fehler enthält, ist Deploy gesperrt.

## Optionen
**Einstellungen → Geräte & Dienste → Art-Net LED UI Config → Konfigurieren**
- **Include-Datei**: Name der erzeugten Datei, relativ zu `/config`. Standard ist `ha_artnet_led_uiconfig.yaml`.

## Lovelace-Karte (optional)
Der Editor lässt sich auch als Karte einbetten.
1. **Einstellungen → Dashboards → ⋮ → Ressourcen**: `/api/ha_artnet_led_uiconfig/ha-artnet-led-uiconfig.js` als *JavaScript-Modul* hinzufügen.
2. Karte anlegen:
   ```yaml
   type: custom:ha-artnet-led-uiconfig
   ```

## Migration von 0.1.x (Add-on)
Ab Version 0.2.0 wird das Add-on bzw. die App nicht mehr benötigt. Die Integration schreibt die YAML-Datei selbst.
1. Das Add-on **Art-Net LED UI Config** deinstallieren und sein Repository aus dem Add-on-Store entfernen.
2. Die Integration über HACS aktualisieren und neu starten.
3. Die gespeicherte Konfiguration bleibt erhalten. Eine vorhandene Zeile `light: !include ha_artnet_led_uiconfig.yaml` funktioniert weiter und wird erkannt.
4. Wenn du die Konfiguration bisher von Hand gepflegt hast: im Panel **⋮ → Aus configuration.yaml importieren**.

## Screenshots
**Editor mit DMX-Kanalbelegung**

![Editor mit DMX-Kanalbelegung](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/overview.png)

**Lampen-Dialog mit Kanal-Setup-Editor**

![Lampen-Dialog mit Kanal-Setup-Editor](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/light-dialog.png)

**Deploy-Vorschau mit Diff**

![Deploy-Vorschau mit Diff](https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/deploy.png)

**Mobile Ansicht (helles Theme)**

<img src="https://raw.githubusercontent.com/speedy3wk/ha-artnet-led-uiconfig/main/docs/images/mobile.png" alt="Mobile Ansicht (helles Theme)" width="320">

## Entwicklung
```bash
# Backend
python -m venv .venv && .venv/bin/pip install -r requirements_test.txt
.venv/bin/pytest tests
.venv/bin/ruff check custom_components tests scripts

# Frontend (Lit + TypeScript)
cd frontend
npm ci
npm run lint && npm test
npm run build   # schreibt nach custom_components/ha_artnet_led_uiconfig/frontend/dist/
```
Das gebaute Bundle wird mit eingecheckt; die CI prüft, ob es aktuell ist. Die Validierungsregeln gibt es doppelt, in `model.py` und in `frontend/src/validation.ts`. Beide werden gegen `tests/fixtures/validation_cases.json` getestet.

Version anheben (Manifest, package.json, Lockfile und pyproject):
```bash
python scripts/bump_version.py 0.2.1
```

---
Dieses Projekt ist vollständig KI-generiert.
