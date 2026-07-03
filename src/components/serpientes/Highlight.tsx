/* Resalta una frase clave dentro de un texto verbatim, sin alterar las palabras:
   parte el string una vez alrededor de la frase y la envuelve en dorado. Da
   jerarquía/formato a las declaraciones para que no lean como texto pegado. */
export function Highlight({
  text,
  phrase,
}: {
  text: string;
  phrase: string;
}) {
  const i = text.indexOf(phrase);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em className="font-semibold not-italic text-[var(--st-gold)]">
        {phrase}
      </em>
      {text.slice(i + phrase.length)}
    </>
  );
}
