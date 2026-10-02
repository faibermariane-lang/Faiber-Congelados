import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { FOUNDERS_PHOTO } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Picture } from './ui/Picture';
import { PhotoPlaceholder } from './ui/PhotoPlaceholder';
import { Reveal, RevealItem } from './ui/Reveal';
import { MaskReveal } from './ui/MaskReveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);

  return (
    <section
      ref={ref}
      id="a-faiber"
      aria-labelledby="fundadores-title"
      className="relative isolate overflow-hidden bg-ink py-24 text-creme md:py-36"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Fotografia: do preto e branco para a cor ao entrar na tela */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <MaskReveal className="relative aspect-[4/5]" innerClassName="bg-ink-soft">
            {FOUNDERS_PHOTO ? (
              <motion.div
                style={{ y: photoY }}
                className="absolute inset-[-6%_0]"
                initial={{ filter: 'grayscale(1) contrast(1.05)' }}
                whileInView={{ filter: 'grayscale(0.15) contrast(1)' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
              >
                <Picture photo={FOUNDERS_PHOTO} sizes="(min-width: 1024px) 38vw, 92vw" />
              </motion.div>
            ) : (
              <PhotoPlaceholder sketch="pastel" label="José Moraci e Mariclei" tone="dark" />
            )}
          </MaskReveal>
          <p className="eyebrow mt-4 flex justify-between gap-4 text-[0.7rem] text-creme/60">
            <span>José Moraci Faiber &amp; Mariclei Rossi</span>
            <span>Fundadores</span>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <RevealItem>
              <Eyebrow index="07" className="text-laranja-soft">
                Os fundadores
              </Eyebrow>
            </RevealItem>
            <RevealItem
              as="h2"
              id="fundadores-title"
              className="font-display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-[380] text-creme"
            >
              José Moraci Faiber <span className="font-[300] italic text-laranja-soft">&amp;</span> Mariclei Rossi
            </RevealItem>
          </Reveal>

          <Reveal className="mt-12 space-y-6 text-creme/80 md:text-lg" stagger={0.1} amount={0.1}>
            <RevealItem as="p" className="font-display text-[1.45rem] font-[340] !leading-[1.4] text-creme md:text-[1.75rem]">
              José Moraci Faiber atua no ramo alimentício há mais de três décadas.
            </RevealItem>
            <RevealItem as="p" className="max-w-[58ch]">
              Antes mesmo da Faiber existir, já conhecia de perto os desafios, os detalhes e as possibilidades desse
              mercado. Ainda quando morava em Florianópolis, percebeu uma oportunidade que poderia se transformar em algo
              maior.
            </RevealItem>
            <RevealItem as="p" className="max-w-[58ch]">
              Em 2010, decidiu dar um passo importante: abrir sua própria fábrica ao lado da esposa, Mariclei Rossi.
            </RevealItem>
            <RevealItem as="p" className="max-w-[58ch]">
              O começo trouxe desafios. Como toda história construída do zero, a caminhada foi marcada por decisões
              difíceis, trabalho, persistência e muitos recomeços.
            </RevealItem>
            <RevealItem as="p" className="max-w-[58ch]">
              Mas também foi construída sobre algo que nunca mudou:{' '}
              <strong className="font-semibold text-creme">o cuidado com aquilo que leva o nome da família.</strong>
            </RevealItem>
            <RevealItem as="p" className="max-w-[58ch]">
              Foi assim que a Faiber cresceu. Não apenas como uma fábrica, mas como uma história construída todos os dias.
            </RevealItem>
          </Reveal>
        </div>
      </div>

      <Reveal className="container-x mt-24 md:mt-36">
        <RevealItem as="blockquote" className="border-t border-creme/20 pt-12 md:pt-16">
          <p className="font-display max-w-[24ch] text-[clamp(2rem,4.8vw,4.5rem)] font-[320] uppercase !leading-[1.04] text-creme">
            Uma história que começou em família{' '}
            <em className="font-[280] normal-case text-laranja-soft">e continua chegando à mesa de muitas outras.</em>
          </p>
        </RevealItem>
      </Reveal>
    </section>
  );
}
