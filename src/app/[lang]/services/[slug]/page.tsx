import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { SERVICE_DETAIL } from "@/content/services-detail";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceInstrument, DrawCheck } from "@/components/site/ServiceInstrument";
import { MediaFrame } from "@/components/site/MediaFrame";
import { Faq } from "@/components/site/Faq";
import { ServiceDiagnostic } from "@/components/site/ServiceDiagnostic";
import { ServiceProcessFlow } from "@/components/site/ServiceProcessFlow";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

// ─── SEO data anchored to real overview content ───────────────────────────────

const BASE_URL = "https://bgconsultingroup.com";

// Keyword-rich titles per service, derived from overview themes.
// Order mirrors SERVICE_SLUGS: legal-consulting, compliance-and-assurance,
// foreign-trade, international-trade-experts, information-technology,
// fiscal-services, trade-agreements, import-services.
const SERVICE_TITLES: Record<"es" | "en", string[]> = {
  es: [
    "Asesoría Legal Fiscal y Aduanera en Comercio Exterior",
    "Auditoría IMMEX y Aseguramiento Aduanero",
    "Comercio Exterior: Valoración Aduanera, Clasificación e IMMEX",
    "Dictámenes Periciales en Clasificación Arancelaria y Origen",
    "Tecnología de Cumplimiento Aduanero y Logística Internacional",
    "Devolución de IVA y Servicios Fiscales en Comercio Exterior",
    "Certificación de Origen T-MEC y Acuerdos Comerciales Internacionales",
    "Importación a México: Despacho Aduanal, NOM y Logística Tijuana-San Diego",
  ],
  en: [
    "Tax and Customs Legal Defense for Foreign Trade Companies",
    "IMMEX Compliance Audits and Customs Assurance Programs",
    "Foreign Trade: Customs Valuation, Tariff Classification and IMMEX",
    "International Trade Expert Opinions on Classification and Valuation",
    "Customs Compliance Technology and International Logistics",
    "VAT Refund and Tax Services for Foreign Trade Companies",
    "USMCA Rules of Origin Certification and Trade Agreement Preferences",
    "Import Services to Mexico: Customs Clearance, NOM and Tijuana Logistics",
  ],
};

