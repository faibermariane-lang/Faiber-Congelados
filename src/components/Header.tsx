"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { header, linkWhatsApp, mensagens, navegacao } from "@/content";
import { IconeWhatsApp } from "./Icones";

export function Header() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 12);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoMenu.current?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const comFundo = rolou || aberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        comFundo ? "bg-creme/85 shadow-[0_1px_0_rgb(107_20_32/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <a href="#inicio" className="shrink-0" aria-label="Faiber Congelados, voltar ao início">
          <Image
            src="/images/logo.png"
            alt="Faiber Congelados"
            width={653}
            height={372}
            priority
            className="h-10 w-auto lg:h-12"
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-tinta transition-colors hover:bg-laranja-claro hover:text-bordo"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp(mensagens.geral)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-bordo px-5 text-[0.95rem] font-bold text-white transition-colors hover:bg-bordo-escuro sm:inline-flex"
          >
            <IconeWhatsApp className="size-5" />
            {header.cta}
          </a>

          <button
            ref={botaoMenu}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? header.menuFechar : header.menuAbrir}
            className="grid size-11 place-items-center rounded-full bg-bordo text-white lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  aberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  aberto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  aberto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="container-site pb-6 lg:hidden"
          >
            <ul className="rounded-[1.75rem] bg-bordo p-3 text-white">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block rounded-2xl px-5 py-3.5 font-display text-2xl font-bold tracking-tight transition-colors hover:bg-bordo-escuro"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="p-2 pt-3">
                <a
                  href={linkWhatsApp(mensagens.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-13 items-center justify-center gap-2 rounded-full bg-laranja font-bold text-tinta"
                >
                  <IconeWhatsApp className="size-5" />
                  {header.cta}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
