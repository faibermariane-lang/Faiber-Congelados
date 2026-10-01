"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Variante = "primario" | "secundario" | "laranja" | "claro";

const estilos: Record<Variante, string> = {
  primario: "bg-bordo text-white hover:bg-bordo-escuro",
  secundario: "bg-transparent text-bordo ring-2 ring-inset ring-bordo hover:bg-bordo hover:text-white",
  laranja: "bg-laranja text-tinta hover:bg-[#ffc56e]",
  claro: "bg-white text-bordo hover:bg-creme",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: "md" | "lg";
  externo?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Botão-link com leve magnetismo no hover (desligado com movimento reduzido). */
export function Botao({ href, children, variante = "primario", tamanho = "md", externo, className = "", ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduzir = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  function mover(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduzir || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }

  function soltar() {
    x.set(0);
    y.set(0);
  }

  const medidas = tamanho === "lg" ? "h-14 px-7 text-lg" : "h-12 px-6 text-base";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={mover}
      onPointerLeave={soltar}
      style={{ x, y }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-bold tracking-[-0.01em] transition-colors duration-200 ${medidas} ${estilos[variante]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
