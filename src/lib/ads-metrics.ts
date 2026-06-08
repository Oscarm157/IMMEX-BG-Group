import type { Ad } from "./ads-data";

export type AdMetrics = {
  spend: number;
  budget: number;
  leadCount: number;
  wonCount: number;
  cpl: number | null; // costo por lead
  ctr: number | null; // clics / impresiones
  conversion: number | null; // ganados / leads
};

export function adMetrics(ad: Pick<Ad, "spend" | "budget" | "impressions" | "clicks">, leadCount: number, wonCount: number): AdMetrics {
  const spend = ad.spend ?? 0;
  const budget = ad.budget ?? 0;
  const cpl = leadCount > 0 ? Math.round(spend / leadCount) : null;
  const ctr = ad.impressions && ad.impressions > 0 && ad.clicks != null ? ad.clicks / ad.impressions : null;
  const conversion = leadCount > 0 ? wonCount / leadCount : null;
  return { spend, budget, leadCount, wonCount, cpl, ctr, conversion };
}

// Agregados para el dashboard de cliente / lista.
export function aggregateAdMetrics(items: { spend: number | null; leadCount: number; wonCount: number }[]) {
  const spend = items.reduce((s, a) => s + (a.spend ?? 0), 0);
  const leadCount = items.reduce((s, a) => s + a.leadCount, 0);
  const wonCount = items.reduce((s, a) => s + a.wonCount, 0);
  return {
    spend,
    leadCount,
    wonCount,
    cpl: leadCount > 0 ? Math.round(spend / leadCount) : null,
    conversion: leadCount > 0 ? wonCount / leadCount : null,
  };
}
