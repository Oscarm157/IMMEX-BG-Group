"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : null;
  const [display, setDisplay] = useState(reduce || target === null ? value : `${match![1]}0${match![3]}`);

  useEffect(() => {
    if (reduce || target === null || !inView) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${match![1]}${Math.round(v)}${match![3]}`),
    });
    return () => controls.stop();
  }, [inView, reduce, target, value, match]);

  return <span ref={ref}>{display}</span>;
}

export function StatStrip({
  items,
  tone = "dark",
}: {
  items: readonly { value: string; label: string }[];
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col gap-3">
          <span
            className={`font-display text-[clamp(3rem,6.5vw,5rem)] font-medium leading-none tracking-[-0.035em] tabular-nums ${light ? "text-ink" : "text-chalk"}`}
          >
            <CountUp value={s.value} />
          </span>
          <span className={`max-w-[18ch] text-[14px] leading-snug ${light ? "text-ink/55" : "text-smoke"}`}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
