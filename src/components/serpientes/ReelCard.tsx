"use client";

import { useEffect, useState } from "react";

/* Fachada + modal: la tarjeta muestra formato y vistas; al hacer click abre el
   reel en un overlay grande con el embed oficial de Instagram. Solo carga el
   iframe del reel que se reproduce (deck ligero, play confiable en vivo). */
export function ReelCard({
  url,
  label,
  vistas,
  fuente,
}: {
  url: string;
  label: string;
  vistas: string;
  fuente?: string;
}) {
  const [open, setOpen] = useState(false);
  const embedUrl = `${url}embed/`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden border border-[var(--st-line)] bg-[var(--st-void)] p-5 text-left transition hover:border-[var(--st-gold)]/60"
      >
        <div className="flex items-center justify-between gap-2">
          {fuente && (
            <span className="st-eyebrow text-[10px] text-[var(--st-ash)]">
              {fuente}
            </span>
          )}
          <span className="[font-family:var(--font-plex-mono)] text-[14px] leading-none text-[var(--st-gold)]">
            {vistas}
          </span>
        </div>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--st-chalk)]/40 transition group-hover:border-[var(--st-red)] group-hover:bg-[var(--st-red)]">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="currentColor"
            className="ml-1 text-[var(--st-chalk)]"
            aria-hidden
          >
            <path d="M0 0l16 9L0 18z" />
          </svg>
        </span>
        <span className="st-display text-[clamp(14px,1.7vw,18px)] leading-[1.1] text-[var(--st-chalk)]">
          {label}
        </span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[min(88vh,720px)] w-[min(420px,92vw)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="st-eyebrow absolute -top-9 right-0 text-[12px] text-[var(--st-chalk)] transition hover:text-[var(--st-red)]"
            >
              Cerrar ✕
            </button>
            <iframe
              src={embedUrl}
              className="h-full w-full border border-[var(--st-line)] bg-[var(--st-void)]"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
              title={label}
            />
          </div>
        </div>
      )}
    </>
  );
}
