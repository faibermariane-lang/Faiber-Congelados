'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS, RIBBON, type Product } from '@/content';
import { IMAGES, imageSrc, type ImageAvailability } from '@/images';
import { motionDisabled } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { useOrder } from '@/store/order';

const COPIES = 4;
const BASE_SPEED = 32; // px/s

function Tile({ product, real, onPick }: { product: Product; real: boolean; onPick: () => void }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        tabIndex={-1}
        onClick={onPick}
        className="group flex h-[10.5rem] w-[10.5rem] flex-col items-center justify-between rounded-[20px] bg-creme px-2 pb-3 pt-2.5 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
      >
        <span className="relative block size-[6.75rem]">
          {real ? (
            <Image src={imageSrc(product.image)} alt="" fill sizes="108px" className="object-contain transition-transform duration-500 ease-out-expo group-hover:scale-105" draggable={false} />
          ) : (
            <span className="absolute inset-1 flex items-center justify-center rounded-[14px] border border-dashed border-bordo/35 bg-areia px-1.5 text-center font-mono text-[0.625rem] leading-tight text-bordo">
              [IMAGEM: {IMAGES[product.image].file}]
            </span>
          )}
        </span>
        <span className="whitespace-nowrap font-retro text-[0.875rem] leading-none text-bordo">{product.label}</span>
      </button>
    </li>
  );
}

export function ProductRibbon({ images }: { images: ImageAvailability }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  const flash = useOrder((s) => s.flash);
  const paused = useRef(false);

  const pick = (p: Product) => {
    flash(p.id);
    scrollToId('comanda');
  };

  useEffect(() => {
    if (motionDisabled()) {
      setStaticMode(true);
      return;
    }
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;

    let period = 0;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const copy = track.children[PRODUCTS.length] as HTMLElement | undefined;
      period = first && copy ? copy.offsetLeft - first.offsetLeft : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(band);

    // velocidade do scroll: acelera e inverte o sentido ao subir
    let lastY = window.scrollY;
    let dir = 1;
    let boost = 0;
    let offset = 0;
    let speed = BASE_SPEED;
    let prev = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) > 0.5) {
        dir = dy > 0 ? 1 : -1;
        boost = Math.min(boost + Math.abs(dy) * 4, 260);
      }
      boost *= Math.pow(0.08, dt);
      const target = paused.current ? 0 : BASE_SPEED + boost;
      speed += (target - speed) * Math.min(dt * 6, 1);
      if (visible && period > 0 && Math.abs(speed) > 0.05) {
        offset -= speed * dir * dt;
        if (offset <= -period) offset += period;
        if (offset > 0) offset -= period;
        track.style.transform = `translate3d(${offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const pause = (v: boolean) => () => (paused.current = v);

  return (
    <section id="fita" aria-labelledby="fita-title" className="relative z-10 bg-laranja shadow-[0_-12px_28px_-20px_rgba(43,10,14,0.45)]">
      <h2 id="fita-title" className="sr-only">
        {RIBBON.srTitle}
      </h2>

      {/* lista acessível; aparece ao receber foco do teclado */}
      <ul
        className="sr-only z-10 flex flex-wrap gap-2 bg-laranja p-3 focus-within:not-sr-only focus-within:absolute focus-within:inset-x-0 focus-within:top-0"
        onFocus={pause(true)}
        onBlur={pause(false)}
      >
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <a
              href="#comanda"
              onClick={(e) => {
                e.preventDefault();
                pick(p);
              }}
              className="inline-flex min-h-11 items-center rounded-full bg-creme px-4 text-sm font-bold text-bordo"
            >
              {p.label} — {RIBBON.srHint}
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={bandRef}
        aria-hidden="true"
        onPointerEnter={(e) => e.pointerType === 'mouse' && pause(true)()}
        onPointerLeave={pause(false)}
        className={`flex h-[12.5rem] items-center ${staticMode ? 'no-scrollbar overflow-x-auto' : 'overflow-hidden'}`}
      >
        <ul ref={trackRef} className="flex w-max gap-4 px-4 will-change-transform">
          {Array.from({ length: staticMode ? 1 : COPIES }).flatMap((_, c) =>
            PRODUCTS.map((p) => <Tile key={`${c}-${p.id}`} product={p} real={images[p.image]} onPick={() => pick(p)} />),
          )}
        </ul>
      </div>
    </section>
  );
}
