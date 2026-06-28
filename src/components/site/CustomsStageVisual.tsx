"use client";

import { motion } from "motion/react";
import { editorialEase } from "@/lib/motion";
import { DrawCheck } from "@/components/site/ServiceInstrument";

/**
 * Visual por etapa del ciclo del pedimento. Reusa el lenguaje de
 * ServiceInstrument (mint #00e6a0, líneas frías, draw-on) y se anima al montar,
 * porque cambia con la etapa activa (no on-scroll). Respeta reduced-motion
 * mostrando el estado final. Lo consumen ServiceProcessFlow y, mapeado por
 * resultado, ServiceDiagnostic.
 */

const ACCENT = "#00e6a0";
const LINE = "#28303f";
const GUIDE = "rgba(204,210,220,0.14)";
const MONO = "var(--font-plex-mono), monospace";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden>
      {children}
    </svg>
  );
}

const txt = (
  x: number,
  y: number,
  s: string,
  anchor: "start" | "middle" | "end" = "middle",
  fill = "rgba(204,210,220,0.62)",
  size = 11,
) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize={size} letterSpacing="0.3" fill={fill}>
    {s}
  </text>
);

// 01 — Clasificación: la mercancía se rutea a la fracción correcta.
function Clasificacion({ reduce }: { reduce: boolean }) {
  const lanes = [70, 150, 230];
  const codes = ["8471.41.01", "8471.30.01", "8528.52.01"];
  const targetY = lanes[1];
  return (
    <Frame>
      <rect x="34" y={150 - 17} width="96" height="34" rx="8" fill="rgba(0,230,160,0.08)" stroke={ACCENT} strokeWidth="1.3" />
      {txt(82, 155, "Mercancía", "middle", "#eaf2ee", 12.5)}
      {lanes.map((y, i) => (
        <g key={codes[i]}>
          <path d={`M134 150 C 210 150, 240 ${y}, 300 ${y}`} fill="none" stroke={GUIDE} strokeWidth="1.3" strokeDasharray="2 7" />
          <rect x="296" y={y - 19} width="104" height="38" rx="8" fill={i === 1 ? "rgba(0,230,160,0.08)" : "rgba(255,255,255,0.015)"} stroke={i === 1 ? ACCENT : LINE} strokeWidth="1.3" />
          {txt(348, y + 4, codes[i], "middle", i === 1 ? "#eaf2ee" : "rgba(204,210,220,0.5)", 11)}
        </g>
      ))}
      {!reduce && (
        <motion.circle
          r="4.5" fill="#7ff5cf"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, delay: 0.3, ease: editorialEase }}
          style={{ offsetPath: `path("M134 150 C 210 150, 240 ${targetY}, 300 ${targetY}")` }}
        />
      )}
      {txt(82, 200, "FRACCIÓN", "middle", "rgba(204,210,220,0.45)", 9.5)}
    </Frame>
  );
}

// 02 — Valoración: valor base + incrementables apilando hacia el valor en aduana.
function Valoracion({ reduce }: { reduce: boolean }) {
  const rows = [
    { label: "Transacción", w: 150 },
    { label: "Fletes", w: 64 },
    { label: "Seguros", w: 40 },
    { label: "Regalías", w: 52 },
  ];
  const x0 = 150, y0 = 66, h = 22, gap = 16;
  return (
    <Frame>
      {rows.map((r, i) => {
        const y = y0 + i * (h + gap);
        return (
          <g key={r.label}>
            {txt(134, y + h - 6, r.label, "end", "rgba(204,210,220,0.6)", 11)}
            <rect x={x0} y={y} width="170" height={h} rx="4" fill="rgba(255,255,255,0.02)" />
            <motion.rect
              x={x0} y={y} width={r.w} height={h} rx="4" fill={ACCENT} fillOpacity={i === 0 ? 0.85 : 0.5}
              initial={{ scaleX: reduce ? 1 : 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: editorialEase }}
              style={{ transformOrigin: "left center", transformBox: "fill-box" }}
            />
          </g>
        );
      })}
      <line x1="150" y1="218" x2="320" y2="218" stroke={LINE} strokeWidth="1.3" />
      <motion.g initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
        {txt(134, 244, "Valor en aduana", "end", "#eaf2ee", 11.5)}
        <rect x="150" y="230" width="170" height="24" rx="5" fill="rgba(0,230,160,0.1)" stroke={ACCENT} strokeWidth="1.2" />
        {txt(235, 246, "= base gravable IGI", "middle", ACCENT, 11)}
      </motion.g>
    </Frame>
  );
}

