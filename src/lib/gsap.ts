import type { gsap as GSAP } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';

export type GsapBundle = { gsap: typeof GSAP; ScrollTrigger: typeof ST };

let promise: Promise<GsapBundle> | null = null;

/** Carrega GSAP + ScrollTrigger sob demanda (fora do bundle inicial). */
export function loadGsap(): Promise<GsapBundle> {
  promise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return promise;
}
