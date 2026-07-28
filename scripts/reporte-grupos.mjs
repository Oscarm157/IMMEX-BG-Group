// Reporte de palabras clave para BG, armado desde los grupos guardados en /admin/keywords.
//
//   node --env-file=.env.local scripts/reporte-grupos.mjs
//
// Escribe un HTML autocontenido FUERA del repo: Oscarm157/IMMEX-BG-Group es público y el
// research completo le sirve a cualquier competidor. Ninguna cifra se escribe a mano; si un
// dato no está en la base, no aparece en el reporte.
import { readFileSync, writeFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const SALIDA = "/root/BG-reporte-keywords.html";
const LOGO = "/root/bg-group/public/BG_Logotipo_Blanco.png";
const sql = neon(process.env.DATABASE_URL);

// Supuestos, todos declarados en el propio reporte para que las cuentas se puedan rehacer.
const COBERTURA = 0.65; // de las búsquedas del grupo, en cuántas se alcanza a aparecer
const CTR = 0.08; // de esas impresiones, cuántas dan clic
const CONVERSIONES = [0.01, 0.02, 0.035]; // clic a lead: conservador, esperado, optimista
const TIPO_CAMBIO = 18.5;
const PRESUPUESTO = 10000; // pesos al mes

/**
 * Reparto por intención. Explícito y en orden: la primera regla que apareé manda.
 * Está pensado para los servicios de BG; lo que no encaje sale en "sin grupo claro"
 * en vez de forzarse a un grupo que no le toca.
 */
const GRUPOS = [
  {
    nombre: "Agente y despacho aduanal",
    alias: ["agente aduanal", "agenteaduanal", "agencia aduanal", "agencias aduanales", "despacho de aduana", "despacho aduanal", "despacho aduanero"],
    concordancia: "Frase para arrancar, exacta en las que traigan llamadas.",
    negativas: ["curso", "qué es", "sueldo", "carrera", "requisitos para ser", "patente"],
    nota: "Es la demanda de quien ya quiere contratar a alguien que le despache. La más cara y la más disputada del grupo.",
  },
  {
    nombre: "Programa IMMEX",
    alias: ["immex"],
    concordancia: "Frase. La exacta se reserva para lo que convierta.",
    negativas: ["qué es", "pdf", "ejemplos", "lista de empresas", "curso"],
    nota: "Quien busca IMMEX suele estar evaluando el programa o ya operarlo con dudas. Cierra lento, no en la llamada.",
  },
  {
    nombre: "VUCEM y trámites del portal",
    alias: ["vucem", "cove", "ventanilla unica"],
    concordancia: "Frase, y vigilar el informe de términos la primera semana.",
    negativas: ["iniciar sesión", "contraseña", "mi cuenta", "no puedo entrar", "manual", "pdf"],
    nota: "Es el volumen más grande del research y el de peor intención: casi todo es gente entrando al portal del gobierno a hacer un trámite. Sirve para hacerse conocido, no para vender esta semana.",
  },
  {
    nombre: "Padrón de importadores",
    alias: ["padron"],
    concordancia: "Frase.",
    negativas: ["consulta", "requisitos pdf", "formato", "curso"],
    nota: "Trámite con problema atrás: quien lo busca suele estar atorado en el alta o en la suspensión.",
  },
  {
    nombre: "Clasificación arancelaria",
    alias: ["clasificacion arancelaria", "fraccion arancelaria", "tigie"],
    concordancia: "Frase y exacta.",
    negativas: ["buscador", "consulta gratis", "curso", "pdf"],
    nota: "Consulta técnica y recurrente. Volumen chico, intención buena.",
  },
];

/** Lo que no es demanda de consultoría, con el motivo a la vista. */
const DESCARTES = [
  { alias: ["aduana tijuana", "aduana de tijuana", "garita"], motivo: "Es gente buscando la aduana física, sus horarios o la garita. No busca a quien la asesore." },
  { alias: ["auditoria sat"], motivo: "Demasiado amplia: mezcla auditoría fiscal con auditoría aduanera, y la mayoría no es comercio exterior." },
];

const normaliza = (t) =>
  t.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const num = (n, d = 0) =>
  Number(n).toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

const esc = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const COMPETENCIA = { LOW: "Baja", MEDIUM: "Media", HIGH: "Alta" };

/** CPC ponderado por volumen: una keyword de 8,000 pesa más que una de 500. */
function cpcPonderado(items) {
  const conPuja = items.filter((k) => Number(k.cpc) > 0);
  if (!conPuja.length) return 0;
  const vol = conPuja.reduce((a, k) => a + k.volumen, 0);
  return conPuja.reduce((a, k) => a + Number(k.cpc) * k.volumen, 0) / Math.max(1, vol);
}

function clasifica(keyword) {
  const kw = normaliza(keyword);
  for (const d of DESCARTES) {
    if (d.alias.some((a) => kw.includes(normaliza(a)))) return { tipo: "descarte", motivo: d.motivo };
  }
  for (const g of GRUPOS) {
    if (g.alias.some((a) => kw.includes(normaliza(a)))) return { tipo: "grupo", grupo: g.nombre };
  }
  return { tipo: "sin", motivo: "No cae en ninguno de los servicios del reparto." };
}

// ---- Datos ----

const grupos = await sql`
  SELECT g.id, g.nombre, g.servicio, g.plaza, g.mercado, g.estado, g.updated_at
  FROM kw_grupos g ORDER BY g.updated_at DESC`;

if (!grupos.length) {
  console.error("No hay grupos guardados. Arma uno en /admin/keywords y vuelve a correr esto.");
  process.exit(1);
}

const items = await sql`
  SELECT grupo_id, keyword, volumen, cpc, competencia FROM kw_grupo_items ORDER BY volumen DESC`;

const [corrida] = await sql`SELECT max(corrida_en) AS fecha FROM kw_runs`;

const fmtFecha = (d) =>
  d ? new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(d)) : "—";

