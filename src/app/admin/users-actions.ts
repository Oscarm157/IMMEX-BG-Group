"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, type UserRole } from "@/lib/schema";
import { hashPassword } from "@/lib/crm-auth";
import { requireAdmin } from "@/lib/crm-session";

const ROLES: UserRole[] = ["admin", "agent", "viewer"];

const CHARS = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genTempPassword(len = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (const b of bytes) out += CHARS[b % CHARS.length];
  return `${out}#7`;
}

export async function createUser(
  formData: FormData
): Promise<{ tempPassword?: string; error?: string }> {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const roleRaw = String(formData.get("role") ?? "agent");
  const role: UserRole = ROLES.includes(roleRaw as UserRole) ? (roleRaw as UserRole) : "agent";
  if (!name || !email) return { error: "Nombre y correo son obligatorios." };

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existing.length > 0) return { error: "Ya existe un usuario con ese correo." };

  const provided = String(formData.get("password") ?? "").trim();
  const tempPassword = provided.length >= 8 ? provided : genTempPassword();
  try {
    await db.insert(users).values({
      name,
      email,
      role,
      passwordHash: await hashPassword(tempPassword),
      mustChangePassword: true,
    });
  } catch {
    return { error: "A user with that email already exists." };
  }
  revalidatePath("/admin/users");
  return { tempPassword };
}

export async function updateUser(
  userId: string,
  data: { name: string; email: string; role: UserRole }
): Promise<{ error?: string }> {
  const me = await requireAdmin();
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  if (!name || !email) return { error: "Nombre y correo son obligatorios." };
  if (!ROLES.includes(data.role)) return { error: "Rol inválido." };
  const role = data.role;

  if (userId === me.id && role !== "admin") {
    return { error: "No puedes quitarte tu propio rol de admin." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, email), ne(users.id, userId)));
  if (existing.length > 0) return { error: "Ya existe un usuario con ese correo." };

  await db.update(users).set({ name, email, role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return {};
}

export async function updateUserRole(userId: string, role: UserRole) {
  const me = await requireAdmin();
  if (!ROLES.includes(role)) return;
  if (userId === me.id && role !== "admin") return; // no quitarte tu propio admin
  await db.update(users).set({ role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
}

export async function setUserActive(userId: string, active: boolean) {
  const me = await requireAdmin();
  if (userId === me.id) return; // cannot deactivate yourself
  if (!active) {
    // No dejar al CRM sin ningún admin activo.
    const target = await db.select({ role: users.role }).from(users).where(eq(users.id, userId));
    if (target[0]?.role === "admin") {
      const otherActiveAdmins = await db
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.role, "admin"), eq(users.active, true), ne(users.id, userId)));
      if (otherActiveAdmins.length === 0) return;
    }
  }
  // Al desactivar, invalidar la sesión abierta del usuario.
  await db
    .update(users)
    .set(active ? { active } : { active, sessionVersion: sql`${users.sessionVersion} + 1` })
    .where(eq(users.id, userId));
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string): Promise<{ error?: string }> {
  const me = await requireAdmin();
  if (userId === me.id) return { error: "No puedes eliminar tu propia cuenta." };
  const target = await db.select({ role: users.role }).from(users).where(eq(users.id, userId));
  if (!target[0]) return {};
  if (target[0].role === "admin") {
    const otherAdmins = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.role, "admin"), ne(users.id, userId)));
    if (otherAdmins.length === 0) return { error: "No puedes eliminar al último administrador." };
  }
  // El historial (leads/comentarios/eventos) se conserva: las FK son ON DELETE SET NULL.
  await db.delete(users).where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return {};
}

export async function resetUserPassword(
  userId: string
): Promise<{ tempPassword: string }> {
  await requireAdmin();
  const tempPassword = genTempPassword();
  await db
    .update(users)
    .set({
      passwordHash: await hashPassword(tempPassword),
      mustChangePassword: true,
      // Invalida cualquier sesión abierta con la contraseña anterior.
      sessionVersion: sql`${users.sessionVersion} + 1`,
    })
    .where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return { tempPassword };
}
