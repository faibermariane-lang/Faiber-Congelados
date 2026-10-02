'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useOrder } from '@/store/order';
import { ArtboardBridge } from './global/ArtboardBridge';
import { ReadingProgress } from './global/ReadingProgress';
import { SmoothScroll } from './global/SmoothScroll';
import { WhatsAppFloat } from './global/WhatsAppFloat';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    void useOrder.persist.rehydrate();
  }, []);

  // a prancheta de desenvolvimento não recebe os elementos globais do site
  if (pathname?.startsWith('/artboard')) return <>{children}</>;

  return (
    <>
      <a
        href="#conteudo"
        className="pill pill-solid pill-sm fixed left-4 top-3 z-[80] -translate-y-24 focus-visible:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <ReadingProgress />
      <SmoothScroll />
      <ArtboardBridge />
      {children}
      <WhatsAppFloat />
      <div className="paper-grain" aria-hidden="true" />
    </>
  );
}
