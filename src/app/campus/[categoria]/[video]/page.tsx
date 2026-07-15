import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/campus-session";
import { getTopicView, ensureEnrollment } from "@/lib/campus-data";
import { Player } from "@/components/campus/Player";
import { CampusBlocks } from "@/components/campus/CampusBlocks";
import { QuizRunner } from "@/components/campus/QuizRunner";
import { AssistantDock } from "@/components/campus/AssistantDock";
import { VideoAssistantProvider } from "@/components/campus/video-assistant-context";
import { markTopicComplete } from "../../actions";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ categoria: string; video: string }>;
}) {
  const me = await requireLearner();
  const { categoria, video } = await params;
  const view = await getTopicView(me, categoria, video);
  if (!view) notFound();
  await ensureEnrollment(me.id, view.category.id);

  const { category, topic, blocks, quiz, progress, sidebar, neighbors } = view;
  const mark = markTopicComplete.bind(null, topic.id, category.slug, topic.slug);
  const audienceLabel = [me.audience === "empleado" ? "Colaborador" : "Cliente", me.role]
    .filter(Boolean)
    .join(" · ");

  return (
    <VideoAssistantProvider>
      <Player
        categoryTitle={category.title}
        categorySlug={category.slug}
        topics={sidebar}
        currentSlug={topic.slug}
        user={{ name: me.name, audienceLabel }}
        assistant={topic.hasAssistant ? <AssistantDock topicId={topic.id} /> : null}
      >
      {/* Topbar de progreso */}
      <header className="console-panel sticky top-0 z-30 flex items-center gap-4 border-b border-line bg-ink/85 px-5 py-3 backdrop-blur-xl sm:px-8">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="signal-glow inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-[13px] font-semibold text-chalk">
            Campus <span className="text-accent">BG</span>
          </span>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-1.5 w-full max-w-[320px] overflow-hidden rounded-full bg-line">
            <div
              className="signal-glow h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-smoke">
            {progress.pct}% · {progress.completed}/{progress.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <NeighborLink categoria={category.slug} slug={neighbors.prev} dir="prev" labeled />
          <NeighborLink categoria={category.slug} slug={neighbors.next} dir="next" labeled />
        </div>
      </header>

      {/* Columna de lectura (contenedor ancho; el video usa todo el ancho, el texto conserva medida de lectura) */}
      <div className="mx-auto w-full max-w-[980px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <nav className="min-w-0 font-mono text-[11px] uppercase tracking-[0.1em] text-ash">
            <Link href={`/campus/${category.slug}`} className="hover:text-smoke">
              {category.title}
            </Link>
            <span className="mx-2 text-line">›</span>
            <span className="text-smoke">Video</span>
          </nav>
          {topic.done ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              Completado
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-chalk">
          {topic.title}
        </h1>

        <div className="mt-8">
          <CampusBlocks blocks={blocks} />
        </div>

        {/* Marcar completado */}
        <div className="mt-10 border-t border-line pt-6">
          {topic.done ? (
            <span className="inline-flex items-center gap-2 text-[14px] text-smoke">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] text-on-accent">✓</span>
              Video completado
            </span>
          ) : (
            <form action={mark}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-dim"
              >
                Marcar como completado
              </button>
            </form>
          )}
        </div>

        {/* Quiz */}
        {quiz ? <QuizRunner quiz={quiz} categorySlug={category.slug} topicSlug={topic.slug} /> : null}

        {/* Footer nav */}
        <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
          <NeighborLink categoria={category.slug} slug={neighbors.prev} dir="prev" labeled />
          <Link
            href={`/campus/${category.slug}`}
            className="text-[13px] text-smoke underline-offset-4 hover:text-chalk hover:underline"
          >
            Volver a la categoría
          </Link>
          <NeighborLink categoria={category.slug} slug={neighbors.next} dir="next" labeled />
        </div>
      </div>
      </Player>
    </VideoAssistantProvider>
  );
}

function NeighborLink({
  categoria,
  slug,
  dir,
  labeled,
}: {
  categoria: string;
  slug: string | null;
  dir: "prev" | "next";
  labeled?: boolean;
}) {
  // prev → "‹ [Anterior]"; next → "[Siguiente] ›"
  const content = labeled ? (
    dir === "prev" ? <>‹ Anterior</> : <>Siguiente ›</>
  ) : dir === "prev" ? (
    "‹"
  ) : (
    "›"
  );
  const cls = [
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors",
    labeled ? "" : "px-2.5",
  ].join(" ");

  if (!slug) {
    return (
      <span className={`${cls} border-line/50 text-ash/50`} aria-disabled>
        {content}
      </span>
    );
  }
  return (
    <Link
      href={`/campus/${categoria}/${slug}`}
      className={`${cls} border-line text-bone hover:border-accent/50 hover:text-chalk`}
    >
      {content}
    </Link>
  );
}
