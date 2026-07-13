import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageUsers, canViewDashboard, canManageBlog, canManagePosts, canViewAds } from "@/lib/crm-permissions";
import { logout } from "../actions";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { FlashToaster } from "@/components/crm/FlashToaster";
// Provider legacy para los tooltips de UserRowActions (se migra a shadcn en la 2ª tanda).
import { TooltipProvider } from "@/components/crm/ui/Tooltip";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (me.mustChangePassword) redirect("/admin/change-password");

  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider>
        <AppSidebar
          user={{ name: me.name, role: me.role }}
          showUsers={canManageUsers(me.role)}
          showDashboard={canViewDashboard(me.role)}
          showBlog={canManageBlog(me.role)}
          showPosts={canManagePosts(me.role)}
          showAds={canViewAds(me.role)}
          showFeedback={me.role === "admin"}
          showSettings={canManageUsers(me.role)}
          logoutAction={logout}
        />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-[var(--crm-line)] bg-[var(--crm-bg)]/80 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-1 h-5" />
            <span className="text-[13px] font-medium text-[var(--crm-ink-soft)]">BG · Panel</span>
          </header>
          <main className="mx-auto w-full max-w-[1380px] px-4 py-7 sm:px-7 sm:py-8">{children}</main>
        </SidebarInset>
        <Toaster position="bottom-right" />
        <Suspense fallback={null}>
          <FlashToaster />
        </Suspense>
      </SidebarProvider>
    </TooltipProvider>
  );
}
