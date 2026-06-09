import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovación digital · Junio 2026",
  robots: { index: false, follow: false },
};

export default function PresentacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grain" aria-hidden />
      {children}
    </>
  );
}
