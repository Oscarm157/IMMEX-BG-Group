import { and, eq, gt, lt } from "drizzle-orm";
import { db } from "./db";
import { rateLimitHits } from "./schema";

// Rate limit durable: cuenta intentos ya persistidos en Neon para una route+ip
// dentro de la ventana. A diferencia del límite en memoria de rate-limit.ts
// (best-effort, se resetea en cada cold start), esto sobrevive múltiples
// instancias serverless. Se usa junto al límite en memoria, no en su lugar.
export async function checkDurableRateLimit(
  route: string,
  ip: string,
  windowMs: number,
  max: number
): Promise<{ limited: boolean }> {
  if (ip === "unknown") return { limited: false };

  const since = new Date(Date.now() - windowMs);
  const recent = await db
    .select({ id: rateLimitHits.id })
    .from(rateLimitHits)
    .where(and(eq(rateLimitHits.route, route), eq(rateLimitHits.ip, ip), gt(rateLimitHits.createdAt, since)))
    .limit(max + 1);

  if (recent.length > max) return { limited: true };

  await db.insert(rateLimitHits).values({ route, ip });

  // Limpieza oportunista, no bloqueante: evita que la tabla crezca sin control.
  void db.delete(rateLimitHits).where(lt(rateLimitHits.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)));

  return { limited: false };
}
