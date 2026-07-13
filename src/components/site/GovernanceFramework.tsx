"use client";

import Image from "next/image";
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <div className="w-full max-w-[720px] overflow-hidden rounded-[20px] border border-line bg-[#0a0f18] p-3 sm:p-5">
            <Image
              src="/framework-diagram.webp"
              alt="BMS Trade Governance Framework: núcleo de cumplimiento, integridad, confiabilidad y trazabilidad, con tres dimensiones de negocio, tecnología y operación."
              width={1600}
              height={1600}
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
