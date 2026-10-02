"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hero, waLink } from "@/content";
import { gsap } from "@/lib/gsap";
import { isArtboard, isFinePointer, isMobile, isMotion } from "@/lib/env";
import { useUI } from "@/lib/store";
import { FadeIn, ImageReveal, MaskLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Engraving } from "@/components/ui/Engraving";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppIcon } from "@/components/ui/icons";

// Distorção líquida (OGL) carregada sob demanda, só no desktop, com movimento e com foto real.
const HeroDistortion = dynamic(() => import("./HeroDistortion").then((m) => m.HeroDistortion), { ssr: false });

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const imageScale = useRef<HTMLDivElement>(null);
  const imageTilt = useRef<HTMLDivElement>(null);
  const engraving = useRef<HTMLDivElement>(null);
  const introDone = useUI((s) => s.introDone);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    if (hero.image.src && isMotion() && isFinePointer() && !isMobile() && !isArtboard()) setWebgl(true);
  }, []);

  // Ao rolar: a imagem escala e os trechos do título deslizam em direções opostas.
  useEffect(() => {
    const el = section.current;
    if (!el || !isMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const lines = el.querySelectorAll<HTMLElement>("h1 .line-mask");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
        defaults: { ease: "none" },
      });
      tl.to(lines[0], { xPercent: -14 }, 0)
        .to(lines[1], { xPercent: 16 }, 0)
        .to(lines[2], { xPercent: -10 }, 0)
        .to(imageScale.current, { scale: 1.35, yPercent: 8 }, 0)
        .to(engraving.current, { yPercent: 18 }, 0);
    });
    mm.add("(max-width: 767px)", () => {
      gsap.to(imageScale.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    });
    return () => mm.revert();
  }, []);

  // Parallax do mouse: imagem na direção oposta (até 20px) com leve rotação; camadas em profundidades diferentes.
  useEffect(() => {
    const el = section.current;
    if (!el || !introDone || !isMotion() || !isFinePointer()) return;
    const layers = [
      { node: imageTilt.current, depth: -20, rot: 1.6 },
      { node: engraving.current, depth: 9, rot: 0 },
      ...Array.from(el.querySelectorAll<HTMLElement>("[data-depth]")).map((n) => ({ node: n, depth: Number(n.dataset.depth), rot: 0 })),
    ].filter((l): l is { node: HTMLDivElement; depth: number; rot: number } => !!l.node);
    const setters = layers.map((l) => ({
      ...l,
      x: gsap.quickTo(l.node, "x", { duration: 1.1, ease: "power3.out" }),
      y: gsap.quickTo(l.node, "y", { duration: 1.1, ease: "power3.out" }),
      r: gsap.quickTo(l.node, "rotation", { duration: 1.1, ease: "power3.out" }),
    }));
    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      setters.forEach((s) => {
        s.x(dx * s.depth);
        s.y(dy * s.depth);
        if (s.rot) s.r(dx * s.rot);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [introDone]);

  return (
    <section
      id="hero"
      ref={section}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-offwhite pt-[var(--header-h)]"
    >
      {/* gravura ao fundo, cortada pela borda */}
      <div ref={engraving} className="pointer-events-none absolute -right-[30vw] top-[12svh] -z-10 w-[120vw] md:-right-[14vw] md:top-[6svh] md:w-[66vw]">
        <Engraving variant="pastel" draw="intro" className="h-auto w-full rotate-[-8deg] opacity-[0.09]" />
      </div>

      <div className="container-x relative flex flex-1 flex-col pb-8 pt-[clamp(1.5rem,5svh,4rem)] md:pb-10">
        <FadeIn trigger="intro" delay={0.15} className="label-mono text-bordo">
          <p>{hero.eyebrow}</p>
        </FadeIn>

        <div className="relative mt-[clamp(1.25rem,3.5svh,2.75rem)]">
          <MaskLines
            as="h1"
            id="hero-title"
            trigger="intro"
            delay={0.05}
            lines={hero.title}
            className="font-display text-[length:var(--text-hero)] font-[550] leading-[0.95] text-bordo"
            lineClassName={(i) =>
              ["relative z-0 md:whitespace-nowrap", "relative z-0 md:whitespace-nowrap", "relative z-20 md:whitespace-nowrap"][i]
            }
          />

          {/* imagem principal: entre as linhas 2 e 3 para dar profundidade */}
          <div className="relative z-10 mx-auto mt-8 w-[88%] md:mt-12 md:w-[62%] lg:absolute lg:right-0 lg:top-[3%] lg:mt-0 lg:w-[31vw]">
            <div ref={imageScale} className="origin-center will-change-transform">
              <div ref={imageTilt} className="relative will-change-transform">
                <ImageReveal trigger="intro" delay={0.35} parallax={0} className="aspect-[4/3] rounded-[4px]">
                  {webgl ? (
                    <HeroDistortion src={hero.image.src!} alt={hero.image.alt} />
                  ) : (
                    <Photo img={hero.image} fill fit="contain" priority sizes="(min-width: 1024px) 31vw, (min-width: 768px) 62vw, 88vw" captionTop />
                  )}
                </ImageReveal>
                {/* sombra de contato */}
                <div
                  aria-hidden
                  className="absolute -bottom-[9%] left-[10%] -z-10 h-[16%] w-[80%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(43,10,14,0.2),transparent)] blur-md"
                />
              </div>
            </div>
          </div>
          {hero.layers.map((l) => (
            <div key={l.src} data-depth={l.depth} className={`pointer-events-none absolute z-30 ${l.className}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} className="h-auto w-full" />
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-8 pt-12 md:flex-row md:items-end md:justify-between md:pt-10">
          <div className="max-w-[34rem]">
            <FadeIn trigger="intro" delay={0.55}>
              <p className="text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.55] text-texto/85">{hero.subtitle}</p>
            </FadeIn>
            <FadeIn trigger="intro" delay={0.7} className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={waLink(hero.primaryCta.message)} target="_blank" rel="noopener noreferrer" icon={<WhatsAppIcon className="h-full w-full" />}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </FadeIn>
          </div>

          <FadeIn trigger="intro" delay={0.9} className="hidden items-end gap-4 md:flex">
            <a href="#esteira" className="label-mono flex flex-col items-center gap-3 text-bordo" aria-label="Rolar para a próxima seção">
              <span>{hero.scroll}</span>
              <span className="relative block h-14 w-px overflow-hidden bg-bordo/15">
                <span className="scroll-line absolute inset-0 bg-bordo" />
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
