import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds, canViewAds } from "@/lib/crm-permissions";
import { getAdById, leadsForAd } from "@/lib/ads-data";
import { adMetrics } from "@/lib/ads-metrics";
import { updateAd } from "@/app/admin/ads-actions";
import { AdForm } from "@/components/crm/ads/AdForm";
import { DeleteAdButton } from "@/components/crm/DeleteAdButton";
import { StatusBadge, SourceBadge } from "@/components/crm/status";
import { SectionHeader } from "@/components/crm/PageShell";
import { fmtDate } from "@/lib/crm-format";

export const dynamic = "force-dynamic";

const money = (n: number | null | undefined) =>
  n == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
const pct = (n: number | null) => (n == null ? "—" : `${Math.round(n * 100)}%`);
const STATUS_LABEL: Record<string, string> = { draft: "Borrador", active: "Activo", paused: "Pausado", ended: "Finalizado" };
const PLATFORM_LABEL: Record<string, string> = { meta: "Meta", google: "Google", tiktok: "TikTok", linkedin: "LinkedIn", otro: "Otro" };

export default async function AdDetail({ params }: { params: Promise<{ id: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canViewAds(me.role)) redirect("/admin");

  const { id } = await params;
  const ad = await getAdById(id);
  if (!ad) notFound();

  const leads = await leadsForAd(id);
  const wonCount = leads.filter((l) => l.status === "won").length;
  const m = adMetrics(ad, leads.length, wonCount);
  const editable = canManageAds(me.role);

  const convWidth = m.conversion == null ? 0 : Math.min(100, Math.max(3, Math.round(m.conversion * 100)));

  // Métricas secundarias: jerarquía menor que el par cabecera (Leads / Conversión).
  const secondary = [
    { label: "Inversión", value: money(m.spend) },
    { label: "Presupuesto", value: money(ad.budget) },
    { label: "Costo por lead", value: money(m.cpl) },
    { label: "CTR", value: m.ctr == null ? "—" : `${(m.ctr * 100).toFixed(1)}%` },
  ];

  const dateRange = [ad.startDate, ad.endDate].filter(Boolean).join(" a ") || "Sin fechas definidas";

  return (
    <div className="mx-auto max-w-[960px] px-4 py-8 sm:px-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/ads"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--crm-ink-mute)] transition-colors hover:text-[var(--crm-ink)]"
        >
          <span aria-hidden>&larr;</span> Campañas
        </Link>
        {editable && <DeleteAdButton id={ad.id} />}
      </div>

      <div className="crm-fade mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="crm-h1">{ad.name}</h1>
          <span className={`crm-badge ${ad.status === "active" ? "crm-badge-wine" : ""}`}>{STATUS_LABEL[ad.status]}</span>
        </div>
        <p className="mt-2 text-[13px] text-[var(--crm-ink-mute)]">
          {PLATFORM_LABEL[ad.platform]} · {dateRange}
          {ad.objective ? ` · ${ad.objective}` : ""}
        </p>
      </div>

      {/* Arte + métricas con jerarquía (cabecera grande, secundarias densas) */}
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="crm-card crm-fade overflow-hidden" style={{ animationDelay: "40ms" }}>
          {ad.creativeUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={ad.creativeUrl} alt={`Arte de ${ad.name}`} className="aspect-[4/5] w-full bg-[var(--crm-surface)] object-cover" />
          ) : (
            <div className="grid aspect-[4/5] place-items-center" style={{ background: "var(--crm-surface)" }}>
              <span className="text-[12px] text-[var(--crm-ink-faint)]">Sin arte cargado</span>
            </div>
          )}
        </div>

        <div className="crm-card crm-fade overflow-hidden p-0" style={{ animationDelay: "80ms" }}>
          <div className="flex flex-col gap-px" style={{ background: "var(--crm-line)" }}>
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--crm-line)" }}>
              <div className="flex min-h-[128px] flex-col justify-between p-5" style={{ background: "var(--crm-surface-2)" }}>
                <p className="text-[12px] font-medium" style={{ color: "var(--crm-ink-mute)" }}>Leads atribuidos</p>
                <span className="crm-num font-semibold text-[34px] leading-none tracking-[-0.03em]" style={{ color: "var(--crm-ink)" }}>{m.leadCount}</span>
              </div>
              <div className="flex min-h-[128px] flex-col justify-between p-5" style={{ background: "var(--crm-surface-2)" }}>
                <p className="text-[12px] font-medium" style={{ color: "var(--crm-ink-mute)" }}>Conversión</p>
                <div>
                  <span className="crm-num font-semibold text-[34px] leading-none tracking-[-0.03em]" style={{ color: "var(--crm-accent-strong)" }}>{pct(m.conversion)}</span>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--crm-surface)" }}>
                    <div className="h-full rounded-full" style={{ background: "var(--crm-accent)", width: `${convWidth}%` }} />
                  </div>
                  <p className="crm-num mt-2 text-[12px]" style={{ color: "var(--crm-ink-mute)" }}>{m.wonCount} ganados de {m.leadCount}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "var(--crm-line)" }}>
              {secondary.map((s) => (
                <div key={s.label} className="flex min-h-[88px] flex-col justify-between p-4" style={{ background: "var(--crm-surface-2)" }}>
                  <p className="text-[12px] font-medium" style={{ color: "var(--crm-ink-mute)" }}>{s.label}</p>
                  <span className="crm-num font-semibold text-[20px] leading-none tracking-[-0.02em]" style={{ color: "var(--crm-ink)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leads atribuidos */}
      <div className="mt-8">
        <SectionHeader title={`Leads atribuidos (${leads.length})`} className="mb-3" />
        {leads.length === 0 ? (
          <div className="crm-card p-6 text-[13px] leading-relaxed text-[var(--crm-ink-mute)]">
            Aún no hay leads atribuidos. Se enlazan por UTM (utm_campaign = {ad.utmCampaign || "sin código"}) al momento de crearse el lead.
          </div>
        ) : (
          <div className="crm-card overflow-hidden">
            <table className="crm-table">
              <thead className="crm-thead">
                <tr>
                  <th className="crm-th">Lead</th>
                  <th className="crm-th">Estado</th>
                  <th className="crm-th">Origen</th>
                  <th className="crm-th text-right">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr
                    key={l.id}
                    className="crm-row crm-fade border-t border-[var(--crm-line)]"
                    style={{ animationDelay: `${Math.min(i, 12) * 28}ms` }}
                  >
                    <td className="crm-td">
                      <Link href={`/admin/${l.id}`} className="font-medium text-[var(--crm-ink)] transition-colors hover:text-[var(--crm-accent-strong)]">{l.name ?? l.email ?? "Lead"}</Link>
                    </td>
                    <td className="crm-td"><StatusBadge status={l.status} /></td>
                    <td className="crm-td"><SourceBadge source={l.source} /></td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-mute)]">{l.createdAt ? fmtDate(l.createdAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor (equipo) */}
      {editable && (
        <div className="mt-10">
          <SectionHeader title="Editar campaña" className="mb-4" />
          <AdForm ad={ad} action={updateAd.bind(null, ad.id)} submitLabel="Guardar cambios" />
        </div>
      )}
    </div>
  );
}
