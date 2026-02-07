# Art-Net LED UI Config

Custom Integration (nicht offiziell in HACS gelistet) für eine WYSIWYG‑Konfiguration der https://github.com/Breina/ha-artnet-led Einstellungen. Die Integration stellt ein Sidebar‑Panel bereit und speichert die Konfiguration in Home Assistant Storage.

English: see [README.md](README.md).

## Screenshots
[![Screenshot 1](screen1.png)](screen1.png)
[![Screenshot 2](screen2.png)](screen2.png)
[![Screenshot 3](screen3.png)](screen3.png)

## Installation (HACS Custom Repository)
1. HACS öffnen → Integrationen → ⋮ → Custom repositories.
2. Repository‑URL hinzufügen: https://github.com/speedy3wk/ha-artnet-led-uiconfig (Kategorie: Integration).
3. Integration installieren und Home Assistant neu starten.
4. In Einstellungen → Geräte & Dienste die Integration hinzufügen.

## Panel
Nach der Installation erscheint ein Sidebar‑Panel **Art-Net LED Config**.

## Lovelace‑Karte (optional)
Du kannst die UI auch als Lovelace‑Karte nutzen. Resource hinzufügen:

1. Einstellungen → Dashboards → ⋮ → Ressourcen
2. URL hinzufüen: `/api/ha_artnet_led_uiconfig/ha-artnet-led-uiconfig.js` Typ: JavaScript‑Modul.

Karten‑Konfiguration:

```yaml
type: ha-artnet-led-uiconfig
```

## Automatisches Schreiben (App, optional)
Dieses Repository enthält ein App unter addons/ha_artnet_led_uiconfig. Das App schreibt YAML nach /config und triggert einen Reload.

Schritte:
1. App Store → ⋮ → Repositories → https://github.com/speedy3wk/ha-artnet-led-uiconfig hinzufügen.
2. App installieren.
3. App starten.
4. Im Panel **Deploy** klicken.

### App Standard (HAOS / Supervisor)
Keine Konfiguration nötig:
- `ha_url`: http://supervisor/core/api
- `ha_token`: leer (Supervisor‑Token wird automatisch bereitgestellt)

### Wenn kein Supervisor‑Token verfügbar ist
Long‑Lived Access Token nutzen:
- `ha_url`: http://homeassistant:8123
- `ha_token`: Long‑Lived Access Token

Long‑Lived Access Token erstellen:
Profil → Long‑Lived Access Tokens → Token erstellen.

Deploy schreibt `/config/ha_artnet_led_uiconfig.yaml` und ergänzt configuration.yaml einmalig um `light: !include ha_artnet_led_uiconfig.yaml`.

## Installations‑Checkliste
- Integration installiert und Home Assistant neu gestartet
- Integration in Einstellungen → Geräte & Dienste hinzugefügt
- App installiert und gestartet (optional)
- Panel sichtbar: **Art-Net LED Config** in der Sidebar

## Deploy‑Test
1. Panel öffnen und Änderungen vornehmen.
2. **Deploy** drücken.
3. Prüfen, ob `/config/ha_artnet_led_uiconfig.yaml` geschrieben wurde.
4. Prüfen, ob configuration.yaml die Zeile `light: !include ha_artnet_led_uiconfig.yaml` enthält.
5. In Einstellungen → System → Protokoll nach Reload‑Fehlern schauen.

## Frontend‑Entwicklung
Im Ordner frontend:
- `npm install`
- `npm run build`

Das Bundle landet in custom_components/ha_artnet_led_uiconfig/frontend/dist/.

---
Dieses Projekt ist vollständig KI‑generiert.
