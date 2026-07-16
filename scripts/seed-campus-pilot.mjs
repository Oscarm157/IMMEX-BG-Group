// Siembra la categoría del campus (Comercio exterior). Idempotente por slug.
// Los videos se cargan aparte con scripts/generate-campus-topic.mjs.
// Correr: node --env-file=.env.local scripts/seed-campus-pilot.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function ensureCategory() {
  const slug = "comercio-exterior";
  const found = await sql`select id from campus_categories where slug = ${slug}`;
  if (found.length) return found[0].id;
  const rows = await sql`
    insert into campus_categories (slug, title, description, audience, status, "order")
    values (${slug}, ${"Comercio exterior"},
            ${"Fundamentos de operación aduanera y programas de fomento, explicados por video con una evaluación al cierre."},
            ${"ambos"}, ${"published"}, ${0})
    returning id`;
  return rows[0].id;
}

async function main() {
  await ensureCategory();
  console.log("Categoría 'Comercio exterior' lista.");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