// Meta descriptions: 150-160 chars, keyword-anchored to real overview content.
const SERVICE_DESCRIPTIONS: Record<"es" | "en", string[]> = {
  es: [
    "Seguimiento al cumplimiento fiscal y aduanero en comercio exterior. Defensa ante el SAT y TFJA desde la notificación hasta la resolución, Tijuana-San Diego.",
    "Auditorías preventivas IMMEX, reconstrucción de saldos de pedimentos y reingeniería del área de comercio exterior. Certeza jurídica ante revisión aduanera.",
    "Asesoría en valoración aduanera, clasificación e IMMEX, PROSEC y Drawback. Cada operación de importación y exportación sustentada ante el SAT y la ANAM.",
    "Dictámenes periciales en clasificación arancelaria, origen de mercancías y valoración aduanera para sustentar la defensa legal ante el SAT, la ANAM y el TFJA.",
    "Validación de pedimentos, detección de hallazgos en tiempo real y control de inventarios IMMEX. Cumplimiento aduanero óptimo a gran escala, Tijuana-San Diego.",
    "Revisión y presentación de solicitudes de devolución de IVA ante el SAT. Conciliación DIOT, soporte documental y seguimiento hasta la respuesta de la autoridad.",
    "Determinación y certificación de origen bajo T-MEC y tratados internacionales. Gestión con proveedores y atención a verificaciones de origen ante la autoridad.",
    "Despacho aduanal, cumplimiento de NOM, permisos previos y transporte puerta a puerta en el corredor Tijuana-San Diego. Sin retenciones evitables en la aduana.",
  ],
  en: [
    "Tax and customs compliance monitoring for foreign trade companies. Defense before the SAT, ANAM and TFJA from notice through to resolution, Tijuana-San Diego.",
    "Preventive IMMEX audits, pedimento balance reconstruction and import-export department reengineering. Legal certainty before any customs authority review.",
    "Advisory on customs valuation, tariff classification, IMMEX, PROSEC and Drawback. Import and export operations supported with technical criteria before the SAT.",
    "Expert opinions on tariff classification, origin of goods and customs valuation to substantiate legal defense before the customs authority and the TFJA.",
    "Pedimento validation, real-time finding detection and IMMEX inventory control. Reach optimal customs compliance at scale across the Tijuana-San Diego corridor.",
    "Review and filing of VAT refund requests before the SAT. DIOT reconciliation, operations support and follow-up through the authority resolution process.",
    "Origin determination and USMCA certification for trade agreement preferences. Supplier origin management and authority verification response, Tijuana-San Diego.",
    "Customs clearance, NOM compliance, permit processing and door-to-door transport on the Tijuana-San Diego corridor. No avoidable customs holds on your shipments.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const idx = SERVICE_SLUGS.indexOf(slug as (typeof SERVICE_SLUGS)[number]);
  if (idx === -1) return {};

  const d = getDictionary(lang);
  const s = d.services.items[idx];
  const c = SERVICE_DETAIL[lang][idx];

  const locale = lang === "es" ? "es_MX" : "en_US";
  const ogImage = c.bandImage ?? "/img/gen/border-crossing.webp";
  const canonicalPath = `/${lang}/services/${slug}`;

  return {
    title: SERVICE_TITLES[lang][idx],
    description: SERVICE_DESCRIPTIONS[lang][idx],
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: `/es/services/${slug}`,
        en: `/en/services/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      siteName: "BG Consulting Group",
      title: SERVICE_TITLES[lang][idx],
      description: SERVICE_DESCRIPTIONS[lang][idx],
      url: `${BASE_URL}${canonicalPath}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: s.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SERVICE_TITLES[lang][idx],
      description: SERVICE_DESCRIPTIONS[lang][idx],
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const idx = SERVICE_SLUGS.indexOf(slug as (typeof SERVICE_SLUGS)[number]);
  if (idx === -1) notFound();

  const d = getDictionary(lang);
  const s = d.services.items[idx];
  const c = SERVICE_DETAIL[lang][idx];
  const sec = d.serviceSection;
  const total = SERVICE_SLUGS.length;
  const prevIdx = (idx - 1 + total) % total;
  const nextIdx = (idx + 1) % total;

  const homeLabel = lang === "es" ? "Inicio" : "Home";
  const servicesLabel = d.nav.services;
  const serviceUrl = `${BASE_URL}/${lang}/services/${slug}`;

  // ── JSON-LD: FAQPage + Service + BreadcrumbList ──────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "Service",
        name: s.name,
        description: c.overview,
        provider: {
          "@type": "Organization",
          name: "BG Consulting Group",
          url: `${BASE_URL}/${lang}`,
        },
        areaServed: [
          { "@type": "City", name: "Tijuana" },
          { "@type": "City", name: "San Diego" },
        ],
        url: serviceUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: homeLabel,
            item: `${BASE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: servicesLabel,
            item: `${BASE_URL}/${lang}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: s.name,
            item: serviceUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div>
            <Reveal>
              <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
                <span className="tabular-nums text-ash">
                  {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {d.services.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
                {s.name}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-bone/90">{c.overview}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {d.nav.cta}
                </PillButton>
                <PillButton href={`/${lang}/services`} variant="ghost">
                  {d.servicesPreview.cta}
                </PillButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <ServiceInstrument slug={slug} lang={lang} />
          </Reveal>
        </div>
      </section>

      {/* Cuándo nos buscan (dolores) — filas editoriales con divisores */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading title={sec.painsTitle} tone="light" className="mb-12" />
          <div className="border-t border-ash/20">
            {c.pains.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.07}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-ash/20 py-8 sm:grid-cols-[2.5rem_5fr_8fr] sm:gap-x-10 sm:py-10"
              >
                <span className="font-mono text-[11px] tabular-nums text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.02em] text-ink sm:text-xl">{p.title}</h3>
                <p className="col-start-2 mt-1 text-[15px] leading-relaxed text-graphite sm:col-start-3 sm:mt-0">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alcance del servicio — filas con número display, sin tarjetas ni animación */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading title={sec.doTitle} className="mb-12" />
        <div className="border-t border-line">
          {c.whatWeDo.map((w, i) => (
            <div
              key={w.title}
              className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-5 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8"
            >
              <span className="font-display text-[clamp(1.5rem,4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-1.5 sm:grid-cols-[minmax(0,20rem)_1fr] sm:items-baseline sm:gap-10">
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.01em] text-chalk sm:text-xl">{w.title}</h3>
                <p className="text-[15px] leading-relaxed text-bone/70">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qué obtienes (outcomes) */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <SectionHeading title={sec.outcomesTitle} className="mb-10" />
        <div className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          {c.outcomes.map((o, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 0.05} className="flex items-start gap-4 border-b border-line px-7 py-6 last:border-b-0">
              <DrawCheck size={18} delay={0.1 + Math.min(i, 6) * 0.12} className="mt-0.5 shrink-0" />
              <span className="text-[16px] leading-snug text-chalk">{o}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banda visual del dominio */}
      <section className="relative mb-20 border-y border-line sm:mb-24">
        <MediaFrame
          src={c.bandImage ?? "/img/gen/border-crossing.webp"}
          ratio="21/9"
          panel={false}
          caption={c.bandCaption ?? `${s.name} · cruce Tijuana–San Diego`}
          className="!rounded-none"
        />
      </section>

      {/* Flujo del proceso + diagnóstico — solo servicios con data */}
      {c.flow && <ServiceProcessFlow slug={slug} lang={lang} />}
      {c.diagnostic && <ServiceDiagnostic slug={slug} lang={lang} />}

      {/* FAQ */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading title={sec.faqTitle} className="mb-10" />
        <Faq items={c.faq} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
        <Reveal className="console-panel relative flex flex-col items-start gap-6 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-14 sm:px-14 sm:py-16">
          <h2 className="max-w-2xl font-display text-[clamp(1.7rem,4vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <p className="max-w-lg text-[16px] leading-relaxed text-bone/90">{d.homeCta.body}</p>
          <PillButton href={`/${lang}/contact`} variant="accent" arrow>
            {d.nav.cta}
          </PillButton>
        </Reveal>
      </section>

      {/* Prev / next */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          <Link href={`/${lang}/services/${SERVICE_SLUGS[prevIdx]}`} className="console-panel group rounded-[14px] bg-surface-1 px-6 py-5 transition-colors hover:bg-surface-2/60">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">&larr; {String(prevIdx + 1).padStart(2, "0")}</span>
            <span className="mt-1 block font-display text-lg text-chalk">{d.services.items[prevIdx].name}</span>
          </Link>
          <Link href={`/${lang}/services/${SERVICE_SLUGS[nextIdx]}`} className="console-panel group rounded-[14px] bg-surface-1 px-6 py-5 text-right transition-colors hover:bg-surface-2/60">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">{String(nextIdx + 1).padStart(2, "0")} &rarr;</span>
            <span className="mt-1 block font-display text-lg text-chalk">{d.services.items[nextIdx].name}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
