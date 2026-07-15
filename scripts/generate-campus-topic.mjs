// Genera un video del campus desde un transcript con Claude (tool-use forzado):
// title, intro, desglose y quiz. Inserta el topic en una categoría.
// Prototipo del flujo estrella "generar video desde URL" (Fase 4 lo lleva a UI).
// Uso: node --env-file=.env.local scripts/generate-campus-topic.mjs
import { readFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODELS = ["claude-sonnet-5", "claude-sonnet-4-6"];

const CATEGORY_SLUG = "comercio-exterior";
const VIDEO_ID = "q76s5l8SE7M";
const TOPIC_SLUG = "mve-edocument";
const transcript = readFileSync("/root/bg-group/scripts/_mve-transcript.txt", "utf8");

const TOOL = {
  name: "emit_topic",
  description: "Estructura un video de capacitación a partir de su transcript.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "Título corto y claro del video (sin fecha)." },
      intro: { type: "string", description: "1 párrafo (markdown) que engancha y dice de qué trata el video y por qué importa." },
      desglose: { type: "string", description: "Markdown con secciones ## y bullets de los puntos clave REALES del video." },
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
    },
    required: ["title", "intro", "desglose", "quiz"],
  },
};

const SYSTEM = `Eres editor de capacitación de BG Consulting Group, firma de comercio exterior y aduanas. A partir del transcript de un video, produces el contenido de la lección.
Reglas duras:
- Español. Tono de par experto que explica, claro y factual. Nada de vendehumos ni frases huecas.
- Usa SOLO información que esté en el transcript. No inventes datos, cifras, nombres ni funciones.
- Sin em-dashes. Usa comas, dos puntos o punto.
- intro: un solo párrafo que enganche y diga de qué trata y por qué importa.
- desglose: markdown con 2 a 4 secciones ## y bullets con los puntos clave reales (términos como MVE, COVE, eDocument, Busem, OCR, IDP, expediente digital, etc. tal como aparecen).
- quiz: 5 a 8 preguntas básicas, cada una con EXACTAMENTE 4 opciones y una sola correcta. Preguntas sobre lo explicado en el video, no de cultura general.
- Normaliza términos mal transcritos: "Busem", "Busen", "Busém" siempre se escriben VUCEM (Ventanilla Única de Comercio Exterior Mexicana).`;

async function call() {
  for (const model of MODELS) {
    try {
      return await anthropic.messages.create({
        model,
        max_tokens: 4000,
        system: SYSTEM,
        tools: [TOOL],
        tool_choice: { type: "tool", name: "emit_topic" },
        messages: [{ role: "user", content: `<transcripcion>\n${transcript}\n</transcripcion>\n\nGenera el contenido de la lección con la herramienta emit_topic.` }],
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
console.log(`Generado: "${data.title}" · ${data.quiz.length} preguntas`);

// Inserta / reemplaza el topic en la categoría.
const cat = await sql`select id from campus_categories where slug = ${CATEGORY_SLUG}`;
const categoryId = cat[0].id;
let t = await sql`select id from campus_topics where category_id = ${categoryId} and slug = ${TOPIC_SLUG}`;
if (!t.length) {
  t = await sql`insert into campus_topics (category_id, slug, title, "order", status)
                values (${categoryId}, ${TOPIC_SLUG}, ${data.title}, ${0}, ${"published"}) returning id`;
} else {
  await sql`update campus_topics set title = ${data.title}, status = ${"published"}, "order" = ${0} where id = ${t[0].id}`;
}
const topicId = t[0].id;

await sql`delete from campus_blocks where topic_id = ${topicId}`;
await sql`insert into campus_blocks (topic_id, kind, "order", data)
          values (${topicId}, ${"text"}, ${0}, ${JSON.stringify({ markdown: data.intro })})`;
await sql`insert into campus_blocks (topic_id, kind, "order", data)
          values (${topicId}, ${"video"}, ${1}, ${JSON.stringify({ provider: "youtube", videoId: VIDEO_ID, url: `https://www.youtube.com/watch?v=${VIDEO_ID}` })})`;
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

console.log(`Video insignia sembrado: ${CATEGORY_SLUG}/${TOPIC_SLUG} (video real ${VIDEO_ID})`);
process.exit(0);
