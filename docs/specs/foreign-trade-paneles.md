# Spec: rebalanceo de paneles interactivos foreign-trade

## Objetivo
Los dos paneles interactivos de la página `/services/foreign-trade` (flujo del
pedimento y diagnóstico) pegan el contenido a la mitad izquierda y dejan ~43% de
la derecha como rejilla vacía en desktop. Llenar esa columna con un visual con
significado por etapa/resultado, no con relleno decorativo. De paso, quitar el
defecto del enum interno mostrado al usuario.

## Fuente de verdad / arquitectura
- Reference lock = el propio sistema de instrumentos del sitio:
  `src/components/site/ServiceInstrument.tsx` (motivos SVG, draw-on con
  `pathLength`, nodos mint, labels mono). No se inventa lenguaje nuevo.
- Tokens: accent `#00e6a0`, line `#28303f`, guide `rgba(204,210,220,0.14)`,
  mono = `var(--font-plex-mono)`, ease `editorialEase` de `src/lib/motion.ts`.
- Pieza nueva reusada en ambos paneles: `CustomsStageVisual` con 5 motivos
  (uno por etapa del pedimento). El diagnóstico mapea cada resultado a la etapa
  más relevante y reusa el mismo visual. Cero duplicación de SVG.

## Alcance
1. **Enum leak (defecto):** en `ForeignTradeDiagnostic`, el resultado imprime
   `resultKey` crudo (`HIGH_DEFENSE`, ...). Reemplazar por una etiqueta humana
   por idioma (o quitar el eyebrow). Sin tocar la lógica de `getResult`.
2. **Visual por etapa (`CustomsStageVisual`):** 5 motivos distintos, animados al
   cambiar de etapa, respetando reduced-motion:
   - 01 Clasificación · ruteo de fracción a una partida
   - 02 Valoración · valor base + incrementables apilando
   - 03 Pedimento · campos convergiendo a documento + selección automatizada
   - 04 Cumplimiento · checklist Anexo 24 / 31 / Data Stage con draw-check
   - 05 Defensa · ruta de escalamiento notificación → recurso/juicio/amparo
3. **Flujo:** la columna derecha del detalle muestra `CustomsStageVisual` de la
   etapa activa. Layout actual del texto intacto; el visual ocupa el hueco en
   `lg`. En móvil el visual va debajo o se oculta (sin romper el flujo vertical).
4. **Diagnóstico:** el estado de resultado muestra el mismo visual en la columna
   derecha, mapeado: HIGH_DEFENSE/DEFENSE→Defensa, COMPLIANCE_IMMEX→Cumplimiento,
   ADVISORY→Clasificación, GENERAL→Pedimento. El form de lead no se mueve.

## Criterios de aceptación (verificables con captura real)
- [ ] El resultado del diagnóstico ya NO muestra texto tipo `HIGH_DEFENSE`.
- [ ] En el flujo, cada una de las 5 etapas tiene un visual distinto en la
      columna derecha; cambia al navegar; ya no hay rejilla vacía en desktop.
- [ ] El diagnóstico de resultado tiene visual a la derecha en desktop.
- [ ] reduced-motion: los visuales se ven en su estado final, sin loops.
- [ ] Móvil (375px): nada desbordado ni cortado; el texto manda, el visual no
      empuja ni rompe el panel.
- [ ] `next build` o `tsc` sin errores nuevos; sin variables/branches sin uso.

## Fuera de alcance
- No tocar copy de etapas/preguntas/resultados (más allá del enum).
- No tocar el bento "Alcance" (mejora menor, queda para otra pasada).
- No tocar la API de leads ni `getResult`.

## Plan
Piloto: `CustomsStageVisual` + cableado SOLO en el flujo, las 5 etapas. Revisar
(captura por etapa + revisor-codigo, es piloto deliberado). Aprobado el patrón,
propagar al diagnóstico + enum fix. Pase final sobre el delta y push.
