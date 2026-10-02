/**
 * Todo o texto e os dados comerciais do site ficam aqui.
 * Para editar uma frase, um telefone ou um produto, mude apenas este arquivo.
 */

export const CONTACT = {
  whatsappNumber: '554991995920',
  whatsappDisplay: '+55 49 9199-5920',
  email: 'administrativo@faibercongelados.com',
  instagram: '', // [LINK] ex.: https://instagram.com/faibercongelados
  city: 'Chapecó',
  state: 'Santa Catarina',
  stateShort: 'SC',
  foundedYear: 2010,
} as const;

export const SITE = {
  title: 'Faiber Congelados | Pastéis congelados em Chapecó e Oeste de Santa Catarina',
  description:
    'Fábrica familiar de pastéis congelados em Chapecó desde 2010. Tradição, sabor e qualidade para lanchonetes, distribuidoras e food service.',
  url: 'https://faibercongelados.com',
  slogan: 'Sabor de casa, qualidade de fábrica.',
} as const;

export const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'historia', label: 'História' },
  { id: 'comanda', label: 'Comanda' },
  { id: 'fundadores', label: 'Fundadores' },
  { id: 'contato', label: 'Contato' },
] as const;

export const HERO = {
  eyebrow: 'Pastéis congelados · Chapecó, Oeste de Santa Catarina',
  lines: [
    { text: 'Tradição.', tone: 'bordo' },
    { text: 'Crocância.', tone: 'laranja' },
    { text: 'Sabor.', tone: 'bordo' },
  ],
  text: 'Desde 2010, a Faiber produz pastéis congelados com receita de família e processo moderno. O mesmo sabor de sempre, com a regularidade que a sua lanchonete, distribuidora ou food service precisa.',
  ctaPrimary: 'Pedir pelo WhatsApp',
  ctaSecondary: 'Ver comanda',
  replay: 'Abrir de novo',
} as const;

export const MESSAGES = {
  default: 'Olá, Faiber! Vim pelo site e gostaria de fazer um pedido.',
} as const;

/* -------------------------------------------------------------------------- */
/* Produtos: a mesma lista alimenta a fita e a comanda                         */
/* -------------------------------------------------------------------------- */

export type ProductId = 'pacote-pastel' | 'caixa-pastel' | 'mini-pizza' | 'coxinhas' | 'enroladinhos' | 'assados';

export type Product = {
  id: ProductId;
  /** nome na comanda */
  name: string;
  /** rótulo curto na fita */
  label: string;
  units: number;
  /** como aparece na descrição: “pacote com 20 unidades” */
  pack: string;
  image: 'produtoPastelPacote' | 'produtoPastelCaixa' | 'produtoMiniPizza' | 'produtoCoxinha' | 'produtoEnroladinho' | 'produtoAssado';
};

export const PRODUCTS: Product[] = [
  { id: 'pacote-pastel', name: 'Pacote de pastel', label: 'Pastel (pacote)', units: 20, pack: 'pacote', image: 'produtoPastelPacote' },
  { id: 'caixa-pastel', name: 'Caixa de pastel', label: 'Pastel (caixa)', units: 40, pack: 'caixa', image: 'produtoPastelCaixa' },
  { id: 'mini-pizza', name: 'Mini pizza', label: 'Mini pizza', units: 10, pack: 'pacote', image: 'produtoMiniPizza' },
  { id: 'coxinhas', name: 'Coxinhas', label: 'Coxinhas', units: 20, pack: 'pacote', image: 'produtoCoxinha' },
  { id: 'enroladinhos', name: 'Enroladinhos', label: 'Enroladinhos', units: 20, pack: 'pacote', image: 'produtoEnroladinho' },
  { id: 'assados', name: 'Assados', label: 'Assados', units: 10, pack: 'pacote', image: 'produtoAssado' },
];

export const RIBBON = {
  srTitle: 'Produtos Faiber',
  srHint: 'ver na comanda',
} as const;
