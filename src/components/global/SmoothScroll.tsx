'use client';

import { useEffect } from 'react';
import { loadGsap } from '@/lib/gsap';
import { hasFinePointer, motionDisabled } from '@/lib/motion';
import { setLenis } from '@/lib/scroll';

/** Lenis apenas em desktop com mouse; no touch fica o scroll nativo. */
export function SmoothScroll() {
  useEffect(() => {
    if (motionDisabled() || !hasFinePointer()) return;
    let cancelled = false;
    let cleanup = () => {};
    Promise.all([import('lenis'), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 }, lerp: 0.11 });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return null;
}
