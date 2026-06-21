"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users, KanbanSquare, ListFilter, UserRound, LayoutDashboard, Newspaper,
  Megaphone, Share2, LogOut,
} from "lucide-react";
import {
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

type Item = { href: string; label: string; icon: typeof Users };
type Group = { label: string; items: Item[] };

const roleLabels: Record<string, string> = { admin: "Admin", agent: "Agente", viewer: "Lector" };

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AppSidebar({
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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center px-1 py-1.5" aria-label="BG Consulting Group">
          {collapsed ? (
            <Image src="/bgg-mark.png" alt="BG Consulting Group" width={54} height={38} className="h-[38px] w-auto shrink-0" priority />
          ) : (
            <Image src="/bgg-logo-dark.png" alt="BG Consulting Group" width={170} height={54} className="h-[50px] w-auto" priority />
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive(pathname, href)} tooltip={label}>
                      <Link href={href}>
                        <Icon strokeWidth={1.9} />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="flex items-center gap-2 px-1 pb-1">
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[var(--crm-ink-soft)]">
              {user.name}
            </span>
            <Badge variant="secondary" className="bg-[var(--crm-wine-tint)] text-[var(--crm-wine)]">
              {roleLabels[user.role] ?? user.role}
            </Badge>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logoutAction} className="w-full">
              <SidebarMenuButton asChild tooltip="Salir">
                <button type="submit" aria-label="Salir">
                  <LogOut strokeWidth={1.9} />
                  <span>Salir</span>
                </button>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
