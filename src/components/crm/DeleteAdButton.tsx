"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { deleteAd } from "@/app/admin/ads-actions";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteAdButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button type="button" disabled={pending} onClick={() => setOpen(true)} className="crm-btn crm-btn-ghost crm-btn-sm">
        {pending ? <Loader2 className="size-3.5 animate-spin" strokeWidth={2} /> : null}
        Borrar
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => startTransition(() => deleteAd(id))}
        title="Borrar campaña"
        description="Esto elimina la campaña de forma permanente. Los leads atribuidos se conservan. No se puede deshacer."
        confirmLabel="Borrar campaña"
        destructive
        pending={pending}
      />
    </>
  );
}
