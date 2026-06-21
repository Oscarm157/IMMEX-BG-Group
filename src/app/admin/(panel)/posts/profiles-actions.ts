"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { directorProfiles } from "@/lib/schema";
import { requireUser } from "@/lib/crm-session";
import { canManagePosts } from "@/lib/crm-permissions";

async function ensureCanManage() {
  const me = await requireUser();
  if (!canManagePosts(me.role)) throw new Error("forbidden");
  return me;
}

export async function createDirectorProfile(formData: FormData): Promise<{ error?: string }> {
  await ensureCanManage();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "El nombre es obligatorio." };
  await db.insert(directorProfiles).values({
    name,
    title: String(formData.get("title") ?? "").trim() || null,
    expertise: String(formData.get("expertise") ?? "").trim() || null,
    voice: String(formData.get("voice") ?? "").trim() || null,
    avoid: String(formData.get("avoid") ?? "").trim() || null,
    active: true,
  });
  revalidatePath("/admin/posts/directores");
  return {};
}

export async function updateDirectorProfile(id: string, formData: FormData): Promise<{ error?: string }> {
  await ensureCanManage();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "El nombre es obligatorio." };
  await db
    .update(directorProfiles)
    .set({
      name,
      title: String(formData.get("title") ?? "").trim() || null,
      expertise: String(formData.get("expertise") ?? "").trim() || null,
      voice: String(formData.get("voice") ?? "").trim() || null,
      avoid: String(formData.get("avoid") ?? "").trim() || null,
    })
    .where(eq(directorProfiles.id, id));
  revalidatePath("/admin/posts/directores");
  return {};
}

export async function setDirectorProfileActive(id: string, active: boolean) {
  await ensureCanManage();
  await db.update(directorProfiles).set({ active }).where(eq(directorProfiles.id, id));
  revalidatePath("/admin/posts/directores");
}
