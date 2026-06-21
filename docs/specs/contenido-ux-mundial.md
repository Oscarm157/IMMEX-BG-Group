# Spec — Contenido CRM (Blog · Posts · Usuarios · Perfil) a calidad mundial

## Objetivo
Subir la UI/UX de las cuatro superficies de "contenido y cuenta" del panel al nivel del CRM ya
rediseñado (dark refinado tipo Linear, tokens `.crm-root`). Restructura audaz donde aporta, fixes
funcionales donde falta, y verificación end-to-end de que **todo siga funcionando**.

Decisión de Oscar: **Restructura audaz** + fan-out (3 build + 2 review). No push hasta verificar.

## Sistema de diseño (ya existe, NO se reinventa)
Tokens `.crm-root` en `globals.css`: `--crm-bg/surface/surface-2/surface-3`, `--crm-ink/ink-soft/
ink-mute/ink-faint`, `--crm-line/line-strong`, acento mint `--crm-accent/-soft/-strong/-tint/-ring`,
`--crm-on-accent`, radios `--crm-r-sm/md/lg/xl`. Clases: `.crm-card .crm-input .crm-textarea
.crm-select .crm-btn(.-primary/-secondary/-ghost/-sm) .crm-table .crm-thead .crm-th .crm-row .crm-td
.crm-badge .crm-empty .crm-h1 .crm-h2 .crm-eyebrow .crm-num .crm-fade .crm-scroll .crm-dropzone`.
Componentes: `PageHeader/SectionHeader` (PageShell), `Breadcrumb`, `Modal`, `Tabs` (ui/tabs, variante
`line`). **Regla dura: NO editar `globals.css`** (evita choques entre agentes en paralelo). Si haría
falta una clase nueva, resuélvelo con utilidades Tailwind inline reusando los tokens `var(--crm-*)`.

## Reglas (CLAUDE.md)
- Profundidad estructural, no "bordecitos". Familias de layout distintas por zona.
- Elevación por capa + hairline, no sombra. Mint con disciplina. `crm-num` en todo número. Headers de
  tabla sin uppercase. Motion con `prefers-reduced-motion`. Sin em-dashes en copy. Cero datos inventados.
- Cambiar solo lo necesario. Cero cambios en server actions, names de FormData, permisos ni queries.
  Preservar exactamente los contratos: `draftArticle, updateArticle, publishArticle, unpublishArticle,
  deleteArticle` (blog-actions), `createUser, resetUserPassword, setUserActive, updateUserRole`
  (users-actions), `updateProfile` (actions), y los endpoints `/admin/posts/extract|generate`.

## Reference lock (Refero)
- **Índice de blog → Webflow CMS "Blog Posts"** (refero df5cc539): toolbar superior con búsqueda a la
  izquierda + filtro de estado + CTA primario "Nueva nota" a la derecha, sobre una tabla dark; estado
  como pill con color. Detalle prestado: **Zendesk dashboards** (169f3668) → tabs de segmento
  (Todas / Publicadas / Programadas / Borradores) + búsqueda + empty state centrado.
- **Editor de blog → Anthropic Workbench** (refero b41eff64): split de dos panes, toggle **Markdown /
  Texto** por campo de cuerpo, barra de acción **sticky** abajo con conteo de caracteres. Detalle
  prestado: **Manus** (bb62d9c6) → metadata como inspector lateral derecho; **Cursor** (e79e23c8) →
  superficie markdown dark.
- **Usuarios / Perfil**: se quedan dentro del sistema ya lockeado (Attio/Linear del rediseño CRM).
  Única deuda a saldar: **avatares de colores chillantes → neutrales tintados de marca**.

## Decisiones de ancho (consistencia)
Anchos de contenido hoy: blog list 1200, blog new 780, blog edit 880, posts 1100, users/profile 1380
(heredado del `<main>`). Unificar a una escala intencional:
- Índices/tablas (blog list, users): `max-w-[1280px]`.
- Editores/forms largos (blog edit, blog new): `max-w-[960px]` (editor split puede ir a 1100 si usa
  dos panes). Posts se queda en 1100.
- Perfil: queda en el 1380 heredado pero el contenido vive en su grid.
Cada página fija su propio `mx-auto max-w-[...]` (el `<main>` global quedó en 1380).

---

## Partición de agentes (build, en paralelo, experto-frontend)

### Agente A — Índice de Blog
Archivo: `src/app/admin/(panel)/blog/page.tsx` (+ componente nuevo `src/components/crm/blog/BlogIndex.tsx`
client si se necesita interacción de filtro/búsqueda).
- Toolbar: búsqueda por título (client, filtra la lista ya cargada), tabs de estado (Todas/Publicadas/
  Programadas/Borradores) con conteos, CTA "Nueva nota" primario a la derecha.
- Filas ricas: miniatura de portada (`coverUrl`, con placeholder cuando no hay), título + extracto
  (`excerptEs`) truncado a 1 línea, categoría como badge, estado pill, fuente (`sourceName`) y fecha
  `updatedAt` con `crm-num`. Mantener click a `/admin/blog/[id]`.
