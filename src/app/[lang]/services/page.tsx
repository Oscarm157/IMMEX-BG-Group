import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.services.title };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="hero-aura grid-field grid-fade relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20">
          <SectionHeading eyebrow={d.services.eyebrow} title={d.services.title} lead={d.services.lead} />
          <Reveal delay={0.16}>
            <div className="console-panel relative overflow-hidden rounded-[16px]">
              <Image
                src="/img/gen/rings.webp"
                alt=""
                aria-hidden
                width={1024}
                height={768}
                className="h-full max-h-[320px] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ledger de servicios (enlazados) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-28">
        <div className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          <div className="hidden grid-cols-[3rem_1fr_1.4fr_2rem] gap-6 border-b border-line px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ash sm:grid">
            <span>{d.servicesPreview.colIndex}</span>
            <span>{d.servicesPreview.colService}</span>
            <span>{d.servicesPreview.colScope}</span>
            <span />
          </div>
          {d.services.items.map((s, i) => (
            <Reveal key={s.name} delay={Math.min(i, 4) * 0.04}>
              <Link
                href={`/${lang}/services/${SERVICE_SLUGS[i]}`}
                className="group grid grid-cols-1 gap-2 border-b border-line px-7 py-6 transition-colors last:border-b-0 hover:bg-surface-2/60 sm:grid-cols-[3rem_1fr_1.4fr_2rem] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-[13px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-lg font-medium tracking-[-0.01em] text-chalk sm:text-xl">
                  {s.name}
                </h2>
                <p className="text-[14px] leading-relaxed text-bone/90">{s.summary}</p>
                <span
                  aria-hidden
                  className="hidden self-center text-right text-accent transition-transform duration-300 group-hover:translate-x-1 sm:block"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal className="console-panel hero-aura relative mx-auto flex max-w-[1280px] flex-col items-start gap-7 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-16 sm:px-16 sm:py-20">
          <h2 className="relative z-10 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <p className="relative z-10 max-w-lg text-[17px] leading-relaxed text-bone/90">{d.homeCta.body}</p>
          <PillButton href={`/${lang}/contact`} variant="accent" arrow>
            {d.nav.cta}
          </PillButton>
        </Reveal>
      </section>
    </>
  );
}
