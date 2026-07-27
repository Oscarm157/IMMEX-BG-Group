import { and, desc, eq, gte, ilike, sql, type SQL } from "drizzle-orm";
import { db } from "./db";
import {
  kwGrupoItems,
  kwGrupos,
  kwIdeas,
  kwRuns,
  type KwFuente,
  type KwMercado,
} from "./keywords-schema";

// Research de keywords de comercio exterior. Lo genera el motor de
// /root/google-ads-automation y lo carga scripts/import-keywords.mjs; aquí solo se lee.
// El eje es el servicio; la plaza es filtro.

/**
 * Para aparear keywords escritas a mano (las que propone el asistente) contra las
 * guardadas: "despacho de mercancías" y "despacho de mercancias" son la misma.
 */
export const normaliza = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export type ServicioResumen = {
  servicio: string;
  nacional: number;
  extranjero: number;
  total: number;
  cpc: number;
  keywords: number;
  disputa: number; // fracción de keywords con competencia alta
};

export async function getServicios(): Promise<ServicioResumen[]> {
  // La misma keyword puede venir de dos fuentes (el Planner y SEMrush miden "vucem"
  // por separado): se cuenta una sola vez por servicio y mercado, si no el volumen se dobla.
  // El CPC promedio sale solo del Planner: es puja real de subasta, no un estimado de SEO.
  const { rows } = await db.execute<{
    servicio: string; mercado: KwMercado; volumen: number;
    keywords: number; cpc: number; altas: number;
  }>(sql`
    WITH unicas AS (
      SELECT DISTINCT ON (i.servicio, r.mercado, i.keyword)
        i.servicio, r.mercado, i.keyword, i.volumen, i.competencia, i.puja_alta_usd, r.fuente
      FROM kw_ideas i
      JOIN kw_runs r ON r.id = i.run_id
      ORDER BY i.servicio, r.mercado, i.keyword, i.volumen DESC
    )
    SELECT servicio, mercado,
           sum(volumen)::int AS volumen,
           count(*)::int AS keywords,
           coalesce(avg(nullif(puja_alta_usd, 0)) FILTER (WHERE fuente = 'planner'), 0)::float AS cpc,
           count(*) FILTER (WHERE competencia = 'HIGH')::int AS altas
    FROM unicas
    GROUP BY servicio, mercado
  `);

  const porServicio = new Map<string, ServicioResumen & { _cpcs: number[]; _altas: number }>();
  for (const r of rows) {
    const actual = porServicio.get(r.servicio) ?? {
      servicio: r.servicio, nacional: 0, extranjero: 0, total: 0,
      cpc: 0, keywords: 0, disputa: 0, _cpcs: [], _altas: 0,
    };
    if (r.mercado === "nacional_es") actual.nacional += r.volumen;
    else actual.extranjero += r.volumen;
    actual.total += r.volumen;
    actual.keywords += r.keywords;
    actual._altas += r.altas;
    if (r.cpc > 0) actual._cpcs.push(r.cpc);
    porServicio.set(r.servicio, actual);
  }

  return [...porServicio.values()]
    .map(({ _cpcs, _altas, ...s }) => ({
      ...s,
      cpc: _cpcs.length ? _cpcs.reduce((a, b) => a + b, 0) / _cpcs.length : 0,
      disputa: s.keywords ? _altas / s.keywords : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

export type IdeaFila = {
  keyword: string;
  servicio: string;
  plaza: string;
  mercado: KwMercado;
  fuente: KwFuente;
  volumen: number;
  competencia: string;
  indice: number; // 0-100, qué tan disputada está la subasta
  cpcBaja: number;
  cpc: number;
  variantes: number;
  dificultad: number | null; // solo SEMrush: qué tan difícil es posicionar sin pagar
  intencion: string | null; // solo SEMrush
  serie: number[] | null; // 12 meses, para estacionalidad
};

export async function getIdeas(filtros: {
  servicio?: string;
  plaza?: string;
  mercado?: KwMercado;
  min?: number;
  q?: string;
  limite?: number;
}): Promise<IdeaFila[]> {
  const conds: SQL[] = [];
  if (filtros.servicio) conds.push(eq(kwIdeas.servicio, filtros.servicio));
  if (filtros.plaza) conds.push(eq(kwIdeas.plaza, filtros.plaza));
  if (filtros.mercado) conds.push(eq(kwRuns.mercado, filtros.mercado));
  if (filtros.min) conds.push(gte(kwIdeas.volumen, filtros.min));
  if (filtros.q) conds.push(ilike(kwIdeas.keyword, `%${filtros.q}%`));

  const filas = await db
    .selectDistinctOn([kwIdeas.keyword, kwRuns.mercado], {
      keyword: kwIdeas.keyword,
      servicio: kwIdeas.servicio,
      plaza: kwIdeas.plaza,
      mercado: kwRuns.mercado,
      fuente: kwRuns.fuente,
      volumen: kwIdeas.volumen,
      competencia: kwIdeas.competencia,
      indice: sql<number>`coalesce(${kwIdeas.indiceCompetencia}, 0)::int`,
      cpcBaja: sql<number>`coalesce(${kwIdeas.pujaBajaUsd}, 0)::float`,
      cpc: sql<number>`coalesce(${kwIdeas.pujaAltaUsd}, 0)::float`,
      variantes: kwIdeas.variantes,
      dificultad: kwIdeas.dificultadSeo,
      intencion: kwIdeas.intencion,
      serie: kwIdeas.serie12m,
    })
    .from(kwIdeas)
    .innerJoin(kwRuns, eq(kwIdeas.runId, kwRuns.id))
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(kwIdeas.keyword, kwRuns.mercado, desc(kwIdeas.volumen));

  return filas
    .sort((a, b) => b.volumen - a.volumen)
    .slice(0, filtros.limite ?? 150);
}

/** Las plazas con research, para el filtro secundario. */
export async function getPlazas(): Promise<Array<{ plaza: string; keywords: number }>> {
  const { rows } = await db.execute<{ plaza: string; keywords: number }>(sql`
    WITH unicas AS (
      SELECT DISTINCT ON (i.plaza, r.mercado, i.keyword) i.plaza
      FROM kw_ideas i
      JOIN kw_runs r ON r.id = i.run_id
      ORDER BY i.plaza, r.mercado, i.keyword, i.volumen DESC
    )
    SELECT plaza, count(*)::int AS keywords FROM unicas GROUP BY plaza ORDER BY 2 DESC`);
  return rows;
}

export async function getResumen() {
  const { rows: totales } = await db.execute<{
    keywords: number; volumen: number; servicios: number;
  }>(sql`
    WITH unicas AS (
      SELECT DISTINCT ON (i.servicio, r.mercado, i.keyword) i.servicio, i.volumen
      FROM kw_ideas i
      JOIN kw_runs r ON r.id = i.run_id
      ORDER BY i.servicio, r.mercado, i.keyword, i.volumen DESC
    )
    SELECT count(*)::int AS keywords, coalesce(sum(volumen), 0)::int AS volumen,
           count(DISTINCT servicio)::int AS servicios
    FROM unicas`);
  const r = totales[0];
  const [ultima] = await db
    .select({ fecha: kwRuns.corridaEn })
    .from(kwRuns)
    .orderBy(desc(kwRuns.corridaEn))
    .limit(1);
  return { ...r, corridaEn: ultima?.fecha ?? null };
}

// ---- Grupos ----

export type GrupoResumen = {
  id: string;
  nombre: string;
  servicio: string;
  plaza: string | null;
  mercado: KwMercado;
  estado: string;
  keywords: number;
  volumen: number;
  cpc: number; // ponderado por volumen: una keyword de 4,000 pesa más que una de 20
  disputa: number;
  techoClics: number; // lo máximo que da la demanda del grupo, no lo que paga el presupuesto
  costoMes: number;
  actualizado: Date | null;
};

// Clics techo = cobertura × CTR, los mismos defaults de la calculadora (65% × 8% ≈ 5.2%).
// El ranking no tiene sliders, así que usa el default; la calculadora sí deja ajustarlo.
const COBERTURA_DEFAULT = 0.65;
const CTR_DEFAULT = 0.08;
const CAPTURA_MAXIMA = COBERTURA_DEFAULT * CTR_DEFAULT;

export async function getGrupos(): Promise<GrupoResumen[]> {
  const { rows } = await db.execute<{
    id: string; nombre: string; servicio: string; plaza: string | null; mercado: KwMercado;
    estado: string; keywords: number; volumen: number; cpc: number; altas: number;
    actualizado: string | null;
  }>(sql`
    SELECT g.id, g.nombre, g.servicio, g.plaza, g.mercado, g.estado,
           count(i.id)::int AS keywords,
           coalesce(sum(i.volumen), 0)::int AS volumen,
           coalesce(
             sum(i.cpc * i.volumen) FILTER (WHERE i.cpc > 0)
             / nullif(sum(i.volumen) FILTER (WHERE i.cpc > 0), 0), 0
           )::float AS cpc,
           count(*) FILTER (WHERE i.competencia = 'HIGH')::int AS altas,
           g.updated_at AS actualizado
    FROM kw_grupos g
    LEFT JOIN kw_grupo_items i ON i.grupo_id = g.id
    GROUP BY g.id
  `);

  return rows
    .map((r) => {
      const techoClics = r.volumen * CAPTURA_MAXIMA;
      return {
        id: r.id, nombre: r.nombre, servicio: r.servicio, plaza: r.plaza,
        mercado: r.mercado, estado: r.estado,
        keywords: r.keywords, volumen: r.volumen, cpc: r.cpc,
        disputa: r.keywords ? r.altas / r.keywords : 0,
        techoClics,
        costoMes: techoClics * r.cpc,
        actualizado: r.actualizado ? new Date(r.actualizado) : null,
      };
    })
    .sort((a, b) => b.volumen - a.volumen);
}

export async function getGrupo(id: string) {
  const [grupo] = await db.select().from(kwGrupos).where(eq(kwGrupos.id, id));
  if (!grupo) return null;
  const items = await db
    .select()
    .from(kwGrupoItems)
    .where(eq(kwGrupoItems.grupoId, id))
    .orderBy(desc(kwGrupoItems.volumen));
  return { grupo, items };
}

/** Grupos en la lista corta del explorador, para agregar keywords sin salir de la tabla. */
export async function getGruposBreve() {
  return db
    .select({
      id: kwGrupos.id,
      nombre: kwGrupos.nombre,
      servicio: kwGrupos.servicio,
    })
    .from(kwGrupos)
    .orderBy(desc(kwGrupos.updatedAt));
}
