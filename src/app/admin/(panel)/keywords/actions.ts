"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/crm-session";
import { kwGrupoItems, kwGrupos, kwIdeas, SERVICIOS } from "@/lib/keywords-schema";
import { normaliza } from "@/lib/keywords-data";

// Grupos de keywords. Todo entra validado y los ids se verifican contra la DB:
// nunca se confía en lo que manda el cliente.

const MERCADOS = ["nacional_es", "extranjero_en"] as const;
const ESTADOS = ["borrador", "listo", "lanzado"] as const;

const keywordSchema = z.object({
  keyword: z.string().min(1).max(200),
  volumen: z.number().int().min(0),
  cpc: z.number().min(0),
  competencia: z.string().min(1).max(20),
});

const crearSchema = z.object({
  nombre: z.string().min(1, "Ponle nombre al grupo.").max(80),
  servicio: z.enum(SERVICIOS),
  plaza: z.string().max(80).nullable(),
  mercado: z.enum(MERCADOS),
  keywords: z.array(keywordSchema).min(1, "Selecciona al menos una keyword."),
});

async function grupoExistente(id: string) {
  const [grupo] = await db.select().from(kwGrupos).where(eq(kwGrupos.id, id));
  if (!grupo) throw new Error("El grupo no existe.");
  return grupo;
}

export async function crearGrupo(input: z.infer<typeof crearSchema>) {
  await requireAdmin();
  const datos = crearSchema.parse(input);

  const [grupo] = await db
    .insert(kwGrupos)
    .values({
      nombre: datos.nombre,
      servicio: datos.servicio,
      plaza: datos.plaza,
      mercado: datos.mercado,
    })
    .returning();

  await db.insert(kwGrupoItems).values(
    datos.keywords.map((k) => ({
      grupoId: grupo.id,
      keyword: k.keyword,
      volumen: k.volumen,
      cpc: k.cpc.toFixed(2),
      competencia: k.competencia,
    })),
  );

  revalidatePath("/admin/keywords");
  revalidatePath("/admin/keywords/grupos");
  return { ok: true as const, id: grupo.id, nombre: grupo.nombre };
}

const propuestaSchema = z.object({
  nombre: z.string().min(1).max(80),
  servicio: z.enum(SERVICIOS),
  plaza: z.string().max(80).nullable().optional(),
  mercado: z.enum(MERCADOS),
  keywords: z.array(z.string().min(1).max(200)).min(1).max(200),
});

/**
 * Crea un grupo a partir de los textos que propuso el asistente. La resolución es aquí
 * y no en el navegador a propósito: el navegador solo tiene las keywords del filtro
 * activo (con tope), así que una propuesta de fuera de esa tanda se perdía en silencio.
 * Devuelve qué se guardó y qué no existía, para poder decirlo en pantalla.
 */
export async function crearGrupoPropuesto(input: z.infer<typeof propuestaSchema>) {
  await requireAdmin();
  const datos = propuestaSchema.parse(input);

  const pedidas = new Map<string, string>(); // normalizada -> texto tal como la pidió
  for (const k of datos.keywords) pedidas.set(normaliza(k), k);

  // El apareo por texto sin acentos no lo hace Postgres sin extensiones, y el research
  // son ~1,000 filas: se traen y se resuelven aquí. De mayor volumen a menor, para que
  // una keyword repetida en dos corridas se quede con la cifra más alta.
  const filas = await db
    .select({
      keyword: kwIdeas.keyword,
      volumen: kwIdeas.volumen,
      competencia: kwIdeas.competencia,
      cpc: kwIdeas.pujaAltaUsd,
    })
    .from(kwIdeas)
    .orderBy(desc(kwIdeas.volumen));

  const encontradas: typeof filas = [];
  const vistas = new Set<string>();
  for (const f of filas) {
    const clave = normaliza(f.keyword);
    if (!pedidas.has(clave) || vistas.has(clave)) continue;
    vistas.add(clave);
    encontradas.push(f);
  }

  const noEncontradas = [...pedidas.entries()]
    .filter(([clave]) => !vistas.has(clave))
    .map(([, texto]) => texto);

  if (!encontradas.length) {
    return { ok: false as const, guardadas: 0, noEncontradas };
  }

  const [grupo] = await db
    .insert(kwGrupos)
    .values({
      nombre: datos.nombre,
      servicio: datos.servicio,
      plaza: datos.plaza ?? null,
      mercado: datos.mercado,
    })
    .returning();

  await db.insert(kwGrupoItems).values(
    encontradas.map((k) => ({
      grupoId: grupo.id,
      keyword: k.keyword,
      volumen: k.volumen,
      cpc: k.cpc ?? "0",
      competencia: k.competencia,
    })),
  );

  revalidatePath("/admin/keywords");
  revalidatePath("/admin/keywords/grupos");
  return {
    ok: true as const,
    id: grupo.id,
    nombre: grupo.nombre,
    guardadas: encontradas.length,
    noEncontradas,
  };
}

