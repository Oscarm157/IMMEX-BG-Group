# serpientes-tijuana

## Objetivo
Página aparte del sitio de BG (`/serpientes-tijuana`), one-page con scroll, que
presenta de forma clara y persuasiva el "Plan de Crecimiento Digital · Serpientes
Tijuana CIBAPAC" (documento ya escrito por un analista, en
`public/Plan de Crecimiento Digital Serpientes Tijuana.docx`) para que el cliente BG
entienda qué se puede lograr en redes sociales del equipo la próxima temporada. El
documento íntegro también debe quedar consultable en vivo, no solo descargable.

## Alcance
- Sí: ruta standalone `/serpientes-tijuana` (fuera de `[lang]`) con 15 bloques de
  scroll narrativo que cubren las 16 secciones del documento; ruta
  `/serpientes-tijuana/documento` con el texto íntegro + TOC; barra fija
  (`StickyBar`) con link al documento completo y descarga del `.docx`; identidad
  visual propia (negro/dorado/rojo, tipografía varsity, anclada a
  tijuanaserpientes.com), no el look corporativo de BG; `robots: noindex, nofollow`
  en ambas rutas; `DESIGN.md` propio de la ruta con reference lock de Refero.
- No: cambios al sitio principal de BG ni a su `globals.css`; generar PDF del plan;
  fotos de jugadores/equipo (no hay assets reales, no se inventan); gate de
  contraseña; i18n; tocar el screenshot viejo sin trackear en `public/`.

## Arquitectura (resumen — detalle completo en el plan aprobado)
- `src/content/serpientes-plan.ts`: única fuente de verdad del copy, verbatim del
  `.docx`, constantes granulares por sección + `PLAN_SECTIONS` ensamblado.
- `src/app/serpientes-tijuana/{layout.tsx,serpientes.css,page.tsx,documento/page.tsx,DESIGN.md}`.
- `src/components/serpientes/*`: un componente por bloque narrativo + `StickyBar` +
  `DocumentoCompleto`.
- Reutiliza `src/components/site/Reveal.tsx` y `src/components/MotionSection.tsx`
  para scroll-reveal (no se reinventa motion).
- Plan completo con guión de scroll, research Refero, piloto y orden de ejecución:
  `/root/.claude/plans/squishy-tinkering-honey.md`.

## Criterios de aceptación
- [ ] `serpientes-plan.ts` contiene las 16 secciones completas, verbatim (sin
      parafrasear, sin inventar datos).
- [ ] Ningún componente en `src/components/serpientes/*.tsx` tiene prosa sustantiva
      hardcodeada fuera de `serpientes-plan.ts` (solo microcopy de interfaz).
- [ ] `/serpientes-tijuana` renderiza los 15 bloques en orden, cada uno con una
      familia de layout visualmente distinta a sus hermanos (no la misma tarjeta repetida).
- [ ] `/serpientes-tijuana/documento` renderiza el texto íntegro con TOC funcional
      y link de vuelta al resumen.
- [ ] `StickyBar` visible durante todo el scroll, con link a `/documento` y descarga
      funcional del `.docx` original.
- [ ] `src/app/serpientes-tijuana/DESIGN.md` existe, lleno (no la plantilla en
      blanco), con reference lock de Refero.
- [ ] Ambas rutas devuelven `robots: noindex, nofollow` (verificado con
      `curl -sI` o view-source).
- [ ] Cero em-dashes en `serpientes-plan.ts` y en microcopy nueva.
- [ ] `prefers-reduced-motion` respetado en todo el motion nuevo.
- [ ] `npm run build` y `tsc` limpios.
- [ ] Capturas reales (Playwright/preview) en ~390px/~768px/~1440px del piloto
      (Hero–Comparativa–Diagnóstico + `/documento`) revisadas y aprobadas antes de
      propagar el resto de bloques.
- [ ] `globals.css` del sitio BG no se modifica; tokens nuevos viven en
      `serpientes.css` escopados bajo `.st-root`.

## Riesgos / decisiones abiertas
- Ninguna bloqueante — las decisiones de alcance (slug, identidad visual, tagline
  oficial en el hero, push directo sin PR) ya están cerradas con Oscar en el plan
  aprobado. Pendiente no bloqueante: logo/escudo real del equipo no está en el repo
  (hero y barra quedan 100% tipográficos hasta que Oscar lo suelte).
