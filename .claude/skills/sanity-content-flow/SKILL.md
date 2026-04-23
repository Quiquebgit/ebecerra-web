---
name: sanity-content-flow
description: Flujo operativo para crear, editar, publicar y consultar contenido en Sanity (project gdtxcn4l). Úsalo al añadir docs, modificar schemas, deployar schemas, patchear contenido vía MCP, o montar queries GROQ en el frontend.
---

# Sanity content flow — ebecerra-web

Stack Sanity v5 compartido por ambas apps. **Project `gdtxcn4l`, dataset `production`, workspace `ebecerra-web`**.

## Schemas y queries

- **Schemas:** [`packages/sanity-schemas/schemas/`](../../../packages/sanity-schemas/schemas/) — compartidos. Tipos bilingües `localeString` y `localeText` en [`locale.ts`](../../../packages/sanity-schemas/schemas/locale.ts).
- **Cliente y queries:** [`packages/sanity-client/`](../../../packages/sanity-client/) — `client.ts` (Sanity client) + `queries.ts` (funciones GROQ tipadas).
- **Studio embebido:** [`apps/es/app/(misc)/studio/[[...tool]]/`](../../../apps/es/app/(misc)/studio/). Config en [`apps/es/sanity.config.ts`](../../../apps/es/sanity.config.ts) con `basePath: "/studio"` (crítico — sin esto Sanity interpreta "studio" como tool name).

## Política: todo contenido editable nace en Sanity

**No añadir copy comercial nuevo solo en `messages/*.json` o hardcoded.** Si el editor querría poder cambiarlo sin redeploy, va a Sanity:

1. Schema en `packages/sanity-schemas/schemas/` (singleton o colección según aplique).
2. Deploy: `cd apps/es && npx sanity schema deploy`.
3. Crear doc en Studio (o vía MCP) + publicar.
4. Query en `packages/sanity-client/queries.ts`.
5. Render con fallback: `queryFn(locale).catch(() => fallback)`.

UI chrome (labels de form, placeholders, estados "Enviando…", aria-labels, separadores) se quedan en `messages/*.json`.

## Política: listas como arrays, no campos nombrados

Si hay N items de la misma forma (trust badges, stats, social links, FAQ items), **un campo `array` en el schema y un `.map()` en React.** Nunca `metaExperience` / `metaResponse` / `metaQuality` paralelos — es deuda que se paga cuando quieres añadir/reordenar uno.

## Política: bilingüe desde el primer commit

Todo string nuevo se escribe **ES + EN a la vez**. En Sanity: tipo `localeString` o `localeText` (object con `es` required + `en` opcional; queries con `coalesce(field[$locale], field.es, field)` → fallback a ES si falta traducción).

## MCP de Sanity — operaciones frecuentes

Tools disponibles vía `mcp__sanity__*`. Las más usadas:

| Tool | Para qué |
|---|---|
| `get_schema` | Ver fields de un tipo antes de patchear |
| `query_documents` | GROQ con perspective `raw` / `published` / `drafts` |
| `get_document` | Fetch directo por ID (con o sin `drafts.` prefix) |
| `patch_document_from_json` | `set` / `unset` / `append` en un doc. Si apunta a published, crea draft |
| `create_documents_from_json` | Crear drafts nuevos con contenido JSON |
| `publish_documents` | Pasa drafts a published |
| `list_releases` | Releases activas en el dataset |

Al patchear, target sin `drafts.` prefix → se crea draft automáticamente. Publicar con `publish_documents` (el patch NO afecta producción hasta publicar). **El webhook de revalidación se dispara tras `publish_documents`.**

## Gotchas conocidos

- **`patch` con `set` sobre string plano esperando object falla con 500.** Ej: si un field era `"hola"` y quieres pasarlo a `{es: "hola", en: "hi"}`, necesitas dos calls: `unset` primero, `set` después.
- **Conflicting target.include** si metes múltiples operaciones sobre el mismo path de array en una sola call. Solución: un ítem por call o usar `append` específico.
- **Resend SDK NO lanza excepciones.** Hay que chequear `{data, error}` explícito; no basta con try/catch.
- **`revalidate: 3600`** en páginas = ISR de 1h. Si algo no se ve, o es cache o el webhook no disparó.

## Webhook de revalidación

`SANITY_REVALIDATE_SECRET` vive en 3 sitios que hay que mantener sincronizados:

1. `apps/<app>/.env.local` (dev).
2. Vercel env vars (Production + Preview + Development) de cada proyecto.
3. Webhook en [manage.sanity.io](https://manage.sanity.io) → proyecto `gdtxcn4l` → API → Webhooks → URL `https://ebecerra.es/api/revalidate?secret=<valor>`.

Cuando disparas `publish_documents`, Sanity hace POST al webhook → revalida `/` y `/en`.

Si rotas el secret, hay que actualizarlo en los 3 sitios a la vez.

## IDs actuales de docs frecuentes

| Tipo | ID | Nota |
|---|---|---|
| `service` web-presencia (900 €) | `17d4e524-2f39-4a35-8b1f-3ba705566f33` | — |
| `service` web-editable (1.500 €) | `5ab18da6-add5-48d6-a09a-ca96639ce62d` | — |
| `service` rescate-web (2.500 €) | `84d16ea1-b1a2-4efa-a2b7-ff13c26e2b0e` | — |
| `service` mantenimiento (60 €/mes) | `8674893a-2479-4794-830d-9d0b7d6e3cb3` | — |

Actualizar aquí cuando se creen o reenumeren docs.

## Buenas prácticas de schema

- **Un schema por concepto**, no sobrecargar un tipo con docenas de campos condicionales.
- **Singletons** para datos únicos (hero, siteSettings). Validar con `.max(1)` en structure o en `defineType`.
- **Colecciones** para datos repetibles (services, processSteps, faqItems, caseStudies).
- **Campos bilingües** siempre con `localeString`/`localeText`.
- **Referencias** sobre embedding cuando el item podría reusarse (ej. `service` referenciado desde múltiples `caseStudy`).
- **Validación en schema** con `Rule.required()`, `Rule.max(N)`, `Rule.min(N).max(M)` — el Studio no deja publicar si falla.

## Deploy de schemas

Tras modificar schemas en `packages/sanity-schemas/`:

```bash
cd apps/es
npx sanity schema deploy
```

Solo hace falta deployar desde una app (las dos usan el mismo workspace). Primera vez pedirá login interactivo.
