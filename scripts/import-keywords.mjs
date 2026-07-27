// Carga el research de keywords a la base.
//
//   node --env-file=.env.local scripts/import-keywords.mjs
//
// Dos fuentes, cada una en su corrida:
//   - planner: CSV que genera /root/google-ads-automation/keyword_ideas.py
//   - semrush: el export que pasó Oscar (trae dificultad SEO e intención, que el Planner no da)
//
// Los CSV NO viven en el repo a propósito: Oscarm157/IMMEX-BG-Group es público y el research
// le sirve a cualquier competidor. Ojo: no correr esto con `source .env.local`, el & del
// DATABASE_URL de Neon rompe la cadena.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const ORIGEN = "/root/google-ads-automation";
const sql = neon(process.env.DATABASE_URL);

// El brief manda: de ahí salen los servicios y las plazas. La clasificación se rehace
// aquí para las tres fuentes, así afinar el diccionario no obliga a volver a pegarle
// a la API: se corrige el brief y se reimporta.
const briefEs = JSON.parse(readFileSync(`${ORIGEN}/brief_kw_bg_es.json`, "utf8"));
const briefEn = JSON.parse(readFileSync(`${ORIGEN}/brief_kw_bg_en.json`, "utf8"));

const CORRIDAS = {
  bg_es: { fuente: "planner", mercado: "nacional_es", geo: "México", idioma: "es" },
  bg_en: { fuente: "planner", mercado: "extranjero_en", geo: "Estados Unidos", idioma: "en" },
  bg_semrush: { fuente: "semrush", mercado: "nacional_es", geo: "México", idioma: "es" },
};

const SIN_CLASIFICAR = "Sin clasificar";

const normaliza = (t) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function clasifica(keyword, diccionario) {
  const kw = normaliza(keyword);
  for (const [nombre, alias] of Object.entries(diccionario)) {
    if (alias.some((a) => kw.includes(normaliza(a)))) return nombre;
  }
  return SIN_CLASIFICAR;
}

function parseCsv(texto) {
  const filas = [];
  let campo = "", fila = [], comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') comillas = false;
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") { fila.push(campo); campo = ""; }
    else if (c === "\n") { fila.push(campo); filas.push(fila); fila = []; campo = ""; }
    else if (c !== "\r") campo += c;
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila); }
  const [cabecera, ...resto] = filas;
  return resto
    .filter((f) => f.length === cabecera.length)
    .map((f) => Object.fromEntries(cabecera.map((k, i) => [k, f[i]])));
}

/** Filas del motor de Google Ads: ya vienen deduplicadas por cluster. */
function desdePlanner(filas, brief) {
  return filas
    .filter((r) => r.keyword)
    .map((r) => ({
      keyword: r.keyword,
      servicio: clasifica(r.keyword, brief.temas),
      // Sin ciudad en la keyword = búsqueda nacional, no un hueco.
      plaza: r.plaza === "sin clasificar" ? "Nacional" : r.plaza,
      volumen: Number(r.volumen_mensual) || 0,
      competencia: r.competencia || "UNSPECIFIED",
      indice: Number(r.indice_competencia) || 0,
      pujaBaja: Number(r.puja_baja_usd) || 0,
      pujaAlta: Number(r.puja_alta_usd) || 0,
      variantes: Number(r.variantes) || 1,
      serie: (r.serie_12m || "").split(" ").filter(Boolean).map(Number),
      dificultad: null,
      intencion: null,
    }));
}

