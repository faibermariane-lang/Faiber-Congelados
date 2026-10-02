import { motion, useMotionValue, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { PHOTOS, type Photo, type SketchName } from '../content/site';
import { cn } from '../lib/cn';
import { Eyebrow } from './ui/Eyebrow';
import { Picture } from './ui/Picture';
import { PhotoPlaceholder } from './ui/PhotoPlaceholder';
import { Reveal, RevealItem } from './ui/Reveal';

type Slide = {
  label: string;
  caption: string;
  shape: 'tall' | 'wide' | 'square';
  photo?: Photo;
  sketch?: SketchName;
};

const SLIDES: Slide[] = [
  { label: 'Pastel', caption: 'Borda rendada, massa sequinha', shape: 'wide', photo: PHOTOS.pastel },
  { label: 'Coxinha', caption: 'Formato de gota, crosta crocante', shape: 'square', photo: PHOTOS.coxinha },
  { label: 'Enroladinho', caption: 'Para o balcão e para festas', shape: 'tall', sketch: 'enroladinho' },
  { label: 'Pastel', caption: 'Recém-saído da fritura', shape: 'wide', photo: PHOTOS.bandeja },
  { label: 'Mini pizza', caption: 'Tamanho certo para o lanche', shape: 'square', sketch: 'miniPizza' },
  { label: 'Coxinha', caption: 'Vitrine cheia, cliente feliz', shape: 'wide', photo: PHOTOS.vitrineCoxinhas },
  { label: 'Assados', caption: 'Opção de forno', shape: 'tall', sketch: 'assado' },
  { label: 'Embalagem', caption: 'A marca que chega ao seu balcão', shape: 'tall', photo: PHOTOS.embalagem },
];

const SHAPES: Record<Slide['shape'], string> = {
  tall: 'w-[15rem] h-[20rem] md:w-[19rem] md:h-[25rem] self-end',
  wide: 'w-[19rem] h-[13.5rem] md:w-[27rem] md:h-[18.5rem] self-start',
  square: 'w-[16rem] h-[16rem] md:w-[21rem] md:h-[21rem] self-center',
};

const SPEED = 38; // px por segundo

export function ProductMarquee() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [userPaused, setUserPaused] = useState(false);

  // estado mutável do motor, fora do ciclo de render
  const state = useRef({
    half: 0,
    speed: 0,
    velocity: 0,
    hovering: false,
    dragging: false,
    lastInteraction: 0,
    visible: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastT: 0,
    moved: 0,
  });

  useEffect(() => {
    if (reduce) setUserPaused(true);
  }, [reduce]);

  const pausedRef = useRef(userPaused);
  pausedRef.current = userPaused;

  useEffect(() => {
    const s = state.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      // período exato do loop: distância entre o 1º item e sua cópia
      const items = track.children;
      const copy = items[SLIDES.length] as HTMLElement | undefined;
      s.half = copy ? copy.offsetLeft - (items[0] as HTMLElement).offsetLeft : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting));
    io.observe(viewport);

    const wrap = (v: number) => {
      if (!s.half) return v;
      let n = v % s.half;
      if (n > 0) n -= s.half;
      return n;
    };

    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (s.visible && !s.dragging) {
        const idle = now - s.lastInteraction > 1600;
        const target = !pausedRef.current && !s.hovering && idle ? SPEED : 0;
        s.speed += (target - s.speed) * Math.min(dt * 3, 1);
        if (target === 0 && s.speed < 0.5) s.speed = 0;
        // inércia após arrastar
        s.velocity *= Math.pow(0.04, dt);
        if (Math.abs(s.velocity) < 2) s.velocity = 0;
        if (s.speed || s.velocity) x.set(wrap(x.get() - s.speed * dt + s.velocity * dt));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // rolagem horizontal em trackpad
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      s.lastInteraction = performance.now();
      x.set(wrap(x.get() - e.deltaX));
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      viewport.removeEventListener('wheel', onWheel);
    };
  }, [x]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    s.dragging = true;
    s.velocity = 0;
    s.speed = 0;
    s.startX = s.lastX = e.clientX;
    s.startOffset = x.get();
    s.lastT = performance.now();
    s.moved = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    const dt = Math.max(now - s.lastT, 1) / 1000;
    s.velocity = s.velocity * 0.6 + (dx / dt) * 0.4;
    s.lastX = e.clientX;
    s.lastT = now;
    s.moved += Math.abs(dx);
    let v = s.startOffset + (e.clientX - s.startX);
    if (s.half) {
      v = v % s.half;
      if (v > 0) v -= s.half;
    }
    x.set(v);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.lastInteraction = performance.now();
    if (performance.now() - s.lastT > 80) s.velocity = 0;
    s.velocity = Math.max(-2400, Math.min(2400, s.velocity));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = state.current;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      s.lastInteraction = performance.now();
      s.velocity = e.key === 'ArrowRight' ? -900 : 900;
    }
  };

  const renderSlides = (copy: boolean) =>
    SLIDES.map((slide, i) => (
      <figure
        key={`${copy ? 'b' : 'a'}${i}`}
        className={cn('group relative shrink-0', SHAPES[slide.shape])}
        aria-hidden={copy || undefined}
      >
        <div className="relative h-[calc(100%-2.75rem)] overflow-hidden bg-creme-dark">
          {slide.photo ? (
            <div className="h-full w-full transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.05]">
              <Picture photo={slide.photo} sizes="(min-width: 768px) 27rem, 19rem" className="pointer-events-none select-none" alt={copy ? '' : undefined} />
            </div>
          ) : (
            <PhotoPlaceholder sketch={slide.sketch!} label={slide.label} />
          )}
        </div>
        <figcaption className="flex h-11 items-end justify-between gap-4 border-b border-line pb-2">
          <span className="flex items-baseline gap-2">
            <span className="eyebrow text-[0.7rem] text-laranja tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-xl text-ink">{slide.label}</span>
          </span>
          <span className="truncate text-[0.8125rem] text-muted">{slide.caption}</span>
        </figcaption>
      </figure>
    ));

  return (
    <section id="vitrine" aria-labelledby="vitrine-title" className="relative overflow-hidden bg-creme py-24 md:py-32">
      <Reveal className="container-x grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <RevealItem>
            <Eyebrow index="01" className="text-bordo">
              A vitrine Faiber
            </Eyebrow>
          </RevealItem>
          <RevealItem as="h2" id="vitrine-title" className="font-display mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] font-[400] text-ink">
            Feito para conquistar pelo olhar. <em className="font-[320] text-bordo">Lembrado pelo sabor.</em>
          </RevealItem>
        </div>
        <RevealItem className="flex items-center gap-4 md:col-span-4 md:justify-end">
          <p className="max-w-[24ch] text-[0.9375rem] text-muted md:text-right">Arraste para explorar a linha, no seu ritmo.</p>
          <button
            type="button"
            onClick={() => {
              setUserPaused((p) => !p);
              state.current.lastInteraction = 0;
            }}
            aria-pressed={userPaused}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-bordo/40 text-bordo transition-colors duration-300 hover:border-bordo hover:bg-bordo hover:text-creme"
          >
            {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            <span className="sr-only">{userPaused ? 'Retomar movimento da vitrine' : 'Pausar movimento da vitrine'}</span>
          </button>
        </RevealItem>
      </Reveal>

      <motion.div
        ref={viewportRef}
        role="region"
        aria-roledescription="vitrine"
        aria-label="Fotografias dos produtos Faiber. Use as setas para navegar."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => e.pointerType === 'mouse' && (state.current.hovering = true)}
        onPointerLeave={() => (state.current.hovering = false)}
        onFocus={() => (state.current.hovering = true)}
        onBlur={() => (state.current.hovering = false)}
        className="relative mt-14 cursor-grab select-none touch-pan-y outline-offset-[-3px] active:cursor-grabbing md:mt-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex h-[22rem] w-max gap-5 pl-5 will-change-transform md:h-[27rem] md:gap-8 md:pl-8">
          {renderSlides(false)}
          {renderSlides(true)}
        </motion.div>
      </motion.div>
    </section>
  );
}
