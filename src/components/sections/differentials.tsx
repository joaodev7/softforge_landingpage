import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { differentials, techStack } from "@/lib/site";

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="diferenciais-title"
            align="left"
            eyebrow="Por que a SoftForge"
            title={
              <>
                Engenharia de ponta com <span className="text-gradient">foco no seu resultado</span>
              </>
            }
            description="Não entregamos só código: entregamos produtos digitais rápidos, seguros e preparados para escalar — com a mesma arquitetura usada em nossos produtos próprios."
          />

          <div className="reveal mt-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              Tecnologias que dominamos
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {techStack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-subtle"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {differentials.map((d, i) => (
            <li
              key={d.title}
              className={`card reveal p-7 ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                <Icon name={d.icon} />
              </span>
              <h3 className="text-lg font-bold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted">{d.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
