/**
 * Todo o texto do site fica aqui.
 * Itens marcados com [CONFIRMAR] ainda precisam ser validados pela Faiber.
 * Itens com [FOTO: ...] são placeholders de imagem a substituir.
 */

const whatsappNumero = "554991995920";

/** Monta um link wa.me com a mensagem já preenchida. */
export function linkWhatsApp(mensagem?: string) {
  const base = `https://wa.me/${whatsappNumero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const site = {
  nome: "Faiber Congelados",
  url: "https://www.faibercongelados.com", // [CONFIRMAR] domínio final
  cidade: "Chapecó",
  estado: "Santa Catarina",
  uf: "SC",
  fundacao: 2010,
  whatsapp: {
    numero: whatsappNumero,
    exibicao: "+55 49 9199-5920",
  },
  email: "administrativo@faibercongelados.com",
  instagram: "", // [LINK] Instagram ainda não informado
  seo: {
    title: "Faiber Congelados | Pastéis congelados em Chapecó e Oeste de Santa Catarina",
    description:
      "Fábrica familiar de pastéis congelados em Chapecó desde 2010. Tradição, sabor e qualidade para lanchonetes, distribuidoras e food service.",
  },
};

/** Mensagens prontas que abrem no WhatsApp. */
export const mensagens = {
  geral: "Olá! Vim pelo site da Faiber Congelados e gostaria de mais informações.",
  pedido: "Olá! Vim pelo site e gostaria de fazer um pedido de pastéis congelados.",
  cardapio: "Olá! Gostaria de consultar os sabores e valores dos produtos da Faiber Congelados.",
  fabrica: "Olá! Gostaria de falar com a fábrica da Faiber Congelados.",
  familia: "Olá, família Faiber! Vim pelo site e gostaria de conversar.",
};

export const navegacao = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Nossa história", href: "#historia" },
  { label: "Contato", href: "#contato" },
];

export const header = {
  cta: "Falar no WhatsApp",
  menuAbrir: "Abrir menu",
  menuFechar: "Fechar menu",
};

export const hero = {
  chamada: "Pastéis congelados · Chapecó, Oeste de Santa Catarina",
  tituloLinha1: "O pastel que a tradição fez.",
  tituloLinha2: "A qualidade assinou.",
  subtitulo:
    "Desde 2010, a Faiber produz pastéis congelados com receita de família e processo moderno. O mesmo sabor de sempre, com a regularidade que a sua lanchonete, distribuidora ou food service precisa.",
  botaoPrimario: "Pedir pelo WhatsApp",
  botaoSecundario: "Ver cardápio",
  selo: "Receita de família · Desde 2010 · ",
  /**
   * Foto do prato recortada (PNG sem fundo). Enquanto for null,
   * o site mostra uma ilustração provisória no lugar.
   */
  pratoImagem: null as null | { src: string; width: number; height: number },
  pratoAlt: "Prato com pastéis retangulares dourados da Faiber",
  pratoPlaceholder: "[FOTO: prato com pastéis retangulares, recortado em PNG sem fundo]",
};

export const esteira = {
  itens: [
    { nome: "Pastel de carne", imagem: "/images/pastel-na-mao.jpg" },
    { nome: "Pastel de queijo", imagem: null },
    { nome: "Pastel de pizza", imagem: null },
    { nome: "Pastel de frango", imagem: null },
    { nome: "Mini pizza", imagem: null },
    { nome: "Coxinha", imagem: null },
    { nome: "Enroladinho", imagem: null },
    { nome: "Assados", imagem: null },
  ], // [CONFIRMAR sabores]
  titulo: "Cada pastel carrega um sabor de casa.",
  botao: "Conheça nossos produtos",
  fotos: [
    { src: "/images/pasteis-bandeja.jpg", alt: "Bandeja de pastéis dourados recém-fritos" },
    { src: "/images/pastel-na-mao.jpg", alt: "Pastel em formato de meia-lua, dourado e crocante" },
    { src: null, alt: "[FOTO: coxinhas]" },
    { src: null, alt: "[FOTO: mini pizzas]" },
    { src: null, alt: "[FOTO: enroladinhos]" },
    { src: null, alt: "[FOTO: assados]" },
  ],
};

export const proposito = {
  titulo: "Do pastel de feira à mesa premium.",
  paragrafos: [
    "O pastel chegou ao Brasil em 1940, trazido pela imigração japonesa, e conquistou o país. Virou companhia de feira, de fim de semana, de lanche com a família. Para nós, ele merece ir além.",
    "A Faiber nasceu para mostrar que o pastel pode ser tradicional e premium ao mesmo tempo. Nosso propósito é ser a melhor fornecedora de pastéis congelados do Oeste de Santa Catarina, sem abrir mão do que nos trouxe até aqui: sabor, qualidade e tradição.",
  ],
  linhaDoTempo: [
    { ano: "1940", texto: "O pastel chega ao Brasil e vira paixão nacional." },
    { ano: "2010", texto: "Começamos a fabricar em Chapecó, com receita de família e muito trabalho." },
    {
      ano: "Hoje",
      texto: "Máquinas modernas ajudam em cada etapa e mantêm a qualidade e o sabor, pacote após pacote.",
    },
  ],
  imagemFabrica: null as null | { src: string; alt: string },
  imagemFabricaPlaceholder: "[FOTO: linha de produção da fábrica em Chapecó]",
};

export const cardapio = {
  titulo: "Cardápio Faiber",
  subtitulo: "Direto da fábrica para o seu balcão.",
  itens: [
    { nome: "PASTÉIS", descricao: "Massa fina e crocante, recheio generoso", quantidade: "pacote com 20 unidades" },
    { nome: "MINI PIZZAS", descricao: "Para o salgado que sai rápido no balcão", quantidade: "[ ] un. [CONFIRMAR]" },
    { nome: "COXINHAS", descricao: "Massa macia, recheio cremoso", quantidade: "[ ] un. [CONFIRMAR]" },
    { nome: "ENROLADINHOS", descricao: "Ótimos para festas e para o dia a dia", quantidade: "[ ] un. [CONFIRMAR]" },
    { nome: "ASSADOS", descricao: "Assados na medida, prontos para vender", quantidade: "[ ] un. [CONFIRMAR]" },
  ],
  rodape:
    "Todos os produtos são congelados, prontos para fritar ou assar. Peça pelo WhatsApp e receba direto da fábrica.",
  botao: "Consultar sabores e valores",
};

export const destaque = {
  texto: "Uma viagem pelo sabor de casa.",
  botao: "Falar com a fábrica",
};

export const historia = {
  chamada: "Quem está por trás da Faiber",
  titulo: "Uma fábrica feita em família.",
  paragrafos: [
    "José Moraci Faiber trabalha no ramo alimentício há 32 anos. Ainda morando em Florianópolis, enxergou uma oportunidade de mercado única. Em 2010, deu um passo importante: abriu a fábrica em Chapecó, ao lado da esposa, Mariclei Rossi.",
    "A jornada teve muitas adversidades. Mas a qualidade dos produtos e o carinho da família estiveram presentes desde o primeiro dia, e é isso que faz o pastel Faiber ser diferente.",
  ],
  foto: null as null | { src: string; alt: string },
  fotoPlaceholder: "[FOTO: José Moraci Faiber e Mariclei Rossi, fundadores]",
  numeros: [
    { valor: 32, prefixo: "", sufixo: "", legenda: "anos no ramo alimentício" },
    { valor: 2010, prefixo: "", sufixo: "", legenda: "fábrica em Chapecó" },
    { valor: 100, prefixo: "", sufixo: "%", legenda: "gestão familiar" }, // [CONFIRMAR]
    { valor: 80, prefixo: "+", sufixo: "", legenda: "anos de pastel no Brasil" },
  ],
  botao: "Falar com a família Faiber",
};

export const contato = {
  chamada: "Atendimento direto com a fábrica",
  titulo: "Vamos levar a Faiber para o seu negócio?",
  texto:
    "Lanchonetes, distribuidoras e food service: fale direto com a nossa equipe, tire dúvidas e peça sua tabela de produtos.",
  botaoWhatsApp: "Chamar no WhatsApp",
  formulario: {
    nome: "Nome",
    empresa: "Empresa",
    tipo: "Tipo de negócio",
    tipos: ["Lanchonete", "Distribuidora", "Food service", "Outro"],
    cidade: "Cidade",
    mensagem: "Mensagem",
    enviar: "Enviar mensagem",
    confirmacao: "Recebemos seu contato! Em breve nossa equipe retorna.",
    erroObrigatorio: "Preencha este campo.",
  },
  emailRotulo: "Prefere e-mail?",
};

export const rodape = {
  frase: "Sabor de casa, qualidade de fábrica.",
  local: "Chapecó, Santa Catarina",
  direitos: "© Faiber Congelados. Todos os direitos reservados.",
  nomeGigante: "FAIBER",
};
