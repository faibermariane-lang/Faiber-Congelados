import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CONTACT, NAV } from '../content/site';
import { cn } from '../lib/cn';
import { mailHref, whatsappHref } from '../lib/contact';
import { useActiveSection } from '../hooks/useActiveSection';
import { Logo } from './ui/Logo';
import { WhatsAppIcon } from './ui/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: trava o scroll, fecha com Esc e mantém o foco dentro do painel
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    const first = panelRef.current?.querySelector<HTMLElement>('a');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(
        Boolean,
      ) as HTMLElement[];
      const idx = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (idx <= 0 ? items.length - 1 : idx - 1) : idx === items.length - 1 ? 0 : idx + 1;
      e.preventDefault();
      items[next].focus();
    };
    document.addEventListener('keydown', onKey);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => {
      body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="eyebrow absolute left-4 top-3 z-[60] -translate-y-24 bg-bordo px-4 py-3 text-creme transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <div
        className={cn(
          'relative z-[55] transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-editorial',
          solid ? 'bg-creme/95 shadow-[0_1px_0_rgba(91,58,41,0.12),0_10px_30px_-20px_rgba(35,25,21,0.35)]' : 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-editorial',
            scrolled ? 'h-16' : 'h-20 lg:h-24',
          )}
        >
          <a href="#topo" className="relative z-10 -my-2 block shrink-0 py-2 text-bordo" aria-label="Faiber Congelados, voltar ao início">
            <Logo className={cn('h-auto transition-[width] duration-500 ease-editorial', scrolled ? 'w-[5.25rem]' : 'w-[6.25rem] lg:w-[7rem]')} title="" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'link-line py-1 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-bordo',
                      active === item.id ? 'text-bordo' : 'text-ink-soft',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !min-h-11 !px-5 !py-2.5 !text-[0.8125rem] sm:inline-flex"
            >
              Falar com a Faiber
              <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-12 place-items-center text-bordo lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3.5 w-7">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-editorial',
                    open && 'translate-y-[6px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 right-0 h-[1.5px] bg-current transition-all duration-500 ease-editorial',
                    open ? 'w-full -translate-y-[6.5px] -rotate-45' : 'w-4/6',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="paper fixed inset-0 z-50 flex flex-col overflow-y-auto bg-creme pt-24 lg:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Menu mobile" className="container-x flex-1">
              <ul className="border-t border-line">
                {[{ id: 'topo', label: 'Início' }, ...NAV].map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-5 text-ink"
                    >
                      <span className="eyebrow w-7 text-muted tabular-nums">0{i + 1}</span>
                      <span className="font-display text-[2.25rem] transition-colors group-hover:text-bordo xs:text-[2.6rem]">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="container-x grid gap-3 pb-10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <WhatsAppIcon className="size-5" />
                Falar com a Faiber
              </a>
              <a href={mailHref()} className="btn btn-ghost w-full">
                <Mail className="size-4" aria-hidden="true" />
                Enviar e-mail
              </a>
              <p className="eyebrow pt-4 text-center text-muted">
                Desde {CONTACT.foundedYear} · {CONTACT.city} — {CONTACT.stateShort}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
