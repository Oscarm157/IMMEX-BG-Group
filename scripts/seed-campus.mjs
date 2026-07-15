// Seed del Campus BG. Idempotente en orgs y usuarios; siempre emite un invite
// fresco para el usuario demo (para tener un link de prueba válido).
// Correr con: node --env-file=.env.local scripts/seed-campus.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();

// Hash de contraseña en el mismo formato que src/lib/crm-auth.ts (PBKDF2 100k).
async function hashPassword(password) {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const key = await subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  const b64 = (b) => Buffer.from(b).toString("base64");
  return `pbkdf2$100000$${b64(salt)}$${b64(new Uint8Array(bits))}`;
}

function randomToken() {
  return Buffer.from(globalThis.crypto.getRandomValues(new Uint8Array(32))).toString("hex");
}
async function sha256Hex(s) {
  const d = await subtle.digest("SHA-256", enc.encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function ensureOrg(name, slug) {
  const existing = await sql`select id from campus_orgs where slug = ${slug}`;
  if (existing.length) return existing[0].id;
  const rows = await sql`insert into campus_orgs (name, slug) values (${name}, ${slug}) returning id`;
  return rows[0].id;
}

async function main() {
  const clienteOrgId = await ensureOrg("Cliente Demo", "cliente-demo");
  await ensureOrg("BG (interno)", "bg-interno");

  // Admin del campus (colaborador). Password de env o default para dev.
  const adminEmail = (process.env.CAMPUS_ADMIN_EMAIL ?? "campus-admin@bgconsultingroup.com").toLowerCase();
  const adminPass = process.env.CAMPUS_ADMIN_PASSWORD ?? "campusbg123";
  const adminExists = await sql`select id from campus_users where email = ${adminEmail}`;
  if (!adminExists.length) {
    await sql`insert into campus_users (email, name, password_hash, audience, role, must_set_password)
              values (${adminEmail}, ${"Admin Campus"}, ${await hashPassword(adminPass)}, ${"empleado"}, ${"admin"}, ${false})`;
    console.log(`Admin creado: ${adminEmail} / ${adminPass}`);
  } else {
    console.log(`Admin ya existía: ${adminEmail}`);
  }

  // Usuario cliente invitado (sin password) para probar el flujo de invitación.
  const demoEmail = "cliente-demo@example.com";
  let demo = await sql`select id from campus_users where email = ${demoEmail}`;
  if (!demo.length) {
    demo = await sql`insert into campus_users (email, name, audience, org_id, role, must_set_password)
                     values (${demoEmail}, ${"Cliente Demo"}, ${"cliente"}, ${clienteOrgId}, ${"learner"}, ${true})
                     returning id`;
  }
  const demoId = demo[0].id;

  // Emite un invite fresco para el demo.
  const raw = randomToken();
  const tokenHash = await sha256Hex(raw);
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await sql`insert into campus_invites (user_id, token_hash, purpose, expires_at)
            values (${demoId}, ${tokenHash}, ${"invite"}, ${expires.toISOString()})`;

  console.log("\nSeed del campus listo.");
  console.log(`Link de invitación demo (cliente): /campus/invite/${raw}`);
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
