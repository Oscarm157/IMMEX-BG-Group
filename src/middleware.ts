import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CRM_COOKIE, verifySession as verifyCrmSession } from "@/lib/crm-auth";
import { CAMPUS_COOKIE, verifySession as verifyCampusSession } from "@/lib/campus-auth";
import { SITE_GATE_COOKIE, verifyGateSession } from "@/lib/site-gate-auth";

// Rutas ajenas al sitio público (mini-sitios de otro cliente o decks internos)
// que viven en el dominio pero no deben quedar abiertas a cualquiera con el link.
const GATED_PREFIXES = ["/serpientes-tijuana", "/presentacion-junio"];

// Rutas del campus accesibles sin sesión (login y canje de invitación/magic link).
const CAMPUS_PUBLIC = [
  "/campus/login",
  "/campus/fijar-password",
  "/campus/invite",
  "/campus/magic",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===== Rutas gateadas por contraseña compartida =====
  if (GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const unlocked = await verifyGateSession(req.cookies.get(SITE_GATE_COOKIE)?.value);
    if (unlocked) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/acceso-sitio";
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // ===== Campus (auth propia, aparte del CRM) =====
  if (pathname.startsWith("/campus")) {
    if (CAMPUS_PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();
    const session = await verifyCampusSession(req.cookies.get(CAMPUS_COOKIE)?.value);
    if (session) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/campus/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ===== Admin / CRM =====
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  const session = await verifyCrmSession(req.cookies.get(CRM_COOKIE)?.value);
  if (session) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/campus/:path*",
    "/serpientes-tijuana",
    "/serpientes-tijuana/:path*",
    "/presentacion-junio",
    "/presentacion-junio/:path*",
  ],
};
