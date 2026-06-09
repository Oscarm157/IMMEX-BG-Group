"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users, KanbanSquare, ListFilter, UserRound, LayoutDashboard, Newspaper,
  Megaphone, Share2, LogOut, Menu, X, ChevronDown,
} from "lucide-react";

type Item = { href: string; label: string; icon: typeof Users };
type Group = { label: string; items: Item[] };

const roleLabels: Record<string, string> = { admin: "Admin", agent: "Agente", viewer: "Lector" };

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function PanelNav({
  user, showUsers, showDashboard, showBlog, showPosts, showAds, logoutAction,
}: {
  user: { name: string; role: string };
  showUsers: boolean;
  showDashboard: boolean;
  showBlog: boolean;
  showPosts: boolean;
  showAds: boolean;
  logoutAction: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile
  const [menu, setMenu] = useState<string | null>(null); // desktop group

  useEffect(() => { setOpen(false); setMenu(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const comercial: Item[] = [];
  if (showDashboard) comercial.push({ href: "/admin/dashboard", label: "Resumen", icon: LayoutDashboard });
  comercial.push({ href: "/admin", label: "Leads", icon: ListFilter });
  comercial.push({ href: "/admin/board", label: "Pipeline", icon: KanbanSquare });
  if (showAds) comercial.push({ href: "/admin/ads", label: "Campañas", icon: Megaphone });

  const contenido: Item[] = [];
  if (showBlog) contenido.push({ href: "/admin/blog", label: "Blog", icon: Newspaper });
  if (showPosts) contenido.push({ href: "/admin/posts", label: "Generador de posts", icon: Share2 });

  const cuenta: Item[] = [];
  if (showUsers) cuenta.push({ href: "/admin/users", label: "Usuarios", icon: Users });
  cuenta.push({ href: "/admin/profile", label: "Perfil", icon: UserRound });

  const groups: Group[] = [
    { label: "Comercial", items: comercial },
    { label: "Contenido", items: contenido },
    { label: "Cuenta", items: cuenta },
  ].filter((g) => g.items.length > 0);

  const allItems = groups.flatMap((g) => g.items);
  const groupActive = (g: Group) => g.items.some((i) => isActive(pathname, i.href));

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--crm-line)] bg-[var(--crm-surface)]/90 backdrop-blur-md" onMouseLeave={() => setMenu(null)}>
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-7">
        <div className="flex items-center gap-1.5">
          <Link href="/admin" className="mr-2 flex items-baseline gap-2 sm:mr-3">
            <span className="font-serif text-[18px] leading-none tracking-tight text-[var(--crm-ink)]">BG Consulting Group</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--crm-wine)] sm:inline">Panel</span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {groups.map((g) => (
              <div key={g.label} className="relative" onMouseEnter={() => setMenu(g.label)}>
                <button className="crm-nav-link" data-active={groupActive(g)} onClick={() => setMenu(menu === g.label ? null : g.label)}>
                  {g.label}
                  <ChevronDown className={`size-3 transition-transform ${menu === g.label ? "rotate-180" : ""}`} strokeWidth={2} />
                </button>
                {menu === g.label && (
                  <div className="absolute left-0 top-full min-w-[200px] rounded-xl border border-[var(--crm-line)] bg-[var(--crm-surface)] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
                    {g.items.map(({ href, label, icon: Icon }) => (
                      <Link key={href} href={href} className="crm-nav-link !w-full !justify-start" data-active={isActive(pathname, href)}>
                        <Icon className="size-[15px]" strokeWidth={1.9} /> {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="max-w-[160px] truncate text-[13px] font-medium text-[var(--crm-ink-soft)]">{user.name}</span>
            <span className="crm-badge crm-badge-wine">{roleLabels[user.role] ?? user.role}</span>
          </div>
          <form action={logoutAction} className="hidden md:block">
            <button type="submit" className="crm-btn crm-btn-ghost crm-btn-sm" aria-label="Salir">
              <LogOut className="size-[15px]" strokeWidth={1.9} /> Salir
            </button>
          </form>
          <button type="button" onClick={() => setOpen((v) => !v)} className="crm-btn crm-btn-ghost crm-btn-sm !px-2 md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            {open ? <X className="size-[18px]" strokeWidth={1.9} /> : <Menu className="size-[18px]" strokeWidth={1.9} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="crm-fade border-t border-[var(--crm-line)] bg-[var(--crm-surface)] shadow-[0_18px_40px_rgba(0,0,0,0.4)] md:hidden">
          <div className="mx-auto max-w-[1200px] px-4 pb-4 pt-3 sm:px-7">
            <div className="mb-2.5 flex items-center gap-2 px-1">
              <span className="truncate text-[13px] font-medium text-[var(--crm-ink-soft)]">{user.name}</span>
              <span className="crm-badge crm-badge-wine">{roleLabels[user.role] ?? user.role}</span>
            </div>
            <nav className="flex flex-col gap-1">
              {allItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="crm-nav-link !h-11 !w-full !justify-start !text-[14px]" data-active={isActive(pathname, href)}>
                  <Icon className="size-[17px]" strokeWidth={1.9} /> {label}
                </Link>
              ))}
            </nav>
            <form action={logoutAction} className="mt-2.5 border-t border-[var(--crm-line)] pt-2.5">
              <button type="submit" className="crm-btn crm-btn-ghost crm-btn-sm !h-11 !w-full !justify-start !text-[14px]">
                <LogOut className="size-[17px]" strokeWidth={1.9} /> Salir
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
