"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Faixa em loop infinito. Acelera com a velocidade da rolagem,
 * inverte ao rolar para cima e desacelera até parar no hover.
 */
export function Marquee({
  children,
  baseVelocity = 2,
  className,
  label,
}: {
  children: ReactNode;
  /** % da largura do bloco por segundo; negativo inverte o sentido */
  baseVelocity?: number;
  className?: string;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const hoverFactor = useSpring(1, { stiffness: 60, damping: 20 });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    let move = direction.current * baseVelocity * (delta / 1000);
    move += direction.current * move * Math.abs(vf);
    baseX.set(baseX.get() + move * hoverFactor.get() * 0.5);
  });

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      aria-label={label}
      role={label ? "region" : undefined}
      onPointerEnter={() => {
        hoverFactor.set(0);
      }}
      onPointerLeave={() => {
        hoverFactor.set(1);
      }}
    >
      <motion.div className="flex w-max flex-nowrap will-change-transform" style={reduced ? undefined : { x }}>
        <div className="flex shrink-0 flex-nowrap">{children}</div>
        <div className="flex shrink-0 flex-nowrap" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
