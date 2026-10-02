/**
 * Preferência de movimento. Respeita o sistema (prefers-reduced-motion)
 * e o modo "sem animações" do artboard (?motion=0).
 */
export function motionDisabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (document.documentElement.dataset.motion === 'off') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Mouse de verdade (não touch): habilita Lenis e parallax de cursor. */
export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function isArtboard(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.dataset.artboard === '1';
}
