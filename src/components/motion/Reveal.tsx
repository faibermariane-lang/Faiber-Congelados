"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { isMotion } from "@/lib/env";
import { useUI } from "@/lib/store";

type Trigger = "scroll" | "intro";

/**
 * Executa `play` quando o elemento entra na tela (ou quando o preloader termina, em `intro`).
 * Sem movimento, nada roda e o CSS já mostra o estado final.
 */
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  play: (el: HTMLElement) => gsap.core.Animation | void,
  trigger: Trigger,
  start = "top 86%",
) {
  const introDone = useUI((s) => s.introDone);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotion() || played.current) return;
    if (trigger === "intro") {
      if (!introDone) return;
      played.current = true;
      play(el);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        played.current = true;
        play(el);
      },
    });
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone, trigger, start]);
}

type Common = { as?: ElementType; className?: string; trigger?: Trigger; delay?: number; id?: string };

/** Títulos com linhas explícitas: cada linha sobe de dentro de uma máscara. */
export function MaskLines({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  trigger = "scroll",
  delay = 0,
  stagger = 0.11,
  id,
}: Common & { lines: readonly string[]; lineClassName?: string | ((i: number) => string); stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(
    ref,
    (el) =>
      gsap.to(el.querySelectorAll(".line-inner"), {
        yPercent: 0,
        y: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
        onComplete: () => {
          el.dataset.revealed = "";
          gsap.set(el.querySelectorAll(".line-inner"), { clearProps: "transform" });
        },
      }),
    trigger,
  );
  return createElement(
    as,
    { ref, id, className, "data-reveal": "lines" },
    lines.map((l, i) => (
      <span key={i} className={`line-mask ${typeof lineClassName === "function" ? lineClassName(i) : lineClassName}`} data-line={i}>
        <span className="line-inner">{l}</span>
      </span>
    )),
  );
}

/** Texto corrido revelado por linhas calculadas (SplitText, refaz ao redimensionar). */
export function SplitLines({ children, as = "h2", className = "", trigger = "scroll", delay = 0, id }: Common & { children: string }) {
  const ref = useRef<HTMLElement>(null);
  const split = useRef<SplitText | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotion()) return;
    split.current = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true });
    gsap.set(split.current.lines, { yPercent: 110 });
    el.style.visibility = "visible";
    return () => split.current?.revert();
  }, []);

  useReveal(
    ref,
    () => {
      if (!split.current) return;
      return gsap.to(split.current.lines, { yPercent: 0, duration: 0.9, stagger: 0.09, delay, ease: "power4.out" });
    },
    trigger,
  );

  return createElement(as, { ref, id, className, "data-reveal": "split" }, children);
}

/** Parágrafos e blocos: fade + 16px. */
export function FadeIn({ children, as = "div", className = "", trigger = "scroll", delay = 0, id }: Common & { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(
    ref,
    (el) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        onComplete: () => {
          el.dataset.revealed = "";
          gsap.set(el, { clearProps: "opacity,transform" });
        },
      }),
    trigger,
  );
  return createElement(as, { ref, id, className, "data-reveal": "fade" }, children);
}

/**
 * Revelação de imagem por clip-path (inset) com scale 1.15 → 1 e parallax interno.
 * O filho deve ocupar 100% do quadro.
 */
export function ImageReveal({
  children,
  className = "",
  trigger = "scroll",
  delay = 0,
  parallax = 8,
  from = "bottom",
}: Omit<Common, "as" | "id"> & { children: ReactNode; parallax?: number; from?: "bottom" | "top" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const insets = { bottom: "inset(100% 0 0 0)", top: "inset(0 0 100% 0)", left: "inset(0 100% 0 0)", right: "inset(0 0 0 100%)" };

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotion()) return;
    el.style.clipPath = insets[from];
    if (!parallax || !inner.current) return;
    const tw = gsap.fromTo(
      inner.current,
      { yPercent: -parallax / 2 },
      { yPercent: parallax / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parallax, from]);

  useReveal(
    ref,
    (el) => {
      const tl = gsap.timeline({ delay });
      tl.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
        onComplete: () => {
          el.dataset.revealed = "";
          el.style.clipPath = "";
        },
      });
      if (inner.current) tl.fromTo(inner.current.firstElementChild, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
      return tl;
    },
    trigger,
    "top 88%",
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} data-reveal="image">
      <div ref={inner} className={`absolute ${parallax ? "inset-x-0 -inset-y-[6%]" : "inset-0"}`}>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
