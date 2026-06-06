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

export function ContactForm({ dict, to }: { dict: FormDict; to: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Contacto web · ${name}${company ? ` (${company})` : ""}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}\n${company}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full border-b border-white/15 bg-transparent py-3 text-[16px] text-chalk outline-none transition-colors placeholder:text-ash focus:border-accent";
  const label = "mb-2 block text-[13px] uppercase tracking-[0.1em] text-smoke";

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
        <SubmitPill type="submit" variant="accent" arrow>
          {dict.submit}
        </SubmitPill>
        <span className="text-[13px] text-smoke">{sent ? dict.sent : dict.note}</span>
      </div>
    </form>
  );
}
