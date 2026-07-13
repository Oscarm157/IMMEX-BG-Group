import * as cheerio from "cheerio";
import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

// Bloqueo SSRF: rechaza hosts que resuelvan a rangos privados/loopback/link-local
// para que el fetch del server no se pueda usar como proxy hacia la red interna.
function isPrivateIp(ip: string): boolean {
  const v = isIP(ip);
  if (v === 4) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10) return true;
    if (p[0] === 127) return true; // loopback
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true; // link-local / metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    return false;
  }
  if (v === 6) {
    const ipl = ip.toLowerCase();
    if (ipl === "::1" || ipl === "::") return true; // loopback
    if (ipl.startsWith("fe80")) return true; // link-local
    if (ipl.startsWith("fc") || ipl.startsWith("fd")) return true; // unique-local fc00::/7
    // IPv4 mapeado en IPv6 (::ffff:a.b.c.d)
    const m = ipl.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (m) return isPrivateIp(m[1]);
    return false;
  }
  return false;
}

async function assertPublicHost(host: string): Promise<void> {
  const bare = host.replace(/^\[|\]$/g, "");
  if (bare.toLowerCase() === "localhost") throw new Error("URL no permitida.");
  // Si el host ya es una IP, se valida directo; si es dominio, se resuelve.
  const candidates = isIP(bare)
    ? [bare]
    : (await lookup(bare, { all: true })).map((a) => a.address);
  if (candidates.length === 0) throw new Error("No se pudo resolver el dominio.");
  if (candidates.some(isPrivateIp)) throw new Error("URL no permitida.");
}

export async function extractUrl(url: string): Promise<string> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("URL inválida.");
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error("Solo se permiten URLs http/https.");
  }

  // Seguir redirects a mano validando cada salto (un redirect a una IP interna
  // también sería SSRF si dejáramos redirect:"follow").
  let current = parsed;
  let res: Response | null = null;
  for (let hop = 0; hop < 5; hop++) {
    await assertPublicHost(current.hostname);
    res = await fetch(current.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ConsultingPostsBot/1.0; +https://bgconsultingroup.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "manual",
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) break;
      const next = new URL(loc, current);
      if (!/^https?:$/.test(next.protocol)) throw new Error("Redirect no permitido.");
      current = next;
      continue;
    }
    break;
  }

  if (!res || !res.ok) {
    throw new Error(`La URL devolvió status ${res?.status ?? "sin respuesta"}.`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // Quitar ruido común
  $("script, style, noscript, nav, footer, header, aside, form, iframe").remove();

  // Intentar tomar primero <article> o <main>, luego body
  let root = $("article").first();
  if (root.length === 0) root = $("main").first();
  if (root.length === 0) root = $("body");

  const title = $("title").first().text().trim();
  const body = root.text();

  const cleaned = cleanText(body);
  return title ? `${title}\n\n${cleaned}` : cleaned;
}

function cleanText(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[  ]{2,}/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
