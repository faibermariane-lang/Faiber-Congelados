import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealItem } from './ui/Reveal';

const CHANGES = ['A rotina mudou.', 'Os negócios mudaram.', 'A forma de consumir também.'];

export function ImpactBlock() {
  return (
    <section aria-labelledby="impacto-title" className="bg-paper py-28 md:py-44">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <RevealItem
            as="h2"
            id="impacto-title"
            className="font-display text-[clamp(2.4rem,5.6vw,5rem)] font-[400] uppercase text-ink"
          >
            O sabor de sempre. <em className="font-[300] normal-case text-bordo">Com um jeito mais prático de fazer.</em>
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-4" stagger={0.18}>
          <ul className="space-y-1">
            {CHANGES.map((c) => (
              <RevealItem as="li" key={c} variant="left" className="font-display text-[1.375rem] font-[360] text-muted md:text-[1.6rem]">
                {c}
              </RevealItem>
            ))}
          </ul>
          <RevealItem as="p" className="mt-8 max-w-[40ch] text-ink-soft">
            Por isso, a Faiber une o cuidado de uma produção familiar à praticidade que os negócios precisam hoje.
          </RevealItem>
        </Reveal>

        <Reveal className="flex flex-col gap-10 border-t border-line pt-14 md:flex-row md:items-end md:justify-between lg:col-span-12">
          <RevealItem as="p" className="font-condensed text-[clamp(2.4rem,6vw,5rem)] font-semibold uppercase leading-[0.92] text-bordo">
            Você ganha{' '}
            <span className="relative inline-block">
              tempo
              <svg viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-laranja" aria-hidden="true">
                <motion.path
                  d="M2 10C40 4 90 3 198 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </span>
            <br />
            <span className="text-ink">sem abrir mão do sabor.</span>
          </RevealItem>
          <RevealItem>
            <a href="#produtos" className="btn btn-ghost">
              Conheça a linha Faiber
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
