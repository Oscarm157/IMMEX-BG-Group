import { initBotId } from "botid/client/core";

// Declarar aquí TODAS las rutas protegidas con checkBotId() en el servidor: si una
// ruta falta, el navegador real no la firma y BotID la trata como bot aunque sea
// un usuario legítimo.
initBotId({
  protect: [
    { path: "/api/chat", method: "POST" },
    { path: "/api/leads", method: "POST" },
  ],
});
