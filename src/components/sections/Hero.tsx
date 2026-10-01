"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { hero, waLink } from "@/content";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/motion/WordReveal";
import { SketchLayer, type SketchItem } from "@/components/motion/SketchLayer";
import { Basket, BASKET_VIEWBOX, type PastelSpot } from "@/components/illustrations/Basket";
import { Azeitona, Pimenta, Salsinha } from "@/components/illustrations/Ingredients";
import { useIntro } from "@/components/motion/IntroContext";
import { scrollToHash, useLenis } from "@/components/motion/SmoothScroll";
import { easeOutExpo, useFinePointer } from "@/lib/motion";

const SKETCHES: SketchItem[] = [
  { name: "pastelMeiaLua", top: "16%", left: "3%", size: 9, rotate: -14, speed: 0.6 },
  { name: "louro", top: "10%", left: "84%", size: 7, rotate: 20, speed: 0.9 },
  { name: "pimentao", top: "56%", left: "4%", size: 7.5, rotate: 8, speed: 0.3, desktopOnly: true },
  { name: "cebola", top: "58%", left: "87%", size: 7, rotate: -10, speed: 0.5, desktopOnly: true },
  { name: "salsinha", top: "40%", left: "92%", size: 5, rotate: 14, speed: 1.1, desktopOnly: true },
  { name: "azeitona", top: "36%", left: "11%", size: 4, rotate: 0, speed: 1.2, desktopOnly: true },
];

type IngredientDef = {
  Comp: ComponentType<{ className?: string }>;
  /** posição e tamanho em % da área da cesta */
  top: number;
  left: number;
  size: number;
  /** profundidade do parallax (maior = mais perto, mexe mais) */
  depth: number;
  rotate: number;
  float: number;
  side: -1 | 1;
};

const INGREDIENTS: IngredientDef[] = [
  { Comp: Pimenta, top: 2, left: -6, size: 15, depth: 1.4, rotate: -24, float: 5.5, side: -1 },
  { Comp: Salsinha, top: -4, left: 86, size: 14, depth: 0.8, rotate: 16, float: 6.5, side: 1 },
  { Comp: Azeitona, top: 52, left: -3, size: 9, depth: 1.8, rotate: 10, float: 4.8, side: -1 },
  { Comp: Azeitona, top: 64, left: 4, size: 6.5, depth: 0.6, rotate: -20, float: 5.2, side: -1 },
  { Comp: Pimenta, top: 46, left: 92, size: 13, depth: 1.2, rotate: 130, float: 6, side: 1 },
  { Comp: Salsinha, top: 72, left: -10, size: 11, depth: 1, rotate: -30, float: 7, side: -1 },
];

