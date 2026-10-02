'use client';

/**
 * Número com troca por rolagem vertical dos dígitos.
 * Cada casa é uma coluna 0–9 deslocada até o dígito atual.
 */
export function DigitRoll({ value, className, minDigits = 1 }: { value: number | string; className?: string; minDigits?: number }) {
  const chars = String(value).padStart(minDigits, ' ').split('');
  return (
    <span className={`inline-flex tabular-nums ${className ?? ''}`} aria-hidden="true">
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <span key={chars.length - i} className="relative inline-block h-[1em] overflow-hidden leading-none">
            <span className="invisible">0</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-700 ease-out-expo"
              style={{ transform: `translateY(-${Number(c) * 10}%)` }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em] leading-none">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={chars.length - i} className="inline-block leading-none">
            {c === ' ' ? '' : c}
          </span>
        ),
      )}
    </span>
  );
}
