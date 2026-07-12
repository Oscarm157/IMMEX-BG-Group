"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity } from "./Activity";
import { CommentForm } from "./CommentForm";
import { Files } from "./Files";
import { fmtDateTime } from "@/lib/crm-format";
import type { ActionResult } from "@/lib/action-result";
import type { TranscriptMessage } from "@/lib/schema";

type Comment = { id: string; body: string; createdAt: Date | string | null; authorName: string | null };
type Event = { id: string; kind: string; detail: string; createdAt: Date | string | null; authorName: string | null };
type FileRow = { id: string; name: string; contentType: string | null; size: number | null };

function initials(name: string | null): string {
  if (!name) return "S";
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "S";
}

function Count({ n }: { n: number }) {
  if (!n) return null;
  return <span className="crm-num ml-1.5 text-[11px] text-[var(--crm-ink-mute)]">{n}</span>;
}

/**
 * Centro vivo del record: un solo workspace tabulado para Actividad, Notas y
 * Archivos, en vez de tres cards apiladas iguales. Reusa los componentes y
 * server actions existentes sin cambiar sus contratos.
 */
export function LeadFeed({
  events,
  comments,
  files,
  transcript,
  leadId,
  editable,
  addComment,
}: {
  events: Event[];
  comments: Comment[];
  files: FileRow[];
  transcript: TranscriptMessage[] | null;
  leadId: string;
  editable: boolean;
  addComment: (formData: FormData) => Promise<ActionResult>;
}) {
  const hasTranscript = Array.isArray(transcript) && transcript.length > 0;
  return (
    <Tabs defaultValue="activity" className="gap-0">
      <TabsList variant="line" className="h-auto w-full justify-start gap-5 rounded-none border-b border-[var(--crm-line)] px-0 pb-2.5">
        <TabsTrigger value="activity" className="flex-none px-0 text-[13.5px]">
          Actividad <Count n={events.length} />
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex-none px-0 text-[13.5px]">
          Notas <Count n={comments.length} />
        </TabsTrigger>
        <TabsTrigger value="files" className="flex-none px-0 text-[13.5px]">
          Archivos <Count n={files.length} />
        </TabsTrigger>
        {hasTranscript && (
          <TabsTrigger value="transcript" className="flex-none px-0 text-[13.5px]">
            Conversación <Count n={transcript!.length} />
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="activity" className="pt-5">
        <Activity events={events} />
      </TabsContent>

      <TabsContent value="notes" className="pt-5">
        {editable && <CommentForm action={addComment} />}
        {comments.length > 0 ? (
          <ul className={`crm-scroll max-h-[420px] space-y-3 overflow-y-auto pr-2.5 ${editable ? "mt-5" : ""}`}>
            {comments.map((c) => (
              <li key={c.id} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--crm-line)] bg-[var(--crm-surface-3)] text-[10px] font-semibold text-[var(--crm-ink-soft)]"
                >
                  {initials(c.authorName)}
                </span>
                <div className="min-w-0 flex-1 rounded-lg border border-[var(--crm-line)] bg-[var(--crm-surface)] px-3.5 py-2.5">
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="truncate text-[13px] font-medium text-[var(--crm-ink)]">
                      {c.authorName ?? "Sistema"}
                    </span>
                    <span className="crm-num shrink-0 text-[12px] text-[var(--crm-ink-mute)]">
                      {fmtDateTime(c.createdAt)}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[var(--crm-ink-soft)]">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !editable && <p className="text-[13.5px] text-[var(--crm-ink-mute)]">Aún no hay notas.</p>
        )}
      </TabsContent>

      <TabsContent value="files" className="pt-5">
        <Files leadId={leadId} editable={editable} files={files} />
      </TabsContent>

      {hasTranscript && (
        <TabsContent value="transcript" className="pt-5">
          <ul className="crm-scroll max-h-[460px] space-y-3 overflow-y-auto pr-2.5">
            {transcript!.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <li key={i} className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
                  <span className="crm-eyebrow text-[10px] text-[var(--crm-ink-mute)]">
                    {isUser ? "Visitante" : "Asistente"}
                  </span>
                  <div
                    className={`max-w-[86%] whitespace-pre-wrap rounded-lg border px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      isUser
                        ? "border-[var(--crm-accent-tint-2)] bg-[var(--crm-accent-tint)] text-[var(--crm-ink)]"
                        : "border-[var(--crm-line)] bg-[var(--crm-surface)] text-[var(--crm-ink-soft)]"
                    }`}
                  >
                    {m.content}
                  </div>
                </li>
              );
            })}
          </ul>
        </TabsContent>
      )}
    </Tabs>
  );
}
