"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/crm-session";
import { setLeadNotifyEmails } from "@/lib/settings";
import { setLeadRotationConfig, type RotationMode } from "@/lib/lead-rotation";
import { getEligibleAgents } from "@/lib/crm-data";
import { isValidEmail } from "@/lib/validate";

const ROTATION_MODES: RotationMode[] = ["off", "round_robin", "percentage"];

export async function updateLeadNotifyEmails(formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();
  const raw = String(formData.get("emails") ?? "");
  const emails = raw
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const invalid = emails.filter((e) => !isValidEmail(e));
  if (invalid.length > 0) {
    return { error: `Estos correos no son válidos: ${invalid.join(", ")}` };
  }

  await setLeadNotifyEmails(emails);
  revalidatePath("/admin/settings");
  return {};
}

export async function updateLeadRotationConfig(formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();
  const modeRaw = String(formData.get("mode") ?? "off");
  if (!ROTATION_MODES.includes(modeRaw as RotationMode)) return { error: "Modo inválido." };
  const mode = modeRaw as RotationMode;

  const weights: Record<string, number> = {};
  if (mode === "percentage") {
    // Solo cuentan pesos de agentes elegibles reales, no lo que el form diga que hay:
    // un id de otro usuario o inventado no debe poder inflar el "Total: 100%".
    const eligibleIds = new Set((await getEligibleAgents()).map((a) => a.id));
    let total = 0;
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith("weight:")) continue;
      const userId = key.slice("weight:".length);
      if (!eligibleIds.has(userId)) continue;
      const n = Number(value);
      if (!Number.isFinite(n) || n < 0) return { error: "Los porcentajes deben ser números positivos." };
      if (n > 0) weights[userId] = n;
      total += n;
    }
    if (total !== 100) return { error: `Los porcentajes deben sumar 100 (van ${total}).` };
  }

  await setLeadRotationConfig({ mode, weights });
  revalidatePath("/admin/settings");
  return {};
}
