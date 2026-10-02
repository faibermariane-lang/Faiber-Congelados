'use client';

import { useEffect, useState } from 'react';
import { whatsappHref } from '@/lib/contact';
import { useUi } from '@/store/ui';
import { WhatsAppIcon } from '../ui/icons';

/** Botão flutuante de WhatsApp: aparece depois do hero; some com o menu ou a barra da comanda. */
export function WhatsAppFloat() {
  const [pastHero, setPastHero] = useState(false);
  // no celular, só aparece ao rolar para cima (não fica sobre o texto durante a leitura)
  const [goingUp, setGoingUp] = useState(true);
  const [wide, setWide] = useState(false);
  const menuOpen = useUi((s) => s.menuOpen);
  const barVisible = useUi((s) => s.orderBarVisible);

  useEffect(() => {
    let last = window.scrollY;
    const mq = window.matchMedia('(min-width: 64rem)');
    setWide(mq.matches);
    const onMq = () => setWide(mq.matches);
    mq.addEventListener('change', onMq);
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 8) {
        setGoingUp(y < last);
        last = y;
      }
      const hero = document.getElementById('inicio');
      const limit = hero ? hero.offsetTop + hero.offsetHeight * 0.85 : window.innerHeight;
      setPastHero(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const visible = pastHero && !menuOpen && !barVisible && (wide || goingUp);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir pelo WhatsApp (abre em nova aba)"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-bordo text-creme transition-[transform,opacity] duration-500 ease-out-expo hover:bg-texto md:bottom-6 md:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
