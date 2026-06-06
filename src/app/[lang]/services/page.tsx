import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, type Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";

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

type Service = Dictionary["services"]["items"][number];

function ServicePanel({ s, i }: { s: Service; i: number }) {
  return (
    <Reveal delay={(i % 2) * 0.06} className="border-t border-white/[0.08] pt-8">
      <div className="flex items-baseline gap-5">
        <span className="font-display text-2xl text-accent tabular-nums">
          {String(i + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-[1.7rem] font-medium leading-tight tracking-[-0.02em] text-chalk sm:text-3xl">
          {s.name}
        </h2>
      </div>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone/75">{s.summary}</p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {s.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[14px] text-smoke">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {p}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const items = d.services.items;

  return (
    <>
      {/* Heading */}
      <section className="mx-auto max-w-[1280px] px-5 pt-40 pb-20 sm:px-8 sm:pt-48">
        <Reveal>
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
            {d.services.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-chalk">
            {d.services.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-bone/80">{d.services.lead}</p>
        </Reveal>
      </section>

      {/* First four */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {items.slice(0, 4).map((s, i) => (
            <ServicePanel key={s.name} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* Image band */}
      <section className="relative my-24 h-[42vh] min-h-[320px] w-full overflow-hidden sm:my-32 sm:h-[55vh]">
        <Image
          src="/img/containers.webp"
          alt="Patio de contenedores de noche"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
      </section>

      {/* Last four */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {items.slice(4).map((s, i) => (
            <ServicePanel key={s.name} s={s} i={i + 4} />
          ))}
        </div>
      </section>

      {/* CTA panel (light) */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto flex max-w-[1280px] flex-col items-start gap-8 rounded-[18px] bg-paper px-8 py-16 sm:px-16 sm:py-24">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {d.homeCta.title}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-ink/70">{d.homeCta.body}</p>
          <PillButton href={`/${lang}/contact`} variant="inverted" arrow>
            {d.nav.cta}
          </PillButton>
        </Reveal>
      </section>
    </>
  );
}
