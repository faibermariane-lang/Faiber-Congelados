"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Ilustrações em traço fino, estilo nanquim, desenhadas à mão.
 * Cada uma ocupa um viewBox 100x100 e herda a cor via currentColor.
 */
const desenhos = {
  pastelMeiaLua: (
    <>
      <path d="M9 69C11 41 31 20 52 19c20-1 38 20 40 49-8 4-27 6-43 6-16 0-30-2-40-5z" />
      <path d="M17 64c3-22 18-37 35-38 17 0 30 15 33 37" strokeDasharray="1.5 5.5" />
      <path d="M38 47c1-1 3-1 4 0M58 40c1-1 3 0 3 1M64 56c1 0 2 1 2 2M46 60c1-1 2-1 3 0" />
      <path d="M12 72c12 4 26 5 39 5 14 0 29-2 39-6" />
    </>
  ),
  pastelRetangulo: (
    <>
      <path d="M13 30c22-3 50-4 74 0 2 14 2 28 0 42-24 3-52 3-75 0-2-14-1-28 1-42z" />
      <path d="M20 37c19-2 41-2 60 0 1 10 1 19 0 28-19 2-41 2-60 0-1-9-1-19 0-28z" strokeDasharray="1.5 5" />
      <path d="M35 47c1-1 3-1 3 1M55 44c1-1 3 0 3 1M47 56c1-1 2-1 3 0M66 55c1-1 2 0 2 1" />
      <path d="M14 75c22 2 50 3 73 0" />
    </>
  ),
  coxinha: (
    <>
      <path d="M50 11c3 11 26 34 27 56 1 16-12 24-27 24-16 0-27-8-26-24 1-21 23-44 26-56z" />
      <path d="M31 84c12 4 26 4 39 0" />
      <path d="M41 45l1 1M57 50l1 1M47 62l1 1M62 68l1 1M37 70l1 1M53 34l1 1M45 78l1 1" />
      <path d="M48 16c-3 8-10 18-15 27" />
    </>
  ),
  pimenta: (
    <>
      <path d="M31 31c15-1 31 10 41 27 7 12 13 22 18 28-12-1-28-9-40-21C39 54 29 45 31 31z" />
      <path d="M24 35c1-6 9-9 14-5" />
      <path d="M30 31c-4-6-5-13-1-19" />
      <path d="M40 40c8 4 16 12 22 21" />
    </>
  ),
  azeitona: (
    <>
      <path d="M22 44c0-16 30-24 41-9 9 13-3 34-20 34-13 0-21-10-21-25z" />
      <path d="M36 42c1-5 9-6 11-1 1 4-3 8-7 7-3 0-4-3-4-6z" />
      <path d="M58 58c2-14 28-17 32-2 3 13-10 24-22 21-8-3-11-10-10-19z" />
      <path d="M70 60c1-4 7-4 8 0 0 3-2 5-5 5-2 0-3-2-3-5z" />
      <path d="M27 38c2-4 6-7 10-8" />
    </>
  ),
  salsinha: (
    <>
      <path d="M50 92c-1-20-2-36 0-52M50 66c-8-6-15-9-23-10M51 58c7-6 14-10 22-11" />
      <path d="M38 36c-5-8 2-17 8-15 2-8 13-8 15 0 8-2 12 8 5 14-5 5-23 7-28 1z" />
      <path d="M17 60c-6-6-1-15 5-14 1-7 11-8 13-1 7 0 8 9 2 13-5 4-16 6-20 2z" />
      <path d="M66 50c-3-8 4-15 10-12 3-6 13-4 13 3 6 2 5 11-2 13-6 2-18 2-21-4z" />
      <path d="M50 40l-4-8M50 40l6-9" />
    </>
  ),
  pimentao: (
    <>
      <path d="M30 34c-9 6-9 32 2 46 8 10 16 4 18 0 4 8 14 10 20 0 10-14 10-40 0-46-8-6-14-2-20-2s-12-4-20 2z" />
      <path d="M50 34c-2 16 0 32 0 46M36 40c-4 12-3 26 2 36M64 40c4 12 3 26-2 36" />
      <path d="M50 32c0-8 4-14 10-16" />
      <path d="M42 33c4-3 12-3 16 0" />
    </>
  ),
  cebola: (
    <>
      <path d="M50 14c2 12 26 26 28 46 2 18-12 28-28 28S20 78 22 60c2-20 26-34 28-46z" />
      <path d="M50 18c-4 18-12 38-8 68M50 18c6 18 12 38 8 68M50 18c-1 22-1 46 0 70" />
      <path d="M43 88l-3 6M50 88v7M57 88l3 6" />
      <path d="M50 14c-1-3 0-6 2-8" />
    </>
  ),
  louro: (
    <>
      <path d="M13 81c15-30 45-56 75-67-7 30-34 62-75 67z" />
      <path d="M13 81c25-22 48-44 75-67" />
      <path d="M30 66c4 0 9 1 13 3M42 55c4 0 9 1 13 4M55 43c4 0 8 1 11 3M36 60c0-5 1-9 3-12M49 48c0-4 1-8 3-11M62 36c0-3 1-7 2-9" />
    </>
  ),
} as const;

export type NomeDesenho = keyof typeof desenhos;

export function Sketch({ nome, className }: { nome: NomeDesenho; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {desenhos[nome]}
    </svg>
  );
}

export type Posicao = {
  nome: NomeDesenho;
  /** posição em % da seção */
  top: string;
  left: string;
  /** largura em rem */
  tamanho: number;
  rotacao?: number;
  /** intensidade do parallax: 0 (parado) a 1 */
  profundidade?: number;
  /** esconde no celular para não poluir */
  soDesktop?: boolean;
};

function SketchParallax({
  item,
  progresso,
  reduzir,
}: {
  item: Posicao;
  progresso: ReturnType<typeof useScroll>["scrollYProgress"];
  reduzir: boolean;
}) {
  const desloc = (item.profundidade ?? 0.5) * 90;
  const y = useTransform(progresso, [0, 1], [desloc, -desloc]);
  return (
    <motion.div
      className={`absolute ${item.soDesktop ? "hidden md:block" : ""}`}
      style={{
        top: item.top,
        left: item.left,
        width: `${item.tamanho}rem`,
        rotate: item.rotacao ?? 0,
        y: reduzir ? 0 : y,
      }}
    >
      <Sketch nome={item.nome} className="h-auto w-full" />
    </motion.div>
  );
}

/** Camada de sketches ao fundo de uma seção, com parallax suave. */
export function SketchField({ itens, className = "" }: { itens: Posicao[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-bordo opacity-[0.09] ${className}`}
    >
      {itens.map((item, i) => (
        <SketchParallax key={i} item={item} progresso={scrollYProgress} reduzir={reduzir} />
      ))}
    </div>
  );
}
