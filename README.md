# Faiber Congelados · site institucional

Next.js (App Router) + TypeScript + Tailwind CSS v4, com Framer Motion, GSAP/ScrollTrigger e Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção (pronto para a Vercel)
```

## Onde editar

| O quê | Onde |
|---|---|
| Todos os textos, contatos, produtos e números | `src/content.ts` (itens `[CONFIRMAR]` ainda precisam ser validados) |
| Cores e fontes (tokens) | bloco `@theme` em `src/app/globals.css` |
| Imagens | `public/images` |

## Estrutura

- `src/components/motion`: sistema de animação reutilizável (Reveal, WordReveal, Magnetic, Tilt, Marquee, SketchLayer, SmoothScroll).
- `src/components/illustrations`: SVGs (cesta do hero, ingredientes, sketches em traço).
- `src/components/layout`: Preloader, Header (com menu mobile e barra de progresso) e Cursor.
- `src/components/sections`: seções da página.

Com `prefers-reduced-motion` ativo, o preloader, o cursor, o parallax e os desenhos animados são desligados.

## Versão anterior

O site antigo em HTML estático está em `legacy/`.
