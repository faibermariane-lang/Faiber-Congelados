import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { PHOTOS, TIMELINE } from '../content/site';
import { cn } from '../lib/cn';
import { Eyebrow } from './ui/Eyebrow';
import { Picture } from './ui/Picture';
import { Reveal, RevealItem } from './ui/Reveal';
import { MaskReveal } from './ui/MaskReveal';

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [reached, setReached] = useState(reduce ? TIMELINE.length - 1 : -1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const step = TIMELINE.length - 1;
    // cada marco acende quando a linha chega até ele
    const idx = v <= 0.02 ? -1 : Math.min(step, Math.floor(v * step + 0.08));
    setReached((prev) => (reduce ? step : Math.max(prev, idx)));
  });

  return (
    <section aria-labelledby="linha-title" className="paper relative overflow-hidden bg-creme py-24 md:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <Eyebrow index="04" className="text-bordo">
              Linha do tempo
            </Eyebrow>
          </RevealItem>
          <RevealItem as="h2" id="linha-title" className="font-display text-[clamp(2rem,4vw,3.25rem)] font-[400] text-ink md:max-w-[18ch] md:text-right">
            Da primeira produção à <em className="font-[320] text-bordo">fábrica de hoje.</em>
          </RevealItem>
        </Reveal>

        <ol
          ref={listRef}
          className="relative mt-16 grid gap-12 pl-12 md:mt-24 lg:grid-cols-3 lg:gap-10 lg:pl-0 lg:pt-16"
        >
          {/* trilho + preenchimento: vertical no mobile, horizontal no desktop */}
          <span aria-hidden="true" className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-line lg:hidden" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top bg-bordo lg:hidden"
          />
          <span aria-hidden="true" className="absolute left-0 right-0 top-[0.6875rem] hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute left-0 right-0 top-[0.6875rem] hidden h-px origin-left bg-bordo lg:block"
          />

          {TIMELINE.map((item, i) => {
            const on = i <= reached;
            return (
              <li key={item.mark} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -left-12 top-1.5 grid size-6 place-items-center rounded-full border bg-creme transition-colors duration-700 lg:-top-16 lg:left-0',
                    on ? 'border-bordo' : 'border-line',
                  )}
                >
                  <span
                    className={cn(
                      'size-2.5 rounded-full transition-[transform,background-color] duration-700 ease-editorial',
                      on ? 'scale-100 bg-laranja' : 'scale-0 bg-line',
                    )}
                  />
                </span>
                <div
                  className={cn(
                    'transition-[opacity,transform] duration-1000 ease-editorial',
                    on ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-40',
                  )}
                >
                  <p className="font-display text-[clamp(3rem,6vw,5.5rem)] font-[320] !leading-none text-bordo">{item.mark}</p>
                  <h3 className="eyebrow mt-5 text-[0.9rem] text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-ink-soft">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-24 grid items-end gap-12 border-t border-line pt-16 md:mt-32 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <RevealItem
              as="p"
              className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-[320] italic !leading-[1.05] text-ink"
            >
              Porque evoluir também é uma forma de <span className="text-bordo">preservar.</span>
            </RevealItem>
          </Reveal>
          <MaskReveal className="relative aspect-[3/4] w-2/3 max-w-xs justify-self-end md:col-span-4 md:col-start-9 md:w-full">
            <Picture photo={PHOTOS.cozinha} sizes="(min-width: 768px) 20rem, 66vw" className="object-[50%_30%]" />
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
