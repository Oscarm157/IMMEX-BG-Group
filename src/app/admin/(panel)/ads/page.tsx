import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds, canViewAds } from "@/lib/crm-permissions";
import { getAds } from "@/lib/ads-data";
import { adMetrics, aggregateAdMetrics } from "@/lib/ads-metrics";
import { PageHeader } from "@/components/crm/PageShell";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = { draft: "Borrador", active: "Activo", paused: "Pausado", ended: "Finalizado" };
const PLATFORM_LABEL: Record<string, string> = { meta: "Meta", google: "Google", tiktok: "TikTok", linkedin: "LinkedIn", otro: "Otro" };
const money = (n: number | null | undefined) =>
  n == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
const pct = (n: number | null) => (n == null ? "—" : `${Math.round(n * 100)}%`);

export default async function AdsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canViewAds(me.role)) redirect("/admin");

  const items = await getAds();
  const agg = aggregateAdMetrics(items.map((a) => ({ spend: a.spend, leadCount: a.leadCount, wonCount: a.wonCount })));
  const active = items.filter((a) => a.status === "active").length;

  // Acento mint reservado a un solo dato: la conversión (señal de desempeño).
  const kpis: { label: string; value: string; accent?: boolean }[] = [
    { label: "Inversión", value: money(agg.spend) },
    { label: "Leads", value: String(agg.leadCount) },
    { label: "Costo por lead", value: money(agg.cpl) },
    { label: "Conversión", value: pct(agg.conversion), accent: true },
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-7">
      <PageHeader
        eyebrow="Marketing"
        title="Campañas"
        description="Presupuesto, desempeño y trazabilidad de cada campaña hacia sus leads."
        actions={canManageAds(me.role) && <Link href="/admin/ads/new" className="crm-btn crm-btn-primary">Nueva campaña</Link>}
      />

      <div className="crm-card mb-6 overflow-hidden p-0">
        <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "var(--crm-line)" }}>
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="crm-fade flex min-h-[104px] flex-col justify-between p-4"
              style={{ background: "var(--crm-surface-2)", animationDelay: `${i * 55}ms` }}
            >
              <p className="text-[12px] font-medium" style={{ color: "var(--crm-ink-mute)" }}>{k.label}</p>
              <span
                className="crm-num font-semibold text-[27px] leading-none tracking-[-0.025em]"
                style={{ color: k.accent ? "var(--crm-accent-strong)" : "var(--crm-ink)" }}
              >
                {k.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="crm-empty px-6 py-20">
          <p className="text-[14px] text-[var(--crm-ink-soft)]">Aún no hay campañas registradas.</p>
          {canManageAds(me.role) && <Link href="/admin/ads/new" className="crm-btn crm-btn-secondary crm-btn-sm mt-4">Crear la primera</Link>}
        </div>
      ) : (
        <div className="crm-card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--crm-line)] px-4 py-3">
            <h2 className="crm-h2">Todas las campañas</h2>
            <span className="crm-num text-[12px] text-[var(--crm-ink-mute)]">
              {items.length} {items.length === 1 ? "campaña" : "campañas"} · {active} {active === 1 ? "activa" : "activas"}
            </span>
          </div>
          <table className="crm-table">
            <thead className="crm-thead">
              <tr>
                <th className="crm-th">Campaña</th>
                <th className="crm-th">Plataforma</th>
                <th className="crm-th">Estado</th>
                <th className="crm-th text-right">Inversión</th>
                <th className="crm-th text-right">Leads</th>
                <th className="crm-th text-right">CPL</th>
                <th className="crm-th text-right">Conv.</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a, i) => {
                const m = adMetrics(a, a.leadCount, a.wonCount);
                return (
                  <tr
                    key={a.id}
                    className="crm-row crm-fade border-t border-[var(--crm-line)]"
                    style={{ animationDelay: `${Math.min(i, 12) * 28}ms` }}
                  >
                    <td className="crm-td">
                      <Link href={`/admin/ads/${a.id}`} className="font-medium text-[var(--crm-ink)] transition-colors hover:text-[var(--crm-accent-strong)]">{a.name}</Link>
                    </td>
                    <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">{PLATFORM_LABEL[a.platform]}</td>
                    <td className="crm-td">
                      <span className={`crm-badge ${a.status === "active" ? "crm-badge-wine" : ""}`}>{STATUS_LABEL[a.status]}</span>
                    </td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">{money(a.spend)}</td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink)]">{a.leadCount}</td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">{money(m.cpl)}</td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">{pct(m.conversion)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
