import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { directorProfiles } from "@/lib/schema";

export type DirectorProfile = typeof directorProfiles.$inferSelect;

export async function getActiveDirectorProfiles(): Promise<DirectorProfile[]> {
  return db
    .select()
    .from(directorProfiles)
    .where(eq(directorProfiles.active, true))
    .orderBy(asc(directorProfiles.name));
}

// Para la gestión: incluye inactivos (para poder reactivarlos).
export async function getAllDirectorProfiles(): Promise<DirectorProfile[]> {
  return db.select().from(directorProfiles).orderBy(asc(directorProfiles.name));
}

export async function getDirectorProfile(id: string): Promise<DirectorProfile | null> {
  const rows = await db.select().from(directorProfiles).where(eq(directorProfiles.id, id));
  return rows[0] ?? null;
}
