"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Imagen full-bleed con parallax sutil al hacer scroll.
 * La imagen se renderiza más alta que el contenedor para que el translateY
 * no descubra bordes. Solo transform (perf). Respeta prefers-reduced-motion.
 */
export function ParallaxMedia({
  src,
  alt,
  className = "",
  distance = 48,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
      >
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
