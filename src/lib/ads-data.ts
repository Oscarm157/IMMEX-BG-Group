import { desc, eq, sql, asc } from "drizzle-orm";
import { db } from "./db";
import { ads, clients, leads } from "./schema";

export type Ad = typeof ads.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type AdWithStats = Ad & { leadCount: number; wonCount: number };

export async function getClients(): Promise<Client[]> {
  return db.select().from(clients).orderBy(desc(clients.createdAt));
}

export async function getActiveClients(): Promise<Client[]> {
  return db.select().from(clients).where(eq(clients.active, true)).orderBy(asc(clients.name));
}

export async function getClientById(id: string): Promise<Client | null> {
  const r = await db.select().from(clients).where(eq(clients.id, id));
  return r[0] ?? null;
}

async function leadCounts() {
  const rows = await db
    .select({
      adId: leads.adId,
      n: sql<number>`count(*)::int`,
      won: sql<number>`count(*) filter (where ${leads.status} = 'won')::int`,
    })
    .from(leads)
    .groupBy(leads.adId);
  const map = new Map<string, { n: number; won: number }>();
  for (const r of rows) if (r.adId) map.set(r.adId, { n: r.n, won: r.won });
  return map;
}

export async function getAds(clientId?: string | null): Promise<AdWithStats[]> {
  const base = db.select().from(ads);
  const rows = clientId
    ? await base.where(eq(ads.clientId, clientId)).orderBy(desc(ads.createdAt))
    : await base.orderBy(desc(ads.createdAt));
  const counts = await leadCounts();
  return rows.map((a) => ({ ...a, leadCount: counts.get(a.id)?.n ?? 0, wonCount: counts.get(a.id)?.won ?? 0 }));
}

export async function getAdById(id: string): Promise<Ad | null> {
  const r = await db.select().from(ads).where(eq(ads.id, id));
  return r[0] ?? null;
}

export async function leadsForAd(adId: string) {
  return db
    .select({ id: leads.id, name: leads.name, email: leads.email, status: leads.status, source: leads.source, createdAt: leads.createdAt })
    .from(leads)
    .where(eq(leads.adId, adId))
    .orderBy(desc(leads.createdAt));
}
