# Spec — SEO programático BG Consulting Group

Fuente de verdad para construir el corpus SEO/SEM derivado del documento `public/BG Consulting Group — Estrategia SEM + SEO Programático.html`. Se construye contra este spec y se valida contra sus criterios de aceptación.

## Objetivo

Pasar el sitio de solo corporativo (home/servicios/software/contacto) a un sitio con corpus SEO programático que capture demanda informativa (SEO) y comercial (SEM), sin caer en las penalizaciones de Google (doorway pages, thin content, scaled-content spam 2024).

## Decisiones fijadas (gates resueltos)

1. **Modelo de despacho: mixto / vía socio.** BG despacha vía alianza / patente de tercero. Copy honesto: "despacho vía red de agentes aduanales aliados". Prohibido fingir patente propia o prometer despacho directo.
2. **Idioma: español-first.** El corpus SEO va solo en ES. El sitio corporativo `/[lang]/` sigue bilingüe.
3. **Routing:** el corpus SEO vive en rutas top-level ES **sin prefijo `[lang]`**, bajo un route group `(seo)` que no altera la URL:
   - `/guias/[slug]` — conceptos (Anexo 24, IMMEX, pedimento...).
   - `/ubicaciones/[slug]` — silo geográfico (Tijuana ancla + ciudades).
   - `/ley-aduanera/[slug]` — norma comentada (fase posterior).
   El middleware solo protege `/admin/*`; estas rutas quedan públicas sin tocar `middleware.ts`.

## Alcance

**En alcance (piloto):**
- Data-driven: `src/content/guias.ts` y `src/content/ubicaciones.ts`.
- Layout `src/app/(seo)/layout.tsx` (Nav + Footer en ES, reusando los componentes corporativos).
- Plantilla "Concepto": `src/app/(seo)/guias/[slug]/page.tsx` + índice `/guias`.
- Plantilla "Ubicación": `src/app/(seo)/ubicaciones/[slug]/page.tsx` + índice `/ubicaciones`.
- Piloto: 1 guía (`anexo-24`) + 1 ubicación (`tijuana`).
- Sitemap: incluir las rutas nuevas.

**Fuera de alcance (propagación posterior):**
- Resto de guías (cluster Anexo 24 + IMMEX), resto de ubicaciones, silo `/ley-aduanera/`.
- Campañas Google Ads, GBP, Search Console (los detona Oscar).
- Enlace de `/guias` y `/ubicaciones` en el Nav global (decisión de IA de navegación, tras aprobar el piloto).

## Reutilización (no reinventar)

- Patrón de página exacto: `src/app/[lang]/services/[slug]/page.tsx` (generateStaticParams, generateMetadata, JSON-LD, `dynamicParams = false`).
- Componentes: `SectionHeading`, `Reveal`, `PillButton`, `Faq`, `MediaFrame`, `SignalLine` de `src/components/site/`.
- `Nav` y `Footer` con `getDictionary("es")` (misma llamada que `[lang]/layout.tsx`).
- Datos reales: `siteConfig` (`src/lib/site-config.ts`) para NAP de Tijuana.
- Tokens de color del sistema (ink/chalk/bone/paper/accent/accent-ink/smoke/ash/line/surface-1).

## Plantillas y campo de valor único (anti-thin-content)

**Concepto (`/guias/`):** definición propia (no copiada del DOF) · fundamento legal citado (artículo/regla exacta) · puntos clave / cómo funciona · errores comunes + riesgo (ángulo legal BG) · FAQ 3-5 (rich snippets) · CTA a servicio relacionado + enlaces internos al cluster · fecha de actualización.

**Ubicación (`/ubicaciones/`):** datos únicos de la plaza (aduana, cruces: Otay/Mesa de Otay/terrestre) · sectores típicos · tipo de operaciones · modelo mixto explícito · NAP + `LocalBusiness` **solo en Tijuana** (sede real); el resto se presenta como "servicio operado desde Tijuana / cobertura nacional", sin fingir oficinas · FAQ · servicios relevantes.

## Datos estructurados (JSON-LD)

- Guía: `@graph` con `Article` + `FAQPage` + `BreadcrumbList`.
- Ubicación Tijuana: `LocalBusiness` (NAP real) + `FAQPage` + `BreadcrumbList`.
- Otras ubicaciones: `Service` (areaServed = ciudad) + `FAQPage` + `BreadcrumbList`, sin `LocalBusiness`.

## Criterios de aceptación

- [ ] `npx next build` limpio, sin errores de tipo.
- [ ] `/guias/anexo-24`, `/ubicaciones/tijuana`, `/guias`, `/ubicaciones` dan 200 en preview de prod.
- [ ] `/es` y `/en` siguen dando 200 (no se rompió el bilingüe).
- [ ] Cada página del piloto tiene su campo de valor único (no plantilla vacía con un token cambiado).
- [ ] Copy respeta el modelo mixto (nada de "despachamos con patente propia") y las reglas anti-slop (sin frases huecas, sin em-dashes).
- [ ] JSON-LD presente y válido en las páginas nuevas.
- [ ] Solo Tijuana lleva NAP/`LocalBusiness`; ninguna otra ubicación finge dirección.
- [ ] Captura real (Playwright/preview) del piloto, no descripción.

## Riesgos

- **Input jurídico:** escalar `/guias/` y `/ley-aduanera/` exige criterio legal real de BG por página; sin eso colapsa en AI-spam. El piloto usa material ya presente en `services-detail.ts` + el documento; se marca dónde hace falta input de BG.
- **langSwitch en Nav:** el Nav corporativo arma el switch reemplazando `/es|/en`; en rutas sin prefijo apuntaría a `/en/guias/...` (404). Se resuelve con una prop `hideLangSwitch` en `Nav` para el layout `(seo)`.
