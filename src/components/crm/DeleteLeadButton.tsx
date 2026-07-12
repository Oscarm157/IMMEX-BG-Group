"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteLead } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteLeadButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() => setOpen(true)}
        title="Eliminar lead"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--crm-line)] bg-[var(--crm-surface-2)] px-2.5 py-2 text-[13px] font-medium text-[var(--crm-ink-soft)] transition-colors hover:border-[var(--destructive)]/40 hover:text-[var(--destructive)] disabled:opacity-50"
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" strokeWidth={2} /> : <Trash2 className="size-3.5" strokeWidth={1.8} />}
        Eliminar
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => startTransition(() => deleteLead(id))}
        title="Eliminar lead"
        description="Esto borra de forma permanente el lead con sus notas, archivos y actividad. No se puede deshacer."
        confirmLabel="Eliminar lead"
        destructive
        pending={pending}
      />
    </>
  );
}
