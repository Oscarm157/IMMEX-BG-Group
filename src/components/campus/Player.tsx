"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { logout } from "@/app/campus/auth-actions";
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

function UserFooter({ name, audienceLabel }: { name: string; audienceLabel: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="border-t border-line px-4 py-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-3 font-mono text-[12px] text-accent">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-chalk">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ash">{audienceLabel}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Link
          href="/campus"
          className="flex-1 rounded-lg border border-line px-3 py-1.5 text-center text-[12.5px] text-bone transition-colors hover:border-accent/50 hover:text-chalk"
        >
          Inicio
        </Link>
        <form action={logout} className="flex-1">
          <button
            type="submit"
            className="w-full rounded-lg border border-line px-3 py-1.5 text-[12.5px] text-bone transition-colors hover:border-accent/50 hover:text-chalk"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export function Player({
  categoryTitle,
  categorySlug,
  topics,
  currentSlug,
  user,
  assistant,
  children,
}: {
  categoryTitle: string;
  categorySlug: string;
  topics: SidebarTopic[];
  currentSlug: string;
  user: { name: string; audienceLabel: string };
  assistant?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [railOpen, setRailOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      {railOpen ? (
        <aside className="hidden w-[308px] shrink-0 border-r border-line bg-surface-1 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="px-4 pb-4 pt-6">
              <Link href="/campus" className="mb-6 flex px-2">
                <Logo variant="bg" tone="light" size="lg" />
              </Link>
              <div className="flex items-center justify-between gap-2 px-2">
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
            </div>
            <div className="flex-1 overflow-y-auto crm-scroll px-4">
              <TopicList categorySlug={categorySlug} topics={topics} currentSlug={currentSlug} />
            </div>
            <UserFooter name={user.name} audienceLabel={user.audienceLabel} />
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setRailOpen(true)}
          aria-label="Mostrar contenido de la categoría"
          className="group hidden shrink-0 flex-col items-center gap-3 border-r border-line bg-surface-1 px-3 py-5 transition-colors hover:bg-surface-2 lg:flex"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-accent/50">
            ›
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash [writing-mode:vertical-rl]">
            Contenido
          </span>
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

      {/* Asistente del video (tercera región: inline en xl, overlay en pantallas menores) */}
      {assistant}

      {/* Drawer mobile */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col border-r border-line bg-surface-1">
            <div className="px-4 pb-3 pt-6">
              <div className="mb-3">
                <Logo variant="bg" tone="light" size="lg" />
              </div>
              <div className="flex items-center justify-between">
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
            </div>
            <div className="flex-1 overflow-y-auto crm-scroll px-4">
              <TopicList
                categorySlug={categorySlug}
                topics={topics}
                currentSlug={currentSlug}
                onNavigate={() => setDrawerOpen(false)}
              />
            </div>
            <UserFooter name={user.name} audienceLabel={user.audienceLabel} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
