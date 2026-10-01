"use client";

/**
 * Ilustração de substituição do hero (enquanto não existe hero-pasteis.png):
 * cesta de vime com pastéis retangulares dourados. Traço bordô, preenchimentos
 * chapados em laranja e creme. Cada pastel é interativo (balão no hover/toque).
 */

const BORDO = "#6B1420";
const BORDO_ESCURO = "#4F0F18";
const LARANJA = "#FFB74D";
const CREME = "#FBF4E8";

// Elipse da boca da cesta
const CX = 400;
const RIM_Y = 330;
const RX = 300;
const RY = 46;

// Pastel 220×128, desenhado em volta da origem, com contorno levemente irregular
const PASTEL_OUTLINE =
  "M-100 -62 C-50 -68 40 -67 98 -61 C108 -60 112 -52 111 -42 C114 -12 113 18 109 46 C108 56 101 62 92 62 C40 67 -40 67 -96 62 C-106 61 -111 55 -110 45 C-114 15 -113 -18 -110 -46 C-109 -56 -106 -61 -100 -62 Z";
const PASTEL_CRIMP =
  "M-94 -50 C-40 -55 40 -55 94 -50 C99 -20 99 20 96 50 C40 54 -40 54 -94 50 C-98 20 -98 -20 -94 -50 Z";

export type PastelSpot = { x: number; y: number };

type PastelDef = { x: number; y: number; r: number; s?: number };

// Pastéis dentro da cesta (de trás para frente) e um apoiado na frente
const INSIDE: PastelDef[] = [
  { x: 245, y: 250, r: -30 },
  { x: 565, y: 246, r: 26 },
  { x: 405, y: 205, r: -7 },
  { x: 300, y: 292, r: -13 },
  { x: 515, y: 290, r: 15 },
  { x: 410, y: 318, r: 4 },
];
const OUTSIDE: PastelDef[] = [{ x: 660, y: 540, r: 12, s: 0.78 }];

function rimPoint(t: number) {
  // t de 0 (esquerda) a 1 (direita) pela frente da elipse
  const a = Math.PI - t * Math.PI;
  return { x: CX + RX * Math.cos(a), y: RIM_Y + RY * Math.sin(a) };
}

// Bordas do corpo da cesta: de (100,330) até a base (190,556)
function bodyEdge(t: number, side: -1 | 1) {
  const top = CX + side * RX;
  const bottom = CX + side * 210;
  const x = top + (bottom - top) * Math.pow(t, 1.6);
  const y = RIM_Y + t * 226;
  return { x, y };
}

function weave() {
  const bands: string[] = [];
  const highlights: string[] = [];
  const rows = 6;
  for (let i = 1; i <= rows; i++) {
    const t = i / (rows + 0.6);
    const l = bodyEdge(t, -1);
    const r = bodyEdge(t, 1);
    const sag = RY * (1 - t * 0.5);
    bands.push(`M${l.x.toFixed(1)} ${l.y.toFixed(1)} Q${CX} ${(l.y + sag * 2).toFixed(1)} ${r.x.toFixed(1)} ${r.y.toFixed(1)}`);
  }
  const stakes: string[] = [];
  const cols = 14;
  for (let j = 1; j < cols; j++) {
    const u = j / cols;
    const top = rimPoint(u);
    const bx = CX + (top.x - CX) * 0.7;
    stakes.push(`M${top.x.toFixed(1)} ${top.y.toFixed(1)} Q${((top.x + bx) / 2 + (top.x - CX) * 0.08).toFixed(1)} ${(top.y + 110).toFixed(1)} ${bx.toFixed(1)} 560`);
  }
  // Brilhos alternados para sugerir o trançado "por cima/por baixo"
  for (let i = 0; i < rows; i++) {
    const t = (i + 0.5) / (rows + 0.6);
    const l = bodyEdge(t, -1);
    const r = bodyEdge(t, 1);
    const sag = RY * (1 - t * 0.5);
    for (let j = 0; j < cols; j++) {
      if ((i + j) % 2) continue;
      const u0 = (j + 0.15) / cols;
      const u1 = (j + 0.85) / cols;
      const p = (u: number) => {
        const x = l.x + (r.x - l.x) * u;
        const k = 1 - Math.pow(2 * u - 1, 2);
        const y = l.y + (r.y - l.y) * u + sag * k;
        return `${x.toFixed(1)} ${y.toFixed(1)}`;
      };
      highlights.push(`M${p(u0)} L${p((u0 + u1) / 2)} L${p(u1)}`);
    }
  }
  return { bands: bands.join(" "), stakes: stakes.join(" "), highlights: highlights.join(" ") };
}

const W = weave();

function ellipseArc(front: boolean) {
  const sweep = front ? 0 : 1;
  return `M${CX - RX} ${RIM_Y} A${RX} ${RY} 0 0 ${sweep} ${CX + RX} ${RIM_Y}`;
}

