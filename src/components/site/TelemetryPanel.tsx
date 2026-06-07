"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

type Stage = { n: string; name: string };
type Metric = { value: string; label: string };
type Status = { k: string; v: string };

function CountUp({ value, run }: { value: string; run: boolean }) {
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : null;
  const [display, setDisplay] = useState(reduce || target === null ? value : `${match![1]}0${match![3]}`);

  useEffect(() => {
    if (reduce || target === null || !run) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${match![1]}${Math.round(v)}${match![3]}`),
    });
    return () => controls.stop();
  }, [run, reduce, target, value, match]);

  return <span>{display}</span>;
}

export function TelemetryPanel({
  header,
  live,
  status,
  stages,
  metrics,
}: {
  header: string;
  live: string;
  status: readonly Status[];
  stages: readonly Stage[];
  metrics: readonly Metric[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="console-panel relative overflow-hidden rounded-[16px] bg-surface-1/80 backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">{header}</span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          <motion.span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent signal-glow"
            animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {live}
        </span>
      </div>

      {/* Mapa del corredor (imagen generada) */}
      <div className="relative h-40 overflow-hidden border-b border-line sm:h-48">
        <Image
          src="/img/gen/corridor.webp"
          alt="Corredor de datos transfronterizo Tijuana San Diego"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/10 to-transparent" />
      </div>

      {/* Corredor: nodos + línea de progreso */}
      <div className="px-5 pb-6 pt-6">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-white/[0.1]" />
          <motion.div
            className="absolute left-0 top-[7px] h-px bg-accent"
            initial={{ width: reduce ? "100%" : "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <ol className="relative grid grid-cols-5 gap-2">
            {stages.map((s, i) => (
              <li key={s.n} className="flex flex-col items-start">
                <motion.span
                  className="h-[15px] w-[15px] rounded-full border border-accent bg-accent signal-glow"
                  initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.16 }}
                />
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-bone/80">
                  {s.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Status rows (lectura de cumplimiento) */}
      <div className="border-t border-line">
        {status.map((row, i) => (
          <motion.div
            key={row.k}
            className={`flex items-center justify-between px-5 py-2.5 ${i > 0 ? "border-t border-line/60" : ""}`}
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone/70">{row.k}</span>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              {row.v}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 6.2 L5 8.5 L9.5 3.5" stroke="#00e6a0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Readouts */}
      <div className="grid grid-cols-3 border-t border-line">
        {metrics.map((m, i) => (
          <div key={m.label} className={`px-5 py-5 ${i > 0 ? "border-l border-line" : ""}`}>
            <span className="block font-display text-2xl font-medium tracking-[-0.02em] tabular-nums text-chalk">
              <CountUp value={m.value} run={inView} />
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-ash">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
