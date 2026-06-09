import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds, canViewAds, isClient } from "@/lib/crm-permissions";
import { getAds, getClients } from "@/lib/ads-data";
import { adMetrics, aggregateAdMetrics } from "@/lib/ads-metrics";

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

  const client = isClient(me.role);
  const scope = client ? me.clientId : null;
  if (client && !scope) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-7">
        <div className="crm-empty px-6 py-20"><p className="text-[14px] text-[var(--crm-ink-soft)]">No hay un cliente asignado a tu cuenta.</p></div>
      </div>
    );
  }

  const items = await getAds(scope);
  const clients = client ? [] : await getClients();
  const clientName = (id: string | null) => clients.find((c) => c.id === id)?.name ?? "—";
  const agg = aggregateAdMetrics(items.map((a) => ({ spend: a.spend, leadCount: a.leadCount, wonCount: a.wonCount })));

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">Campañas</h1>
          <p className="mt-1 text-[13px] text-[var(--crm-ink-mute)]">
            {client ? "Tus campañas y su rendimiento." : "Campañas, presupuesto y trazabilidad a leads."}
          </p>
        </div>
        {canManageAds(me.role) && <Link href="/admin/ads/new" className="crm-btn crm-btn-primary">Nuevo anuncio</Link>}
      </div>

      {/* Resumen agregado */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Inversión", value: money(agg.spend) },
          { label: "Leads", value: String(agg.leadCount) },
          { label: "Costo por lead", value: money(agg.cpl) },
          { label: "Conversión", value: pct(agg.conversion) },
        ].map((k) => (
          <div key={k.label} className="crm-card p-4">
            <span className="block font-serif text-[26px] leading-none tracking-tight tabular-nums" style={{ color: "var(--crm-wine)" }}>{k.value}</span>
            <span className="mt-2 block text-[12px] text-[var(--crm-ink-mute)]">{k.label}</span>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="crm-empty px-6 py-20">
          <p className="text-[14px] text-[var(--crm-ink-soft)]">Aún no hay anuncios.</p>
          {canManageAds(me.role) && <Link href="/admin/ads/new" className="crm-btn crm-btn-secondary crm-btn-sm mt-4">Crear el primero</Link>}
        </div>
      ) : (
        <div className="crm-card overflow-hidden">
          <table className="crm-table">
            <thead className="crm-thead">
              <tr>
                <th className="crm-th">Anuncio</th>
                {!client && <th className="crm-th">Cliente</th>}
                <th className="crm-th">Plataforma</th>
                <th className="crm-th">Estado</th>
                <th className="crm-th">Inversión</th>
                <th className="crm-th">Leads</th>
                <th className="crm-th">CPL</th>
                <th className="crm-th">Conv.</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => {
                const m = adMetrics(a, a.leadCount, a.wonCount);
                return (
                  <tr key={a.id} className="crm-row border-t border-[var(--crm-line)]">
                    <td className="crm-td">
                      <Link href={`/admin/ads/${a.id}`} className="font-medium text-[var(--crm-ink)] hover:text-[var(--crm-wine)]">{a.name}</Link>
                    </td>
                    {!client && <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">{clientName(a.clientId)}</td>}
                    <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">{PLATFORM_LABEL[a.platform]}</td>
                    <td className="crm-td"><span className={`crm-badge ${a.status === "active" ? "crm-badge-wine" : ""}`}>{STATUS_LABEL[a.status]}</span></td>
                    <td className="crm-td text-[13px] tabular-nums text-[var(--crm-ink-soft)]">{money(a.spend)}</td>
                    <td className="crm-td text-[13px] tabular-nums text-[var(--crm-ink)]">{a.leadCount}</td>
                    <td className="crm-td text-[13px] tabular-nums text-[var(--crm-ink-soft)]">{money(m.cpl)}</td>
                    <td className="crm-td text-[13px] tabular-nums text-[var(--crm-ink-soft)]">{pct(m.conversion)}</td>
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
