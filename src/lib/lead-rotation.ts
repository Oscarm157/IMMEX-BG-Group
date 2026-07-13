import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "./db";
import { leads, settings, users } from "./schema";

const ROTATION_KEY = "lead_rotation";

export type RotationMode = "off" | "round_robin" | "percentage";
export type RotationConfig = { mode: RotationMode; weights: Record<string, number> };

const DEFAULT_CONFIG: RotationConfig = { mode: "off", weights: {} };

function parseConfig(value: string | undefined): RotationConfig {
  if (!value) return DEFAULT_CONFIG;
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && typeof parsed.mode === "string") {
      return { mode: parsed.mode, weights: parsed.weights ?? {} };
    }
  } catch {
    /* falls through to default */
  }
  return DEFAULT_CONFIG;
}

export async function getLeadRotationConfig(): Promise<{ config: RotationConfig; updatedAt: Date | null }> {
  const rows = await db.select().from(settings).where(eq(settings.key, ROTATION_KEY));
  return { config: parseConfig(rows[0]?.value), updatedAt: rows[0]?.updatedAt ?? null };
}

export async function setLeadRotationConfig(config: RotationConfig): Promise<void> {
  const value = JSON.stringify(config);
  await db
    .insert(settings)
    .values({ key: ROTATION_KEY, value })
    .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } });
}

// Round robin y "por porcentajes" son el mismo cálculo: a quien tenga el déficit
// (leads recibidos / peso) más bajo le toca el siguiente. Round robin = peso 1 para
// todos. Sin estado guardado (puntero/índice): se recalcula desde `leads` en cada
// request, así que un cambio de pool de elegibles se refleja solo, sin reconciliar nada.
export async function assignNextLead(): Promise<string | null> {
  const { config, updatedAt } = await getLeadRotationConfig();
  if (config.mode === "off") return null;

  const eligible = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.role, "agent"), eq(users.active, true)));
  if (eligible.length === 0) return null;

  const weightOf = (id: string) => (config.mode === "round_robin" ? 1 : config.weights[id] ?? 0);
  const pool = eligible.filter((u) => weightOf(u.id) > 0);
  if (pool.length === 0) return null;

  const cutoff = updatedAt ?? new Date(0);
  const ids = pool.map((u) => u.id);
  const stats = await db
    .select({
      id: leads.assignedTo,
      count: sql<number>`count(*)`,
      lastAt: sql<string | null>`max(${leads.createdAt})`,
    })
    .from(leads)
    .where(
      and(
        inArray(leads.assignedTo, ids),
        inArray(leads.source, ["bot", "form"]),
        gte(leads.createdAt, cutoff)
      )
    )
    .groupBy(leads.assignedTo);
  const statsById = new Map(stats.map((s) => [s.id, s]));

  let best: { id: string; deficit: number; lastAt: string | null } | null = null;
  for (const u of pool) {
    const s = statsById.get(u.id);
    const deficit = (s?.count ?? 0) / weightOf(u.id);
    const lastAt = s?.lastAt ?? null;
    if (
      !best ||
      deficit < best.deficit ||
      (deficit === best.deficit && (lastAt ?? "") < (best.lastAt ?? ""))
    ) {
      best = { id: u.id, deficit, lastAt };
    }
  }
  return best?.id ?? null;
}
