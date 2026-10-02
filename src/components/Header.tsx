'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CONTACT, NAV } from '@/content';
import { IMAGES, imageSrc } from '@/images';
import { whatsappHref } from '@/lib/contact';
import { getLenis, scrollToId } from '@/lib/scroll';
import { totals, useOrder } from '@/store/order';
import { useUi } from '@/store/ui';
import { WhatsAppIcon } from './ui/icons';

function CountBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-1 grid min-w-6 place-items-center rounded-full bg-laranja px-1.5 text-[0.8125rem] font-bold leading-6 text-texto tabular-nums">
      {count}
      <span className="sr-only">{count === 1 ? 'item na comanda' : 'itens na comanda'}</span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const open = useUi((s) => s.menuOpen);
  const setOpen = useUi((s) => s.setMenuOpen);
  const { count } = totals(useOrder((s) => s.items));
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // fundo ao rolar; esconde ao descer e reaparece ao subir
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // menu: trava a rolagem, ESC fecha, foco preso no painel
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a,button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const els = [toggleRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>('a,button')];
      const i = els.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length].focus();
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, setOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // espera o menu fechar para destravar a rolagem
    requestAnimationFrame(() => scrollToId(id));
    history.replaceState(null, '', `#${id}`);
  };

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`relative z-[52] transition-[background-color,box-shadow] duration-300 ${
          solid ? 'bg-offwhite/90 shadow-[0_1px_0_rgba(107,20,32,0.1)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
          <a href="#inicio" onClick={go('inicio')} className="-m-2 block p-2" aria-label="Faiber Congelados, início">
            <Image src={imageSrc('logo')} alt="" width={IMAGES.logo.width} height={IMAGES.logo.height} priority className="h-auto w-[5.5rem] lg:w-[6.25rem]" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={go(n.id)}
                    className="rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-texto transition-colors hover:bg-creme hover:text-bordo"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#comanda" onClick={go('comanda')} className="pill pill-solid pill-sm">
              <span className="hidden sm:inline">Fazer pedido</span>
              <span className="sm:hidden">Pedir</span>
              <CountBadge count={count} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid size-11 place-items-center rounded-full text-bordo hover:bg-creme lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-0.5 w-full rounded bg-current transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded bg-current transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Menu mobile em tela cheia (fora do header: o translate dele prenderia o position:fixed) */}
      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[45] overflow-y-auto bg-offwhite pt-[4.5rem] lg:hidden"
      >
        <nav aria-label="Menu" className="flex min-h-full flex-col px-4 pb-8 pt-6 sm:px-6">
          <ul className="flex-1">
            {NAV.map((n, i) => (
              <li key={n.id} className="border-b border-bordo/15">
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="display flex items-baseline justify-between py-4 text-[3.25rem] text-bordo transition-colors hover:text-laranja-forte"
                >
                  {n.label}
                  <span className="font-mono text-sm font-normal tracking-normal text-texto/70">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="pill pill-solid w-full">
              <WhatsAppIcon className="size-5" />
              Pedir pelo WhatsApp
            </a>
            <p className="pt-3 text-center text-sm text-texto/80">
              {CONTACT.city}, Oeste de {CONTACT.state} · desde {CONTACT.foundedYear}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
