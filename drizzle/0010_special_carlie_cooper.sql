CREATE TABLE "kw_asistente_chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"titulo" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kw_asistente_mensajes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"rol" text NOT NULL,
	"contenido" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "kw_asistente_mensajes" ADD CONSTRAINT "kw_asistente_mensajes_chat_id_kw_asistente_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."kw_asistente_chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "kw_asistente_chats_user_idx" ON "kw_asistente_chats" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "kw_asistente_mensajes_chat_idx" ON "kw_asistente_mensajes" USING btree ("chat_id","created_at");