"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { editorialEase } from "@/lib/motion";
import { SERVICE_INSTRUMENTS, type InstrumentLabels, type Motif } from "@/content/service-instruments";
import { SERVICE_SLUGS } from "@/content/service-slugs";

const ACCENT = "#00e6a0";
const LINE = "#28303f";
const GUIDE = "rgba(204,210,220,0.14)";
const MONO = "var(--font-plex-mono), monospace";
const vp = { once: true, margin: "-80px" } as const;

/** Check mint que se dibuja con pathLength al entrar en vista. Reusable (hero + beneficios). */
export function DrawCheck({ size = 18, delay = 0, className = "" }: { size?: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <motion.path
        d="M3.4 9.3 L7.2 13 L14.6 5"
        stroke={ACCENT}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={vp}
        transition={{ duration: 0.5, delay, ease: editorialEase }}
      />
    </svg>
  );
}

function StatusFlip({ from, to }: { from: string; to: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setDone(true), 1150);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  if (reduce) {
    return (
      <span ref={ref} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em]">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
        <span className="text-accent">{to}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em]">
      <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${done ? "bg-accent signal-glow" : "bg-ash"}`} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? "to" : "from"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: editorialEase }}
          className={done ? "text-accent" : "text-ash"}
        >
          {done ? to : from}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Panel({ code, status, children }: { code: string; status: [string, string]; children: React.ReactNode }) {
  return (
    <div className="console-panel relative overflow-hidden rounded-[16px] bg-surface-1/60">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">{code}</span>
        <StatusFlip from={status[0]} to={status[1]} />
      </div>
      <div className="px-3 py-3">{children}</div>
    </div>
  );
}

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 460 300" className="h-auto w-full" aria-hidden>
    {children}
  </svg>
);

const node = (x: number, y: number, i: number, reduce: boolean, delay = 0) => (
  <motion.circle
    cx={x}
    cy={y}
    r="6.5"
    fill={ACCENT}
    initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={vp}
    transition={{ duration: 0.4, delay: 0.25 + i * 0.14 + delay, ease: editorialEase }}
    style={{ transformOrigin: `${x}px ${y}px` }}
  />
);

const label = (x: number, y: number, text: string, anchor: "start" | "middle" | "end" = "middle", fill = "rgba(204,210,220,0.6)") => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize="11" letterSpacing="0.3" fill={fill}>
    {text}
  </text>
);

// ---------- Motivos ----------

function Dictamen({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  return (
    <Frame>
      <motion.rect
        x="40" y="48" width="180" height="204" rx="10"
        fill="rgba(255,255,255,0.02)" stroke={LINE} strokeWidth="1.5"
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, ease: editorialEase }}
      />
      {l.items.slice(0, 3).map((it, i) => {
        const rowY = 92 + i * 50;
        return (
          <g key={it}>
            <circle cx="68" cy={rowY - 4} r="2.5" fill={ACCENT} />
            <text x="80" y={rowY} fontFamily={MONO} fontSize="12" fill="#cfd5dd">{it}</text>
            <motion.rect
              x="80" y={rowY + 10} width="116" height="6" rx="3" fill="rgba(204,210,220,0.16)"
              initial={{ scaleX: reduce ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={vp}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.14, ease: editorialEase }} style={{ transformOrigin: "left center", transformBox: "fill-box" }}
            />
          </g>
        );
      })}
      {!reduce && (
        <motion.line
          x1="40" x2="220" stroke={ACCENT} strokeWidth="1.5" strokeOpacity="0.5"
          initial={{ y1: 56, y2: 56, opacity: 0 }} whileInView={{ y1: [56, 244], y2: [56, 244], opacity: [0, 0.7, 0] }} viewport={vp}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
        />
      )}
      <line x1="220" y1="150" x2="300" y2="150" stroke={GUIDE} strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="350" cy="112" r="26" fill="rgba(0,230,160,0.1)" stroke={ACCENT} strokeWidth="1.3" />
      <g transform="translate(335,98)"><DrawCheck size={30} delay={0.9} /></g>
      {/* balanza */}
      <motion.g
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
        transition={{ duration: 0.6, delay: 1.1, ease: editorialEase }}
        stroke={ACCENT} strokeWidth="1.6" fill="none" strokeLinecap="round"
      >
        <path d="M350 170 V 226" />
        <path d="M322 188 H 378" />
        <path d="M322 188 q -7 16 -14 0 Z" />
        <path d="M378 188 q -7 16 -14 0 Z" />
        <path d="M338 226 H 362" />
      </motion.g>
      {label(350, 252, l.status[1], "middle", ACCENT)}
    </Frame>
  );
}

function Matrix({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const cols = 3;
  const cw = 128, ch = 96, gx = 10, gy = 10, x0 = 28, y0 = 44;
  return (
    <Frame>
      {l.items.slice(0, 6).map((it, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        const x = x0 + c * (cw + gx), y = y0 + r * (ch + gy);
        return (
          <g key={it}>
            <motion.rect
              x={x} y={y} width={cw} height={ch} rx="9" stroke={LINE} strokeWidth="1.4"
              initial={{ fill: reduce ? "rgba(0,230,160,0.08)" : "rgba(255,255,255,0.015)" }}
              whileInView={{ fill: reduce ? "rgba(0,230,160,0.08)" : ["rgba(255,255,255,0.015)", "rgba(0,230,160,0.08)"] }}
              viewport={vp} transition={{ duration: 0.5, delay: 0.2 + i * 0.13, ease: editorialEase }}
            />
            <g transform={`translate(${x + 14},${y + 16})`}><DrawCheck size={30} delay={0.35 + i * 0.13} /></g>
            <text x={x + 16} y={y + ch - 18} fontFamily={MONO} fontSize="12" fill="#dfe4ea">{it}</text>
          </g>
        );
      })}
    </Frame>
  );
}

function Classify({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const lanesY = [78, 150, 222];
  const parts = [
    { y: lanesY[0], delay: 0 }, { y: lanesY[1], delay: 0.5 }, { y: lanesY[2], delay: 1.0 },
    { y: lanesY[1], delay: 1.5 }, { y: lanesY[0], delay: 2.0 }, { y: lanesY[2], delay: 2.5 },
  ];
  return (
    <Frame>
      <circle cx="56" cy="150" r="9" fill={ACCENT} />
      {label(56, 182, l.status[0], "middle")}
      {lanesY.map((y, i) => (
        <g key={i}>
          <line x1="92" y1="150" x2="300" y2={y} stroke={GUIDE} strokeWidth="1.3" strokeDasharray="2 7" />
          <rect x="320" y={y - 26} width="118" height="52" rx="9" fill="rgba(255,255,255,0.02)" stroke={LINE} strokeWidth="1.4" />
          <text x="338" y={y + 5} fontFamily={MONO} fontSize="13" fill="#dfe4ea">{l.items[i]}</text>
          {node(320, y, i, reduce, 0.4)}
        </g>
      ))}
      {!reduce && parts.map((p, i) => (
        <motion.circle
          key={i} r="3.5" fill={ACCENT}
          initial={{ cx: 56, cy: 150, opacity: 0 }}
          animate={{ cx: [56, 320], cy: [150, p.y], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, delay: p.delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
      ))}
    </Frame>
  );
}

function Corridor({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const ax = 96, bx = 364, y = 140;
  const rings = (cx: number) =>
    !reduce && [0, 1, 2].map((i) => (
      <motion.circle
        key={i} cx={cx} cy={y} r="9" fill="none" stroke={ACCENT} strokeWidth="1.3"
        initial={{ scale: 0.4, opacity: 0.6 }} animate={{ scale: [0.4, 3.4], opacity: [0.6, 0] }}
        transition={{ duration: 2.6, delay: i * 0.85, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${y}px` }}
      />
    ));
  return (
    <Frame>
      <line x1={ax} y1={y} x2={bx} y2={y} stroke={GUIDE} strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
      {rings(ax)}
      {rings(bx)}
      <circle cx={ax} cy={y} r="8" fill={ACCENT} />
      <circle cx={bx} cy={y} r="8" fill={ACCENT} />
      {label(ax, y - 26, (l.a ?? "").toUpperCase(), "middle", "#dfe4ea")}
      {label(bx, y - 26, (l.b ?? "").toUpperCase(), "middle", "#dfe4ea")}
      {label(ax, y + 36, l.items[0], "middle")}
      {label(bx, y + 36, l.items[1], "middle")}
      {!reduce && (
        <motion.circle
          r="4.5" cy={y} fill="#7ff5cf"
          initial={{ cx: ax, opacity: 0 }} animate={{ cx: [ax, bx], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        />
      )}
      {label(230, 252, l.status[1], "middle", ACCENT)}
    </Frame>
  );
}

function Sync({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const ax = 86, bx = 374, y = 96;
  return (
    <Frame>
      <rect x={ax - 44} y={y - 26} width="88" height="52" rx="9" fill="rgba(255,255,255,0.02)" stroke={LINE} strokeWidth="1.4" />
      <rect x={bx - 44} y={y - 26} width="88" height="52" rx="9" fill="rgba(255,255,255,0.02)" stroke={LINE} strokeWidth="1.4" />
      <text x={ax} y={y + 5} textAnchor="middle" fontFamily={MONO} fontSize="13" fill="#dfe4ea">{l.a}</text>
      <text x={bx} y={y + 5} textAnchor="middle" fontFamily={MONO} fontSize="13" fill="#dfe4ea">{l.b}</text>
      <line x1={ax + 48} y1={y} x2={bx - 48} y2={y} stroke={GUIDE} strokeWidth="1.5" strokeDasharray="2 8" />
      {!reduce && [0, 1, 2].map((i) => (
        <motion.rect
          key={i} width="14" height="9" rx="2" y={y - 4.5} fill={ACCENT}
          initial={{ x: ax + 48, opacity: 0 }} animate={{ x: [ax + 48, bx - 62], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
      ))}
      {/* lista sincronizada */}
      {l.items.map((it, i) => (
        <g key={it}>
          <motion.g initial={{ opacity: reduce ? 1 : 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.4, delay: 0.5 + i * 0.18 }}>
            <rect x="120" y={158 + i * 34} width="220" height="26" rx="6" fill="rgba(255,255,255,0.015)" stroke={LINE} strokeWidth="1" />
            <text x="136" y={175 + i * 34} fontFamily={MONO} fontSize="12" fill="#cfd5dd">{it}</text>
            <g transform={`translate(308,${163 + i * 34})`}><DrawCheck size={30} delay={0.7 + i * 0.18} /></g>
          </motion.g>
        </g>
      ))}
    </Frame>
  );
}

function Ledger({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const heights = [150, 100, 130];
  const baseY = 222, bw = 70, gap = 40, x0 = 96;
  return (
    <Frame>
      <line x1="60" y1={baseY} x2="400" y2={baseY} stroke={LINE} strokeWidth="1.4" />
      {heights.map((h, i) => {
        const x = x0 + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={baseY - 160} width={bw} height="160" rx="6" fill="rgba(255,255,255,0.015)" />
            <motion.rect
              x={x} y={baseY - h} width={bw} height={h} rx="6" fill={ACCENT} fillOpacity="0.85"
              initial={{ scaleY: reduce ? 1 : 0 }} whileInView={{ scaleY: 1 }} viewport={vp}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.16, ease: editorialEase }}
              style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
            />
            <text x={x + bw / 2} y={baseY + 22} textAnchor="middle" fontFamily={MONO} fontSize="13" fill="#dfe4ea">{l.items[i]}</text>
          </g>
        );
      })}
      <g transform="translate(360,40)"><DrawCheck size={30} delay={1.0} /></g>
      {label(384, 56, l.status[1], "end", ACCENT)}
    </Frame>
  );
}

function Origin({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const cx = 320, cy = 150;
  const nodes = [{ x: 70, y: 70 }, { x: 70, y: 150 }, { x: 70, y: 230 }];
  return (
    <Frame>
      {nodes.map((n, i) => (
        <motion.path
          key={i} d={`M${n.x + 12} ${n.y} L ${cx - 40} ${cy}`} stroke={ACCENT} strokeWidth="1.4" strokeOpacity="0.55" fill="none"
          initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: editorialEase }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {node(n.x, n.y, i, reduce)}
          <text x={n.x + 16} y={n.y + 5} fontFamily={MONO} fontSize="13" fill="#dfe4ea">{l.items[i]}</text>
        </g>
      ))}
      <motion.rect
        x={cx - 40} y={cy - 40} width="80" height="80" rx="12" fill="rgba(0,230,160,0.08)" stroke={ACCENT} strokeWidth="1.4"
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={vp}
        transition={{ duration: 0.5, delay: 0.9, ease: editorialEase }} style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <g transform={`translate(${cx - 15},${cy - 15})`}><DrawCheck size={30} delay={1.2} /></g>
      {label(cx, cy + 64, l.status[1], "middle", ACCENT)}
    </Frame>
  );
}

function Pedimento({ l, reduce }: { l: InstrumentLabels; reduce: boolean }) {
  const y = 130, x0 = 50, x1 = 410;
  const n = l.items.length, last = n - 1;
  return (
    <Frame>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" />
      <motion.line
        x1={x0} y1={y} x2={x1} y2={y} stroke={ACCENT} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
        transition={{ duration: 1.4, delay: 0.3, ease: editorialEase }}
      />
      {l.items.map((it, i) => {
        const x = x0 + (i / last) * (x1 - x0);
        const isLast = i === last;
        return (
          <g key={it}>
            <motion.circle
              cx={x} cy={y} r={isLast ? 9 : 7} fill={ACCENT}
              initial={{ scale: reduce ? 1 : 0 }} whileInView={{ scale: 1 }} viewport={vp}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.22, ease: editorialEase }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            <text x={x} y={y - 24} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={ACCENT}>{String(i + 1).padStart(2, "0")}</text>
            <text
              x={x} y={y + 28} textAnchor="middle" fontFamily={MONO} fontSize="11"
              fill={isLast ? ACCENT : "rgba(204,210,220,0.6)"} fontWeight={isLast ? 600 : 400}
            >
              {it}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

const MOTIFS: Record<Motif, (p: { l: InstrumentLabels; reduce: boolean }) => React.ReactNode> = {
  dictamen: Dictamen,
  matrix: Matrix,
  classify: Classify,
  corridor: Corridor,
  sync: Sync,
  ledger: Ledger,
  origin: Origin,
  pedimento: Pedimento,
};

export function ServiceInstrument({ slug, lang }: { slug: string; lang: "es" | "en" }) {
  const reduce = useReducedMotion() ?? false;
  const entry = SERVICE_INSTRUMENTS[slug as (typeof SERVICE_SLUGS)[number]];
  if (!entry) return null;
  const l = entry[lang];
  const Motif = MOTIFS[entry.motif];
  return (
    <Panel code={entry.code} status={l.status}>
      <Motif l={l} reduce={reduce} />
    </Panel>
  );
}
