import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { kwAsistenteChats, kwAsistenteMensajes } from "@/lib/keywords-schema";

/**
 * Conversaciones del asistente. Todo pasa por el userId: un usuario nunca ve ni
 * escribe en el hilo de otro, aunque adivine el id.
 */

const MAX_MENSAJES_GUARDADOS = 40;

export type Bloques = unknown;

export async function listarChats(userId: string) {
  return db
    .select({
      id: kwAsistenteChats.id,
      titulo: kwAsistenteChats.titulo,
      updatedAt: kwAsistenteChats.updatedAt,
    })
    .from(kwAsistenteChats)
    .where(eq(kwAsistenteChats.userId, userId))
    .orderBy(desc(kwAsistenteChats.updatedAt))
    .limit(30);
}

/** Los mensajes de un chat, solo si es de ese usuario. */
export async function leerChat(userId: string, chatId: string) {
  const [chat] = await db
    .select()
    .from(kwAsistenteChats)
    .where(and(eq(kwAsistenteChats.id, chatId), eq(kwAsistenteChats.userId, userId)));
  if (!chat) return null;

  const mensajes = await db
    .select({ rol: kwAsistenteMensajes.rol, contenido: kwAsistenteMensajes.contenido })
    .from(kwAsistenteMensajes)
    .where(eq(kwAsistenteMensajes.chatId, chatId))
    .orderBy(asc(kwAsistenteMensajes.createdAt))
    .limit(MAX_MENSAJES_GUARDADOS);

  return { chat, mensajes };
}

/** Crea el chat con el título recortado del primer mensaje. */
export async function crearChat(userId: string, primerMensaje: string) {
  const titulo = primerMensaje.trim().slice(0, 60) || "Sin título";
  const [chat] = await db
    .insert(kwAsistenteChats)
    .values({ userId, titulo })
    .returning({ id: kwAsistenteChats.id, titulo: kwAsistenteChats.titulo });
  return chat;
}

/** Guarda un turno. Devuelve false si el chat no es de ese usuario. */
export async function guardarTurno(
  userId: string,
  chatId: string,
  rol: "user" | "assistant",
  contenido: Bloques,
) {
  const [chat] = await db
    .select({ id: kwAsistenteChats.id })
    .from(kwAsistenteChats)
    .where(and(eq(kwAsistenteChats.id, chatId), eq(kwAsistenteChats.userId, userId)));
  if (!chat) return false;

  await db.insert(kwAsistenteMensajes).values({ chatId, rol, contenido });
  await db
    .update(kwAsistenteChats)
    .set({ updatedAt: new Date() })
    .where(eq(kwAsistenteChats.id, chatId));
  return true;
}

export async function borrarChat(userId: string, chatId: string) {
  await db
    .delete(kwAsistenteChats)
    .where(and(eq(kwAsistenteChats.id, chatId), eq(kwAsistenteChats.userId, userId)));
}
