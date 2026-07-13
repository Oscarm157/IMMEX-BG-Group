import { pgTable, uuid, text, timestamp, jsonb, integer, boolean, date } from "drizzle-orm/pg-core";

export type LeadQualification = {
  service?: string;
  company?: string;
  industry?: string;
  monthlyVolume?: string;
  paymentTerms?: string;
  timeInBusiness?: string;
  urgency?: string;
};

export type TranscriptMessage = { role: string; content: string };

export type LeadSource = "bot" | "form" | "manual";

export type UserRole = "admin" | "agent" | "viewer";

export type AdPlatform = "meta" | "google" | "tiktok" | "linkedin" | "otro";
export type AdStatus = "draft" | "active" | "paused" | "ended";

export type LeadStatus =
  | "new"
  | "contacted"
  | "following_up"
  | "proposal"
  | "won"
  | "lost";

export type ArticleStatus = "draft" | "scheduled" | "published";

// Cuentas de cliente (para la vista read-only del módulo Ads).
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").$type<UserRole>().default("agent").notNull(),
  active: boolean("active").default(true).notNull(),
  mustChangePassword: boolean("must_change_password").default(true).notNull(),
  // Se incrementa al resetear la contraseña o desactivar: invalida las cookies viejas.
  sessionVersion: integer("session_version").default(0).notNull(),
  // Solo para usuarios con rol "client": acota su vista a este cliente.
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Configuración del CRM: pares clave/valor (destinatarios de notificación, rotación de leads).
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").default("").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Anuncios / campañas (captura manual v1).
export const ads = pgTable("ads", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  platform: text("platform").$type<AdPlatform>().default("meta").notNull(),
  status: text("status").$type<AdStatus>().default("draft").notNull(),
  objective: text("objective"),
  budget: integer("budget"),
  spend: integer("spend"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  impressions: integer("impressions"),
  clicks: integer("clicks"),
  creativeUrl: text("creative_url"),
  creativePathname: text("creative_pathname"),
  // Código para atribución automática: si un lead trae utm_campaign igual, se enlaza.
  utmCampaign: text("utm_campaign"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  locale: text("locale").default("es"),
  sourceUrl: text("source_url"),
  qualification: jsonb("qualification").$type<LeadQualification>(),
  // Full chat transcript, stored for the record; the CRM surfaces the summary, not this.
  transcript: jsonb("transcript").$type<TranscriptMessage[]>(),
  summary: text("summary"),
  source: text("source").$type<LeadSource>().default("bot").notNull(),
  status: text("status").$type<LeadStatus>().default("new").notNull(),
  // Atribución a un anuncio (manual o por UTM).
  adId: uuid("ad_id").references(() => ads.id, { onDelete: "set null" }),
  utmSource: text("utm_source"),
  utmCampaign: text("utm_campaign"),
  utmMedium: text("utm_medium"),
  assignedTo: uuid("assigned_to").references(() => users.id, { onDelete: "set null" }),
  valueAmount: integer("value_amount"),
  closedAt: timestamp("closed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const leadComments = pgTable("lead_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const leadEvents = pgTable("lead_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  kind: text("kind").notNull(),
  detail: text("detail").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const leadFiles = pgTable("lead_files", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  pathname: text("pathname").notNull(),
  contentType: text("content_type"),
  size: integer("size"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Perfiles de director para marca personal en el generador de posts.
// Standalone: sin FK a users; el admin llena expertise/voice/avoid.
export const directorProfiles = pgTable("director_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  title: text("title"),
  expertise: text("expertise"),
  voice: text("voice"),
  avoid: text("avoid"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Blog / noticias — bilingüe (es/en). Cuerpo en Markdown.
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  status: text("status").$type<ArticleStatus>().default("draft").notNull(),
  titleEs: text("title_es").notNull(),
  titleEn: text("title_en").notNull(),
  excerptEs: text("excerpt_es"),
  excerptEn: text("excerpt_en"),
  bodyEs: text("body_es"),
  bodyEn: text("body_en"),
  // "Recomendaciones de BG" — bloque opcional en Markdown.
  recommendationsEs: text("recommendations_es"),
  recommendationsEn: text("recommendations_en"),
  sourceName: text("source_name"),
  sourceUrl: text("source_url"),
  sourceDate: text("source_date"), // fecha de la fuente (display), p. ej. "08/12/2022"
  category: text("category"),
  coverUrl: text("cover_url"),
  coverPathname: text("cover_pathname"),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type FeedbackStatus = "open" | "resolved";

// Enlaces de feedback: un token por cliente/ronda. El widget del sitio público solo
// aparece si la URL trae un token activo. Se crean y revocan desde el panel admin.
export const feedbackLinks = pgTable("feedback_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  label: text("label").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Notas que deja el cliente al hacer click en el sitio. Anónimas, con contexto del
// elemento clicado y posición en el documento para poder ubicar el pin.
export const feedbackNotes = pgTable("feedback_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  linkId: uuid("link_id")
    .notNull()
    .references(() => feedbackLinks.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  note: text("note").notNull(),
  selector: text("selector"),
  elementText: text("element_text"),
  xPct: integer("x_pct"),
  yPct: integer("y_pct"),
  viewportW: integer("viewport_w"),
  pageTitle: text("page_title"),
  status: text("status").$type<FeedbackStatus>().default("open").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
