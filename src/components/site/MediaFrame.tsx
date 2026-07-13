"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type Ratio = "16/9" | "4/3" | "3/2" | "1/1" | "21/9";

const RATIO: Record<Ratio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * Marco de imagen del dominio: foto desaturada con leve grade mint y overlay
 * para legibilidad, con micro-zoom on-scroll (respeta reduced-motion). Sin `src`
 * muestra un placeholder oscuro con grid y la nota de art direction.
 * Capa visual estilo Andercore, adaptada al acento mint de BG.
 */
export function MediaFrame({
  src,
  alt = "",
  caption,
  ratio = "16/9",
  overlay = false,
  panel = true,
  enableMotion = true,
  tint = true,
  className = "",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  ratio?: Ratio;
  overlay?: boolean;
  panel?: boolean;
  enableMotion?: boolean;
  tint?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[16px] ${panel ? "console-panel" : ""} ${RATIO[ratio]} ${className}`}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={
            tint
              ? "absolute inset-0 h-full w-full object-cover grayscale-[0.35] contrast-[1.04] brightness-[0.9]"
              : "absolute inset-0 h-full w-full object-cover"
          }
          style={reduce || !enableMotion ? undefined : { scale }}
        />
      ) : (
        <div className="grid-field absolute inset-0 grid place-items-center bg-surface-1">
          <span className="flex items-center gap-2.5 px-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70" />
            {caption ?? "Imagen"}
          </span>
        </div>
      )}

      {src && tint && (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-soft-light" />
      )}
      {overlay && (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      )}
      {src && caption && (
        <span className="absolute bottom-3 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/80">
          {caption}
        </span>
      )}
    </div>
  );
}
