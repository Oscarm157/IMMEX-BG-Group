# Rediseño CRM — calidad mundial (dark, familia Linear/Rox)

Estado: contrato vivo. Fuente de verdad para todos los agentes de build.
Rama: `crm-redesign-mundial` (a crear desde `admin-redesign-ui`).

## Objetivo
Llevar el panel admin/CRM de BG de "admin navy genérico" a un CRM dark de calidad
producto (familia Linear / Rox / Attio). Estándar y reutilizable: la marca vive en
UNA variable de acento (`--crm-accent`), el resto del scaffold es neutro re-marcable.

## Reference lock (no promediar)
- **North star primario — Rox (run.rox.com), dark CRM**: sidebar de iconos angosto,
  control-bar delgado, tabla densa compacta, **stage pills con color de estado**,
  board view, slide-over para crear. Esta es la dirección madre.
- **Detalle de lead — Attio (person detail)**: 3 columnas → nav / timeline de actividad
  con tabs / sidebar de detalles editables. Jerarquía por columnas, no por bordes.
- **Dashboard — Cake Equity / Shopify analytics (oscurecido)**: KPI cards arriba,
  donut/funnel + tabla con ritmo. Números tabulares, no decoración.

Decision ledger: cada decisión mayor traza a una de estas 3 refs o a un token de abajo.

## Principios duros (anti "anticuado")
1. **Elevación por capa de color + hairline, NO por sombra.** Sombra solo en overlays
   (popover/modal/dropdown). Cero `shadow-sm` decorativo en cards.
2. **Neutros crisp casi-negros** con leve frío, no navy embarrado. Contraste real entre capas.
3. **Acento mint con disciplina**: estado activo, foco, 1 dato clave por vista. Nunca relleno masivo.
4. **Tipografía con escala y números tabulares** (`tabular-nums` en toda métrica/moneda/fecha).
5. **Headers de tabla NO uppercase.** 12px, peso 500, `--crm-ink-mute`, sentence-case.
6. **Densidad cómoda** (filas ~40-44px), sticky header, hover sutil por lift de capa.
7. **Micro-motion presente desde v1**: entradas escalonadas, hover/press, drag con peso.
   Respetar `prefers-reduced-motion`.
8. **Cero AI slop en copy**: español corporativo, sin em-dashes, sin frases huecas, datos reales.

## Tokens (definidos en globals.css → `.crm-root`)
Scaffold neutro casi-negro frío; mint = único acento de marca; navy = toque de marca puntual.
- Canvas/superficies: `--crm-bg`, `--crm-surface`, `--crm-surface-2`, `--crm-surface-3`
- Hairlines: `--crm-line`, `--crm-line-strong`
- Texto: `--crm-ink`, `--crm-ink-soft`, `--crm-ink-mute`, `--crm-ink-faint`
- Acento marca (swappable): `--crm-accent`, `--crm-accent-soft`, `--crm-accent-strong`, `--crm-accent-tint`, `--crm-accent-tint-2`, `--crm-accent-ring`, `--crm-on-accent`
- Marca navy puntual: `--crm-brand-navy`
- Radios: `--crm-r-sm 6px`, `--crm-r-md 8px`, `--crm-r-lg 10px`, `--crm-r-xl 14px`
- Sombra overlay: `--crm-shadow-pop`
- Alias legacy `--crm-wine*` siguen apuntando a `--crm-accent*` (no romper componentes existentes).

## Primitivas (las construye el loop principal, NO los agentes de superficie)
- `globals.css`: tokens + utilidades `.crm-*` refinadas (card, btn, input, table, tab, badge, empty, dropzone, type scale).
- `components/ui/{button,card,badge,table,input,tabs}.tsx`: retematizadas al sistema.
- `components/crm/status.tsx`: pills de estado/origen + avatar refinados.
- `components/crm/PageShell.tsx`: **NUEVO**. `<PageHeader eyebrow title actions>` + contenedor.
  Toda superficie usa este shell. Patrón: eyebrow mute + h1 + fila de acciones a la derecha.
- `components/crm/Modal.tsx`, `components/crm/ui/Select.tsx`, `components/crm/ui/Tooltip.tsx`: refinadas (overlay con blur, motion, sombra pop).

## Reparto de agentes (archivos disjuntos, sin pisarse)
Cada agente: lee este spec + `globals.css` + primitivas YA refinadas. Aplica el sistema.
NO toca tokens ni primitivas compartidas. NO corre dev/build (lo hace el loop al final).
Usa `PageShell` para el header. `tabular-nums` en números. Motion en entradas y hover.

- **A1 Dashboard**: `dashboard/page.tsx` + `components/crm/dashboard/*`
- **A2 Board**: `board/page.tsx` + `BoardView/BoardColumn/BoardCard`
- **A3 Leads lista**: `(panel)/page.tsx` + `LeadFilters`, `NewLeadModal`
- **A4 Lead detalle**: `[id]/page.tsx` + `LeadDetailsForm, StatusControl, OwnerControl, Activity, Files, CommentForm, DeleteLeadButton, Breadcrumb`
- **A5 Usuarios+Perfil**: `users/page.tsx`, `profile/page.tsx` + `AddUserModal, EditUserModal, UserRowActions, ProfileForm`
- **A6 Blog**: `blog/page.tsx`, `blog/[id]/page.tsx`, `blog/new/page.tsx`
- **A7 Ads**: `ads/page.tsx`, `ads/new/page.tsx`, `ads/[id]/page.tsx` + `ads/AdForm`
- **A8 Posts**: `posts/page.tsx` + `components/crm/posts/*`
- Layout/sidebar (`layout.tsx`, `AppSidebar.tsx`): los refina el loop con la fundación.

## Excepciones acordadas
- **Vistas de detalle (lead `[id]`, ad `[id]`) usan record-header propio**, no `PageHeader`:
  avatar/nombre + meta + controles de estado/owner + acciones, al estilo del record-detail de
  Attio. Consistente en tokens y escala (`crm-h1`), pero deliberadamente más rico que el
  header de las vistas de lista. `PageHeader` queda para listas y dashboard.
- **Deuda compartida heredada (no introducida por este rediseño, fuera de alcance):**
  `AVATAR_COLORS` en `status.tsx`/`users` y el estado "Programada" del blog usan paleta
  Tailwind nativa, no tokens; no se re-marcan con `--crm-accent`. Pendiente de tokenizar aparte.

## Criterios de aceptación
- [ ] `next build` y `tsc` pasan sin errores nuevos. Sin cambios de lógica/datos (solo presentación).
- [ ] Ninguna tabla con header uppercase. Todos los números con `tabular-nums`.
- [ ] Toda superficie usa `PageShell`; headers consistentes en las 8 vistas.
- [ ] Acento mint usado con disciplina (no rellenos masivos). Elevación por capa, no sombra.
- [ ] Cambiar `--crm-accent` re-marca el CRM completo sin tocar componentes.
- [ ] Motion presente y `prefers-reduced-motion` respetado.
- [ ] Copy sin em-dashes, sin slop, español corporativo. Sin inventar datos.
- [ ] Mismas props/contratos de datos; no se rompe DnD, filtros, paginación, permisos.
