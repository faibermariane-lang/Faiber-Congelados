"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D tMap;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uHover;
uniform float uTime;
uniform vec2 uCover;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  vec2 d = vUv - uMouse;
  float dist = length(d);
  float falloff = exp(-dist * 5.5) * uHover;
  uv += d * sin(dist * 26.0 - uTime * 2.4) * 0.018 * falloff;
  uv -= uVelocity * 0.06 * falloff;
  gl_FragColor = texture2D(tMap, vec2(uv.x, 1.0 - uv.y));
}
`;

/** Distorção líquida sutil sob o mouse (OGL). Se o WebGL falhar, mostra a imagem estática. */
export function HeroDistortion({ src, alt }: { src: string; alt: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const { Renderer, Program, Mesh, Triangle, Texture } = await import("ogl");
        if (disposed) return;
        const renderer = new Renderer({ dpr: Math.min(2, window.devicePixelRatio), alpha: true, premultipliedAlpha: false });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
        el.appendChild(gl.canvas);

        const texture = new Texture(gl, { generateMipmaps: false });
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        await img.decode();
        if (disposed) return;
        texture.image = img;

        const program = new Program(gl, {
          vertex,
          fragment,
          transparent: true,
          uniforms: {
            tMap: { value: texture },
            uMouse: { value: [0.5, 0.5] },
            uVelocity: { value: [0, 0] },
            uHover: { value: 0 },
            uTime: { value: 0 },
            uCover: { value: [1, 1] },
          },
        });
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        const resize = () => {
          const { width, height } = el.getBoundingClientRect();
          renderer.setSize(width, height);
          const box = width / height, image = img.naturalWidth / img.naturalHeight;
          program.uniforms.uCover.value = box > image ? [1, image / box] : [box / image, 1];
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        const target = { x: 0.5, y: 0.5, hover: 0 };
        const cur = { x: 0.5, y: 0.5, hover: 0, vx: 0, vy: 0 };
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          target.x = (e.clientX - r.left) / r.width;
          target.y = (e.clientY - r.top) / r.height;
        };
        const onEnter = () => (target.hover = 1);
        const onLeave = () => (target.hover = 0);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);

        let raf = 0;
        let visible = true;
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        io.observe(el);
        const loop = (t: number) => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          const px = cur.x, py = cur.y;
          cur.x += (target.x - cur.x) * 0.08;
          cur.y += (target.y - cur.y) * 0.08;
          cur.hover += (target.hover - cur.hover) * 0.06;
          cur.vx += ((cur.x - px) * 8 - cur.vx) * 0.1;
          cur.vy += ((cur.y - py) * 8 - cur.vy) * 0.1;
          program.uniforms.uMouse.value = [cur.x, cur.y];
          program.uniforms.uVelocity.value = [cur.vx, cur.vy];
          program.uniforms.uHover.value = cur.hover;
          program.uniforms.uTime.value = t / 1000;
          renderer.render({ scene: mesh });
        };
        raf = requestAnimationFrame(loop);

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          gl.canvas.remove();
        };
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src]);

  if (failed) return <Image src={src} alt={alt} fill sizes="36vw" priority className="object-cover" />;
  return <div ref={host} role="img" aria-label={alt} className="absolute inset-0" />;
}
