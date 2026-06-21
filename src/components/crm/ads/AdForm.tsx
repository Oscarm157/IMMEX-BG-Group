import type { Ad } from "@/lib/ads-data";
import { SectionHeader } from "@/components/crm/PageShell";

const label = "mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink-soft)]";
const hint = "mt-1.5 text-[12px] leading-snug text-[var(--crm-ink-mute)]";
const PLATFORMS = [["meta", "Meta"], ["google", "Google"], ["tiktok", "TikTok"], ["linkedin", "LinkedIn"], ["otro", "Otro"]] as const;
const STATUSES = [["draft", "Borrador"], ["active", "Activo"], ["paused", "Pausado"], ["ended", "Finalizado"]] as const;

export function AdForm({
  ad,
  action,
  submitLabel,
}: {
  ad?: Ad;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const v = ad;
  return (
    <form action={action} className="flex flex-col gap-5">
      <section className="crm-card crm-fade p-6" style={{ animationDelay: "0ms" }}>
        <SectionHeader title="Identificación" className="mb-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="name">Nombre del anuncio o campaña</label>
            <input id="name" name="name" required defaultValue={v?.name ?? ""} className="crm-input" />
          </div>
          <div>
            <label className={label} htmlFor="platform">Plataforma</label>
            <select id="platform" name="platform" defaultValue={v?.platform ?? "meta"} className="crm-select">
              {PLATFORMS.map(([val, l]) => <option key={val} value={val}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="status">Estado</label>
            <select id="status" name="status" defaultValue={v?.status ?? "draft"} className="crm-select">
              {STATUSES.map(([val, l]) => <option key={val} value={val}>{l}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="objective">Objetivo</label>
            <input id="objective" name="objective" defaultValue={v?.objective ?? ""} className="crm-input" placeholder="Leads, tráfico, alcance" />
          </div>
        </div>
      </section>

      <section className="crm-card crm-fade p-6" style={{ animationDelay: "55ms" }}>
        <SectionHeader title="Presupuesto y desempeño" className="mb-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="budget">Presupuesto (MXN)</label>
            <input id="budget" name="budget" inputMode="numeric" defaultValue={v?.budget ?? ""} className="crm-input crm-num" />
          </div>
          <div>
            <label className={label} htmlFor="spend">Gasto a la fecha (MXN)</label>
            <input id="spend" name="spend" inputMode="numeric" defaultValue={v?.spend ?? ""} className="crm-input crm-num" />
          </div>
          <div>
            <label className={label} htmlFor="startDate">Inicio</label>
            <input id="startDate" name="startDate" type="date" defaultValue={v?.startDate ?? ""} className="crm-input crm-num" />
          </div>
          <div>
            <label className={label} htmlFor="endDate">Fin</label>
            <input id="endDate" name="endDate" type="date" defaultValue={v?.endDate ?? ""} className="crm-input crm-num" />
          </div>
          <div>
            <label className={label} htmlFor="impressions">Impresiones</label>
            <input id="impressions" name="impressions" inputMode="numeric" defaultValue={v?.impressions ?? ""} className="crm-input crm-num" />
          </div>
          <div>
            <label className={label} htmlFor="clicks">Clics</label>
            <input id="clicks" name="clicks" inputMode="numeric" defaultValue={v?.clicks ?? ""} className="crm-input crm-num" />
          </div>
        </div>
      </section>

      <section className="crm-card crm-fade p-6" style={{ animationDelay: "110ms" }}>
        <SectionHeader title="Atribución y arte" className="mb-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="utmCampaign">Código UTM de campaña</label>
            <input id="utmCampaign" name="utmCampaign" defaultValue={v?.utmCampaign ?? ""} className="crm-input" placeholder="ej. cruce-tijuana-q3" />
            <p className={hint}>Enlaza los leads que llegan con este utm_campaign a la campaña.</p>
          </div>
          <div>
            <label className={label} htmlFor="creativeUrl">URL del arte</label>
            <input id="creativeUrl" name="creativeUrl" defaultValue={v?.creativeUrl ?? ""} className="crm-input" placeholder="https://" />
            <p className={hint}>Opcional. Sin URL se muestra un marcador.</p>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="notes">Notas</label>
            <textarea id="notes" name="notes" rows={3} defaultValue={v?.notes ?? ""} className="crm-textarea" />
          </div>
        </div>
      </section>

      <div>
        <button type="submit" className="crm-btn crm-btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}
