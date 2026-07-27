import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/crm/PageShell";
import { Plegable } from "@/components/crm/Plegable";
import { getCurrentUser } from "@/lib/crm-session";
import { canViewAds } from "@/lib/crm-permissions";
import { getGruposBreve, getIdeas, getPlazas, getResumen, getServicios } from "@/lib/keywords-data";
import { etiquetaServicio, type KwMercado } from "@/lib/keywords-schema";
import { Explorador } from "./Explorador";
import { KeywordsProvider } from "./KeywordsContext";

export const dynamic = "force-dynamic";
export const metadata = { title: "Keywords", robots: { index: false } };

const MERCADOS: Record<KwMercado, string> = {
  nacional_es: "En español",
  extranjero_en: "En inglés",
};

const num = (n: number, d = 0) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

const fmtFecha = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric" }).format(d)
    : "—";

export default async function KeywordsPage({
  searchParams,
}: {
  searchParams: Promise<{ servicio?: string; plaza?: string; mercado?: string }>;
}) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canViewAds(me.role)) redirect("/admin");

  const sp = await searchParams;
  const mercado =
    sp.mercado === "nacional_es" || sp.mercado === "extranjero_en" ? sp.mercado : undefined;

  const [servicios, plazas, resumen, grupos] = await Promise.all([
    getServicios(),
    getPlazas(),
    getResumen(),
    getGruposBreve(),
  ]);
  const servicio = servicios.find((s) => s.servicio === sp.servicio)?.servicio;
  const plaza = plazas.find((p) => p.plaza === sp.plaza)?.plaza;
  const ideas = await getIdeas({ servicio, plaza, mercado, limite: 600 });

  const url = (cambio: { servicio?: string; plaza?: string; mercado?: string }) => {
    const p = new URLSearchParams();
    const final = { servicio, plaza, mercado, ...cambio };
    if (final.servicio) p.set("servicio", final.servicio);
    if (final.plaza) p.set("plaza", final.plaza);
    if (final.mercado) p.set("mercado", final.mercado);
    return `/admin/keywords${p.size ? `?${p}` : ""}`;
  };

  if (!resumen.keywords) {
    return (
      <div className="mx-auto max-w-[1280px]">
        <PageHeader eyebrow="Pauta" title="Keywords" />
        <div className="crm-card p-10 text-center">
          <p className="text-[14px] text-[var(--crm-ink-soft)]">Todavía no hay research cargado.</p>
          <p className="mt-1 text-[13px] text-[var(--crm-ink-faint)]">
            Corre el motor en /root/google-ads-automation y luego{" "}
            <span className="crm-num">node --env-file=.env.local scripts/import-keywords.mjs</span>.
          </p>
        </div>
      </div>
    );
  }

  const escala = Math.max(...servicios.map((s) => s.total), 1);

  return (
    <div className="mx-auto max-w-[1280px]">
      <PageHeader
        eyebrow="Pauta"
        title="Keywords"
        description={`Demanda medida en Google Keyword Planner y SEMrush. ${num(resumen.keywords)} keywords en ${num(resumen.servicios)} servicios, ${num(resumen.volumen)} búsquedas al mes. Última corrida: ${fmtFecha(resumen.corridaEn)}.`}
        actions={
          <Link href="/admin/keywords/grupos" className="crm-btn crm-btn-sm crm-btn-secondary">
            Ver grupos
          </Link>
        }
      />

      {/* Servicio: el eje principal */}
      <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
        <Link
          href={url({ servicio: undefined })}
          className={`crm-btn crm-btn-sm ${!servicio ? "crm-btn-primary" : "crm-btn-secondary"}`}
        >
          Todos los servicios
        </Link>
        {servicios.map((s) => (
          <Link
            key={s.servicio}
            href={url({ servicio: s.servicio === servicio ? undefined : s.servicio })}
            className={`crm-btn crm-btn-sm ${
              s.servicio === servicio ? "crm-btn-primary" : "crm-btn-secondary"
            }`}
          >
            {etiquetaServicio(s.servicio)}
          </Link>
        ))}
      </div>

      {/* Plaza y mercado: filtros secundarios */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <Link
          href={url({ plaza: undefined, mercado: undefined })}
          className={`crm-btn crm-btn-sm ${
            !plaza && !mercado ? "crm-btn-primary" : "crm-btn-secondary"
          }`}
        >
          Todo el país
        </Link>
        {plazas.slice(0, 8).map((p) => (
          <Link
            key={p.plaza}
            href={url({ plaza: p.plaza === plaza ? undefined : p.plaza })}
            className={`crm-btn crm-btn-sm ${
              p.plaza === plaza ? "crm-btn-primary" : "crm-btn-secondary"
            }`}
          >
            {p.plaza}
          </Link>
        ))}
        {plaza && !plazas.slice(0, 8).some((p) => p.plaza === plaza) && (
          <span className="crm-btn crm-btn-sm crm-btn-primary">{plaza}</span>
        )}
        <span className="mx-1 h-4 w-px bg-[var(--crm-line)]" />
        {(Object.keys(MERCADOS) as KwMercado[]).map((m) => (
          <Link
            key={m}
            href={url({ mercado: mercado === m ? undefined : m })}
            className={`crm-btn crm-btn-sm ${mercado === m ? "crm-btn-primary" : "crm-btn-secondary"}`}
          >
            {MERCADOS[m]}
          </Link>
        ))}
      </div>

      <KeywordsProvider ideas={ideas}>
        <Explorador total={resumen.keywords} grupos={grupos} />
      </KeywordsProvider>

      {/* Comparativo de servicios: para decidir por dónde entrar, no para el día a día */}
      <Plegable
        id="kw-servicios"
        titulo="Los servicios comparados"
        contador={num(servicios.length)}
        inicial={false}
      >
        <div className="crm-card overflow-x-auto">
          <table className="crm-table min-w-[720px]">
            <thead className="crm-thead">
              <tr>
                <th className="crm-th">Servicio</th>
                <th className="crm-th">Reparto</th>
                <th className="crm-th text-right">Nacional</th>
                <th className="crm-th text-right">Extranjero</th>
                <th className="crm-th text-right">Total</th>
                <th className="crm-th text-right">CPC</th>
                <th className="crm-th text-right">Disputa</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => {
                const activo = s.servicio === servicio;
                return (
                  <tr key={s.servicio} className="crm-row border-t border-[var(--crm-line)]">
                    <td className="crm-td">
                      <Link
                        href={url({ servicio: activo ? undefined : s.servicio })}
                        className={`font-medium transition-colors hover:text-[var(--crm-accent-strong)] ${
                          activo ? "text-[var(--crm-accent-strong)]" : "text-[var(--crm-ink)]"
                        }`}
                      >
                        {etiquetaServicio(s.servicio)}
                      </Link>
                      <span className="ml-2 text-[12px] text-[var(--crm-ink-faint)]">
                        {num(s.keywords)} kw
                      </span>
                    </td>
                    <td className="crm-td w-[150px]">
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--crm-surface-3)]">
                        <span
                          className="bg-[var(--crm-accent)]"
                          style={{ width: `${(s.nacional / escala) * 100}%` }}
                        />
                        <span
                          className="bg-[var(--crm-ink-faint)]"
                          style={{ width: `${(s.extranjero / escala) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                      {num(s.nacional)}
                    </td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                      {num(s.extranjero)}
                    </td>
                    <td className="crm-td crm-num text-right text-[13.5px] font-semibold text-[var(--crm-ink)]">
                      {num(s.total)}
                    </td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                      ${s.cpc.toFixed(2)}
                    </td>
                    <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-mute)]">
                      {num(s.disputa * 100)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-prose text-[12.5px] leading-relaxed text-[var(--crm-ink-faint)]">
          El CPC promedio sale solo de las keywords del Keyword Planner, que es puja real de
          subasta. Las de SEMrush cuentan para volumen y traen su propia dificultad de SEO.
        </p>
      </Plegable>
    </div>
  );
}
