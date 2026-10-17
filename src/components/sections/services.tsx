import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title={
            <>
              Soluções de software para o seu <span className="text-gradient">próximo nível</span>
            </>
          }
          description="Desenvolvemos sistemas, SaaS, sites, landing pages e APIs sob medida que se adaptam à sua realidade e ao seu crescimento."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.title}
              className="card reveal group relative p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand-500/15"
            >
              <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-brand-600/10 text-brand-300 ring-1 ring-brand-400/30 transition-transform group-hover:scale-110">
                <Icon name={s.icon} className="size-7" />
              </span>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-muted">{s.description}</p>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-subtle">
                    <Icon name="check" className="size-4 shrink-0 text-brand-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
