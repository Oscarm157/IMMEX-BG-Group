import Link from "next/link";
import type { Metadata } from "next";
import { UBICACIONES } from "@/content/ubicaciones";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Ubicaciones: comercio exterior y aduanas por plaza",
  description:
    "Cobertura de comercio exterior y cumplimiento aduanero. Sede en Tijuana, con servicio a empresas de todo México.",
  alternates: { canonical: "/ubicaciones" },
};

export default function UbicacionesIndex() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Ubicaciones"
        title="Desde Tijuana, para todo México"
        lead="La sede está en Tijuana, sobre el corredor con San Diego. El modelo legal y de software atiende operaciones del resto del país en remoto."
        className="mb-14"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {UBICACIONES.map((u, i) => (
          <Reveal key={u.slug} delay={i * 0.05}>
            <Link
              href={`/ubicaciones/${u.slug}`}
              className="console-panel group flex h-full flex-col rounded-[16px] bg-surface-1 px-7 py-7 transition-colors hover:bg-surface-2/60"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {u.esSede ? "Sede" : "Cobertura"}
              </span>
              <h2 className="mt-4 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-chalk transition-colors group-hover:text-accent">
                {u.ciudad}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/80">{u.seoDescription}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
