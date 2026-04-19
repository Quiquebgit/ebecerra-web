---
name: piezas-landing
description: Detalles completos de la landing estática de Piezas Game servida desde public/piezas-game/. Úsalo cuando vayas a editar cualquier archivo dentro de public/piezas-game/, o cuando una tarea afecte al routing de /piezas-game/* en vercel.json / next.config.
---

# Landing de Piezas Game

La landing del juego Piezas vive en `public/piezas-game/` y se sirve en `ebecerra.es/piezas-game/`.

## Naturaleza

**HTML/CSS estático puro.** No tiene ninguna relación con React, Vite o el stack principal del portfolio. El bundler la copia sin procesar al build; Vercel la sirve directamente como archivos estáticos.

## Estructura

```
public/piezas-game/
├── index.html        ← landing principal
├── styles.css        ← estilos propios, sin dependencias externas
├── privacidad.html   ← política de privacidad (RGPD)
├── terminos.html     ← términos de uso
└── assets/
    ├── logo.svg
    ├── icon.svg
    └── icon-192.png
```

## Paleta propia (NO mezclar con la del portfolio)

Definida en `public/piezas-game/styles.css` como variables CSS:

| Variable  | Valor     | Uso                     |
|-----------|-----------|-------------------------|
| `--bg`    | `#FAF7F2` | Fondo (beige)           |
| `--amber` | `#C17B3A` | Accent (botones, links) |
| `--ink`   | `#2C2416` | Texto principal         |

## Routing

- `/piezas-game` → redirect 301 a `/piezas-game/`.
- `/piezas-game/` → rewrite a `/piezas-game/index.html` (Next.js no sirve index.html como directorio automáticamente, a diferencia de Vite).
- Todo lo demás → fallback a Next.js router.
- `/.well-known/assetlinks.json` — deep links de Android, no tocar.

En Next.js: rewrites en `next.config.ts` (redirect + rewrites para cada subpágina).
Tras migración a Next.js: reglas equivalentes en `next.config.ts` (`redirects()` + la carpeta `public/piezas-game/` se copia tal cual).

## Reglas

- **Editar solo en `public/piezas-game/`** — nunca tocar `src/` para cambios de Piezas.
- No importar nada de React ni usar JSX aquí.
- Los estilos van en `styles.css` propio, **no en** `App.css` ni en Tailwind.
- Tráfico activo desde Play Store — cualquier cambio requiere validación manual de:
  - `/piezas-game/`
  - `/piezas-game/privacidad.html`
  - `/piezas-game/terminos.html`
  - `/.well-known/assetlinks.json`

## Pendiente antes de Play Store release

- URL real de Google Play cuando esté disponible.
- `og-image.png` para previews sociales.
- Revisión legal final de privacidad y términos.

## Carpeta `piezas-game-landing/` en la raíz

Es el origen del que se copió. **Está desactualizada** respecto a `public/piezas-game/`. Si hay cambios futuros, editar directamente `public/piezas-game/` — ignorar la carpeta raíz.
