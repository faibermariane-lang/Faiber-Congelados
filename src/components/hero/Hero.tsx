'use client';

import { useEffect, useRef } from 'react';
import { HERO } from '@/content';
import type { ImageAvailability } from '@/images';
import { whatsappHref } from '@/lib/contact';
import { loadGsap } from '@/lib/gsap';
import { hasFinePointer, motionDisabled } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { ArrowRight, ReplayIcon, WhatsAppIcon } from '../ui/icons';
import { LayerArt, MASSA_BAIXO, MASSA_CIMA, MIGALHAS, RECHEIOS, type LayerSpec } from './layers';

const TONE = { bordo: 'text-bordo', laranja: 'text-laranja-forte' } as const;

export function Hero({ images }: { images: ImageAvailability }) {
  // Modo completo: há camadas da massa (reais) OU nenhuma imagem real ainda (placeholders).
  // Modo simples: só existe o pastel-inteiro.png.
  const simple = images.pastelInteiro && !(images.massaCima && images.massaBaixo);
  const stack: LayerSpec[] = simple
    ? RECHEIOS
    : [MASSA_BAIXO, ...RECHEIOS, ...(images.migalhas ? [MIGALHAS] : []), MASSA_CIMA];

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const wholeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<() => void>(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const whole = wholeRef.current;
    if (!section || !stage || !tilt || !whole) return;

    const layers = Array.from(stage.querySelectorAll<HTMLElement>('[data-layer]'));
    const specs = layers.map((el) => stack[Number(el.dataset.layer)]);
    const opens = layers.map((el) => el.querySelector<HTMLElement>('[data-open]')!);
    const floats = layers.map((el) => el.querySelector<HTMLElement>('[data-float]')!);

    let killed = false;
    let cleanup = () => {};

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (killed) return;
      const reduce = motionDisabled();
      // progresso de abertura por camada (0 fechado → 1 aberto) e extra do scroll
      const state = specs.map(() => ({ p: 0 }));
      const scroll = { v: 0 };

      const render = () => {
        specs.forEach((s, i) => {
          const o = state[i].p + scroll.v * 0.65;
          gsap.set(opens[i], {
            xPercent: s.open.x * o,
            yPercent: s.open.y * o,
            rotation: s.open.r * o,
            scale: simple ? 0.55 + 0.45 * Math.min(state[i].p, 1) : 1 + ((s.open.s ?? 1) - 1) * o,
            opacity: simple ? Math.min(1, state[i].p * 2) : 1,
          });
        });
        if (shadowRef.current) gsap.set(shadowRef.current, { scaleX: 1 - 0.12 * Math.min(1, scroll.v + state[0].p * 0.4), opacity: 1 - 0.3 * scroll.v });
      };

      gsap.set(stage, { opacity: 1 });

      if (reduce) {
        // estado final, estático
        state.forEach((s) => (s.p = 1));
        if (!simple) gsap.set(whole, { autoAlpha: 0 });
        render();
        return;
      }

      const openTl = () => {
        const tl = gsap.timeline();
        if (!simple) tl.to(whole, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0);
        tl.to(state, { p: 1, duration: 1.2, ease: 'power3.out', stagger: 0.06, onUpdate: render }, 0);
        return tl;
      };

      // 1. entrada  2. abertura 0,5s depois
      const intro = gsap.timeline();
      intro
        .fromTo(tilt, { x: 80, scale: 0.92, rotation: -14 }, { x: 0, scale: 1, rotation: -8, duration: 0.9, ease: 'power3.out' })
        .add(openTl(), '+=0.5')
        .add(() => {
          // 3. flutuação contínua e independente
          floats.forEach((el, i) =>
            gsap.to(el, {
              y: (i % 2 ? -1 : 1) * specs[i].float,
              duration: 3 + ((i * 0.7) % 3),
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            }),
          );
        });

      // 4. scroll: a explosão aumenta ao rolar o hero e volta ao subir
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          scroll.v = self.progress;
          render();
        },
      });

      // 5. parallax de mouse por camada (desktop)
      let onMove: ((e: PointerEvent) => void) | null = null;
      if (hasFinePointer()) {
        const movers = layers.map((el, i) => ({
          x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
          d: specs[i].depth,
        }));
        onMove = (e) => {
          const r = section.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.d * 2);
            m.y(ny * m.d * 2);
          });
        };
        section.addEventListener('pointermove', onMove);
      }

      // 6. fecha e abre de novo
      let replaying: gsap.core.Timeline | null = null;
      replayRef.current = () => {
        if (replaying?.isActive()) return;
        replaying = gsap.timeline();
        replaying.to(state, { p: 0, duration: 0.55, ease: 'power2.inOut', stagger: { each: 0.03, from: 'end' }, onUpdate: render });
        if (!simple) replaying.to(whole, { autoAlpha: 1, duration: 0.15 }, '>-0.05');
        replaying.add(openTl(), '+=0.15');
      };

      cleanup = () => {
        intro.kill();
        replaying?.kill();
        st.kill();
        gsap.killTweensOf(floats);
        if (onMove) section.removeEventListener('pointermove', onMove);
      };
    });

    return () => {
      killed = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simple]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-offwhite pb-14 pt-28 lg:min-h-[100svh] lg:pb-16 lg:pt-32"
    >
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow hero-fade max-w-[22rem] text-bordo sm:max-w-none" style={{ animationDelay: '0.05s' }}>
          {HERO.eyebrow}
        </p>

        {/* headline: só a 3ª linha fica acima do pastel */}
        <h1 id="hero-title" className="display pointer-events-none relative z-20 mt-5 text-[clamp(4.5rem,min(13vw,16.5svh),13rem)] lg:mt-4">
          {HERO.lines.map((l, i) => (
            <span key={l.text} className={`hero-line pointer-events-auto -my-[0.16em] block w-fit overflow-hidden py-[0.16em] ${i === 2 ? "lg:ml-[27vw]" : ""}`}>
              <span className={`block ${TONE[l.tone]}`} style={{ animationDelay: `${0.12 + i * 0.12}s` }}>
                {l.text}
              </span>
            </span>
          ))}
        </h1>

        {/* palco do pastel */}
        <div
          ref={stageRef}
          data-stage
          className="relative z-10 mx-auto -mt-[20%] aspect-square w-full max-w-[40rem] sm:-mt-[14%] sm:max-w-[34rem] lg:absolute lg:right-[-2vw] lg:top-[clamp(11rem,24svh,17rem)] lg:mt-0 lg:w-[50vw] lg:max-w-[58rem]"
        >
          <div
            ref={shadowRef}
            aria-hidden="true"
            className="absolute left-[18%] top-[71%] h-[7%] w-[64%] rounded-[50%] bg-texto/20 blur-2xl"
          />
          <div
            ref={tiltRef}
            className="absolute inset-0 cursor-pointer"
            style={{ transform: 'rotate(-8deg)' }}
            onClick={() => replayRef.current()}
          >
            {stack.map((s, i) => (
              <div key={s.key} data-layer={i} className="absolute inset-0 will-change-transform">
                <div data-open className="absolute inset-0" style={simple ? { opacity: 0 } : undefined}>
                  <div data-float className="absolute inset-0">
                    <LayerArt k={s.key} real={images[s.key]} />
                  </div>
                </div>
              </div>
            ))}
            {/* pastel inteiro: some quando as camadas abrem (no modo simples, permanece) */}
            <div ref={wholeRef} className="absolute inset-0" data-whole>
              <LayerArt k="pastelInteiro" real={images.pastelInteiro} priority />
            </div>
          </div>
          <button
            type="button"
            onClick={() => replayRef.current()}
            className="absolute bottom-[14%] right-[12%] z-20 lg:bottom-auto lg:right-[34%] lg:top-[9%] inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-bordo underline decoration-bordo/40 underline-offset-4 hover:decoration-bordo"
          >
            <ReplayIcon className="size-4" />
            {HERO.replay}
          </button>
        </div>

        <div className="relative z-20 mt-2 lg:mt-8 xl:flex xl:items-end xl:gap-10">
          <p className="hero-fade max-w-[38ch] text-[1.0625rem] text-texto lg:text-[1.125rem]" style={{ animationDelay: '0.55s' }}>
            {HERO.text}
          </p>
          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row xl:mt-0 xl:flex-col xl:items-stretch" style={{ animationDelay: '0.7s' }}>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="pill pill-solid w-full sm:w-auto">
              <WhatsAppIcon className="size-5" />
              {HERO.ctaPrimary}
            </a>
            <a
              href="#comanda"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('comanda');
              }}
              className="pill pill-outline w-full sm:w-auto"
            >
              {HERO.ctaSecondary}
              <ArrowRight className="pill-arrow size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
