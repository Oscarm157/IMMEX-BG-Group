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
    <section className="mx-auto max-w-[1280px] px-5 pt-40 pb-28 sm:px-8 sm:pt-48 sm:pb-36">
      <Reveal>
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
          {c.eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,7vw,5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
          {c.title}
        </h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-bone/80">{c.lead}</p>
      </Reveal>

      <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        {/* Offices */}
        <Reveal className="flex flex-col gap-12">
          {c.offices.map((o) => (
            <div key={o.country} className="border-t border-white/[0.08] pt-7">
              <h2 className="font-display text-2xl text-chalk">{o.country}</h2>
              <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-accent">{o.company}</p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-bone/75">{o.address}</p>
              <div className="mt-4 flex flex-col gap-1 text-[15px] text-bone/75">
                <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-chalk">
                  {o.phone}
                </a>
                <a href={`tel:${o.toll.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-chalk">
                  {o.toll}
                </a>
              </div>
            </div>
          ))}
          <a
            href={`mailto:${c.email}`}
            className="text-[17px] text-chalk underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
          >
            {c.email}
          </a>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <ContactForm dict={c.form} to={c.email} />
        </Reveal>
      </div>
    </section>
  );
}
