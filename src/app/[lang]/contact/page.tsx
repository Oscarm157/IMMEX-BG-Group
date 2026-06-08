import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const c = d.contact;

  return (
    <section className="grid-field relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-28 pt-36 sm:px-8 sm:pb-36 sm:pt-44">
        <Reveal>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {c.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
            {c.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/85">{c.lead}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* Oficinas como readouts */}
          <Reveal className="flex flex-col gap-4">
            {c.offices.map((o) => (
              <div key={o.country} className="console-panel rounded-[14px] bg-surface-1 px-7 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl text-chalk">{o.country}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{o.company}</span>
                </div>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-bone/90">{o.address}</p>
                <div className="mt-4 flex flex-col gap-1 font-mono text-[14px] text-bone/90">
                  <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent">
                    {o.phone}
                  </a>
                  <a href={`tel:${o.toll.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent">
                    {o.toll}
                  </a>
                </div>
              </div>
            ))}
            <a
              href={`mailto:${c.email}`}
              className="console-panel rounded-[14px] bg-surface-1 px-7 py-5 font-mono text-[15px] text-chalk transition-colors hover:text-accent"
            >
              {c.email}
            </a>
          </Reveal>

          {/* Formulario en panel */}
          <Reveal delay={0.1} className="console-panel rounded-[16px] bg-surface-1 px-7 py-8 sm:px-9 sm:py-10">
            <ContactForm dict={c.form} locale={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
