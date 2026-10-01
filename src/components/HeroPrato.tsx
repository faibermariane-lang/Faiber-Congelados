"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content";

const ease = [0.22, 1, 0.36, 1] as const;

// Pastel retangular visto de cima, centrado em 0,0.
const contorno =
  "M-115-60C-60-67 60-67 115-60C121-22 121 22 115 60C60 67-60 67-115 60C-121 22-121-22-115-60Z";
const recorte =
  "M-104-50C-55-56 55-56 104-50C109-18 109 18 104 50C55 56-55 56-104 50C-109 18-109-18-104-50Z";
const miolo =
  "M-92-38C-45-46 45-46 92-38C98-12 98 12 92 38C45 46-45 46-92 38C-98 12-98-12-92-38Z";

const bolhas: [number, number, number][] = [
  [-62, -14, 6], [-30, 20, 4.5], [10, -24, 7], [46, 12, 5.5], [72, -18, 4], [-78, 26, 3.5], [24, 30, 4], [-6, 4, 3],
  [-44, 8, 2.5], [58, 30, 3], [86, 8, 3], [-20, -30, 3],
];

/** Escala Y que "deita" o pastel no prato, simulando perspectiva. */
const deitar = 0.5;

function Pastel({ x, y, r, atraso, elevar = 0 }: { x: number; y: number; r: number; atraso: number; elevar?: number }) {
  const reduzir = useReducedMotion();
  return (
    <motion.g
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduzir ? { duration: 0 } : { duration: 0.7, delay: atraso, ease }}
    >
      <g transform={`translate(${x} ${y - elevar})`}>
        {/* espessura */}
        <g transform={`translate(0 13) scale(1 ${deitar}) rotate(${r})`}>
          <path d={contorno} fill="#B9722A" />
        </g>
        <g transform={`scale(1 ${deitar}) rotate(${r})`}>
          <path d={contorno} fill="#EBA548" />
          <path d={miolo} fill="#F4B85A" />
          <path d="M-70-22C-40-34 30-34 62-20C40-8-40-6-70-22Z" fill="#F9CF84" />
          <path d={recorte} fill="none" stroke="#D99540" strokeWidth="7" strokeDasharray="1.6 6.5" />
          {bolhas.map(([bx, by, br], i) => (
            <circle key={i} cx={bx} cy={by} r={br} fill={i % 4 === 0 ? "#E19A44" : "#FBDB9C"} />
          ))}
        </g>
      </g>
    </motion.g>
  );
}

function PratoIlustrado() {
  return (
    <svg viewBox="0 0 640 400" className="h-auto w-full overflow-visible" role="img" aria-label={hero.pratoAlt}>
      {/* sombra chapada */}
      <ellipse cx="334" cy="282" rx="288" ry="104" fill="#6B1420" opacity="0.16" />
      {/* prato */}
      <ellipse cx="320" cy="268" rx="290" ry="108" fill="#E9D9BE" />
      <ellipse cx="320" cy="258" rx="290" ry="106" fill="#FFFDF8" />
      <ellipse cx="320" cy="256" rx="214" ry="76" fill="#F6ECDA" />
      <path d="M106 256c18-46 112-78 214-78s196 32 214 78" fill="none" stroke="#EADBC1" strokeWidth="4" strokeLinecap="round" />
      {/* pastéis */}
      <Pastel x={232} y={230} r={-9} atraso={0.55} />
      <Pastel x={408} y={232} r={11} atraso={0.65} />
      <Pastel x={300} y={276} r={4} atraso={0.75} />
      <Pastel x={372} y={262} r={-20} atraso={0.88} elevar={20} />
    </svg>
  );
}

export function HeroPrato() {
  const reduzir = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[42rem]">
      {/* formas orgânicas em laranja */}
      <motion.svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute left-1/2 top-[52%] -z-10 w-[96%] -translate-x-1/2 -translate-y-1/2 text-laranja"
        animate={reduzir ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill="currentColor"
          d="M144 42c14 12 26 30 28 50 2 21-6 42-22 57-16 15-39 24-62 22-23-2-45-15-55-35-10-20-8-47 4-67 12-20 34-34 57-37 23-3 36-2 50 10Z"
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute -right-2 top-[2%] -z-10 w-[30%] text-laranja-claro sm:-right-6"
        animate={reduzir ? undefined : { rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill="currentColor"
          d="M152 52c18 22 22 56 6 80s-48 40-78 36-54-26-58-54 14-58 40-70 72-14 90 8Z"
        />
      </motion.svg>
      {/* fita laranja desenhada, como nas artes da marca */}
      <svg
        viewBox="0 0 640 400"
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full overflow-visible text-laranja"
      >
        <motion.path
          d="M-10 330C40 250 20 150 110 110 190 75 240 160 200 190 160 220 120 150 190 90 260 30 420 20 500 70 570 115 600 190 650 210"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={reduzir ? { duration: 0 } : { duration: 1.8, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduzir ? { duration: 0 } : { duration: 0.9, delay: 0.35, ease }}
      >
        {hero.pratoImagem ? (
          <Image
            src={hero.pratoImagem.src}
            width={hero.pratoImagem.width}
            height={hero.pratoImagem.height}
            alt={hero.pratoAlt}
            priority
            sizes="(min-width: 1024px) 42rem, 92vw"
            className="h-auto w-full"
          />
        ) : (
          <PratoIlustrado />
        )}
      </motion.div>

      {!hero.pratoImagem && (
        <p className="mt-1 text-center text-xs font-medium text-bordo/60">{hero.pratoPlaceholder}</p>
      )}
    </div>
  );
}
