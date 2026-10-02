'use client';

import { useEffect } from 'react';
import { isArtboard } from '@/lib/motion';
import { getLenis, scrollToId } from '@/lib/scroll';

/**
 * Dentro do /artboard (iframe com ?artboard=1): envia a posição de rolagem
 * ao pai e obedece comandos de rolagem/salto vindos dele.
 */
export function ArtboardBridge() {
  useEffect(() => {
    if (!isArtboard() || window.parent === window) return;
    let programmatic = false;
    let raf = 0;
    const ratio = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (programmatic) return;
        window.parent.postMessage({ type: 'fb-scroll', ratio: ratio() }, '*');
      });
    };
    const settle = () => {
      programmatic = true;
      window.setTimeout(() => (programmatic = false), 250);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { type?: string; ratio?: number; id?: string };
      if (data.type === 'fb-scrollTo' && typeof data.ratio === 'number') {
        settle();
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const top = data.ratio * max;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo(0, top);
      }
      if (data.type === 'fb-goto' && data.id) {
        settle();
        scrollToId(data.id, { immediate: true });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'fb-ready' }, '*');
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('message', onMessage);
    };
  }, []);
  return null;
}
