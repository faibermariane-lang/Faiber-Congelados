import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Rótulo de seção no estilo de índice editorial: “Nº 02 — Nossa história”. */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      {index && <span className="tabular-nums">Nº {index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