export function Hero() {
  const { ready } = useIntro();
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState<PastelSpot | null>(null);

  // Parallax com o mouse (-1 a 1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced, mx, my]);

  // Parallax de rolagem
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const basketX = useTransform(smx, (m) => (reduced ? 0 : -m * 14));
  const basketY = useTransform([smy, scrollYProgress] as MotionValue<number>[], ([m, p]: number[]) => (reduced ? 0 : -m * 10 - p * 140));
  const basketScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.1]);

  // Toque: fecha o balão ao tocar fora de um pastel
  useEffect(() => {
    if (!spot) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.(".pastel")) setSpot(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [spot]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: easeOutExpo, delay },
  });

  return (
    <section id="inicio" ref={sectionRef} aria-labelledby="hero-titulo" className="relative pt-28 md:pt-36">
      <SketchLayer items={SKETCHES} />

      <div className="relative mx-auto max-w-[90rem] px-5 text-center md:px-10">
        <motion.p
          {...enter(0.05)}
          className="inline-flex items-center gap-2.5 rounded-2xl bg-branco px-4 py-2 text-left text-[0.85rem] leading-snug font-medium text-bordo sm:rounded-full md:text-[0.95rem]"
        >
          <span className="size-2 shrink-0 rounded-full bg-laranja" aria-hidden="true" />
          {hero.chamada}
        </motion.p>

        <h1
          id="hero-titulo"
          className="mx-auto mt-6 max-w-[17ch] text-[clamp(2.6rem,6.2vw,6.4rem)] font-extrabold text-tinta md:max-w-none"
        >
          <WordReveal
            text={hero.titulo}
            trigger="mount"
            play={ready}
            delay={0.1}
            stagger={0.07}
            breakBefore={[6]}
            wordClassName={(_, i) => (i >= 6 ? "text-bordo relative" : undefined)}
            decorate={(i) =>
              i === 8 ? (
                <svg
                  viewBox="0 0 300 30"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[0.1em] left-0 h-[0.22em] w-full overflow-visible"
                >
                  <motion.path
                    d="M4 20 C60 8 130 6 190 12 C230 16 262 14 296 6"
                    fill="none"
                    stroke="#FFB74D"
                    strokeWidth={9}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={ready ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.8, delay: 1.0, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              ) : null
            }
          />
        </h1>

        <motion.p {...enter(0.55)} className="mx-auto mt-7 max-w-[40rem] text-[1.0625rem] leading-relaxed text-tinta/85 md:text-[1.1875rem]">
          {hero.subtitulo}
        </motion.p>

        <motion.div {...enter(0.7)} className="mt-9 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Button href={waLink(hero.ctaPrimarioMensagem)} size="lg" whatsapp magnetic>
            {hero.ctaPrimario}
          </Button>
          <Button
            href="#cardapio"
            size="lg"
            variant="contorno"
            magnetic
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(lenis, "#cardapio");
            }}
          >
            {hero.ctaSecundario}
          </Button>
        </motion.div>
      </div>

      {/* Cesta: ~58% da largura no desktop, sobrepõe a esteira logo abaixo */}
      <div className="relative z-20 mx-auto mt-10 -mb-[18vw] w-[94vw] max-w-[62rem] sm:w-[80vw] md:mt-14 md:-mb-[11vw] lg:w-[58vw]">
        {/* forma orgânica laranja que respira */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-4%_2%_8%_2%]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.35 }}
        >
          <svg viewBox="0 0 600 460" className="respira h-full w-full" preserveAspectRatio="none">
            <path
              fill="#FFB74D"
              d="M300 18 C410 8 520 48 566 140 C604 218 590 318 520 380 C450 442 340 452 240 440 C140 428 54 384 24 300 C-6 216 30 120 104 70 C160 32 230 24 300 18 Z"
            />
          </svg>
        </motion.div>

        <motion.div
          className="relative"
          style={{ x: basketX, y: basketY, scale: basketScale }}
          initial={{ opacity: 0, y: 80 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.45 }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -10, 0], rotate: [0, -0.6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Basket className="relative h-auto w-full" onActivate={setSpot} onDeactivate={() => setSpot(null)} />
          </motion.div>

          <AnimatePresence>
            {spot && (
              <motion.div
                key={`${spot.x}-${spot.y}`}
                role="tooltip"
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full"
                style={{ left: `${(spot.x / BASKET_VIEWBOX.w) * 100}%`, top: `${(spot.y / BASKET_VIEWBOX.h) * 100}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 6, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 520, damping: 13 }}
                  style={{ originY: 1 }}
                  className="relative mb-3 w-max max-w-[15rem] rounded-2xl bg-tinta px-4 py-3 text-center text-[0.95rem] leading-snug font-medium text-branco"
                >
                  {hero.balao}
                  <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-tinta" aria-hidden="true" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {INGREDIENTS.map((d, i) => (
          <Ingredient key={i} def={d} index={i} mx={smx} my={smy} progress={scrollYProgress} ready={ready} reduced={!!reduced} />
        ))}
      </div>
    </section>
  );
}

function Ingredient({
  def,
  index,
  mx,
  my,
  progress,
  ready,
  reduced,
}: {
  def: IngredientDef;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  progress: MotionValue<number>;
  ready: boolean;
  reduced: boolean;
}) {
  const x = useTransform([mx, progress] as MotionValue<number>[], ([m, p]: number[]) =>
    reduced ? 0 : m * def.depth * 22 + def.side * p * 90 * def.depth,
  );
  const y = useTransform([my, progress] as MotionValue<number>[], ([m, p]: number[]) => (reduced ? 0 : m * def.depth * 16 - p * 220 * def.depth));
  const { Comp } = def;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 ${index >= 3 ? "hidden sm:block" : ""}`}
      style={{ top: `${def.top}%`, left: `${def.left}%`, width: `${def.size}%`, x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: def.rotate - 40 }}
        animate={ready ? { opacity: 1, scale: 1, rotate: def.rotate } : undefined}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.7 + index * 0.08 }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: def.float, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        >
          <Comp className="h-auto w-full drop-shadow-[0_10px_0_rgba(107,20,32,0.10)]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
