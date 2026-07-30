"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SITE_GATE_COOKIE, checkGatePassword, signGateSession } from "@/lib/site-gate-auth";
import { makeRateLimiter } from "@/lib/rate-limit";

const unlockLimiter = makeRateLimiter(60_000, 8);

export async function unlock(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (unlockLimiter(ip) || !checkGatePassword(password)) {
    redirect(`/acceso-sitio?next=${encodeURIComponent(next)}&error=1`);
  }

  const jar = await cookies();
  jar.set(SITE_GATE_COOKIE, await signGateSession(), {
    httpOnly: true,
    secure: process.env.PREVIEW_INSECURE_COOKIE !== "1",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect(next.startsWith("/") ? next : "/");
}
