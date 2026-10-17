import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="bg-grid flex min-h-dvh flex-col items-center justify-center px-6 text-center"
    >
      <LogoMark className="size-14" />
      <p className="mt-8 font-mono text-sm font-semibold text-brand-400">Erro 404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-muted">
        Parece que essa página ainda não saiu da forja. Que tal voltar para o início?
      </p>
      <ButtonLink href="/" className="mt-10">
        Voltar para o início
      </ButtonLink>
    </main>
  );
}
