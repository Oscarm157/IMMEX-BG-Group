"use client";

import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Upload, FileText, Image as ImageIcon, Download, Trash2, X, Eye } from "lucide-react";
import { toast } from "sonner";
import { uploadLeadFile, deleteLeadFile } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { fmtSize } from "@/lib/crm-format";

type LeadFile = {
  id: string;
  name: string;
  contentType: string | null;
  size: number | null;
};

const isImage = (t: string | null) => !!t && t.startsWith("image/");
const isPdf = (t: string | null) => t === "application/pdf";
const canPreview = (t: string | null) => isImage(t) || isPdf(t);
const fileHref = (id: string, dl = false) => `/admin/files/${id}${dl ? "?dl=1" : ""}`;

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="crm-btn crm-btn-primary"
    >
      <Upload className="size-3.5" strokeWidth={1.75} />
      {pending ? "Subiendo…" : "Subir archivo"}
    </button>
  );
}

export function Files({ leadId, files, editable = true }: { leadId: string; files: LeadFile[]; editable?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<LeadFile | null>(null);
  const [toDelete, setToDelete] = useState<LeadFile | null>(null);
  const [deleting, startTransition] = useTransition();

  return (
    <div>
      {editable && (
        <>
          <form
            ref={formRef}
            action={async (fd) => {
              const r = await uploadLeadFile(leadId, fd);
              if (r.ok) {
                formRef.current?.reset();
                toast.success("Archivo subido.");
              } else {
                toast.error(r.error);
              }
            }}
            className="flex items-center gap-2 rounded-[var(--crm-r-md)] border border-dashed border-[var(--crm-line-strong)] bg-[var(--crm-surface)] p-2.5"
          >
            <input
              type="file"
              name="file"
              required
              className="block w-full text-[13px] text-[var(--crm-ink-soft)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--crm-surface-3)] file:px-3 file:py-1.5 file:text-[12.5px] file:font-medium file:text-[var(--crm-ink)] hover:file:bg-[var(--crm-line)]"
            />
            <UploadButton />
          </form>
          <p className="mt-1.5 text-[13px] text-[var(--crm-ink-mute)]">Cualquier tipo de archivo, hasta 10MB.</p>
        </>
      )}

      {files.length === 0 && !editable && (
        <p className="text-[13.5px] text-[var(--crm-ink-mute)]">Aún no hay archivos.</p>
      )}

      {files.length > 0 && (
        <ul className={`${editable ? "mt-4" : ""} divide-y divide-[var(--crm-line)] overflow-hidden rounded-lg border border-[var(--crm-line)]`}>
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 bg-[var(--crm-surface)] px-3.5 py-2.5 transition-colors hover:bg-[var(--crm-surface-3)]">
              <span className="text-[var(--crm-ink-mute)]">
                {isImage(f.contentType) ? (
                  <ImageIcon className="size-4" strokeWidth={1.6} />
                ) : (
                  <FileText className="size-4" strokeWidth={1.6} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-[var(--crm-ink)]">{f.name}</p>
                {f.size != null && <p className="crm-num text-[12.5px] text-[var(--crm-ink-mute)]">{fmtSize(f.size)}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {canPreview(f.contentType) && (
                  <button
                    type="button"
                    onClick={() => setPreview(f)}
                    title="Vista previa"
                    className="rounded-md p-1.5 text-[var(--crm-ink-soft)] transition-colors hover:bg-[var(--crm-surface-2)] hover:text-[var(--crm-ink)]"
                  >
                    <Eye className="size-4" strokeWidth={1.7} />
                  </button>
                )}
                <a
                  href={fileHref(f.id, true)}
                  title="Descargar"
                  className="rounded-md p-1.5 text-[var(--crm-ink-soft)] transition-colors hover:bg-[var(--crm-surface-2)] hover:text-[var(--crm-ink)]"
                >
                  <Download className="size-4" strokeWidth={1.7} />
                </a>
                {editable && (
                  <button
                    type="button"
                    onClick={() => setToDelete(f)}
                    title="Eliminar"
                    className="rounded-md p-1.5 text-[var(--crm-ink-soft)] transition-colors hover:bg-[var(--crm-accent-tint)] hover:text-[var(--destructive)]"
                  >
                    <Trash2 className="size-4" strokeWidth={1.7} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,18,14,0.55)] p-4 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-[var(--crm-surface)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--crm-line)] px-4 py-2.5">
              <span className="truncate text-[13px] font-medium text-[var(--crm-ink)]">{preview.name}</span>
              <button type="button" onClick={() => setPreview(null)} className="rounded-md p-1 text-[var(--crm-ink-soft)] hover:text-[var(--crm-ink)]">
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-[var(--crm-surface-2)]">
              {isImage(preview.contentType) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fileHref(preview.id)} alt={preview.name} className="mx-auto block max-h-[80vh] w-auto" />
              ) : (
                <iframe src={fileHref(preview.id)} title={preview.name} className="h-[80vh] w-full" />
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          const f = toDelete;
          if (!f) return;
          startTransition(async () => {
            const r = await deleteLeadFile(f.id, leadId);
            if (r.ok) toast.success("Archivo eliminado.");
            else toast.error(r.error);
            setToDelete(null);
          });
        }}
        title="Eliminar archivo"
        description={toDelete ? `Se eliminará "${toDelete.name}" de forma permanente.` : undefined}
        confirmLabel="Eliminar"
        destructive
        pending={deleting}
      />
    </div>
  );
}
