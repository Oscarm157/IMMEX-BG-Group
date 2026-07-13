"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { updateLeadNotifyEmails } from "@/app/admin/settings-actions";

export function NotifyEmailsForm({ emails }: { emails: string[] }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(fd) =>
        startTransition(async () => {
          setSaved(false);
          setError(null);
          const res = await updateLeadNotifyEmails(fd);
          if (res.error) setError(res.error);
          else {
            setSaved(true);
            setTimeout(() => setSaved(false), 2200);
          }
        })
      }
      className="space-y-4"
    >
      <div>
        <label className="mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink)]" htmlFor="s-emails">
          Correos que reciben los leads
        </label>
        <textarea
          id="s-emails"
          name="emails"
          rows={4}
          defaultValue={emails.join("\n")}
          className="crm-textarea min-h-[110px] resize-y"
          placeholder="contacto@bgc.mx"
        />
        <p className="mt-1 text-[11.5px] text-[var(--crm-ink-mute)]">
          Un correo por línea, o separados por coma. Cada dirección recibe una notificación por cada lead nuevo.
          Si lo dejas vacío, cae al destinatario por defecto.
        </p>
      </div>

      {error && <p className="text-[12.5px] text-[var(--destructive)]">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={pending} className="crm-btn crm-btn-primary">
          {pending && <Loader2 className="size-3.5 animate-spin" />}
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1 text-[12.5px] text-[var(--crm-accent-strong)]"
            >
              <Check className="size-3.5" /> Guardado
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
