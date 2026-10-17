import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/ui/logo";
import { navItems, projects, services, siteConfig } from "@/lib/site";

/** Ano atual, cacheado por dia (Cache Components não permite `new Date()` sem cache). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            {siteConfig.slogan} {siteConfig.subSlogan}
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Navegação</h2>
          <ul className="mt-4 space-y-3">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm text-muted hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contato" className="text-sm text-muted hover:text-white">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Serviços &amp; Produtos
          </h2>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 4).map((s) => (
              <li key={s.title} className="text-sm text-muted">
                {s.title}
              </li>
            ))}
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href="/#cases" className="text-sm font-medium text-brand-300 hover:text-white">
                  {p.name} — {p.category.split("·")[0].trim()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.phoneDisplay}</li>
            <li>
              {siteConfig.city} · {siteConfig.instagramHandle}
            </li>
          </ul>
          <ul className="mt-6 flex gap-4 text-sm">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize text-muted hover:text-brand-300"
                >
                  {name}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © <CurrentYear /> {siteConfig.legalName} · CNPJ {siteConfig.cnpj}
          </p>
          <Link href="/privacidade" className="hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
