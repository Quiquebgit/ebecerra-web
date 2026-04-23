---
name: deployment-sanity-webhook
description: Configuración operativa de Vercel, dominios, env vars, webhooks de Sanity y CORS. Úsalo al tocar deploys, rotar secrets, hacer cutover de DNS, añadir un dominio nuevo, o diagnosticar por qué no se revalidan los cambios publicados en Sanity.
---

# Deployment, webhooks y env vars — ebecerra-web

## Proyectos Vercel

| Proyecto | Rama de prod | Root Directory | Dominios |
|---|---|---|---|
| `ebecerra-es` (activo) | `main` | `apps/es` | `ebecerra.es`, `www.ebecerra.es` |
| `ebecerra-tech` (pendiente cutover — plan.md Fase D) | `main` | `apps/tech` | `ebecerra.tech`, `www.ebecerra.tech` |

Ambos proyectos apuntan al **mismo repo** (`ebecerra-web`). Ignored Build Step con `npx turbo-ignore @ebecerra/es` (o `@ebecerra/tech`) evita rebuilds innecesarios cuando solo cambia la otra app o docs.

## Env vars por proyecto

| Variable | Dónde | Notas |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Ambos | `gdtxcn4l` |
| `NEXT_PUBLIC_SANITY_DATASET` | Ambos | `production` |
| `SANITY_API_READ_TOKEN` | Ambos | token lectura, scope restringido |
| `SANITY_REVALIDATE_SECRET` | Ambos | **mismo valor en ambos** (para que los webhooks funcionen) |
| `RESEND_API_KEY` | Ambos (cuando cada app esté en prod) | Verificado dominio en Resend primero |
| `CONTACT_TO_EMAIL` | Ambos | email destino del form (`contacto@ebecerra.es` o alias) |
| `CONTACT_FROM_EMAIL` | Opcional | remitente si difiere del default de Resend |

Formato completo en `apps/<app>/.env.local.example` (si existe) o en CLAUDE.md.

## Webhook de revalidación Sanity

**Un webhook por dominio activo.** Cuando `publish_documents` dispara, Sanity hace POST a la URL configurada.

### URL del webhook

```
https://ebecerra.es/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
```

(Y equivalente para `ebecerra.tech` cuando se active Fase D.)

### Sitios que tienen que llevar el mismo secret

El `SANITY_REVALIDATE_SECRET` vive en **3 lugares** que hay que mantener sincronizados:

1. `apps/<app>/.env.local` — dev local.
2. Vercel env vars (Production + Preview + Development) del proyecto.
3. Webhook en [manage.sanity.io](https://manage.sanity.io) → proyecto `gdtxcn4l` → API → Webhooks → query string `?secret=...`.

Si rotas el secret, **rota en los 3 a la vez** o el webhook deja de funcionar (devolvería 401 desde `app/api/revalidate/route.ts`).

### Qué revalida

[`apps/es/app/api/revalidate/route.ts`](../../../apps/es/app/api/revalidate/route.ts) revalida `/` y `/en` en cada hit válido. Si añades rutas estáticas (ej. `/faq`, `/privacidad`), **acuérdate de añadirlas ahí** o no se verán nuevos cambios hasta que expire el ISR (`revalidate: 3600` por default).

### Diagnóstico: "publiqué en Sanity y no veo el cambio"

1. **Caché de navegador** → hard refresh (`Ctrl+F5`).
2. **ISR todavía caliente** → esperar a que expire el `revalidate` de la página (1h por default) o disparar el webhook manualmente con `curl -X POST "https://ebecerra.es/api/revalidate?secret=$SECRET"`.
3. **Webhook no disparó** → en `manage.sanity.io` → Webhooks → History. Si no hay delivery reciente con status 200, el webhook está mal configurado o el secret no coincide.
4. **Secret desincronizado** → comparar los 3 sitios.

## CORS origins en Sanity

Configurar en `manage.sanity.io` → proyecto `gdtxcn4l` → API → CORS Origins. Añadir con **"Allow credentials"** activado:

- `https://ebecerra.es`
- `https://www.ebecerra.es`
- `https://ebecerra.tech` (cuando Fase D)
- `https://www.ebecerra.tech` (cuando Fase D)
- Previews de Vercel si se accede al Studio desde ahí: `https://ebecerra-es-*.vercel.app` (wildcard no soportado → añadir los que se usen).

## Resend — verificación de dominio

Antes de usar `/api/contact` en prod de un dominio:

1. `manage.sanity.io` → domain en Resend dashboard.
2. Añadir el dominio (`ebecerra.es`) → Resend da registros DNS (SPF, DKIM, DMARC).
3. Configurar DNS (en Vercel DNS si el dominio está ahí).
4. Verificar en Resend (puede tardar minutos).
5. Generar `RESEND_API_KEY` con scope limitado al dominio verificado.
6. Setear la key + `CONTACT_TO_EMAIL` en Vercel del proyecto.

Sin dominio verificado, Resend solo permite enviar a direcciones del owner de la cuenta (útil para dev, no sirve en prod).

## Cutover DNS de `ebecerra.tech`

Checklist Fase D (plan.md):

1. Crear proyecto Vercel 2 con Root Directory `apps/tech`, Ignored Build Step `npx turbo-ignore @ebecerra/tech`.
2. Replicar env vars del proyecto `.es` (mismos valores de Sanity, mismo secret, nuevo `CONTACT_TO_EMAIL` si aplica).
3. Settings → Domains → Add `ebecerra.tech` y `www.ebecerra.tech`. Vercel detecta el dominio de la cuenta.
4. CORS Sanity: añadir los 2 nuevos orígenes.
5. Webhook adicional Sanity apuntando a `https://ebecerra.tech/api/revalidate?secret=...`.
6. Resend: verificar `ebecerra.tech` o reusar `ebecerra.es` como remitente según convenga.
7. Lighthouse ≥ 90 antes de comunicar.

## Reglas operativas

- **No subir `.env.local` a git.** Está en `.gitignore` pero vigilar.
- **No rotar secrets antes de una demo** — hay una ventana de inconsistencia mientras se actualizan los 3 sitios.
- **Los previews de Vercel NO tienen el webhook** apuntándoles. Para probar en preview, disparar revalidate manualmente.
- **`turbo-ignore` puede marcar un commit como skipped** si el diff toca solo la otra app — eso es correcto. Forzar rebuild desde el dashboard si hace falta.
