/**
 * Ingredientes que flutuam em volta da cesta do hero.
 * Mesmo estilo da ilustração: traço bordô, preenchimentos chapados.
 */

const BORDO = "#6B1420";
const BORDO_ESCURO = "#4F0F18";
const LARANJA = "#FFB74D";
const CREME = "#FBF4E8";

type Props = { className?: string };

export function Pimenta({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M24 30 C32 26 40 30 48 38 C62 52 72 70 86 84 C88 87 85 89 82 87 C62 76 44 64 30 52 C22 45 19 36 24 30 Z"
        fill={BORDO}
        stroke={BORDO_ESCURO}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path d="M33 38 C42 44 52 54 62 64" stroke={CREME} strokeOpacity={0.6} strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M20 31 C26 25 30 27 31 32 C27 33 24 34 20 31 Z" fill={LARANJA} stroke={BORDO_ESCURO} strokeWidth={2} strokeLinejoin="round" />
      <path d="M24 29 C19 23 19 15 25 9" stroke={BORDO_ESCURO} strokeWidth={3} strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Salsinha({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g stroke={BORDO} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round">
        <path d="M50 96 C50 74 48 56 46 36 M49 64 C58 58 64 56 70 52 M47 52 C40 48 32 48 26 46" fill="none" />
        <path d="M46 36 C38 32 30 34 28 26 C34 24 36 18 44 20 C46 12 54 12 56 20 C64 18 68 24 64 30 C68 36 60 40 54 38 C52 42 48 40 46 36 Z" fill={CREME} />
        <path d="M70 52 C76 46 84 50 82 56 C86 60 80 66 74 62 C70 66 64 62 66 58 C64 54 66 52 70 52 Z" fill={CREME} />
        <path d="M26 46 C20 42 14 46 17 50 C12 54 18 60 24 56 C28 60 34 56 32 52 C32 48 30 46 26 46 Z" fill={CREME} />
        <path d="M46 28 l0 6 M52 24 l-3 8 M41 26 l4 6 M74 56 l4 1 M24 51 l-4 1" fill="none" strokeWidth={1.8} />
      </g>
    </svg>
  );
}

export function Azeitona({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M30 50 C30 32 44 22 56 24 C70 26 78 40 76 56 C74 72 62 80 50 78 C38 76 30 66 30 50 Z"
        fill={BORDO_ESCURO}
        stroke={BORDO_ESCURO}
        strokeWidth={2.5}
      />
      <path d="M50 45 C55 43 59 48 57 53 C55 57 48 56 47 51 C47 48 48 46 50 45 Z" fill={LARANJA} />
      <path d="M39 38 C41 34 45 32 50 31" stroke={CREME} strokeOpacity={0.7} strokeWidth={3.5} strokeLinecap="round" fill="none" />
    </svg>
  );
}
