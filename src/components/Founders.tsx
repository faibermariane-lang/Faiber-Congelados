'use client';

import { useEffect, useState } from 'react';
import { FOUNDERS } from '@/content';
import type { ImageAvailability } from '@/images';
import { whatsappHref } from '@/lib/contact';
import { motionDisabled } from '@/lib/motion';
import { useInViewOnce } from '@/lib/useInView';
import { DoodleField } from './ui/Doodles';
import { ArrowRight, WhatsAppIcon } from './ui/icons';
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
    <section id="fundadores" aria-labelledby="fundadores-title" className="relative isolate bg-pessego px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <DoodleField
        opacity={0.14}
        items={[
          { name: 'coxinha', x: 46, y: 6, size: 5, rotate: -10, speed: 70 },
          { name: 'folha', x: 92, y: 30, size: 5.5, rotate: -20, color: 'text-salsa', speed: 90 },
          { name: 'pastel', x: 52, y: 84, size: 8, rotate: 6, speed: 60 },
          { name: 'graos', x: 4, y: 90, size: 4.5, rotate: 12, speed: 40 },
        ]}
      />
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
          <h2 id="fundadores-title" className="display text-[clamp(3rem,8vw,7.5rem)] text-bordo">
            {FOUNDERS.title}
          </h2>
          <div className="apoio mt-8 max-w-[60ch] space-y-5 text-texto">
            {FOUNDERS.paragraphs.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>

          <dl ref={statsRef} className="mt-12 grid grid-cols-3 gap-4 border-t-2 border-bordo/15 pt-8 sm:gap-8">
            {FOUNDERS.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-snug text-texto/85 sm:text-base">{s.label}</dt>
                <dd className="numero-antigo text-[clamp(2.75rem,6vw,5rem)] text-laranja-forte">
                  <Count to={s.value} suffix={s.suffix} run={statsShown} />
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappHref('Olá, família Faiber! Vim pelo site e gostaria de conversar.')}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-solid mt-10"
          >
            <WhatsAppIcon className="size-5" />
            {FOUNDERS.link}
            <ArrowRight className="pill-arrow size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