const logo = readFileSync(LOGO).toString("base64");

// ---- Armado por grupo guardado ----

/**
 * Une variantes de escritura de la misma búsqueda: "agente aduanal" y "agenteaduanal",
 * "agencia aduanal" y "agencias aduanales". Google las reporta con el MISMO volumen
 * porque son el mismo cluster, así que sumarlas contaba doble la demanda.
 * Solo se unen si además coincide el volumen: si difiere, son búsquedas distintas.
 */
function claveVariante(keyword) {
  return normaliza(keyword)
    .split(/\s+/)
    .map((w) => (w.length > 4 && w.endsWith("es") ? w.slice(0, -2) : w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .join("");
}

function uneVariantes(items) {
  const porClave = new Map();
  for (const k of items) {
    const clave = `${claveVariante(k.keyword)}·${k.volumen}`;
    const ya = porClave.get(clave);
    if (!ya) {
      porClave.set(clave, { ...k, variantes: 1 });
      continue;
    }
    ya.variantes += 1;
    // Gana la escritura bien separada ("agente aduanal" sobre "agenteaduanal"), y a
    // igualdad de palabras, la más corta. La puja que se conserva es la más alta: para
    // presupuestar, quedarse con la barata subestima lo que va a costar el clic.
    const palabras = (t) => t.trim().split(/\s+/).length;
    const mejor =
      palabras(k.keyword) > palabras(ya.keyword) ||
      (palabras(k.keyword) === palabras(ya.keyword) && k.keyword.length < ya.keyword.length);
    if (mejor) ya.keyword = k.keyword;
    if (Number(k.cpc) > Number(ya.cpc)) ya.cpc = k.cpc;
    if (k.competencia === "HIGH" || (k.competencia === "MEDIUM" && ya.competencia === "LOW")) {
      ya.competencia = k.competencia;
    }
  }
  return [...porClave.values()];
}

function analiza(grupo) {
  const suyas = uneVariantes(items.filter((i) => i.grupo_id === grupo.id));
  const bloques = GRUPOS.map((g) => ({ ...g, items: [] }));
  const descartadas = [];
  const sinGrupo = [];

  for (const k of suyas) {
    const r = clasifica(k.keyword);
    if (r.tipo === "grupo") bloques.find((b) => b.nombre === r.grupo).items.push(k);
    else if (r.tipo === "descarte") descartadas.push({ ...k, motivo: r.motivo });
    else sinGrupo.push({ ...k, motivo: r.motivo });
  }

  const conKeywords = bloques.filter((b) => b.items.length);
  const total = suyas.reduce((a, k) => a + k.volumen, 0);
  const repartido =
    conKeywords.reduce((a, b) => a + b.items.reduce((x, k) => x + k.volumen, 0), 0) +
    descartadas.reduce((a, k) => a + k.volumen, 0) +
    sinGrupo.reduce((a, k) => a + k.volumen, 0);

  // El reporte no sirve si las cuentas no cierran: mejor fallar que publicar un número mal.
  if (total !== repartido) {
    console.error(`El reparto no cuadra en "${grupo.nombre}": ${repartido} contra ${total}.`);
    process.exit(1);
  }

  return { grupo, suyas, bloques: conKeywords, descartadas, sinGrupo, total };
}

const analisis = grupos.map(analiza);

// ---- HTML ----

function tablaKeywords(items, extra = null) {
  return `<table class="tabla">
  <thead><tr><th>Palabra clave</th><th class="r">Búsquedas al mes</th><th class="r">Competencia</th><th class="r">Puja alta (USD)</th>${extra ? "<th>Por qué queda fuera</th>" : ""}</tr></thead>
  <tbody>${items
    .map(
      (k) => `<tr><td>${esc(k.keyword)}</td><td class="r n">${num(k.volumen)}</td><td class="r">${COMPETENCIA[k.competencia] ?? "Sin dato"}</td><td class="r n">${Number(k.cpc) > 0 ? `$${num(k.cpc, 2)}` : "sin dato"}</td>${extra ? `<td class="motivo">${esc(k.motivo)}</td>` : ""}</tr>`,
    )
    .join("")}</tbody></table>`;
}

/** Una sola tabla con todo lo que se va a usar, con el tema como columna. */
function tablaConTema(bloques) {
  const filas = bloques
    .flatMap((b) => b.items.map((k) => ({ ...k, tema: b.nombre })))
    .sort((a, b) => b.volumen - a.volumen);
  return `<table class="tabla">
  <thead><tr><th>Palabra clave</th><th>Tema</th><th class="r">Búsquedas al mes</th><th class="r">Competencia</th><th class="r">Puja alta (USD)</th></tr></thead>
  <tbody>${filas
    .map(
      (k) => `<tr><td>${esc(k.keyword)}${k.variantes > 1 ? `<span class="var">+${k.variantes - 1} variante${k.variantes > 2 ? "s" : ""}</span>` : ""}</td><td class="tema">${esc(k.tema)}</td><td class="r n">${num(k.volumen)}</td><td class="r">${COMPETENCIA[k.competencia] ?? "Sin dato"}</td><td class="r n">${Number(k.cpc) > 0 ? `$${num(k.cpc, 2)}` : "sin dato"}</td></tr>`,
    )
    .join("")}</tbody></table>`;
}

function documento(a) {
  const { grupo, bloques, descartadas, sinGrupo, suyas } = a;
  // Las cifras van sobre lo que de verdad se va a usar, no sobre lo descartado.
  const usadas = bloques.flatMap((b) => b.items);
  const total = usadas.reduce((x, k) => x + k.volumen, 0);
  const cpcTotal = cpcPonderado(usadas);

  const usd = PRESUPUESTO / TIPO_CAMBIO;
  const clics = cpcTotal > 0 ? usd / cpcTotal : 0;
  const leads = CONVERSIONES.map((c) => clics * c);

  return `<article class="doc">
  <header class="portada">
    <img class="logo" src="data:image/png;base64,${logo}" alt="BG Consulting Group">
    <p class="eyebrow"><span class="dot"></span> Pauta · Palabras clave</p>
    <h1>Palabras clave de ${esc(grupo.nombre)}</h1>
    <p class="entrada">Relación de las ${num(usadas.length)} palabras clave seleccionadas para la campaña de Google Ads,
    con su volumen de búsqueda, nivel de competencia y puja estimada. Los datos provienen de Google Keyword Planner y
    SEMrush, con medición al ${fmtFecha(corrida?.fecha)}.</p>
  </header>

  <section class="bloque">
    <div class="bloque-h"><span class="idx">Alcance</span><h3>Tamaño de la demanda</h3></div>
    <div class="caja-cifras">
      <p class="caja-rot">Total de las palabras seleccionadas</p>
      <div class="kpis">
        <div class="kpi"><span>Palabras clave</span><b class="n">${num(usadas.length)}</b></div>
        <div class="kpi acento"><span>Búsquedas al mes</span><b class="n">${num(total)}</b></div>
        <div class="kpi"><span>Puja alta ponderada</span><b class="n">$${num(cpcTotal, 2)} USD</b></div>
        <div class="kpi"><span>Temas</span><b class="n">${num(bloques.length)}</b></div>
      </div>
    </div>
  </section>

  <section class="bloque">
    <div class="bloque-h"><span class="idx">Selección</span><h3>Palabras clave seleccionadas</h3></div>
    <p class="nota">Ordenadas por volumen de búsqueda mensual. La columna de tema indica cómo se agruparán dentro de la
    campaña: cada grupo de anuncios atiende un solo tema, lo que mejora la relevancia del anuncio y reduce el costo por
    clic.</p>
    ${tablaConTema(bloques)}
  </section>


  ${
    sinGrupo.length
      ? `<section class="bloque">
    <div class="bloque-h"><span class="idx">Pendiente</span><h3>Palabras clave sin tema asignado</h3></div>
    <p class="nota">No encajan en los servicios del reparto. Hay que decidir a mano si entran y en cuál.</p>
    ${tablaKeywords(sinGrupo, true)}
  </section>`
      : ""
  }

  <section class="bloque">
    <div class="bloque-h"><span class="idx">Inversión</span><h3>Presupuesto y resultados esperados</h3></div>
    <p class="nota">Estimación mensual con una inversión de $${num(PRESUPUESTO)} MXN, la puja alta ponderada de las
    palabras seleccionadas ($${num(cpcTotal, 2)} USD) y un tipo de cambio de $${num(TIPO_CAMBIO, 2)}. El rango de
    oportunidades corresponde a las tres tasas de conversión indicadas en los supuestos.</p>
    <div class="caja-cifras">
      <p class="caja-rot">Con $${num(PRESUPUESTO)} MXN al mes</p>
      <div class="kpis">
        <div class="kpi"><span>Equivalente</span><b class="n">$${num(usd)} USD</b></div>
        <div class="kpi"><span>Clics al mes</span><b class="n">${num(clics)}</b></div>
        <div class="kpi acento"><span>Oportunidades al mes</span><b class="n">${num(leads[0], 1)} a ${num(leads[2], 1)}</b></div>
      </div>
    </div>
    <p class="nota">Se recomienda concentrar la inversión inicial en uno o dos temas. Distribuirla entre los
    ${num(bloques.length)} reduce el volumen de clics por debajo del que Google requiere para optimizar la entrega de los
    anuncios. Los temas restantes se incorporan una vez que existan datos de desempeño.</p>
  </section>

  <section class="bloque">
    <div class="bloque-h"><span class="idx">Exclusiones</span><h3>Palabras clave negativas</h3></div>
    <p class="nota">Se cargan desde el inicio de la campaña. Una parte relevante de las búsquedas del sector proviene de
    estudiantes y de personas que resuelven trámites por cuenta propia, y no corresponde al perfil de cliente de BG.</p>
    <div class="chips">${["curso", "diplomado", "licenciatura", "maestría", "carrera", "universidad", "qué es", "significado", "ejemplos", "formato", "pdf", "gratis", "vacantes", "sueldo", "salario", "bolsa de trabajo", "iniciar sesión", "contraseña", "mi cuenta"]
      .map((n) => `<code>${esc(n)}</code>`)
      .join("")}</div>
    <p class="nota">Las palabras negativas también operan por concordancia. Una exclusión demasiado amplia puede bloquear
    tráfico válido, por lo que se revisan contra el informe de términos de búsqueda durante la primera semana de operación.</p>
  </section>

  <section class="bloque">
    <div class="bloque-h"><span class="idx">Metodología</span><h3>Supuestos de cálculo</h3></div>
    <table class="tabla">
      <thead><tr><th>Supuesto</th><th class="r">Valor</th><th>De dónde sale</th></tr></thead>
      <tbody>
        <tr><td>Cobertura de la subasta</td><td class="r n">${num(COBERTURA * 100)}%</td><td>Proporción de las búsquedas en las que el anuncio alcanza a mostrarse.</td></tr>
        <tr><td>Clic por impresión</td><td class="r n">${num(CTR * 100)}%</td><td>Proporción de impresiones que se traducen en clic.</td></tr>
        <tr><td>Conversión del sitio</td><td class="r n">1% a 3.5%</td><td>Proporción de clics que dejan sus datos de contacto.</td></tr>
        <tr><td>Tipo de cambio</td><td class="r n">$${num(TIPO_CAMBIO, 2)}</td><td>Las pujas de Google Keyword Planner se reportan en dólares.</td></tr>
      </tbody>
    </table>
    <p class="nota">Todas las cifras son estimaciones. El costo por clic y el número de leads dependen de la subasta de
    Google, de la competencia y de la temporada, y pueden variar hacia arriba o hacia abajo. No constituyen una garantía
    de resultados.</p>
  </section>

  <footer class="pie">
    <span>BG Consulting Group</span>
    <span>Datos de Google Keyword Planner y SEMrush · ${fmtFecha(corrida?.fecha)}</span>
  </footer>
</article>`;
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BG Consulting Group · Palabras clave para Google Ads</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#0f1521; --s1:#18202e; --s2:#1f2838; --s3:#283246;
  --line:#313c4f; --line-soft:#3a465b;
  --accent:#00e6a0; --accent-dim:#00c489; --on-accent:#04231a;
  --chalk:#f6f8fa; --bone:#ccd2dc; --smoke:#a6adbb; --ash:#818996;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --display:'Space Grotesk',var(--sans);
  --mono:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--ink);color:var(--chalk);font-family:var(--sans);line-height:1.55;-webkit-font-smoothing:antialiased}
.doc{max-width:1080px;margin:0 auto;padding:64px 40px 80px}
.n{font-family:var(--mono);font-variant-numeric:tabular-nums}
code{font-family:var(--mono);font-size:12.5px;background:var(--s2);border:1px solid var(--line);border-radius:5px;padding:2px 7px;color:var(--bone);white-space:nowrap}

.portada{border-bottom:1px solid var(--line);padding-bottom:44px;margin-bottom:44px}
.logo{height:34px;width:auto;display:block;margin-bottom:36px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 14px 1px rgba(0,230,160,.7)}
h1{font-family:var(--display);font-weight:500;letter-spacing:-.035em;line-height:1.02;font-size:clamp(34px,5vw,54px);margin-bottom:20px}
.entrada{color:var(--bone);font-size:16px;max-width:70ch}
.entrada b{color:var(--chalk);font-weight:500}


.titulo-seccion{font-family:var(--display);font-weight:500;font-size:26px;letter-spacing:-.02em;margin:64px 0 24px;padding-bottom:12px;border-bottom:1px solid var(--line)}

.bloque{border:1px solid var(--line);border-radius:12px;background:var(--s1);padding:26px 28px;margin-bottom:22px}
.bloque-h{display:flex;align-items:baseline;gap:14px;margin-bottom:14px;flex-wrap:wrap}
.idx{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
.bloque h3{font-family:var(--display);font-weight:500;font-size:22px;letter-spacing:-.02em}
.nota{color:var(--smoke);font-size:13.5px;max-width:78ch;margin-bottom:16px}
.nota b{color:var(--bone);font-weight:600}
.nota+.nota{margin-top:-6px}

/* Caja de cifras: una sola pregunta arriba y las tres respuestas debajo, para que
   se lea de corrido en vez de como un tablero de números sueltos. */
.caja-cifras{border:1px solid var(--line);border-radius:10px;background:var(--s2);padding:16px 18px 14px;margin-bottom:20px}
.caja-rot{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.caja-pie{font-size:12.5px;color:var(--smoke);border-top:1px solid var(--line);margin-top:14px;padding-top:12px}
.kpis{display:flex;flex-wrap:wrap;gap:34px}
.kpi span{display:block;font-size:11.5px;color:var(--ash);margin-bottom:3px}
.kpi b{font-size:26px;font-weight:600;letter-spacing:-.03em;color:var(--chalk);line-height:1.1}
.kpi.acento b{color:var(--accent)}
.dato-suave{font-family:var(--mono);font-size:12px;color:var(--ash);margin-left:auto}

.tabla{width:100%;border-collapse:collapse;font-size:13.5px;margin-bottom:18px}
.tabla th{text-align:left;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ash);font-weight:500;padding:0 12px 9px;border-bottom:1px solid var(--line)}
.tabla td{padding:9px 12px;border-bottom:1px solid rgba(49,60,79,.45);color:var(--bone)}
.tabla tr td:first-child{color:var(--chalk)}
.tabla .r{text-align:right}
.tabla .motivo{color:var(--smoke);font-size:12.5px}
.tabla .tema{color:var(--smoke);font-size:12.5px;white-space:nowrap}\n.tabla .var{color:var(--ash);font-size:11.5px;margin-left:8px;white-space:nowrap}

.pares{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;border-top:1px solid var(--line);padding-top:16px}
.rot{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ash);margin-bottom:7px}
.pares p{color:var(--bone);font-size:13.5px;display:flex;flex-wrap:wrap;gap:6px}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px}

