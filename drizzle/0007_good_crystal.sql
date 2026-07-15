CREATE TABLE "campus_ai_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campus_assistant_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"topic_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "campus_topics" ADD COLUMN "suggestions" jsonb;--> statement-breakpoint
ALTER TABLE "campus_ai_usage" ADD CONSTRAINT "campus_ai_usage_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_assistant_messages" ADD CONSTRAINT "campus_assistant_messages_user_id_campus_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."campus_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campus_assistant_messages" ADD CONSTRAINT "campus_assistant_messages_topic_id_campus_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."campus_topics"("id") ON DELETE cascade ON UPDATE no action;