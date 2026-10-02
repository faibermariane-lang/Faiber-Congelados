# Faiber Congelados · site institucional (v4)

Next.js (App Router) + TypeScript + Tailwind v4 · GSAP/ScrollTrigger · Lenis · Framer Motion · OGL.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000  ·  prancheta: http://localhost:3000/artboard
npm run shots -- --phase 1   # capturas em screenshots/fase-1/
npm run build
```

## Onde editar

| O quê | Onde |
|---|---|
| Todos os textos, dados, WhatsApp, e-mail, produtos | `src/content.ts` |
| Cores, escala tipográfica, espaçamentos | tokens no topo de `src/app/globals.css` |
| Fotos | `public/images/` — no `content.ts`, troque `src: null` pelo caminho da foto |

Itens marcados `[CONFIRMAR]` e imagens com `src: null` (placeholder areia `[FOTO: ...]`) ainda dependem da Faiber.

## Artboard (só desenvolvimento)

`/artboard` mostra Desktop 1440, Tablet 768 e Celular 390 lado a lado, com zoom, recarregar,
"Sem animações" (`?motion=0`), saltos por seção, rolagem sincronizada e modo foco (clique no rótulo/moldura; ESC volta).
A rota responde 404 em produção. Com `?artboard=1` o site pula o preloader e desliga o cursor.

## Fontes

Clash Display e Satoshi vêm do Fontshare (`<link>` no `layout.tsx`); IBM Plex Mono via `next/font`.
Bricolage Grotesque fica como reserva dos títulos. No `npm run shots`, se o Fontshare estiver
inacessível, Satoshi é substituída por Figtree só para a captura (`scripts/preview-fonts/`).
