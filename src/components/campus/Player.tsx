"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StatusIcon } from "./StatusIcon";
import type { SidebarTopic } from "@/lib/campus-data";

function TopicList({
  categorySlug,
  topics,
  currentSlug,
  onNavigate,
}: {
  categorySlug: string;
  topics: SidebarTopic[];
  currentSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {topics.map((t, i) => {
        const active = t.slug === currentSlug;
        return (
          <Link
            key={t.slug}
            href={`/campus/${categorySlug}/${t.slug}`}
            onClick={onNavigate}
            aria-current={active ? "true" : undefined}
            className={[
              "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
              active ? "bg-accent/10" : "hover:bg-surface-2",
            ].join(" ")}
          >
            <span className="mt-0.5">
              <StatusIcon state={t.state} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
                Video {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={[
                  "block text-[13.5px] leading-snug",
                  active ? "text-chalk" : "text-bone group-hover:text-chalk",
                ].join(" ")}
              >
                {t.title}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Player({
  categoryTitle,
  categorySlug,
  topics,
  currentSlug,
  children,
}: {
  categoryTitle: string;
  categorySlug: string;
  topics: SidebarTopic[];
  currentSlug: string;
  children: React.ReactNode;
}) {
  const [railOpen, setRailOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      {railOpen ? (
        <aside className="hidden w-[308px] shrink-0 border-r border-line bg-surface-1 lg:block">
          <div className="sticky top-0 max-h-screen overflow-y-auto crm-scroll px-4 py-6">
            <Link href="/campus" className="mb-6 flex px-2">
              <Logo variant="bg" tone="light" size="sm" />
            </Link>
            <div className="mb-5 flex items-center justify-between gap-2 px-2">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Categoría</p>
                <p className="truncate font-display text-[15px] font-semibold text-chalk">{categoryTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setRailOpen(false)}
                aria-label="Ocultar contenido"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-smoke hover:text-chalk"
              >
                «
              </button>
            </div>
            <TopicList categorySlug={categorySlug} topics={topics} currentSlug={currentSlug} />
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setRailOpen(true)}
          aria-label="Mostrar contenido"
          className="hidden shrink-0 border-r border-line bg-surface-1 px-2 py-6 text-smoke hover:text-chalk lg:block"
        >
          »
        </button>
      )}

      {/* Contenido */}
      <div className="min-w-0 flex-1">
        {/* Botón de contenido en mobile */}
        <div className="border-b border-line px-4 py-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[13px] text-bone"
          >
            ☰ Contenido
          </button>
        </div>
        {children}
      </div>

      {/* Drawer mobile */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[320px] overflow-y-auto border-r border-line bg-surface-1 px-4 py-6">
            <div className="mb-3 px-2">
              <Logo variant="bg" tone="light" size="sm" />
            </div>
            <div className="mb-5 flex items-center justify-between px-2">
              <p className="font-display text-[15px] font-semibold text-chalk">{categoryTitle}</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar"
                className="grid h-7 w-7 place-items-center rounded-md border border-line text-smoke"
              >
                ✕
              </button>
            </div>
            <TopicList
              categorySlug={categorySlug}
              topics={topics}
              currentSlug={currentSlug}
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
