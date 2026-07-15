import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/campus-session";
import { getCategoryView } from "@/lib/campus-data";
import { StatusIcon } from "@/components/campus/StatusIcon";

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

  return (
    <div className="relative min-h-screen">
      <div className="grid-field grid-fade pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-[860px] px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/campus"
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash hover:text-smoke"
        >
          ‹ Campus
        </Link>

        {/* Hero de categoría */}
        <header className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Categoría</p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-chalk">
            {category.title}
          </h1>
          {category.description ? (
            <p className="mt-4 max-w-[620px] text-[16px] leading-[1.7] text-bone/90">
              {category.description}
            </p>
          ) : null}

          <div className="mt-7 flex items-center gap-3">
            <div className="h-1.5 w-full max-w-[280px] overflow-hidden rounded-full bg-line">
              <div
                className="signal-glow h-full rounded-full bg-accent transition-[width] duration-500"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">
              {progress.pct}% · {progress.completed}/{progress.total}
            </span>
          </div>
        </header>

        {/* Lista de videos */}
        <section className="mt-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Contenido · {topics.length} {topics.length === 1 ? "video" : "videos"}
          </p>
          {topics.length === 0 ? (
            <p className="rounded-xl border border-line bg-surface-1 px-5 py-8 text-center text-[14px] text-smoke">
              Esta categoría aún no tiene videos publicados.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {topics.map((t, i) => (
                <li key={t.slug}>
                  <Link
                    href={`/campus/${category.slug}/${t.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface-1 px-4 py-3.5 transition-colors hover:border-ash/40 hover:bg-surface-2"
                  >
                    <StatusIcon state={t.state} size={22} />
                    <div className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
                        Video {String(i + 1).padStart(2, "0")}
                        {t.hasQuiz ? " · con evaluación" : ""}
                      </span>
                      <span className="block text-[15px] font-medium text-chalk">{t.title}</span>
                    </div>
                    <span className="text-smoke transition-transform group-hover:translate-x-0.5">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
