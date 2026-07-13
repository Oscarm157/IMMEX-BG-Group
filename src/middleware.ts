import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CRM_COOKIE, verifySession } from "@/lib/crm-auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const session = await verifySession(req.cookies.get(CRM_COOKIE)?.value);
  if (session) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
