/**
 * Todo o texto e os dados do site.
 * Itens marcados com [CONFIRMAR] ainda precisam de validação da Faiber.
 * Imagens com `src: null` aparecem como placeholder areia com a legenda `[FOTO: ...]`.
 */

export type Img = {
  src: string | null;
  alt: string;
  /** Legenda do placeholder enquanto a foto real não existe. */
  placeholder: string;
  width: number;
  height: number;
};

const WHATSAPP_NUMBER = "554991995920";

export const site = {
  name: "Faiber Congelados",
  url: "https://faibercongelados.com.br", // [CONFIRMAR domínio]
  city: "Chapecó",
  state: "SC",
  since: 2010,
  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: "+55 49 9199-5920",
    defaultMessage: "Olá, Faiber! Vim pelo site e gostaria de falar com a equipe.",
  },
  email: "administrativo@faibercongelados.com",
  instagram: "[LINK]", // [CONFIRMAR]
  seo: {
    title: "Faiber Congelados | Pastéis congelados em Chapecó e Oeste de Santa Catarina",
    description:
      "Fábrica familiar de pastéis congelados em Chapecó desde 2010. Tradição, sabor e qualidade para lanchonetes, distribuidoras e food service.",
    ogImage: "/images/og.jpg",
  },
};

export function waLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { id: "produtos", label: "Produtos" },
  { id: "processo", label: "Processo" },
  { id: "cardapio", label: "Cardápio" },
  { id: "historia", label: "Nossa história" },
  { id: "contato", label: "Contato" },
] as const;

/** Ordem das seções (usada pelo artboard e pelo script de capturas). */
export const sections = [
  { id: "hero", label: "Hero" },
  { id: "esteira", label: "Esteira" },
  { id: "manifesto", label: "Manifesto" },
  { id: "evolucao", label: "Evolução" },
  { id: "processo", label: "Processo" },
  { id: "produtos", label: "Produtos" },
  { id: "cardapio", label: "Comanda" },
  { id: "historia", label: "História" },
  { id: "contato", label: "Contato" },
  { id: "rodape", label: "Rodapé" },
] as const;

export const preloader = {
  label: "Desde 2010 · Chapecó, SC",
  skip: "Pular",
};

export const header = {
  orderCta: "Fazer pedido",
  menu: "Menu",
  close: "Fechar",
};

export const hero = {
  eyebrow: "Fábrica familiar · Chapecó, SC · Desde 2010",
  title: ["O pastel que", "a tradição fez.", "A qualidade assinou."],
  subtitle:
    "Desde 2010, a Faiber produz pastéis congelados com receita de família e processo moderno. O mesmo sabor de sempre, com a regularidade que a sua lanchonete, distribuidora ou food service precisa.",
  primaryCta: { label: "Pedir pelo WhatsApp", message: "Olá, Faiber! Vim pelo site e gostaria de fazer um pedido." },
  secondaryCta: { label: "Ver produtos", href: "#produtos" },
  scroll: "Role",
  image: {
    src: null,
    alt: "Cesta de pastéis retangulares dourados e crocantes da Faiber",
    placeholder: "[FOTO: hero-pasteis.png — pastéis retangulares dourados na cesta/prato, PNG recortado com fundo transparente]",
    width: 1400,
    height: 1050,
  } satisfies Img,
  /** Recortes soltos de ingredientes (PNG transparente) para o parallax em camadas. */
  layers: [] as { src: string; alt: string; depth: number; className: string }[],
};

export const marquee = {
  items: ["Pastéis", "Mini pizzas", "Coxinhas", "Enroladinhos", "Assados"],
};

export const manifesto = {
  label: "02 — Nossa essência",
  text: "O pastel chegou ao Brasil em 1940, trazido pela imigração japonesa. Virou companhia de feira e de fim de semana. A Faiber nasceu para mostrar que ele merece mais: tradição de família, processo moderno e o sabor de sempre, em cada pacote.",
  link: { label: "Conheça nossa história", href: "#historia" },
  photos: [
    { src: null, alt: "Linha de produção da fábrica Faiber", placeholder: "[FOTO: fábrica — linha de produção, luz natural]", width: 800, height: 1000 },
    { src: null, alt: "Mãos fechando um pastel", placeholder: "[FOTO: mãos trabalhando — fechamento da massa]", width: 800, height: 800 },
  ] satisfies Img[],
};

