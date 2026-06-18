# BG Consulting Group — Auditoría Go-Live

Fecha: 2026-06-18 · Alcance: admin panel + CRM + API + DB + chatbot + deploy.
Objetivo: cerrar brechas para entregar el producto completo (sitio + admin) en ~2 semanas.

> La página de marketing se reskineó y completó en esta sesión (ritmo dark↔light, imágenes, limpieza de assets). Este documento cubre **todo lo demás** y **no toca código del CRM**: los fixes los ejecuta el dueño.

## Veredicto
Admin panel ~85% completo y estructuralmente sólido. CRUD de leads, auth, roles, blog, ads y posts funcionan. Lo que bloquea producción es **config/secretos**, no funcionalidad. Entregable en 2 semanas si se cierran los P0.

Estado de features:
- ✅ Leads (CRUD, asignación, estados, comentarios, eventos, búsqueda/filtros, paginación)
- ✅ Dashboard (KPIs, funnel, tendencias, fuentes, tabla por agente) · Pipeline board (kanban)
- ✅ Usuarios (CRUD, roles admin/agent/viewer, reset password, activar/desactivar, cambio forzado en 1er login)
- ✅ Login/sesión (HMAC-SHA256, PBKDF2 100k iteraciones, cookie httpOnly/secure/sameSite=lax, TTL 30d)
- ✅ Blog/artículos (ES/EN, draft/publish), Ads/campañas (UTM→lead), Posts generator (extract URL/PDF/texto → variantes)
- ⚠️ File upload (UI lista, falta `BLOB_READ_WRITE_TOKEN`) · Email notif (código listo, falta `RESEND_API_KEY`)
- ✅ Chatbot `/api/chat` (stream con tool calls, Anthropic)

---

## P0 — Bloquea el launch

| # | Brecha | Archivo / evidencia | Acción |
|---|--------|---------------------|--------|
| 1 | `CRM_ADMIN_PASSWORD` en texto plano | `.env.local:30-31` | Confirmar que `.env.local` está en `.gitignore` y **no** en el historial git; mover secreto solo a Vercel env; regenerar password tras deploy |
| 2 | `RESEND_API_KEY` vacío → emails de lead fallan silenciosos | `.env.local:27`, consumido en `src/app/api/leads/route.ts:250-276` | Setear key en Vercel + dominio verificado para `MAIL_FROM` |
| 3 | `BLOB_READ_WRITE_TOKEN` vacío → uploads fallan | `.env.local:28`, usado en `src/app/admin/actions.ts:226` | Crear Vercel Blob store, copiar token a Vercel env |
| 4 | Falta `scripts/seed.mjs` (referenciado en `package.json:13` como `db:seed`) | `package.json:13` | Crear seed o documentar `drizzle-kit push` para inicializar Neon |

**Verificación previa P0-1 (correr en repo):** `git log --all --full-history -- .env.local` debe dar vacío. Si aparece, el secreto ya está expuesto y hay que rotarlo + limpiar historial.

---

## P1 — Arreglar antes de entregar

| # | Brecha | Archivo | Nota |
|---|--------|---------|------|
| 5 | Rate-limit en memoria (no persiste entre instancias serverless) | `src/app/api/leads/route.ts:31-42`, `src/app/api/chat/route.ts:82-92` | Mover a Upstash Redis o similar para límite distribuido |
| 6 | Sin revocación de sesión server-side (no hay tabla sessions; TTL 30d) | `src/app/admin/actions.ts:79-83` | Tabla `sessions` o bajar TTL a 24h y documentar limitación |
| 7 | `/api/chat` confía en `locale`/`currentLead`/`qualification` sin validación de esquema | `src/app/api/chat/route.ts:106` | Validar con Zod antes de pasar a Anthropic |
| 8 | Tool calls de Claude emitidos sin validar `block.input` | `src/app/api/chat/route.ts:168-172` | Validar contra esquema antes de emitir al frontend |
| 9 | Borrado de lead hace cascade de comentarios/eventos/archivos sin confirmación | `src/lib/schema.ts:102-134`, `src/app/admin/actions.ts:261-277` | Modal de confirmación o soft-delete con archivo |
| 10 | Sin `error.tsx` en páginas admin | `src/app/admin/(panel)/` | Error boundary en dashboard, lista de leads, detalle |
| 11 | Draft de blog depende de Anthropic sin retry/fallback | `src/app/admin/blog-actions.ts:40-78` | Manejo de error + retry para el admin |
| 12 | Pool de conexión Neon sin config explícita | `src/lib/db.ts:10` | Probar bajo carga (50+ usuarios), considerar pooler mode |

---

## P2 — Post-launch (no bloquea)
- Import CSV/Excel de leads (migrar CRM viejo).
- Audit log de acciones admin (quién/cuándo en borrados, cambios de rol, reasignaciones).
- Atribución de ads más allá de UTM exacto (fallback por referrer).
- Auto-traducción de blog ES/EN.
- Email de alta de usuario (hoy solo devuelve password temporal para copiar).
- Selector de timezone en dashboard.
- Persistir historial de posts generados.

---

## Variables de entorno (setear todas en Vercel)
| Variable | Estado | Nota |
|----------|--------|------|
| `DATABASE_URL` | ✅ | Neon |
| `ANTHROPIC_API_KEY` | ✅ | chatbot + drafts |
| `CRM_SECRET` | ✅ | firma de sesión (64 hex) |
| `CRM_ADMIN_EMAIL` | ✅ | mover a Vercel |
| `CRM_ADMIN_PASSWORD` | ⚠️ P0 | en texto plano, regenerar |
| `RESEND_API_KEY` | ❌ P0 | vacío |
| `BLOB_READ_WRITE_TOKEN` | ❌ P0 | vacío |
| `MAIL_FROM` / `LEAD_RECIPIENT` | ⚠️ | verificar dominio Resend |
| `LEAD_WEBHOOK_URL` | opcional | Zapier/Make |

---

## Checklist de deploy (orden)
1. **DB**: `drizzle-kit push` (o migraciones `drizzle/0000,0001`) contra Neon.
2. **Secretos**: quitar `.env.local` del repo si está; setear todas las env vars en Vercel; regenerar `CRM_ADMIN_PASSWORD`.
3. **Email + Blob**: verificar dominio en Resend (`MAIL_FROM`); crear Vercel Blob store; copiar tokens.
4. **Pruebas**: login → crear lead (form + chatbot) → subir archivo → recibir email → draft de blog con URL → 20+ usuarios concurrentes en `/admin`.
5. **Deploy**: Vercel autodetecta Next 16; verificar redirect `/crm → /admin/login` (`next.config.ts`).
6. **Post-launch**: monitorear 24h (logs Vercel, 429 de rate-limit); documentar limitación de TTL de sesión.

## Build / runtime (sano)
- Next 16.2.x App Router · `runtime = 'nodejs'` en rutas que lo necesitan · maxDuration 60-120s razonable.
- Schema completo (`src/lib/schema.ts`): users, leads, ads, articles, comments, events, files, clients. Migraciones `drizzle/0000,0001`. Foreign keys y constraints presentes.
- Auth custom sin lib externa; password PBKDF2; middleware protege `/admin/*` salvo `/admin/login`.
