# Sistema de marca eBecerra

**Fecha cierre sistema expandido:** 2026-04-20.

---

## Visión general — tres marks por contexto

| Mark | Fuente | Uso | Tamaño óptimo |
|------|--------|-----|--------------|
| **eB completo** | `public/brand/logo-black.svg` y variantes | Modo pro (`ebecerra.es` default), nav, footer, og:image, LinkedIn, email pro, facturas, documentos formales, casos de estudio | 48px+ |
| **`<B>`** | `public/brand/logo-bracket-b-*.svg` | Modo geek (`apps/tech` / dominio `.tech`), GitHub, Twitter dev, badges técnicos | 32px+ |
| **B sola** | `app/icon0.svg` (+ favicon.ico, icon1.png, apple-icon.png) | Favicon 16-32px en AMBOS modos | 16-32px |

Los tres marks **comparten la misma B** (paths del eB oficial). No son marcas distintas — son **tres voces de la misma marca** según el contexto y el espacio disponible.

**Por qué tres registros:** a 16px el eB se empasta (la e no se lee); el `<B>` tampoco aguanta (los brackets desaparecen). A 180px la B sola pierde personalidad. Cada mark brilla en su rango.

---

## eB completo — mark principal

**Maestro:** `public/brand/logo-master.svg`.

**Concepto:** Monograma "eB" minúscula-mayúscula en 4 piezas con hairlines entre ellas. La e lleva un swoosh pronunciado en el pie.

**Transmite:** precisión técnica + criterio estético. Alineado con el positioning "Tech Architect que capta autónomos y PYMEs".

### Kit cerrado (variantes)

Ubicación: `public/brand/`.

**Uso diario — mono:**

| Archivo | Color | Uso |
|---|---|---|
| `logo-black.svg` | Negro `#0C0A09` | **PRIMARY** — uso general, 80% de los contextos |
| `logo-white.svg` | Blanco `#FAFAF9` | Modo geek (`#080808`) y fondos oscuros |
| `logo-green.svg` | Verde `#047857` | Variante acento — usos puntuales |

**Uso expresivo — escalas verdes:**

Reservadas para **hero, portadas de secciones, redes sociales, presentaciones**. No usar en uso diario ni favicon.

| Archivo | Tonos (emerald) |
|---|---|
| `logo-scale-balanced.svg` | 400 / 500 / 700 / 900 |
| `logo-scale-deep.svg` | 500 / 700 / 800 / 950 |

**Opcionales:** `logo-poli-cachas.svg`, `logo-poli-letras.svg` — variantes 2-color si se necesitan.

---

## `<B>` — mark de modo geek

**Concepto:** La B del eB encerrada entre los brackets `<` y `>` de **DM Sans 900**. Construcción explícita de identidad dev: el símbolo fundamental del HTML (angle brackets) enmarca la inicial. Referenciado al dominio `.tech`.

**Por qué DM Sans 900:** DM Sans ya es una de las dos fuentes del proyecto (la otra es JetBrains Mono). Elegir DM Sans para los brackets asegura coherencia tipográfica con el resto de la web. El peso 900 (Black) aporta la presencia que exige un mark frente al peso visual del eB.

**viewBox:** 1024×1024 (cuadrado perfecto para favicon, avatar, apple-icon sin márgenes muertos).

### Kit (variantes de color)

| Archivo | Color | Uso |
|---|---|---|
| `logo-bracket-b-green.svg` | Verde `#047857` | **PRIMARY** para modo geek — sobre fondo claro |
| `logo-bracket-b-black.svg` | Negro `#0C0A09` | Documentos formales dentro del contexto geek |
| `logo-bracket-b-white.svg` | Blanco `#FAFAF9` | Sobre fondo oscuro (modo geek hero `#080808`) |

### Exploraciones y decisiones

- El proceso de exploración y las descartadas (Bowlby One, filigranas, tornados) están en [`docs/logo-exploration/_scrapped/`](logo-exploration/_scrapped/).
- Comparativa final A1 (DM Sans 900) vs B1 (Bowlby One) en [`docs/logo-exploration/bracket-b-final.html`](logo-exploration/bracket-b-final.html) — ganó A1.
- El SVG editado en Illustrator (paths vectorizados y unificados) está en [`docs/logo-exploration/logo-bracket-b-draft.svg`](logo-exploration/logo-bracket-b-draft.svg) como fuente editable.

---

## Favicon — B sola

Decidido 2026-04-19 tras probar que el eB completo se empasta a 16px. La B sola (las 2 cachas del eB combinadas sobre transparente) funciona mejor a tamaños favicon.

Reevaluado 2026-04-20: se exploró usar el `<B>` como favicon, pero a 16-32px los brackets desaparecen igual. La B sola sigue siendo la mejor opción para ese rango.

**Archivos activos:**
- `app/icon0.svg` — SVG favicon (B verde sin fondo, viewBox recortado a la B).
- `app/favicon.ico` — multi-size ICO.
- `app/icon1.png` — PNG fallback.
- `app/apple-icon.png` — iOS home screen (B verde sobre fondo verde, 180×180).
- `app/manifest.json` — PWA manifest (theme_color `#FAFAF9`, background_color `#047857`).
- `public/brand/web-app-manifest-192x192.png` — Android PWA.
- `public/brand/web-app-manifest-512x512.png` — Android PWA.

**Generados con** [realfavicongenerator.net](https://realfavicongenerator.net) a partir de `logo-favicon.svg` (B sola). Backup del paquete B-only en [`docs/logo-exploration/app-icons-B-backup/`](logo-exploration/app-icons-B-backup/).

**Backup — app icons con eB completo:**

`docs/logo-exploration/app-icons-eB-backup/` contiene la versión "eB completo sobre verde" que se probó inicialmente. Guardado para uso futuro en apps móviles, donde a 180-512 px el logo eB completo se lee perfectamente y da más personalidad que la B sola. Usar si/cuando se empaquete como TWA Android, PWA instalable, wrapper Capacitor, etc.

---

## Reglas de uso

- **Nunca** deformar, rotar o alterar proporciones de ningún mark.
- **Nunca** mezclar colores fuera del kit.
- **No mezclar eB y `<B>` en la misma pantalla** — cada uno vive en su modo/contexto. Mezclarlos confunde la identidad.
- Tamaño mínimo con el eB completo: **32px**. Por debajo se usa la variante favicon (B sola).
- Separación mínima: 1× el ancho del tallo de la B.
- **Primario en modo pro = `logo-black.svg` (eB)** salvo contexto que exija otra variante.
- **Primario en modo geek = `logo-bracket-b-green.svg` (`<B>`)** salvo fondo oscuro (entonces `-white.svg`).

---

## Pendientes

- [ ] Elegir fuente del wordmark para el acompañamiento del eB (Geist / Inter / Söhne, peso Medium).
- [ ] Crear OG image 1200×630 con `logo-scale-deep.svg` sobre warm white.
- [ ] Actualizar `openGraph.images` y `twitter.images` en `app/layout.tsx` cuando haya OG image.
- [ ] En Fase 9 (`apps/tech`), integrar `<B>` como mark visible en el nav del dominio `.tech`.
- [ ] Al publicar en `.tech`, usar el `<B>` como avatar/favicon de ese dominio.
