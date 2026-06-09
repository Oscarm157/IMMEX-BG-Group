import Image from "next/image";

/* Encabezado de slide: índice + eyebrow + título + lead. */
export function SlideHead({
  index,
  eyebrow,
  title,
  lead,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <span className="tabular-nums">{index}</span>
        <span aria-hidden className="h-px w-8 bg-accent/40" />
        <span className="text-smoke">{eyebrow}</span>
      </div>
      <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-chalk">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bone/90 sm:text-[16px]">{lead}</p>
      )}
    </div>
  );
}

/* Mockup de browser que envuelve una captura real del sitio. */
export function BrowserMock({
  src,
  url,
  caption,
  className = "",
  priority = false,
}: {
  src: string;
  url: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-surface-1 card-elev ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="max-w-full truncate rounded-md bg-ink/60 px-3 py-1 font-mono text-[11px] text-smoke">
            {url}
          </span>
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full bg-ink">
        <Image src={src} alt={caption ?? url} fill priority={priority} className="object-cover object-top" />
      </div>
      {caption && (
        <figcaption className="border-t border-line px-4 py-2.5 text-[12.5px] text-smoke">{caption}</figcaption>
      )}
    </figure>
  );
}

/* Captura con título e intro encima, para las slides scrollables. */
export function ShotRow({
  index,
  title,
  desc,
  src,
  url,
  priority = false,
}: {
  index: string;
  title: string;
  desc: string;
  src: string;
  url: string;
  priority?: boolean;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.62fr_1fr] lg:items-center">
      <div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-6 bg-accent/40" />
        </div>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.015em] text-chalk sm:text-[28px]">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-bone/85">{desc}</p>
      </div>
      <BrowserMock src={src} url={url} priority={priority} />
    </div>
  );
}
