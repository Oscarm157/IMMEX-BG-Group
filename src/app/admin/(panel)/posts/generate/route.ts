import { NextRequest, NextResponse } from "next/server";
import { generatePosts } from "@/lib/posts/anthropic";
import { getDirectorProfile } from "@/lib/posts/profiles";
import { getCurrentUser } from "@/lib/crm-session";
import { canManagePosts } from "@/lib/crm-permissions";
import { makeRateLimiter } from "@/lib/rate-limit";
import type { GenerateRequest, Red } from "@/lib/posts/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const VALID_NETWORKS: Red[] = ["linkedin", "instagram", "facebook"];
// Anti-abuso de la llamada a IA (cara): 15 generaciones por minuto por usuario.
const genLimiter = makeRateLimiter(60_000, 15);

export async function POST(req: NextRequest) {
  try {
    const me = await getCurrentUser();
    if (!me || !canManagePosts(me.role)) {
      return NextResponse.json({ error: "No autorizado." }, { status: 403 });
    }
    if (genLimiter(me.id)) {
      return NextResponse.json({ error: "Demasiadas generaciones seguidas, espera un minuto." }, { status: 429 });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Falta ANTHROPIC_API_KEY en el entorno." }, { status: 500 });
    }

    const body = (await req.json()) as Partial<GenerateRequest>;
    const { text, networks, approaches, profileId } = body;
    const mode = body.mode === "idea" ? "idea" : "source";
    const minChars = mode === "idea" ? 12 : 30;

    if (!text || typeof text !== "string" || text.trim().length < minChars) {
      return NextResponse.json({ error: `El texto es muy corto (mínimo ${minChars} caracteres).` }, { status: 400 });
    }
    if (!Array.isArray(networks) || networks.length === 0) {
      return NextResponse.json({ error: "Debes seleccionar al menos una red." }, { status: 400 });
    }
    for (const n of networks) {
      if (!VALID_NETWORKS.includes(n)) {
        return NextResponse.json({ error: `Red inválida: ${n}` }, { status: 400 });
      }
    }
    if (!Array.isArray(approaches) || approaches.length !== 3) {
      return NextResponse.json({ error: "Debes proveer exactamente 3 enfoques." }, { status: 400 });
    }
    for (const a of approaches) {
      if (typeof a !== "string" || a.trim().length === 0) {
        return NextResponse.json({ error: "Todos los enfoques deben ser texto no vacío." }, { status: 400 });
      }
    }
    if (!profileId || typeof profileId !== "string") {
      return NextResponse.json({ error: "Debes elegir el director que publica." }, { status: 400 });
    }
    const profile = await getDirectorProfile(profileId);
    if (!profile || !profile.active) {
      return NextResponse.json({ error: "El director seleccionado no existe o está inactivo." }, { status: 400 });
    }

    const result = await generatePosts(
      {
        text,
        networks: networks as Red[],
        approaches: approaches as [string, string, string],
        profileId,
        mode,
      },
      {
        name: profile.name,
        title: profile.title,
        expertise: profile.expertise,
        voice: profile.voice,
        avoid: profile.avoid,
      }
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/admin/posts/generate] error:", err);
    const message = err instanceof Error ? err.message : "Error desconocido.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
