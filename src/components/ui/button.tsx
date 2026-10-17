import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Branco (#FFFFFF) sobre Azul SoftForge (#0066FF): contraste 4.83:1 (WCAG AA).
  primary:
    "bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:shadow-brand-500/45 hover:-translate-y-0.5",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:border-brand-400/70 hover:bg-brand-500/10",
  ghost: "text-white hover:text-brand-300",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
