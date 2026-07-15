import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { campusInvites, type CampusInvitePurpose } from "./campus-schema";
import { generateToken, hashToken } from "./campus-auth";

// TTL por propósito: la invitación (fijar contraseña) dura una semana; el magic
// link de login es efímero.
const INVITE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const MAGIC_TTL_MS = 1000 * 60 * 15;

// Crea un token de un solo uso y guarda SOLO su hash. Devuelve el token en claro
// para enviarlo por correo (nunca se persiste en claro).
export async function createInviteToken(
  userId: string,
  purpose: CampusInvitePurpose,
): Promise<string> {
  const raw = generateToken();
  const tokenHash = await hashToken(raw);
  const ttl = purpose === "magiclink" ? MAGIC_TTL_MS : INVITE_TTL_MS;
  await db.insert(campusInvites).values({
    userId,
    tokenHash,
    purpose,
    expiresAt: new Date(Date.now() + ttl),
  });
  return raw;
}

// Valida un token (propósito, no usado, no expirado) y lo marca como usado.
// Devuelve el userId dueño del token, o null si es inválido.
export async function consumeInviteToken(
  raw: string,
  purpose: CampusInvitePurpose,
): Promise<string | null> {
  if (!raw) return null;
  const tokenHash = await hashToken(raw);
  const rows = await db
    .select()
    .from(campusInvites)
    .where(and(eq(campusInvites.tokenHash, tokenHash), eq(campusInvites.purpose, purpose)));
  const inv = rows[0];
  if (!inv || inv.usedAt) return null;
  if (!inv.expiresAt || inv.expiresAt.getTime() < Date.now()) return null;
  await db.update(campusInvites).set({ usedAt: new Date() }).where(eq(campusInvites.id, inv.id));
  return inv.userId;
}
