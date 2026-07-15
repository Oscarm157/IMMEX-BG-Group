import { Markdown } from "@/components/site/Markdown";
import type { Block } from "@/lib/campus-data";

// Renderiza la secuencia de bloques de un video. Cada kind es una familia visual
// distinta; se pueden intercalar libremente.
export function CampusBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((b) => (
        <BlockView key={b.id} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  const d = block.data;
  switch (block.kind) {
    case "text":
      return "markdown" in d ? (
        <div className="[&>*:first-child]:mt-0">
          <Markdown>{d.markdown}</Markdown>
        </div>
      ) : null;

    case "video":
      return "videoId" in d ? (
        <figure className="my-7 overflow-hidden rounded-xl border border-line bg-surface-1">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${d.videoId}?rel=0`}
              title="Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </figure>
      ) : null;

    case "button":
      return "href" in d ? (
        <div className="my-6">
          <a
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-dim"
          >
            {d.label}
            <span aria-hidden>→</span>
          </a>
        </div>
      ) : null;

    case "image":
      return "pathname" in d ? (
        <figure className="my-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={d.url} alt={d.alt ?? ""} className="w-full rounded-xl border border-line" />
          {d.caption ? (
            <figcaption className="mt-2 text-[13px] text-smoke">{d.caption}</figcaption>
          ) : null}
        </figure>
      ) : null;

    default:
      return null;
  }
}
