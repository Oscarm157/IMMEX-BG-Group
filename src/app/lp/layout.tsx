import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LangSetter } from "@/components/site/LangSetter";

// Shell de las landings de pauta. Sin navegación del sitio: el clic viene de un
// anuncio y la única salida es el formulario. Solo marca, teléfono y lo legal.
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LangSetter lang="es" />
      <div className="grain" aria-hidden />
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Logo variant="bg" tone="light" size="sm" className="h-9 w-auto sm:h-11" />
          <a
            href="tel:+526646079642"
            className="font-mono text-[13px] tabular-nums text-bone transition-colors hover:text-accent sm:text-[14px]"
          >
            +52 (664) 607 9642
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line">
        {/* pb extra en móvil: la barra fija de CTA se monta sobre el pie */}
        <div className="mx-auto flex max-w-[1560px] flex-col gap-2 px-5 pb-28 pt-8 text-[13px] leading-relaxed text-smoke sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:pb-8">
          <p>BG Consulting Group · Miguel Alemán 3231 B, Col. Gabilondo, Tijuana, B.C. 22044</p>
          <Link href="/es/privacy" className="text-bone underline underline-offset-2 hover:text-accent">
            Aviso de privacidad
          </Link>
        </div>
      </footer>
    </>
  );
}
