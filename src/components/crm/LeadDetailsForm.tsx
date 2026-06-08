"use client";

import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { visibleServices } from "@/lib/services";
import type { LeadQualification, LeadSource } from "@/lib/schema";

const SERVICE_NAMES = visibleServices.map((s) => s.name);

type Values = {
  name: string | null;
  email: string | null;
  phone: string | null;
  locale: string | null;
  source: LeadSource;
  summary: string | null;
  qualification: LeadQualification | null;
  valueAmount: number | null;
};

const QUAL_FIELDS: { key: keyof LeadQualification; label: string }[] = [
  { key: "service", label: "Service" },
  { key: "company", label: "Company" },
  { key: "industry", label: "Industry" },
  { key: "monthlyVolume", label: "Monthly volume" },
  { key: "paymentTerms", label: "Payment terms" },
  { key: "timeInBusiness", label: "Time in business" },
  { key: "urgency", label: "Urgency" },
];

const inputCls = "crm-input h-auto py-2 text-[13.5px]";
const labelCls = "mb-1 block text-[11.5px] text-[var(--crm-ink-soft)]";
const legendCls = "mb-2.5 text-[13px] font-semibold tracking-tight text-[var(--crm-ink)]";

const LOCALE_LABEL: Record<string, string> = { en: "English", es: "Spanish" };
const SOURCE_LABEL: Record<LeadSource, string> = { bot: "Chatbot", form: "Form", manual: "Manual" };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="crm-btn crm-btn-primary crm-btn-sm">
      {pending ? <Loader2 className="size-3.5 animate-spin" strokeWidth={2} /> : <Check className="size-3.5" strokeWidth={2} />}
      {pending ? "Saving…" : "Save details"}
    </button>
  );
}

function ReadField({ label, value, span }: { label: string; value: string | null; span?: boolean }) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <dt className={labelCls}>{label}</dt>
      <dd className="text-[13.5px] text-[var(--crm-ink-soft)]">{value && value.trim() ? value : <span className="text-[var(--crm-ink-mute)]">–</span>}</dd>
    </div>
  );
}

export function LeadDetailsForm({
  action,
  lead,
  editable = true,
}: {
  action: (formData: FormData) => Promise<void>;
  lead: Values;
  editable?: boolean;
}) {
  const q = lead.qualification ?? {};

  if (!editable) {
    return (
      <div className="space-y-5">
        <div>
          <p className={legendCls}>Contact</p>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ReadField label="Name" value={lead.name} span />
            <ReadField label="Email" value={lead.email} />
            <ReadField label="Phone" value={lead.phone} />
            <ReadField label="Language" value={lead.locale ? LOCALE_LABEL[lead.locale] ?? lead.locale : null} />
            <ReadField label="Source" value={SOURCE_LABEL[lead.source]} />
            <ReadField label="Estimated value" value={lead.valueAmount != null ? usd.format(lead.valueAmount) : null} />
          </dl>
        </div>
        <div>
          <p className={legendCls}>Qualification</p>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUAL_FIELDS.map((f) => (
              <ReadField
                key={f.key}
                label={f.label}
                value={q[f.key] ?? null}
                span={f.key === "service" || f.key === "company"}
              />
            ))}
          </dl>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <fieldset className="space-y-3">
        <legend className={legendCls}>Contact</legend>
        <div>
          <label className={labelCls} htmlFor="ld-name">Name</label>
          <input id="ld-name" name="name" defaultValue={lead.name ?? ""} className={inputCls} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="ld-email">Email</label>
            <input id="ld-email" name="email" type="email" defaultValue={lead.email ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="ld-phone">Phone</label>
            <input id="ld-phone" name="phone" defaultValue={lead.phone ?? ""} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="ld-locale">Language</label>
            <select id="ld-locale" name="locale" defaultValue={lead.locale ?? "en"} className={inputCls}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="ld-source">Source</label>
            <select id="ld-source" name="source" defaultValue={lead.source} className={inputCls}>
              <option value="bot">Chatbot</option>
              <option value="form">Form</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>
        <div className="sm:max-w-[50%] sm:pr-1.5">
          <label className={labelCls} htmlFor="ld-value">Estimated value (USD)</label>
          <input
            id="ld-value"
            name="valueAmount"
            inputMode="numeric"
            defaultValue={lead.valueAmount != null ? String(lead.valueAmount) : ""}
            placeholder="$ 0"
            className={`${inputCls} tabular-nums`}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className={legendCls}>Qualification</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {QUAL_FIELDS.map((f) => {
            if (f.key === "service") {
              const current = q.service ?? "";
              const extra = current && !SERVICE_NAMES.includes(current) && current !== "Not sure" ? [current] : [];
              return (
                <div key={f.key} className="sm:col-span-2">
                  <label className={labelCls} htmlFor="ld-service">{f.label}</label>
                  <select id="ld-service" name="service" defaultValue={current} className={inputCls}>
                    <option value="">Not set</option>
                    {SERVICE_NAMES.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                    {extra.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              );
            }
            return (
              <div key={f.key} className={f.key === "company" ? "sm:col-span-2" : ""}>
                <label className={labelCls} htmlFor={`ld-${f.key}`}>{f.label}</label>
                <input id={`ld-${f.key}`} name={f.key} defaultValue={q[f.key] ?? ""} className={inputCls} />
              </div>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Summary</legend>
        <textarea name="summary" rows={4} defaultValue={lead.summary ?? ""} className={`${inputCls} resize-y leading-relaxed`} placeholder="Brief summary of the lead's situation." />
      </fieldset>

      <SaveButton />
    </form>
  );
}
