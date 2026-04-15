---
name: legacy-vite-codebase
description: Convenciones y paleta del código legacy React+Vite actual (pre-migración a Next.js). Úsalo al editar archivos en src/ antes de completar la Fase 2 del roadmap de migración, o cuando necesites paridad visual con el sitio actual.
---

# Código legacy React + Vite (pre-migración)

Este skill describe el estado **actual** de `src/` antes de la migración a Next.js + Sanity + Tailwind. Tras la Fase 2 del roadmap (`docs/plan-migracion-nextjs-sanity.md`) la mayoría de estas convenciones dejarán de aplicar.

## Stack actual

- React 19 + Vite 8 (beta, rolldown).
- JavaScript puro — sin TypeScript.
- CSS vanilla co-located: cada componente tiene su propio `.css` junto al `.jsx`.
- Fuentes: DM Sans (body) + JetBrains Mono (código/mono).
- Sin router — single page con `scrollIntoView`.
- Sin Tailwind, sin CSS Modules, sin styled-components.
- Analytics: `@vercel/analytics`, `@vercel/speed-insights`.

## Convenciones de código

- Componentes: PascalCase, fichero `NombreComponente.jsx` + `NombreComponente.css` en la misma carpeta (`src/components/`).
- CSS: clases en kebab-case, sin BEM estricto pero con prefijo del componente (`.hero-title`, `.experience-card`).
- Colores definidos inline en CSS, **no** en variables CSS globales.
- Animaciones con `@keyframes` en el mismo `.css` del componente.
- Sin emojis en código UI — usar SVG inline con `currentColor` para iconos.
- `clamp()` para tamaños responsivos de tipografía.
- Transiciones: `transition: all 0.2s` como patrón estándar.

## Paleta (modo hacker actual)

| Token       | Valor       | Uso                          |
|-------------|-------------|------------------------------|
| Background  | `#080808`   | Fondo base                   |
| Surface     | `#0d0d0d`   | Cards, terminal              |
| Border      | `#333`      | Bordes sutiles               |
| Text main   | `#e0e0e0`   | Texto principal              |
| Text muted  | `#888`      | Texto secundario             |
| Accent      | `#00ff88`   | Verde neón — acento primario |
| Accent 2    | `#00ccff`   | Azul — acento gradiente      |
| White       | `#fff`      | Títulos                      |

Tras la migración, esta paleta se preservará dentro del **"geek mode"** togglable (ver Fase 6 del roadmap).

## Decisiones técnicas relevantes

- El Hero tiene una terminal interactiva funcional con comandos easter egg (`pwd`, `ls`, `sudo`, `rm`, `exit`, `git blame`, etc.). Código en `src/components/Hero.jsx`.
- Los botones usan clases `.btn-primary` y `.btn-primary.btn-secondary` definidas en `App.css` — reutilizar siempre estos estilos globales.
- El scroll a secciones usa `scrollTo(id)` pasado como prop desde `App.jsx`.
- El `index.css` está vacío — los estilos globales van en `App.css`.

## Cuándo aplicar este skill

- Al hacer hotfixes o pequeños ajustes en `src/` **antes** de completar Fase 2 de la migración.
- Al portar componentes a Next.js respetando la paridad visual del modo "geek".
- Para reconstruir los tokens del geek mode en Tailwind v4 (Fase 6).

Tras la Fase 2: considerar este skill legacy-only.
