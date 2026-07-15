import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  boolean,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";

// ============================================================
// Campus BG — capacitación. Módulo autónomo, aparte del CRM:
// tablas propias (prefijo campus_), auth propia (campus_session /
// CAMPUS_SECRET). NO comparte users/permisos con el CRM de leads.
// Modelo plano: Categoría → Video (topic). Cada topic = bloques
// (título/intro/video/desglose/…) + un quiz de cierre. Progreso por
// usuario a nivel step (topic|quiz), agregado por categoría y global.
// ============================================================

export type CampusAudience = "cliente" | "empleado";
export type CampusCourseAudience = "cliente" | "empleado" | "ambos";
export type CampusRole = "learner" | "instructor" | "admin";
export type CampusStatus = "draft" | "published";
export type CampusBlockKind = "text" | "video" | "button" | "image";
export type CampusStepType = "topic" | "quiz";
export type CampusEnrollStatus = "not_started" | "in_progress" | "completed";
export type CampusInvitePurpose = "invite" | "magiclink";
export type CampusQuizSource = "manual" | "youtube_auto";

// Transcript con tiempos del video de un topic. Fuente de verdad del asistente:
// segments[{start(seg), text}]. Se llena al generar el video desde URL (Supadata).
export type CampusTranscript = { segments: { start: number; text: string }[]; lang: string };

// data del bloque según kind (validado en la app al leer/escribir).
export type CampusBlockData =
  | { markdown: string } // text
  | { provider: "youtube"; videoId: string; url: string } // video
  | { label: string; href: string } // button
  | { url: string; pathname: string; alt?: string; caption?: string }; // image

// Organización de cliente. Los empleados BG no llevan org (orgId null).
export const campusOrgs = pgTable("campus_orgs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Usuario del campus (cliente o empleado). passwordHash nullable hasta
// que canjea la invitación y fija su contraseña. sessionVersion invalida
// cookies viejas al resetear/desactivar (mismo patrón que el CRM).
export const campusUsers = pgTable("campus_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash"),
  audience: text("audience").$type<CampusAudience>().notNull(),
  orgId: uuid("org_id").references(() => campusOrgs.id, { onDelete: "set null" }),
  role: text("role").$type<CampusRole>().default("learner").notNull(),
  active: boolean("active").default(true).notNull(),
  mustSetPassword: boolean("must_set_password").default(true).notNull(),
  sessionVersion: integer("session_version").default(0).notNull(),
  lastActivityAt: timestamp("last_activity_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Tokens de un solo uso: invitación (fijar contraseña) y magic link (login).
// Se guarda el hash del token, nunca el token en claro.
export const campusInvites = pgTable("campus_invites", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => campusUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  purpose: text("purpose").$type<CampusInvitePurpose>().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Categoría browsable (ej. "Comercio exterior"). audience acota a
// cliente/empleado/ambos; las de cliente además se asignan a orgs.
export const campusCategories = pgTable("campus_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  coverPathname: text("cover_pathname"),
  audience: text("audience").$type<CampusCourseAudience>().default("ambos").notNull(),
  status: text("status").$type<CampusStatus>().default("draft").notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// M:N categoría ↔ org de cliente (qué org ve qué categoría de cliente).
export const campusCategoryOrgs = pgTable(
  "campus_category_orgs",
  {
    categoryId: uuid("category_id")
      .notNull()
      .references(() => campusCategories.id, { onDelete: "cascade" }),
    orgId: uuid("org_id")
      .notNull()
      .references(() => campusOrgs.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.orgId] })],
);

// Un topic = un video con su contenido. order nullable = orden manual /
// por fecha dentro de la categoría (lo define el admin).
export const campusTopics = pgTable(
  "campus_topics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => campusCategories.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    order: integer("order"),
    status: text("status").$type<CampusStatus>().default("draft").notNull(),
    transcript: jsonb("transcript").$type<CampusTranscript>(),
    // Preguntas sugeridas del asistente, específicas del video (generadas al crear
    // el topic). Si null, el asistente usa un fallback genérico.
    suggestions: jsonb("suggestions").$type<string[]>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.categoryId, t.slug)],
);

// Bloques de contenido del video, intercalables. data según kind.
export const campusBlocks = pgTable("campus_blocks", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => campusTopics.id, { onDelete: "cascade" }),
  kind: text("kind").$type<CampusBlockKind>().notNull(),
  order: integer("order").default(0).notNull(),
  data: jsonb("data").$type<CampusBlockData>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Un quiz cierra cada video (topic). source distingue manual vs autogenerado.
export const campusQuizzes = pgTable("campus_quizzes", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => campusTopics.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  passingScore: integer("passing_score").default(70).notNull(), // % para aprobar
  source: text("source").$type<CampusQuizSource>().default("manual").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Pregunta de opción múltiple. options = string[]; correctIndex apunta a una.
export const campusQuizQuestions = pgTable("campus_quiz_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => campusQuizzes.id, { onDelete: "cascade" }),
  prompt: text("prompt").notNull(),
  options: jsonb("options").$type<string[]>().notNull(),
  correctIndex: integer("correct_index").notNull(),
  order: integer("order").default(0).notNull(),
});

// Inscripción usuario ↔ categoría. Auto-alta al primer acceso.
export const campusEnrollments = pgTable(
  "campus_enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => campusUsers.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => campusCategories.id, { onDelete: "cascade" }),
    status: text("status").$type<CampusEnrollStatus>().default("not_started").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true }),
  },
  (t) => [unique().on(t.userId, t.categoryId)],
);

// Un registro = un step completado por el usuario. categoryId denormalizado
// para calcular % por categoría sin joins. stepId = topicId o quizId según stepType.
export const campusProgress = pgTable(
  "campus_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => campusUsers.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => campusCategories.id, { onDelete: "cascade" }),
    stepType: text("step_type").$type<CampusStepType>().notNull(),
    stepId: uuid("step_id").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.userId, t.stepType, t.stepId)],
);

// Uso del asistente IA (durable, para rate limit real entre instancias). Un
// registro por llamada; se cuenta por ventana (minuto/día) antes de permitir otra.
export const campusAiUsage = pgTable("campus_ai_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => campusUsers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Historial del chat del asistente por usuario + video (persistente, para que el
// repaso no se pierda al recargar). role = user | assistant.
export const campusAssistantMessages = pgTable("campus_assistant_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => campusUsers.id, { onDelete: "cascade" }),
  topicId: uuid("topic_id")
    .notNull()
    .references(() => campusTopics.id, { onDelete: "cascade" }),
  role: text("role").$type<"user" | "assistant">().notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Intento de quiz (histórico). answers = índices elegidos por pregunta.
export const campusQuizAttempts = pgTable("campus_quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => campusUsers.id, { onDelete: "cascade" }),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => campusQuizzes.id, { onDelete: "cascade" }),
  score: integer("score").notNull(), // correctas
  total: integer("total").notNull(), // total de preguntas
  passed: boolean("passed").notNull(),
  answers: jsonb("answers").$type<number[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
