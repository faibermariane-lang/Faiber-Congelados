import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { CONTACT, PHOTOS } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Picture } from './ui/Picture';
import { Reveal, RevealItem } from './ui/Reveal';
import { Sketch } from './ui/Sketch';
import { MaskReveal } from './ui/MaskReveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export function CompanyStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);
  const rollX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-80, 120]);

  return (
    <section
      ref={ref}
      id="historia"
      aria-labelledby="historia-title"
      className="relative isolate overflow-hidden bg-bordo py-24 text-creme md:py-36"
    >
      <motion.div style={{ x: rollX }} aria-hidden="true" className="pointer-events-none absolute right-[-4rem] top-16 -z-10 text-creme/[0.08]">
        <Sketch name="rolo" className="w-[26rem] -rotate-6 md:w-[36rem]" />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute -left-10 bottom-24 -z-10 text-creme/[0.07]">
        <Sketch name="trigo" className="w-32 rotate-[14deg] md:w-44" />
      </div>

      <div className="container-x">
        <Reveal>
          <RevealItem>
            <Eyebrow index="03" className="text-laranja-soft">
              Nossa história
            </Eyebrow>
          </RevealItem>
          <RevealItem
            as="h2"
            id="historia-title"
            className="font-display mt-6 max-w-[16ch] text-[clamp(2.5rem,6.4vw,6rem)] font-[400] uppercase"
          >
            Uma história de família.{' '}
            <em className="font-[300] normal-case text-laranja-soft">Uma fábrica em constante evolução.</em>
          </RevealItem>
        </Reveal>

        {/* 2010 → HOJE */}
        <div className="mt-16 flex items-center gap-4 md:mt-24 md:gap-8" aria-label={`De ${CONTACT.foundedYear} até hoje`} role="img">
          <motion.span
            className="font-display text-[clamp(3.5rem,11vw,10rem)] font-[300] leading-none tabular-nums"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {CONTACT.foundedYear}
          </motion.span>
          <span className="relative h-px flex-1" aria-hidden="true">
            <motion.span
              className="absolute inset-0 origin-left bg-creme/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.svg
              viewBox="0 0 12 12"
              className="absolute -right-0.5 top-1/2 size-3 -translate-y-1/2 text-creme/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 }}
            >
              <path d="M1 1l10 5-10 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </motion.svg>
            <motion.span
              className="eyebrow absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-[0.7rem] text-creme/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {CONTACT.city} — {CONTACT.stateShort}
            </motion.span>
          </span>
          <motion.span
            className="font-display text-[clamp(3.5rem,11vw,10rem)] font-[300] italic leading-none text-laranja-soft"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
          >
            Hoje
          </motion.span>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <MaskReveal className="relative aspect-[4/5] lg:col-span-5" innerClassName="bg-bordo-deep">
            <motion.div style={{ y: photoY }} className="absolute inset-[-8%_0]">
              <Picture photo={PHOTOS.loja} sizes="(min-width: 1024px) 38vw, 92vw" className="object-[50%_35%]" />
            </motion.div>
            <figcaption className="eyebrow absolute bottom-0 left-0 bg-bordo px-4 py-3 text-[0.7rem] text-creme/80">
              Fig. 03 — Na loja, o pastel do dia
            </figcaption>
          </MaskReveal>

          <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-center" stagger={0.12} amount={0.2}>
            <RevealItem as="p" className="font-display text-[1.5rem] font-[360] !leading-[1.35] md:text-[1.875rem]">
              Em {CONTACT.foundedYear}, em {CONTACT.city}, {CONTACT.state}, começamos a transformar uma oportunidade em um
              novo capítulo da nossa família.
            </RevealItem>
            <div className="mt-8 max-w-[58ch] space-y-5 text-creme/85 md:text-lg">
              <RevealItem as="p">Desde então, a Faiber cresceu.</RevealItem>
              <RevealItem as="p">
                Vieram novos produtos, novos processos, novos equipamentos e uma estrutura cada vez mais preparada para
                atender diferentes negócios.
              </RevealItem>
              <RevealItem as="p">Mas crescer nunca significou deixar de fazer do nosso jeito.</RevealItem>
            </div>

            <dl className="mt-12 border-t border-creme/20">
              <RevealItem className="grid gap-1 border-b border-creme/20 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1.5 text-laranja-soft">Processo</dt>
                <dd className="font-display text-[1.375rem] font-[380] !leading-snug md:text-2xl">
                  A tecnologia entrou para melhorar o processo.
                </dd>
              </RevealItem>
              <RevealItem className="grid gap-1 border-b border-creme/20 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1.5 text-laranja-soft">Produto</dt>
                <dd className="font-display text-[1.375rem] font-[380] italic !leading-snug md:text-2xl">
                  A tradição continuou guiando o produto.
                </dd>
              </RevealItem>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
