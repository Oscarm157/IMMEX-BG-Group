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
}: {
  eyebrow: string;
  title: string;
  lead: string;
  stages: readonly Stage[];
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

  if (reduce) {
    return (
      <section className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8">
        <Header eyebrow={eyebrow} title={title} lead={lead} />
        <ol className="mt-16 border-t border-white/[0.08]">
          {stages.map((s) => (
            <li key={s.n} className="flex gap-6 border-b border-white/[0.08] py-7">
              <span className="font-display text-2xl text-accent">{s.n}</span>
              <div>
                <h3 className="font-display text-2xl text-chalk">{s.name}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-bone/75">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative h-[240vh]">
      <div className="sticky top-0 flex min-h-[100dvh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <Header eyebrow={eyebrow} title={title} lead={lead} />

          <div className="mt-16 sm:mt-20">
            {/* Track */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-[11px] h-px bg-white/[0.12]" />
              <motion.div
                className="absolute left-0 top-[11px] h-px bg-accent"
                style={{ width: lineWidth }}
              />
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
                          className={`h-[22px] w-[22px] rounded-full border transition-colors duration-500 ${
                            reached
                              ? "border-accent bg-accent"
                              : "border-white/25 bg-void"
                          }`}
                        />
                        <span
                          className={`mt-4 hidden text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 sm:block ${
                            i === active ? "text-chalk" : "text-smoke"
                          }`}
                        >
                          {s.name}
                        </span>
                        <span
                          className={`mt-2 text-[12px] tabular-nums sm:hidden ${
                            i === active ? "text-chalk" : "text-smoke"
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

            {/* Detail */}
            <div className="mt-14 min-h-[180px] sm:mt-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-12"
                >
                  <span className="font-display text-[clamp(3.5rem,9vw,7rem)] font-medium leading-none tracking-[-0.03em] text-accent">
                    {stages[active].n}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
                      {stages[active].name}
                    </h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-bone/80">
                      {stages[active].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="max-w-3xl">
      <span className="mb-5 block text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
        {title}
      </h2>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/80">{lead}</p>
    </div>
  );
}
