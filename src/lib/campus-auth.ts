// Primitivas de auth del Campus (sin imports de Next; Edge-safe para middleware
// y Node para server actions). Cookie y secreto PROPIOS, separados del CRM:
// `campus_session` firmada con CAMPUS_SECRET. El hashing de contraseña (PBKDF2)
// es genérico y se reusa de crm-auth; la firma de sesión y el hash de tokens de
// invitación/magic link viven aquí con el secreto del campus.

import { hashPassword, verifyPassword } from "./crm-auth";

export { hashPassword, verifyPassword };

export const CAMPUS_COOKIE = "campus_session";
const enc = new TextEncoder();
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 días

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function secret(): string {
  const s = process.env.CAMPUS_SECRET;
  if (!s || s.length < 16) {
    throw new Error("CAMPUS_SECRET is not set (or too short); cannot sign sessions.");
  }
  return s;
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacHex(msg: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return toHex(sig);
}

// Sesión: cookie firmada `uid.iat.version.HMAC`. version se ata a
// campus_users.sessionVersion para invalidar cookies al resetear/desactivar.
export async function signSession(userId: string, issuedAt: number, version = 0): Promise<string> {
  const payload = `${userId}.${issuedAt}.${version}`;
  return `${payload}.${await hmacHex(payload)}`;
}

export async function verifySession(
  token: string | undefined,
): Promise<{ uid: string; ver: number } | null> {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  if (!timingSafeEqual(sig, await hmacHex(payload))) return null;
  const [uid, iatStr, verStr] = payload.split(".");
  const iat = Number(iatStr);
  if (!uid || !Number.isFinite(iat)) return null;
  if (Date.now() / 1000 - iat > SESSION_MAX_AGE_S) return null;
  return { uid, ver: Number(verStr) || 0 };
}

// Tokens de invitación / magic link: se envía el token en claro por correo y se
// guarda solo su hash sha256 en DB (campus_invites.tokenHash).
export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(token));
  return toHex(digest);
}
