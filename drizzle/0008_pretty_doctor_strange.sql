CREATE TABLE "kw_grupo_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"grupo_id" uuid NOT NULL,
	"keyword" text NOT NULL,
	"volumen" integer NOT NULL,
	"cpc" numeric(8, 2),
	"competencia" text NOT NULL,
	"agregada_en" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "kw_grupos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" text NOT NULL,
	"servicio" text NOT NULL,
	"plaza" text,
	"mercado" text NOT NULL,
	"estado" text DEFAULT 'borrador' NOT NULL,
	"notas" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "kw_ideas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_id" uuid NOT NULL,
	"keyword" text NOT NULL,
	"servicio" text NOT NULL,
	"plaza" text NOT NULL,
	"volumen" integer NOT NULL,
	"competencia" text NOT NULL,
	"indice_competencia" integer,
	"puja_baja_usd" numeric(8, 2),
	"puja_alta_usd" numeric(8, 2),
	"variantes" integer DEFAULT 1 NOT NULL,
	"serie_12m" jsonb,
	"dificultad_seo" integer,
	"intencion" text
);
--> statement-breakpoint
CREATE TABLE "kw_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brief" text NOT NULL,
	"fuente" text DEFAULT 'planner' NOT NULL,
	"mercado" text NOT NULL,
	"geo" text NOT NULL,
	"idioma" text NOT NULL,
	"tipo_cambio" numeric(6, 2),
	"total" integer NOT NULL,
	"corrida_en" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "kw_grupo_items" ADD CONSTRAINT "kw_grupo_items_grupo_id_kw_grupos_id_fk" FOREIGN KEY ("grupo_id") REFERENCES "public"."kw_grupos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kw_ideas" ADD CONSTRAINT "kw_ideas_run_id_kw_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."kw_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "kw_grupo_items_unicos" ON "kw_grupo_items" USING btree ("grupo_id","keyword");--> statement-breakpoint
CREATE INDEX "kw_ideas_servicio_idx" ON "kw_ideas" USING btree ("servicio");--> statement-breakpoint
CREATE INDEX "kw_ideas_plaza_idx" ON "kw_ideas" USING btree ("plaza");--> statement-breakpoint
CREATE INDEX "kw_ideas_run_idx" ON "kw_ideas" USING btree ("run_id");