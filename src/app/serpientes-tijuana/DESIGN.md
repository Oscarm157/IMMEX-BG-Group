# DESIGN.md — /serpientes-tijuana

Dirección visual propia de esta ruta, aislada del sistema de BG Consulting Group
(navy/mint). Ancla en la marca real del equipo, no en el sitio corporativo del
cliente.

## Reference lock (de Refero)
- **Referencia primaria:** la marca real de Serpientes Tijuana
  (tijuanaserpientes.com — logo analizado: fondo negro, wordmark "SERPIENTES"
  arqueado en tipografía deportiva/universitaria dorado con contorno rojo,
  "TIJUANA" blanco arriba, mascota serpiente emplumada enroscada en balón rojo).
  Fija la paleta (negro/dorado/rojo) y la identidad tipográfica (varsity/condensed
  de impacto). No es negociable: es la marca del cliente, no una elección estética.
- **Detalles prestados:**
  1. **Peloton** (Refero, `1b7e4f5c-c3c2-48d5-8f34-3ecdd17f422e`) — disciplina de
     "un solo acento por función" sobre base charcoal/near-black (no negro plano),
     botones pill 28px, jerarquía tipográfica por peso/tracking más que por
     cambio de familia, cards a 0 radio (o directamente sin card, solo el
     contenido). Se toma la disciplina de restricción, no su paleta (Peloton usa
     rojo único; aquí hay dos acentos con roles distintos, ver Paleta).
  2. **Freshman.tv** (Refero, `0459f838-4b02-4ab9-b6b1-f3cc6f423034`) — hero
     tipográfico gigante, condensado, casi como cartel; navegación fantasma
     mínima; acento rojo usado con moderación sobre blanco y negro.
  3. **Rox.com** (Refero, screen `a8f1a2a1`) — patrón concreto para
     `/documento`: hero partido + TOC lateral sticky + columna de artículo ancha
     y legible, para el "consultarlo en vivo" del documento íntegro.

## Tema y atmósfera
Oscuro, intenso, deportivo. No corporativo ni editorial-calma: es la energía de
un equipo que compite, no un reporte de consultoría. Sensación: vestidor /
cancha de noche / marcador encendido.

## Paleta (roles semánticos)
- **Fondo / superficies:** `--st-void #0a0a0b` (fondo base), `--st-surface-1
  #16171a` (paneles elevados, franjas de sección), `--st-surface-2 #1e2024`
  (hover/interactivo), `--st-line #2a2c31` (hairlines/divisores).
- **Texto:** fuerte `--st-chalk #f5f5f2`, suave `--st-bone #a3a5ab`, tenue
  `--st-ash #6f7178`.
- **Acento dorado `--st-gold #c9a876`:** identidad y datos. Wordmarks, números
  de sección, cifras/KPIs, subrayados de headline, bordes del logo tipográfico.
  NO se usa en botones ni en links interactivos — es el color de "marca", no de
  "acción".
- **Acento rojo `--st-red #d6202e`:** interacción. CTAs, links activos, hover,
  el punto/indicador de "en vivo", subrayado de nav activo. Un único acento de
  acción, disciplina Peloton.
- **Bordes/líneas:** `--st-line`, 1px, sin sombras (superficie sobre superficie,
  no elevación con blur).
- **Estados:** no aplica (no hay formularios ni validación en esta página).

## Tipografía
- **Display / hero / números de sección:** **Anton** (`next/font/google`,
  weight 400 — la familia solo trae ese peso, ya es máximo impacto). Uso: hero
  wordmark, headlines de cada bloque, cifras grandes (KPIs, calendario).
- **Eyebrows / labels / nav / botones:** **Oswald** 600-700, mayúsculas, tracking
  amplio (~0.08-0.12em). Uso: eyebrows de sección ("01 · CONTEXTO"), nav de
  StickyBar, botones, chips de segmentación.
- **Cuerpo / lectura larga (incluye `/documento`):** **Inter**, ya cargada en el
  layout raíz del sitio (`--font-inter`) — se reutiliza tal cual, no se paga una
  fuente nueva para texto de lectura.
- **Datos tabulares (hashtags, fechas, contadores):** **IBM Plex Mono**, también
  ya cargada en el raíz (`--font-plex-mono`).
- Solo **Anton** y **Oswald** son fuentes nuevas, cargadas exclusivamente en
  `src/app/serpientes-tijuana/layout.tsx` (no en el root layout del sitio).

## Componentes
- **Botones:** pill (radius 999px), relleno rojo `--st-red` + texto chalk para
  primario; ghost (borde `--st-line`, texto chalk) para secundario. Sin sombras.
- **Cards/contenedores:** por defecto NO hay cards. Separación por franjas de
  superficie (`--st-surface-1` vs `--st-void`) y hairlines, no por
  borde+sombra+radio. Excepción: cualquier bloque que agrupe UNIDADES
  COMPARABLES (equipos, campañas, tipos de contenido, indicadores, objetivos de
  pauta) puede usar contorno 1px, sin radio grande, sin sombra. El fondo de la
  card siempre se aparta un tono de la franja que la contiene, nunca el mismo
  tono en ambos (para que el contorno no sea la única separación visual): si la
  sección usa `--st-surface-1`, la card usa `--st-void` (recede, efecto
  tallado); si la sección es el `--st-void` base, la card usa `--st-surface-1`
  (se eleva, efecto de superficie levantada).
