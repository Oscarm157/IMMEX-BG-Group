import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "./db";
import {
  campusCategories,
  campusCategoryOrgs,
  campusTopics,
  campusBlocks,
  campusQuizzes,
  campusQuizQuestions,
  campusProgress,
  campusEnrollments,
  campusAssistantMessages,
  type CampusBlockData,
  type CampusBlockKind,
} from "./campus-schema";
import type { CurrentLearner } from "./campus-session";

export type TopicState = "done" | "in_progress" | "todo";

export type SidebarTopic = {
  slug: string;
  title: string;
  hasQuiz: boolean;
  state: TopicState;
};

export type CategoryProgress = { completed: number; total: number; pct: number };

export type Block = { id: string; kind: CampusBlockKind; data: CampusBlockData };

// ---- Acceso (audiencia + multi-tenant por org) ----

// Filtro de categorías visibles para el usuario. Empleado: audiencia
// empleado/ambos. Cliente: audiencia cliente/ambos Y categoría asignada a su org.
async function accessibleCategoryIds(user: CurrentLearner): Promise<Set<string>> {
  const cats = await db
    .select({ id: campusCategories.id, audience: campusCategories.audience })
    .from(campusCategories)
    .where(eq(campusCategories.status, "published"));

  if (user.audience === "empleado") {
    return new Set(cats.filter((c) => c.audience !== "cliente").map((c) => c.id));
  }
  // cliente: además exige vínculo con su org
  if (!user.orgId) return new Set();
  const links = await db
    .select({ categoryId: campusCategoryOrgs.categoryId })
    .from(campusCategoryOrgs)
    .where(eq(campusCategoryOrgs.orgId, user.orgId));
  const linked = new Set(links.map((l) => l.categoryId));
  return new Set(cats.filter((c) => c.audience !== "empleado" && linked.has(c.id)).map((c) => c.id));
}

export async function canAccessCategory(user: CurrentLearner, categoryId: string): Promise<boolean> {
  return (await accessibleCategoryIds(user)).has(categoryId);
}

// ---- Progreso ----

// Steps de una categoría = topics + quizzes. Devuelve el desglose por topic más
// los agregados, usando un solo set de progreso del usuario.
async function computeCategoryProgress(userId: string, categoryId: string) {
  const topics = await db
    .select({ id: campusTopics.id, slug: campusTopics.slug, title: campusTopics.title })
    .from(campusTopics)
    .where(and(eq(campusTopics.categoryId, categoryId), eq(campusTopics.status, "published")))
    .orderBy(asc(campusTopics.order), asc(campusTopics.createdAt));

  const topicIds = topics.map((t) => t.id);
  const quizzes = topicIds.length
    ? await db
        .select({ id: campusQuizzes.id, topicId: campusQuizzes.topicId })
        .from(campusQuizzes)
        .where(inArray(campusQuizzes.topicId, topicIds))
    : [];
  const quizByTopic = new Map(quizzes.map((q) => [q.topicId, q.id]));

  const progress = await db
    .select({ stepType: campusProgress.stepType, stepId: campusProgress.stepId })
    .from(campusProgress)
    .where(and(eq(campusProgress.userId, userId), eq(campusProgress.categoryId, categoryId)));
  const done = new Set(progress.map((p) => `${p.stepType}:${p.stepId}`));

  const total = topics.length + quizzes.length;
  const completed = topics.reduce((n, t) => {
    let c = 0;
    if (done.has(`topic:${t.id}`)) c++;
    const qid = quizByTopic.get(t.id);
    if (qid && done.has(`quiz:${qid}`)) c++;
    return n + c;
  }, 0);
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const perTopic = topics.map((t) => {
    const qid = quizByTopic.get(t.id);
    const topicDone = done.has(`topic:${t.id}`);
    const quizDone = qid ? done.has(`quiz:${qid}`) : true;
    const state: TopicState =
      topicDone && quizDone ? "done" : topicDone || (qid && quizDone) ? "in_progress" : "todo";
    return { ...t, hasQuiz: Boolean(qid), quizId: qid, topicDone, quizDone, state };
  });

  return { topics, perTopic, progress: { completed, total, pct } as CategoryProgress };
}

// ---- Vistas ----

export async function getCategoryView(user: CurrentLearner, slug: string) {
  const rows = await db.select().from(campusCategories).where(eq(campusCategories.slug, slug));
  const category = rows[0];
  if (!category || category.status !== "published") return null;
  if (!(await canAccessCategory(user, category.id))) return null;

  const { perTopic, progress } = await computeCategoryProgress(user.id, category.id);
  const sidebar: SidebarTopic[] = perTopic.map((t) => ({
    slug: t.slug,
    title: t.title,
    hasQuiz: t.hasQuiz,
    state: t.state,
  }));
  return { category, topics: sidebar, progress };
}

