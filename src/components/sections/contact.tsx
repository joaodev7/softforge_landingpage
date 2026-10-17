import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { siteConfig, whatsappLink } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function Contact() {
  const channels = [
    {
      icon: "whatsapp" as const,
      label: "WhatsApp",
      value: siteConfig.phoneDisplay,
      href: whatsappLink(),
      external: true,
    },
    {
      icon: "mail" as const,
      label: "E-mail Comercial",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
    {
      icon: "pin" as const,
      label: "Atendimento & Redes",
      value: `${siteConfig.city} · ${siteConfig.instagramHandle}`,
      href: null,
      external: false,
    },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative isolate overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[130px]"
      />
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="contato-title"
            align="left"
            eyebrow="Contato"
            title={
              <>
                Vamos forjar o seu <span className="text-gradient">próximo projeto?</span>
              </>
            }
            description="Conte sua ideia e receba um diagnóstico gratuito com proposta personalizada em até 24 horas úteis. Sem compromisso."
          />

          <ul className="mt-10 space-y-4">
            {channels.map((c) => {
              const content = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                    <Icon name={c.icon} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block font-semibold text-white">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="card flex items-center gap-4 p-4 transition-colors hover:border-brand-400/50"
                    >
                      {content}
                      {c.external && <span className="sr-only">(abre em nova aba)</span>}
                    </a>
                  ) : (
                    <div className="card flex items-center gap-4 p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
