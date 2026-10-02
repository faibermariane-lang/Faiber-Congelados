'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const FRAMES = [
  { id: 'desktop', label: 'Desktop', w: 1440, h: 900 },
  { id: 'tablet', label: 'Tablet', w: 768, h: 1024 },
  { id: 'mobile', label: 'Celular', w: 390, h: 844 },
] as const;
type FrameId = (typeof FRAMES)[number]['id'];

const SECTIONS = [
  { id: 'inicio', label: 'Hero' },
  { id: 'fita', label: 'Fita' },
  { id: 'historia', label: 'História' },
  { id: 'comanda', label: 'Comanda' },
  { id: 'fundadores', label: 'Fundadores' },
  { id: 'contato', label: 'Contato' },
  { id: 'rodape', label: 'Rodapé' },
];

type Zoom = 'fit' | 0.5 | 0.75 | 1;
const GAP = 40;

export function Artboard() {
  const [zoom, setZoom] = useState<Zoom>('fit');
  const [shown, setShown] = useState<Record<FrameId, boolean>>({ desktop: true, tablet: true, mobile: true });
  const [motion, setMotion] = useState(true);
  const [sync, setSync] = useState(true);
  const [expanded, setExpanded] = useState<FrameId | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [area, setArea] = useState({ w: 1200, h: 800 });
  const areaRef = useRef<HTMLDivElement>(null);
  const iframes = useRef<Partial<Record<FrameId, HTMLIFrameElement | null>>>({});

  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setArea({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visible = FRAMES.filter((f) => (expanded ? f.id === expanded : shown[f.id]));
  const totalW = visible.reduce((s, f) => s + f.w, 0) + GAP * Math.max(0, visible.length - 1);
  const maxH = Math.max(...visible.map((f) => f.h), 1);
  const fit = Math.min(1, (area.w - 48) / totalW, (area.h - 70) / maxH);
  const scale = expanded ? fit : zoom === 'fit' ? fit : zoom;

  // rolagem sincronizada
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || !sync) return;
      const data = e.data as { type?: string; ratio?: number };
      if (data.type !== 'fb-scroll') return;
      for (const f of FRAMES) {
        const w = iframes.current[f.id]?.contentWindow;
        if (w && w !== e.source) w.postMessage({ type: 'fb-scrollTo', ratio: data.ratio }, window.location.origin);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [sync]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goto = useCallback((id: string) => {
    for (const f of FRAMES) iframes.current[f.id]?.contentWindow?.postMessage({ type: 'fb-goto', id }, window.location.origin);
  }, []);

  const src = `/?artboard=1${motion ? '' : '&motion=0'}`;
  const btn = 'rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-800 hover:bg-neutral-100 aria-pressed:border-neutral-900 aria-pressed:bg-neutral-900 aria-pressed:text-white';

  return (
    <div className="flex h-[100dvh] flex-col bg-[#e7e6e3] font-sans text-neutral-900">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-neutral-300 bg-[#f4f3f1] px-4 py-2.5">
        <strong className="text-sm">Faiber · artboard</strong>
        <div className="flex items-center gap-1.5" role="group" aria-label="Zoom">
          {(['fit', 0.5, 0.75, 1] as Zoom[]).map((z) => (
            <button key={String(z)} className={btn} aria-pressed={zoom === z} onClick={() => setZoom(z)}>
              {z === 'fit' ? 'Ajustar' : `${Number(z) * 100}%`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Molduras">
          {FRAMES.map((f) => (
            <button key={f.id} className={btn} aria-pressed={shown[f.id]} onClick={() => setShown((s) => ({ ...s, [f.id]: !s[f.id] }))}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button className={btn} onClick={() => setReloadKey((k) => k + 1)}>Recarregar</button>
          <button className={btn} aria-pressed={!motion} onClick={() => setMotion((m) => !m)}>Sem animações</button>
          <button className={btn} aria-pressed={sync} onClick={() => setSync((s) => !s)}>Rolagem sincronizada</button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Ir para seção">
          {SECTIONS.map((s) => (
            <button key={s.id} className={btn} onClick={() => goto(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        {expanded && <span className="text-[13px] text-neutral-600">ESC para voltar</span>}
      </div>

      <div
        ref={areaRef}
        className="relative flex-1 overflow-auto"
        style={{ backgroundImage: 'radial-gradient(#c9c7c2 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="flex min-w-max items-start justify-center p-6" style={{ gap: GAP * scale }}>
          {visible.map((f) => (
            <figure key={f.id} className="m-0 shrink-0">
              <figcaption className="mb-2 flex items-center justify-between gap-3 whitespace-nowrap text-[12px] text-neutral-600" style={{ width: f.w * scale }}>
                <button className="font-semibold text-neutral-800 hover:underline" onClick={() => setExpanded(expanded ? null : f.id)}>
                  {f.label} · {f.w}×{f.h}
                </button>
                {f.w * scale > 300 && <span>{expanded ? "clique para voltar" : "clique para expandir"}</span>}
              </figcaption>
              <div className="overflow-hidden rounded-md bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]" style={{ width: f.w * scale, height: f.h * scale }}>
                <iframe
                  key={`${f.id}-${reloadKey}-${motion}`}
                  ref={(el) => {
                    iframes.current[f.id] = el;
                  }}
                  title={`Faiber em ${f.label}`}
                  src={src}
                  width={f.w}
                  height={f.h}
                  style={{ transform: `scale(${scale})`, transformOrigin: '0 0', border: 0, display: 'block' }}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
