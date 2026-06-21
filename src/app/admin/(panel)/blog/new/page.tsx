import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { draftArticle } from "@/app/admin/blog-actions";
import { PageHeader, SectionHeader } from "@/components/crm/PageShell";
import { GenerateDraftButton } from "@/components/crm/blog/GenerateDraftButton";

export const dynamic = "force-dynamic";

const label = "mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink-soft)]";

export default async function NewArticle({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageBlog(me.role)) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="crm-fade mx-auto max-w-[960px] px-4 py-8 sm:px-7">
      <Link
        href="/admin/blog"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-[var(--crm-ink-mute)] transition-colors hover:text-[var(--crm-ink)]"
      >
        <span aria-hidden>&larr;</span> Blog
      </Link>

      <PageHeader
        eyebrow="Contenido / Blog"
        title="Nueva nota desde fuente"
        description="Pega el texto fuente (noticia, boletín, cambio normativo). La IA redacta el borrador en español e inglés, con las recomendaciones de BG. Luego lo revisas antes de publicar."
      />

      {error === "draft" && (
        <p className="mb-5 flex items-center gap-2 rounded-[var(--crm-r-md)] border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 px-3 py-2.5 text-[12.5px] text-[var(--destructive)]">
          <span aria-hidden>⚠</span>
          No se pudo generar el borrador. Intenta de nuevo.
        </p>
      )}

      <form action={draftArticle} className="crm-card flex flex-col gap-5 p-6">
        <SectionHeader title="Fuente" />
        <div>
          <label htmlFor="source" className={label}>Texto fuente</label>
          <textarea id="source" name="source" required rows={12} className="crm-textarea" placeholder="Pega aquí la nota o el boletín..." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sourceName" className={label}>Fuente</label>
            <input id="sourceName" name="sourceName" className="crm-input" placeholder="Mundo Marítimo, El Financiero..." />
          </div>
          <div>
            <label htmlFor="category" className={label}>Categoría</label>
            <input id="category" name="category" className="crm-input" placeholder="Aduanas, Fiscal, Logística..." />
          </div>
          <div>
            <label htmlFor="sourceUrl" className={label}>URL de la fuente</label>
            <input id="sourceUrl" name="sourceUrl" type="url" className="crm-input" placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="sourceDate" className={label}>Fecha de la fuente</label>
            <input id="sourceDate" name="sourceDate" className="crm-input crm-num" placeholder="08/12/2022" />
          </div>
        </div>
        <GenerateDraftButton />
      </form>
    </div>
  );
}
