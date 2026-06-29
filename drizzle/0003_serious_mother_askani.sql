CREATE TABLE "feedback_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"label" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "feedback_links_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "feedback_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"path" text NOT NULL,
	"note" text NOT NULL,
	"selector" text,
	"element_text" text,
	"x_pct" integer,
	"y_pct" integer,
	"viewport_w" integer,
	"page_title" text,
	"status" text DEFAULT 'open' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "feedback_notes" ADD CONSTRAINT "feedback_notes_link_id_feedback_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."feedback_links"("id") ON DELETE cascade ON UPDATE no action;