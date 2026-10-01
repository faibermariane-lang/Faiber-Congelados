# Faiber Congelados · site institucional

Site de página única em Next.js (App Router), TypeScript, Tailwind CSS 4 e Framer Motion. Pronto para deploy na Vercel.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Onde editar

| O quê | Onde |
|---|---|
| Todos os textos, número do WhatsApp, e-mail, mensagens prontas | `src/content.ts` |
| Cores e tamanhos de título (tokens do Tailwind) | bloco `@theme` em `src/app/globals.css` |
| Fontes | `src/app/layout.tsx` |
| Imagens | `public/images` |

Itens a validar estão marcados com `[CONFIRMAR]`, `[LINK]` ou `[FOTO: ...]` em `src/content.ts`.

## Foto do prato do hero

Enquanto não houver a foto recortada, o hero mostra uma ilustração provisória. Para trocar, salve o PNG sem fundo em `public/images/` e preencha `hero.pratoImagem` em `src/content.ts`, por exemplo:

```ts
pratoImagem: { src: "/images/prato-pasteis.png", width: 1600, height: 1000 },
```

## Fontes

- Títulos: Bricolage Grotesque (Google Fonts, auto-hospedada pelo `next/font`).
- Texto: Satoshi (Fontshare, carregada com `display=swap`).
- Títulos do cardápio: Chango (Google Fonts).
