import Link from "next/link";

/**
 * Símbolo geométrico "S" chanfrado oficial da SoftForge,
 * fiel ao Guia de Marca (Azul #0066FF e Branco #FFFFFF).
 */
export function LogoMark({
  className = "size-9",
  variant = "badge",
}: {
  className?: string;
  variant?: "badge" | "symbol";
}) {
  if (variant === "symbol") {
    return (
      <svg viewBox="0 0 64 80" className={className} aria-hidden="true" focusable="false">
        <path
          d="M48 24V19L39 10H23L14 19V33L22 40L42 45L50 52V63L41 72H23L14 63V56"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true" focusable="false">
      <rect width="44" height="44" rx="10" fill="#0066FF" />
      <path
        d="M29.5 15.5V13L25 8.5H18L13.5 13V20L17.5 23L26.5 25.5L30.5 28.5V33L26 37.5H18L13.5 33V29.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** Marca d'água geométrica "S" em grande escala para fundos institucionais. */
export function LogoWatermark({ className = "size-96" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true" focusable="false">
      <path
        d="M90 45V35L72 17H44L26 35V62L42 75L78 84L94 97V118L76 136H44L26 118V104"
        fill="none"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-lg"
      aria-label="SoftForge — página inicial"
    >
      <LogoMark />
      <span className="font-display text-lg font-extrabold uppercase tracking-[0.14em] text-white sm:text-xl">
        SOFT<span className="text-brand-400">FORGE</span>
      </span>
    </Link>
  );
}
