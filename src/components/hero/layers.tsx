import Image from 'next/image';
import { IMAGES, imageSrc, type ImageKey } from '@/images';

/**
 * Camadas do pastel do hero. Todas compartilham a mesma tela 2400×2400,
 * então as PNGs reais encaixam exatamente onde estão os placeholders.
 *
 * `open` = deslocamento na abertura completa, em % do palco.
 * `depth` = intensidade do parallax de mouse (px no máximo).
 */
export type LayerSpec = {
  key: ImageKey;
  open: { x: number; y: number; r: number; s?: number };
  depth: number;
  float: number;
};

export const MASSA_BAIXO: LayerSpec = { key: 'massaBaixo', open: { x: 0, y: 6, r: 2 }, depth: 8, float: 6 };
export const MASSA_CIMA: LayerSpec = { key: 'massaCima', open: { x: -2, y: -26, r: -12 }, depth: 18, float: 12 };
export const MIGALHAS: LayerSpec = { key: 'migalhas', open: { x: 0, y: 8, r: 0, s: 1.12 }, depth: 6, float: 6 };

export const RECHEIOS: LayerSpec[] = [
  { key: 'recheioQueijo', open: { x: -22, y: -15, r: -18 }, depth: 16, float: 10 },
  { key: 'recheioCarne', open: { x: -4, y: -19, r: 10 }, depth: 20, float: 9 },
  { key: 'recheioTomate', open: { x: 19, y: -16, r: 26 }, depth: 22, float: 13 },
  { key: 'recheioCebola', open: { x: -31, y: -4, r: -32 }, depth: 24, float: 14 },
  { key: 'recheioSalsinha', open: { x: 30, y: -5, r: 38 }, depth: 24, float: 11 },
  { key: 'recheioPimenta', open: { x: 11, y: -27, r: -22 }, depth: 18, float: 12 },
];

/* -------------------------------------------------------------------------- */
/* Placeholders vetoriais                                                      */
/* -------------------------------------------------------------------------- */

const INK = 'rgba(107,20,32,0.55)';
const AREIA = '#EBDDC8';
const AREIA_2 = '#DCC6A6';

function Caption({ x, y, text, size = 46 }: { x: number; y: number; text: string; size?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={size} fill="#6B1420" fillOpacity="0.85">
      {text}
    </text>
  );
}

/** corpo do pastel retangular com borda de garfo */
function PastelBody({ fill, label, crimp = true }: { fill: string; label: string; crimp?: boolean }) {
  const ticks: string[] = [];
  if (crimp) {
    for (let x = 440; x <= 1960; x += 48) ticks.push(`M${x} 830v52M${x} 1568v52`);
    for (let y = 900; y <= 1550; y += 48) ticks.push(`M380 ${y}h52M1968 ${y}h52`);
  }
  return (
    <>
      <rect x="350" y="800" width="1700" height="850" rx="130" fill={fill} stroke={INK} strokeWidth="10" />
      {crimp && <path d={ticks.join('')} stroke={INK} strokeWidth="9" strokeLinecap="round" opacity="0.6" />}
      <Caption x={1200} y={1240} text={label} size={56} />
    </>
  );
}

const PLACEHOLDERS: Partial<Record<ImageKey, React.ReactNode>> = {
  pastelInteiro: <PastelBody fill={AREIA} label="[IMAGEM: pastel-inteiro.png]" />,
  massaCima: <PastelBody fill={AREIA} label="[IMAGEM: pastel-massa-cima.png]" />,
  massaBaixo: (
    <>
      <rect x="350" y="800" width="1700" height="850" rx="130" fill={AREIA_2} stroke={INK} strokeWidth="10" />
      <Caption x={1200} y={1600} text="[IMAGEM: pastel-massa-baixo.png]" />
    </>
  ),
  recheioQueijo: (
    <>
      <rect x="650" y="1030" width="150" height="150" rx="22" fill="#F3E3B8" stroke={INK} strokeWidth="9" transform="rotate(-10 725 1105)" />
      <rect x="820" y="1110" width="130" height="130" rx="20" fill="#F3E3B8" stroke={INK} strokeWidth="9" transform="rotate(14 885 1175)" />
      <Caption x={800} y={1320} text="[recheio-queijo.png]" size={42} />
    </>
  ),
  recheioCarne: (
    <>
      <path d="M1120 1150c40-80 170-90 230-30 70 0 110 90 60 150-20 80-160 100-230 50-90-10-110-110-60-170Z" fill={AREIA_2} stroke={INK} strokeWidth="9" />
      <Caption x={1250} y={1400} text="[recheio-carne.png]" size={42} />
    </>
  ),
  recheioTomate: (
    <>
      <circle cx="1650" cy="1130" r="110" fill="#F0C9B0" stroke={INK} strokeWidth="9" />
      <circle cx="1650" cy="1130" r="62" fill="none" stroke={INK} strokeWidth="7" strokeDasharray="20 18" />
      <Caption x={1650} y={1300} text="[recheio-tomate.png]" size={42} />
    </>
  ),
  recheioCebola: (
    <>
      <circle cx="980" cy="1420" r="95" fill="none" stroke={INK} strokeWidth="28" opacity="0.7" />
      <Caption x={980} y={1570} text="[recheio-cebola.png]" size={42} />
    </>
  ),
  recheioSalsinha: (
    <>
      <path d="M1460 1500c40-120 170-170 260-130-20 110-140 170-260 130Zm0 0c60-40 130-80 200-110" fill="#D9DDB8" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <Caption x={1590} y={1580} text="[recheio-salsinha.png]" size={42} />
    </>
  ),
  recheioPimenta: (
    <>
      <path d="M1760 1300c80-20 190 10 250 80 20 30 10 50-20 40-70-30-150-40-230-40-40 0-40-70 0-80Zm-10 20c-30-20-50-50-50-80" fill="#F0C2A8" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <Caption x={1880} y={1460} text="[recheio-pimenta.png]" size={42} />
    </>
  ),
  migalhas: (
    <>
      {[
        [520, 1720, 16],
        [640, 1760, 11],
        [1500, 1740, 14],
        [1700, 1710, 10],
        [1880, 1750, 13],
        [980, 1770, 9],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={AREIA_2} stroke={INK} strokeWidth="5" />
      ))}
    </>
  ),
};

/** Conteúdo de uma camada: PNG real se existir, senão o placeholder vetorial. */
export function LayerArt({ k, real, priority = false }: { k: ImageKey; real: boolean; priority?: boolean }) {
  if (real) {
    return (
      <Image
        src={imageSrc(k)}
        alt={IMAGES[k].alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        priority={priority}
        className="pointer-events-none select-none object-contain"
        draggable={false}
      />
    );
  }
  return (
    <svg viewBox="0 0 2400 2400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {PLACEHOLDERS[k]}
    </svg>
  );
}