/** Export de SEMrush: trae una sola cifra de CPC, competencia en escala 0-1 y tendencia relativa. */
function desdeSemrush(filas, brief) {
  const densidad = (d) => (d >= 0.66 ? "HIGH" : d >= 0.33 ? "MEDIUM" : "LOW");
  return filas
    .filter((r) => r.Keyword)
    .map((r) => {
      const d = Number(r["Competitive Density"]) || 0;
      const volumen = Number(r.Volume) || 0;
      // El Trend de SEMrush es relativo (0-1 sobre el mes pico), no búsquedas absolutas:
      // se escala por el volumen para que la gráfica se lea igual que la del Planner.
      const serie = (r.Trend || "")
        .split(",")
        .filter(Boolean)
        .map((v) => Math.round(Number(v) * volumen));
      const plaza = clasifica(r.Keyword, brief.plazas);
      return {
        keyword: r.Keyword,
        servicio: clasifica(r.Keyword, brief.temas),
        plaza: plaza === SIN_CLASIFICAR ? "Nacional" : plaza,
        volumen,
        competencia: densidad(d),
        indice: Math.round(d * 100),
        pujaBaja: 0,
        pujaAlta: Number(r["CPC (USD)"]) || 0,
        variantes: 1,
        serie,
        dificultad: Number(r["Keyword Difficulty"]) || null,
        intencion: r.Intent || null,
      };
    });
}

const ARCHIVOS = {
  bg_es: { ruta: `${ORIGEN}/data/bg_es.csv`, mapea: desdePlanner, brief: briefEs },
  bg_en: { ruta: `${ORIGEN}/data/bg_en.csv`, mapea: desdePlanner, brief: briefEn },
  bg_semrush: { ruta: `${ORIGEN}/data/bg_semrush.csv`, mapea: desdeSemrush, brief: briefEs },
};

for (const [nombre, { ruta, mapea, brief }] of Object.entries(ARCHIVOS)) {
  const meta = CORRIDAS[nombre];
  const ideas = mapea(parseCsv(readFileSync(ruta, "utf8")), brief);

  // La corrida anterior del mismo brief se reemplaza entera: los ideas caen en cascada.
  await sql`DELETE FROM kw_runs WHERE brief = ${nombre}`;
  const [run] = await sql`
    INSERT INTO kw_runs (brief, fuente, mercado, geo, idioma, tipo_cambio, total)
    VALUES (${nombre}, ${meta.fuente}, ${meta.mercado}, ${meta.geo}, ${meta.idioma},
            ${brief.tipo_cambio}, ${ideas.length})
    RETURNING id`;

  for (let i = 0; i < ideas.length; i += 500) {
    const lote = ideas.slice(i, i + 500);
    await sql`
      INSERT INTO kw_ideas (run_id, keyword, servicio, plaza, volumen, competencia,
        indice_competencia, puja_baja_usd, puja_alta_usd, variantes, serie_12m,
        dificultad_seo, intencion)
      SELECT ${run.id}::uuid, k, sv, p, v::int, c, ic::int, pb::numeric, pa::numeric,
             va::int, s::jsonb, nullif(df, '')::int, nullif(it, '')
      FROM unnest(
        ${lote.map((r) => r.keyword)}::text[],
        ${lote.map((r) => r.servicio)}::text[],
        ${lote.map((r) => r.plaza)}::text[],
        ${lote.map((r) => String(r.volumen))}::text[],
        ${lote.map((r) => r.competencia)}::text[],
        ${lote.map((r) => String(r.indice))}::text[],
        ${lote.map((r) => String(r.pujaBaja))}::text[],
        ${lote.map((r) => String(r.pujaAlta))}::text[],
        ${lote.map((r) => String(r.variantes))}::text[],
        ${lote.map((r) => JSON.stringify(r.serie))}::text[],
        ${lote.map((r) => (r.dificultad == null ? "" : String(r.dificultad)))}::text[],
        ${lote.map((r) => r.intencion ?? "")}::text[]
      ) AS t(k, sv, p, v, c, ic, pb, pa, va, s, df, it)`;
  }
  console.log(`${nombre}: ${ideas.length} keywords`);
}

const [{ total }] = await sql`SELECT count(*)::int AS total FROM kw_ideas`;
console.log(`total en base: ${total}`);
