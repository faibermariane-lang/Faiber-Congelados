import type Lenis from 'lenis';

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export const getLenis = () => lenis;

/** Rola até uma seção respeitando o header e o modo sem animação. */
export function scrollToId(id: string, opts: { immediate?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === 'inicio' ? 0 : -80;
  if (lenis) {
    lenis.scrollTo(el, { offset, immediate: opts.immediate, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    const reduce = document.documentElement.dataset.motion === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: opts.immediate || reduce ? 'auto' : 'smooth' });
  }
}
