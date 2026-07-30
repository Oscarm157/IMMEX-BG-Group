// Gate por contraseña compartida para rutas ajenas al sitio público (mini-sitios
// de otros clientes o decks internos que viven en el mismo dominio pero no deben
// quedar abiertos a cualquiera con el link). Reusa la firma HMAC del CRM: mismo
// CRM_SECRET, ningún secreto nuevo que provisionar en Vercel antes del go-live.
import { signSession, verifySession } from "./crm-auth";

export const SITE_GATE_COOKIE = "bg_site_gate";
const SITE_GATE_SUBJECT = "site-gate";

export async function signGateSession(): Promise<string> {
  return signSession(SITE_GATE_SUBJECT, Math.floor(Date.now() / 1000));
}

export async function verifyGateSession(token: string | undefined): Promise<boolean> {
  const session = await verifySession(token);
  return session?.uid === SITE_GATE_SUBJECT;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function checkGatePassword(submitted: string): boolean {
  const expected = process.env.SITE_GATE_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(submitted, expected);
}
