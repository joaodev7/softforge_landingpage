import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="relative border-y border-white/10 bg-ink-900/40 py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="processo-title"
          eyebrow="Como trabalhamos"
          title="Um processo claro, do briefing ao deploy"
          description="Metodologia ágil com entregas semanais: você acompanha cada etapa e sabe exatamente onde o projeto está."
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title} className="reveal relative text-center">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-full border border-brand-400/45 bg-ink-950 text-brand-300 shadow-lg shadow-brand-500/20">
                  <Icon name={step.icon} className="size-6" />
                </span>
                <p className="mt-5 font-mono text-xs font-semibold text-brand-400">
                  Etapa {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
