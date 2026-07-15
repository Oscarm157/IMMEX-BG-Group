"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { campusUsers } from "@/lib/campus-schema";
import {
  CAMPUS_COOKIE,
  hashPassword,
  verifyPassword,
  signSession,
} from "@/lib/campus-auth";
import { getCurrentLearner } from "@/lib/campus-session";
import { createInviteToken, consumeInviteToken } from "@/lib/campus-invites";
import { sendLeadEmail } from "@/lib/composio-mail";
import { makeRateLimiter } from "@/lib/rate-limit";

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const loginLimiter = makeRateLimiter(60_000, 8);
const magicLimiter = makeRateLimiter(60_000, 4);

async function setSessionCookie(uid: string, version: number) {
  const jar = await cookies();
  jar.set(CAMPUS_COOKIE, await signSession(uid, Math.floor(Date.now() / 1000), version), {
    httpOnly: true,
    secure: process.env.PREVIEW_INSECURE_COOKIE !== "1",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

// Base pública del campus para armar links de correo. En prod (subdominio) se
// setea CAMPUS_BASE_URL=https://campus.bgconsultingroup.com; en dev cae al origin
// actual con el prefijo /campus.
async function campusBaseUrl(): Promise<string> {
  if (process.env.CAMPUS_BASE_URL) return process.env.CAMPUS_BASE_URL.replace(/\/$/, "");
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}/campus`;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}

// ---- Login con contraseña ----
export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (loginLimiter(await clientIp())) redirect("/campus/login?error=rate");

  const rows = await db.select().from(campusUsers).where(eq(campusUsers.email, email));
  const u = rows[0];
  if (!u || !u.active || !u.passwordHash || !(await verifyPassword(password, u.passwordHash))) {
    redirect("/campus/login?error=1");
  }
  await setSessionCookie(u.id, u.sessionVersion);
  redirect(u.mustSetPassword ? "/campus/fijar-password" : "/campus");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(CAMPUS_COOKIE);
  redirect("/campus/login");
}

// ---- Magic link: solicitar ----
export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (magicLimiter(await clientIp())) redirect("/campus/login?sent=1");

  const rows = await db.select().from(campusUsers).where(eq(campusUsers.email, email));
  const u = rows[0];
  // Respuesta uniforme: no revelamos si el correo existe.
  if (u && u.active) {
    const token = await createInviteToken(u.id, "magiclink");
    const link = `${await campusBaseUrl()}/magic/${token}`;
    await sendLeadEmail({
      to: u.email,
      subject: "Tu acceso al Campus BG",
      html: `<p>Hola ${escapeHtml(u.name)},</p><p>Entra al Campus con este enlace (expira en 15 minutos):</p><p><a href="${link}">Acceder al Campus</a></p><p>Si no lo solicitaste, ignora este correo.</p>`,
    });
  }
  redirect("/campus/login?sent=1");
}

// ---- Magic link: consumir (desde /campus/magic/[token]) ----
export async function consumeMagicLink(token: string) {
  const userId = await consumeInviteToken(token, "magiclink");
  if (!userId) redirect("/campus/login?error=link");
  const rows = await db.select().from(campusUsers).where(eq(campusUsers.id, userId));
  const u = rows[0];
  if (!u || !u.active) redirect("/campus/login?error=link");
  await setSessionCookie(u.id, u.sessionVersion);
  redirect(u.mustSetPassword ? "/campus/fijar-password" : "/campus");
}

// ---- Invitación: activar cuenta fijando contraseña (desde /campus/invite/[token]) ----
export async function activateAccount(token: string, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) redirect(`/campus/invite/${token}?error=short`);

  const userId = await consumeInviteToken(token, "invite");
  if (!userId) redirect("/campus/login?error=link");

  const updated = await db
    .update(campusUsers)
    .set({
      passwordHash: await hashPassword(password),
      mustSetPassword: false,
      sessionVersion: sql`${campusUsers.sessionVersion} + 1`,
    })
    .where(eq(campusUsers.id, userId))
    .returning({ sessionVersion: campusUsers.sessionVersion });

  await setSessionCookie(userId, updated[0]?.sessionVersion ?? 0);
  redirect("/campus");
}

// ---- Fijar/cambiar contraseña (usuario con sesión) ----
export async function setPassword(formData: FormData) {
  const me = await getCurrentLearner();
  if (!me) redirect("/campus/login");
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) redirect("/campus/fijar-password?error=short");

  const updated = await db
    .update(campusUsers)
    .set({
      passwordHash: await hashPassword(password),
      mustSetPassword: false,
      sessionVersion: sql`${campusUsers.sessionVersion} + 1`,
    })
    .where(eq(campusUsers.id, me.id))
    .returning({ sessionVersion: campusUsers.sessionVersion });

  // Re-firma la cookie de ESTA sesión con la nueva versión para no auto-desloguearse.
  await setSessionCookie(me.id, updated[0]?.sessionVersion ?? 0);
  redirect("/campus");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