export const timeline = {
  label: "03 — Evolução",
  title: "Do pastel de feira à mesa premium.",
  panels: [
    {
      year: "1940",
      title: "O pastel chega ao Brasil",
      text: "O pastel chega ao Brasil e vira paixão nacional.",
      image: { src: null, alt: "Feira de rua com barraca de pastel", placeholder: "[FOTO: feira antiga / barraca de pastel — arquivo histórico]", width: 1200, height: 900 },
    },
    {
      year: "2010",
      title: "Nasce a Faiber",
      text: "Começamos a fabricar em Chapecó, com receita de família e muito trabalho.",
      image: { src: null, alt: "Primeiros anos da fábrica Faiber em Chapecó", placeholder: "[FOTO: primeiros anos da fábrica / família]", width: 1200, height: 900 },
    },
    {
      year: "Hoje",
      title: "Tradição com tecnologia",
      text: "Máquinas modernas ajudam em cada etapa e mantêm a qualidade e o sabor, pacote após pacote.",
      image: { src: null, alt: "Máquinas modernas na fábrica Faiber", placeholder: "[FOTO: máquinas atuais da fábrica]", width: 1200, height: 900 },
    },
  ],
};

export const process = {
  label: "03 — Processo",
  title: "Tecnologia que serve à receita.",
  text: "Máquinas modernas garantem a regularidade. A receita, o cuidado e o ponto continuam sendo da família.",
  // [CONFIRMAR as etapas reais da fábrica]
  steps: [
    { title: "Ingredientes selecionados", text: "Farinha, carnes e queijos escolhidos com critério." },
    { title: "Massa", text: "A receita da família, com ponto e elasticidade de sempre." },
    { title: "Recheio", text: "Preparado na fábrica, na medida certa para cada pastel." },
    { title: "Modelagem e fechamento", text: "Máquinas garantem formato e selagem uniformes." },
    { title: "Congelamento", text: "Congelamento rápido para preservar textura e sabor." },
    { title: "Embalagem e expedição", text: "Pacotes lacrados, prontos para o seu freezer." },
  ],
  pillars: ["Sabor", "Qualidade", "Tradição"],
};

export type Product = {
  id: string;
  name: string;
  description: string;
  pack: string;
  orderLabel: string;
  flavors: string[];
  image: Img;
};

export const products: { label: string; title: string; subtitle: string; addLabel: string; added: string; items: Product[] } = {
  label: "04 — Nossos produtos",
  title: "Cada pastel carrega um sabor de casa.",
  subtitle: "Produtos congelados, prontos para fritar ou assar, direto da fábrica.",
  addLabel: "Adicionar ao pedido",
  added: "Adicionado à comanda",
  // [CONFIRMAR sabores e quantidades]
  items: [
    {
      id: "pasteis",
      name: "Pastéis",
      description: "Massa fina e crocante, borda bem fechada, recheio generoso.",
      pack: "Pacote com 20 un.",
      orderLabel: "PASTÉIS (pacote c/ 20 un.)",
      flavors: ["Carne", "Queijo", "Frango", "Pizza", "Palmito"],
      image: { src: null, alt: "Pastéis Faiber em macro", placeholder: "[FOTO: pastéis — macro da massa e das bolhas]", width: 1000, height: 1250 },
    },
    {
      id: "mini-pizzas",
      name: "Mini pizzas",
      description: "Massa macia e cobertura caprichada para festas e lanches.",
      pack: "Pacote com 20 un.",
      orderLabel: "MINI PIZZAS",
      flavors: ["Calabresa", "Muçarela", "Frango"],
      image: { src: null, alt: "Mini pizzas Faiber", placeholder: "[FOTO: mini pizzas — macro]", width: 1000, height: 1250 },
    },
    {
      id: "coxinhas",
      name: "Coxinhas",
      description: "Massa leve, empanamento sequinho e frango bem temperado.",
      pack: "Pacote com 25 un.",
      orderLabel: "COXINHAS",
      flavors: ["Frango", "Frango com catupiry"],
      image: { src: null, alt: "Coxinhas Faiber", placeholder: "[FOTO: coxinhas — macro do empanamento]", width: 1000, height: 1250 },
    },
    {
      id: "enroladinhos",
      name: "Enroladinhos",
      description: "Clássico de lanchonete, dourado por fora e macio por dentro.",
      pack: "Pacote com 25 un.",
      orderLabel: "ENROLADINHOS",
      flavors: ["Salsicha", "Presunto e queijo"],
      image: { src: null, alt: "Enroladinhos Faiber", placeholder: "[FOTO: enroladinhos — macro]", width: 1000, height: 1250 },
    },
    {
      id: "assados",
      name: "Assados",
      description: "Linha para forno, prática para o balcão e o food service.",
      pack: "Pacote com 20 un.",
      orderLabel: "ASSADOS",
      flavors: ["Frango", "Carne", "Queijo e presunto"],
      image: { src: null, alt: "Salgados assados Faiber", placeholder: "[FOTO: assados — macro da massa dourada]", width: 1000, height: 1250 },
    },
  ],
};

