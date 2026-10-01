"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sketch } from "@/components/illustrations/Sketch";
import type { SketchName } from "@/components/illustrations/sketches";

gsap.registerPlugin(ScrollTrigger);

export type SketchItem = {
  name: SketchName;
  /** posição em % da seção */
  top: string;
  left: string;
  /** largura em rem */
  size: number;
  rotate?: number;
  /** velocidade do parallax: positivo sobe mais rápido, negativo desce */
  speed?: number;
  /** esconde abaixo de md */
  desktopOnly?: boolean;
};

/**
 * Camada de ilustrações em traço atrás de uma seção.
 * Os traços se desenham ao entrar na tela e têm parallax em velocidades diferentes.
 */
export function SketchLayer({ items, opacity = 0.08, className = "text-bordo" }: { items: SketchItem[]; opacity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-sketch]").forEach((el, i) => {
        const paths = el.querySelectorAll("[data-draw]");
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          stagger: 0.25,
          delay: (i % 4) * 0.15,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        const speed = Number(el.dataset.speed ?? 0);
        if (speed) {
          gsap.to(el, {
            y: () => -speed * 120,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }}>
      {items.map((it, i) => (
        <div
          key={i}
          data-sketch
          data-speed={it.speed ?? 0}
          className={`absolute ${it.desktopOnly ? "hidden md:block" : ""}`}
          style={{ top: it.top, left: it.left, width: `${it.size}rem` }}
        >
          <div style={{ transform: `rotate(${it.rotate ?? 0}deg)` }}>
            <Sketch name={it.name} className="h-auto w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
