"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero, linkWhatsApp, mensagens } from "@/content";
import { Botao } from "./Botao";
import { HeroPrato } from "./HeroPrato";
import { IconeWhatsApp } from "./Icones";
import { Sketch, SketchField, type Posicao } from "./Sketches";

const ease = [0.22, 1, 0.36, 1] as const;

const sketches: Posicao[] = [
  { nome: "pastelMeiaLua", top: "14%", left: "3%", tamanho: 9, rotacao: -14, profundidade: 0.6 },
  { nome: "pimenta", top: "8%", left: "78%", tamanho: 6, rotacao: 18, profundidade: 0.4, soDesktop: true },
  { nome: "louro", top: "44%", left: "88%", tamanho: 7, rotacao: 10, profundidade: 0.8 },
  { nome: "azeitona", top: "62%", left: "2%", tamanho: 6.5, rotacao: -6, profundidade: 0.5 },
  { nome: "cebola", top: "82%", left: "18%", tamanho: 5.5, rotacao: 12, profundidade: 0.9, soDesktop: true },
  { nome: "salsinha", top: "74%", left: "80%", tamanho: 8, rotacao: -20, profundidade: 0.7, soDesktop: true },
  { nome: "coxinha", top: "36%", left: "12%", tamanho: 5, rotacao: 8, profundidade: 0.35, soDesktop: true },
];

function Selo() {
  const reduzir = useReducedMotion();
  return (
    <div className="relative grid size-28 place-items-center rounded-full bg-bordo text-white sm:size-32" aria-hidden="true">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={reduzir ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="selo-circulo" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <text fill="currentColor" fontSize="9" fontWeight="700" className="uppercase">
          <textPath href="#selo-circulo" textLength="230" lengthAdjust="spacing">
            {hero.selo}
          </textPath>
        </text>
      </motion.svg>
      <Sketch nome="pastelMeiaLua" className="w-11 text-laranja [&_path]:[stroke-width:3]" />
    </div>
  );
}

export function Hero() {
  const reduzir = useReducedMotion();
  // O estado inicial é sempre o mesmo no servidor e no cliente;
  // com movimento reduzido, a transição apenas dura zero.
  const entrar = (atraso: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduzir ? { duration: 0 } : { duration: 0.75, delay: atraso, ease },
  });

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <SketchField itens={sketches} />

      <div className="container-site relative">
        <div className="mx-auto text-center">
          <motion.p
            {...entrar(0)}
            className="inline-flex items-center gap-2 rounded-full bg-laranja-claro px-4 py-1.5 text-left text-[0.8rem] font-bold leading-snug text-bordo sm:text-sm"
          >
            <span className="size-2 shrink-0 rounded-full bg-bordo" aria-hidden="true" />
            {hero.chamada}
          </motion.p>

          <h1
            id="hero-titulo"
            className="mt-6 text-[length:var(--text-hero)] font-extrabold leading-[0.95] tracking-[-0.035em] text-bordo"
          >
            <motion.span {...entrar(0.08)} className="block">
              {hero.tituloLinha1}
            </motion.span>
            <motion.span {...entrar(0.18)} className="block">
              A qualidade{" "}
              <span className="relative inline-block whitespace-nowrap">
                assinou.
                <svg
                  viewBox="0 0 300 30"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-[0.12em] left-0 -z-10 h-[0.32em] w-full text-laranja"
                >
                  <motion.path
                    d="M4 20C60 8 150 4 296 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="14"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={reduzir ? { duration: 0 } : { duration: 0.8, delay: 0.75, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.span>
          </h1>
        </div>

        <div className="mt-8 grid items-center gap-8 xl:mt-4 xl:grid-cols-[1fr_minmax(0,40rem)_1fr] xl:gap-6">
          <motion.p
            {...entrar(0.3)}
            className="mx-auto max-w-xl text-center text-[1.0625rem] leading-relaxed text-tinta/90 sm:text-lg xl:order-1 xl:mx-0 xl:max-w-[19rem] xl:self-end xl:pb-16 xl:text-left"
          >
            {hero.subtitulo}
          </motion.p>

          <motion.div
            {...entrar(0.4)}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center xl:order-3 xl:flex-col xl:items-start xl:self-end xl:pb-16 [&>a]:whitespace-nowrap"
          >
            <Botao href={linkWhatsApp(mensagens.pedido)} externo tamanho="lg">
              <IconeWhatsApp className="size-5" />
              {hero.botaoPrimario}
            </Botao>
            <Botao href="#produtos" variante="secundario" tamanho="lg">
              {hero.botaoSecundario}
            </Botao>
          </motion.div>

          <div className="relative xl:order-2">
            <HeroPrato />
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={reduzir ? { duration: 0 } : { duration: 0.8, delay: 1.1, ease }}
              className="absolute -top-6 left-0 sm:left-auto sm:right-6 xl:-top-2 xl:right-2"
            >
              <Selo />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
