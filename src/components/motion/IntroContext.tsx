"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Intro = { ready: boolean; markReady: () => void };

const IntroContext = createContext<Intro>({ ready: true, markReady: () => {} });

/** Sinaliza quando o preloader terminou, para o hero começar a entrada. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return (
    <IntroContext.Provider value={{ ready, markReady }}>
      {/* respeita prefers-reduced-motion em todas as animações do Framer Motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
