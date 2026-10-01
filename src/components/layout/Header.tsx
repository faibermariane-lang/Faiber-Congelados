"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { header, nav, waLink, contato } from "@/content";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { scrollToHash, useLenis } from "@/components/motion/SmoothScroll";
import { easeOutExpo } from "@/lib/motion";

export function Header() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev && !open);
  });

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      scrollToHash(lenis, href);
    },
    [lenis],
  );

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-laranja"
        style={{ scaleX: progress }}
      />
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-creme/85 backdrop-blur-md" : "bg-transparent"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
          <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="relative z-10 shrink-0" aria-label="Faiber Congelados, voltar ao início">
            <Image src="/images/logo.png" alt="Faiber Congelados" width={653} height={372} priority className="h-11 w-auto md:h-12" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-creme-escuro/70 p-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="block rounded-full px-4 py-2 text-[0.95rem] font-medium text-tinta transition-colors hover:bg-branco"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href={waLink(header.ctaMensagem)} whatsapp magnetic>
                {header.cta}
              </Button>
            </div>
            <button
              type="button"
              className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bordo text-branco lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onNavigate={go} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // trava a rolagem, fecha com ESC e prende o foco dentro do menu
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      previous?.focus?.();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-bordo px-6 pt-24 pb-10 text-branco lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.25rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.25rem)" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-5 flex size-12 items-center justify-center rounded-full bg-branco text-bordo"
            aria-label="Fechar menu"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <nav aria-label="Menu mobile" className="flex-1">
            <ul className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: easeOutExpo }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => onNavigate(e, item.href)}
                    className="block py-1 font-display text-[clamp(2.4rem,11vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] hover:text-laranja"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-col gap-4">
            <a
              href={waLink(header.ctaMensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-laranja px-8 font-bold text-tinta"
            >
              <WhatsAppIcon className="size-6" />
              {header.cta}
            </a>
            <p className="text-center text-branco/80">{contato.cidade}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
