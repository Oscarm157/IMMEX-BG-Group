# Checklist de go-live — BG Consulting Group

Estado a 2026-07-10. Marca lo que se cierra. Prioridad: 🔴 bloqueante · 🟠 antes de lanzar · 🟢 mejora.

## 0. Infraestructura / deploy (BLOQUEANTE)

- [ ] 🔴 **Reactivar serving en Vercel.** El proyecto `immex-bg-group` (team `oscars-projects157`) responde HTTP **402 `DEPLOYMENT_DISABLED`**: los builds están `Ready` pero Vercel bloquea el serving por límite de gasto / facturación. Es a nivel cuenta (afecta todos los proyectos de esa cuenta). Fix: dashboard Vercel → Settings → Billing / Spend Management. Acción de Oscar.
- [ ] 🔴 **Cutover de dominio.** `bgconsultingroup.com` hoy sirve el sitio VIEJO de WordPress y no está conectado al proyecto de Vercel. Conectar dominio + DNS + verificar SSL.
- [ ] 🟠 **Redirects del sitio viejo.** Mapear URLs del WordPress (si tienen tráfico/backlinks) a las nuevas para no perder SEO. `bgconsulting.mx` está caído (DNS no resuelve): decidir si se redirige o se deja morir.

## 1. Seguridad (regla dura, va de base)

- [ ] 🟠 **Security headers en `next.config.ts`.** Hoy solo tiene redirects, sin headers. Falta CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- [ ] 🟠 **`/api/leads`: validar con Zod + BotID.** Hoy inserta a DB (leads + leadEvents + leadComments) y notifica por Resend, con rate-limit por IP, pero sin validación de esquema Zod ni anti-abuso BotID. Endpoint público que dispara email: blindarlo.
- [ ] 🟠 **`/api/chat` (IA, caro): BotID + tope de uso.** Llamada a Anthropic expuesta; confirmar anti-abuso y límite por usuario/IP.
- [ ] 🟢 Confirmar guard de auth (`requireUser`/rol) en TODAS las server actions y route handlers del panel `/admin/*`.

## 2. Analítica / medición

- [ ] 🟠 **GA4 + Meta Pixel.** Hoy no hay NINGÚN analytics en el sitio. Instalar y marcar conversión en el envío de leads.
- [ ] 🟢 **Search Console** + enviar sitemap; validar indexación antes de escalar SEO.

## 3. SEO técnico

- [ ] 🟠 **`robots.txt`.** No existe `robots.ts`. Falta, referenciando el sitemap.
- [ ] 🟠 **OG image por defecto.** No hay imagen social; los links compartidos salen sin preview. Añadir OG/Twitter image (estática o `opengraph-image`).
- [ ] 🟠 **Blog en el sitemap.** `sitemap.ts` nota que el blog es dinámico y "se añadirá cuando se genere su sitemap propio": falta incluir los posts.
- [x] hreflang es/en: existe `alternates.languages` en `[lang]/layout.tsx`. Verificar `x-default` y canonicals por página.

## 4. Legal (México, LFPDPPP) — obligatorio al capturar leads

- [ ] 🔴 **Aviso de privacidad.** No existe la página. Es obligatorio porque el formulario captura datos personales.
- [ ] 🟠 **Consentimiento en el form de contacto.** Checkbox + link al aviso de privacidad antes de enviar el lead.
- [ ] 🟢 Aviso de cookies si se instalan analytics/pixel.

## 5. Contenido

- [ ] 🟠 **Blog con posts reales publicados.** Es DB-driven; confirmar que hay artículos publicados (un blog vacío se ve mal en lanzamiento).
- [ ] 🟢 **Corpus SEO — ubicaciones.** Solo existe Tijuana (1). Expandir ciudades (Mexicali, etc.) si entra en alcance.
- [ ] 🟢 **Corpus SEO — guías.** Hay 12; quedan del análisis: anexo-31, modalidades-immex, certificacion-iva-ieps, operaciones-virtuales, recinto-fiscalizado-estrategico, prosec.
- [ ] 🟢 Fotos/branding: confirmar imágenes reales vs generadas y que Nosotros/equipo tenga datos reales.

## 6. Post-ship (corre en prod con datos reales)

- [ ] 🟠 **Instrumentación de errores.** Sentry o log estructurado en server actions, route handlers y llamadas a IA (chat, generate). Que nada falle callado.
- [ ] 🟢 Plan de rollback documentado (rama por feature, `git revert`, o bajar deploy en Vercel).
- [ ] 🟢 QA responsive (móvil/tablet) + Lighthouse (perf, a11y, SEO, best-practices).

## Ya hecho (referencia)

- Sitio corporativo bilingüe ES/EN (inicio, servicios ×8, software BMS, nosotros, blog, contacto) con metadata por página.
- Corpus SEO: `/guias` (12) + `/ubicaciones` (Tijuana) con JSON-LD.
- Formulario de contacto → `/api/leads` → DB (CRM) + notificación Resend + rate-limit.
- CRM/panel `/admin` (leads, blog, ads, usuarios, dashboard).
- `/mapa-del-sitio` para presentación.
- `sitemap.ts` (corporativo + servicios + guías + ubicaciones).
