import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { SERVICE_DETAIL } from "@/content/services-detail";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

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
  return { title: d.services.items[idx].name };
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

  return (
    <>
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
            <div className="console-panel relative overflow-hidden rounded-[16px]">
              <Image src="/img/gen/field.webp" alt="" aria-hidden width={1216} height={832} className="h-full max-h-[360px] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cuándo nos buscan (dolores) */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading eyebrow={sec.painsEyebrow} title={sec.painsTitle} className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2">
          {c.pains.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06} className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
              <span className="font-mono text-[12px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/90">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Qué hacemos (alcance expandido) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading eyebrow={sec.doEyebrow} title={sec.doTitle} className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2">
          {c.whatWeDo.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.06} className="console-panel flex gap-5 rounded-[14px] bg-surface-1 p-7">
              <span className="mt-1 font-mono text-[13px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk">{w.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-bone/90">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Qué obtienes (outcomes) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading eyebrow={sec.outcomesEyebrow} title={sec.outcomesTitle} className="mb-10" />
        <div className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          {c.outcomes.map((o, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 0.05} className="flex items-start gap-4 border-b border-line px-7 py-6 last:border-b-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0">
                <path d="M3.5 9.2 L7.2 13 L14.5 5" stroke="#00e6a0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[16px] leading-snug text-chalk">{o}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading eyebrow={sec.faqEyebrow} title={sec.faqTitle} className="mb-10" />
        <Faq items={c.faq} />
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <Reveal className="console-panel relative mx-auto flex max-w-[1280px] flex-col items-start gap-6 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-14 sm:px-14 sm:py-16">
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
