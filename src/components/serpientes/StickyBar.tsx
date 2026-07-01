import Link from "next/link";
import { meta } from "@/content/serpientes-plan";

export function StickyBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--st-line)] bg-[var(--st-void)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3">
        <span className="st-eyebrow text-[13px] text-[var(--st-chalk)]">
          Serpientes Tijuana
        </span>

        {/* Desktop: las dos acciones siempre visibles. */}
        <nav className="st-eyebrow hidden items-center gap-5 text-[12px] md:flex">
          <Link
            href="/serpientes-tijuana/documento"
            className="text-[var(--st-bone)] transition hover:text-[var(--st-red)]"
          >
            Documento completo
          </Link>
          <a
            href={meta.docxHref}
            download
            className="rounded-full bg-[var(--st-red)] px-4 py-2 text-[var(--st-chalk)] transition hover:brightness-110"
          >
            Descargar original
          </a>
        </nav>

        {/* Mobile: colapsa a un ícono, las dos acciones pasan a un menú de un toque. */}
        <details className="relative md:hidden">
          <summary
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--st-line)] text-[var(--st-chalk)] [&::-webkit-details-marker]:hidden"
            aria-label="Menú"
          >
            <span aria-hidden>•••</span>
          </summary>
          <nav className="st-eyebrow absolute right-0 top-11 grid w-56 gap-1 border border-[var(--st-line)] bg-[var(--st-surface-1)] p-2 text-[12px]">
            <Link
              href="/serpientes-tijuana/documento"
              className="px-3 py-2 text-[var(--st-bone)] transition hover:text-[var(--st-red)]"
            >
              Documento completo
            </Link>
            <a
              href={meta.docxHref}
              download
              className="rounded-full bg-[var(--st-red)] px-3 py-2 text-center text-[var(--st-chalk)] transition hover:brightness-110"
            >
              Descargar original
            </a>
          </nav>
        </details>
      </div>
    </div>
  );
}
