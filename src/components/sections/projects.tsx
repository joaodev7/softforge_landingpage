import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { projects, type ProjectCase } from "@/lib/site";

export function Projects() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="relative border-t border-white/10 bg-ink-900/35 py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="cases-title"
          eyebrow="Produtos & Cases Reais"
          title={
            <>
              Engenharia comprovada em <span className="text-gradient">produtos próprios no ar</span>
            </>
          }
          description="Não apenas desenvolvemos sob encomenda: criamos e operamos nossos próprios produtos SaaS e automações. Conheça as soluções forjadas pela SoftForge."
        />

        <div className="mt-16 space-y-12">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} reversed={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, reversed }: { project: ProjectCase; reversed: boolean }) {
  return (
    <article
      aria-labelledby={`case-${project.slug}-title`}
      className="card reveal overflow-hidden border-white/15 bg-ink-900/75 p-6 shadow-2xl shadow-brand-500/5 sm:p-10 lg:p-12"
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-12 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Coluna de conteúdo */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/40 bg-brand-500/15 px-3.5 py-1 text-xs font-semibold text-brand-300">
              {project.category}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Produto Autoral SoftForge
            </span>
          </div>

          <h3 id={`case-${project.slug}-title`} className="mt-4 text-3xl font-extrabold sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 text-base font-medium text-brand-300">{project.subtitle}</p>

          <p className="mt-4 text-subtle/90 leading-relaxed">{project.summary}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-ink-950/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-400">O Desafio</p>
              <p className="mt-1.5 text-sm text-muted">{project.challenge}</p>
            </div>
            <div className="rounded-xl border border-brand-400/25 bg-brand-500/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                A Solução SoftForge
              </p>
              <p className="mt-1.5 text-sm text-subtle">{project.solution}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-white/10 py-5">
            {project.highlights.map((h) => (
              <div key={h.label}>
                <dt className="text-xs text-muted">{h.label}</dt>
                <dd className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2.5">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-sm text-subtle">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 font-mono text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href="/#contato" variant="secondary">
              Quero um projeto desse nível
              <Icon name="arrow" className="size-4" />
            </ButtonLink>
          </div>
        </div>

        {/* Coluna visual do Produto */}
        <div className="lg:col-span-5">
          {project.slug === "praxis" ? <PraxisVisual /> : <CatchVagasVisual />}
        </div>
      </div>
    </article>
  );
}

/** Mockup fiel ao Brand Board e arquitetura do PRAXIS (SaaS B2B Food Safety). */
function PraxisVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-brand-400/30 bg-gradient-to-b from-[#07142E] to-[#040B1A] p-5 shadow-xl"
    >
      {/* Header da marca PRAXIS */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 44" className="size-9" aria-hidden="true">
            <path d="M8 6L32 16V24L8 14V6Z" fill="#FFFFFF" />
            <path d="M8 18L32 28V36L8 26V18Z" fill="#60A5FA" />
            <path d="M32 28L8 40V32L32 20V28Z" fill="#0066FF" />
          </svg>
          <div>
            <p className="font-display text-lg font-extrabold tracking-wider text-white">
              PRAX<span className="text-brand-400">IS</span>
            </p>
            <p className="text-[10px] tracking-[0.22em] text-muted uppercase">
              Inteligência em Ação
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          ANVISA RDC 216
        </span>
      </div>

      {/* KPIs de Auditoria */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-ink-900/70 p-3.5">
          <p className="text-xs text-muted">Conformidade Sanitária</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-emerald-300">94,2%</p>
          <p className="mt-0.5 text-[11px] text-slate-300">+12,4% vs. última vistoria</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-ink-900/70 p-3.5">
          <p className="text-xs text-muted">Controle de ART (CRN)</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-white">18 ativas</p>
          <p className="mt-0.5 text-[11px] text-brand-300">Alertas 30d automáticos</p>
        </div>
      </div>

      {/* Checklist + Laudo PDF 1 clique */}
      <div className="mt-3 rounded-xl border border-white/10 bg-ink-950/80 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-300">
              <Icon name="fileCheck" className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Laudo Técnico + Plano 5W2H</p>
              <p className="text-[11px] text-muted">Unidade Jardins · 42 itens auditados</p>
            </div>
          </div>
          <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            Gerar PDF
          </span>
        </div>
      </div>

      {/* Etiqueta térmica ANVISA com QR Code */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-brand-400/40 bg-ink-900/50 p-3.5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-brand-300">
            Etiqueta Rastreável · Lote #A409
          </p>
          <p className="mt-0.5 text-xs font-bold text-white">Molho Artesanal · Refrigeração ≤ 4°C</p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-300">
            Aberto: 17/10 09:00 · Validade: 20/10 09:00
          </p>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white text-ink-950">
          <Icon name="qr" className="size-7" />
        </span>
      </div>
    </div>
  );
}

/** Mockup fiel ao funcionamento do catchVagas (Bot Python Multi-Chat + Scraper). */
function CatchVagasVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-brand-400/30 bg-gradient-to-b from-[#07142E] to-[#040B1A] p-5 shadow-xl"
    >
      {/* Barra superior do terminal/bot */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Icon name="bot" className="size-5" />
          </span>
          <div>
            <p className="font-display text-base font-bold text-white">catchVagas Bot</p>
            <p className="font-mono text-[11px] text-brand-300">
              @catchVagas_bot · Multi-Chat SQLite
            </p>
          </div>
        </div>
        <span className="rounded-full bg-brand-500/20 px-2.5 py-1 font-mono text-[11px] text-brand-300">
          Docker · 24/7
        </span>
      </div>

      {/* Comandos interativos do Telegram */}
      <div className="mt-4 rounded-xl border border-white/10 bg-ink-950/90 p-3.5 font-mono text-xs">
        <p className="text-brand-300">&gt; /categoria dotnet</p>
        <p className="mt-1 text-slate-300">
          ✓ Perfil ativo: <span className="text-white">.NET / C#</span> · Remoto:{" "}
          <span className="text-emerald-300">Sim</span>
        </p>
        <p className="mt-2 text-brand-300">&gt; /buscar</p>
        <p className="mt-1 text-slate-300">
          Varrendo LinkedIn, Indeed, Glassdoor e Google Jobs...
        </p>
      </div>

      {/* Alerta de vaga deduplicada */}
      <div className="mt-3 rounded-xl border border-brand-400/30 bg-ink-900/75 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
            Nova Vaga Verificada
          </span>
          <span className="font-mono text-[11px] text-muted">LinkedIn · há 12 min</span>
        </div>
        <p className="mt-2 text-sm font-bold text-white">Senior Backend Engineer (.NET 8 / C#)</p>
        <p className="mt-0.5 text-xs text-muted">100% Remoto · Brasil · Deduplicada por usuário</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <span className="rounded-lg border border-white/10 bg-ink-950/70 py-1.5 text-slate-200">
            ⬅️ Anterior
          </span>
          <span className="rounded-lg border border-brand-400/40 bg-brand-500/20 py-1.5 text-brand-300">
            1 / 5
          </span>
          <span className="rounded-lg border border-white/10 bg-ink-950/70 py-1.5 text-slate-200">
            Próxima ➡️
          </span>
        </div>
      </div>
    </div>
  );
}
