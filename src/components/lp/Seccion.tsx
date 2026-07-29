import { CONTENEDOR } from "./constantes";

// Envoltorio <section> + contenedor para las landings de pauta. "Bandas"
// arriba (grid-oscuro, banda-oscura, banda-clara) fijan su propio fondo/borde
// y por eso se leen igual sin importar qué venga antes; "plano" no tiene
// fondo propio y depende del padding que le pase cada sección para separarse
// de su vecina (ver "pegadoArriba" en CadenaConsecuencias / BloqueFaq).
type Variant = "grid-oscuro" | "banda-oscura" | "banda-clara" | "plano";

const bandaClass: Record<Variant, string> = {
  "grid-oscuro": "grid-field",
  "banda-oscura": "border-y border-line bg-surface-1/40",
  "banda-clara": "grid-field-light bg-paper",
  plano: "",
};

export function Seccion({
  variant = "plano",
  borde = "y",
  className = "",
  children,
}: {
  variant?: Variant;
  /** Solo aplica a "banda-oscura": la banda de identidad cierra con borde
   *  superior únicamente, las demás bandas oscuras llevan borde arriba y abajo. */
  borde?: "y" | "t";
  className?: string;
  children: React.ReactNode;
}) {
  const banda = variant === "banda-oscura" && borde === "t" ? "border-t border-line bg-surface-1/40" : bandaClass[variant];
  return (
    <section className={banda}>
      <div className={`${CONTENEDOR} ${className}`}>{children}</div>
    </section>
  );
}
