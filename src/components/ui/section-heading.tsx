export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`reveal max-w-2xl ${alignCls}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-400 sm:text-sm">
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg text-muted">{description}</p>}
    </div>
  );
}
