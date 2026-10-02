import { motion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.12) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const variants = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, ease: EASE } } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } } },
  mask: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE } },
  },
} satisfies Record<string, Variants>;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'ul' | 'ol' | 'header' | 'figure';
  stagger?: number;
  /** margem da viewport para disparar a animação */
  amount?: number;
};

/** Grupo que revela os filhos em sequência: título → texto → imagem → detalhes. */
export function Reveal({ children, className, as = 'div', stagger, amount = 0.25 }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

type ItemProps = {
  children?: ReactNode;
  id?: string;
  className?: string;
  variant?: keyof typeof variants;
  as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'li' | 'figure' | 'blockquote';
};

export function RevealItem({ children, id, className, variant = 'up', as = 'div' }: ItemProps) {
  const Comp = motion[as as keyof typeof motion] as ElementType;
  return (
    <Comp id={id} className={className} variants={variants[variant]}>
      {children}
    </Comp>
  );
}
