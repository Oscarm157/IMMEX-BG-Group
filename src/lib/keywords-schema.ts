import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  jsonb,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============================================================
// Planificador de pauta. Research de keywords de comercio exterior,
// generado fuera del repo (/root/google-ads-automation) y cargado con
// scripts/import-keywords.mjs. El repo es público: aquí solo vive el
// esquema, nunca los datos.
// El eje principal es el SERVICIO (IMMEX, aduanal, VUCEM…); la plaza
// es filtro secundario, porque la decisión de contratar consultoría
// aduanera se toma desde la matriz, no desde la frontera.
// ============================================================

/** Líneas de servicio de BG. Es el mismo diccionario que clasifica el research
 *  en /root/google-ads-automation/brief_kw_bg_es.json: si cambia allá, cambia aquí. */
export const SERVICIOS = [
  "IMMEX",
  "Aduanal",
  "VUCEM",
  "Certificaciones",
  "Clasificacion",
  "Compliance",
  "T-MEC",
  "Tecnologia",
  "Fiscal y legal",
  "Sin clasificar",
] as const;
export type KwServicio = (typeof SERVICIOS)[number];

/** Cómo se escribe cada servicio en pantalla. El valor guardado va sin acentos
 *  porque viene del clasificador, que normaliza. */
export const ETIQUETA_SERVICIO: Record<string, string> = {
  Clasificacion: "Clasificación",
  Tecnologia: "Tecnología",
};
export const etiquetaServicio = (s: string) => ETIQUETA_SERVICIO[s] ?? s;

export type KwMercado = "nacional_es" | "extranjero_en";
/** De dónde salió la fila: cambia cómo se lee la competencia. */
export type KwFuente = "planner" | "semrush";

export const kwRuns = pgTable("kw_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  brief: text("brief").notNull(), // nombre del brief o del export que la generó
  fuente: text("fuente").$type<KwFuente>().default("planner").notNull(),
  mercado: text("mercado").$type<KwMercado>().notNull(),
  geo: text("geo").notNull(), // "México" / "Estados Unidos"
  idioma: text("idioma").notNull(),
  tipoCambio: numeric("tipo_cambio", { precision: 6, scale: 2 }),
  total: integer("total").notNull(),
  corridaEn: timestamp("corrida_en", { withTimezone: true }).defaultNow(),
});

export const kwIdeas = pgTable(
  "kw_ideas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    runId: uuid("run_id")
      .notNull()
      .references(() => kwRuns.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    servicio: text("servicio").notNull(), // IMMEX | Aduanal | VUCEM | …
    plaza: text("plaza").notNull(),
    volumen: integer("volumen").notNull(),
    competencia: text("competencia").notNull(), // LOW | MEDIUM | HIGH
    indiceCompetencia: integer("indice_competencia"),
    pujaBajaUsd: numeric("puja_baja_usd", { precision: 8, scale: 2 }),
    pujaAltaUsd: numeric("puja_alta_usd", { precision: 8, scale: 2 }),
    variantes: integer("variantes").default(1).notNull(),
    serie12m: jsonb("serie_12m").$type<number[]>(),
    // Solo las trae SEMrush; en las del Planner quedan nulas.
    dificultadSeo: integer("dificultad_seo"),
    intencion: text("intencion"),
  },
  (t) => [
    index("kw_ideas_servicio_idx").on(t.servicio),
    index("kw_ideas_plaza_idx").on(t.plaza),
    index("kw_ideas_run_idx").on(t.runId),
  ],
);

export type KwRun = typeof kwRuns.$inferSelect;
export type KwIdea = typeof kwIdeas.$inferSelect;

// ---- Grupos de keywords (futuros grupos de anuncios) ----
// Un grupo = un servicio, que es lo que Google Ads espera para que el anuncio hable de lo
// mismo que la keyword. El snapshot de métricas vive en el item para que el grupo sobreviva
// a una corrida nueva del research.
export type KwEstado = "borrador" | "listo" | "lanzado";

export const kwGrupos = pgTable("kw_grupos", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
  servicio: text("servicio").notNull(),
  plaza: text("plaza"), // opcional: hay grupos nacionales sin plaza
  mercado: text("mercado").$type<KwMercado>().notNull(),
  estado: text("estado").$type<KwEstado>().default("borrador").notNull(),
  notas: text("notas"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const kwGrupoItems = pgTable(
  "kw_grupo_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    grupoId: uuid("grupo_id")
      .notNull()
      .references(() => kwGrupos.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    volumen: integer("volumen").notNull(),
    cpc: numeric("cpc", { precision: 8, scale: 2 }),
    competencia: text("competencia").notNull(),
    agregadaEn: timestamp("agregada_en", { withTimezone: true }).defaultNow(),
  },
  (t) => [uniqueIndex("kw_grupo_items_unicos").on(t.grupoId, t.keyword)],
);

export type KwGrupo = typeof kwGrupos.$inferSelect;
export type KwGrupoItem = typeof kwGrupoItems.$inferSelect;
