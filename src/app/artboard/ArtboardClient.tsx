"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sections } from "@/content";

const FRAMES = [
  { key: "desktop", label: "Desktop · 1440", w: 1440, h: 900 },
  { key: "tablet", label: "Tablet · 768", w: 768, h: 1024 },
  { key: "mobile", label: "Celular · 390", w: 390, h: 844 },
] as const;
type FrameKey = (typeof FRAMES)[number]["key"];
type Zoom = 0.5 | 0.75 | 1 | "fit";

const GAP = 48;
const PAD = 40;
const TOOLBAR = 112;
const LABEL = 30;

export function ArtboardClient() {
  const [zoom, setZoom] = useState<Zoom>("fit");
  const [visible, setVisible] = useState<Record<FrameKey, boolean>>({ desktop: true, tablet: true, mobile: true });
  const [noMotion, setNoMotion] = useState(false);
  const [sync, setSync] = useState(true);
  const [nonce, setNonce] = useState(0);
  const [focus, setFocus] = useState<FrameKey | null>(null);
  const [vw, setVw] = useState({ w: 1600, h: 1000 });
  const iframes = useRef<Partial<Record<FrameKey, HTMLIFrameElement | null>>>({});
  const lockUntil = useRef<Partial<Record<FrameKey, number>>>({});

  useEffect(() => {
    const onResize = () => setVw({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const shown = FRAMES.filter((f) => visible[f.key]);

  const scale = useMemo(() => {
    if (zoom !== "fit") return zoom;
    const totalW = shown.reduce((a, f) => a + f.w, 0) + GAP * Math.max(0, shown.length - 1);
    const maxH = Math.max(...shown.map((f) => f.h), 1);
    return Math.min(1, (vw.w - PAD * 2) / Math.max(totalW, 1), (vw.h - TOOLBAR - LABEL - PAD) / maxH);
  }, [zoom, shown, vw]);

  const src = `/?artboard=1${noMotion ? "&motion=0" : ""}`;

  const post = useCallback((key: FrameKey, msg: unknown) => {
    iframes.current[key]?.contentWindow?.postMessage(msg, window.location.origin);
  }, []);

  // durante um salto, cada moldura rola até a própria seção; a sincronização proporcional fica suspensa
  const jumpUntil = useRef(0);
  const jump = (id: string) => {
    jumpUntil.current = performance.now() + 2000;
    FRAMES.forEach((f) => post(f.key, { type: "faiber:scrollTo", id }));
  };

  // rolagem sincronizada: a moldura que rola comanda as outras (posição proporcional)
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== "faiber:scroll" || !sync) return;
      const from = FRAMES.find((f) => iframes.current[f.key]?.contentWindow === e.source)?.key;
      if (!from) return;
      const now = performance.now();
      if (now < jumpUntil.current) return;
      if ((lockUntil.current[from] ?? 0) > now) return;
      FRAMES.forEach((f) => {
        if (f.key === from || !visible[f.key]) return;
        lockUntil.current[f.key] = now + 250;
        post(f.key, { type: "faiber:scrollProgress", p: e.data.p });
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [sync, visible, post]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFocus(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const focusFrame = shown.find((f) => f.key === focus);
  const focusScale = focusFrame ? Math.min(1, (vw.w - PAD * 2) / focusFrame.w, (vw.h - TOOLBAR - LABEL - PAD) / focusFrame.h) : 1;

  const btn = "rounded-[6px] border border-black/10 bg-white px-2.5 py-1.5 transition-colors hover:border-black/30";
  const on = "!border-[#6B1420] !bg-[#6B1420] !text-white";

  const renderFrame = (f: (typeof FRAMES)[number], s: number, hidden = false) => (
    <div key={f.key} className="shrink-0" style={hidden ? { display: "none" } : undefined}>
      <button
        type="button"
        onClick={() => setFocus(focus === f.key ? null : f.key)}
        className="mb-2 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-black/60 hover:text-black"
        title={focus ? "Voltar (ESC)" : "Expandir (modo foco)"}
      >
        <span>{f.label}</span>
        <span>{focus === f.key ? "ESC ↙" : "Expandir ↗"}</span>
      </button>
      <div
        onClick={() => !focus && setFocus(f.key)}
        className="cursor-zoom-in overflow-hidden border border-black/15 bg-white p-0 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
        style={{ width: f.w * s, height: f.h * s, cursor: focus ? "default" : undefined }}
      >
        <iframe
          key={`${f.key}-${nonce}-${noMotion}`}
          ref={(el) => {
            iframes.current[f.key] = el;
          }}
          src={src}
          title={f.label}
          width={f.w}
          height={f.h}
          className="block origin-top-left border-0"
          style={{ width: f.w, height: f.h, transform: `scale(${s})`, pointerEvents: focus === f.key || !focus ? "auto" : "none" }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen font-sans text-[13px] text-black/80"
      style={{
        backgroundColor: "#E9E6E0",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.13) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#F4F2EE]/95 px-5 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em]">
          <strong className="text-[#6B1420]">Faiber · Artboard</strong>
          <div className="flex items-center gap-1.5">
            <span className="mr-1 text-black/50">Zoom</span>
            {([0.5, 0.75, 1, "fit"] as Zoom[]).map((z) => (
              <button key={String(z)} className={`${btn} ${zoom === z ? on : ""}`} onClick={() => setZoom(z)}>
                {z === "fit" ? "Ajustar" : `${Number(z) * 100}%`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="mr-1 text-black/50">Molduras</span>
            {FRAMES.map((f) => (
              <button
                key={f.key}
                className={`${btn} ${visible[f.key] ? on : ""}`}
                onClick={() => setVisible((v) => ({ ...v, [f.key]: !v[f.key] }))}
                aria-pressed={visible[f.key]}
              >
                {f.key === "desktop" ? "Desktop" : f.key === "tablet" ? "Tablet" : "Celular"}
              </button>
            ))}
          </div>
          <button className={btn} onClick={() => setNonce((n) => n + 1)}>
            Recarregar
          </button>
          <button className={`${btn} ${noMotion ? on : ""}`} onClick={() => setNoMotion((v) => !v)} aria-pressed={noMotion}>
            Sem animações
          </button>
          <button className={`${btn} ${sync ? on : ""}`} onClick={() => setSync((v) => !v)} aria-pressed={sync}>
            Rolagem sincronizada
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em]">
          <span className="mr-1 text-black/50">Ir para</span>
          {sections.map((s) => (
            <button key={s.id} className={btn} onClick={() => jump(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-center gap-12 px-10 pb-16" style={{ paddingTop: TOOLBAR, gap: GAP }}>
        {shown.map((f) => (focus ? renderFrame(f, focusScale, f.key !== focus) : renderFrame(f, scale)))}
      </div>
    </div>
  );
}
