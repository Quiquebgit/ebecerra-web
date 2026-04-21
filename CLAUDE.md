# CLAUDE.md — ebecerra-web

## Contexto del proyecto

Portfolio personal de Enrique Becerra, Tech Architect Lead en VASS y especialista en Magnolia CMS.
Actualmente es un SPA React 19 + Vite con estética dark/hacker, desplegado en Vercel en `ebecerra.es`.

**En migración a Next.js 15 App Router + Sanity CMS + Tailwind + i18n ES/EN**, con objetivo de captar clientes de desarrollo web (autónomos y PYMEs), preservando la estética actual como **"geek mode"** togglable.

Plan completo y roadmap: [`docs/plan-migracion-nextjs-sanity.md`](docs/plan-migracion-nextjs-sanity.md).
Progreso de ejecución: [`docs/progress.md`](docs/progress.md).

## Stack

**Actual (legacy, mientras no se complete Fase 2 del roadmap):** React 19 + Vite 8 + JS vanilla + CSS co-located. Detalles en el skill `/legacy-vite-codebase`.

**Destino:** Next.js 16 App Router + TypeScript + Tailwind v4 + Sanity v5 + next-intl 4 + Resend.

## Convenciones de i18n (Fase 4 cerrada, 2026-04-21)

Sitio bilingüe **ES/EN** con `next-intl`. Detalles en el skill `/i18n-next-intl`.

**Routing:**
- ES sin prefijo en `/` (locale default).
- EN con prefijo en `/en`.
- `localePrefix: "as-needed"` definido en [`i18n/routing.ts`](i18n/routing.ts).
- Proxy en [`proxy.ts`](proxy.ts) (Next 16 renombró `middleware` → `proxy`) excluye `api`, `studio`, `playground`, `_next`, `_vercel`, `piezas-game`, `brand`, `.well-known` y archivos con extensión.

**Estructura `app/`:**
- `app/(locale)/[locale]/` — root layout con html/body + `NextIntlClientProvider`. Página home aquí.
- `app/(misc)/` — root layout con html/body `lang="es"` estático para rutas no-localizadas (`/studio`, `/playground/annotations`).
- `app/api/revalidate/route.ts` — route handler (sin layout).
- Favicons y `globals.css` en raíz de `app/`.
- **No existe `app/layout.tsx` ni `app/page.tsx`** — múltiples root layouts vía route groups.

**Textos UI:**
- Todos los strings en [`messages/es.json`](messages/es.json) y [`messages/en.json`](messages/en.json).
- Namespaces: `metadata`, `nav`, `hero`, `about`, `experience`, `skills`, `projects`, `contact`, `footer`.
- Server components: `getTranslations("namespace")`. Client components: `useTranslations("namespace")`.
- **Añadir un string nuevo:** añadirlo a AMBOS archivos ES y EN antes de usarlo. `next-intl` falla si falta una key.

**Contenido Sanity:**
- Tipos `localeString` y `localeText` en [`lib/sanity/schemas/locale.ts`](lib/sanity/schemas/locale.ts) (object con `es` required + `en` opcional).
- Plugin `@sanity/language-filter` configurado en [`sanity.config.ts`](sanity.config.ts) — permite al editor filtrar por idioma en Studio.
- Queries GROQ proyectan con `coalesce(field[$locale], field.es, field)` — fallback automático a ES si no hay traducción. Ver [`lib/sanity/queries.ts`](lib/sanity/queries.ts).
- Fallback en [`lib/content.ts`](lib/content.ts) dualizado `{ es, en }` con `getFallback(locale)`.
- **Añadir un campo traducible:** cambiar tipo a `localeString`/`localeText` en el schema → `npx sanity schema deploy` → migrar docs existentes (unset+set por vía MCP o similar).

**Selector de idioma:** botón ES/EN en [`components/sections/Nav.tsx`](components/sections/Nav.tsx) usando `useRouter`/`usePathname` de [`i18n/navigation.ts`](i18n/navigation.ts). Cookie `NEXT_LOCALE` persiste la preferencia.

