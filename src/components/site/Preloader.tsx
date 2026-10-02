"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PRELOADER_KEY } from "@/lib/env";
import { scrollState } from "@/lib/scroll";
import { useUI } from "@/lib/store";
import { preloader } from "@/content";

/**
 * Painel off-white com contador 00 → 100, logo revelado por clip-path e rótulo.
 * Máx. 1.8s, uma vez por sessão, com opção de pular. Ao terminar, sobe e libera o hero.
 * Só aparece quando o script de inicialização marca `html.show-preloader`.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const setIntroDone = useUI((s) => s.setIntroDone);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("show-preloader")) {
      setIntroDone();
      return;
    }
    const finish = () => {
      html.classList.remove("show-preloader");
      try {
        sessionStorage.setItem(PRELOADER_KEY, "1");
      } catch {}
      scrollState.lenis?.start();
    };

    const counter = { v: 0 };
    const t = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    t.to(counter, {
      v: 100,
      duration: 1.25,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
      },
    })
      .fromTo(logo.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power4.out" }, 0.1)
      .fromTo(logo.current, { y: 24 }, { y: 0, duration: 1, ease: "power4.out" }, 0.1)
      .fromTo(label.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.45)
      // painel sobe; o título do hero entra junto
      .add(() => setIntroDone(), 1.3)
      .to(root.current, { yPercent: -100, duration: 0.5, ease: "power4.inOut" }, 1.3)
      .add(finish);
    tl.current = t;
    return () => {
      t.kill();
    };
  }, [setIntroDone]);

  const skip = () => {
    if (!tl.current) return;
    tl.current.progress(1);
  };

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[95] flex-col items-center justify-center bg-offwhite text-bordo"
      role="status"
      aria-label="Carregando"
    >
      <div className="flex flex-col items-center gap-6">
        <div ref={logo} className="w-[min(46vw,280px)]">
          <Image src="/images/logo.png" alt="Faiber Congelados" width={653} height={372} priority className="h-auto w-full" />
        </div>
        <p ref={label} className="label-mono text-bordo/80">
          {preloader.label}
        </p>
      </div>
      <span ref={count} className="label-mono absolute bottom-[5vw] left-[5vw] text-[0.85rem] tabular-nums md:bottom-10">
        00
      </span>
      <button
        type="button"
        onClick={skip}
        className="label-mono absolute bottom-[5vw] right-[5vw] text-bordo/70 underline-offset-4 transition-colors hover:text-bordo hover:underline md:bottom-10"
      >
        {preloader.skip}
      </button>
    </div>
  );
}
