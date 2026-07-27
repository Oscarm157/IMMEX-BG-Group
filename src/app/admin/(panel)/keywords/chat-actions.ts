"use server";

import { z } from "zod";
import { getCurrentUser } from "@/lib/crm-session";
import { canViewAds } from "@/lib/crm-permissions";
import { borrarChat, leerChat, listarChats } from "@/lib/asistente/chats";

// Historial del asistente. El id del chat viene del cliente, así que cada acción
// verifica contra la base que sea de este usuario antes de leerlo o borrarlo.

async function usuario() {
  const me = await getCurrentUser();
  if (!me || !canViewAds(me.role)) throw new Error("unauthorized");
  return me;
}

export async function misChats() {
  const me = await usuario();
  const chats = await listarChats(me.id);
  return chats.map((c) => ({ ...c, updatedAt: c.updatedAt.toISOString() }));
}

export async function abrirChat(chatId: string) {
  const me = await usuario();
  const id = z.string().uuid().parse(chatId);
  const datos = await leerChat(me.id, id);
  if (!datos) return null;
  return {
    id: datos.chat.id,
    titulo: datos.chat.titulo,
    mensajes: datos.mensajes,
  };
}

export async function eliminarChat(chatId: string) {
  const me = await usuario();
  await borrarChat(me.id, z.string().uuid().parse(chatId));
}
