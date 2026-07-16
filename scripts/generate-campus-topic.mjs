// Genera un video del campus desde una URL de YouTube (tubería estrella de Fase 4):
// - Trae el transcript CON tiempos (Supadata) -> se guarda en campus_topics.transcript
//   (habilita el asistente del video automáticamente).
// - Con Claude (tool-use forzado) produce title, intro, desglose, quiz y suggestions.
// - Inserta/actualiza el topic con sus bloques + quiz + transcript + sugerencias.
// Uso: CAMPUS_CATEGORY=comercio-exterior CAMPUS_SLUG=mve-edocument \
//      CAMPUS_URL="https://www.youtube.com/watch?v=..." \
//      node --env-file=.env.local scripts/generate-campus-topic.mjs
import Anthropic from "@anthropic-ai/sdk";
import { neon } from "@neondatabase/serverless";
import { getTimestampedTranscript, youtubeId } from "./_supadata-timestamped.mjs";

const sql = neon(process.env.DATABASE_URL);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODELS = ["claude-sonnet-5", "claude-sonnet-4-6"];

const CATEGORY_SLUG = process.env.CAMPUS_CATEGORY;
const VIDEO_URL = process.env.CAMPUS_URL;
const TOPIC_SLUG = process.env.CAMPUS_SLUG;
if (!CATEGORY_SLUG || !VIDEO_URL || !TOPIC_SLUG) {
  console.error("Faltan CAMPUS_CATEGORY, CAMPUS_URL y CAMPUS_SLUG.");
  process.exit(1);
}
const VIDEO_ID = youtubeId(VIDEO_URL);
if (!VIDEO_ID) {
  console.error("URL de YouTube inválida.");
  process.exit(1);
}

console.log("Trayendo transcript con tiempos (Supadata)...");
const { segments, lang } = await getTimestampedTranscript(VIDEO_URL);
console.log(`Transcript: ${segments.length} segmentos (${lang}).`);
const transcriptText = segments.map((s) => s.text).join(" ");

const TOOL = {
  name: "emit_topic",
  description: "Estructura un video de capacitación a partir de su transcript.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "Título corto, claro y profesional, sin fecha ni nombres de personas." },
      intro: { type: "string", description: "1 párrafo (markdown) que engancha y dice de qué trata el video y por qué importa." },
      desglose: { type: "string", description: "Contenido editorial en prosa (markdown), organizado por concepto en 2 a 4 secciones con encabezado ## limpio (SIN nombres de expositores). Base en párrafos; viñetas SOLO para enumerar elementos discretos y cortos (pasos, métodos, requisitos). No conviertas todo en viñetas." },
      quiz: {
        type: "array",
        description: "5 a 8 preguntas básicas de opción múltiple sobre lo visto.",
        items: {
          type: "object",
          properties: {
            prompt: { type: "string" },
            options: { type: "array", items: { type: "string" }, description: "Exactamente 4 opciones." },
            correctIndex: { type: "integer", description: "Índice (0-3) de la opción correcta." },
          },
          required: ["prompt", "options", "correctIndex"],
        },
      },
      suggestions: {
        type: "array",
        description: "3 o 4 preguntas cortas que un alumno podría hacerle al asistente y que ESTE video SÍ responde. Naturales, específicas del contenido (no genéricas), sin numerarlas.",
        items: { type: "string" },
      },
    },
    required: ["title", "intro", "desglose", "quiz", "suggestions"],
  },
};

const SYSTEM = `Eres editor de capacitación de BG Consulting Group, firma de comercio exterior y aduanas. A partir del transcript de un video, produces el contenido de la lección.
Reglas duras:
- Español. Tono de par experto que explica, claro y factual. Nada de vendehumos ni frases huecas.
- No es un resumen del transcript: verifica, depura y REESTRUCTURA la información para que quede clara, útil y concisa. No todo lo del video tiene que estar. Omite saludos, agradecimientos, logística de instalación, chit-chat y relleno; quédate con lo que le sirve al alumno.
- Usa SOLO información que esté en el transcript. No inventes datos, cifras, nombres ni funciones.
- Sin em-dashes. Usa comas, dos puntos o punto.
- Español sin anglicismos innecesarios: "por defecto", no "por default".
- intro: un solo párrafo que enganche y diga de qué trata y por qué importa.
- desglose: PROSA editorial que explique, organizada por concepto en 2 a 4 secciones con encabezado ## limpio. Los títulos NO llevan nombres de expositores (mal: "Digitalizador de documentos (José)"; bien: "Digitalizador de documentos en BMS"). Los párrafos son la base; usa viñetas SOLO para enumerar elementos discretos y cortos (pasos, métodos, requisitos), no para todo. Evita el muro de viñetas. Conserva los términos técnicos tal cual (MVE, COVE, eDocument, VUCEM, OCR, IDP, expediente digital).
- quiz: 5 a 8 preguntas básicas, cada una con EXACTAMENTE 4 opciones y una sola correcta. Preguntas sobre lo explicado en el video, no de cultura general.
- suggestions: 3 o 4 preguntas cortas, naturales y específicas del video, que el asistente pueda responder con este contenido (ej. "¿Cuáles son los dos métodos para agregar el eDocument?").
- Normaliza términos mal transcritos: "Busem", "Busen", "Busém" siempre se escriben VUCEM (Ventanilla Única de Comercio Exterior Mexicana); "document/edument/dcument/unidocumen/Idoc" es eDocument. La normalización aplica SIEMPRE, también cuando el transcript los usa como nombre de módulo, pestaña o menú ("el módulo Busen" es "el módulo VUCEM"): Busem/Busen/Busém no existen, nunca los dejes tal cual ni los uses como respuesta de quiz.`;

