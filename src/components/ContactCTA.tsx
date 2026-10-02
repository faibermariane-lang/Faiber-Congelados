import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Mail } from 'lucide-react';
import { useRef } from 'react';
import { MESSAGES, PHOTOS } from '../content/site';
import { mailHref, whatsappHref } from '../lib/contact';
import { Picture } from './ui/Picture';
import { Reveal, RevealItem } from './ui/Reveal';
import { Sketch } from './ui/Sketch';
import { MaskReveal } from './ui/MaskReveal';
import { WhatsAppIcon } from './ui/icons';

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);
  const sketchY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-bordo text-creme">
      <motion.div style={{ y: sketchY }} aria-hidden="true" className="pointer-events-none absolute -left-12 bottom-10 -z-10 text-creme/[0.08]">
        <Sketch name="coxinha" className="w-40 -rotate-12 md:w-56" />
      </motion.div>

      <div className="grid lg:min-h-[44rem] lg:grid-cols-2">
        <div className="container-x flex flex-col justify-center py-24 md:py-32 lg:max-w-none lg:pr-16 xl:pl-[max(4rem,calc((100vw-88rem)/2+4rem))]">
          <Reveal>
            <RevealItem as="p" className="eyebrow text-laranja-soft">
              Para restaurantes, lanchonetes, padarias e mercados
            </RevealItem>
            <RevealItem
              as="h2"
              id="cta-title"
              className="font-display mt-6 text-[clamp(2.75rem,6vw,5.75rem)] font-[400] uppercase"
            >
              Tem um negócio. <em className="font-[300] normal-case text-laranja-soft">A gente tem o sabor.</em>
            </RevealItem>
            <RevealItem as="p" className="mt-8 max-w-[46ch] text-creme/85 md:text-lg">
              Da nossa fábrica para restaurantes, lanchonetes, padarias, mercados e estabelecimentos que acreditam que
              praticidade e qualidade podem andar juntas.
            </RevealItem>
            <RevealItem className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <a href={whatsappHref(MESSAGES.business)} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                <WhatsAppIcon className="size-5" />
                Falar com a Faiber
              </a>
              <a href={mailHref()} className="btn btn-outline-light">
                <Mail className="size-4" aria-hidden="true" />
                Enviar e-mail
              </a>
            </RevealItem>
          </Reveal>
        </div>

        <MaskReveal from="left" className="relative h-[28rem] sm:h-[36rem] lg:h-auto">
          <motion.div style={{ y: photoY }} className="absolute inset-[-10%_0]">
            <Picture photo={PHOTOS.vitrine} sizes="(min-width: 1024px) 50vw, 100vw" className="object-[50%_60%]" />
          </motion.div>
        </MaskReveal>
      </div>
    </section>
  );
}
