"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ads, type AdPlatform, type AdStatus } from "@/lib/schema";
import { requireUser } from "@/lib/crm-session";
import { canManageAds } from "@/lib/crm-permissions";

const PLATFORMS: AdPlatform[] = ["meta", "google", "tiktok", "linkedin", "otro"];
const STATUSES: AdStatus[] = ["draft", "active", "paused", "ended"];

async function ensureAds() {
  const me = await requireUser();
  if (!canManageAds(me.role)) throw new Error("forbidden");
  return me;
}

const int = (v: FormDataEntryValue | null): number | null => {
  const d = String(v ?? "").replace(/[^\d]/g, "");
  return d === "" ? null : parseInt(d, 10);
};
const str = (v: FormDataEntryValue | null): string | null => {
  const t = String(v ?? "").trim();
  return t || null;
};

function adValues(f: FormData) {
  const platform = String(f.get("platform") ?? "meta") as AdPlatform;
  const status = String(f.get("status") ?? "draft") as AdStatus;
  return {
    name: String(f.get("name") ?? "").trim(),
    clientId: str(f.get("clientId")),
    platform: PLATFORMS.includes(platform) ? platform : "meta",
    status: STATUSES.includes(status) ? status : "draft",
    objective: str(f.get("objective")),
    budget: int(f.get("budget")),
    spend: int(f.get("spend")),
    startDate: str(f.get("startDate")),
    endDate: str(f.get("endDate")),
    impressions: int(f.get("impressions")),
    clicks: int(f.get("clicks")),
    creativeUrl: str(f.get("creativeUrl")),
    utmCampaign: str(f.get("utmCampaign")),
    notes: str(f.get("notes")),
  };
}

export async function createAd(formData: FormData) {
  await ensureAds();
  const v = adValues(formData);
  if (!v.name) redirect("/admin/ads/new?error=name");
  const rows = await db.insert(ads).values(v).returning({ id: ads.id });
  revalidatePath("/admin/ads");
  redirect(`/admin/ads/${rows[0].id}`);
}

export async function updateAd(id: string, formData: FormData) {
  await ensureAds();
  const v = adValues(formData);
  await db.update(ads).set({ ...v, updatedAt: new Date() }).where(eq(ads.id, id));
  revalidatePath("/admin/ads");
  revalidatePath(`/admin/ads/${id}`);
  redirect("/admin/ads");
}

export async function deleteAd(id: string) {
  await ensureAds();
  await db.delete(ads).where(eq(ads.id, id));
  revalidatePath("/admin/ads");
  redirect("/admin/ads");
}
