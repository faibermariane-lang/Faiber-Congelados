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
  lines: [
    { text: 'Tradição', tone: 'bordo' },
    { text: 'e qualidade.', tone: 'laranja' },
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

/* -------------------------------------------------------------------------- */
/* Nossa história                                                              */
/* -------------------------------------------------------------------------- */

export type HistoryStep = {
  id: string;
  /** ano exibido ao fundo; `null` = ano atual */
  year: number | null;
  marker: string;
  eyebrow: string;
  /** título; o trecho em `highlight` aparece em bordô */
  title: string;
  highlight?: string;
  paragraphs: string[];
  /** frase em destaque, com barra vertical */
  quote?: string;
  image?: 'fabrica01' | 'fabrica02';
};

export const HISTORY: { title: string; steps: HistoryStep[] } = {
  title: 'Nossa história',
  steps: [
    {
      id: 'historia-1940',
      year: 1940,
      marker: '1940',
      eyebrow: 'A origem · 1940',
      title: 'Antes de ser um clássico, ele foi uma adaptação.',
      highlight: 'ele foi uma adaptação.',
      paragraphs: [
        'O pastel brasileiro carrega uma história de encontros. Sua trajetória passa por referências da culinária asiática que, ao chegar ao Brasil, foram adaptadas aos ingredientes, aos costumes e ao paladar daqui.',
        'Na década de 1940, essa receita ganhou força e começou a conquistar as ruas, as feiras e as famílias brasileiras. De lá para cá, o pastel mudou de tamanho, formato, recheio e ocasião.',
      ],
      quote:
        'Mas uma coisa permaneceu: a capacidade de reunir pessoas em torno de algo simples, saboroso e feito para compartilhar.',
    },
    {
      id: 'historia-2010',
      year: 2010,
      marker: '2010',
      eyebrow: 'A fábrica · 2010',
      title: 'Uma fábrica de família, no Oeste catarinense.',
      paragraphs: [
        'Em 2010, a Faiber começou a fabricar em Chapecó, com receita de família e muito trabalho. O objetivo sempre foi o mesmo: manter a tradição e destacar a qualidade e o sabor dos produtos.',
      ],
      image: 'fabrica01',
    },
    {
      id: 'historia-hoje',
      year: null,
      marker: 'Hoje',
      eyebrow: 'Hoje',
      title: 'Tradição com máquinas modernas.',
      paragraphs: [
        'Hoje, máquinas modernas ajudam em cada etapa e mantêm a qualidade e o sabor, pacote após pacote. O pastel que era de feira agora também é premium. A Faiber leva essa tradição para uma nova etapa.',
      ],
      image: 'fabrica02',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Comanda da casa                                                             */
/* -------------------------------------------------------------------------- */

export const COMANDA = {
  title: 'Comanda da casa',
  text: 'Escolha os produtos e as quantidades. A gente confirma valores e prazo de entrega pelo WhatsApp.',
  note: 'Todos os produtos são congelados, prontos para fritar ou assar.',
  paperTitle: 'FAIBER CONGELADOS',
  paperPlace: 'Chapecó — SC',
  paperNumber: 'Nº 0001',
  stamp: 'FAIBER · DESDE 2010 · FAMÍLIA ·',
  send: 'Enviar pedido pelo WhatsApp',
  help: 'Adicione ao menos um item e informe seu nome.',
  preview: 'Ver mensagem',
  done: 'Pedido pronto! Finalize a conversa no WhatsApp.',
  edit: 'Editar pedido',
  clear: 'Limpar comanda',
} as const;

/* -------------------------------------------------------------------------- */
/* Fundadores                                                                  */
/* -------------------------------------------------------------------------- */

export const FOUNDERS = {
  eyebrow: 'Quem está por trás da Faiber',
  title: 'Uma fábrica feita em família.',
  paragraphs: [
    'José Moraci Faiber trabalha no ramo alimentício há 32 anos. Ainda morando em Florianópolis, enxergou uma oportunidade de mercado única. Em 2010, deu um passo importante: abriu a fábrica em Chapecó, ao lado da esposa, Mariclei Rossi.',
    'A jornada teve muitas adversidades. Mas a qualidade dos produtos e o carinho da família estiveram presentes desde o primeiro dia, e é isso que faz o pastel Faiber ser diferente.',
  ],
  stats: [
    { value: 32, suffix: '', label: 'anos no ramo alimentício' },
    { value: 2010, suffix: '', label: 'fábrica em Chapecó' },
    { value: 100, suffix: '%', label: 'gestão familiar' }, // [CONFIRMAR]
  ],
  link: 'Falar com a família Faiber',
} as const;

/* -------------------------------------------------------------------------- */
/* Contato e rodapé                                                            */
/* -------------------------------------------------------------------------- */

export const CONTATO = {
  title: 'Vamos conversar?',
  text: 'Lanchonetes, distribuidoras e food service: fale direto com a nossa equipe, tire dúvidas e peça sua tabela de produtos.',
  businessTypes: ['Lanchonete', 'Distribuidora', 'Food service', 'Outro'],
  submit: 'Enviar mensagem',
  success: 'Recebemos seu contato. Em breve nossa equipe retorna.',
} as const;

export const FOOTER = {
  rights: '© Faiber Congelados. Todos os direitos reservados.',
} as const;
