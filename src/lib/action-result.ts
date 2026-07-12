/**
 * Resultado uniforme de una server action de mutación que NO navega.
 * El cliente hace: `const r = await action(...); r.ok ? toast.success(...) : toast.error(r.error)`.
 * Las acciones que navegan (redirect) no devuelven esto; avisan con ?flash en la ruta destino.
 */
export type ActionResult = { ok: true } | { ok: false; error: string };