function Pastel({
  def,
  index,
  onActivate,
  onDeactivate,
}: {
  def: PastelDef;
  index: number;
  onActivate?: (spot: PastelSpot) => void;
  onDeactivate?: () => void;
}) {
  const s = def.s ?? 1;
  const spot = { x: def.x, y: def.y - 64 * s };
  return (
    <g
      transform={`translate(${def.x} ${def.y}) rotate(${def.r}) scale(${s})`}
      className="pastel cursor-pointer outline-none"
      tabIndex={0}
      role="button"
      aria-label={`Pastel ${index + 1}: crocante por fora, recheio generoso por dentro`}
      onPointerEnter={(e) => e.pointerType === "mouse" && onActivate?.(spot)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onDeactivate?.()}
      onClick={() => onActivate?.(spot)}
      onFocus={() => onActivate?.(spot)}
      onBlur={() => onDeactivate?.()}
      data-cursor="Ver"
    >
      <g className="pastel-body transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]">
        <path d={PASTEL_OUTLINE} fill={LARANJA} stroke={BORDO} strokeWidth={4} strokeLinejoin="round" />
        {/* marcas do garfo na borda */}
        <path d={PASTEL_CRIMP} fill="none" stroke={BORDO} strokeOpacity={0.55} strokeWidth={13} strokeDasharray="2.5 9" />
        <path d={PASTEL_CRIMP} fill="none" stroke={BORDO} strokeOpacity={0.35} strokeWidth={2} />
        {/* bolhinhas da fritura e brilho */}
        <g fill={BORDO} fillOpacity={0.16}>
          <circle cx={-40} cy={-12} r={5} />
          <circle cx={-22} cy={14} r={3.5} />
          <circle cx={30} cy={-18} r={4} />
          <circle cx={48} cy={16} r={6} />
          <circle cx={8} cy={4} r={3} />
          <circle cx={-60} cy={20} r={3} />
        </g>
        <path d="M-70 -30 C-40 -36 -10 -36 14 -33" stroke={CREME} strokeOpacity={0.85} strokeWidth={5} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}

export function Basket({
  onActivate,
  onDeactivate,
  className,
}: {
  onActivate?: (spot: PastelSpot) => void;
  onDeactivate?: () => void;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-labelledby="cesta-titulo">
      <title id="cesta-titulo">Cesta de vime cheia de pastéis retangulares dourados</title>
      <style>{`
        .pastel:hover .pastel-body, .pastel:focus-visible .pastel-body { transform: translateY(-10px) rotate(-2deg) scale(1.04); }
        .pastel:focus-visible path:first-child { stroke: ${LARANJA}; }
        @media (prefers-reduced-motion: reduce) { .pastel .pastel-body { transform: none !important; } }
      `}</style>

      {/* sombra no chão */}
      <ellipse cx={CX} cy={566} rx={250} ry={16} fill={BORDO} fillOpacity={0.14} />

      {/* fundo da cesta e borda de trás */}
      <ellipse cx={CX} cy={RIM_Y} rx={RX - 6} ry={RY - 4} fill={BORDO_ESCURO} />
      <path d={ellipseArc(false)} fill="none" stroke={BORDO_ESCURO} strokeWidth={26} strokeLinecap="round" />
      <path d={ellipseArc(false)} fill="none" stroke={BORDO} strokeWidth={18} strokeDasharray="16 9" strokeLinecap="round" />

      {INSIDE.map((d, i) => (
        <Pastel key={i} def={d} index={i} onActivate={onActivate} onDeactivate={onDeactivate} />
      ))}

      {/* corpo da cesta */}
      <path
        d={`M${CX - RX} ${RIM_Y} A${RX} ${RY} 0 0 0 ${CX + RX} ${RIM_Y} C692 420 660 520 610 556 C540 576 260 576 190 556 C140 520 108 420 ${CX - RX} ${RIM_Y} Z`}
        fill={BORDO}
        stroke={BORDO_ESCURO}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d={W.stakes} fill="none" stroke={BORDO_ESCURO} strokeWidth={3} strokeLinecap="round" />
      <path d={W.bands} fill="none" stroke={BORDO_ESCURO} strokeWidth={4} strokeLinecap="round" />
      <path d={W.highlights} fill="none" stroke={LARANJA} strokeOpacity={0.28} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

      {/* borda da frente, trançada */}
      <path d={ellipseArc(true)} fill="none" stroke={BORDO_ESCURO} strokeWidth={28} strokeLinecap="round" />
      <path d={ellipseArc(true)} fill="none" stroke={BORDO} strokeWidth={20} strokeDasharray="18 9" strokeLinecap="round" />
      <path d={ellipseArc(true)} fill="none" stroke={LARANJA} strokeOpacity={0.35} strokeWidth={4} strokeDasharray="10 17" strokeDashoffset={-4} strokeLinecap="round" />

      {/* alças */}
      <path d="M92 318 C70 300 72 268 98 262" fill="none" stroke={BORDO_ESCURO} strokeWidth={14} strokeLinecap="round" />
      <path d="M708 318 C730 300 728 268 702 262" fill="none" stroke={BORDO_ESCURO} strokeWidth={14} strokeLinecap="round" />

      {OUTSIDE.map((d, i) => (
        <Pastel key={`o${i}`} def={d} index={INSIDE.length + i} onActivate={onActivate} onDeactivate={onDeactivate} />
      ))}
    </svg>
  );
}

export const BASKET_VIEWBOX = { w: 800, h: 600 };
