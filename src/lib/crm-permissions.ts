import type { UserRole } from "./schema";

// Cualquier rol desconocido (datos viejos) se trata como "agent".
export function normalizeRole(role: string): UserRole {
  return role === "admin" || role === "viewer" || role === "client" ? role : "agent";
}

export function canViewAllLeads(role: UserRole): boolean {
  return role === "admin" || role === "viewer";
}

export function canEditAnyLead(role: UserRole): boolean {
  return role === "admin";
}

export function canEditLead(
  user: { id: string; role: UserRole },
  lead: { assignedTo: string | null }
): boolean {
  if (user.role === "admin") return true;
  if (user.role === "agent") return lead.assignedTo === user.id;
  return false;
}

export function canViewDashboard(role: UserRole): boolean {
  return role === "admin" || role === "viewer";
}

export function canManageUsers(role: UserRole): boolean {
  return role === "admin";
}

// Solo admin gestiona el blog.
export function canManageBlog(role: UserRole): boolean {
  return role === "admin";
}

// Solo admin usa el generador de posts (redes).
export function canManagePosts(role: UserRole): boolean {
  return role === "admin";
}

// Ads: el equipo gestiona; todos pueden ver (el cliente solo lo suyo, read-only).
export function canManageAds(role: UserRole): boolean {
  return role === "admin" || role === "agent";
}

export function canViewAds(role: UserRole): boolean {
  return role === "admin" || role === "agent" || role === "viewer" || role === "client";
}

// El rol "client" solo ve el módulo Ads de su propio cliente, en lectura.
export function isClient(role: UserRole): boolean {
  return role === "client";
}

export function isReadOnly(role: UserRole): boolean {
  return role === "viewer" || role === "client";
}
