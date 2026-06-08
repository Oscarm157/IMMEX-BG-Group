import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";

export type Article = typeof articles.$inferSelect;
export type Locale = "es" | "en";

export function localize(a: Article, locale: Locale) {
  const es = locale === "es";
  return {
    title: es ? a.titleEs : a.titleEn,
    excerpt: es ? a.excerptEs : a.excerptEn,
    body: es ? a.bodyEs : a.bodyEn,
    recommendations: es ? a.recommendationsEs : a.recommendationsEn,
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  return db.select().from(articles).where(eq(articles.status, "published")).orderBy(desc(articles.publishedAt));
}

export async function getPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.status, "published")));
  return rows[0] ?? null;
}

export async function getAllArticles(): Promise<Article[]> {
  return db.select().from(articles).orderBy(desc(articles.updatedAt));
}

export async function getArticleById(id: string): Promise<Article | null> {
  const rows = await db.select().from(articles).where(eq(articles.id, id));
  return rows[0] ?? null;
}
