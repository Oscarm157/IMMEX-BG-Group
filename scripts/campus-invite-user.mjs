// Alta / invitación de un usuario del campus por CLI (mientras el admin de UI
// llega en Fase 4). Idempotente en el usuario; siempre emite un invite fresco.
// Uso:
//   CAMPUS_EMAIL=x@y.com CAMPUS_NAME="Nombre" CAMPUS_AUDIENCE=empleado CAMPUS_ROLE=admin \
//   node --env-file=.env.local scripts/campus-invite-user.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();

function randomToken() {
  return Buffer.from(globalThis.crypto.getRandomValues(new Uint8Array(32))).toString("hex");
}
async function sha256Hex(s) {
  const d = await subtle.digest("SHA-256", enc.encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const email = (process.env.CAMPUS_EMAIL ?? "").toLowerCase().trim();
const name = process.env.CAMPUS_NAME ?? "Usuario";
const audience = process.env.CAMPUS_AUDIENCE === "cliente" ? "cliente" : "empleado";
const role = ["learner", "instructor", "admin"].includes(process.env.CAMPUS_ROLE)
  ? process.env.CAMPUS_ROLE
  : "learner";
const orgSlug = process.env.CAMPUS_ORG_SLUG; // opcional, para clientes

if (!email) {
  console.error("Falta CAMPUS_EMAIL");
  process.exit(1);
}

let orgId = null;
if (orgSlug) {
  const o = await sql`select id from campus_orgs where slug = ${orgSlug}`;
  orgId = o[0]?.id ?? null;
}

let user = await sql`select id from campus_users where email = ${email}`;
if (!user.length) {
  user = await sql`insert into campus_users (email, name, audience, org_id, role, must_set_password)
                   values (${email}, ${name}, ${audience}, ${orgId}, ${role}, ${true})
                   returning id`;
  console.log(`Usuario creado: ${email} (${audience}/${role})`);
} else {
  await sql`update campus_users set name = ${name}, audience = ${audience}, role = ${role},
            org_id = ${orgId}, active = true where email = ${email}`;
  console.log(`Usuario actualizado: ${email} (${audience}/${role})`);
}
const userId = user[0].id;

const raw = randomToken();
const tokenHash = await sha256Hex(raw);
const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
await sql`insert into campus_invites (user_id, token_hash, purpose, expires_at)
          values (${userId}, ${tokenHash}, ${"invite"}, ${expires})`;

console.log(`Link de invitación (7 días): /campus/invite/${raw}`);
process.exit(0);