- Empty state ya existe (reusar el patrón `.crm-empty`). Conserva la cabecera de conteo.
- Datos disponibles por artículo: `id, slug, titleEs, titleEn, excerptEs, category, status, featured,
  coverUrl, sourceName, updatedAt` (de `getAllArticles()`; verifica el shape en `src/lib/blog/data.ts`).
- NO toca el editor ni new.

### Agente B — Editor + Nueva nota
Archivos: `src/app/admin/(panel)/blog/[id]/page.tsx`, `src/app/admin/(panel)/blog/new/page.tsx`,
componentes nuevos: `src/components/crm/blog/ArticleEditor.tsx` (client), `MarkdownPreview.tsx` (client,
react-markdown con tokens `crm-*` — NO reusar `site/Markdown.tsx`, usa otra paleta), y
`DeleteArticleButton.tsx` (client, confirmación con `Modal`).
- Editor: reestructurar el form apilado en **idiomas como tabs ES | EN** (`Tabs` variante line). En cada
  idioma: título, extracto, cuerpo (Markdown) y recomendaciones (Markdown). Cada textarea de cuerpo con
  toggle **Escribir / Vista** (preview en vivo con `MarkdownPreview`). Meta (slug, categoría, fuente,
  url, fecha, portada, destacada) como **panel/inspector** aparte (sección colapsable o columna). Barra
  **sticky** de guardar abajo (ya existe, conservar). MISMOS `name=` de FormData y el mismo
  `<form action={save}>`. El form debe seguir enviando todos los campos aunque estén en tabs ocultas
  (los inputs deben permanecer montados; usa `hidden` por CSS, no desmontar la tab inactiva, o inputs
  controlados con hidden mirrors — lo que garantice que el submit lleve ES y EN).
- **Borrar con confirmación**: `DeleteArticleButton` abre `Modal` ("¿Borrar esta nota? No se puede
  deshacer.") y al confirmar dispara el `<form action={remove}>`. Hoy borra sin confirmar: arréglalo.
- Botones publicar/despublicar/ver publicada: conservar lógica, integrarlos limpio en el header.
- **Nueva nota**: agrega estado de carga al "Generar borrador". Como es un server action con `<form>`,
  usa un submit button con `useFormStatus` (componente client pequeño) que muestre spinner + "Generando
  borrador…" y deshabilite. NO cambiar `draftArticle` ni los `name=` (`source, sourceName, category,
  sourceUrl, sourceDate`).

### Agente C — Usuarios + Perfil + reconciliación de avatares
Archivos: `src/app/admin/(panel)/users/page.tsx`, `src/app/admin/(panel)/profile/page.tsx`, y la fuente
compartida de color de avatar.
- **Avatares de marca**: hoy `users/page.tsx` define `AVATAR_COLORS` chillantes (rose/amber/emerald/
  blue/violet/teal/orange/indigo) y `status.tsx` (`OwnerChip`) tiene su propia copia. Crear UN helper
  compartido `src/components/crm/avatar.ts` (`initials(name)` + `avatarClass(seed)`) que devuelva
  neutrales tintados de marca: fondo `--crm-surface-3` con texto `--crm-ink-soft`, o una rampa sobria
  derivada del mint (p.ej. tints de acento + grises), nunca colores saturados de arcoíris. Refactorizar
  `users/page.tsx` Y `status.tsx OwnerChip` para usar el helper (consistencia en leads/board también).
  Mantén el hashing por `id` para color estable por persona.
- **Usuarios**: pulir la tabla (ya funcional). Considera un strip de KPIs arriba (total · activas · por
  rol) estilo KeyFacts si suma claridad; conserva `UserRoleSelect`, `UserRowActions`, `AddUserModal`.
- **Perfil**: agregar avatar grande (con el helper nuevo) en la cabecera de "Datos personales", y
  refinar la composición de las dos tarjetas (rol + contraseña). Sin tocar `updateProfile`.
- NO toca blog ni posts.

## Posts (lo verifico yo, fuera de los agentes)
Ya pulido. Solo verificación funcional end-to-end (extract text/url/pdf → generate → copiar variantes)
y pulido menor si aparece algo. No reestructurar.

---

## Verificación (loop principal, después de integrar)
1. Leer cada diff. `npx tsc --noEmit` verde y `npx next build` verde.
2. `revisor-codigo`: contratos intactos (actions, FormData names, permisos), sin lógica redundante ni
   código muerto, los inputs ocultos de tabs sí se envían.
3. `critico-anti-slop`: copy de toolbars, tabs, empty states, confirmaciones, microcopy (sin frases
   huecas, sin em-dashes, registro correcto ES).
4. Preview en :3200 y recorrido manual de cada flujo (crear/editar/publicar/borrar nota con confirmación,
   generar post, alta/edición/reset/rol de usuario, editar perfil).
5. Push de la rama `crm-redesign-mundial`.

## Fuera de alcance
- Persistir resultados del generador de posts entre recargas.
- Editor WYSIWYG real (se queda Markdown + preview).
- Borrado duro de usuarios (se mantiene activar/desactivar).
