import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIAS, GUIA_SLUGS, getGuia } from "@/content/guias";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";

export const dynamicParams = false;

const BASE_URL = "https://bgconsultingroup.com";

export function generateStaticParams() {
  return GUIA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  const canonicalPath = `/guias/${slug}`;
  return {
    title: g.seoTitle,
    description: g.seoDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      locale: "es_MX",
      siteName: "BG Consulting Group",
      title: g.seoTitle,
      description: g.seoDescription,
      url: `${BASE_URL}${canonicalPath}`,
    },
    twitter: { card: "summary_large_image", title: g.seoTitle, description: g.seoDescription },
  };
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();

  const url = `${BASE_URL}/guias/${slug}`;
  const relacionadas = g.relacionadas
    .map((s) => GUIAS.find((x) => x.slug === s))
    .filter((x): x is (typeof GUIAS)[number] => Boolean(x));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: g.h1,
        description: g.seoDescription,
        inLanguage: "es-MX",
        dateModified: g.actualizado,
        author: { "@type": "Organization", name: "BG Consulting Group", url: `${BASE_URL}/es` },
        publisher: { "@type": "Organization", name: "BG Consulting Group", url: `${BASE_URL}/es` },
        mainEntityOfPage: url,
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/es` },
          { "@type": "ListItem", position: 2, name: "Guías", item: `${BASE_URL}/guias` },
          { "@type": "ListItem", position: 3, name: g.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1080px] px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:pb-20">
          <Reveal>
            <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
              {g.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.1rem,4.8vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.03em] text-chalk">
              {g.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-bone/90">{g.definicion[0]}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PillButton href={`/es/services/${g.servicio.slug}`} variant="accent" arrow>
                {g.servicio.label}
              </PillButton>
              <PillButton href="/guias" variant="ghost">
                Ver todas las guías
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Definición (párrafos restantes) */}
      {g.definicion.length > 1 && (
        <section className="mx-auto max-w-[984px] px-5 pb-16 pt-8 sm:px-8">
          <div className="flex flex-col gap-5">
            {g.definicion.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-[18px] leading-relaxed text-bone/90">{p}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Fundamento legal (diferenciador de firma legal) */}
      <section className="mx-auto max-w-[984px] px-5 pb-16 sm:px-8">
        <Reveal className="console-panel rounded-[16px] bg-surface-1 px-7 py-8 sm:px-10 sm:py-9">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Fundamento legal</span>
          <p className="mt-4 font-display text-[17px] font-medium leading-snug tracking-[-0.01em] text-chalk">
            {g.fundamento.cita}
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-bone/90">{g.fundamento.texto}</p>
        </Reveal>
      </section>

      {/* Puntos clave (interludio claro) */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="Cómo funciona" title="Puntos clave" tone="light" className="mb-12" />
          <div className="border-t border-ash/20">
            {g.puntosClave.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.06}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-ash/20 py-8 sm:grid-cols-[2.5rem_5fr_8fr] sm:gap-x-10 sm:py-10"
              >
                <span className="font-mono text-[12px] tabular-nums text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.02em] text-ink sm:text-xl">{p.title}</h3>
                <p className="col-start-2 mt-1 text-[17px] leading-relaxed text-ink/75 sm:col-start-3 sm:mt-0">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Distinción (si existe) */}
      {g.distincion && g.distincion.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
          <SectionHeading eyebrow="No confundir" title="Diferencias clave" className="mb-12" />
          <div className="grid gap-4 sm:grid-cols-2">
            {g.distincion.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06} className="console-panel rounded-[14px] bg-surface-1 px-7 py-7">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-chalk">{d.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-bone/90">{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Errores comunes (ángulo legal) */}
      <section className="mx-auto max-w-[1320px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading eyebrow="Dónde nace el riesgo" title="Errores comunes y su consecuencia" className="mb-12" />
        <div className="border-t border-line">
          {g.errores.map((e, i) => (
            <div
              key={e.title}
              className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-5 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8"
            >
              <span className="font-display text-[clamp(1.5rem,4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-1.5 sm:grid-cols-[minmax(0,20rem)_1fr] sm:items-baseline sm:gap-10">
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.01em] text-chalk sm:text-xl">{e.title}</h3>
                <p className="text-[17px] leading-relaxed text-bone/90">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[984px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas habituales" className="mb-10" />
        <Faq items={g.faq} />
      </section>

      {/* CTA servicio + relacionadas */}
      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
        <div className="console-panel relative flex flex-col items-start gap-6 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-12 sm:px-14 sm:py-14">
          <h2 className="max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-chalk">
            {g.ctaTitulo ?? "¿Necesitas resolverlo con soporte legal detrás?"}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-bone/90">
            Revisamos tu operación, detectamos el riesgo antes de que lo haga la autoridad y lo sostenemos con criterio legal.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <PillButton href={`/es/services/${g.servicio.slug}`} variant="accent" arrow>
              {g.servicio.label}
            </PillButton>
            <PillButton href="/es/contact" variant="ghost">
              Hablar con BG
            </PillButton>
          </div>
        </div>

        {relacionadas.length > 0 && (
          <div className="mt-16 border-t border-line pt-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-smoke">Guías relacionadas</span>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relacionadas.map((r) => (
                <Link
                  key={r.slug}
                  href={`/guias/${r.slug}`}
                  className="console-panel group rounded-[14px] bg-surface-1 px-6 py-5 transition-colors hover:bg-surface-2/60"
                >
                  <span className="block font-display text-lg text-chalk transition-colors group-hover:text-accent">{r.h1}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
