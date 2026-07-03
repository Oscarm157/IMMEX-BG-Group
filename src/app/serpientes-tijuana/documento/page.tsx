import type { Metadata } from "next";
import Link from "next/link";
import { DocumentoCompleto } from "@/components/serpientes/DocumentoCompleto";
import { meta, PLAN_SECTIONS } from "@/content/serpientes-plan";

export const metadata: Metadata = {
  title: "Documento completo · Plan de Crecimiento Digital Serpientes Tijuana",
};

export default function DocumentoPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--st-line)] bg-[var(--st-void)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-6 py-3">
          <Link
            href="/serpientes-tijuana"
            className="st-eyebrow text-[12px] text-[var(--st-bone)] transition hover:text-[var(--st-red)]"
          >
            &larr; Volver al resumen
          </Link>
          <a
            href={meta.docxHref}
            download
            className="st-eyebrow rounded-full bg-[var(--st-red)] px-4 py-2 text-[12px] text-[var(--st-chalk)] transition hover:brightness-110"
          >
            Descargar original
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1080px] px-6 pb-32 pt-16 md:pt-24">
        <div className="mx-auto max-w-[720px]">
          <p className="st-eyebrow text-[12px] tracking-[0.2em] text-[var(--st-gold)]">
            {meta.subtitle}
          </p>
          <h1 className="st-display mt-4 text-[clamp(36px,7vw,68px)] leading-[0.95] text-[var(--st-chalk)]">
            {meta.title}
          </h1>

          {/* Tabla de contenido: una ancla por sección. */}
          <nav
            aria-label="Contenido del documento"
            className="mt-12 grid gap-x-6 gap-y-1 border-t border-[var(--st-line)] pt-8 sm:grid-cols-2"
          >
            {PLAN_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-3 border-b border-[var(--st-line)]/50 py-2.5 transition hover:border-[var(--st-red)]"
              >
                <span className="font-[var(--font-plex-mono)] text-[12px] text-[var(--st-gold)]">
                  {s.numero}
                </span>
                <span className="text-[15px] text-[var(--st-bone)] transition group-hover:text-[var(--st-chalk)]">
                  {s.titulo}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Cuerpo de lectura larga, columna angosta. */}
        <div className="mx-auto mt-20 max-w-[720px] md:mt-28">
          <DocumentoCompleto />
        </div>
      </main>
    </>
  );
}
