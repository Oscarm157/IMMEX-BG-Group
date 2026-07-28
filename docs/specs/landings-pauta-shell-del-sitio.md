# Landings de pauta: shell del sitio y formulario dentro del flujo

Estado: por construir · Impacto: verde · Tipo: diseño
Afecta: `/lp/vucem` y `/lp/cove` (las dos ya están en producción)

## Problema

Las dos landings de pauta se construyeron como un shell aparte: encabezado propio
con solo logo y teléfono, sin la navegación del sitio, y el formulario montado como
un rail de 380px sticky a la altura completa de la página, separado por un borde
vertical que corre de arriba abajo.

Resultado: no se leen como parte del sitio y el formulario se ve aislado, pegado al
costado en vez de formar parte de la página.

Referencia acordada: las páginas de industrias de Prime Advisor
(`primeadvisorinc/src/components/site/IndustryDetailPage.tsx`), donde la ficha de
contacto es una columna (`col-span-4`) **dentro de una sección**, junto al contenido
(`col-span-8`), sobre una banda de fondo diferenciada, y no un rail de página.

Nota declarada: el shell sin navegación era deliberado (clic pagado, única salida el
formulario). Al poner la nav del sitio se abren rutas de escape. Oscar lo pidió
explícitamente y así se hace; la barra fija de CTA en móvil y la ficha ancla siguen
sosteniendo la conversión.

## Objetivo

Que las dos landings se vean como el resto del sitio y que el formulario deje de ser
un rail lateral.

## Alcance

1. **`src/app/lp/layout.tsx`**: reemplazar el header propio por el shell corporativo,
   igual que `src/app/(seo)/layout.tsx`: `LangSetter lang="es"`, `grain`, `Nav`
   (`lang="es"`, `hideLangSwitch`, mismos props que en el layout SEO), `Footer` del
   sitio y `ChatWidget`. **Sin `FeedbackWidget`** (es de calidad interna, no va en
   tráfico pagado). El teléfono deja de vivir en un header propio: ya está en la nav
   y en la barra fija móvil.
2. **Quitar el grid de dos columnas a nivel de página** en las dos landings. El
   contenido pasa a ancho del sitio: contenedor `max-w-[1280px]` con el padding
   horizontal que usan las páginas del sitio, secciones una debajo de otra.
3. **El formulario (`LeadPanel`) baja al flujo**, patrón Prime Advisor: dentro de la
   sección de causas de rechazo, en `grid grid-cols-12`, contenido en `lg:col-span-8`
   y el panel en `lg:col-span-4`, sobre banda de fondo diferenciada. Sticky **dentro
   de su columna** (`lg:sticky lg:top-28`, holgura para la nav sticky), nunca a la
   altura de la página. Conserva `id="form"` y `scroll-mt` suficiente para que el
   ancla no quede bajo la nav.
4. **La barra fija de CTA en móvil se queda** tal cual (llama y lleva a `#form`).
5. Orden: **VUCEM primero como piloto**, revisión, y solo después propagar a COVE.

## Fuera de alcance

- Cambiar el copy, las cifras, las causas o las preguntas. Ni una palabra.
- Tocar `LeadPanel` por dentro (campos, envío, estado de éxito) más allá de lo que
  exija encajar en una columna más angosta.
- Cambiar `campaign`, el `noindex` o los metadatos.
- Rediseñar la nav o el footer del sitio.

## Criterios de aceptación

- [ ] La nav del sitio aparece en `/lp/vucem` y `/lp/cove`, idéntica a la de `/guias`,
      con el megamenú funcionando.
- [ ] El footer del sitio aparece en las dos.
- [ ] No queda ninguna línea vertical de borde recorriendo la página completa: el
      formulario ya no es rail de altura completa.
- [ ] El formulario vive dentro de una sección, con contenido a su izquierda en
      escritorio, y en móvil cae en el flujo como una tarjeta más.
- [ ] Al abrir `#form` desde la barra móvil, el panel no queda tapado por la nav.
- [ ] El ancho y el padding del contenido coinciden con los del resto del sitio.
- [ ] 375px sin desbordes horizontales en las dos landings.
- [ ] `noindex` intacto y `campaign` intacto: "Landing VUCEM (pauta)" y
      "Landing COVE (pauta)".
- [ ] `npm run build` y `tsc` en 0 errores.
- [ ] Capturas reales (Playwright) de las dos landings a 1440px y a 375px.

## Riesgos

- El worktree necesita `node_modules` copiado con `cp -al` desde el árbol principal:
  el symlink rompe Turbopack (ya pasado, ver bitácora del 2026-07-28).
- La nav es cliente (`"use client"`) con megamenú: verificar que no rompa el scroll
  ni tape el ancla `#form`.
- Las dos landings están en producción. Trabajo en rama, sin push ni deploy hasta
  revisión y visto bueno.
