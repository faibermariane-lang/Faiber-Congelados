"use client";

import type Lenis from "lenis";

/** Instância global do Lenis (null com movimento reduzido) e velocidade de rolagem compartilhada. */
export const scrollState: { lenis: Lenis | null; velocity: number } = { lenis: null, velocity: 0 };

export function scrollToTarget(target: string | number | HTMLElement, opts: { immediate?: boolean; offset?: number } = {}) {
  const { lenis } = scrollState;
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: opts.offset ?? 0, immediate: opts.immediate, duration: 1.4, force: true });
    return;
  }
  const y = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
  const reduced = document.documentElement.classList.contains("reduced");
  window.scrollTo({ top: y, behavior: opts.immediate || reduced ? "auto" : "smooth" });
}
