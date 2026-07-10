import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UBICACION_SLUGS, getUbicacion } from "@/content/ubicaciones";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";

export const dynamicParams = false;

const BASE_URL = "https://bgconsultingroup.com";

export function generateStaticParams() {
  return UBICACION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = getUbicacion(slug);
  if (!u) return {};
  const canonicalPath = `/ubicaciones/${slug}`;
  return {
    title: u.seoTitle,
    description: u.seoDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: "BG Consulting Group",
      title: u.seoTitle,
      description: u.seoDescription,
      url: `${BASE_URL}${canonicalPath}`,
    },
    twitter: { card: "summary_large_image", title: u.seoTitle, description: u.seoDescription },
  };
}

export default async function UbicacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUbicacion(slug);
  if (!u) notFound();

  const url = `${BASE_URL}/ubicaciones/${slug}`;

  // Solo la sede real lleva LocalBusiness con NAP; el resto declara Service.
  const primaryNode =
    u.esSede && u.nap
      ? {
          "@type": "LegalService",
          name: `BG Consulting Group · ${u.ciudad}`,
          description: u.seoDescription,
          url,
          address: {
            "@type": "PostalAddress",
            streetAddress: u.nap.address,
            addressLocality: u.ciudad,
            addressRegion: "Baja California",
            addressCountry: "MX",
          },
          telephone: u.nap.phone,
          email: siteConfig.email,
          areaServed: { "@type": "City", name: u.ciudad },
        }
      : {
          "@type": "Service",
          name: `Comercio exterior y cumplimiento en ${u.ciudad}`,
          description: u.seoDescription,
          provider: { "@type": "Organization", name: "BG Consulting Group", url: `${BASE_URL}/es` },
          areaServed: { "@type": "City", name: u.ciudad },
          url,
        };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      primaryNode,
      {
        "@type": "FAQPage",
        mainEntity: u.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/es` },
          { "@type": "ListItem", position: 2, name: "Ubicaciones", item: `${BASE_URL}/ubicaciones` },
          { "@type": "ListItem", position: 3, name: u.ciudad, item: url },
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
              {u.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.03] tracking-[-0.03em] text-chalk">
              {u.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-bone/90">{u.intro[0]}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PillButton href="/es/contact" variant="accent" arrow>
                Hablar con BG
              </PillButton>
              <PillButton href="/es/services" variant="ghost">
                Ver servicios
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro restante + modelo */}
      <section className="mx-auto max-w-[984px] px-5 pb-16 pt-8 sm:px-8">
        <div className="flex flex-col gap-5">
          {u.intro.slice(1).map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-[18px] leading-relaxed text-bone/90">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="console-panel mt-10 rounded-[16px] bg-surface-1 px-7 py-8 sm:px-10 sm:py-9">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Cómo operamos aquí</span>
          <p className="mt-4 text-[16px] leading-relaxed text-bone/90">{u.modelo}</p>
        </Reveal>
      </section>

      {/* Aduana y cruces (dato único de la plaza) */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow={u.aduana.nombre} title={`Cruces de ${u.ciudad}`} tone="light" className="mb-12" />
          <div className="grid gap-4 sm:grid-cols-3">
            {u.aduana.cruces.map((c, i) => (
              <Reveal key={c.nombre} delay={i * 0.06} className="card-light rounded-[14px] px-6 py-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">{c.tipo}</span>
                <h3 className="mt-3 font-display text-lg font-medium tracking-[-0.01em] text-ink">{c.nombre}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{c.nota}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectores típicos */}
      <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading eyebrow="Industria de la región" title="Sectores que atendemos" className="mb-8" />
        <div className="flex flex-wrap gap-3">
          {u.sectores.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-surface-1 px-5 py-2.5 text-[15px] text-bone/90"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Operaciones */}
      <section className="mx-auto max-w-[1320px] px-5 pb-20 pt-16 sm:px-8">
        <SectionHeading eyebrow="Qué resolvemos" title={`Operaciones en ${u.ciudad}`} className="mb-12" />
        <div className="border-t border-line">
          {u.operaciones.map((o, i) => (
            <div
              key={o.title}
              className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-5 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8"
            >
              <span className="font-display text-[clamp(1.5rem,4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-1.5 sm:grid-cols-[minmax(0,20rem)_1fr] sm:items-baseline sm:gap-10">
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.01em] text-chalk sm:text-xl">{o.title}</h3>
                <p className="text-[17px] leading-relaxed text-bone/90">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAP — solo sede real */}
      {u.esSede && u.nap && (
        <section className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8">
          <div className="console-panel grid gap-8 rounded-[18px] bg-surface-1 px-8 py-12 sm:grid-cols-3 sm:px-14 sm:py-14">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Dirección</span>
              <p className="mt-3 text-[16px] leading-relaxed text-chalk">{u.nap.address}</p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Teléfono</span>
              <a
                href={`tel:${u.nap.phone.replace(/[^+\d]/g, "")}`}
                className="mt-3 block font-display text-[clamp(1.3rem,3vw,1.9rem)] font-medium tracking-[-0.01em] text-chalk transition-colors hover:text-accent"
              >
                {u.nap.phone}
              </a>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Disponibilidad</span>
              <p className="mt-3 text-[16px] leading-relaxed text-chalk">{u.nap.hours}</p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[984px] px-5 pb-20 pt-8 sm:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title={`Sobre operar en ${u.ciudad}`} className="mb-10" />
        <Faq items={u.faq} />
      </section>

      {/* Servicios relevantes */}
      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
        <div className="border-t border-line pt-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-smoke">Servicios en {u.ciudad}</span>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {u.servicios.map((s) => (
              <Link
                key={s.slug}
                href={`/es/services/${s.slug}`}
                className="console-panel group rounded-[14px] bg-surface-1 px-6 py-6 transition-colors hover:bg-surface-2/60"
              >
                <span className="block font-display text-[17px] leading-snug text-chalk transition-colors group-hover:text-accent">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
