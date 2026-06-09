import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageAds } from "@/lib/crm-permissions";
import { getActiveClients } from "@/lib/ads-data";
import { createAd } from "@/app/admin/ads-actions";
import { AdForm } from "@/components/crm/ads/AdForm";

export const dynamic = "force-dynamic";

export default async function NewAd() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageAds(me.role)) redirect("/admin/ads");
  const clients = await getActiveClients();

  return (
    <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-7">
      <Link href="/admin/ads" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--crm-wine)]">&larr; Campañas</Link>
      <h1 className="mb-6 mt-4 font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">Nuevo anuncio</h1>
      <AdForm clients={clients} action={createAd} submitLabel="Crear anuncio" />
    </div>
  );
}
