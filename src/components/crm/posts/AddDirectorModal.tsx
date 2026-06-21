"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { createDirectorProfile } from "@/app/admin/(panel)/posts/profiles-actions";
import { Modal } from "@/components/crm/Modal";

const labelCls = "mb-1 block text-[12.5px] font-medium text-[var(--crm-ink)]";

export function AddDirectorModal() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="crm-btn crm-btn-primary">
        <Plus className="size-[15px]" strokeWidth={2.1} />
        Nuevo director
      </button>

      <Modal open={open} onClose={close} title="Nuevo director" maxWidth={520}>
        <form
          action={(fd) =>
            startTransition(async () => {
              setError(null);
              const res = await createDirectorProfile(fd);
              if (res.error) setError(res.error);
              else close();
            })
          }
          className="space-y-3.5"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="d-name">Nombre</label>
              <input id="d-name" name="name" required autoFocus className="crm-input" placeholder="Nombre completo" />
            </div>
            <div>
              <label className={labelCls} htmlFor="d-title">Cargo</label>
              <input id="d-title" name="title" className="crm-input" placeholder="Co-CEO, COO, CIO…" />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="d-expertise">Especialización</label>
            <textarea id="d-expertise" name="expertise" rows={3} className="crm-textarea resize-y" placeholder="Áreas y temas que domina: aduanas, IVA fronterizo, IMMEX, logística…" />
          </div>
          <div>
            <label className={labelCls} htmlFor="d-voice">Voz</label>
            <textarea id="d-voice" name="voice" rows={3} className="crm-textarea resize-y" placeholder="Cómo escribe: directo y técnico, en primera persona, con ejemplos operativos…" />
          </div>
          <div>
            <label className={labelCls} htmlFor="d-avoid">Qué evitar</label>
            <textarea id="d-avoid" name="avoid" rows={2} className="crm-textarea resize-y" placeholder="Opcional: temas, tono o palabras que no quiere usar." />
          </div>

          {error && <p className="text-[12.5px] text-[var(--destructive)]">{error}</p>}
          <div className="flex items-center gap-2 pt-1">
            <button type="submit" disabled={pending} className="crm-btn crm-btn-primary flex-1">
              {pending ? "Creando…" : "Crear director"}
            </button>
            <button type="button" onClick={close} className="crm-btn crm-btn-secondary">Cancelar</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
