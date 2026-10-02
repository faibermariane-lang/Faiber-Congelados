import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

const FROM = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
} as const;

/**
 * Revela uma imagem por máscara. O observador fica no invólucro (sem clip-path),
 * pois um elemento totalmente recortado nunca é considerado “visível”.
 */
export function MaskReveal({
  children,
  className,
  innerClassName,
  from = 'down',
  amount = 0.25,
  as = 'figure',
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  from?: keyof typeof FROM;
  amount?: number;
  as?: 'figure' | 'div';
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      <motion.div
        className={cn('relative h-full w-full overflow-hidden', innerClassName)}
        variants={{
          hidden: { clipPath: FROM[from] },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {children}
      </motion.div>
    </Comp>
  );
}
