CREATE TABLE "campus_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campus_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"cover_url" text,
	"cover_pathname" text,
	"audience" text DEFAULT 'ambos' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "campus_category_orgs" (
	"category_id" uuid NOT NULL,
	"org_id" uuid NOT NULL,
	CONSTRAINT "campus_category_orgs_category_id_org_id_pk" PRIMARY KEY("category_id","org_id")
);
--> statement-breakpoint
CREATE TABLE "campus_enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"status" text DEFAULT 'not_started' NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"last_activity_at" timestamp with time zone,
	CONSTRAINT "campus_enrollments_user_id_category_id_unique" UNIQUE("user_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "campus_invites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"purpose" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_invites_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "campus_orgs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_orgs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "campus_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"step_type" text NOT NULL,
	"step_id" uuid NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_progress_user_id_step_type_step_id_unique" UNIQUE("user_id","step_type","step_id")
);
--> statement-breakpoint
CREATE TABLE "campus_quiz_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"quiz_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"total" integer NOT NULL,
	"passed" boolean NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campus_quiz_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_id" uuid NOT NULL,
	"prompt" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_index" integer NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campus_quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" uuid NOT NULL,
	"title" text NOT NULL,
	"passing_score" integer DEFAULT 70 NOT NULL,
	"source" text DEFAULT 'manual' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campus_topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"order" integer,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_topics_category_id_slug_unique" UNIQUE("category_id","slug")
);
--> statement-breakpoint
CREATE TABLE "campus_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text,
	"audience" text NOT NULL,
	"org_id" uuid,
	"role" text DEFAULT 'learner' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"must_set_password" boolean DEFAULT true NOT NULL,
	"session_version" integer DEFAULT 0 NOT NULL,
	"last_activity_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "campus_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "campus_blocks" ADD CONSTRAINT "campus_blocks_topic_id_campus_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."campus_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_category_orgs" ADD CONSTRAINT "campus_category_orgs_category_id_campus_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."campus_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_category_orgs" ADD CONSTRAINT "campus_category_orgs_org_id_campus_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."campus_orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_enrollments" ADD CONSTRAINT "campus_enrollments_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_enrollments" ADD CONSTRAINT "campus_enrollments_category_id_campus_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."campus_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_invites" ADD CONSTRAINT "campus_invites_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_progress" ADD CONSTRAINT "campus_progress_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_progress" ADD CONSTRAINT "campus_progress_category_id_campus_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."campus_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_quiz_attempts" ADD CONSTRAINT "campus_quiz_attempts_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_quiz_attempts" ADD CONSTRAINT "campus_quiz_attempts_quiz_id_campus_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."campus_quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_quiz_questions" ADD CONSTRAINT "campus_quiz_questions_quiz_id_campus_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."campus_quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_quizzes" ADD CONSTRAINT "campus_quizzes_topic_id_campus_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."campus_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_topics" ADD CONSTRAINT "campus_topics_category_id_campus_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."campus_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_users" ADD CONSTRAINT "campus_users_org_id_campus_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."campus_orgs"("id") ON DELETE set null ON UPDATE no action;