- **Navegación (StickyBar):** barra fija superior, fondo `--st-void` con
  backdrop-blur sutil al hacer scroll, wordmark chico a la izquierda, dos
  acciones a la derecha (documento completo / descargar) en Oswald.

## Layout y espaciado
- Ancho máximo de contenido: 1280px para bloques con grid, ~720px para el
  cuerpo de `/documento` (columna de lectura).
- Ritmo vertical: ~80-112px de padding vertical en desktop (`py-20 md:py-28`).
  Se bajó de los 128-192px originales: con tanto negro y contenido escaso, el
  padding grande dejaba pantallas vacías que leían planas. La profundidad la dan
  las franjas y la tipografía, no el aire muerto.
- Densidad: aireada en la narrativa (una idea por pantalla), más densa en
  `/documento` (lectura continua).

## Sistema de franjas (rompe el negro monótono)
Cada sección hermana usa una franja distinta de su vecina; ninguna comparte
fondo con la de al lado. Clases en `serpientes.css`, todas bajo `.st-band`
(position relative + overflow hidden):
- `.st-band-void`: near-black base con vignette superior sutil (profundidad).
- `.st-band-surface`: superficie elevada, gradiente `--st-surface-1` a `#141619`,
  perceptiblemente más clara que void (el contraste original #16171a vs #0a0a0b
  era invisible; por eso se subió `--st-surface-1` a #1c1f24).
- `.st-band-red`: franja roja oscura cinematográfica, un solo uso (Campañas, la
  sección más "encendida"). Mantiene el rojo especial; no se abusa.
- `.st-band-image`: fondo con imagen full-bleed (`::before`) + overlay oscuro
  (`::after`) para legibilidad. La imagen va por `--st-bg-img`, opacidad por
  `--st-bg-opacity` (~0.4-0.5).
- `.st-ghostnum`: número de sección gigante en contorno tenue como elemento
  gráfico de fondo. Llena el vacío vertical y ancla la franja sin depender de
  imagen. Se usa en las franjas void/surface/red, no en las de imagen.

## Capa gráfica (fondos generados)
Cuatro fondos cinematográficos generados con Nano Banana Pro (Replicate), en
`public/serpientes/`, atmósfera "cancha de noche / marcador / vestidor":
`duela-noche` (cancha vacía con reflector), `marcador` (arena con marcador
encendido, bokeh rojo/ámbar), `tribuna-humo` (gradas con humo y luz cálida),
`serpiente-textura` (escamas en negro con acentos dorado/rojo). Se usan como
`band-image` en Diagnóstico (03), Tipos de contenido (07), Pauta (11) y Cierre
(15). Script reproducible: `scripts/gen-serpientes-bg.mjs`. Ninguna tiene
personas ni caras (respeta el guardrail); son escenas de ambiente, no fotos
fabricadas de jugadores.

## Motion
- Scroll-reveal con `Reveal`/`RevealStagger` (`src/components/site/Reveal.tsx`)
  y `MotionSection` ya existentes — fade + translateY sutil, respeta
  `prefers-reduced-motion` (ya integrado en esos componentes).
- Marquee de hashtags: scroll horizontal continuo vía CSS/`motion`, con
  `animation-play-state: paused` si `prefers-reduced-motion: reduce`.
- Sin parallax agresivo ni scroll-jacking — es contenido para leer, no un
  spectacle 3D.

## Guardrails
- No indigo/violeta.
- No cards genéricas con sombra+radio grande — ver excepción arriba.
- Fotos reales del equipo: SÍ (el cliente las entregó, `public/serpientes/hero-*.jpg`,
  acción real de juego). Se usan en el hero como imagen protagonista. Nunca fotos
  de personas FABRICADAS/generadas: las caras deben ser del equipo real. Los
  fondos de ambiente generados (cancha vacía, marcador, gradas, serpiente) siguen
  válidos para bandas de mid-page (son escenas sin personas).
- Anton (display de cartel) solo para frases CORTAS: wordmark, números, títulos,
  un punch de 1-2 líneas. Las declaraciones largas van en Inter medium editorial
  (peso ~500, leading ~1.3, medida controlada), nunca en Anton (se apelmaza en
  una pared condensada). Regla fijada tras feedback de Oscar.
- El dorado y el rojo no se usan juntos en la misma palabra/elemento salvo en
  el wordmark del hero (ahí replica el logo real, es la única excepción
  intencional).
- Cero em-dashes en copy.

## Responsive
- Mobile: StickyBar colapsa a solo ícono + wordmark chico, las dos acciones
  pasan a un menú de un toque. Grid de comparativa (3 columnas) y calendario
  semanal (7 columnas) colapsan a scroll horizontal con snap, no a columna
  apilada (para no perder la lectura de "semana completa" de un vistazo).
