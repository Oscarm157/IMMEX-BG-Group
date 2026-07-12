"use client";

import { useState } from "react";
import { SubmitPill } from "./PillButton";

type FormDict = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  submit: string;
  note: string;
  sent: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ dict, locale }: { dict: FormDict; locale: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const utm = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "form",
          locale,
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          company: String(data.get("company") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""), // honeypot
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
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
    "w-full border-b border-white/15 bg-transparent py-3 text-[16px] text-chalk outline-none transition-colors placeholder:text-ash focus:border-accent";
  const label = "mb-2 block text-[13px] uppercase tracking-[0.1em] text-smoke";

  const errorMsg = locale === "es" ? "No se pudo enviar. Intenta de nuevo o escríbenos al correo." : "Could not send. Try again or email us.";
  const statusText = status === "sent" ? dict.sent : status === "error" ? errorMsg : dict.note;
  const statusColor = status === "error" ? "text-accent" : "text-smoke";

  const consent =
    locale === "es" ? (
      <>
        Acepto el{" "}
        <a
          href={`/${locale}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bone underline underline-offset-2 hover:text-accent"
        >
          aviso de privacidad
        </a>
        .
      </>
    ) : (
      <>
        I accept the{" "}
        <a
          href={`/${locale}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bone underline underline-offset-2 hover:text-accent"
        >
          privacy notice
        </a>
        .
      </>
    );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* Honeypot anti-bot: fuera de pantalla, los humanos no lo ven ni lo tabulan. */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {dict.name}
          </label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            {dict.email}
          </label>
          <input id="email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            {dict.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern="[+\d][\d\s().\-]{6,}"
            className={field}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            {dict.company}
          </label>
          <input id="company" name="company" className={field} autoComplete="organization" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>
          {dict.message}
        </label>
        <textarea id="message" name="message" rows={4} required className={`${field} resize-none`} />
      </div>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-smoke">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
        <span>{consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-5">
        <SubmitPill type="submit" variant="accent" arrow disabled={status === "sending"}>
          {dict.submit}
        </SubmitPill>
        <span className={`text-[13px] ${statusColor}`}>{statusText}</span>
      </div>
    </form>
  );
}
