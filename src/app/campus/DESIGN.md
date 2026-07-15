# DESIGN.md — Campus BG

Dirección visual del Campus de capacitación, servido en `campus.bgconsultingroup.com`.
Hereda el sistema de marca de BG Consulting Group (navy-charcoal + mint, del sitio) pero
se construye como experiencia diferenciada tipo MasterClass, NO como el LMS plano de
plantilla. Todo scopeado bajo `.campus-root` (no filtra al sitio público ni al CRM).

## Reference lock
- **Referencia primaria (acabado):** **MasterClass** (masterclass.com). Catálogo cinematográfico:
  portadas grandes con retrato/imagen a sangre, overlay oscuro, título display sobre la imagen,
  hover que revela progreso/CTA. La sensación es "biblioteca premium de video", no "temario escolar".
  Se toma: escala de imagen protagonista, jerarquía tipográfica fuerte, oscuridad envolvente,
  un solo acento de acción.
- **Anclaje de marca (no negociable):** el design system de BG en `src/app/globals.css`
  (mint `#00e6a0`, ink `#0f1521`, superficies por capas, Space Grotesk / Inter / Instrument Serif /
  IBM Plex Mono). El campus NO inventa paleta; reusa la de BG. El mint es la "señal" de marca y
  de acción, igual que en el sitio.
- **Patrón concreto del player:** LMS de video de dos columnas (sidebar-árbol de la categoría +
  columna de contenido con topbar de progreso y prev/next). Se toma la ESTRUCTURA funcional del
  Campus ORVE 2.0 (sidebar con estados check/anillo/vacío, "X/Y", breadcrumb, Mark Complete), NO
  su acabado.
- **Anti-referencia (qué evitar):** el look LearnDash/WordPress del Campus ORVE 2.0 de la captura:
  cabecera negra plana, cards genéricas con borde+sombra, verde saturado tipo semáforo, checks
  circulares default, todo la misma familia de layout. Eso lee a plantilla. El campus rompe eso.

## Decision ledger (cada decisión mayor → fuente)
- Catálogo con portadas grandes a sangre + overlay → MasterClass.
- Oscuro envolvente + elevación por capa de color y hairline (no sombra pesada) → BG globals.css
  (modelo Warp/Linear ya adoptado por el sitio).
- Mint como único acento de acción y de "completado" → sistema BG (mint = señal).
- Progreso y métricas en mono tabular → BG (`--font-mono`, patrón de eyebrows/números del sitio).
- Familias de layout distintas por superficie (catálogo ≠ categoría ≠ player) → regla anti-slop de
  Oscar (secciones hermanas cada una distinta; evita el plano de ORVE).
- Sidebar-árbol con estados + topbar de progreso + Mark Complete → estructura funcional ORVE/PRD.

## Tema y atmósfera
Oscuro, cinematográfico, sobrio-premium. Consultoría seria (comercio exterior, fiscal), no edu-tech
juguetón: la energía es "acceso exclusivo a conocimiento de la firma", biblioteca oscura con la
señal mint encendida. Depth por capas de superficie + grano sutil, nunca por gradientes ruidosos.

## Paleta (roles semánticos — todos ya en globals.css, sin tokens nuevos)
- **Fondo / superficies:** `--color-ink #0f1521` (canvas), `--color-surface-1 #18202e` (paneles /
  sidebar), `--color-surface-2 #1f2838` (cards), `--color-surface-3 #283246` (hover / activo),
  `--color-line #313c4f` (hairline).
- **Texto:** `--color-chalk #f6f8fa` (primario), `--color-bone #ccd2dc` (cuerpo/secundario),
  `--color-smoke #a6adbb` (labels), `--color-ash #818996` (micro-labels).
- **Acento mint `--accent #00e6a0`:** señal de marca Y de acción (un solo acento). Usos: progreso
  (barra y %), estado COMPLETADO (check), CTA primario, link activo del sidebar, focus ring. Hover
  `--color-accent-dim #00c489`; sobre superficie clara `--color-accent-ink #0b7d5a`; texto sobre
  mint `--color-on-accent #04231a`.
- **Navy de marca `--color-navy #284068`:** toque puntual (badges de categoría, acentos), no área.
- **Interludios claros (opcional, para cortar el dark):** `--color-paper #eef1f6` +
  `--color-graphite #46506b`. Uso medido: página de perfil o un panel de resumen, no el player.
- **Estados de progreso (los 3 del PRD):**
  - Completado = check mint sólido (`--accent`).
  - En progreso = anillo parcial mint sobre `--color-line` (arc, no relleno).
  - No iniciado = círculo `--color-line` vacío, ícono en `--color-ash`.
  - NO usar verde-semáforo saturado ni rojo/amarillo; el único verde es el mint de marca.

## Tipografía (todo ya cargado en el root layout, no se paga fuente nueva)
- **Display / títulos de curso y hero:** **Space Grotesk** (`--font-display`), tracking apretado
  (-0.02em). Títulos grandes sobre portada, headline de categoría, nombre del video.
- **Cuerpo / intro y desglose (lectura larga):** **Inter** (`--font-sans`), 16-17px, leading ~1.72
  (medida ~680-720px en el player, como el `/documento` de serpientes).
- **Eyebrows / labels / progreso / contadores:** **IBM Plex Mono** (`--font-mono`), mayúsculas,
  tracking amplio (~0.08-0.12em). "CATEGORÍA", "6/23 VIDEOS", "26% COMPLETADO", números de orden.
  Números siempre tabulares (`font-variant-numeric: tabular-nums`).
