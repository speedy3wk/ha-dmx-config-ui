# DMX Config UI

Eine Home-Assistant-Integration, mit der du [DMX](https://github.com/Breina/ha-artnet-led) in einem grafischen Editor statt per Hand-YAML konfigurierst, einschließlich Fixtures für Moving Lights.

English: see [README.md](README.md).

## Funktionen
- Art-Net- und sACN-Universes, Fixtures und Modi konfigurieren. OFL-Fixtures ermöglichen unter anderem Pan, Tilt, Gobo, Prisma und Farbe.
- Open-Fixture-Library-Dateien durchsuchen oder hochladen, mit Kanalbelegung und Vorschau der erzeugten Entitäten.
- Live-Validierung für doppelte IDs, Adressüberschneidungen, DMX-Kanalgrenzen und Fixture-Modi. Ein geplanter CI-Check vergleicht YAML und Kanalbreiten mit dem DMX-Parser.
- DMX-Kanalbelegung je Universe, Funktion „Nächster freier Kanal“, Lampen und Universes duplizieren und sortieren.
- Rückgängig/Wiederholen (<kbd>Strg</kbd>+<kbd>Z</kbd> / <kbd>Strg</kbd>+<kbd>Umschalt</kbd>+<kbd>Z</kbd>), Speichern mit <kbd>Strg</kbd>+<kbd>S</kbd>, Warnung bei ungespeicherten Änderungen.
- Import aus der bestehenden `configuration.yaml` oder aus einer JSON-Datei. Export als JSON.
- **Deploy** zeigt einen Diff, schreibt die jeweilige YAML-Datei atomar, prüft die HA-Konfiguration und legt Reparaturen für fehlende Includes oder nötige Neustarts an.
- Sprachen: Deutsch und Englisch.

## Voraussetzungen
- Home Assistant 2026.1 oder neuer
- [DMX](https://github.com/Breina/ha-artnet-led) 1.0 oder neuer installiert (eine Konfiguration kann auch vorbereitet werden, bevor DMX installiert ist)

## Installation

**Inkompatible Änderung:** Die Integrationsdomain wurde von `ha_artnet_led_uiconfig` in `dmx_config_ui` geändert. Vorabinstallationen müssen entfernt und neu hinzugefügt werden; gespeicherte Editor-Daten werden nicht übernommen, bereits erzeugte YAML-Dateien bleiben unverändert.

### Marketplace (empfohlen, Home Assistant ab 2026.11)

Der [Marketplace](https://www.home-assistant.io/integrations/marketplace/) ist ab Home Assistant 2026.11 direkt integriert. DMX Config UI wird als benutzerdefiniertes Repository installiert.

[![Im Marketplace öffnen](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=speedy3wk&repository=ha-dmx-config-ui&category=integration)

1. Als Administrator **Einstellungen → Marketplace** öffnen und gegebenenfalls den Warnhinweis zu Community-Inhalten bestätigen.
2. **Über Link hinzufügen** (**Add from link**) wählen, `https://github.com/speedy3wk/ha-dmx-config-ui` eingeben und **Hinzufügen** wählen. Falls dazu aufgefordert, GitHub verbinden. Wird ein Inhaltstyp abgefragt, **Integration** auswählen.
3. **DMX Config UI** öffnen und **Installieren** wählen.
4. Dem Einrichtungsdialog folgen. Öffnet er sich nicht, unter **Einstellungen → Geräte & Dienste → Integration hinzufügen** **DMX Config UI** hinzufügen. Home Assistant nur neu starten, wenn der Marketplace dazu auffordert.

Nach Integrationsupdates ist weiterhin ein Neustart von Home Assistant nötig.

Auf älteren unterstützten Home-Assistant-Versionen dieses Repository in HACS als **Integration** hinzufügen, installieren und vor dem Einrichten neu starten.
Bestehende HACS-Installationen werden beim Update auf Home Assistant 2026.11 automatisch in den Marketplace übernommen.

Nach der Installation erscheint das Panel **DMX Config UI** in der Seitenleiste. Nur Administratoren sehen es.

## DMX bearbeiten

Du kannst Art-Net- und/oder sACN-Universes anlegen, Geräte hinzufügen und jeweils Fixture und Modus auswählen. Die Kanalbelegung zeigt den DMX-Bereich; der Dialog gibt eine Vorschau der erzeugten `light`-, `number`- und `select`-Entitäten.

Die Fixture-Bibliothek enthält:
- Generische Fixtures aus der Open Fixture Library (MIT-Lizenz).
- Fixtures aus `/config/fixtures` oder dem konfigurierten Fixture-Ordner.
- Im Panel hochgeladene oder über die Suche aus der Open Fixture Library geladene Dateien.

Deploy schreibt `/config/dmx_config_ui_dmx.yaml` und fügt `dmx: !include dmx_config_ui_dmx.yaml` als obersten Schlüssel ein. Gibt es bereits einen `dmx:`-Block in der `configuration.yaml`, ersetzt die Reparatur diesen nach einer Sicherung unter `configuration.yaml.dmx_config_ui.bak`. Nach Deploy ist ein Neustart nötig.

Solange die Konfiguration Fehler enthält, ist Deploy gesperrt.

## Lovelace-Karte (optional)
Der Editor lässt sich auch als Karte einbetten.
1. **Einstellungen → Dashboards → ⋮ → Ressourcen**: `/api/dmx_config_ui/dmx-config-ui.js` als *JavaScript-Modul* hinzufügen.
2. Karte anlegen:
   ```yaml
   type: custom:dmx-config-ui
   ```

## Screenshots
**Deploy-Vorschau mit Diff**

![Deploy-Vorschau mit Diff](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/deploy.png)

**Mobile Ansicht (helles Theme)**

<img src="https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/mobile.png" alt="Mobile Ansicht (helles Theme)" width="320">

**DMX-Fixture-Editor**

![DMX-Fixture-Editor mit Art-Net- und sACN-Universes](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/dmx-editor.png)

**Fixture-Bibliothek**

![Fixture-Suche und Bibliothek](https://raw.githubusercontent.com/speedy3wk/ha-dmx-config-ui/main/docs/images/fixture-library.png)

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
npm run build   # schreibt nach custom_components/dmx_config_ui/frontend/dist/
```
Das gebaute Bundle wird mit eingecheckt; die CI prüft, ob es aktuell ist. Python und TypeScript verwenden gemeinsame Validierungsfälle aus `tests/fixtures/dmx_validation_cases.json`. Der wöchentliche Workflow prüft die erzeugte Ausgabe gegen DMX selbst.

Version anheben (Manifest, package.json, Lockfile und pyproject):
```bash
python scripts/bump_version.py 0.4.0
```

---
Dieses Projekt ist vollständig KI-generiert.
