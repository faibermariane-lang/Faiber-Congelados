import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal, RevealItem } from './ui/Reveal';
import { Sketch } from './ui/Sketch';

const MORE = ['Mais qualidade.', 'Mais praticidade.', 'Mais possibilidades.'];

export function PastelHistory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yearX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-22%']);
  const sketchY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -80]);
  const herbY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 120]);

  return (
    <section ref={ref} aria-labelledby="origem-title" className="paper relative isolate overflow-hidden bg-paper pt-24 md:pt-36">
      {/* 1940 gigante ao fundo */}
      <motion.p
        aria-hidden="true"
        style={{ x: yearX, WebkitTextStroke: '1.5px rgba(107,20,32,0.16)' }}
        className="font-display pointer-events-none absolute -z-10 top-10 left-0 select-none whitespace-nowrap text-[clamp(11rem,34vw,32rem)] font-[300] leading-none text-transparent md:top-16"
      >
        1940
      </motion.p>
      <motion.div style={{ y: herbY }} aria-hidden="true" className="pointer-events-none absolute -right-8 top-[38%] -z-10 text-marrom/[0.12]">
        <Sketch name="folha" className="w-32 rotate-[18deg] md:w-44" />
      </motion.div>

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <RevealItem>
            <Eyebrow index="02" className="text-bordo">
              Capítulo de origem
            </Eyebrow>
          </RevealItem>
          <RevealItem
            as="h2"
            id="origem-title"
            className="font-display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-[400] uppercase text-ink"
          >
            Antes de ser um clássico, <em className="font-[320] normal-case text-bordo">ele foi uma adaptação.</em>
          </RevealItem>

          <RevealItem variant="fade" className="mt-12 hidden lg:block">
            <motion.figure style={{ y: sketchY }} className="relative w-[85%] text-bordo/70">
              <Sketch name="pastel" className="w-full" delay={0.2} />
              {/* anotações técnicas */}
              <svg viewBox="0 0 240 40" className="mt-2 w-full overflow-visible text-marrom/60" aria-hidden="true">
                <g className="sketch">
                  <path d="M24 10V26M216 10V26M24 18H216M24 18l6-3M24 18l6 3M216 18l-6-3M216 18l-6 3" />
                </g>
              </svg>
              <figcaption className="eyebrow mt-3 flex justify-between text-[0.7rem] text-muted">
                <span>Fig. 02 — O pastel de feira</span>
                <span>c. 1940</span>
              </figcaption>
            </motion.figure>
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-24" stagger={0.14} amount={0.15}>
          <RevealItem
            as="p"
            className="font-display text-[1.6rem] font-[380] !leading-[1.3] text-ink md:text-[2rem]"
          >
            O pastel brasileiro carrega uma história de encontros.
          </RevealItem>
          <div className="mt-8 max-w-[60ch] space-y-6 text-[1.0625rem] text-ink-soft md:text-lg">
            <RevealItem as="p">
              Sua trajetória passa por referências da culinária asiática que, ao chegar ao Brasil, foram adaptadas aos
              ingredientes, aos costumes e ao paladar daqui.
            </RevealItem>
            <RevealItem as="p" className="relative">
              <span className="eyebrow mb-2 block text-laranja lg:absolute lg:-left-28 lg:top-1 lg:mb-0">Déc. 1940</span>
              Na década de 1940, essa receita ganhou força e começou a conquistar as ruas, as feiras e as famílias
              brasileiras.
            </RevealItem>
            <RevealItem as="p">
              De lá para cá, o pastel mudou de tamanho, formato, recheio e ocasião. Mas uma coisa permaneceu:
            </RevealItem>
          </div>
          <RevealItem
            as="blockquote"
            className="font-display mt-10 border-l-2 border-laranja pl-6 text-[1.75rem] font-[340] italic !leading-[1.25] text-bordo md:pl-8 md:text-[2.25rem]"
          >
            a capacidade de reunir pessoas em torno de algo simples, saboroso e feito para compartilhar.
          </RevealItem>

          <RevealItem variant="fade" className="mt-12 text-bordo/60 lg:hidden">
            <Sketch name="pastel" className="w-56" />
            <p className="eyebrow mt-2 text-[0.7rem] text-muted">Fig. 02 — O pastel de feira, c. 1940</p>
          </RevealItem>
        </Reveal>
      </div>

      {/* Nova etapa */}
      <div className="mt-24 border-t border-line bg-creme-dark/60 md:mt-36">
        <Reveal className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12" stagger={0.15}>
          <RevealItem as="p" className="eyebrow text-bordo lg:col-span-3 lg:pt-5">
            Hoje, a Faiber leva essa tradição para uma nova etapa.
          </RevealItem>
          <ul className="lg:col-span-9">
            {MORE.map((line, i) => (
              <RevealItem
                as="li"
                variant="left"
                key={line}
                className="group flex items-baseline gap-5 border-b border-bordo/20 py-3 first:pt-0 md:gap-8 md:py-4"
              >
                <span className="eyebrow w-8 shrink-0 text-laranja tabular-nums">+0{i + 1}</span>
                <span className="font-display text-[clamp(2.25rem,7vw,6rem)] font-[380] uppercase !leading-[1] text-bordo transition-transform duration-700 ease-editorial group-hover:translate-x-2">
                  {line}
                </span>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
