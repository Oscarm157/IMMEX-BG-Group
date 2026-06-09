import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageBlog } from "@/lib/crm-permissions";
import { draftArticle } from "@/app/admin/blog-actions";

export default async function NewArticle({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageBlog(me.role)) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-[760px] px-4 py-8 sm:px-7">
      <Link href="/admin/blog" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--crm-wine)]">&larr; Blog</Link>
      <h1 className="mt-4 font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">Nueva nota desde fuente</h1>
      <p className="mt-1 text-[13px] text-[var(--crm-ink-mute)]">
        Pega el texto fuente (noticia, boletín, cambio normativo). La IA redacta el borrador en español e inglés, con las recomendaciones de BG. Luego lo revisas antes de publicar.
      </p>

      {error === "draft" && (
        <p className="mt-4 rounded-lg border border-[var(--crm-wine)]/25 bg-[var(--crm-wine-tint)] px-3 py-2 text-[12.5px] text-[var(--crm-wine)]">
          No se pudo generar el borrador. Intenta de nuevo.
        </p>
      )}

      <form action={draftArticle} className="crm-card mt-6 flex flex-col gap-4 p-6">
        <div>
          <label htmlFor="source" className="mb-1.5 block text-[13px] font-medium text-[var(--crm-ink)]">Texto fuente</label>
          <textarea id="source" name="source" required rows={12} className="crm-textarea" placeholder="Pega aquí la nota o el boletín..." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sourceName" className="mb-1.5 block text-[13px] font-medium text-[var(--crm-ink)]">Fuente</label>
            <input id="sourceName" name="sourceName" className="crm-input" placeholder="Mundo Marítimo, El Financiero..." />
          </div>
          <div>
            <label htmlFor="category" className="mb-1.5 block text-[13px] font-medium text-[var(--crm-ink)]">Categoría</label>
            <input id="category" name="category" className="crm-input" placeholder="Aduanas, Fiscal, Logística..." />
          </div>
          <div>
            <label htmlFor="sourceUrl" className="mb-1.5 block text-[13px] font-medium text-[var(--crm-ink)]">URL de la fuente</label>
            <input id="sourceUrl" name="sourceUrl" type="url" className="crm-input" placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="sourceDate" className="mb-1.5 block text-[13px] font-medium text-[var(--crm-ink)]">Fecha de la fuente</label>
            <input id="sourceDate" name="sourceDate" className="crm-input" placeholder="08/12/2022" />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button type="submit" className="crm-btn crm-btn-primary">Generar borrador</button>
          <span className="text-[12px] text-[var(--crm-ink-mute)]">Tarda unos segundos.</span>
        </div>
      </form>
    </div>
  );
}
