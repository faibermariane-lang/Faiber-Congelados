import { sketches, type SketchName } from "./sketches";

/** Desenho em traço bordô. Cada path tem pathLength=1 para animar o "desenho". */
export function Sketch({ name, className, strokeWidth = 1.6 }: { name: SketchName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true" focusable="false">
      {sketches[name].map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          data-draw
        />
      ))}
    </svg>
  );
}
