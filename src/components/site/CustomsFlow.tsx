"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
} from "motion/react";

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

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(stages.length - 1, Math.floor(p * stages.length));
    setActive(i < 0 ? 0 : i);
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
        {/* Track */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-[10px] h-px bg-white/[0.1]" />
          <motion.div className="absolute left-0 top-[10px] h-px bg-accent" style={{ width: lineWidth }} />
          <ol className="relative grid grid-cols-5 gap-2">
            {stages.map((s, i) => {
              const reached = i <= active;
              return (
                <li key={s.n} className="flex flex-col items-start">
                  <button
                    onClick={() => setActive(i)}
                    aria-label={s.name}
                    className="group relative flex flex-col items-start"
                  >
                    <span
                      className={`h-[20px] w-[20px] rounded-full border transition-all duration-500 ${
                        reached ? "border-accent bg-accent signal-glow" : "border-white/25 bg-ink"
                      }`}
                    />
                    <span
                      className={`mt-4 hidden font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 sm:block ${
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
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detalle */}
        <div className="mt-12 min-h-[170px] sm:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10"
            >
              <span className="font-display text-[clamp(3rem,8vw,5.5rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent signal-text-glow">
                {stages[active].n}
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-[clamp(1.7rem,3.5vw,2.6rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
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
        <div className="mt-12">{Panel}</div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-[100dvh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <Header eyebrow={eyebrow} title={title} lead={lead} />
          <div className="mt-12">{Panel}</div>
        </div>
      </div>
    </section>
  );
}

function Header({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="max-w-3xl">
      <span className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
        {title}
      </h2>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/90">{lead}</p>
    </div>
  );
}
