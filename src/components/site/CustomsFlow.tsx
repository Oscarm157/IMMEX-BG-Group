"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { editorialEase } from "@/lib/motion";

type Stage = { n: string; name: string; desc: string };

export function CustomsFlow({
  eyebrow,
  title,
  lead,
  stages,
  panelLabel,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  stages: readonly Stage[];
  panelLabel: string;
}) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = stages.length - 1;

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(last, Math.max(0, Math.floor(p * stages.length)));
    setActive(i);
  });

  const Panel = (
    <div className="console-panel grid-field rounded-[14px] bg-surface-1/70">
      {/* Barra de consola */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-7">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">{panelLabel}</span>
        <span className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-accent">
          {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
        </span>
      </div>

      <div className="px-5 py-8 sm:px-7 sm:py-10">
        {/* Track — puntos repartidos en todo el ancho, línea que SALTA al punto activo */}
        <div className="relative mx-6 h-[60px] sm:mx-12">
          <div className="absolute left-0 right-0 top-[10px] h-px bg-white/[0.1]" />
          <motion.div
            className="absolute left-0 top-[10px] h-px bg-accent"
            animate={{ width: `${(active / last) * 100}%` }}
            transition={{ duration: 0.5, ease: editorialEase }}
          />
          {stages.map((s, i) => {
            const reached = i <= active;
            return (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                aria-label={s.name}
                style={{ left: `${(i / last) * 100}%` }}
                className="group absolute top-0 flex -translate-x-1/2 flex-col items-center"
              >
                <span
                  className={`h-[20px] w-[20px] rounded-full border transition-all duration-500 ${
                    reached ? "border-accent bg-accent signal-glow" : "border-white/25 bg-ink"
                  }`}
                />
                <span
                  className={`mt-3 hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 sm:block ${
                    i === active ? "text-chalk" : "text-ash"
                  }`}
                >
                  {s.name}
                </span>
                <span
                  className={`mt-2 font-mono text-[11px] tabular-nums sm:hidden ${
                    i === active ? "text-chalk" : "text-ash"
                  }`}
                >
                  {s.n}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detalle */}
        <div className="mt-12 min-h-[150px] sm:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: editorialEase }}
              className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10"
            >
              <span className="font-display text-[clamp(2.6rem,7vw,4.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent signal-text-glow">
                {stages[active].n}
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
                  {stages[active].name}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-bone/90">{stages[active].desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
        <Header eyebrow={eyebrow} title={title} lead={lead} />
        <div className="mt-10">{Panel}</div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-[100dvh] flex-col justify-center pb-10 pt-[88px] sm:pt-[112px]">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <Header eyebrow={eyebrow} title={title} lead={lead} />
          <div className="mt-8">{Panel}</div>
        </div>
      </div>
    </section>
  );
}

function Header({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="max-w-3xl">
      <span className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
        {title}
      </h2>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-bone/90">{lead}</p>
    </div>
  );
}
