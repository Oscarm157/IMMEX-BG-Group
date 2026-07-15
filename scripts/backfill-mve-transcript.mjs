// Parsea el transcript con tiempos (scripts/_mve-transcript-timestamped.txt) a
// segments[{start(seg), text}] y lo guarda en campus_topics.transcript del topic
// mve-edocument. Habilita el asistente del video para el piloto.
// Uso: node --env-file=.env.local scripts/backfill-mve-transcript.mjs
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const TOPIC_SLUG = "mve-edocument";
const raw = readFileSync("/root/bg-group/scripts/_mve-transcript-timestamped.txt", "utf8");

const segments = [];
for (const line of raw.split("\n")) {
  const m = line.match(/^\((\d+):(\d+)\)\s*(.*)$/);
  if (!m) continue;
  const start = Number(m[1]) * 60 + Number(m[2]);
  const text = m[3].trim();
  if (text) segments.push({ start, text });
}
if (!segments.length) throw new Error("no se parsearon segmentos");

const transcript = { segments, lang: "es" };
const rows = await sql`select id from campus_topics where slug = ${TOPIC_SLUG}`;
if (!rows.length) throw new Error(`topic ${TOPIC_SLUG} no existe`);
await sql`update campus_topics set transcript = ${JSON.stringify(transcript)} where id = ${rows[0].id}`;

console.log(`OK: ${segments.length} segmentos guardados en ${TOPIC_SLUG} (${segments[0].start}s -> ${segments.at(-1).start}s)`);
process.exit(0);
