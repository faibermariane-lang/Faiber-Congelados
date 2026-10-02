"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isMotion } from "@/lib/env";
import { useUI } from "@/lib/store";

/*
 * Gravuras em traço fino (estilo técnico/botânico), geradas de forma determinística.
 * Bordô, opacidade baixa (definida por quem usa), desenhadas com stroke-dashoffset.
 */

type Pt = [number, number];

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const f = (n: number) => n.toFixed(1);

/** Catmull-Rom fechado → cúbicas. */
function smoothClosed(pts: Pt[]) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

/** Ponto e normal (para fora) num retângulo arredondado, t ∈ [0,1). */
function roundedRect(x: number, y: number, w: number, h: number, r: number) {
  const straight = [w - 2 * r, h - 2 * r, w - 2 * r, h - 2 * r];
  const arc = (Math.PI / 2) * r;
  const total = straight.reduce((a, b) => a + b, 0) + 4 * arc;
  return (t: number): { p: Pt; n: Pt } => {
    let s = (((t % 1) + 1) % 1) * total;
    const corners: [number, number, number][] = [
      [x + w - r, y + r, -Math.PI / 2],
      [x + w - r, y + h - r, 0],
      [x + r, y + h - r, Math.PI / 2],
      [x + r, y + r, Math.PI],
    ];
    const starts: Pt[] = [
      [x + r, y],
      [x + w, y + r],
      [x + w - r, y + h],
      [x, y + h - r],
    ];
    const dirs: Pt[] = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const normals: Pt[] = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    for (let i = 0; i < 4; i++) {
      if (s <= straight[i]) {
        return { p: [starts[i][0] + dirs[i][0] * s, starts[i][1] + dirs[i][1] * s], n: normals[i] };
      }
      s -= straight[i];
      if (s <= arc) {
        const [cx, cy, a0] = corners[i];
        const a = a0 + s / r;
        return { p: [cx + Math.cos(a) * r, cy + Math.sin(a) * r], n: [Math.cos(a), Math.sin(a)] };
      }
      s -= arc;
    }
    return { p: starts[0], n: normals[0] };
  };
}

function buildPastel() {
  const rand = rng(7);
  const outer = roundedRect(40, 70, 520, 270, 46);
  const wobble = (seed: number) => Array.from({ length: 64 }, (_, i) => Math.sin(i * 0.9 + seed) * 2.2 + (rand() - 0.5) * 2.4);

  const w1 = wobble(1);
  const contour = smoothClosed(Array.from({ length: 64 }, (_, i) => {
    const { p, n } = outer(i / 64);
    return [p[0] + n[0] * w1[i], p[1] + n[1] * w1[i]] as Pt;
  }));
  const w2 = wobble(3);
  const seal = smoothClosed(Array.from({ length: 64 }, (_, i) => {
    const { p, n } = outer(i / 64);
    return [p[0] - n[0] * (26 + w2[i] * 0.5), p[1] - n[1] * (26 + w2[i] * 0.5)] as Pt;
  }));

  // marcas do garfo na borda serrilhada
  const ticks: string[] = [];
  const count = 118;
  for (let i = 0; i < count; i++) {
    const { p, n } = outer(i / count + 0.002);
    const a = 5 + rand() * 2, b = 21 + rand() * 3;
    ticks.push(`M${f(p[0] - n[0] * a)} ${f(p[1] - n[1] * a)}L${f(p[0] - n[0] * b)} ${f(p[1] - n[1] * b)}`);
  }

  // bolhas da massa
  const bubbles: string[] = [];
  for (let i = 0; i < 26; i++) {
    const cx = 110 + rand() * 380, cy = 125 + rand() * 160, r = 2 + rand() * 6.5, ry = r * (0.7 + rand() * 0.3);
    bubbles.push(`M${f(cx - r)} ${f(cy)}a${f(r)} ${f(ry)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(ry)} 0 1 0 ${f(-2 * r)} 0`);
    if (r > 5) bubbles.push(`M${f(cx - r * 0.45)} ${f(cy - ry * 0.35)}q${f(r * 0.3)} ${f(-ry * 0.35)} ${f(r * 0.7)} ${f(-ry * 0.2)}`);
  }

  // hachura diagonal da sombra (canto inferior direito)
  const hatch: string[] = [];
  for (let k = 0; k < 46; k++) {
    const x0 = 260 + k * 8.5;
    const len = 40 + Math.sin(k * 0.35) * 18 + k * 3.2;
    hatch.push(`M${f(x0)} 340L${f(x0 + len * 0.6)} ${f(340 - len)}`);
  }

  // dobra/estufamento: duas curvas suaves no topo
  const puff = ["M120 120C220 100 380 98 480 118", "M140 300C260 318 360 318 470 296"];

  return { contour, seal, ticks, bubbles, hatch, puff };
}

