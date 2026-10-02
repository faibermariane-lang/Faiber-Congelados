'use client';

import { useEffect, useRef, useState } from 'react';
import { HISTORY, type HistoryStep } from '@/content';
import type { ImageAvailability } from '@/images';
import { motionDisabled } from '@/lib/motion';
import { getLenis } from '@/lib/scroll';
import { DigitRoll } from './ui/DigitRoll';
import { Photo } from './ui/Photo';

const yearOf = (s: HistoryStep, current: number) => s.year ?? current;

function Title({ step }: { step: HistoryStep }) {
  if (!step.highlight) return <>{step.title}</>;
  const i = step.title.indexOf(step.highlight);
  return (
    <>
      {step.title.slice(0, i)}
      <span className="text-bordo">{step.highlight}</span>
      {step.title.slice(i + step.highlight.length)}
    </>
  );
}

export function History({ images }: { images: ImageAvailability }) {
  const steps = HISTORY.steps;
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => setYear(new Date().getFullYear()), []);

  // modo pinado: desktop com movimento. Sticky nativo + progresso do scroll
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)');
    const update = () => setPinned(mq.matches && !motionDisabled());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!pinned) {
      // lista vertical: linha do tempo completa, marcos funcionam como âncoras
      setActive(steps.length - 1);
      if (fillRef.current) fillRef.current.style.transform = 'scaleX(1)';
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / total));
        setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${Math.min(1, p * 1.15)})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned, steps.length]);

  /** marco da linha do tempo: no modo pinado, rola até a etapa; fora dele, âncora */
  const goTo = (i: number) => (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!pinned || !el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    const y = top + ((i + 0.5) / steps.length) * total;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section
      id="historia"
      ref={sectionRef}
      aria-labelledby="historia-title"
      className="relative bg-creme pin:h-[330svh]"
    >
      <h2 id="historia-title" className="sr-only">
        {HISTORY.title}
      </h2>

      <div className="relative pin:sticky pin:top-0 pin:flex pin:h-[100svh] pin:flex-col pin:overflow-hidden">
        {/* ano gigante ao fundo (modo pinado) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden items-center justify-center pin:flex">
          <DigitRoll
            value={yearOf(steps[active], year)}
            className="display text-[clamp(14rem,38vw,38rem)] text-bordo/[0.09]"
          />
        </div>

        {/* linha do tempo */}
        <nav aria-label="Linha do tempo" className="relative mx-auto w-full max-w-[90rem] px-4 pt-16 sm:px-6 lg:px-10 pin:order-last pin:pb-10 pin:pt-4">
          <div className="relative">
            <span aria-hidden="true" className="absolute inset-x-0 top-[1.375rem] h-0.5 bg-bordo/15" />
            <span ref={fillRef} aria-hidden="true" className="absolute inset-x-0 top-[1.375rem] h-0.5 origin-left scale-x-0 bg-bordo" />
            <ol className="relative flex justify-between">
              {steps.map((s, i) => (
                <li key={s.id} className="flex flex-col items-center first:items-start last:items-end">
                  <a
                    href={`#${s.id}`}
                    onClick={goTo(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className="group flex min-h-11 flex-col items-center gap-2 px-2 first:items-start"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-4 block rounded-full border-2 border-bordo transition-all duration-500 ease-out-expo ${
                        i <= active ? 'bg-bordo' : 'bg-creme'
                      } ${i === active ? 'size-5 -mt-0.5' : 'size-3.5 mt-0.5'}`}
                    />
                    <span className={`font-mono text-sm transition-colors ${i === active ? 'font-semibold text-bordo' : 'text-texto/75 group-hover:text-bordo'}`}>
                      {s.marker}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="relative mx-auto w-full max-w-[90rem] flex-1 px-4 sm:px-6 lg:px-10 pin:grid pin:pt-28">
          {steps.map((s, i) => {
            const isActive = !pinned || i === active;
            return (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-t`}
                data-active={i === active}
                data-past={i < active}
                className="relative grid gap-8 border-bordo/15 py-20 lg:grid-cols-12 lg:gap-10 [&:not(:first-child)]:border-t pin:pointer-events-none pin:translate-y-8 pin:border-0 pin:py-0 pin:opacity-0 pin:transition-[opacity,transform] pin:duration-700 pin:ease-out-expo pin:[grid-area:1/1] pin:data-[active=true]:pointer-events-auto pin:data-[active=true]:translate-y-0 pin:data-[active=true]:opacity-100 pin:data-[past=true]:-translate-y-8"
              >
                {/* ano ao fundo (lista vertical) */}
                <p aria-hidden="true" className="display pointer-events-none absolute -top-2 right-0 text-[clamp(9rem,30vw,22rem)] text-bordo/[0.08] pin:hidden">
                  {yearOf(s, year)}
                </p>

                <div className="relative lg:col-span-5">
                  <p className="eyebrow text-laranja-texto">{s.eyebrow}</p>
                  <h3 id={`${s.id}-t`} className="display mt-4 text-[clamp(2.75rem,5.4vw,5.5rem)] text-texto">
                    <Title step={s} />
                  </h3>
                </div>

                <div className="relative max-w-[60ch] lg:col-span-6 lg:col-start-7 lg:pt-8">
                  <div className="space-y-5 text-texto">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 20)}>{p}</p>
                    ))}
                  </div>
                  {s.quote && (
                    <p className="mt-6 border-l-4 border-bordo pl-5 text-[1.1875rem] font-medium leading-snug text-bordo lg:text-[1.3125rem]">
                      {s.quote}
                    </p>
                  )}
                  {s.image && (
                    <div className="reveal-clip relative mt-8 aspect-[16/10] max-w-[30rem] overflow-hidden rounded-[10px]" data-shown={isActive}>
                      <Photo k={s.image} real={images[s.image]} sizes="(min-width: 1024px) 30rem, 90vw" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
