import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/campus-session";
import { getCategoryView } from "@/lib/campus-data";
import { StatusIcon } from "@/components/campus/StatusIcon";
import { Logo } from "@/components/Logo";

// Portadas por video (piloto). Fase 4 lo llevará a un campo por topic.
const TOPIC_COVER: Record<string, string> = {
  "mve-edocument": "/campus/comercio-exterior-cover.jpg",
  "immex-que-es": "/campus/immex.jpg",
  "reglas-de-origen": "/campus/reglas-de-origen.jpg",
  "pedimento-aduanal": "/campus/pedimento.jpg",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const me = await requireLearner();
  const { categoria } = await params;
  const view = await getCategoryView(me, categoria);
  if (!view) notFound();
  const { category, topics, progress } = view;
  const cover = category.coverUrl ?? "/campus/comercio-exterior-cover.jpg";

  return (
    <div className="min-h-screen">
      {/* Hero cinematográfico image-led */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1040px] px-5 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-8">
          <div className="flex items-center justify-between">
            <Link href="/campus">
              <Logo variant="bg" tone="light" size="sm" />
            </Link>
            <Link
              href="/campus"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone/80 hover:text-chalk"
            >
              ‹ Todas las categorías
            </Link>
          </div>

          <div className="mt-20 max-w-[640px] sm:mt-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Categoría</p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-chalk">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.7] text-bone/90">
                {category.description}
              </p>
            ) : null}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-1.5 w-full max-w-[260px] overflow-hidden rounded-full bg-chalk/15">
                <div
                  className="signal-glow h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${progress.pct}%` }}
                />
              </div>
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-bone">
                {progress.pct}% · {progress.completed}/{progress.total}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de videos image-led */}
      <section className="mx-auto w-full max-w-[1040px] px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
          {topics.length} {topics.length === 1 ? "video" : "videos"}
        </p>
        {topics.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface-1 px-5 py-10 text-center text-[14px] text-smoke">
            Esta categoría aún no tiene videos publicados.
          </p>
        ) : (
          <ul className="grid gap-3">
            {topics.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/campus/${category.slug}/${t.slug}`}
                  className="group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-line bg-surface-1 transition-colors hover:border-ash/40 hover:bg-surface-2"
                >
                  <div className="relative aspect-[16/10] w-[128px] shrink-0 overflow-hidden sm:w-[180px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TOPIC_COVER[t.slug] ?? cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-1/80" />
                    <span className="absolute left-2.5 top-2.5">
                      <StatusIcon state={t.state} size={20} />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-3 py-4 pr-4">
                    <div className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                        Video {String(i + 1).padStart(2, "0")}
                        {t.hasQuiz ? " · con evaluación" : ""}
                      </span>
                      <span className="mt-1 block font-display text-[16px] font-semibold leading-snug text-chalk sm:text-[18px]">
                        {t.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-smoke transition-transform group-hover:translate-x-0.5">›</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
