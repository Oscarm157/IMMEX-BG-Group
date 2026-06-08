import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { getAllArticles } from "@/lib/blog/data";
import { fmtDate } from "@/lib/crm-format";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  draft: "Borrador",
  scheduled: "Programada",
  published: "Publicada",
};

export default async function AdminBlog() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageBlog(me.role)) redirect("/admin");

  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">Noticias</h1>
          <p className="mt-1 text-[13px] text-[var(--crm-ink-mute)]">Notas del blog público, asistidas por IA.</p>
        </div>
        <Link href="/admin/blog/new" className="crm-btn crm-btn-primary">Nueva nota</Link>
      </div>

      {articles.length === 0 ? (
        <div className="crm-empty px-6 py-20">
          <p className="text-[14px] text-[var(--crm-ink-soft)]">Aún no hay notas.</p>
          <Link href="/admin/blog/new" className="crm-btn crm-btn-secondary crm-btn-sm mt-4">Crear la primera</Link>
        </div>
      ) : (
        <div className="crm-card overflow-hidden">
          <table className="crm-table">
            <thead className="crm-thead">
              <tr>
                <th className="crm-th">Título</th>
                <th className="crm-th">Categoría</th>
                <th className="crm-th">Estado</th>
                <th className="crm-th">Actualizada</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="crm-row border-t border-[var(--crm-line)]">
                  <td className="crm-td">
                    <Link href={`/admin/blog/${a.id}`} className="font-medium text-[var(--crm-ink)] hover:text-[var(--crm-wine)]">
                      {a.titleEs}
                    </Link>
                  </td>
                  <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">{a.category ?? "—"}</td>
                  <td className="crm-td">
                    <span className={`crm-badge ${a.status === "published" ? "crm-badge-wine" : ""}`}>
                      {STATUS_LABEL[a.status] ?? a.status}
                    </span>
                  </td>
                  <td className="crm-td text-[13px] text-[var(--crm-ink-mute)]">{a.updatedAt ? fmtDate(a.updatedAt) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
