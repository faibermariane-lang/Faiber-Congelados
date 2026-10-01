/**
 * Todo o texto e os dados do site ficam aqui.
 * Itens marcados com [CONFIRMAR] ainda precisam ser validados pela Faiber.
 */

export const contato = {
  whatsapp: "554991995920",
  whatsappExibicao: "+55 49 9199-5920",
  email: "administrativo@faibercongelados.com",
  instagram: "#", // [CONFIRMAR] link do Instagram
  cidade: "Chapecó, Santa Catarina",
};

export const waLink = (texto?: string) =>
  `https://wa.me/${contato.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

export const mailLink = (assunto = "Contato pelo site") =>
  `mailto:${contato.email}?subject=${encodeURIComponent(assunto)}`;

export const seo = {
  title: "Faiber Congelados | Pastéis congelados em Chapecó e Oeste de Santa Catarina",
  description:
    "Fábrica familiar de pastéis congelados em Chapecó desde 2010. Tradição, sabor e qualidade para lanchonetes, distribuidoras e food service.",
  url: "https://faibercongelados.com", // [CONFIRMAR] domínio final
};

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Nossa história", href: "#historia" },
  { label: "Contato", href: "#contato" },
];

export const header = {
  cta: "Falar no WhatsApp",
  ctaMensagem: "Olá, Faiber! Vim pelo site e gostaria de mais informações.",
};

export const hero = {
  chamada: "Pastéis congelados · Chapecó, Oeste de Santa Catarina",
  titulo: "O pastel que a tradição fez. A qualidade assinou.",
  subtitulo:
    "Desde 2010, a Faiber produz pastéis congelados com receita de família e processo moderno. O mesmo sabor de sempre, com a regularidade que a sua lanchonete, distribuidora ou food service precisa.",
  ctaPrimario: "Pedir pelo WhatsApp",
  ctaPrimarioMensagem: "Olá, Faiber! Vim pelo site e gostaria de fazer um pedido.",
  ctaSecundario: "Ver cardápio",
  balao: "Crocante por fora, recheio generoso por dentro",
};

export const esteira = {
  sabores: [
    "Pastel de carne",
    "Pastel de queijo",
    "Pastel de pizza",
    "Pastel de frango",
    "Mini pizza",
    "Coxinha",
    "Enroladinho",
    "Assados",
  ], // [CONFIRMAR sabores]
  titulo: "Cada pastel carrega um sabor de casa.",
  cta: "Conheça nossos produtos",
};

export const proposito = {
  titulo: "Do pastel de feira à mesa premium.",
  paragrafos: [
    "O pastel chegou ao Brasil em 1940, trazido pela imigração japonesa, e conquistou o país. Virou companhia de feira, de fim de semana, de lanche com a família. Para nós, ele merece ir além.",
    "A Faiber nasceu para mostrar que o pastel pode ser tradicional e premium ao mesmo tempo. Nosso propósito é ser a melhor fornecedora de pastéis congelados do Oeste de Santa Catarina, sem abrir mão do que nos trouxe até aqui: sabor, qualidade e tradição.",
  ],
  marcos: [
    { ano: "1940", valor: 1940, texto: "O pastel chega ao Brasil e vira paixão nacional." },
    { ano: "2010", valor: 2010, texto: "Começamos a fabricar em Chapecó, com receita de família e muito trabalho." },
    { ano: "Hoje", valor: 2026, texto: "Máquinas modernas ajudam em cada etapa e mantêm a qualidade e o sabor, pacote após pacote." },
  ],
};

export type Produto = {
  id: string;
  nome: string;
  curto: string;
  descricao: string;
  sabores: string[];
  pacote: string;
  imagem: string;
  imagemAlt: string;
  placeholder?: boolean;
};

export const produtos: Produto[] = [
  {
    id: "pasteis",
    nome: "Pastéis",
    curto: "Massa fina e crocante, recheio generoso",
    descricao:
      "O carro-chefe da casa. Massa fina que fica crocante na fritura e recheio generoso, do jeito que a receita de família pede.",
    sabores: ["Carne", "Queijo", "Pizza", "Frango"], // [CONFIRMAR]
    pacote: "Pacote com 20 unidades",
    imagem: "/images/pasteis-sabores.jpg",
    imagemAlt: "Pastéis dourados recém-fritos da Faiber",
  },
  {
    id: "mini-pizzas",
    nome: "Mini pizzas",
    curto: "Para o salgado que sai rápido no balcão",
    descricao: "Práticas e saborosas, pensadas para o giro rápido do balcão e para festas.",
    sabores: ["[CONFIRMAR]"],
    pacote: "[ ] un. [CONFIRMAR]",
    imagem: "/images/mini-pizzas.jpg",
    imagemAlt: "[FOTO: mini pizzas Faiber]",
    placeholder: true,
  },
  {
    id: "coxinhas",
    nome: "Coxinhas",
    curto: "Massa macia, recheio cremoso",
    descricao: "Massa macia e recheio cremoso. Um clássico que não pode faltar na vitrine.",
    sabores: ["[CONFIRMAR]"],
    pacote: "[ ] un. [CONFIRMAR]",
    imagem: "/images/coxinhas.jpg",
    imagemAlt: "[FOTO: coxinhas Faiber]",
    placeholder: true,
  },
  {
    id: "enroladinhos",
    nome: "Enroladinhos",
    curto: "Ótimos para festas e para o dia a dia",
    descricao: "Enroladinhos que vão da festa ao lanche da tarde, com a mesma qualidade.",
    sabores: ["[CONFIRMAR]"],
    pacote: "[ ] un. [CONFIRMAR]",
    imagem: "/images/enroladinho-salsicha.jpg",
    imagemAlt: "[FOTO: enroladinhos Faiber]",
    placeholder: true,
  },
  {
    id: "assados",
    nome: "Assados",
    curto: "Assados na medida, prontos para vender",
    descricao: "Assados na medida certa, prontos para ir ao forno e para a vitrine.",
    sabores: ["[CONFIRMAR]"],
    pacote: "[ ] un. [CONFIRMAR]",
    imagem: "/images/minis-festa.jpg",
    imagemAlt: "[FOTO: assados Faiber]",
    placeholder: true,
  },
];

export const cardapio = {
  titulo: "Cardápio Faiber",
  subtitulo: "Direto da fábrica para o seu balcão.",
  rodape:
    "Todos os produtos são congelados, prontos para fritar ou assar. Peça pelo WhatsApp e receba direto da fábrica.",
  cta: "Consultar sabores e valores",
};

export const simulador = {
  titulo: "Monte o seu pedido.",
  texto: "Escolha os produtos e as quantidades. A gente confirma valores e prazo de entrega pelo WhatsApp.",
  pacotesPorCaixa: 10, // [CONFIRMAR] barra de caixa/palete
  cta: "Enviar pedido pelo WhatsApp",
};

export const destaque = {
  texto: "Uma viagem pelo sabor de casa.",
  cta: "Falar com a fábrica",
};

export const historia = {
  chamada: "Quem está por trás da Faiber",
  titulo: "Uma fábrica feita em família.",
  paragrafos: [
    "José Moraci Faiber trabalha no ramo alimentício há 32 anos. Ainda morando em Florianópolis, enxergou uma oportunidade de mercado única. Em 2010, deu um passo importante: abriu a fábrica em Chapecó, ao lado da esposa, Mariclei Rossi.",
    "A jornada teve muitas adversidades. Mas a qualidade dos produtos e o carinho da família estiveram presentes desde o primeiro dia, e é isso que faz o pastel Faiber ser diferente.",
  ],
  numeros: [
    { valor: 32, prefixo: "", sufixo: " anos", rotulo: "no ramo alimentício" },
    { valor: 2010, prefixo: "", sufixo: "", rotulo: "fábrica em Chapecó" },
    { valor: 100, prefixo: "", sufixo: "%", rotulo: "gestão familiar [CONFIRMAR]" },
    { valor: 80, prefixo: "+", sufixo: " anos", rotulo: "de pastel no Brasil" },
  ],
  cta: "Falar com a família Faiber",
};

export const contatoSecao = {
  chamada: "Atendimento direto com a fábrica",
  titulo: "Vamos levar a Faiber para o seu negócio?",
  texto:
    "Lanchonetes, distribuidoras e food service: fale direto com a nossa equipe, tire dúvidas e peça sua tabela de produtos.",
  cta: "Chamar no WhatsApp",
  tiposNegocio: ["Lanchonete", "Distribuidora", "Food service", "Outro"],
  confirmacao: "Recebemos seu contato! Em breve nossa equipe retorna.",
};

export const rodape = {
  frase: "Sabor de casa, qualidade de fábrica.",
  copyright: "© Faiber Congelados. Todos os direitos reservados.",
};
