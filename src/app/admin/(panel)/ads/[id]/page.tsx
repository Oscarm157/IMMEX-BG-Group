import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds, canViewAds, isClient } from "@/lib/crm-permissions";
import { getAdById, leadsForAd, getActiveClients } from "@/lib/ads-data";
import { adMetrics } from "@/lib/ads-metrics";
import { updateAd, deleteAd } from "@/app/admin/ads-actions";
import { AdForm } from "@/components/crm/ads/AdForm";
import { STATUS_LABELS } from "@/lib/crm-status";
import { fmtDate } from "@/lib/crm-format";

export const dynamic = "force-dynamic";

const money = (n: number | null | undefined) =>
  n == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
const pct = (n: number | null) => (n == null ? "—" : `${Math.round(n * 100)}%`);
const STATUS_LABEL: Record<string, string> = { draft: "Borrador", active: "Activo", paused: "Pausado", ended: "Finalizado" };

export default async function AdDetail({ params }: { params: Promise<{ id: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canViewAds(me.role)) redirect("/admin");

  const { id } = await params;
  const ad = await getAdById(id);
  if (!ad) notFound();
  const client = isClient(me.role);
  if (client && ad.clientId !== me.clientId) redirect("/admin/ads");

  const leads = await leadsForAd(id);
  const wonCount = leads.filter((l) => l.status === "won").length;
  const m = adMetrics(ad, leads.length, wonCount);
  const editable = canManageAds(me.role);
  const clients = editable ? await getActiveClients() : [];

  const kpis = [
    { label: "Inversión", value: money(m.spend) },
    { label: "Presupuesto", value: money(ad.budget) },
    { label: "Leads", value: String(m.leadCount) },
    { label: "Costo por lead", value: money(m.cpl) },
    { label: "Conversión", value: pct(m.conversion) },
    { label: "CTR", value: m.ctr == null ? "—" : `${(m.ctr * 100).toFixed(1)}%` },
  ];

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/ads" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--crm-wine)]">&larr; Anuncios</Link>
        {editable && (
          <form action={deleteAd.bind(null, ad.id)}>
            <button className="crm-btn crm-btn-ghost crm-btn-sm text-[var(--crm-wine)]">Borrar</button>
          </form>
        )}
      </div>

      <div className="mb-2 flex items-center gap-3">
        <h1 className="font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">{ad.name}</h1>
        <span className={`crm-badge ${ad.status === "active" ? "crm-badge-wine" : ""}`}>{STATUS_LABEL[ad.status]}</span>
      </div>
      <p className="mb-6 text-[13px] text-[var(--crm-ink-mute)]">
        {[ad.startDate, ad.endDate].filter(Boolean).join(" a ") || "Sin fechas"}
        {ad.objective ? ` · ${ad.objective}` : ""}
      </p>

      {/* Arte + KPIs */}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="crm-card overflow-hidden">
          {ad.creativeUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={ad.creativeUrl} alt="" className="aspect-[4/5] w-full object-cover" />
          ) : (
            <div className="grid aspect-[4/5] place-items-center" style={{ background: "var(--crm-surface-2)" }}>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--crm-ink-mute)]">Arte del anuncio</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.label} className="crm-card p-4">
              <span className="block font-serif text-[24px] leading-none tracking-tight tabular-nums" style={{ color: "var(--crm-wine)" }}>{k.value}</span>
              <span className="mt-2 block text-[12px] text-[var(--crm-ink-mute)]">{k.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leads atribuidos (no visible para cliente) */}
      {!client && (
        <div className="mt-8">
          <h2 className="mb-3 font-serif text-lg text-[var(--crm-ink)]">Leads atribuidos ({leads.length})</h2>
          {leads.length === 0 ? (
            <div className="crm-card p-6 text-[13px] text-[var(--crm-ink-mute)]">
              Aún no hay leads atribuidos. Se enlazan por UTM (utm_campaign = {ad.utmCampaign || "sin código"}) o manualmente desde el lead.
            </div>
          ) : (
            <div className="crm-card overflow-hidden">
              <table className="crm-table">
                <thead className="crm-thead"><tr><th className="crm-th">Lead</th><th className="crm-th">Estado</th><th className="crm-th">Origen</th><th className="crm-th">Fecha</th></tr></thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="crm-row border-t border-[var(--crm-line)]">
                      <td className="crm-td"><Link href={`/admin/${l.id}`} className="text-[var(--crm-ink)] hover:text-[var(--crm-wine)]">{l.name ?? l.email ?? "Lead"}</Link></td>
                      <td className="crm-td text-[13px]">{STATUS_LABELS[l.status]}</td>
                      <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">{l.source}</td>
                      <td className="crm-td text-[13px] text-[var(--crm-ink-mute)]">{l.createdAt ? fmtDate(l.createdAt) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Editor (equipo) */}
      {editable && (
        <div className="mt-10">
          <h2 className="mb-4 font-serif text-lg text-[var(--crm-ink)]">Editar anuncio</h2>
          <AdForm ad={ad} clients={clients} action={updateAd.bind(null, ad.id)} submitLabel="Guardar cambios" />
        </div>
      )}
    </div>
  );
}
