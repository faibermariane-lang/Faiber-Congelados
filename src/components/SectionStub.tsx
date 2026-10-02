/**
 * Seção ainda não construída (próximas fases). Mantém a âncora funcionando
 * para o menu, a fita e os botões “Ver comanda”.
 */
export function SectionStub({ id, title, phase, tone }: { id: string; title: string; phase: number; tone: 'creme' | 'offwhite' }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${tone === 'creme' ? 'bg-creme' : 'bg-offwhite'} px-4 py-24 sm:px-6 lg:px-10 lg:py-32`}
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="font-mono text-sm text-texto/80">Em construção · fase {phase}</p>
        <h2 id={`${id}-title`} className="display mt-3 text-[clamp(3rem,8vw,7.5rem)] text-bordo/25">
          {title}
        </h2>
      </div>
    </section>
  );
}
