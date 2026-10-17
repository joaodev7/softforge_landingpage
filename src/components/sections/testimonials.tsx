import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="border-y border-white/10 bg-ink-900/40 py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Depoimentos"
          title="Quem confia na SoftForge recomenda"
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="card reveal flex flex-col p-8">
              <figure className="flex h-full flex-col">
                <Icon name="quote" className="size-8 text-brand-400/80" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-subtle">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white"
                  >
                    {t.name
                      .split(" ")
                      .filter((part) => !part.endsWith("."))
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