async function call() {
  for (const model of MODELS) {
    try {
      return await anthropic.messages.create({
        model,
        max_tokens: 8000,
        system: SYSTEM,
        tools: [TOOL],
        tool_choice: { type: "tool", name: "emit_topic" },
        messages: [{ role: "user", content: `<transcripcion>\n${transcriptText}\n</transcripcion>\n\nGenera el contenido de la lección con la herramienta emit_topic.` }],
      });
    } catch (e) {
      if (e?.status === 404) continue;
      throw e;
    }
  }
  throw new Error("ningún modelo disponible");
}

const res = await call();
const block = res.content.find((b) => b.type === "tool_use");
if (!block) throw new Error("sin tool_use en la respuesta");
const data = block.input;
console.log(`Generado: "${data.title}" · ${data.quiz.length} preguntas · ${data.suggestions.length} sugerencias`);

// Inserta / reemplaza el topic en la categoría.
const cat = await sql`select id from campus_categories where slug = ${CATEGORY_SLUG}`;
if (!cat.length) throw new Error(`categoría ${CATEGORY_SLUG} no existe`);
const categoryId = cat[0].id;
const transcript = JSON.stringify({ segments, lang });
let t = await sql`select id from campus_topics where category_id = ${categoryId} and slug = ${TOPIC_SLUG}`;
if (!t.length) {
  t = await sql`insert into campus_topics (category_id, slug, title, "order", status, transcript, suggestions)
                values (${categoryId}, ${TOPIC_SLUG}, ${data.title}, ${0}, ${"published"}, ${transcript}, ${JSON.stringify(data.suggestions)}) returning id`;
} else {
  await sql`update campus_topics set title = ${data.title}, status = ${"published"},
            transcript = ${transcript}, suggestions = ${JSON.stringify(data.suggestions)} where id = ${t[0].id}`;
}
const topicId = t[0].id;

await sql`delete from campus_blocks where topic_id = ${topicId}`;
await sql`insert into campus_blocks (topic_id, kind, "order", data)
          values (${topicId}, ${"text"}, ${0}, ${JSON.stringify({ markdown: data.intro })})`;
await sql`insert into campus_blocks (topic_id, kind, "order", data)
          values (${topicId}, ${"video"}, ${1}, ${JSON.stringify({ provider: "youtube", videoId: VIDEO_ID, url: VIDEO_URL })})`;
await sql`insert into campus_blocks (topic_id, kind, "order", data)
          values (${topicId}, ${"text"}, ${2}, ${JSON.stringify({ markdown: data.desglose })})`;

const oldQ = await sql`select id from campus_quizzes where topic_id = ${topicId}`;
for (const q of oldQ) {
  await sql`delete from campus_quiz_questions where quiz_id = ${q.id}`;
  await sql`delete from campus_quizzes where id = ${q.id}`;
}
const quiz = await sql`insert into campus_quizzes (topic_id, title, passing_score, source)
                       values (${topicId}, ${"Evaluación: " + data.title}, ${70}, ${"youtube_auto"}) returning id`;
let qi = 0;
for (const q of data.quiz) {
  await sql`insert into campus_quiz_questions (quiz_id, prompt, options, correct_index, "order")
            values (${quiz[0].id}, ${q.prompt}, ${JSON.stringify(q.options)}, ${q.correctIndex}, ${qi++})`;
}

console.log(`Video sembrado con asistente: ${CATEGORY_SLUG}/${TOPIC_SLUG} (video ${VIDEO_ID}, ${segments.length} segmentos)`);
process.exit(0);
