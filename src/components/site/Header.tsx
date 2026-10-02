"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { header, nav, site, waLink } from "@/content";
import { selectTotal, useOrder, useUI } from "@/lib/store";
import { scrollState } from "@/lib/scroll";
import { isMotion } from "@/lib/env";
import { gsap } from "@/lib/gsap";
import { ButtonLink, Roll } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";

/** Número que troca com roll vertical. */
export function RollingNumber({ value, pad = 0, className = "" }: { value: number; pad?: number; className?: string }) {
  const text = String(value).padStart(pad, "0");
  return (
    <span className={`relative inline-flex overflow-hidden tabular-nums ${className}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Header() {
  const total = useOrder(selectTotal);
  const introDone = useUI((s) => s.introDone);
  const menuOpen = useUI((s) => s.menuOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  // transparente no topo → off-white com blur; esconde ao descer e volta ao subir
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.6);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!introDone || !bar.current || !isMotion()) return;
    gsap.fromTo(bar.current, { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 });
  }, [introDone]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-offwhite/85 shadow-[0_1px_0_rgba(107,20,32,0.07)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <div ref={bar} className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#hero" className="relative z-10 block w-[92px] shrink-0 md:w-[112px]" aria-label="Faiber Congelados — início">
            <Image src="/images/logo.png" alt="Faiber Congelados" width={653} height={372} priority className="h-auto w-full" />
          </a>

          <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-9 text-[0.95rem] text-texto">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="roll-host block py-2 transition-colors hover:text-bordo">
                    <Roll>{n.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
            <ButtonLink
              href="#cardapio"
              className="!px-5 !py-3.5 !text-[0.92rem]"
              icon={false}
              aria-label={`${header.orderCta}, ${total} itens na comanda`}
            >
              <span className="inline-flex items-center gap-1">
                {header.orderCta}{" "}
                <span className="inline-flex">
                  (<RollingNumber value={total} />)
                </span>
              </span>
            </ButtonLink>
            </div>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="label-mono flex items-center gap-3 py-3 pl-3 text-bordo lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {header.menu}
              <span className="flex w-6 flex-col gap-[5px]" aria-hidden>
                <span className="h-[1.5px] w-full bg-bordo" />
                <span className="h-[1.5px] w-2/3 self-end bg-bordo" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu returnFocus={menuBtn} total={total} />
    </>
  );
}

function MobileMenu({ returnFocus, total }: { returnFocus: React.RefObject<HTMLButtonElement | null>; total: number }) {
  const open = useUI((s) => s.menuOpen);
  const setOpen = useUI((s) => s.setMenuOpen);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    scrollState.lenis?.stop();
    document.body.style.overflow = "hidden";
    const node = panel.current;
    const focusables = () =>
      Array.from(node?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    requestAnimationFrame(() => focusables()[1]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      scrollState.lenis?.start();
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [open, setOpen, returnFocus]);

  // fecha ao passar para desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setOpen]);

  const items = [...nav.map((n) => ({ href: `#${n.id}`, label: n.label })), { href: "#cardapio", label: `${header.orderCta} (${total})` }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[85] flex flex-col bg-offwhite"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container-x flex h-[var(--header-h)] items-center justify-between">
            <a href="#hero" onClick={() => setOpen(false)} className="block w-[92px]" aria-label="Faiber Congelados — início">
              <Image src="/images/logo.png" alt="" width={653} height={372} className="h-auto w-full" />
            </a>
            <button type="button" onClick={() => setOpen(false)} className="label-mono flex items-center gap-3 py-3 pl-3 text-bordo">
              {header.close}
              <span className="relative h-4 w-5" aria-hidden>
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full rotate-45 bg-bordo" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -rotate-45 bg-bordo" />
              </span>
            </button>
          </div>

          <nav aria-label="Menu" className="container-x flex flex-1 flex-col justify-center">
            <ul className="flex flex-col gap-1">
              {items.map((it, i) => (
                <li key={it.href + i} className="overflow-hidden">
                  <motion.a
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex items-baseline gap-4 py-1 text-[clamp(2.4rem,10.5vw,5rem)] leading-[1] text-bordo"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="label-mono w-6 text-bordo/50">{String(i + 1).padStart(2, "0")}</span>
                    {it.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex flex-col gap-2 pb-10 text-[0.95rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-bordo">
              WhatsApp {site.whatsapp.display} <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={`mailto:${site.email}`} className="text-texto/80">
              {site.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
