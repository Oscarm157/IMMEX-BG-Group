# Campus BG — Plataforma de capacitación

## Objetivo
Campus de capacitación premium para clientes y empleados de BG Consulting: videos sueltos organizados por categoría, con progreso persistente por usuario. Feature diferenciador (calidad MasterClass), servido en subdominio propio y totalmente aparte del CRM.

## Alcance
- **Sí:**
  - Modelo plano **Categoría → Video** (orden opcional del video dentro de la categoría, definido por admin).
  - Cada video = bloques mixtos (título, intro, YouTube embebido, desglose, botón/imagen) + quiz de cierre.
  - Progreso por usuario: % por categoría **y** global, contador X/Y, "Marcar completado", estados check/anillo/vacío.
  - Auth propia del campus: invitación (alta por admin) + login con password o magic link. Cookie `campus_session`, secreto `CAMPUS_SECRET`. Aislada del CRM.
  - Multi-tenant: cliente pertenece a una org y ve solo categorías asignadas a su org; empleado ve categorías internas. Filtrado por audiencia + org.
  - Admin del campus (`/campus/admin`, rol admin/instructor): CRUD de orgs, usuarios/invitaciones, categorías, videos, bloques, quizzes; publicar/draft; asignar audiencia y orgs; dashboard de avance.
  - **Flujo estrella:** "Generar video desde URL de YouTube" → transcript (Supadata) + Claude tool-use → `{title, intro, desglose, quiz 5-8 preguntas}` → preview editable → guardar en DB dentro de una categoría.
  - Subdominio `campus.<dominio>` vía rewrite host-based en middleware.
  - Solo español.
- **No (v1):** certificados/PDF, biblioteca de video propia (solo YouTube embebido), gamificación/badges, notificaciones push, bilingüe EN, analítica avanzada, registro abierto (solo invitación).

## Criterios de aceptación
- [ ] Un usuario sin cookie `campus_session` en cualquier ruta `/campus/*` (salvo login/acceso/invite) es redirigido a login. El guard vive en cada server action/route, no solo en middleware.
- [ ] Flujo de invitación completo verificable: admin da de alta usuario → correo con link (Composio Gmail) → set password → login. Magic link: token de un uso, expira, y tras usarse no vuelve a servir.
- [ ] Cripto y cookie del campus son independientes del CRM: `campus_session` + `CAMPUS_SECRET`, sin tocar `users`/`crm-session`/`crm-permissions`.
- [ ] Cliente de org A NO ve categorías de org B ni las internas de empleado; empleado ve internas. Verificado en DB y en UI.
- [ ] En la pantalla de video: sidebar de la categoría con lista de videos y su estado, topbar con barra de progreso de la categoría (% + X/Y), Prev/Next, breadcrumb (Categoría › Video), panel de contenido con checks, footer Prev/Next + volver.
- [ ] "Marcar completado" inserta en `campus_progress`, sube el % y el X/Y, y **persiste al recargar** (nada en solo-cliente). Estados de video (check/anillo/vacío) derivados correctamente.
- [ ] El quiz corre, califica, marca passed y cuenta como step del progreso; el intento queda en `campus_quiz_attempts`.
- [ ] Progreso a dos niveles: % por categoría en su página y % global en el perfil.
- [ ] Admin genera un video desde una URL de YouTube real: aparecen 5-8 preguntas y los bloques (intro/desglose) editables antes de guardar; al guardar queda como `source=youtube_auto` en la categoría elegida y visible para el usuario asignado.
- [ ] Video de YouTube **no listado** se embebe y reproduce en el campus; el auto-quiz extrae su transcript.
- [ ] Toda vista nace con estados loading / empty / error.
- [ ] Diseño: tokens reales de BG (mint `#00e6a0`, ink `#0f1521`, Space Grotesk/Inter/Instrument Serif), namespaced `.campus-root`, familias de layout distintas (no plantilla plana). Validado con captura real (Playwright).
- [ ] `/prod-listo`: env vars presentes en prod, rate-limit en login/magic/quiz-gen, rollback (rama `campus` + commits atómicos).

## Riesgos / decisiones abiertas
- **Host del subdominio:** `campus.bgconsultingroup.com`. Proyecto Vercel actual = `bg-group-vf.vercel.app`; el subdominio se agrega ahí en go-live (Fase 5). No bloquea el build (rewrite por header host es local).
- **Supadata en prod:** `SUPADATA_API_KEY` (free tier 100/mes) debe existir en Vercel; la generación IA falla claro si falta. Anti-abuso + tope por admin.
- **Reescritura host-based en middleware Next 16 modificado:** verificar la API de rewrite contra `node_modules/next/dist/docs/` antes de codear (AGENTS.md).
- **CAMPUS_SECRET:** secreto nuevo, solo en `.env.local` y Vercel; nunca en repo.
