"use client";

import { useState, useTransition } from "react";
import { Pencil, UserX, UserCheck, Loader2 } from "lucide-react";
import { updateDirectorProfile, setDirectorProfileActive } from "@/app/admin/(panel)/posts/profiles-actions";
import { Modal } from "@/components/crm/Modal";
import { Tooltip } from "@/components/crm/ui/Tooltip";

const labelCls = "mb-1 block text-[12.5px] font-medium text-[var(--crm-ink)]";

export type DirectorRow = {
  id: string;
  name: string;
  title: string | null;
  expertise: string | null;
  voice: string | null;
  avoid: string | null;
  active: boolean;
};

export function DirectorRowActions({ director }: { director: DirectorRow }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <div className="flex items-center justify-end gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100">
      <Tooltip content="Editar director">
        <button
          onClick={() => setOpen(true)}
          aria-label="Editar director"
          className="rounded-md p-1.5 text-[var(--crm-ink-mute)] transition-colors hover:bg-[var(--crm-accent-tint)] hover:text-[var(--crm-accent-strong)]"
        >
          <Pencil className="size-4" strokeWidth={1.7} />
        </button>
      </Tooltip>

      <Tooltip content={director.active ? "Desactivar" : "Reactivar"}>
        <button
          disabled={pending}
          onClick={() => startTransition(() => setDirectorProfileActive(director.id, !director.active))}
          aria-label={director.active ? "Desactivar" : "Reactivar"}
          className={`rounded-md p-1.5 transition-colors disabled:opacity-50 ${
            director.active
              ? "text-[var(--crm-ink-mute)] hover:bg-[var(--crm-surface-3)] hover:text-[var(--crm-ink)]"
              : "text-[var(--crm-accent-strong)] hover:bg-[var(--crm-accent-tint)]"
          }`}
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : director.active ? <UserX className="size-4" strokeWidth={1.7} /> : <UserCheck className="size-4" strokeWidth={1.7} />}
        </button>
      </Tooltip>

      <Modal open={open} onClose={close} title="Editar director" maxWidth={520}>
        <form
          action={(fd) =>
            startTransition(async () => {
              setError(null);
              const res = await updateDirectorProfile(director.id, fd);
              if (res.error) setError(res.error);
              else close();
            })
          }
          className="space-y-3.5"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="ed-name">Nombre</label>
              <input id="ed-name" name="name" required defaultValue={director.name} className="crm-input" placeholder="Nombre completo" />
            </div>
            <div>
              <label className={labelCls} htmlFor="ed-title">Cargo</label>
              <input id="ed-title" name="title" defaultValue={director.title ?? ""} className="crm-input" placeholder="Co-CEO, COO, CIO…" />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="ed-expertise">Especialización</label>
            <textarea id="ed-expertise" name="expertise" rows={3} defaultValue={director.expertise ?? ""} className="crm-textarea resize-y" placeholder="Áreas y temas que domina: aduanas, IVA fronterizo, IMMEX, logística…" />
          </div>
          <div>
            <label className={labelCls} htmlFor="ed-voice">Voz</label>
            <textarea id="ed-voice" name="voice" rows={3} defaultValue={director.voice ?? ""} className="crm-textarea resize-y" placeholder="Cómo escribe: directo y técnico, en primera persona, con ejemplos operativos…" />
          </div>
          <div>
            <label className={labelCls} htmlFor="ed-avoid">Qué evitar</label>
            <textarea id="ed-avoid" name="avoid" rows={2} defaultValue={director.avoid ?? ""} className="crm-textarea resize-y" placeholder="Opcional: temas, tono o palabras que no quiere usar." />
          </div>

          {error && <p className="text-[12.5px] text-[var(--destructive)]">{error}</p>}
          <div className="flex items-center gap-2 pt-1">
            <button type="submit" disabled={pending} className="crm-btn crm-btn-primary flex-1">
              {pending ? "Guardando…" : "Guardar cambios"}
            </button>
            <button type="button" onClick={close} className="crm-btn crm-btn-secondary">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
