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
type Tone = "dark" | "light";

export function CustomsFlow({
  eyebrow,
  title,
  lead,
  stages,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  stages: readonly Stage[];
  tone?: Tone;
}) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const light = tone === "light";

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(stages.length - 1, Math.floor(p * stages.length));
    setActive(i < 0 ? 0 : i);
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const surface = light ? "bg-paper" : "";
  const trackBase = light ? "bg-ink/15" : "bg-white/[0.12]";
  const eyebrowCls = light ? "text-accent-ink" : "text-accent";
  const titleCls = light ? "text-ink" : "text-chalk";
  const leadCls = light ? "text-ink/65" : "text-bone/80";
  const numberCls = light ? "text-accent-ink" : "text-accent";
  const labelActive = light ? "text-ink" : "text-chalk";
  const labelIdle = light ? "text-ink/45" : "text-smoke";
  const dotIdle = light ? "border-ink/25 bg-paper" : "border-white/25 bg-ink";
  const dividerCls = light ? "border-ink/10" : "border-white/[0.08]";

  if (reduce) {
    return (
      <section className={surface}>
        <div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8">
          <Header
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            eyebrowCls={eyebrowCls}
            titleCls={titleCls}
            leadCls={leadCls}
          />
          <ol className={`mt-16 border-t ${dividerCls}`}>
            {stages.map((s) => (
              <li key={s.n} className={`flex gap-6 border-b ${dividerCls} py-7`}>
                <span className={`font-display text-2xl ${numberCls}`}>{s.n}</span>
                <div>
                  <h3 className={`font-display text-2xl ${titleCls}`}>{s.name}</h3>
                  <p className={`mt-2 max-w-xl text-[15px] leading-relaxed ${leadCls}`}>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className={`relative h-[150vh] ${surface}`}>
      <div className="sticky top-0 flex min-h-[100dvh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <Header
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            eyebrowCls={eyebrowCls}
            titleCls={titleCls}
            leadCls={leadCls}
          />

          <div className="mt-16 sm:mt-20">
            {/* Track */}
            <div className="relative">
              <div className={`absolute left-0 right-0 top-[11px] h-px ${trackBase}`} />
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
                            reached ? "border-accent bg-accent" : dotIdle
                          }`}
                        />
                        <span
                          className={`mt-4 hidden text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 sm:block ${
                            i === active ? labelActive : labelIdle
                          }`}
                        >
                          {s.name}
                        </span>
                        <span
                          className={`mt-2 text-[12px] tabular-nums sm:hidden ${
                            i === active ? labelActive : labelIdle
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
                  <span
                    className={`font-display text-[clamp(3.5rem,9vw,7rem)] font-medium leading-none tracking-[-0.03em] tabular-nums ${numberCls}`}
                  >
                    {stages[active].n}
                  </span>
                  <div className="max-w-xl">
                    <h3
                      className={`font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] ${titleCls}`}
                    >
                      {stages[active].name}
                    </h3>
                    <p className={`mt-4 text-[17px] leading-relaxed ${leadCls}`}>
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

function Header({
  eyebrow,
  title,
  lead,
  eyebrowCls,
  titleCls,
  leadCls,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  eyebrowCls: string;
  titleCls: string;
  leadCls: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className={`mb-5 block text-[12px] font-medium uppercase tracking-[0.18em] ${eyebrowCls}`}>
        {eyebrow}
      </span>
      <h2 className={`font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] ${titleCls}`}>
        {title}
      </h2>
      <p className={`mt-6 max-w-xl text-[17px] leading-relaxed ${leadCls}`}>{lead}</p>
    </div>
  );
}
