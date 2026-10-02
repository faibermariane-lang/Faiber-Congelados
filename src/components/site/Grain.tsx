const noise = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .17 0 0 0 0 .04 0 0 0 0 .05 0 0 0 1.4 -.2'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
);

/** Grão de papel por cima de tudo (3–4%), sem interferir no clique. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
      style={{ backgroundImage: `url("data:image/svg+xml,${noise}")`, backgroundSize: "240px 240px" }}
    />
  );
}
