'use client';

import { useEffect, useState } from 'react';
import { FOUNDERS } from '@/content';
import type { ImageAvailability } from '@/images';
import { whatsappHref } from '@/lib/contact';
import { motionDisabled } from '@/lib/motion';
import { useInViewOnce } from '@/lib/useInView';
import { ArrowRight } from './ui/icons';
import { Photo } from './ui/Photo';

function Count({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run || motionDisabled()) return;
    const from = to >= 1000 ? to - 40 : 0;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <span className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

export function Founders({ images }: { images: ImageAvailability }) {
  const [photoRef, photoShown] = useInViewOnce<HTMLDivElement>(0.25);
  const [statsRef, statsShown] = useInViewOnce<HTMLDListElement>(0.4);

  return (
    <section id="fundadores" aria-labelledby="fundadores-title" className="bg-creme px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[90rem] items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          {/* bloco laranja deslocado atrás da foto */}
          <div aria-hidden="true" className="absolute -bottom-5 -right-3 left-8 top-10 rounded-[20px] bg-laranja sm:-bottom-7 sm:-right-6 lg:left-12" />
          <div ref={photoRef} className="relative">
            <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-[12px] bg-areia" data-shown={photoShown}>
              <Photo k="fundadores" real={images.fundadores} sizes="(min-width: 1024px) 38vw, 92vw" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="eyebrow text-laranja-texto">{FOUNDERS.eyebrow}</p>
          <h2 id="fundadores-title" className="display mt-4 text-[clamp(3rem,8vw,7.5rem)] text-bordo">
            {FOUNDERS.title}
          </h2>
          <div className="mt-8 max-w-[60ch] space-y-5 text-texto">
            {FOUNDERS.paragraphs.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>

          <dl ref={statsRef} className="mt-12 grid grid-cols-3 gap-4 border-t-2 border-bordo/15 pt-8 sm:gap-8">
            {FOUNDERS.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-snug text-texto/85 sm:text-base">{s.label}</dt>
                <dd className="display text-[clamp(2.75rem,6vw,5rem)] text-bordo">
                  <Count to={s.value} suffix={s.suffix} run={statsShown} />
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappHref('Olá, família Faiber! Vim pelo site e gostaria de conversar.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-bordo underline decoration-2 underline-offset-[6px] hover:decoration-laranja-forte"
          >
            {FOUNDERS.link}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
