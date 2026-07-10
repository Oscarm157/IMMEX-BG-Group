import Link from "next/link";
import type { Metadata } from "next";
import { GUIAS } from "@/content/guias";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Guías de comercio exterior, IMMEX y aduanas",
  description:
    "Conceptos de comercio exterior explicados con fundamento legal: Anexo 24, IMMEX, pedimento y más. Guías de BG Consulting Group.",
  alternates: { canonical: "/guias" },
};

export default function GuiasIndex() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Guías"
        title="Comercio exterior, explicado con criterio legal"
        lead="Conceptos de aduanas e IMMEX con su fundamento en la ley y el ángulo de riesgo que importa a una empresa."
        className="mb-14"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {GUIAS.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.05}>
            <Link
              href={`/guias/${g.slug}`}
              className="console-panel group flex h-full flex-col rounded-[16px] bg-surface-1 px-7 py-7 transition-colors hover:bg-surface-2/60"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{g.eyebrow}</span>
              <h2 className="mt-4 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-chalk transition-colors group-hover:text-accent">
                {g.h1}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/80">{g.seoDescription}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
