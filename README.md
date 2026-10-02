# Faiber Congelados · site institucional (v5)

Next.js (App Router) + TypeScript + Tailwind CSS v4 · GSAP + ScrollTrigger (sob demanda) · Lenis (só desktop com mouse) · Zustand.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run shots -- 1 # prints da fase 1 em screenshots/fase-1/ (com o dev rodando)
```

- **Prancheta:** `http://localhost:3000/artboard` (só em desenvolvimento; em produção retorna 404).
- **Site sem animações:** `/?motion=0`.

## Onde editar

| O quê | Onde |
|---|---|
| Textos, produtos, contato, menu | `src/content.ts` |
| Imagens (nome → arquivo) | `src/images.ts` |
| Cores, fontes, botões | `src/app/globals.css` |
| SEO e dados estruturados | `src/app/layout.tsx` |

## Imagens: arrastar e soltar

Salve o arquivo com o nome indicado em `public/images/` e recarregue. O site detecta o arquivo e troca o placeholder automaticamente (no `dev` e no build). Nomes:

- Hero (PNG recortado, fundo transparente, todos 2400×2400 e alinhados): `pastel-inteiro.png`, `pastel-massa-cima.png`, `pastel-massa-baixo.png`, `recheio-queijo.png`, `recheio-carne.png`, `recheio-tomate.png`, `recheio-cebola.png`, `recheio-salsinha.png`, `recheio-pimenta.png`, `migalhas.png` (opcional)
- Produtos: `produtos/pastel-pacote.png`, `produtos/pastel-caixa.png`, `produtos/mini-pizza.png`, `produtos/coxinha.png`, `produtos/enroladinho.png`, `produtos/assado.png`
- Fotos: `fundadores.jpg`, `fabrica-01.jpg`, `fabrica-02.jpg`

Se só existir `pastel-inteiro.png` (sem as metades da massa), o hero usa o **modo simples**: o pastel inteiro flutua e os recheios explodem em volta.

## Fontes

Big Shoulders (títulos), Chango (retrô) e IBM Plex Mono (comanda) vêm do Google Fonts via `next/font` (auto-hospedadas). Satoshi (corpo) é carregada do Fontshare; enquanto não carrega, usa Hanken Grotesk.

## Deploy

Vercel: importar o repositório, sem configuração extra.