// 03 — Pedimento: campos convergen al documento y pasan por selección automatizada.
function Pedimento({ reduce }: { reduce: boolean }) {
  const fields = ["Fracción", "Valor", "Origen", "Contrib."];
  const fy = [56, 110, 164, 218];
  const docX = 224, docY = 137;
  return (
    <Frame>
      {fy.map((y, i) => (
        <g key={fields[i]}>
          <motion.path
            d={`M118 ${y} C 170 ${y}, 180 ${docY}, ${docX - 4} ${docY}`} fill="none" stroke={ACCENT} strokeWidth="1.3" strokeOpacity="0.5"
            initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: editorialEase }}
          />
          <circle cx="44" cy={y} r="5" fill={ACCENT} />
          {txt(58, y + 4, fields[i], "start", "rgba(204,210,220,0.62)", 11)}
        </g>
      ))}
      <motion.rect
        x={docX} y={docY - 38} width="64" height="76" rx="7" fill="rgba(0,230,160,0.07)" stroke={ACCENT} strokeWidth="1.3"
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.7 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: editorialEase }} style={{ transformOrigin: `${docX + 32}px ${docY}px` }}
      />
      {[-18, -6, 6, 18].map((dy) => (
        <line key={dy} x1={docX + 12} y1={docY + dy} x2={docX + 52} y2={docY + dy} stroke={ACCENT} strokeWidth="1.1" strokeOpacity="0.45" />
      ))}
      <line x1={docX + 64} y1={docY} x2="334" y2={docY} stroke={GUIDE} strokeWidth="1.3" strokeDasharray="2 6" />
      <motion.circle
        cx="352" cy={docY} r="13" fill="rgba(0,230,160,0.1)" stroke={ACCENT} strokeWidth="1.3"
        initial={{ opacity: reduce ? 1 : 0 }} animate={reduce ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {txt(352, docY + 36, "SELECCIÓN", "middle", "rgba(204,210,220,0.5)", 9.5)}
    </Frame>
  );
}

// 04 — Cumplimiento: checklist de controles del régimen.
function Cumplimiento({ reduce }: { reduce: boolean }) {
  const items = ["Anexo 24 · inventarios", "Anexo 31 · validación", "Data Stage · retornos"];
  const y0 = 92, gap = 50;
  return (
    <Frame>
      {txt(54, 60, "CONTROL DEL RÉGIMEN", "start", "rgba(204,210,220,0.45)", 9.5)}
      {items.map((it, i) => {
        const y = y0 + i * gap;
        return (
          <motion.g key={it} initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease: editorialEase }}>
            <rect x="54" y={y - 22} width="312" height="40" rx="8" fill="rgba(255,255,255,0.015)" stroke={LINE} strokeWidth="1.2" />
            <g transform={`translate(70,${y - 13})`}><DrawCheck size={26} delay={0.5 + i * 0.2} /></g>
            {txt(112, y + 3, it, "start", "#dfe4ea", 12.5)}
          </motion.g>
        );
      })}
    </Frame>
  );
}

// 05 — Defensa: escalamiento desde la notificación.
function Defensa({ reduce }: { reduce: boolean }) {
  const sx = 70, sy = 150;
  const routes = [
    { y: 70, label: "Recurso" },
    { y: 150, label: "Juicio TFJA" },
    { y: 230, label: "Amparo" },
  ];
  return (
    <Frame>
      <circle cx={sx} cy={sy} r="8" fill={ACCENT} />
      {txt(sx, sy - 22, "NOTIFICACIÓN", "middle", "#dfe4ea", 10)}
      {txt(sx, sy + 30, "plazo corre", "middle", ACCENT, 10)}
      {routes.map((r, i) => (
        <g key={r.label}>
          <motion.path
            d={`M82 ${sy} C 150 ${sy}, 175 ${r.y}, 250 ${r.y}`} fill="none" stroke={i === 1 ? ACCENT : GUIDE} strokeWidth={i === 1 ? 1.6 : 1.3} strokeDasharray={i === 1 ? undefined : "2 7"}
            initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.16, ease: editorialEase }}
          />
          <rect x="250" y={r.y - 17} width="118" height="34" rx="8" fill={i === 1 ? "rgba(0,230,160,0.08)" : "rgba(255,255,255,0.015)"} stroke={i === 1 ? ACCENT : LINE} strokeWidth="1.3" />
          {txt(309, r.y + 4, r.label, "middle", i === 1 ? "#eaf2ee" : "rgba(204,210,220,0.55)", 11.5)}
        </g>
      ))}
    </Frame>
  );
}

const MOTIFS = [Clasificacion, Valoracion, Pedimento, Cumplimiento, Defensa];

export function CustomsStageVisual({ stage, reduce = false }: { stage: number; reduce?: boolean }) {
  const Motif = MOTIFS[stage] ?? MOTIFS[0];
  return <Motif reduce={reduce} />;
}
