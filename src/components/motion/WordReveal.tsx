"use client";

import { motion } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  text: string;
  /** "mount": anima quando `play` vira true. "view": anima ao entrar na tela. */
  trigger?: "mount" | "view";
  play?: boolean;
  delay?: number;
  stagger?: number;
  /** classes por palavra, ex.: destacar uma frase */
  wordClassName?: (word: string, index: number) => string | undefined;
  /** quebra de linha antes do índice informado */
  breakBefore?: number[];
  /** conteúdo extra dentro de uma palavra (ex.: um traço desenhado) */
  decorate?: (index: number) => ReactNode;
};

/** Revela o texto palavra por palavra, com máscara subindo. */
export function WordReveal({ text, trigger = "view", play = true, delay = 0, stagger = 0.06, wordClassName, breakBefore = [], decorate }: Props) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {breakBefore.includes(i) && <br className="hidden md:block" />}
            <span className="inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] align-top">
              <motion.span
                className={`inline-block will-change-transform ${wordClassName?.(word, i) ?? ""}`}
                initial={{ y: "110%" }}
                {...(trigger === "view"
                  ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -15% 0px" } }
                  : { animate: play ? { y: "0%" } : { y: "110%" } })}
                transition={{ duration: 0.95, ease: easeOutExpo, delay: delay + i * stagger }}
              >
                {word}
                {decorate?.(i)}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}
