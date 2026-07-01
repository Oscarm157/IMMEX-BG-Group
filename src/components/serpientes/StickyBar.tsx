import Link from "next/link";
import { meta } from "@/content/serpientes-plan";

export function StickyBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--st-line)] bg-[var(--st-void)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3">
        <span className="st-eyebrow text-[13px] text-[var(--st-chalk)]">
          Serpientes Tijuana
        </span>
        <nav className="st-eyebrow flex items-center gap-5 text-[12px]">
          <Link
            href="/serpientes-tijuana/documento"
            className="text-[var(--st-bone)] transition hover:text-[var(--st-chalk)]"
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
      </div>
    </div>
  );
}
