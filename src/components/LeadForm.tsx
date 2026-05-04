"use client";

import { useState } from "react";

const fields = [
  { label: "Nombre Completo", placeholder: "Ej. Juan Pérez", type: "text", name: "name" },
  { label: "Empresa", placeholder: "Nombre de la compañía", type: "text", name: "company" },
];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-6">
        {fields.map((f) => (
          <div key={f.name} className="group relative">
            <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">
              {f.label}
            </label>
            <input
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required
              disabled={submitted}
              className="w-full bg-surface-container-low border-none focus:ring-0 px-4 py-4 text-primary transition-all outline-none disabled:opacity-60"
            />
            <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-tertiary-fixed transition-all group-focus-within:w-full" />
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative">
            <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">
              Email Corporativo
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@empresa.com"
              required
              disabled={submitted}
              className="w-full bg-surface-container-low border-none focus:ring-0 px-4 py-4 text-primary transition-all outline-none disabled:opacity-60"
            />
            <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-tertiary-fixed transition-all group-focus-within:w-full" />
          </div>
          <div className="group relative">
            <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="55 0000 0000"
              required
              disabled={submitted}
              className="w-full bg-surface-container-low border-none focus:ring-0 px-4 py-4 text-primary transition-all outline-none disabled:opacity-60"
            />
            <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-tertiary-fixed transition-all group-focus-within:w-full" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitted}
        className={`w-full py-5 font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-colors ${
          submitted
            ? "bg-tertiary-fixed text-on-tertiary-fixed cursor-default"
            : "bg-primary text-white hover:bg-primary/90"
        }`}
      >
        {submitted ? (
          <>
            Recibido. Te contactamos pronto.
            <span className="material-symbols-outlined">check</span>
          </>
        ) : (
          <>
            Solicitar asesoría
            <span className="material-symbols-outlined">send</span>
          </>
        )}
      </button>
    </form>
  );
}