export async function getTopicView(
  user: CurrentLearner,
  categorySlug: string,
  topicSlug: string,
) {
  const catRows = await db
    .select()
    .from(campusCategories)
    .where(eq(campusCategories.slug, categorySlug));
  const category = catRows[0];
  if (!category || category.status !== "published") return null;
  if (!(await canAccessCategory(user, category.id))) return null;

  const { perTopic, progress } = await computeCategoryProgress(user.id, category.id);
  const idx = perTopic.findIndex((t) => t.slug === topicSlug);
  if (idx < 0) return null;
  const current = perTopic[idx];

  const blocks = await db
    .select({ id: campusBlocks.id, kind: campusBlocks.kind, data: campusBlocks.data })
    .from(campusBlocks)
    .where(eq(campusBlocks.topicId, current.id))
    .orderBy(asc(campusBlocks.order));

  // El asistente del video solo aparece si el topic tiene transcript con tiempos.
  const tRow = await db
    .select({ transcript: campusTopics.transcript, suggestions: campusTopics.suggestions })
    .from(campusTopics)
    .where(eq(campusTopics.id, current.id));
  const hasAssistant = !!tRow[0]?.transcript?.segments?.length;
  // Historial del chat del asistente (persistente) para no perderlo al recargar.
  const assistantHistory = hasAssistant
    ? (
        await db
          .select({ role: campusAssistantMessages.role, content: campusAssistantMessages.content })
          .from(campusAssistantMessages)
          .where(
            and(
              eq(campusAssistantMessages.userId, user.id),
              eq(campusAssistantMessages.topicId, current.id),
            ),
          )
          .orderBy(asc(campusAssistantMessages.createdAt))
          .limit(40)
      ).map((m) => ({ role: m.role, content: m.content }))
    : [];
  // Sugerencias del asistente: propias del video si existen, si no genéricas.
  const suggestions =
    tRow[0]?.suggestions?.length
      ? tRow[0].suggestions
      : [
          "Resúmeme el video en pocas líneas.",
          "¿Cuáles son los puntos clave?",
          "¿Qué debo recordar de este video?",
        ];

  let quiz = null as null | {
    id: string;
    title: string;
    passed: boolean;
    questions: { id: string; prompt: string; options: string[] }[];
  };
  if (current.quizId) {
    const qz = await db
      .select({ id: campusQuizzes.id, title: campusQuizzes.title })
      .from(campusQuizzes)
      .where(eq(campusQuizzes.id, current.quizId));
    const questions = await db
      .select({
        id: campusQuizQuestions.id,
        prompt: campusQuizQuestions.prompt,
        options: campusQuizQuestions.options,
      })
      .from(campusQuizQuestions)
      .where(eq(campusQuizQuestions.quizId, current.quizId))
      .orderBy(asc(campusQuizQuestions.order));
    if (qz[0]) quiz = { id: qz[0].id, title: qz[0].title, passed: current.quizDone, questions };
  }

  const sidebar: SidebarTopic[] = perTopic.map((t) => ({
    slug: t.slug,
    title: t.title,
    hasQuiz: t.hasQuiz,
    state: t.state,
  }));

  return {
    category,
    topic: {
      id: current.id,
      slug: current.slug,
      title: current.title,
      done: current.topicDone,
      hasAssistant,
      suggestions,
      assistantHistory,
    },
    blocks: blocks as Block[],
    quiz,
    progress,
    sidebar,
    neighbors: {
      prev: idx > 0 ? perTopic[idx - 1].slug : null,
      next: idx < perTopic.length - 1 ? perTopic[idx + 1].slug : null,
    },
  };
}

// Catálogo: categorías accesibles al usuario (audiencia + org), publicadas,
// cada una con su progreso. Ordenadas por el campo order.
export async function getCatalog(user: CurrentLearner) {
  const allowed = await accessibleCategoryIds(user);
  if (allowed.size === 0) return [];
  const cats = await db
    .select()
    .from(campusCategories)
    .where(eq(campusCategories.status, "published"))
    .orderBy(asc(campusCategories.order));
  const visible = cats.filter((c) => allowed.has(c.id));
  const out = [];
  for (const category of visible) {
    const { progress } = await computeCategoryProgress(user.id, category.id);
    out.push({ category, progress });
  }
  return out;
}

// Alta de inscripción al primer acceso (idempotente).
export async function ensureEnrollment(userId: string, categoryId: string) {
  await db
    .insert(campusEnrollments)
    .values({ userId, categoryId, status: "in_progress", startedAt: new Date(), lastActivityAt: new Date() })
    .onConflictDoNothing();
}