export const order = {
  label: "05 — Cardápio",
  title: "A comanda da casa.",
  subtitle: "Monte o seu pedido. A gente confirma valores e prazo de entrega pelo WhatsApp.",
  ticketNumber: "Nº 0001",
  totalLabel: "TOTAL DE PACOTES",
  fields: { name: "Nome", company: "Empresa", city: "Cidade" },
  stamp: "FAIBER · DESDE 2010 · FAMÍLIA ·",
  submit: "Enviar pedido pelo WhatsApp",
  footnote: "Todos os produtos são congelados, prontos para fritar ou assar.",
};

export function orderMessage(data: { name: string; company: string; city: string; lines: string[] }) {
  return `Olá, Faiber! Sou ${data.name}, da ${data.company}, de ${data.city}. Gostaria de um orçamento: ${data.lines.join("; ")}.`;
}

export const story = {
  label: "06 — Quem está por trás",
  title: "Uma fábrica feita em família.",
  image: {
    src: null,
    alt: "José Moraci Faiber e Mariclei Rossi, fundadores da Faiber Congelados",
    placeholder: "[FOTO: fundadores — José Moraci Faiber e Mariclei Rossi juntos, na fábrica]",
    width: 1000,
    height: 1250,
  } satisfies Img,
  paragraphs: [
    "José Moraci Faiber trabalha no ramo alimentício há 32 anos. Ainda morando em Florianópolis, enxergou uma oportunidade de mercado única. Em 2010, deu um passo importante: abriu a fábrica em Chapecó, ao lado da esposa, Mariclei Rossi.",
    "A jornada teve muitas adversidades. Mas a qualidade dos produtos e o carinho da família estiveram presentes desde o primeiro dia, e é isso que faz o pastel Faiber ser diferente.",
  ],
  // [CONFIRMAR]
  numbers: [
    { value: "32", label: "anos no ramo alimentício" },
    { value: "2010", label: "fábrica em Chapecó" },
    { value: "100%", label: "gestão familiar" },
  ],
  link: { label: "Falar com a família Faiber", message: "Olá, família Faiber! Vim pelo site e gostaria de conversar." },
};

export const contact = {
  label: "07 — Contato",
  title: "Vamos conversar?",
  text: "Lanchonetes, distribuidoras e food service: fale direto com a nossa equipe, tire dúvidas e peça sua tabela de produtos.",
  businessTypes: ["Lanchonete", "Distribuidora", "Food service", "Outro"],
  submit: "Enviar mensagem",
  success: "Recebemos seu contato. Em breve nossa equipe retorna.",
};

export const footer = {
  tagline: "Sabor de casa, qualidade de fábrica.",
  location: "Chapecó, Santa Catarina",
  rights: "© Faiber Congelados. Todos os direitos reservados.",
  backToTop: "Voltar ao topo",
};
