import { esteira } from "@/content";
import { Marquee } from "@/components/motion/Marquee";

function PastelIcon() {
  return (
    <svg viewBox="0 0 40 28" className="h-6 w-auto shrink-0 md:h-8" aria-hidden="true">
      <path
        d="M4 4 C14 2 26 2 36 4 C38 10 38 18 36 24 C26 26 14 26 4 24 C2 18 2 10 4 4 Z"
        fill="#FFB74D"
        stroke="#FBF4E8"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M7 7 C16 6 24 6 33 7 C34 12 34 16 33 21 C24 22 16 22 7 21 C6 16 6 12 7 7 Z" fill="none" stroke="#6B1420" strokeWidth={2.4} strokeDasharray="1 3" />
    </svg>
  );
}

/** Faixa bordô com os sabores em loop (1ª faixa da esteira). */
export function MarqueeStrip() {
  return (
    <div className="relative z-10 bg-bordo py-5 text-branco md:py-7">
      <Marquee baseVelocity={-3} label="Produtos Faiber">
        <ul className="flex items-center">
          {esteira.sabores.map((s) => (
            <li key={s} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
              <span className="font-display text-[clamp(1.6rem,3.4vw,3rem)] font-bold whitespace-nowrap tracking-[-0.02em]">{s}</span>
              <PastelIcon />
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}
