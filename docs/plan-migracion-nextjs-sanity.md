# Migración ebecerra.es → Next.js App Router + Sanity CMS

## Context

La web actual ([ebecerra.es](https://ebecerra.es)) es un SPA React 19 + Vite desplegado en Vercel — funciona como CV técnico single-page con estética dark/hacker. Todo el contenido está hardcodeado en JSX (605 líneas), no hay CMS, router ni i18n.

**Objetivo de la migración:** convertirla en una web profesional para captar clientes de desarrollo web (autónomos y PYMEs), manteniendo la identidad técnica como diferenciador:

- Modo profesional por defecto (layout claro, orientado a conversión).
- **Toggle "geek mode"** que restaura la estética hacker actual (fondo `#080808`, terminal interactiva, verde neón, easter eggs) — identidad preservada como experiencia opt-in.
- Contenido editable por CMS (Sanity) sin tocar código.
- Bilingüe ES/EN.
- Nuevas secciones: **Servicios + Proceso** y **Casos de estudio**.

---

## 1. Análisis del estado actual (resumen ejecutivo)

### Estructura
```
src/
├── App.jsx, App.css, index.css, main.jsx
└── components/
    ├── Nav.jsx / .css         (40 lines)   — 6 items hardcoded
    ├── Hero.jsx / .css        (148 lines)  — terminal interactiva + 10 comandos
    ├── About.jsx / .css       (44 lines)   — bio + 4 feature cards
    ├── Experience.jsx / .css  (79 lines)   — 6 jobs en array hardcoded
    ├── Skills.jsx / .css      (86 lines)   — 12 skills + 12 tags animados
    ├── Projects.jsx / .css    (81 lines)   — 2 proyectos (Piezas, Grand Line)
    ├── Contact.jsx / .css     (93 lines)   — form Formspree
    └── Footer.jsx / .css      (34 lines)
```

### Dependencias relevantes
- `react@19.2`, `react-dom@19.2`, `vite@8-beta`, `@vitejs/plugin-react@5`
- `@vercel/analytics@1.6`, `@vercel/speed-insights@1.3`
- Sin router, sin i18n, sin Tailwind, sin CMS client.

### Config
- `vite.config.js` mínimo (solo `react()`).
- `vercel.json`: redirect `/piezas-game` → `/piezas-game/`, rewrite SPA `/(.*)` → `/index.html`.
- `public/piezas-game/` es una **landing HTML estática independiente** — fuera de alcance, debe seguir sirviéndose igual en `/piezas-game/`.

### Qué se reutiliza y qué se reescribe

| Pieza | Decisión |
|---|---|
| Contenido (experience, skills, projects, nav, footer, about) | **Migrar a Sanity** — todos son arrays/objetos planos. |
| Lógica terminal del Hero ([Hero.jsx:4-26](src/components/Hero.jsx)) | **Reutilizar** como Client Component dentro del "geek mode". |
| Animaciones Skills (stagger 100ms), hamburger Nav, form Formspree | **Portable** tal cual a Client Components. |
| CSS vanilla co-located, colores hex literales | **Reescribir** a Tailwind + `tailwind.config` con tokens de ambos modos. |
| `vercel.json` rewrites | **Reescribir** — Next.js gestiona routing; mantener solo la regla de `/piezas-game/`. |
| `public/piezas-game/` completo | **Mantener intacto** — se copia a `public/` en Next.js y Vercel lo sirve igual. |

---

## 2. Arquitectura propuesta

### 2.1 Stack

- **Next.js 15+ App Router** (React Server Components por defecto, `'use client'` puntual).
- **TypeScript** — paso natural al migrar; Sanity types se generan automáticamente (`sanity typegen`) y mejora mantenibilidad frente a clientes.
- **Tailwind CSS v4** + `@tailwindcss/typography` para contenido largo (casos de estudio).
- **Sanity v3** (Studio embebido en `/studio`) + `next-sanity` para queries.
- **next-intl** para i18n ES/EN con rutas `/es/...` y `/en/...`.
- **@vercel/analytics** y **@vercel/speed-insights** se mantienen.
- **Resend** (o mantener Formspree) para el form de contacto — decisión en Fase 4.

### 2.2 Estructura de carpetas

```
ebecerra-web/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              ← providers (theme, intl), fonts, analytics
│   │   ├── page.tsx                ← home (hero + servicios + about + contacto)
│   │   ├── servicios/page.tsx      ← detalle servicios + proceso
│   │   ├── casos/
│   │   │   ├── page.tsx            ← listado
│   │   │   └── [slug]/page.tsx     ← caso individual (MDX/PortableText)
│   │   ├── sobre-mi/page.tsx       ← experience + skills extendidos
│   │   └── contacto/page.tsx
│   ├── studio/[[...tool]]/page.tsx ← Sanity Studio embebido
│   ├── api/
│   │   ├── contact/route.ts        ← endpoint del form (Resend)
│   │   └── revalidate/route.ts     ← webhook de Sanity
│   ├── robots.ts, sitemap.ts
│   └── globals.css                 ← Tailwind layers + tokens CSS
├── components/
│   ├── ui/                         ← primitivos (Button, Card, Section)
│   ├── sections/                   ← Hero, Services, Experience, Projects, etc.
│   ├── geek-mode/
│   │   ├── GeekModeProvider.tsx    ← context + localStorage
│   │   ├── GeekModeToggle.tsx      ← switch visible en Nav
│   │   └── Terminal.tsx            ← portado de Hero.jsx actual
│   └── Nav.tsx, Footer.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts, image.ts, queries.ts
│   │   └── schemas/                ← ver §2.3
│   └── i18n/                       ← config next-intl, mensajes ES/EN
├── messages/es.json, messages/en.json
├── public/
│   ├── piezas-game/                ← SIN CAMBIOS
│   └── .well-known/assetlinks.json ← SIN CAMBIOS
├── sanity.config.ts
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### 2.3 Schemas de Sanity

**Documentos:**

| Schema | Campos principales | Uso |
|---|---|---|
| `siteSettings` (singleton) | `navItems[]`, `footerLinks[]`, `socialLinks[]`, `seoDefaults`, `heroCommands[]` | Configuración global bilingüe |
| `profile` (singleton) | `name`, `role`, `bio` (PortableText ES/EN), `photo`, `cvPdf`, `aboutFeatures[]` | Datos personales |
| `experience` | `company`, `role`, `period`, `description`, `current`, `order` | Timeline laboral |
| `skill` | `name`, `level` (0–100), `category`, `order` | Barras animadas |
| `techTag` | `name`, `order` | Tags clickables |
| `service` | `title`, `slug`, `icon`, `summary`, `deliverables[]`, `priceRange`, `order` | **NUEVO** — Servicios ofrecidos |
| `processStep` | `title`, `description`, `icon`, `order` | **NUEVO** — Cómo trabajo (1..N) |
| `project` | `title`, `slug`, `summary`, `tags[]`, `url`, `repoUrl`, `cover`, `featured` | Portfolio corto |
| `caseStudy` | `title`, `slug`, `client`, `year`, `problem`, `solution`, `outcome`, `metrics[]`, `stack[]`, `images[]`, `body` (PortableText) | **NUEVO** — casos detallados |

**Tipos compartidos:** `localeString`, `localeText`, `localePortableText` (objeto con claves `es`/`en`) — patrón estándar de Sanity para i18n.

### 2.4 Secciones de la nueva web (modo profesional)

**Home (`/[locale]`):**
1. Hero — nombre, propuesta de valor ("Arquitecto web para autónomos y PYMEs"), CTA doble (Contactar / Ver servicios), toggle geek mode visible.
2. Servicios (3–4 cards destacadas).
3. Casos de estudio destacados (2–3).
4. Sobre mí (resumen + CTA a `/sobre-mi`).
5. Contacto.

**Páginas dedicadas:**
- `/servicios` — detalle de cada servicio + sección "Proceso" (pasos).
- `/casos` + `/casos/[slug]` — listado y detalle con problema/solución/resultado.
- `/sobre-mi` — bio completa, experience timeline, skills, tech tags.
- `/contacto` — form + datos.

### 2.5 Geek mode (preservación de identidad)

- **Context + `localStorage`** para persistir preferencia.
- Tokens Tailwind duales (`data-mode="geek"` en `<html>`): profesional usa paleta clara + mono sutil; geek restaura `#080808`/`#00ff88`/JetBrains Mono dominante.
- En geek mode:
  - Hero muestra la **Terminal interactiva** completa (portada de `Hero.jsx` actual) con los 10 comandos easter-egg.
  - Nav con estilo terminal (`~/portfolio $ ...`).
  - Cursor parpadeante en títulos, ASCII art opcional.
- Toggle accesible desde Nav con icono `</>` o similar.
- SSR-safe: renderizar modo profesional por defecto para evitar flash; hidratar preferencia en cliente.

### 2.6 Estrategia de estilos

- Tailwind v4 con `@theme` en CSS definiendo tokens para ambos modos:
  ```css
  @theme {
    --color-bg: light-dark(#fafafa, #080808);
    --color-accent: light-dark(#0066ff, #00ff88);
    /* ... */
  }
  ```
- `tailwind.config.ts` con preset de la familia tipográfica (DM Sans + JetBrains Mono).
- Componentes primitivos `<Section>`, `<Button>`, `<Card>` en `components/ui/` para consistencia.
- Animaciones: `tailwindcss-animate` + keyframes custom para la terminal.

---

## 3. Roadmap de migración

**Principio rector:** en cada fase la web debe seguir desplegable en Vercel. Paridad visual con el sitio actual ya en Fase 2; Sanity y features nuevas llegan después.

### Fase 0 — Preparación (2h)
- Rama `migracion-nextjs` en `ebecerra-web` (o repo nuevo `ebecerra-web-next` y swap al final — **recomendado** para no bloquear hotfixes de Piezas landing).
- Decidir: ¿TypeScript sí/no? (recomendado sí).
- Snapshot Lighthouse actual como baseline.

### Fase 1 — Scaffold Next.js + Tailwind desplegable (4–6h)
- `npx create-next-app@latest` con App Router + TS + Tailwind.
- Copiar `public/piezas-game/` y `.well-known/` tal cual.
- Configurar `next.config.ts` con redirect `/piezas-game` → `/piezas-game/` (sustituye `vercel.json`).
- Layout raíz con fonts (DM Sans, JetBrains Mono vía `next/font`), `@vercel/analytics`, `@vercel/speed-insights`.
- Home placeholder "Under construction" con branding mínimo.
- Deploy a subdominio staging en Vercel (`next.ebecerra.es` o preview URL).
- **Hito:** producción sigue siendo Vite; staging ya corre Next.js.

**Riesgo:** romper la landing de Piezas. Mitigación: test manual `/piezas-game/`, `/piezas-game/privacidad.html`, `/piezas-game/terminos.html` + `/.well-known/assetlinks.json` en staging antes de avanzar.

### Fase 2 — Port 1:1 con contenido hardcoded (10–14h)
- Portar los 8 componentes a `components/sections/` con Tailwind, manteniendo contenido hardcoded en un `lib/content.ts` temporal.
- Hero con terminal interactiva funcionando igual (Client Component).
- Form de contacto seguir usando Formspree (sin cambios).
- Paridad visual con el sitio actual (estética hacker íntegra).
- **Hito:** staging tiene paridad funcional; se puede promocionar a producción si se quiere cortar aquí.

**Dependencias:** Fase 1 completa y `piezas-game` validado.

### Fase 3 — Integración de Sanity (8–12h)
- `npm create sanity@latest` con dataset `production`.
- Schemas del §2.3 (solo los que cubren contenido actual: siteSettings, profile, experience, skill, techTag, project).
- Studio embebido en `/studio`.
- Migrar contenido de `lib/content.ts` a Sanity (scripts `sanity import` o manual desde Studio).
- Queries GROQ en `lib/sanity/queries.ts`; reemplazar imports de `content.ts` por fetches.
- ISR + webhook de revalidación (`/api/revalidate`).
- **Hito:** editar textos en Studio → cambios en staging sin deploy.

**Riesgos:**
- Perder datos al migrar — hacer export/backup antes de cada cambio de schema.
- Coste Sanity: free tier sobra para este volumen (<10k documentos).

### Fase 4 — i18n ES/EN (6–8h)
- `next-intl` con routing `/es` y `/en`, `es` como default.
- Migrar textos hardcoded de UI (botones, labels, CTAs) a `messages/*.json`.
- Convertir campos Sanity a `localeString`/`localeText` (script de migración que copia `value → {es: value, en: null}`).
- Traducir contenido base al inglés (puedes dejar placeholders y afinar).
- Middleware de detección de idioma + selector en Nav.
- `hreflang`, `sitemap.ts` bilingüe.
- **Hito:** web bilingüe funcional.

### Fase 5 — Secciones comerciales nuevas (10–14h)
- Schemas `service`, `processStep`, `caseStudy`.
- Página `/servicios` con listado + sección "Proceso".
- Página `/casos` + `/casos/[slug]` con PortableText (renderer con Tailwind Typography).
- Actualizar Home: sustituir/complementar portfolio actual con sección "Casos destacados".
- CTAs de conversión en home y servicios.
- SEO por página (`generateMetadata` desde Sanity).
- **Hito:** web con propuesta comercial completa.

### Fase 6 — Geek mode toggle (6–8h)
- `GeekModeProvider` con context + `localStorage` + atributo `data-mode` en `<html>`.
- Tokens Tailwind duales vía `@theme` / `data-mode` selector.
- Variantes de Hero, Nav, tipografía.
- Terminal interactiva solo visible/dominante en geek mode; en profesional se muestra como easter egg discreto o no aparece.
- Persistencia SSR-safe (cookie para evitar flash en SSR, o aceptar FOUC mínimo).
- **Hito:** identidad tech preservada como opción, no fricción para clientes.

### Fase 7 — Form, analítica, pulido (4–6h)
- Decidir Formspree vs Resend + `/api/contact`. Resend recomendado (mejor UX, validación server-side, reCAPTCHA/Turnstile).
- Open Graph images (estáticas o `@vercel/og` dinámicas por caso de estudio).
- `robots.ts`, `sitemap.ts`, schema.org JSON-LD (Person + ProfessionalService).
- Auditoría Lighthouse vs baseline.
- **Hito:** listo para promocionar a producción.

### Fase 8 — Cutover a producción (2–3h)
- Apuntar `ebecerra.es` al deploy Next.js.
- Redirects 301 de rutas antiguas si cambian (normalmente no — misma home con anchors o nuevas rutas).
- Validar `/piezas-game/*` en producción.
- Monitorizar analytics 48h.
- Archivar repo Vite antiguo.

---

## Resumen de horas

| Fase | Horas | Acumulado |
|---|---|---|
| 0. Preparación | 2 | 2 |
| 1. Scaffold desplegable | 4–6 | 6–8 |
| 2. Port 1:1 hardcoded | 10–14 | 16–22 |
| 3. Sanity | 8–12 | 24–34 |
| 4. i18n | 6–8 | 30–42 |
| 5. Comerciales nuevas | 10–14 | 40–56 |
| 6. Geek mode toggle | 6–8 | 46–64 |
| 7. Form + SEO + pulido | 4–6 | 50–70 |
| 8. Cutover | 2–3 | 52–73 |

**Total estimado: 52–73 horas.** Se puede cortar en producción tras Fase 2 (paridad), Fase 3 (CMS sin i18n), o Fase 5 (web comercial completa sin geek mode).

---

## Decisiones técnicas clave

1. **Repo nuevo vs rama:** recomendado **repo nuevo** (`ebecerra-web-next`) para no arriesgar la landing de Piezas en producción durante la migración; cutover final cambia DNS.
2. **TypeScript:** sí — Sanity genera tipos, reduce bugs a largo plazo.
3. **Tailwind v4:** sí, API `@theme` CSS-first encaja bien con tokens duales (profesional/geek).
4. **i18n:** `next-intl` sobre `next-i18next` por compatibilidad nativa con App Router.
5. **CMS embebido:** Studio en `/studio` del mismo dominio — 1 deploy, 1 auth (Sanity), sin servicios extra.
6. **Form:** Resend > Formspree para control total y evitar dependencia externa visible en el código.
7. **Geek mode default:** profesional. Usuario técnico descubre el toggle; cliente no técnico nunca lo ve.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Romper landing de Piezas (tráfico activo, Play Store linkea aquí) | Repo nuevo + staging + test manual de `/piezas-game/*` en cada fase |
| Sobrediseño del geek mode retrasa lanzamiento | Posponer a Fase 6; lanzar en Fase 5 solo con modo profesional si hace falta |
| Traducción EN mediocre daña credibilidad internacional | Revisar EN con nativo antes de cutover; o lanzar solo ES y añadir EN post-cutover |
| Sanity schema mal diseñado → migraciones dolorosas | Schemas mínimos en Fase 3; extender incrementalmente en Fase 5 |
| Vite 8 beta → Next.js: divergencia de build tooling | Irrelevante tras Fase 1, se descarta Vite |

## Verificación end-to-end

Tras cada fase:
- `npm run build` sin errores en local.
- Deploy a preview en Vercel.
- Checklist manual: home renderiza, navegación funciona, `/piezas-game/`, `/piezas-game/privacidad.html`, `/piezas-game/terminos.html` devuelven contenido correcto, `/.well-known/assetlinks.json` accesible.
- Lighthouse ≥ 90 en Performance/Accessibility/SEO.
- Desde Fase 3: editar un texto en Studio → visible en preview tras revalidación.
- Desde Fase 4: `/es` y `/en` renderizan contenidos distintos; `hreflang` presente.
- Desde Fase 6: toggle persiste entre recargas, no hay FOUC inaceptable.
