import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds } from "@/lib/crm-permissions";
import { createAd } from "@/app/admin/ads-actions";
import { AdForm } from "@/components/crm/ads/AdForm";
import { PageHeader } from "@/components/crm/PageShell";

export const dynamic = "force-dynamic";

export default async function NewAd() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageAds(me.role)) redirect("/admin/ads");

  return (
    <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-7">
      <Link
        href="/admin/ads"
        className="mb-4 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--crm-ink-mute)] transition-colors hover:text-[var(--crm-ink)]"
      >
        <span aria-hidden>&larr;</span> Campañas
      </Link>
      <PageHeader eyebrow="Marketing" title="Nueva campaña" description="Registra una campaña para dar seguimiento a su presupuesto y atribución de leads." />
      <AdForm action={createAd} submitLabel="Crear campaña" />
    </div>
  );
}
