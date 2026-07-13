"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type Principle = { title: string; body: string };
type Dimension = { label: string; title: string; items: readonly string[]; body: string };

type Framework = {
  eyebrow: string;
  title: string;
  lead: string;
  coreLabel: string;
  core: readonly Principle[];
  dimensions: readonly Dimension[];
};

const vp = { once: true, margin: "-100px" } as const;

export function GovernanceFramework({ framework }: { framework: Framework }) {
  const [dim1, dim2, dim3] = framework.dimensions;

  return (
    <section id="framework" className="relative overflow-hidden border-y border-line bg-ink">
      <div className="grid-field grid-fade absolute inset-0 opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,230,160,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-28">
        <motion.div variants={stagger(0.08, 0)} initial="hidden" whileInView="visible" viewport={vp} className="max-w-2xl">
          <motion.span variants={fadeUp} className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {framework.eyebrow}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-5 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {framework.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[17px] leading-relaxed text-bone/90">
            {framework.lead}
          </motion.p>
        </motion.div>

        {/* Núcleo: los cuatro principios como base */}
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">{framework.coreLabel}</p>
          <motion.div
            variants={stagger(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {framework.core.map((c, i) => (
              <motion.div key={c.title} variants={fadeUp} className="console-panel rounded-[14px] bg-surface-1 p-5">
                <span className="font-mono text-[12px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-medium tracking-[-0.01em] text-chalk">{c.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-bone/75">{c.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dimensiones 1 y 2 en columnas, con la 3 como banda transversal que las abarca */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mt-4 overflow-hidden rounded-[14px] border border-line"
        >
          <div className="grid sm:grid-cols-2">
            {[dim1, dim2].map((d, i) => (
              <div
                key={d.label}
                className={`bg-surface-1/60 p-6 sm:p-7 ${i === 0 ? "border-b border-line sm:border-b-0 sm:border-r" : ""}`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{d.label}</p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{d.title}</h3>
                <ul className="mt-5 space-y-3">
                  {d.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug text-bone/85">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-accent/25 bg-accent/[0.05] p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{dim3.label}</p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{dim3.title}</h3>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-bone/85 sm:text-right">{dim3.body}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
