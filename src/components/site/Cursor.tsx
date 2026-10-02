"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { isArtboard, isFinePointer, isMotion } from "@/lib/env";

const INTERACTIVE = 'a, button, [role="button"], label, select, summary, [data-cursor]';

/**
 * Cursor discreto (só desktop): ponto de 10px que vira anel de 44px sobre clicáveis.
 * Exceção funcional: `data-cursor="drag"` mostra "Arraste".
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dot" | "ring" | "drag">("dot");

  useEffect(() => {
    if (isFinePointer() && isMotion() && !isArtboard()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !el.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const node = el.current;
    const xTo = gsap.quickTo(node, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.18, ease: "power3.out" });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(node, { x: e.clientX, y: e.clientY });
        gsap.to(node, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
      setMode(!t ? "dot" : t.dataset.cursor === "drag" ? "drag" : "ring");
    };
    const onLeave = () => {
      shown = false;
      gsap.to(node, { opacity: 0, duration: 0.2 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "drag" ? 84 : mode === "ring" ? 44 : 10;
  return (
    <div ref={el} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0">
      <div
        className="label-mono flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.62rem] text-offwhite transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: size,
          height: size,
          backgroundColor: mode === "ring" ? "transparent" : "var(--color-bordo)",
          border: `1.5px solid ${mode === "dot" ? "transparent" : "var(--color-bordo)"}`,
        }}
      >
        <span className={mode === "drag" ? "opacity-100 transition-opacity delay-150" : "opacity-0"}>Arraste</span>
      </div>
    </div>
  );
}
