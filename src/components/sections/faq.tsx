import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { faqs } from "@/lib/site";

/** FAQ com <details>/<summary>: acessível por teclado e funcional sem JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 lg:py-32">
      <div className="container-page max-w-3xl">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Perguntas frequentes"
          description="Não encontrou sua dúvida? Fale com a gente — respondemos rapidinho."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.question}
              name="faq"
              className="card reveal group p-0 open:border-brand-400/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-card)] px-6 py-5 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{f.question}</h3>
                <Icon
                  name="chevron"
                  className="size-5 shrink-0 text-brand-400 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-6 text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
