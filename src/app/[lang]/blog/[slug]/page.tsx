import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/dictionaries";
import { getPublishedArticleBySlug, localize, type Locale } from "@/lib/blog/data";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { MediaFrame } from "@/components/site/MediaFrame";
import { Markdown } from "@/components/site/Markdown";

export const dynamic = "force-dynamic";

const COPY = {
  es: { back: "Todas las noticias", recommendations: "Recomendaciones de BG", source: "Fuente", cta: "¿Le afecta este cambio? Hablemos." },
  en: { back: "All news", recommendations: "BG recommendations", source: "Source", cta: "Does this change affect you? Let's talk." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const a = await getPublishedArticleBySlug(slug);
  if (!a) return {};
  const l = localize(a, lang as Locale);
  return { title: l.title, description: l.excerpt ?? undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const a = await getPublishedArticleBySlug(slug);
  if (!a) notFound();
  const t = COPY[lang as Locale];
  const l = localize(a, lang as Locale);

  return (
    <article className="mx-auto max-w-[820px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <Reveal>
        <Link href={`/${lang}/blog`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-dim">
          &larr; {t.back}
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <span className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
          {[a.category, a.sourceDate].filter(Boolean).join(" · ")}
        </span>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-chalk">
          {l.title}
        </h1>
        {l.excerpt && <p className="mt-5 text-[18px] leading-relaxed text-bone/90">{l.excerpt}</p>}
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <MediaFrame src={a.coverUrl ?? undefined} ratio="16/9" caption={a.category ?? "Noticia"} />
      </Reveal>

      {l.body && (
        <div className="mt-12">
          <Markdown>{l.body}</Markdown>
        </div>
      )}

      {l.recommendations && (
        <div className="console-panel mt-12 rounded-[16px] bg-surface-1 p-7 sm:p-9">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {t.recommendations}
          </h2>
          <div className="mt-2">
            <Markdown>{l.recommendations}</Markdown>
          </div>
        </div>
      )}

      {a.sourceUrl && (
        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.12em] text-ash">
          {t.source}:{" "}
          <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-bone/80 underline underline-offset-2 hover:text-accent">
            {a.sourceName ?? a.sourceUrl}
          </a>
        </p>
      )}

      <div className="mt-16 border-t border-line pt-10">
        <p className="mb-5 max-w-md font-display text-xl font-medium tracking-[-0.01em] text-chalk">{t.cta}</p>
        <PillButton href={`/${lang}/contact`} variant="accent" arrow>
          {lang === "es" ? "Hablemos" : "Let's talk"}
        </PillButton>
      </div>
    </article>
  );
}
