"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface DeckProps {
  children: React.ReactNode[];
  storageKey?: string;
}

export function Deck({ children, storageKey = "bg-presentacion-junio" }: DeckProps) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const total = children.length;

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) setCurrent(parseInt(saved, 10));
    setMounted(true);
  }, [storageKey]);

  const goTo = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (isAnimating) return;
      if (index < 0 || index >= total) return;
      void dir;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [total, isAnimating]
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (mounted) sessionStorage.setItem(storageKey, String(current));
  }, [current, mounted, storageKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(total - 1); }
      if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, toggleFullscreen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    Array.from(container.children).forEach((slideWrapper) => {
      const scrollable = slideWrapper.firstElementChild;
      if (scrollable) scrollable.scrollTop = 0;
    });
  }, [current]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null || touchStartY.current === null) return;
      const diffX = touchStart.current - e.changedTouches[0].clientX;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY) * 2) {
        if (diffX > 0) next(); else prev();
      }
      touchStart.current = null;
      touchStartY.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-x-hidden bg-ink">
      {children.map((child, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === current
              ? "pointer-events-auto translate-x-0 opacity-100"
              : i < current
              ? "pointer-events-none -translate-x-full opacity-0"
              : "pointer-events-none translate-x-full opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          {child}
        </div>
      ))}

      {/* Branding + Inicio */}
      <div
        className="absolute left-0 top-0 z-50 flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          BG · Renovación digital
        </span>
        {current > 0 && (
          <button
            onClick={() => goTo(0, "prev")}
            className="flex items-center gap-1 text-xs text-smoke transition-colors hover:text-chalk"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>home</span>
            <span className="hidden sm:inline">Inicio</span>
          </button>
        )}
      </div>

      {/* Controles */}
      <div
        className="absolute right-0 top-0 z-50 flex items-center gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <span className="font-mono text-xs tabular-nums text-smoke">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-smoke transition-all hover:bg-surface-2 hover:text-chalk disabled:cursor-not-allowed disabled:opacity-20"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span>
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-smoke transition-all hover:bg-surface-2 hover:text-chalk disabled:cursor-not-allowed disabled:opacity-20"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
          </button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-smoke transition-all hover:bg-surface-2 hover:text-chalk sm:flex"
          title="Pantalla completa (F)"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            {isFullscreen ? "fullscreen_exit" : "fullscreen"}
          </span>
          <span className="hidden text-xs font-medium sm:inline">{isFullscreen ? "Salir" : "Pantalla"}</span>
        </button>
      </div>

      {/* Barra de progreso */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 px-6 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="h-0.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
