"use client";

import { useState } from "react";
import { SubmitPill } from "./PillButton";

type FormDict = {
  name: string;
  email: string;
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
          company: String(data.get("company") || ""),
          message: String(data.get("message") || ""),
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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
      <div>
        <label htmlFor="company" className={label}>
          {dict.company}
        </label>
        <input id="company" name="company" className={field} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="message" className={label}>
          {dict.message}
        </label>
        <textarea id="message" name="message" rows={4} required className={`${field} resize-none`} />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <SubmitPill type="submit" variant="accent" arrow disabled={status === "sending"}>
          {dict.submit}
        </SubmitPill>
        <span className={`text-[13px] ${statusColor}`}>{statusText}</span>
      </div>
    </form>
  );
}