**SEO bilingüe:**
- `generateMetadata` dinámico por locale en `(locale)/[locale]/layout.tsx`.
- `alternates.languages` → hreflang automático en HTML.
- [`app/sitemap.ts`](app/sitemap.ts) lista ambas URLs con alternates.
- [`app/robots.ts`](app/robots.ts) excluye `/studio`, `/api`, `/playground`.

**Revalidación:** [`app/api/revalidate/route.ts`](app/api/revalidate/route.ts) revalida `/` y `/en` en cada hit del webhook de Sanity.

## Permisos y autonomía

Autorización completa para:
- Crear, modificar y eliminar archivos en el proyecto.
- Instalar y desinstalar dependencias (`npm install`, `npm uninstall`).
- Hacer commits y push sin pedir confirmación previa (ver skill `/git-workflow`).
- Refactorizar dentro del alcance de la tarea.

## Identidad visual

**Logo y paleta cerrados (2026-04-19).**

- **Paleta modo pro:** stone warm neutrals + verde bosque `#047857` como único acento. Tokens completos en [`docs/design-tokens-pro.md`](docs/design-tokens-pro.md).
- **Paleta modo geek (existente):** fondo `#080808`, verde neón `#00ff88`, azul `#00ccff`. Se mantiene para el toggle de Fase 6.
- **Logo:** monograma eB en 4 piezas con swoosh. Kit completo en [`public/brand/`](public/brand/).
- **Favicon:** solo la B verde (las 2 cachas) sobre transparente, en `app/icon0.svg` (+ `.ico`, PNGs generados en `app/` y `public/brand/`).
- **Backup app icons** (eB completo sobre verde) en [`docs/logo-exploration/app-icons-eB-backup/`](docs/logo-exploration/app-icons-eB-backup/) para cuando se empaquete como app móvil.

**Docs de referencia obligatoria antes de tocar marca:**
- [`docs/brand-logo.md`](docs/brand-logo.md) — reglas de uso, kit, pendientes.
- [`docs/logo-exploration/brand-manual.html`](docs/logo-exploration/brand-manual.html) — manual visual consultable.

## Landing de Piezas — aislada

`public/piezas-game/` es una **landing HTML estática independiente** servida en `ebecerra.es/piezas-game/`. Tráfico activo desde Play Store — **tocar con cuidado**.

Detalles (estructura, paleta propia, routing, reglas de edición): skill `/piezas-landing`.

## Lo que NO hacer sin preguntar

- Cambiar la estructura de carpetas raíz del workspace.
- Instalar librerías de UI grandes (MUI, Chakra, etc.) sin justificación.
- Refactorizar secciones no relacionadas con la tarea en curso.
- Modificar `@vercel/analytics` o `@vercel/speed-insights`.
- Tocar routing de `/piezas-game/*` sin validar en preview (ver `/piezas-landing`).
- Desviarse del stack destino definido en el roadmap sin consultarlo antes.

## Deployment y webhooks