const agregarSchema = z.object({
  grupoId: z.string().uuid(),
  keywords: z.array(keywordSchema).min(1),
});

export async function agregarKeywords(input: z.infer<typeof agregarSchema>) {
  await requireAdmin();
  const { grupoId, keywords } = agregarSchema.parse(input);
  await grupoExistente(grupoId);

  // Las que ya están en el grupo se saltan: el índice único las rechazaría.
  const existentes = await db
    .select({ keyword: kwGrupoItems.keyword })
    .from(kwGrupoItems)
    .where(
      and(
        eq(kwGrupoItems.grupoId, grupoId),
        inArray(
          kwGrupoItems.keyword,
          keywords.map((k) => k.keyword),
        ),
      ),
    );
  const ya = new Set(existentes.map((e) => e.keyword));
  const nuevas = keywords.filter((k) => !ya.has(k.keyword));

  if (nuevas.length) {
    await db.insert(kwGrupoItems).values(
      nuevas.map((k) => ({
        grupoId,
        keyword: k.keyword,
        volumen: k.volumen,
        cpc: k.cpc.toFixed(2),
        competencia: k.competencia,
      })),
    );
    await db.update(kwGrupos).set({ updatedAt: new Date() }).where(eq(kwGrupos.id, grupoId));
  }

  revalidatePath("/admin/keywords");
  revalidatePath("/admin/keywords/grupos");
  return { ok: true as const, agregadas: nuevas.length, repetidas: keywords.length - nuevas.length };
}

export async function quitarKeyword(input: { grupoId: string; keyword: string }) {
  await requireAdmin();
  const { grupoId, keyword } = z
    .object({ grupoId: z.string().uuid(), keyword: z.string().min(1) })
    .parse(input);
  await grupoExistente(grupoId);

  await db
    .delete(kwGrupoItems)
    .where(and(eq(kwGrupoItems.grupoId, grupoId), eq(kwGrupoItems.keyword, keyword)));

  revalidatePath(`/admin/keywords/grupos/${grupoId}`);
  revalidatePath("/admin/keywords/grupos");
}

export async function actualizarGrupo(input: {
  id: string;
  nombre?: string;
  estado?: (typeof ESTADOS)[number];
  notas?: string;
}) {
  await requireAdmin();
  const datos = z
    .object({
      id: z.string().uuid(),
      nombre: z.string().min(1).max(80).optional(),
      estado: z.enum(ESTADOS).optional(),
      notas: z.string().max(2000).optional(),
    })
    .parse(input);
  await grupoExistente(datos.id);

  const { id, ...cambios } = datos;
  await db
    .update(kwGrupos)
    .set({ ...cambios, updatedAt: new Date() })
    .where(eq(kwGrupos.id, id));

  revalidatePath(`/admin/keywords/grupos/${id}`);
  revalidatePath("/admin/keywords/grupos");
}

export async function borrarGrupo(id: string) {
  await requireAdmin();
  const grupoId = z.string().uuid().parse(id);
  await grupoExistente(grupoId);

  await db.delete(kwGrupos).where(eq(kwGrupos.id, grupoId)); // los items caen en cascada
  revalidatePath("/admin/keywords/grupos");
}
