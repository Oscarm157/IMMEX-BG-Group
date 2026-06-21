import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { getArticleById } from "@/lib/blog/data";
import { updateArticle, publishArticle, unpublishArticle, deleteArticle } from "@/app/admin/blog-actions";
import { PageHeader, SectionHeader } from "@/components/crm/PageShell";

export const dynamic = "force-dynamic";

const field = "crm-input";
const area = "crm-textarea";
const label = "mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink-soft)]";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageBlog(me.role)) redirect("/admin");

  const { id } = await params;
  const a = await getArticleById(id);
  if (!a) notFound();

  const save = updateArticle.bind(null, a.id);
  const publish = publishArticle.bind(null, a.id);
  const unpublish = unpublishArticle.bind(null, a.id);
  const remove = deleteArticle.bind(null, a.id);
  const isPublished = a.status === "published";

  return (
    <div className="crm-fade mx-auto max-w-[880px] px-4 py-8 sm:px-7">
      <Link
        href="/admin/blog"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-[var(--crm-ink-mute)] transition-colors hover:text-[var(--crm-ink)]"
      >
        <span aria-hidden>&larr;</span> Blog
      </Link>

      <PageHeader
        eyebrow="Contenido / Blog"
        title={a.titleEs || "Nota sin título"}
        actions={
          <>
            {isPublished && (
              <Link
                href={`/es/blog/${a.slug}`}
                target="_blank"
                className="crm-btn crm-btn-ghost crm-btn-sm"
              >
                Ver publicada <span aria-hidden>↗</span>
              </Link>
            )}
            <form action={isPublished ? unpublish : publish}>
              <button className="crm-btn crm-btn-secondary crm-btn-sm">
                {isPublished ? "Despublicar" : "Publicar"}
              </button>
            </form>
            <form action={remove}>
              <button className="crm-btn crm-btn-ghost crm-btn-sm text-[var(--destructive)] hover:bg-[rgba(240,80,63,0.1)] hover:text-[var(--destructive)]">
                Borrar
              </button>
            </form>
          </>
        }
      >
        <div className="mt-2.5">
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${
              isPublished
                ? "border-[var(--crm-accent-ring)] bg-[var(--crm-accent-tint)] text-[var(--crm-accent-strong)]"
                : "border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-mute)]"
            }`}
          >
            <span className={`size-1.5 rounded-full ${isPublished ? "bg-[var(--crm-accent)]" : "bg-[var(--crm-ink-faint)]"}`} />
            {isPublished ? "Publicada" : "Borrador"}
          </span>
        </div>
      </PageHeader>

      <form action={save} className="flex flex-col gap-5">
        {/* Meta */}
        <section className="crm-card p-6">
          <SectionHeader title="Meta" className="mb-5" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="slug">Slug</label>
              <input id="slug" name="slug" defaultValue={a.slug} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="category">Categoría</label>
              <input id="category" name="category" defaultValue={a.category ?? ""} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="sourceName">Fuente</label>
              <input id="sourceName" name="sourceName" defaultValue={a.sourceName ?? ""} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="sourceUrl">URL de la fuente</label>
              <input id="sourceUrl" name="sourceUrl" defaultValue={a.sourceUrl ?? ""} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="sourceDate">Fecha de la fuente</label>
              <input id="sourceDate" name="sourceDate" defaultValue={a.sourceDate ?? ""} className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="coverUrl">URL de portada (opcional)</label>
              <input id="coverUrl" name="coverUrl" defaultValue={a.coverUrl ?? ""} className={field} placeholder="Sin portada: se usa placeholder" />
            </div>
            <label className="flex items-center gap-2.5 rounded-[var(--crm-r-md)] border border-[var(--crm-line)] bg-[var(--crm-surface)] px-3 py-2.5 text-[13px] text-[var(--crm-ink-soft)] sm:col-span-2">
              <input type="checkbox" name="featured" defaultChecked={a.featured} className="size-4 accent-[var(--crm-accent)]" />
              Destacada en la portada del blog
            </label>
          </div>
        </section>

        {/* Español */}
        <section className="crm-card p-6">
          <SectionHeader title="Español" className="mb-5" />
          <div className="flex flex-col gap-4">
            <div>
              <label className={label} htmlFor="titleEs">Título</label>
              <input id="titleEs" name="titleEs" defaultValue={a.titleEs} required className={field} />
            </div>
            <div>
              <label className={label} htmlFor="excerptEs">Extracto</label>
              <input id="excerptEs" name="excerptEs" defaultValue={a.excerptEs ?? ""} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="bodyEs">Cuerpo (Markdown)</label>
              <textarea id="bodyEs" name="bodyEs" defaultValue={a.bodyEs ?? ""} rows={14} className={area} />
            </div>
            <div>
              <label className={label} htmlFor="recommendationsEs">Recomendaciones de BG (Markdown)</label>
              <textarea id="recommendationsEs" name="recommendationsEs" defaultValue={a.recommendationsEs ?? ""} rows={6} className={area} />
            </div>
          </div>
        </section>

        {/* English */}
        <section className="crm-card p-6">
          <SectionHeader title="English" className="mb-5" />
          <div className="flex flex-col gap-4">
            <div>
              <label className={label} htmlFor="titleEn">Title</label>
              <input id="titleEn" name="titleEn" defaultValue={a.titleEn} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="excerptEn">Excerpt</label>
              <input id="excerptEn" name="excerptEn" defaultValue={a.excerptEn ?? ""} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="bodyEn">Body (Markdown)</label>
              <textarea id="bodyEn" name="bodyEn" defaultValue={a.bodyEn ?? ""} rows={14} className={area} />
            </div>
            <div>
              <label className={label} htmlFor="recommendationsEn">BG recommendations (Markdown)</label>
              <textarea id="recommendationsEn" name="recommendationsEn" defaultValue={a.recommendationsEn ?? ""} rows={6} className={area} />
            </div>
          </div>
        </section>

        <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t border-[var(--crm-line)] bg-[var(--crm-bg)]/90 px-4 py-3.5 backdrop-blur sm:-mx-7 sm:px-7">
          <button type="submit" className="crm-btn crm-btn-primary">Guardar cambios</button>
          <span className="text-[12px] text-[var(--crm-ink-mute)]">Los cambios no se publican hasta que uses Publicar.</span>
        </div>
      </form>
    </div>
  );
}