**Revalidación ISR Sanity → web** (`/api/revalidate`):
- Variable `SANITY_REVALIDATE_SECRET` debe existir con el MISMO valor en:
  1. `.env.local` (dev) — ya creada 2026-04-21.
  2. Vercel (Production + Preview + Development) — **pendiente hacerlo en Vercel UI**. El valor está en `.env.local` local; copiar desde allí.
  3. Webhook de Sanity Studio en [manage.sanity.io](https://manage.sanity.io) → proyecto `gdtxcn4l` → API → Webhooks. URL destino: `https://ebecerra.es/api/revalidate?secret=<valor>` (y/o la URL de preview si se quiere revalidar en ramas).
- Al llegar un POST válido, revalida `/` y `/en` (ver [`app/api/revalidate/route.ts`](app/api/revalidate/route.ts)).
- Si se rota el secret, hay que actualizar los 3 sitios a la vez.

Formato de instrucciones completo en [`.env.local.example`](.env.local.example).

## Configuración de correo - ebecerra.es

**Cuenta principal:**
- `e.becerra@ebecerra.es` — cuenta real, gestionada vía IMAP en Gmail.

**Aliases configurados en DonDominio** (todos redirigen a la cuenta principal):
- `contacto@ebecerra.es` — contacto general y formulario del portfolio.
- `info@ebecerra.es` — consultas formales.
- `legal@ebecerra.es` — avisos legales y privacidad.

**Notas:**
- DNS gestionados desde Vercel, no desde DonDominio.
- Registro MX pendiente de configurar en Vercel para activar el correo.
- `no-reply@ebecerra.es` no existe como alias, se usa solo como remitente en envíos automáticos de apps.

## Skills disponibles

Invocar con `/nombre-del-skill`. Todas instaladas en `.claude/skills/`.

### Skills propias del proyecto

| Skill | Cuándo usarla |
|-------|---------------|
| `/git-workflow` | Al hacer commits o push (workaround heredoc, convenciones de mensajes) |
| `/piezas-landing` | Al editar `public/piezas-game/` o el routing `/piezas-game/*` |
| `/legacy-vite-codebase` | Al editar `src/` actual o al portar el look actual al geek mode |

### Skills genéricas heredadas

| Skill | Uso |
|-------|-----|
| `/adapt` | Ajustes de responsive design |
| `/animate` | Microinteracciones y transiciones |
| `/audit` | Accesibilidad y rendimiento (Lighthouse) |
| `/simplify` | Revisar código cambiado por calidad y reuso |
| `/commit` | Crear commits con formato correcto |

### Skills para la migración a Next.js + Sanity

**Qué skill usar según la tarea:**

| Tarea | Skill |
|-------|-------|
| Diseñar o revisar layout, jerarquía visual y spacing de una sección | `/frontend-design` |
| Auditar UI/UX y coherencia visual de páginas completas | `/web-design-guidelines` |
| Generar paleta dual profesional/geek y tokens CSS | `/theme-factory` |
| Crear mockups rápidos o bocetos visuales antes de implementar | `/canvas-design` |
| Montar design system con Tailwind (tokens, utilidades, variantes) | `/tailwind-design-system` |
| Instalar, componer o personalizar componentes shadcn/ui | `/shadcn` |
| Escribir o revisar código Next.js App Router (RSC, Server Actions, routing) | `/next-best-practices` |
| Configurar caching, ISR, revalidación y streaming en Next.js | `/next-cache-components` |
| Aplicar patrones React 19 (Suspense, hooks nuevos, transiciones) | `/vercel-react-best-practices` |
| Tipar genéricos avanzados, utility types e inferencia en TS | `/typescript-advanced-types` |
| Diseñar schemas Sanity (tipos, referencias, validaciones, GROQ) | `/sanity-best-practices` |
| Modelar contenido: referenciar vs embeber, naming, i18n en Sanity | `/content-modeling-best-practices` |
| Optimizar contenido Sanity para SEO y AI Engine Optimization | `/seo-aeo-best-practices` |
| Auditar SEO on-page (metadata, hreflang, schema.org, Core Web Vitals) | `/seo-audit` |
| Redactar copy de servicios, casos de estudio y CTAs de conversión | `/content-strategy` |
| Integrar envío de emails transaccionales (formulario de contacto) | `/resend` |
| Configurar deploys, preview URLs, env vars y dominios en Vercel | `/deploy-to-vercel` |

**Reglas de uso:**
- Antes de empezar una fase del roadmap, revisar qué skills aplican.
- Si una tarea toca varias áreas, invocar en orden de dependencia (ej: `/theme-factory` → `/tailwind-design-system` → `/frontend-design`).
- Las skills de Sanity son críticas en Fase 3.
- Añadir más skills: `npx skills add <owner/repo@skill> -y` dentro del proyecto.
