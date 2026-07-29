"use client";

import { useState } from "react";
import { SubmitPill } from "@/components/site/PillButton";
import { telefonos } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

// Formulario de la landing de pauta. Entra por /api/leads con source "form",
// que exige teléfono válido; el campo "service" identifica de qué landing viene.
export function LeadPanel({ campaign, alcance }: { campaign: string; alcance: readonly string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const utm = new URLSearchParams(window.location.search);
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "form",
          locale: "es",
          service: campaign,
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          company: String(data.get("company") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""), // honeypot
          sourceUrl: window.location.href,
          utmSource: utm.get("utm_source") || "",
          utmCampaign: utm.get("utm_campaign") || "",
          utmMedium: utm.get("utm_medium") || "",
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-[8px] border border-line bg-ink px-3.5 py-2.5 text-[15px] leading-snug text-chalk outline-none transition-colors placeholder:text-ash focus:border-accent";
  const label = "mb-1 block text-[11px] uppercase tracking-[0.12em] text-smoke";

  if (status === "sent") {
    return (
      <div className="console-panel rounded-[14px] bg-surface-1 px-6 py-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Datos recibidos</span>
        <p className="mt-4 font-display text-[20px] font-medium leading-snug tracking-[-0.01em] text-chalk">
          Sus datos quedaron registrados.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-bone/90">
          Un especialista de BG revisa el caso y se pone en contacto. Si la mercancía ya está detenida, marque
          directamente.
        </p>
        <a
          href={telefonos.tijuana.href}
          className="mt-5 inline-block font-mono text-[14px] tabular-nums text-accent transition-colors hover:text-accent-dim"
        >
          {telefonos.tijuana.display}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="console-panel rounded-[14px] bg-surface-1 px-6 py-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Revisión de su caso</span>
      <h2 className="mt-2.5 font-display text-[21px] font-medium leading-snug tracking-[-0.015em] text-chalk">
        Deje sus datos
      </h2>
      <p className="mt-2 text-[13.5px] leading-snug text-smoke">Alcance de la primera revisión:</p>
      <ol className="mt-2 flex flex-col gap-1">
        {alcance.map((t, i) => (
          <li key={t} className="flex gap-2.5 text-[13.5px] leading-snug text-bone/85">
            <span className="font-mono text-[12px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>

      {/* Honeypot anti-bot: fuera de pantalla, los humanos no lo ven ni lo tabulan. */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lp-website">No llenar</label>
        <input id="lp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div>
          <label htmlFor="lp-name" className={label}>
            Nombre
          </label>
          <input id="lp-name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="lp-company" className={label}>
            Empresa
          </label>
          <input id="lp-company" name="company" required className={field} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="lp-phone" className={label}>
            Teléfono
          </label>
          <input
            id="lp-phone"
            name="phone"
            type="tel"
            required
            pattern="[+\d][\d\s().\-]{6,}"
            className={field}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="lp-email" className={label}>
            Correo
          </label>
          <input id="lp-email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="lp-message" className={label}>
            Motivo de la consulta
          </label>
          <textarea
            id="lp-message"
            name="message"
            rows={3}
            className={`${field} resize-none`}
            placeholder="Rechazo en la ventanilla, diferencia entre COVE y pedimento, requerimiento de la autoridad."
          />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-[12.5px] leading-snug text-smoke">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
        <span>
          Acepto el{" "}
          <a
            href="/es/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone underline underline-offset-2 hover:text-accent"
          >
            aviso de privacidad
          </a>
          .
        </span>
      </label>

      <SubmitPill type="submit" variant="accent" arrow disabled={status === "sending"} className="mt-5 w-full">
        {status === "sending" ? "Enviando" : "Enviar"}
      </SubmitPill>

      {status === "error" && (
        <p role="alert" className="mt-4 text-[13px] leading-relaxed text-accent">
          No se pudo enviar. Intente de nuevo o marque al {telefonos.tijuana.display}.
        </p>
      )}

      {/* Ficha de identidad: quién recibe los datos, en la versión corta. */}
      <div className="mt-5 border-t border-line pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">BG Consulting Group</p>
        <p className="mt-1.5 text-[13px] leading-snug text-smoke">
          Consultoría legal en comercio exterior. Legal, trade compliance, fiscal y TI en una sola firma. 20 años de
          práctica en promedio entre los socios. Tijuana y San Diego.
        </p>
      </div>

      <div className="mt-4 border-t border-line pt-4 text-[13px] leading-snug text-smoke">
        <p>
          Tijuana{" "}
          <a href={telefonos.tijuana.href} className="font-mono tabular-nums text-bone hover:text-accent">
            {telefonos.tijuana.display}
          </a>
        </p>
        <p className="mt-1.5">
          {/* Deuda declarada: el nacional 01 800 no vive en site-config (solo
              está el NAP de Tijuana/San Diego), se deja literal. */}
          Nacional{" "}
          <a href="tel:+528007880232" className="font-mono tabular-nums text-bone hover:text-accent">
            01 800 788 0232
          </a>
        </p>
        <p className="mt-1.5">
          <a href="mailto:contacto@bgc.mx" className="text-bone hover:text-accent">
            contacto@bgc.mx
          </a>
        </p>
      </div>
    </form>
  );
}
