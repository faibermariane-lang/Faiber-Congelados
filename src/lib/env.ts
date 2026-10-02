/**
 * Leitura do ambiente definido pelo script de inicialização (ver `bootScript`).
 * As classes no <html> são a fonte da verdade: `motion` | `reduced`, `artboard`, `show-preloader`.
 */
const has = (c: string) =>
  typeof document !== "undefined" && document.documentElement.classList.contains(c);

export const isMotion = () => has("motion");
export const isArtboard = () => has("artboard");
export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

export const PRELOADER_KEY = "faiber-preloader";

/** Roda antes da pintura: evita flashes de conteúdo e decide preloader/movimento. */
export const bootScript = `(function(){try{var d=document.documentElement,p=new URLSearchParams(location.search);var ab=p.get('artboard')==='1';var rm=p.get('motion')==='0'||matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(rm?'reduced':'motion');if(ab)d.classList.add('artboard');var seen=false;try{seen=sessionStorage.getItem('${PRELOADER_KEY}')==='1'}catch(e){}if(!rm&&!ab&&!seen)d.classList.add('show-preloader')}catch(e){}})();`;
