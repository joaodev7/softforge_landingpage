import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a SoftForge coleta, usa e protege seus dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/privacidade" },
};

const UPDATED_AT = "17 de outubro de 2026";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="pt-32 pb-24">
        <article className="container-page max-w-3xl space-y-8 text-subtle [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <header>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-400">Legal</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Política de Privacidade</h1>
            <p className="mt-4 text-sm text-muted">Última atualização: {UPDATED_AT}</p>
          </header>

          <p>
            A <strong className="text-white">{siteConfig.legalName}</strong> (CNPJ {siteConfig.cnpj}),
            doravante “SoftForge”, respeita a sua privacidade. Esta política explica como tratamos
            dados pessoais coletados neste site, em conformidade com a Lei Geral de Proteção de
            Dados Pessoais (LGPD — Lei nº 13.709/2018).
          </p>

          <h2>1. Quais dados coletamos</h2>
          <p>Coletamos apenas os dados que você nos fornece voluntariamente no formulário de contato:</p>
          <ul>
            <li>Nome e e-mail (obrigatórios);</li>
            <li>Telefone/WhatsApp e empresa (opcionais);</li>
            <li>Serviço de interesse e descrição do projeto.</li>
          </ul>
          <p>
            Este site <strong className="text-white">não utiliza cookies de rastreamento ou publicidade</strong>.
            Registros técnicos mínimos (como endereço IP) podem ser processados temporariamente para
            segurança e prevenção de abuso.
          </p>

          <h2>2. Para que usamos seus dados</h2>
          <ul>
            <li>Responder à sua solicitação e elaborar propostas comerciais;</li>
            <li>Entrar em contato sobre o projeto solicitado;</li>
            <li>Proteger o site contra spam e uso indevido.</li>
          </ul>

          <h2>3. Base legal</h2>
          <p>
            O tratamento é realizado com base no seu <strong className="text-white">consentimento</strong>{" "}
            (art. 7º, I) e para <strong className="text-white">procedimentos preliminares relacionados a
            contrato</strong> a pedido do titular (art. 7º, V), além do legítimo interesse para
            segurança do site (art. 7º, IX).
          </p>

          <h2>4. Compartilhamento</h2>
          <p>
            Não vendemos nem alugamos seus dados. Eles podem ser processados por fornecedores que nos
            ajudam a operar o site (hospedagem e envio de e-mail), sob obrigações contratuais de
            confidencialidade e segurança.
          </p>

          <h2>5. Por quanto tempo guardamos</h2>
          <p>
            Mantemos os dados pelo tempo necessário para atender à sua solicitação e, se não houver
            relação comercial, por no máximo 12 meses, salvo obrigação legal em contrário.
          </p>

          <h2>6. Seus direitos</h2>
          <p>Nos termos do art. 18 da LGPD, você pode, a qualquer momento:</p>
          <ul>
            <li>Confirmar a existência de tratamento e acessar seus dados;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar anonimização, bloqueio ou eliminação;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>Revogar o consentimento.</li>
          </ul>

          <h2>7. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados, como criptografia em
            trânsito (HTTPS), controle de acesso e minimização de dados.
          </p>

          <h2>8. Contato do encarregado (DPO)</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas, escreva para{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand-300 underline underline-offset-2 hover:text-brand-400"
            >
              {siteConfig.email}
            </a>
            . Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
            Este documento é um modelo e deve ser revisado por um profissional jurídico antes da
            publicação definitiva.
          </p>

          <p>
            <Link href="/" className="font-semibold text-brand-300 hover:text-brand-400">
              ← Voltar para a página inicial
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
