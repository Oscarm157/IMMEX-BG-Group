import { getCurrentUser } from "@/lib/crm-session";
import { getLeads, getUsersBasic } from "@/lib/crm-data";
import { canViewAllLeads } from "@/lib/crm-permissions";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/crm-status";
import type { LeadStatus } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLUMNS = [
  "Nombre",
  "Correo",
  "Teléfono",
  "Estado",
  "Origen",
  "Responsable",
  "Servicio",
  "Empresa",
  "Sector",
  "Volumen mensual",
  "Valor estimado",
  "Campaña",
  "Recibido",
] as const;

function csvCell(v: unknown): string {
  let s = v == null ? "" : String(v);
  // Neutraliza inyección de fórmulas: los datos vienen de formularios públicos.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const me = await getCurrentUser();
  if (!me) return new Response("No autorizado", { status: 401 });

  const sp = new URL(req.url).searchParams;
  const status = STATUS_ORDER.includes(sp.get("status") as LeadStatus) ? (sp.get("status") as LeadStatus) : undefined;
  const sortRaw = sp.get("sort") ?? "recent";
  const sort = (["recent", "name", "status"].includes(sortRaw) ? sortRaw : "recent") as "recent" | "name" | "status";
  const canSeeAll = canViewAllLeads(me.role);

  const { rows } = await getLeads(
    { id: me.id, role: me.role },
    {
      search: sp.get("search")?.trim() || undefined,
      status,
      owner: sp.get("owner") || undefined,
      source: sp.get("source") || undefined,
      sort,
      unassigned: canSeeAll && sp.get("unassigned") === "1",
      page: 1,
      pageSize: 10000,
    }
  );

  const users = await getUsersBasic();
  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const SOURCE_LABEL: Record<string, string> = { bot: "Chatbot", form: "Formulario", manual: "Manual" };

  const lines = [COLUMNS.join(",")];
  for (const l of rows) {
    const q = l.qualification ?? {};
    lines.push(
      [
        l.name,
        l.email,
        l.phone,
        STATUS_LABELS[l.status] ?? l.status,
        SOURCE_LABEL[l.source] ?? l.source,
        l.assignedTo ? userMap.get(l.assignedTo) ?? "" : "",
        q.service ?? "",
        q.company ?? "",
        q.industry ?? "",
        q.monthlyVolume ?? "",
        l.valueAmount ?? "",
        l.utmCampaign ?? "",
        l.createdAt ? new Date(l.createdAt).toISOString() : "",
      ]
        .map(csvCell)
        .join(",")
    );
  }

  const csv = "﻿" + lines.join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-bg.csv"`,
    },
  });
}
