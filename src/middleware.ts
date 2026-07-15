import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CRM_COOKIE, verifySession as verifyCrmSession } from "@/lib/crm-auth";
import { CAMPUS_COOKIE, verifySession as verifyCampusSession } from "@/lib/campus-auth";

// Rutas del campus accesibles sin sesión (login y canje de invitación/magic link).
const CAMPUS_PUBLIC = [
  "/campus/login",
  "/campus/fijar-password",
  "/campus/invite",
  "/campus/magic",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
  matcher: ["/admin/:path*", "/campus/:path*"],
};
