/**
 * Conteúdo e dados de contato do site.
 * Tudo que é texto editável ou informação comercial fica aqui, separado dos componentes.
 */

export const CONTACT = {
  /** DDI + DDD + número, só dígitos */
  whatsappNumber: '554991995920',
  whatsappDisplay: '(49) 99199-5920',
  email: 'administrativo@faibercongelados.com',
  city: 'Chapecó',
  state: 'Santa Catarina',
  stateShort: 'SC',
  foundedYear: 2010,
} as const;

export const MESSAGES = {
  default: 'Olá! Vim pelo site da Faiber Congelados e gostaria de mais informações.',
  products: 'Olá! Gostaria de conhecer os produtos da Faiber Congelados.',
  business: 'Olá! Tenho um negócio e quero levar os produtos da Faiber Congelados para o meu cardápio.',
  emailSubject: 'Contato pelo site · Faiber Congelados',
  emailBody: 'Olá, equipe Faiber!\n\nGostaria de saber mais sobre os produtos e as condições comerciais.\n\nNome:\nEmpresa:\nCidade:\n',
} as const;

export const NAV = [
  { id: 'historia', label: 'Nossa história' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'a-faiber', label: 'A Faiber' },
  { id: 'contato', label: 'Contato' },
] as const;

/* -------------------------------------------------------------------------- */
/* Imagens                                                                     */
/* -------------------------------------------------------------------------- */

export type Photo = {
  /** caminho base sem a largura, ex.: /images/hero */
  base: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
};

export const PHOTOS = {
  hero: {
    base: '/images/hero',
    widths: [640, 1080],
    width: 1080,
    height: 1350,
    alt: 'Pastéis retangulares dourados, coxinhas e embalagens bordô da Faiber Congelados sobre tábuas de madeira',
  },
  pastel: {
    base: '/images/pastel',
    widths: [610],
    width: 610,
    height: 420,
    alt: 'Pastéis retangulares com borda rendada saindo da embalagem Faiber',
  },
  coxinha: {
    base: '/images/coxinha',
    widths: [560],
    width: 560,
    height: 330,
    alt: 'Coxinhas e salgados empanados em um prato escuro, ao lado da caixa Faiber',
  },
  vitrineCoxinhas: {
    base: '/images/vitrine-coxinhas',
    widths: [620],
    width: 620,
    height: 330,
    alt: 'Coxinhas douradas enfileiradas em bandejas de vitrine',
  },
  bandeja: {
    base: '/images/bandeja',
    widths: [640],
    width: 640,
    height: 210,
    alt: 'Bandeja com pastéis recém-fritos',
  },
  embalagem: {
    base: '/images/embalagem',
    widths: [520],
    width: 520,
    height: 700,
    alt: 'Sacola de papel bordô com o logotipo Faiber Congelados',
  },
  loja: {
    base: '/images/loja',
    widths: [560, 864],
    width: 864,
    height: 1080,
    alt: 'Profissional da Faiber, de avental e chapéu bordô, segurando um pastel',
  },
  cozinha: {
    base: '/images/cozinha',
    widths: [600],
    width: 600,
    height: 1040,
    alt: 'Cozinheira da Faiber, de dólmã branco, segurando uma bandeja de pastéis na fábrica',
  },
  vitrine: {
    base: '/images/vitrine',
    widths: [640, 1080],
    width: 1080,
    height: 1350,
    alt: 'Caixas bordô da Faiber sobre o balcão, com coxinhas e salgados na vitrine',
  },
} satisfies Record<string, Photo>;

/* -------------------------------------------------------------------------- */
/* Produtos                                                                    */
/* -------------------------------------------------------------------------- */

export type SketchName =
  | 'pastel'
  | 'coxinha'
  | 'enroladinho'
  | 'miniPizza'
  | 'assado'
  | 'trigo'
  | 'pimenta'
  | 'folha'
  | 'rolo'
  | 'tomate';

export type Product = {
  id: string;
  number: string;
  name: string;
  /** como o produto aparece em frases, ex.: “os pastéis” */
  short: string;
  units: string;
  description: string;
  photo: Photo | null;
  sketch: SketchName;
};

export const FLAVORS = ['Frango', 'Calabresa', 'Hambúrguer', 'Presunto e queijo'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'pasteis',
    number: '01',
    name: 'Pastéis',
    short: 'pastéis',
    units: '20 unidades',
    description: 'Massa fina, borda rendada e recheio generoso. O clássico que abre o cardápio.',
    photo: PHOTOS.pastel,
    sketch: 'pastel',
  },
  {
    id: 'coxinhas',
    number: '02',
    name: 'Coxinhas',
    short: 'coxinhas',
    units: '20 unidades',
    description: 'Formato de gota, empanamento crocante e massa macia por dentro.',
    photo: PHOTOS.coxinha,
    sketch: 'coxinha',
  },
  {
    id: 'enroladinhos',
    number: '03',
    name: 'Enroladinhos',
    short: 'enroladinhos',
    units: '20 unidades',
    description: 'Massa macia envolvendo o recheio, na medida para o balcão e para festas.',
    photo: null,
    sketch: 'enroladinho',
  },
  {
    id: 'mini-pizzas',
    number: '04',
    name: 'Mini pizzas',
    short: 'mini pizzas',
    units: '20 unidades',
    description: 'Do tamanho certo para o balcão, a festa e o lanche da tarde.',
    photo: null,
    sketch: 'miniPizza',
  },
  {
    id: 'assados',
    number: '05',
    name: 'Assados',
    short: 'assados',
    units: '20 unidades',
    description: 'Opção de forno, para quem quer variedade na vitrine.',
    photo: null,
    sketch: 'assado',
  },
];

/* -------------------------------------------------------------------------- */
/* Seções                                                                      */
/* -------------------------------------------------------------------------- */

export const TIMELINE = [
  {
    mark: '2010',
    title: 'O começo',
    text: 'Em Chapecó, Santa Catarina, nasce a Faiber Congelados.',
  },
  {
    mark: 'Depois',
    title: 'A fábrica cresce',
    text: 'Novos produtos, novos clientes e novos desafios fizeram parte da nossa caminhada.',
  },
  {
    mark: 'Hoje',
    title: 'Tradição + tecnologia',
    text: 'Uma fábrica equipada para acompanhar o crescimento do negócio sem perder a essência que trouxe a Faiber até aqui.',
  },
] as const;

export const VALUES: { title: string; text: string; sketch: SketchName }[] = [
  {
    title: 'Tradição',
    text: 'Receitas e sabores que fazem parte da memória afetiva brasileira.',
    sketch: 'trigo',
  },
  {
    title: 'Qualidade',
    text: 'Cuidado em cada etapa, da produção ao produto que chega ao seu negócio.',
    sketch: 'folha',
  },
  {
    title: 'Evolução',
    text: 'Tecnologia e processos modernos trabalhando a favor de um produto cada vez melhor.',
    sketch: 'rolo',
  },
  {
    title: 'Família',
    text: 'Uma empresa construída por pessoas que acreditam no trabalho, na persistência e no valor de fazer bem feito.',
    sketch: 'pastel',
  },
];

/**
 * Foto dos fundadores. Enquanto não houver a fotografia real, fica `null`
 * e o site exibe um espaço reservado identificado.
 * Para ativar: salve a foto em /public/images/fundadores-1200.webp e preencha abaixo.
 */
export const FOUNDERS_PHOTO: Photo | null = null;
