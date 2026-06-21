// Seed de perfiles de director para marca personal (generador de posts).
// Idempotente: no duplica si ya existe un perfil con ese name.
// Solo name + title reales (de src/content/team.ts); expertise/voice/avoid los llena el admin.
// Correr con: npm run db:seed
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const DIRECTORS = [
  { name: "Mario A. Cortés", title: "Co-CEO" },
  { name: "Edgardo Romero", title: "Co-CEO" },
  { name: "Rogelio Viloria Beltrán", title: "Co-CEO y CFO" },
  { name: "Luis Mateo", title: "COO" },
  { name: "Hugo García", title: "CIO" },
  { name: "Diana Galicia Matuz", title: "Líder del área legal" },
];

let inserted = 0;
let skipped = 0;
for (const d of DIRECTORS) {
  const existing = await sql`select id from director_profiles where name = ${d.name}`;
  if (existing.length > 0) {
    skipped++;
    continue;
  }
  await sql`insert into director_profiles (name, title) values (${d.name}, ${d.title})`;
  inserted++;
}

console.log(`director_profiles seed listo: ${inserted} insertados, ${skipped} ya existían.`);
