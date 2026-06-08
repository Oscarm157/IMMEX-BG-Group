"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { editorialEase, fadeUp, stagger } from "@/lib/motion";
import { CountUp } from "./CountUp";

type Metric = { value: string; label: string };

// Stream fijo (no random) para que el SSR coincida con el cliente.
const PARTICLES = [
  { cy: 0, delay: 0 },
  { cy: -10, delay: 0.22 },
  { cy: 8, delay: 0.44 },
  { cy: -6, delay: 0.66 },
  { cy: 12, delay: 0.88 },
  { cy: -12, delay: 1.1 },
  { cy: 4, delay: 1.32 },
  { cy: -4, delay: 1.54 },
  { cy: 10, delay: 1.76 },
  { cy: -8, delay: 1.98 },
];

const NODES_X = [320, 420, 520, 620, 720];
const Y = 140;

export function OperationViz({
  eyebrow,
  title,
  intro,
  opLabel,
  opId,
  statusLabel,
  statusNote,
  barLabel,
  stages,
  metrics,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  opLabel: string;
  opId: string;
  statusLabel: string;
  statusNote: string;
  barLabel: string;
  stages: readonly string[];
  metrics: readonly Metric[];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const vp = { once: true, margin: "-100px" } as const;

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-ink">
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
            {eyebrow}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-5 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[17px] leading-relaxed text-bone/90">
            {intro}
          </motion.p>
        </motion.div>

        {/* Diagrama */}
        <div className="mt-14">
          <svg viewBox="0 0 1040 280" className="h-auto w-full" role="img" aria-label={title}>
            <defs>
              <linearGradient id="ov-bar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0b8f63" />
                <stop offset="100%" stopColor="#00e6a0" />
              </linearGradient>
              <radialGradient id="ov-part" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#7ff5cf" />
                <stop offset="100%" stopColor="#00e6a0" />
              </radialGradient>
            </defs>

            {/* OPERACIÓN — tarjeta izquierda */}
            <motion.g initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, ease: editorialEase }}>
              <rect x="36" y="46" width="232" height="188" rx="14" fill="rgba(255,255,255,0.02)" stroke="#28303f" strokeWidth="1.5" />
              <text x="60" y="80" fontFamily="var(--font-plex-mono), monospace" fontSize="11" letterSpacing="1.6" fill="#7b8494">
                {opLabel.toUpperCase()}
              </text>
              {[104, 122, 140].map((y, i) => (
                <rect key={y} x="60" y={y} width={[160, 120, 184][i]} height="7" rx="3.5" fill="rgba(204,210,220,0.16)" />
              ))}
              <line x1="60" y1="170" x2="244" y2="170" stroke="#28303f" strokeWidth="1" />
              <text x="60" y="206" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="26" fill="#f4f6f7">
                {opId}
              </text>
            </motion.g>

            {/* FLUJO — guía + nodos + partículas */}
            <line x1="320" y1={Y} x2="720" y2={Y} stroke="rgba(204,210,220,0.14)" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />

            {!reduce &&
              PARTICLES.map((p, i) => (
                <motion.circle
                  key={i}
                  r="3.5"
                  cy={Y + p.cy}
                  fill="url(#ov-part)"
                  initial={{ cx: 320, opacity: 0 }}
                  animate={{ cx: [320, 720], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.6, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

            {NODES_X.map((x, i) => (
              <g key={x}>
                <motion.circle
                  cx={x}
                  cy={Y}
                  r="7"
                  fill="#00e6a0"
                  stroke="#00e6a0"
                  initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.16, ease: editorialEase }}
                  style={{ transformOrigin: `${x}px ${Y}px` }}
                />
                <text x={x} y={Y - 22} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="11" fill="#00e6a0">
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text x={x} y={Y + 30} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="10.5" letterSpacing="0.3" fill="rgba(204,210,220,0.6)">
                  {(stages[i] ?? "").split(" ")[0]}
                </text>
              </g>
            ))}

            {!reduce && (
              <motion.circle
                cx="720"
                cy={Y}
                r="6"
                fill="#00e6a0"
                animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.25, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `720px ${Y}px` }}
              />
            )}

            {/* ESTADO — derecha */}
            <motion.g initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, delay: 0.3, ease: editorialEase }}>
              <circle cx="788" cy="78" r="16" fill="rgba(0,230,160,0.1)" stroke="#00e6a0" strokeWidth="1.3" />
              <motion.path
                d="M781 78 l5 5 l9 -11"
                fill="none"
                stroke="#00e6a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: 0.7, ease: editorialEase }}
              />
              <text x="818" y="74" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="24" fontWeight="500" fill="#f4f6f7">
                {statusLabel}
              </text>
              <text x="819" y="96" fontFamily="var(--font-plex-mono), monospace" fontSize="11" letterSpacing="1.4" fill="rgba(204,210,220,0.6)">
                {statusNote.toUpperCase()}
              </text>

              <rect x="788" y="150" width="216" height="18" rx="9" fill="rgba(204,210,220,0.08)" />
              <motion.rect
                x="788"
                y="150"
                width="216"
                height="18"
                rx="9"
                fill="url(#ov-bar)"
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={vp}
                transition={{ duration: 0.9, delay: 0.6, ease: editorialEase }}
                style={{ transformOrigin: "left center", transformBox: "fill-box" }}
              />
              <text x="788" y="196" fontFamily="var(--font-plex-mono), monospace" fontSize="11" letterSpacing="1" fill="rgba(204,210,220,0.6)">
                {barLabel.toUpperCase()}
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 overflow-hidden rounded-[14px] border border-line">
          {metrics.map((m, i) => (
            <div key={m.label} className={`bg-surface-1 px-6 py-7 ${i > 0 ? "border-l border-line" : ""}`}>
              <span className="block font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.035em] tabular-nums text-chalk">
                <CountUp value={m.value} run={inView} />
              </span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-ash">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
