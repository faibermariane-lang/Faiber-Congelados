# Faiber Congelados · site institucional

Site de página única em **React + TypeScript + Tailwind CSS v4**, com animações em **Motion** (Framer Motion) e ícones **Lucide**. Build com **Vite**.

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # typecheck + build de produção em dist/
npm run preview   # serve o build
```

A pasta `dist/` pode ser publicada em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, cPanel).

## Onde editar

| O quê | Onde |
|---|---|
| WhatsApp, e-mail, cidade, ano de fundação | `CONTACT` em `src/content/site.ts` |
| Mensagens prontas do WhatsApp e do e-mail | `MESSAGES` em `src/content/site.ts` |
| Produtos, sabores, timeline, pilares | `src/content/site.ts` |
| Cores, fontes, utilitários (`paper`, `leader`, `.btn`) | `src/index.css` |
| SEO (title, description, Open Graph, dados estruturados) | `index.html` |
| Sketches (ilustrações em traço) | `src/components/ui/Sketch.tsx` |

## Estrutura

```
src/
  content/site.ts         conteúdo e dados comerciais
  lib/                    links de WhatsApp/e-mail, utilitário de classes
  hooks/                  seção ativa no menu, detecção de mouse
  components/
    Header, Hero, ProductMarquee, PastelHistory, CompanyStory, Timeline,
    Values, ProductMenu, ImpactBlock, FounderSection, ContactCTA, Contact, Footer
    ui/                   Logo, Sketch, Picture, Reveal, MaskReveal, PhotoPlaceholder, Eyebrow, ícones
public/images/            fotos em WebP (várias larguras para srcset)
```

## Fotografias pendentes

Os espaços com a etiqueta **“Foto em produção”** aguardam fotos reais:

- **Enroladinhos, Mini pizzas e Assados**: adicione as fotos em `public/images/` (WebP, ex.: `enroladinho-800.webp`) e preencha o campo `photo` do produto em `src/content/site.ts` (mesmo formato de `PHOTOS.pastel`).
- **Fundadores (José Moraci Faiber & Mariclei Rossi)**: salve em `public/images/fundadores-1200.webp` e preencha `FOUNDERS_PHOTO` em `src/content/site.ts`. A foto ganha automaticamente a transição de preto e branco para cor.

Para gerar WebP: `convert foto.jpg -resize 1200x -quality 78 public/images/nome-1200.webp` (ImageMagick) ou squoosh.app.

## Domínio

`index.html` usa `https://faibercongelados.com/` em canonical, Open Graph e dados estruturados. Ajuste se o domínio for outro.
