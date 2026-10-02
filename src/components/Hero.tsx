import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { CONTACT, MESSAGES, PHOTOS, PRODUCTS } from '../content/site';
import { whatsappHref } from '../lib/contact';
import { useFinePointer } from '../hooks/useFinePointer';
import { Picture } from './ui/Picture';
import { Sketch } from './ui/Sketch';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Camada que acompanha o mouse com intensidade própria (profundidade). */
function Depth({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div aria-hidden="true" className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  );
}

function Line({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '5%']);
  const slowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const fastY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -260]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      id="topo"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="paper relative isolate overflow-hidden bg-creme pb-14 pt-28 lg:min-h-[100svh] lg:pb-0 lg:pt-32"
    >
      {/* Sketches de fundo, com velocidades diferentes */}
      <motion.div style={{ y: slowY }} className="pointer-events-none absolute -left-10 top-24 -z-10 hidden md:block">
        <Depth x={sx} y={sy} depth={-18} className="text-marrom/[0.13]">
          <Sketch name="trigo" className="w-28 -rotate-12 lg:w-36" delay={0.6} />
        </Depth>
      </motion.div>
      <motion.div style={{ y: fastY }} className="pointer-events-none absolute -bottom-24 left-[-6rem] -z-10 hidden lg:block">
        <Depth x={sx} y={sy} depth={26} className="text-bordo/[0.12]">
          <Sketch name="pastel" className="w-[22rem] rotate-[8deg]" delay={1} />
        </Depth>
      </motion.div>
      <motion.div style={{ y: slowY }} className="pointer-events-none absolute right-[2%] top-[14%] -z-10">
        <Depth x={sx} y={sy} depth={-30} className="text-marrom/[0.14]">
          <Sketch name="pimenta" className="w-28 rotate-[24deg] lg:w-40" delay={1.2} />
        </Depth>
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 -z-10 text-marrom/[0.1] lg:hidden">
        <Sketch name="folha" className="w-40" delay={1} />
      </div>

      <div className="container-x grid items-center gap-y-12 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12 lg:gap-x-10">
        {/* Texto */}
        <div className="relative lg:col-span-7 lg:pb-16">
          <motion.p
            className="eyebrow flex items-center gap-3 text-bordo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-laranja" />
            Desde {CONTACT.foundedYear} · {CONTACT.city} — {CONTACT.stateShort}
          </motion.p>

          <h1
            id="hero-title"
            className="font-display mt-6 text-[clamp(2.9rem,8.4vw,7.25rem)] font-[420] uppercase text-ink lg:mt-8"
          >
            <Line delay={0.2}>Um clássico</Line>
            <Line delay={0.32}>brasileiro.</Line>
            <Line delay={0.48} className="font-[340] normal-case italic text-bordo">
              Feito para ir além.
            </Line>
          </h1>

          <div className="mt-9 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 lg:mt-12">
            <motion.p
              className="font-display max-w-[22ch] text-[1.375rem] italic !leading-[1.3] text-ink-soft md:text-[1.5rem]"
              style={{ letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
            >
              Há sabores que atravessam gerações. E há quem escolha fazer parte dessa história.
            </motion.p>
            <motion.p
              className="max-w-[42ch] text-muted md:border-l md:border-line md:pl-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: EASE }}
            >
              Na Faiber, transformamos tradição em produtos congelados que unem sabor, qualidade e praticidade para o
              seu negócio.
            </motion.p>
          </div>

          <motion.div
            className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
          >
            <a href="#produtos" className="btn btn-primary">
              Conheça nossos produtos
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
            <a href={whatsappHref(MESSAGES.products)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Fale com a Faiber
            </a>
          </motion.div>
        </div>

        {/* Fotografia */}
        <div className="relative lg:col-span-5 lg:self-stretch lg:pb-24">
          <Depth x={sx} y={sy} depth={-10} className="relative h-full">
            <motion.figure
              className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden bg-creme-dark lg:aspect-auto lg:h-full lg:max-h-[46rem] lg:min-h-[34rem]"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
            >
              <motion.div
                className="absolute inset-[-6%_0]"
                style={{ y: photoY }}
                initial={{ scale: reduce ? 1 : 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
              >
                <Picture
                  photo={PHOTOS.hero}
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 34rem, 92vw"
                  className="object-[60%_70%]"
                />
              </motion.div>
              <figcaption className="eyebrow absolute bottom-0 left-0 flex items-center gap-2 bg-creme px-4 py-3 text-[0.75rem] text-bordo">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-laranja" />
                Fig. 01 — Pastel retangular, borda rendada
              </figcaption>
            </motion.figure>
          </Depth>

          <motion.div
            aria-hidden="true"
            className="absolute -left-5 top-8 hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: EASE }}
          >
            <Depth x={sx} y={sy} depth={16}>
              <span className="eyebrow grid size-24 place-items-center rounded-full bg-bordo text-center text-[0.7rem] leading-tight text-creme">
                Feito em
                <br />
                Chapecó
                <br />— SC —
              </span>
            </Depth>
          </motion.div>
        </div>
      </div>

      {/* Rodapé do hero */}
      <motion.div
        className="container-x relative mt-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex items-center justify-between gap-6 border-t border-line py-5">
          <p className="eyebrow hidden text-muted md:block">{PRODUCTS.map((p) => p.name).join(' · ')}</p>
          <a href="#vitrine" className="eyebrow group flex items-center gap-3 text-ink-soft hover:text-bordo">
            Role para descobrir
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-current">
              <ArrowDown className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
