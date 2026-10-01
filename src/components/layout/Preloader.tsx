"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/motion/IntroContext";
import { useLenis } from "@/components/motion/SmoothScroll";

const KEY = "faiber-intro-visto";

// Linha do tempo (s). Total: 2,2s.
const T = {
  draw: 0.15, // pastel começa a se desenhar
  drawDur: 0.8,
  inflate: 0.95, // infla, como se estivesse fritando
  contentOut: 1.45,
  curtains: 1.6, // cortinas abrem
  curtainsDur: 0.6,
};

const BUBBLES = [
  { cx: 70, cy: 70, r: 4, d: 0 },
  { cx: 104, cy: 58, r: 3, d: 0.08 },
  { cx: 132, cy: 74, r: 5, d: 0.16 },
  { cx: 88, cy: 88, r: 2.5, d: 0.22 },
  { cx: 150, cy: 92, r: 3, d: 0.1 },
  { cx: 56, cy: 92, r: 3, d: 0.28 },
];

/**
 * Abertura: logo branca + pastel em linha laranja que se desenha e "frita",
 * depois a tela abre em duas cortinas. Só na primeira visita da sessão.
 */
export function Preloader() {
  const { markReady } = useIntro();
  const lenis = useLenis();
  const [state, setState] = useState<"checking" | "playing" | "leaving" | "done">("checking");
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    markReady();
    setState("done");
  }, [markReady]);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    markReady();
    setState("leaving");
    timers.current.push(window.setTimeout(() => setState("done"), T.curtainsDur * 1000));
  }, [markReady]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen || reduced) {
      // sessionStorage e matchMedia só existem no navegador
      // eslint-disable-next-line react-hooks/set-state-in-effect
      finish();
      return;
    }
    setState("playing");
    timers.current.push(
      window.setTimeout(() => {
        markReady();
        setState("leaving");
      }, T.curtains * 1000),
      window.setTimeout(() => setState("done"), (T.curtains + T.curtainsDur) * 1000),
    );
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, [finish, markReady]);

  // trava o scroll enquanto a abertura roda
  useEffect(() => {
    if (state === "playing") lenis?.stop();
    else lenis?.start();
  }, [state, lenis]);

  useEffect(() => {
    if (state !== "playing") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, skip]);

  if (state === "done") return null;

  const leaving = state === "leaving";
  const curtain = { duration: T.curtainsDur, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <div className="preloader fixed inset-0 z-[90]" aria-live="polite" aria-label="Carregando Faiber Congelados">
      <motion.div
        className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-bordo"
        animate={{ x: leaving ? "-100%" : "0%" }}
        transition={curtain}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-bordo"
        animate={{ x: leaving ? "100%" : "0%" }}
        transition={curtain}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
        initial={{ opacity: 1 }}
        animate={state === "playing" ? { opacity: [1, 1, 0], scale: [1, 1, 0.96] } : { opacity: 0 }}
        transition={
          state === "playing"
            ? { duration: T.curtains, times: [0, T.contentOut / T.curtains, 1], ease: "easeIn" }
            : { duration: 0.2 }
        }
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
          <Image src="/images/logo-branca.png" alt="Faiber Congelados" width={962} height={549} priority className="h-auto w-44 md:w-56" />
        </motion.div>

        <svg viewBox="0 0 200 130" className="w-40 overflow-visible md:w-52" aria-hidden="true">
          <motion.g
            style={{ originX: "100px", originY: "90px" }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1, 1.09, 1.05] }}
            transition={{ duration: T.inflate + 0.5, times: [0, T.inflate / (T.inflate + 0.5), 0.8, 1], ease: "easeOut" }}
          >
            <motion.path
              d="M14 104 C16 60 52 24 100 22 C148 24 184 60 186 104 C140 112 60 112 14 104 Z"
              fill="none"
              stroke="#FFB74D"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: T.drawDur, delay: T.draw, ease: [0.65, 0, 0.35, 1] }}
            />
            {/* marcas do garfo */}
            <motion.path
              d="M26 92 l-9 -4 M34 72 l-9 -6 M46 54 l-7 -8 M62 41 l-5 -9 M80 33 l-3 -9 M100 30 l0 -9 M120 33 l3 -9 M138 41 l5 -9 M154 54 l7 -8 M166 72 l9 -6 M174 92 l9 -4"
              fill="none"
              stroke="#FFB74D"
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: T.draw + T.drawDur * 0.6, ease: "easeOut" }}
            />
            {BUBBLES.map((b, i) => (
              <circle
                key={i}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill="none"
                stroke="#FFB74D"
                strokeWidth={2}
                style={{
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  animation: `bolha 0.55s ease-out ${T.inflate + b.d}s both`,
                }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      <button
        type="button"
        onClick={skip}
        className="absolute right-5 bottom-5 rounded-full px-4 py-2 text-sm font-medium text-branco/80 ring-1 ring-branco/30 transition-colors hover:bg-branco hover:text-bordo"
        style={{ opacity: leaving ? 0 : 1 }}
      >
        Pular abertura
      </button>
    </div>
  );
}
