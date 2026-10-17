import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { LogoWatermark } from "@/components/ui/logo";
import { siteConfig, stats, whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
    >
      {/* Fundo decorativo e Marca d'água S geométrica oficial */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -right-24 -z-10 hidden text-brand-500/[0.06] lg:block"
      >
        <LogoWatermark className="size-[34rem]" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/15 px-4 py-1.5 text-sm font-medium text-brand-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-400" />
            </span>
            Engenharia de software sob medida &amp; produtos próprios
          </p>

          <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Forjamos software que <span className="text-gradient">impulsiona</span> o seu negócio
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {siteConfig.subSlogan} Desenvolvemos sistemas, SaaS, landing pages e APIs sob medida —
            além de produtos próprios como o <strong className="font-semibold text-white">PRAXIS</strong> e o{" "}
            <strong className="font-semibold text-white">catchVagas</strong>.
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/#contato" className="text-base">
              Solicitar orçamento grátis
              <Icon name="arrow" className="size-5" />
            </ButtonLink>
            <ButtonLink href="/#cases" variant="secondary" className="text-base">
              Conhecer nossos cases
            </ButtonLink>
            <ButtonLink
              href={whatsappLink()}
              variant="ghost"
              className="text-base !px-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" className="size-5 text-brand-400" />
              WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </ButtonLink>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/** Mockup decorativo de código fiel ao Guia de Marca SoftForge. */
function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="card relative overflow-hidden border-brand-400/25 bg-[#07142E]/90 shadow-2xl shadow-brand-500/15">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-300">softforge/forja.ts</span>
        </div>
        <pre className="overflow-hidden p-6 pb-16 font-mono text-[13px] leading-7 text-slate-200 sm:text-sm">
          <code>
            <span className="text-brand-300">const</span> forge ={" "}
            <span className="text-brand-300">await</span>{" "}
            <span className="text-cyan-300">SoftForge</span>.
            <span className="text-amber-200">build</span>({"{"}
            {"\n"}  ideia: <span className="text-emerald-300">&quot;solução&quot;</span>,
            {"\n"}  stack: [<span className="text-emerald-300">&quot;.NET 8&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Python&quot;</span>],
            {"\n"}  cases: [<span className="text-emerald-300">&quot;PRAXIS&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;catchVagas&quot;</span>],
            {"\n"}  tecnologia: <span className="text-emerald-300">&quot;resultado&quot;</span>,
            {"\n"}  parceiro: <span className="text-brand-300">true</span>,
            {"\n"}
            {"}"});
            {"\n"}
            {"\n"}
            <span className="text-slate-400">{"// ✓ Deploy em produção com sucesso"}</span>
            {"\n"}forge.<span className="text-amber-200">impulsionar</span>();
          </code>
        </pre>
      </div>

      <div className="card animate-float absolute -bottom-8 -left-4 flex items-center gap-3 border-brand-400/30 bg-ink-900/95 px-4 py-3 shadow-xl sm:-left-8">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <Icon name="gauge" className="size-5" />
        </span>
        <div>
          <p className="text-xs text-muted">Performance</p>
          <p className="font-display text-lg font-extrabold text-white">98/100</p>
        </div>
      </div>

      <div
        className="card animate-float absolute -top-6 -right-2 flex items-center gap-3 border-brand-400/30 bg-ink-900/95 px-4 py-3 shadow-xl sm:-right-6"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
          <Icon name="shield" className="size-5" />
        </span>
        <div>
          <p className="text-xs text-muted">Produtos Reais</p>
          <p className="font-display text-lg font-extrabold text-white">PRAXIS &amp; +</p>
        </div>
      </div>
    </div>
  );
}
