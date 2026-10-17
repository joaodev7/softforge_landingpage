"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { buttonClasses } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu com ESC e trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Link href="/#contato" className={buttonClasses("primary", "!py-2.5")}>
              Solicitar orçamento
            </Link>
          </span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block rounded-lg px-3 py-3 text-lg font-medium text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link href="/#contato" onClick={close} className={buttonClasses("primary", "w-full")}>
              Solicitar orçamento
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
