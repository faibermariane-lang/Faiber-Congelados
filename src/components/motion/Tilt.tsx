"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";

/** Inclinação 3D que segue o mouse. */
export function Tilt({ children, max = 8, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const px = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useTransform(px, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(py, [-0.5, 0.5], [max, -max]);
  const active = fine && !reduced;

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        className="h-full"
        style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        onPointerMove={(e) => {
          if (!active || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