.pie{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;border-top:1px solid var(--line);margin-top:56px;padding-top:22px;font-size:12px;color:var(--ash)}

@media (max-width:640px){
  .doc{padding:40px 20px 60px}
  .bloque{padding:20px 18px}
  .tabla{font-size:12.5px}
  .tabla th,.tabla td{padding-left:8px;padding-right:8px}
}
@media print{
  body{background:#fff;color:#111}
  .doc{max-width:none;padding:0}
  .bloque{break-inside:avoid;background:#fff;border-color:#ddd}
  .kpi{background:#f6f8fa}
  h1,.bloque h3,.kpi b,.tabla tr td:first-child{color:#111}
  .nota,.entrada,.tabla td{color:#333}
  .logo{filter:invert(1)}
}
</style>
</head>
<body>
${analisis.map(documento).join('<hr style="border:0;border-top:1px solid var(--line);margin:80px 0">')}
</body>
</html>`;

writeFileSync(SALIDA, html);
console.log(`Reporte escrito en ${SALIDA}`);
for (const a of analisis) {
  console.log(
    `  ${a.grupo.nombre}: ${a.suyas.length} keywords, ${num(a.total)} búsquedas, ${a.bloques.length} grupos de anuncios, ${a.descartadas.length} fuera, ${a.sinGrupo.length} sin grupo`,
  );
}