- **Acento editorial (medido):** **Instrument Serif** (`--font-serif`) para 1 gesto por superficie
  (ej. una cita o el subtítulo de una categoría), no para UI. No abusar: es sazón, no sistema.

## Componentes
- **Course/Category card (catálogo):** imagen a sangre con overlay oscuro inferior
  (`linear-gradient` a `--color-ink`), título en Space Grotesk sobre la imagen, eyebrow mono de
  categoría, barra de progreso mint fina al pie. Radio contenido (12-14px), sin sombra pesada;
  `.card-elev` para el hairline+inset. Hover: sube la imagen (scale sutil) + revela % y CTA. NO la
  card genérica de borde+sombra.
- **Category hero (página de categoría):** banda oscura con imagen de portada grande + overlay,
  título display, descripción Inter, barra de progreso de la categoría (% + X/Y en mono), y lista
  de videos debajo con su estado. Familia de layout distinta a la del catálogo.
- **Player (pantalla de video) — dos columnas:**
  - Sidebar (izq, `--color-surface-1`, colapsable/ocultable): lista de videos de la categoría, cada
    uno con ícono de estado (check/anillo/vacío) + título; activo resaltado con mint tint. Scroll
    interno fino (`--color-line-strong`).
  - Topbar fija: barra de progreso de la categoría (track `--color-line`, fill `--accent` con
    `.signal-glow` sutil) + "26% · 6/23" en mono, botones Prev/Next video, logo BG.
  - Columna de contenido: breadcrumb mono (Categoría › Video) + insignia COMPLETADO (badge mint),
    luego los bloques (ver abajo) en columna ~680-720px. Footer: Prev/Next + "Volver a la categoría".
- **Block renderer:**
  - Text (intro/desglose): Markdown estilo BG (reusar patrón de `components/site/Markdown.tsx`),
    h2 display con regla mint, cuerpo `--color-bone`, bullets mint.
  - Video: embed YouTube 16:9 lazy, contenedor `--color-surface-1` con hairline, sin cromo extra.
  - Button: `PillButton` (variante accent/ghost) a enlace externo, con flecha en hover.
  - Image: figura con blob + caption en `--color-smoke`, hairline.
- **Quiz:** panel `--color-surface-1` con hairline; pregunta en Space Grotesk mid; opciones como
  filas seleccionables (radio custom, hover `--color-surface-3`, seleccionado borde mint); al
  enviar, correcta = mint, incorrecta = `#f0503f` tenue; resultado "X/Y correctas" en mono +
  estado aprobado (badge mint). Marca el step como completado.
- **Botones:** `PillButton` del sitio (primario = relleno mint + texto on-accent; ghost = borde
  `--color-line` + chalk). Sin sombras.
- **Barra de progreso:** track `--color-line` 3-4px, fill `--accent`; en topbar con glow sutil, en
  cards sin glow. % y X/Y siempre en mono tabular a un lado.

## Sistema de superficies (rompe el dark monótono, cada vista una familia)
- **Catálogo:** grid de cards image-led, oscuro envolvente, la imagen manda.
- **Categoría:** hero de banda con imagen + lista editorial de videos (tipográfica, numerada), otra
  forma que el grid.
- **Player:** dos columnas funcional, la más "instrumento" (grid-field sutil de fondo permitido,
  `.console-panel` en el topbar).
- **Perfil:** puede usar un interludio claro (`--color-paper`) para contraste, con el avance global.
  Regla: dos vistas hermanas nunca comparten la misma familia de layout.

## Motion
- Scroll-reveal con `Reveal`/`RevealStagger` (`src/components/site/Reveal.tsx`) y ease editorial
  `[0.16, 1, 0.3, 1]` (`src/lib/motion.ts`). Fade + translateY sutil; respeta `prefers-reduced-motion`.
- Card hover: scale de imagen ~1.03 + revelado de meta, transición ~200ms.
- Barra de progreso: anima el fill al marcar completado (width transition + glow pulse único).
- Sidebar colapsable: `AnimatePresence` de ancho, mismo ease. Sin scroll-jacking ni parallax pesado.

## Guardrails
- No cards genéricas de borde+sombra+radio grande estilo plantilla. Depth por capa + hairline.
- Un solo acento: mint. No introducir un segundo color de acción. Verde solo el mint de marca (no
  verde-semáforo).
- Familias de layout distintas por vista (catálogo ≠ categoría ≠ player ≠ perfil). Tres vistas con
  la misma forma leen planas.
- Imágenes de portada: reales o generadas con intención (atmósfera de la firma / tema del curso),
  NUNCA stock genérico ni retratos fabricados de personas. Si no hay imagen, placeholder art-dirigido
  con aspect ratio, no un bloque gris vacío.
- Instrument Serif solo como acento medido, nunca para UI ni lectura larga.
- Cero em-dashes en copy (comas, dos puntos, punto). Copy en español, factual, sin humo.
- Números (progreso, orden, contadores, resultados de quiz): mono tabular siempre.

## Responsive
- Catálogo: grid 3→2→1 columnas; la imagen nunca pierde protagonismo.
- Player: en mobile el sidebar-árbol colapsa a un drawer (botón "Contenido"), la columna de video
  pasa a ancho completo, la topbar de progreso se mantiene fija y compacta (% + X/Y).
- Quiz y bloques: ancho completo con padding cómodo; el embed de YouTube mantiene 16:9.
