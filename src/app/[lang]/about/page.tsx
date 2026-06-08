import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { TEAM } from "@/content/team";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MediaFrame } from "@/components/site/MediaFrame";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.about.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const a = d.about;
  const role = (m: (typeof TEAM)[number]) => (lang === "es" ? m.es : m.en);
  const leads = TEAM.filter((m) => m.lead);
  const rest = TEAM.filter((m) => !m.lead);

  return (
    <>
      {/* Hero */}
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {a.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.4rem,5.5vw,4.4rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
                {a.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/90">{a.intro}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {d.nav.cta}
                </PillButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18} className="relative flex items-center justify-center">
            <Image
              src="/img/gen/core.webp"
              alt=""
              aria-hidden
              width={520}
              height={520}
              priority
              className="w-[78%] max-w-[420px] drop-shadow-[0_0_60px_rgba(0,230,160,0.18)]"
            />
          </Reveal>
        </div>
      </section>

      {/* Narrativa */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-x-16 gap-y-5 border-t border-line pt-12 md:grid-cols-2">
          {a.paragraphs.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <p className="text-[16px] leading-relaxed text-bone/90">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banda visual: oficinas (placeholder por ahora) */}
      <section className="relative mb-16 border-y border-line sm:mb-20">
        <MediaFrame ratio="21/9" panel={false} caption="Foto · Oficinas Tijuana y San Diego" className="!rounded-none" />
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8 sm:pb-20">
        <SectionHeading eyebrow={d.values.eyebrow} title={d.values.title} className="mb-10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.values.items.map((v, i) => (
            <Reveal key={v.name} delay={(i % 4) * 0.06} className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7">
              <span className="font-mono text-[12px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{v.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-bone/90">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
        <SectionHeading eyebrow={a.teamEyebrow} title={a.teamTitle} lead={a.teamLead} className="mb-10" />
        {/* Liderazgo */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((m) => (
            <Reveal key={m.name} className="console-panel flex flex-col rounded-[14px] bg-surface-1 px-6 py-6">
              <span className="font-display text-lg font-medium text-chalk">{m.name}</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">{role(m)}</span>
            </Reveal>
          ))}
        </div>
        {/* Resto del equipo */}
        <div className="console-panel mt-4 grid overflow-hidden rounded-[14px] bg-surface-1 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <div
              key={m.name}
              className="flex items-baseline justify-between gap-4 border-b border-line px-6 py-4"
            >
              <span className="text-[14px] text-chalk">{m.name}</span>
              <span className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.08em] text-bone/60">
                {role(m)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal className="console-panel relative mx-auto flex max-w-[1280px] flex-col items-start gap-7 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-16 sm:px-16 sm:py-20">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-bone/90">{d.homeCta.body}</p>
          <PillButton href={`/${lang}/contact`} variant="accent" arrow>
            {d.nav.cta}
          </PillButton>
        </Reveal>
      </section>
    </>
  );
}
