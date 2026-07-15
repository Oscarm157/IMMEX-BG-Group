"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  campusTopics,
  campusQuizzes,
  campusQuizQuestions,
  campusProgress,
  campusEnrollments,
  campusQuizAttempts,
} from "@/lib/campus-schema";
import { requireLearner } from "@/lib/campus-session";
import { canAccessCategory, ensureEnrollment } from "@/lib/campus-data";

// Recalcula el estado de la inscripción; marca "completed" si todos los steps
// (topics + quizzes) de la categoría están en campus_progress.
async function refreshEnrollment(userId: string, categoryId: string) {
  const topics = await db
    .select({ id: campusTopics.id })
    .from(campusTopics)
    .where(and(eq(campusTopics.categoryId, categoryId), eq(campusTopics.status, "published")));
  const topicIds = topics.map((t) => t.id);
  const quizzes = topicIds.length
    ? await db.select({ id: campusQuizzes.id }).from(campusQuizzes).where(inArray(campusQuizzes.topicId, topicIds))
    : [];
  const total = topics.length + quizzes.length;
  const done = await db
    .select({ id: campusProgress.id })
    .from(campusProgress)
    .where(and(eq(campusProgress.userId, userId), eq(campusProgress.categoryId, categoryId)));
  const now = new Date();
  await db
    .update(campusEnrollments)
    .set({
      status: total > 0 && done.length >= total ? "completed" : "in_progress",
      completedAt: total > 0 && done.length >= total ? now : null,
      lastActivityAt: now,
    })
    .where(and(eq(campusEnrollments.userId, userId), eq(campusEnrollments.categoryId, categoryId)));
}

export async function markTopicComplete(topicId: string, categorySlug: string, topicSlug: string) {
  const me = await requireLearner();
  const rows = await db
    .select({ id: campusTopics.id, categoryId: campusTopics.categoryId })
    .from(campusTopics)
    .where(eq(campusTopics.id, topicId));
  const topic = rows[0];
  if (!topic || !(await canAccessCategory(me, topic.categoryId))) return;

  await ensureEnrollment(me.id, topic.categoryId);
  await db
    .insert(campusProgress)
    .values({ userId: me.id, categoryId: topic.categoryId, stepType: "topic", stepId: topic.id })
    .onConflictDoNothing();
  await refreshEnrollment(me.id, topic.categoryId);

  revalidatePath(`/campus/${categorySlug}/${topicSlug}`);
  revalidatePath(`/campus/${categorySlug}`);
}

export type QuizResult = { ok: true; score: number; total: number; passed: boolean; correct: number[] };

export async function submitQuiz(
  quizId: string,
  answers: number[],
  categorySlug: string,
  topicSlug: string,
): Promise<QuizResult | { ok: false }> {
  const me = await requireLearner();
  const qzRows = await db
    .select({ id: campusQuizzes.id, topicId: campusQuizzes.topicId, passingScore: campusQuizzes.passingScore })
    .from(campusQuizzes)
    .where(eq(campusQuizzes.id, quizId));
  const quiz = qzRows[0];
  if (!quiz) return { ok: false };
  const topic = (
    await db.select({ categoryId: campusTopics.categoryId }).from(campusTopics).where(eq(campusTopics.id, quiz.topicId))
  )[0];
  if (!topic || !(await canAccessCategory(me, topic.categoryId))) return { ok: false };

  const questions = await db
    .select({ id: campusQuizQuestions.id, correctIndex: campusQuizQuestions.correctIndex })
    .from(campusQuizQuestions)
    .where(eq(campusQuizQuestions.quizId, quizId))
    .orderBy(campusQuizQuestions.order);

  const correct = questions.map((q) => q.correctIndex);
  const score = questions.reduce((n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const total = questions.length;
  const passed = total > 0 && Math.round((score / total) * 100) >= quiz.passingScore;

  await db.insert(campusQuizAttempts).values({
    userId: me.id,
    quizId,
    score,
    total,
    passed,
    answers,
  });

  if (passed) {
    await ensureEnrollment(me.id, topic.categoryId);
    await db
      .insert(campusProgress)
      .values({ userId: me.id, categoryId: topic.categoryId, stepType: "quiz", stepId: quizId })
      .onConflictDoNothing();
    await refreshEnrollment(me.id, topic.categoryId);
    revalidatePath(`/campus/${categorySlug}/${topicSlug}`);
    revalidatePath(`/campus/${categorySlug}`);
  }

  return { ok: true, score, total, passed, correct };
}
