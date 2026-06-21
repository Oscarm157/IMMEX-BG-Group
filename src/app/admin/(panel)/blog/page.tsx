import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { getAllArticles } from "@/lib/blog/data";
import { fmtDate } from "@/lib/crm-format";
import { PageHeader } from "@/components/crm/PageShell";

export const dynamic = "force-dynamic";

const STATUS_META: Record<string, { label: string; cls: string; dot: string }> = {
  draft: {
    label: "Borrador",
    cls: "border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-mute)]",
    dot: "bg-[var(--crm-ink-faint)]",
  },
  scheduled: {
    label: "Programada",
    cls: "border-amber-400/25 bg-amber-400/12 text-amber-300",
    dot: "bg-amber-400",
  },
  published: {
    label: "Publicada",
    cls: "border-[var(--crm-accent-ring)] bg-[var(--crm-accent-tint)] text-[var(--crm-accent-strong)]",
    dot: "bg-[var(--crm-accent)]",
  },
};

function StatusPill({ status }: { status: string }) {
  const m = STATUS_META[status] ?? STATUS_META.draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${m.cls}`}
    >
      <span className={`size-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

export default async function AdminBlog() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageBlog(me.role)) redirect("/admin");

  const articles = await getAllArticles();
  const published = articles.filter((a) => a.status === "published").length;

  return (
    <div className="crm-fade mx-auto max-w-[1200px] px-4 py-8 sm:px-7">
      <PageHeader
        eyebrow="Contenido"
        title="Blog"
        description="Notas del blog público, redactadas con asistencia de IA y revisadas antes de publicar."
        actions={
          <Link href="/admin/blog/new" className="crm-btn crm-btn-primary">
            Nueva nota
          </Link>
        }
      />

      {articles.length === 0 ? (
        <div className="crm-empty px-6 py-20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="mb-4 size-9 text-[var(--crm-ink-faint)]"
            aria-hidden
          >
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V20l-2-1.4L12 20l-2-1.4L8 20l-2-1.4L4 20V5.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M7 8h6M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[14px] font-medium text-[var(--crm-ink)]">Aún no hay notas</p>
          <p className="mt-1 max-w-xs text-[13px] text-[var(--crm-ink-mute)]">
            Pega una fuente y la IA redacta el primer borrador en español e inglés.
          </p>
          <Link href="/admin/blog/new" className="crm-btn crm-btn-secondary crm-btn-sm mt-5">
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="crm-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--crm-line)] px-4 py-2.5">
            <span className="text-[12.5px] text-[var(--crm-ink-mute)]">
              <span className="crm-num font-medium text-[var(--crm-ink-soft)]">{articles.length}</span>{" "}
              {articles.length === 1 ? "nota" : "notas"}
            </span>
            <span className="text-[12.5px] text-[var(--crm-ink-mute)]">
              <span className="crm-num font-medium text-[var(--crm-accent-strong)]">{published}</span> publicadas
            </span>
          </div>
          <table className="crm-table">
            <thead className="crm-thead">
              <tr>
                <th className="crm-th">Título</th>
                <th className="crm-th">Categoría</th>
                <th className="crm-th">Estado</th>
                <th className="crm-th text-right">Actualizada</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="crm-row">
                  <td className="crm-td max-w-[420px]">
                    <Link
                      href={`/admin/blog/${a.id}`}
                      className="block truncate font-medium text-[var(--crm-ink)] transition-colors hover:text-[var(--crm-accent-strong)]"
                    >
                      {a.titleEs}
                    </Link>
                  </td>
                  <td className="crm-td">
                    {a.category ? (
                      <span className="crm-badge">{a.category}</span>
                    ) : (
                      <span className="text-[13px] text-[var(--crm-ink-faint)]">Sin categoría</span>
                    )}
                  </td>
                  <td className="crm-td">
                    <StatusPill status={a.status} />
                  </td>
                  <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-mute)]">
                    {a.updatedAt ? fmtDate(a.updatedAt) : "·"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
