import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { getArticleById } from "@/lib/blog/data";
import { updateArticle, publishArticle, unpublishArticle, deleteArticle } from "@/app/admin/blog-actions";

export const dynamic = "force-dynamic";

const field = "crm-input";
const area = "crm-textarea";
const label = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--crm-ink-mute)]";

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
    <div className="mx-auto max-w-[860px] px-4 py-8 sm:px-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/blog" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--crm-wine)]">&larr; Noticias</Link>
        <div className="flex items-center gap-2">
          {isPublished && (
            <Link href={`/es/blog/${a.slug}`} target="_blank" className="crm-btn crm-btn-ghost crm-btn-sm">Ver publicada ↗</Link>
          )}
          <form action={isPublished ? unpublish : publish}>
            <button className="crm-btn crm-btn-secondary crm-btn-sm">{isPublished ? "Despublicar" : "Publicar"}</button>
          </form>
          <form action={remove}>
            <button className="crm-btn crm-btn-ghost crm-btn-sm text-[var(--crm-wine)]">Borrar</button>
          </form>
        </div>
      </div>

      <span className={`crm-badge ${isPublished ? "crm-badge-wine" : ""}`}>
        {isPublished ? "Publicada" : "Borrador"}
      </span>

      <form action={save} className="mt-5 flex flex-col gap-6">
        {/* Meta */}
        <div className="crm-card grid gap-4 p-6 sm:grid-cols-2">
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
          <label className="flex items-center gap-2 text-[13px] text-[var(--crm-ink-soft)] sm:col-span-2">
            <input type="checkbox" name="featured" defaultChecked={a.featured} className="size-4 accent-[var(--crm-wine)]" />
            Destacada
          </label>
        </div>

        {/* Español */}
        <div className="crm-card flex flex-col gap-4 p-6">
          <h2 className="font-serif text-lg text-[var(--crm-ink)]">Español</h2>
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

        {/* Inglés */}
        <div className="crm-card flex flex-col gap-4 p-6">
          <h2 className="font-serif text-lg text-[var(--crm-ink)]">English</h2>
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

        <div className="flex items-center gap-3">
          <button type="submit" className="crm-btn crm-btn-primary">Guardar</button>
          <span className="text-[12px] text-[var(--crm-ink-mute)]">Los cambios no se publican hasta que uses Publicar.</span>
        </div>
      </form>
    </div>
  );
}
