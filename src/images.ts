/**
 * Mapa único de imagens: nome → arquivo em /public/images.
 *
 * Para trocar um placeholder pela imagem real, basta salvar o arquivo
 * com o nome indicado em /public/images. O site detecta o arquivo
 * (em `npm run dev` e no build) e passa a usá-lo automaticamente.
 */

export type ImageSpec = {
  file: string;
  width: number;
  height: number;
  alt: string;
};

export const IMAGES = {
  logo: { file: 'logo.png', width: 962, height: 549, alt: 'Faiber Congelados' },
  logoBranca: { file: 'logo-branca.png', width: 962, height: 549, alt: 'Faiber Congelados' },

  // Hero: PNGs recortados, mesma tela (2400×2400), alinhados para empilhar
  pastelInteiro: { file: 'pastel-inteiro.png', width: 2400, height: 2400, alt: 'Pastel frito e dourado da Faiber' },
  massaCima: { file: 'pastel-massa-cima.png', width: 2400, height: 2400, alt: '' },
  massaBaixo: { file: 'pastel-massa-baixo.png', width: 2400, height: 2400, alt: '' },
  recheioQueijo: { file: 'recheio-queijo.png', width: 2400, height: 2400, alt: '' },
  recheioCarne: { file: 'recheio-carne.png', width: 2400, height: 2400, alt: '' },
  recheioTomate: { file: 'recheio-tomate.png', width: 2400, height: 2400, alt: '' },
  recheioCebola: { file: 'recheio-cebola.png', width: 2400, height: 2400, alt: '' },
  recheioSalsinha: { file: 'recheio-salsinha.png', width: 2400, height: 2400, alt: '' },
  recheioPimenta: { file: 'recheio-pimenta.png', width: 2400, height: 2400, alt: '' },
  migalhas: { file: 'migalhas.png', width: 2400, height: 2400, alt: '' },

  // Produtos (PNG recortado, quadrado)
  produtoPastelPacote: { file: 'produtos/pastel-pacote.png', width: 800, height: 800, alt: 'Pacote de pastéis Faiber' },
  produtoPastelCaixa: { file: 'produtos/pastel-caixa.png', width: 800, height: 800, alt: 'Caixa de pastéis Faiber' },
  produtoMiniPizza: { file: 'produtos/mini-pizza.png', width: 800, height: 800, alt: 'Mini pizzas Faiber' },
  produtoCoxinha: { file: 'produtos/coxinha.png', width: 800, height: 800, alt: 'Coxinhas Faiber' },
  produtoEnroladinho: { file: 'produtos/enroladinho.png', width: 800, height: 800, alt: 'Enroladinhos Faiber' },
  produtoAssado: { file: 'produtos/assado.png', width: 800, height: 800, alt: 'Assados Faiber' },

  // Fotos
  fundadores: { file: 'fundadores.jpg', width: 1600, height: 2000, alt: 'José Moraci Faiber e Mariclei Rossi, fundadores da Faiber' },
  fabrica01: { file: 'fabrica-01.jpg', width: 1600, height: 1200, alt: 'Linha de produção da fábrica Faiber em Chapecó' },
  fabrica02: { file: 'fabrica-02.jpg', width: 1600, height: 1200, alt: 'Pastéis Faiber sendo embalados na fábrica' },
} satisfies Record<string, ImageSpec>;

export type ImageKey = keyof typeof IMAGES;

/** Quais imagens já existem em /public/images (calculado no servidor). */
export type ImageAvailability = Record<ImageKey, boolean>;

export const imageSrc = (key: ImageKey) => `/images/${IMAGES[key].file}`;
