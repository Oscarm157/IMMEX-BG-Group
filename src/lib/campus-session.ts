import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  campusUsers,
  type CampusAudience,
  type CampusRole,
} from "./campus-schema";
import { CAMPUS_COOKIE, verifySession } from "./campus-auth";

export type CurrentLearner = {
  id: string;
  name: string;
  email: string;
  audience: CampusAudience;
  role: CampusRole;
  orgId: string | null;
  mustSetPassword: boolean;
};

export async function getCurrentLearner(): Promise<CurrentLearner | null> {
  const jar = await cookies();
  const session = await verifySession(jar.get(CAMPUS_COOKIE)?.value);
  if (!session) return null;
  const rows = await db.select().from(campusUsers).where(eq(campusUsers.id, session.uid));
  const u = rows[0];
  if (!u || !u.active) return null;
  // Cookie invalidada por un reset de contraseña / desactivación posterior.
  if (session.ver !== u.sessionVersion) return null;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    audience: u.audience,
    role: u.role,
    orgId: u.orgId,
    mustSetPassword: u.mustSetPassword,
  };
}

// Guard base: exige sesión de campus. Redirige a login si no hay.
export async function requireLearner(): Promise<CurrentLearner> {
  const u = await getCurrentLearner();
  if (!u) redirect("/campus/login");
  if (u.mustSetPassword) redirect("/campus/fijar-password");
  return u;
}

// Guard de administración del campus (crear/editar contenido, usuarios, orgs).
export async function requireCampusAdmin(): Promise<CurrentLearner> {
  const u = await requireLearner();
  if (u.role !== "admin" && u.role !== "instructor") redirect("/campus");
  return u;
}
