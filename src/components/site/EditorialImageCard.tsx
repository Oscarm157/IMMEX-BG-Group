import Image from "next/image";
import { Reveal } from "./Reveal";

export function EditorialImageCard({
  src,
  alt,
  badge,
  kicker,
  title,
  body,
  points,
  priority = false,
  ratio = "aspect-[4/5]",
  delay = 0,
}: {
  src: string;
  alt: string;
  badge?: string;
  kicker?: string;
  title: string;
  body?: string;
  points?: readonly string[];
  priority?: boolean;
  ratio?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="group relative overflow-hidden rounded-[10px] card-elev">
      <div className={`relative ${ratio} w-full`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5" />

        {badge && (
          <span className="absolute right-4 top-4 rounded-full bg-white/[0.08] px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-chalk shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            {badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
          {kicker && (
            <span className="mb-3 block text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
              {kicker}
            </span>
          )}
          <h3 className="font-display text-3xl font-medium tracking-[-0.02em] text-chalk sm:text-4xl">
            {title}
          </h3>
          {body && <p className="mt-3 max-w-md text-[15px] leading-relaxed text-bone/90">{body}</p>}
          {points && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
              {points.map((p) => (
                <li key={p} className="text-[13px] text-smoke">
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}
