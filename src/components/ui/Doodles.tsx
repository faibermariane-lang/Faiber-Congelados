'use client';

import { useEffect, useRef } from 'react';
import { motionDisabled } from '@/lib/motion';

/**
 * Desenhos de fundo em traço (pastéis, coxinhas e temperos), em opacidade baixa.
 * São decorativos: aria-hidden e sem receber cliques.
 */

const PATHS = {
  pastel: {
    vb: '0 0 120 80',
    d: 'M8 66C8 30 34 8 62 8s52 22 52 58ZM14 62h94M20 56l-4 6M30 56l-4 6M40 56l-4 6M50 56l-4 6M60 56l-4 6M70 56l-4 6M80 56l-4 6M90 56l-4 6M100 56l-4 6M44 32c4-3 9-3 12 0M70 26c3-2 7-2 9 0M58 44c3-2 6-2 8 0',
  },
  pastelRet: {
    vb: '0 0 120 84',
    d: 'M10 14h100v56H10ZM16 20h88v44H16ZM10 24h6M10 34h6M10 44h6M10 54h6M104 24h6M104 34h6M104 44h6M104 54h6M24 14v6M36 14v6M48 14v6M60 14v6M72 14v6M84 14v6M96 14v6M24 64v6M36 64v6M48 64v6M60 64v6M72 64v6M84 64v6M96 64v6M40 36c4-3 8-3 11 0M66 44c3-2 7-2 9 0',
  },
  coxinha: {
    vb: '0 0 80 110',
    d: 'M40 6C44 22 66 46 70 70c4 22-12 34-30 34S6 92 10 70C14 46 36 22 40 6ZM40 6c-2-3-1-5 2-6M28 60h.1M48 52h.1M38 74h.1M54 80h.1M24 84h.1M44 92h.1M32 44h.1',
  },
  pimenta: {
    vb: '0 0 120 60',
    d: 'M24 22c22-4 52 2 74 20 8 6 14 14 16 16-12-2-30-6-48-10-20-4-36-6-44-10-8-4-6-14 2-16ZM24 22c-4-6-10-10-18-10 2 6 6 12 12 14',
  },
  folha: {
    vb: '0 0 90 120',
    d: 'M46 116C44 90 44 60 50 30M48 80C34 80 18 70 12 54c16-2 30 8 36 26ZM48 80C38 72 26 64 16 58M49 58c14-2 28-14 32-30-16 0-28 12-32 30ZM49 58c10-10 20-20 30-28M50 34C40 30 32 20 32 8c12 4 18 14 18 26Z',
  },
  alho: {
    vb: '0 0 80 90',
    d: 'M40 8c-2 8-6 12-12 18C14 38 10 52 14 64c4 14 14 20 26 20s22-6 26-20c4-12 0-26-14-38-6-6-10-10-12-18ZM40 8V2M30 34c-6 10-8 24-4 38M50 34c6 10 8 24 4 38M40 30v52',
  },
  graos: {
    vb: '0 0 80 50',
    d: 'M14 28a7 7 0 1 0 14 0a7 7 0 1 0-14 0ZM34 18a6 6 0 1 0 12 0a6 6 0 1 0-12 0ZM50 34a7 7 0 1 0 14 0a7 7 0 1 0-14 0ZM18 26c2-2 4-2 6 0M38 16c2-2 3-2 5 0M54 32c2-2 4-2 6 0',
  },
  tomate: {
    vb: '0 0 90 90',
    d: 'M45 18c22 0 38 14 38 34S67 84 45 84 7 72 7 52s16-34 38-34ZM45 18c-4-6-10-8-16-6 6 4 10 6 16 6 6 0 10-2 16-6-6-2-12 0-16 6ZM45 18c0-6 2-10 6-12M20 40c-4 6-4 14-2 20',
  },
} as const;

export type DoodleName = keyof typeof PATHS;

export type DoodleSpec = {
  name: DoodleName;
  /** posição em % da seção */
  x: number;
  y: number;
  /** largura em rem */
  size: number;
  rotate?: number;
  /** classe de cor (ex.: text-bordo) */
  color?: string;
  /** deslocamento por parallax, em px ao longo da seção */
  speed?: number;
};

export function Doodle({ name, className }: { name: DoodleName; className?: string }) {
  const p = PATHS[name];
  return (
    <svg viewBox={p.vb} className={className} aria-hidden="true" focusable="false">
      <path d={p.d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Campo de desenhos posicionados, com parallax suave conforme a rolagem. */
export function DoodleField({ items, opacity = 0.12, className = '' }: { items: DoodleSpec[]; opacity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;
    const nodes = Array.from(el.children) as HTMLElement[];
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) update();
    });
    io.observe(el);
    const update = () => {
      raf = 0;
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height) - 0.5; // -0.5 → 0.5
      nodes.forEach((n, i) => {
        const s = items[i]?.speed ?? 60;
        n.style.translate = `0 ${(-p * s).toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} style={{ opacity }}>
      {items.map((it, i) => (
        <div
          key={i}
          className={`absolute ${it.color ?? 'text-bordo'}`}
          style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.size}rem`, rotate: `${it.rotate ?? 0}deg` }}
        >
          <Doodle name={it.name} className="h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
