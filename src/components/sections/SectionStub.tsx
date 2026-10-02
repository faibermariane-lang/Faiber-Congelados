/** Seções das próximas fases: mantêm âncoras, ritmo de fundo e o rótulo numerado. */
export function SectionStub({
  id,
  label,
  title,
  phase,
  tone = "offwhite",
}: {
  id: string;
  label: string;
  title: string;
  phase: number;
  tone?: "offwhite" | "creme";
}) {
  return (
    <section id={id} className={`section-y ${tone === "creme" ? "bg-creme" : "bg-offwhite"}`} aria-label={title}>
      <div className="container-x grid-12 gap-y-6">
        <p className="label-mono col-span-12 text-bordo md:col-span-3">{label}</p>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-[length:var(--text-h2)] leading-[0.98] text-bordo">{title}</h2>
          <p className="label-mono mt-6 text-texto/50">[Em construção — Fase {phase}]</p>
        </div>
      </div>
    </section>
  );
}
