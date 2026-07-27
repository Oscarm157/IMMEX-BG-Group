CREATE TABLE "kw_asistente_uso" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "kw_asistente_uso_user_idx" ON "kw_asistente_uso" USING btree ("user_id","created_at");