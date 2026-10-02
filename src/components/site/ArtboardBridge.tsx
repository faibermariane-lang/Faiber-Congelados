"use client";

import { useEffect } from "react";
import { isArtboard } from "@/lib/env";
import { scrollState, scrollToTarget } from "@/lib/scroll";
import { ScrollTrigger } from "@/lib/gsap";

type Msg =
  | { type: "faiber:scrollTo"; id: string; immediate?: boolean }
  | { type: "faiber:scrollProgress"; p: number };

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Ponte com o /artboard (só com ?artboard=1): recebe comandos de rolagem do pai
 * e informa a posição proporcional para a rolagem sincronizada.
 * Também expõe `window.__faiber` para o script de capturas.
 */
export function ArtboardBridge() {
  useEffect(() => {
    const api = {
      scrollTo(id: string, immediate = true) {
        const el = document.getElementById(id);
        if (!el) return false;
        if (immediate) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          if (scrollState.lenis) scrollState.lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo(0, y);
          ScrollTrigger.update();
        } else scrollToTarget(el);
        return true;
      },
      scrollToY(y: number) {
        if (scrollState.lenis) scrollState.lenis.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
        ScrollTrigger.update();
      },
    };
    (window as unknown as { __faiber: typeof api }).__faiber = api;

    if (!isArtboard() || window.parent === window) return;

    let applying = false;
    const onMessage = (e: MessageEvent<Msg>) => {
      if (e.source !== window.parent || !e.data || typeof e.data !== "object") return;
      if (e.data.type === "faiber:scrollTo") api.scrollTo(e.data.id, e.data.immediate ?? false);
      if (e.data.type === "faiber:scrollProgress") {
        applying = true;
        api.scrollToY(e.data.p * maxScroll());
        requestAnimationFrame(() => (applying = false));
      }
    };
    let raf = 0;
    const onScroll = () => {
      if (applying) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const m = maxScroll();
        window.parent.postMessage({ type: "faiber:scroll", p: m > 0 ? window.scrollY / m : 0 }, window.location.origin);
      });
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.parent.postMessage({ type: "faiber:ready" }, window.location.origin);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
