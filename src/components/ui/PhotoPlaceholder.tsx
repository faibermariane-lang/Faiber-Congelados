import type { SketchName } from '../../content/site';
import { cn } from '../../lib/cn';
import { Sketch } from './Sketch';

type Props = {
  sketch: SketchName;
  label: string;
  className?: string;
  tone?: 'paper' | 'dark';
};

/**
 * Espaço reservado para fotografias ainda não produzidas.
 * Identificado de forma clara, mas no mesmo idioma visual do site.
 */
export function PhotoPlaceholder({ sketch, label, className, tone = 'paper' }: Props) {
  const dark = tone === 'dark';
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para fotografia: ${label}`}
      className={cn(
        'paper relative flex h-full w-full flex-col items-center justify-center overflow-hidden',
        dark ? 'bg-ink-soft text-creme/70' : 'bg-creme-dark text-marrom/70',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn('absolute inset-3 border border-dashed', dark ? 'border-creme/25' : 'border-marrom/25')}
      />
      <Sketch name={sketch} className="w-[46%] max-w-56" draw={false} />
      <span
        className={cn(
          'eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 text-[0.6875rem]',
          dark ? 'bg-creme/10' : 'bg-paper/80',
        )}
      >
        Foto em produção · {label}
      </span>
    </div>
  );
}