function buildLeaf() {
  const rand = rng(11);
  const outline = "M40 300C110 210 220 120 360 80C440 58 520 60 560 70C520 92 470 150 400 205C320 268 190 318 40 300Z";
  const rib = "M40 300C180 250 340 170 560 70";
  const veins: string[] = [];
  for (let i = 1; i < 14; i++) {
    const t = i / 14;
    const x = 40 + t * 520, y = 300 - t * 230 - Math.sin(t * Math.PI) * 30;
    const up = 34 * Math.sin(t * Math.PI) + 8, down = 30 * Math.sin(t * Math.PI) + 6;
    veins.push(`M${f(x)} ${f(y)}Q${f(x + 10)} ${f(y - up * 0.6)} ${f(x + 26 + rand() * 6)} ${f(y - up)}`);
    veins.push(`M${f(x)} ${f(y)}Q${f(x + 4)} ${f(y + down * 0.6)} ${f(x + 18 + rand() * 6)} ${f(y + down)}`);
  }
  const stem = "M40 300C26 310 14 318 4 330";
  return { outline, rib, veins, stem };
}

type Variant = "pastel" | "louro";

export function Engraving({
  variant,
  className = "",
  draw = "scroll",
  title,
}: {
  variant: Variant;
  className?: string;
  /** scroll: desenha conforme a rolagem; intro: desenha após o preloader. */
  draw?: "scroll" | "intro" | "none";
  title?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const introDone = useUI((s) => s.introDone);
  const paths = useMemo(() => {
    if (variant === "pastel") {
      const p = buildPastel();
      return { strokes: [p.contour, p.seal, ...p.puff, ...p.ticks, ...p.bubbles], hatch: p.hatch, clip: p.seal };
    }
    const l = buildLeaf();
    return { strokes: [l.outline, l.rib, l.stem, ...l.veins], hatch: [] as string[], clip: l.outline };
  }, [variant]);
  const clipId = `clip-${variant}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || draw === "none" || !isMotion()) return;
    const els = svg.querySelectorAll<SVGPathElement>("path[pathLength]");
    gsap.set(els, { strokeDasharray: 1, strokeDashoffset: 1 });
    if (draw === "intro") {
      if (!introDone) return;
      const tw = gsap.to(els, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: { amount: 1.2 } });
      return () => {
        tw.kill();
      };
    }
    const tw = gsap.to(els, {
      strokeDashoffset: 0,
      ease: "none",
      stagger: { amount: 0.6 },
      scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 35%", scrub: 1 },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [draw, introDone]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 400"
      fill="none"
      stroke="var(--color-bordo)"
      strokeWidth={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-draw={draw === "none" ? undefined : draw}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={clipId}>
          <path d={paths.clip} />
        </clipPath>
      </defs>
      {paths.strokes.map((d, i) => (
        <path key={i} d={d} pathLength={1} />
      ))}
      {paths.hatch.length > 0 && (
        <g clipPath={`url(#${clipId})`} strokeWidth={0.7}>
          {paths.hatch.map((d, i) => (
            <path key={i} d={d} pathLength={1} />
          ))}
        </g>
      )}
    </svg>
  );
}
