"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { isMotion } from "@/lib/env";

/** Alinha o Framer Motion ao modo de movimento decidido no boot (inclui ?motion=0 do artboard). */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(!isMotion()), []);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>;
}
