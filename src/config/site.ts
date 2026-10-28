/**
 * Conteúdo editável do site — o que não vem do DunasTour. Passeios, preços, fotos, telefone, Instagram
 * e Cadastur vêm da API (ver lib/dunastour); transfer, hospedagem, roteiros de vários dias, destinos e
 * estações vieram do site antigo da Levada e ficam aqui.
 */
export const site = {
  name: "Levada Turismo",
  tagline: "Levando vidas aos Lençóis",
  city: "Barreirinhas · Maranhão",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://levadaturismo.com" : "http://localhost:3000"),

  /** Usados se a API não devolver telefone/Instagram da agência. */
  fallbackWhatsapp: "+55 (98) 99133-3370",
  fallbackInstagram: "levada_turismo",
  email: "levadaturismo@gmail.com",

  address: {
    street: "R. Cincinato Ribeiro Rêgo, 155 · Cebola",
    city: "Barreirinhas · MA · 65590-000",
    lat: -2.7512085972259706,
    lng: -42.820480325271326,
  },
  hours: [
    { days: "Segunda a sábado", time: "08h às 18h" },
    { days: "Domingo", time: "08h às 12h" },
  ],

  /** Ano em que a família começou a guiar no parque e ano da empresa. */
  since: 1999,
  founded: 2017,

  /** A história do nome — aparece no "Sobre". */
  story: [
    "Somos naturais de Barreirinhas e atuamos no turismo desde 1999, como agência receptiva e condutores de visitantes no Parque Nacional dos Lençóis Maranhenses. Em abril de 2017 a família formalizou a empresa: nascia a Levada Turismo.",
    "O nome vem do antigo sistema de irrigação dos primeiros moradores da região. Eles cavavam valas que encontravam o rio e, quando a maré subia, a água corria por elas até as plantações. Onde há água, há vida.",
    "É isso que a gente quer fazer com você: levar com cuidado, segurança e praticidade, de um lugar a outro, numa viagem de conhecimento e contemplação da natureza.",
  ],

  stats: [
    { value: "1999", label: "guiando no parque" },
    { value: "10 mil+", label: "viajantes atendidos" },
    { value: "10+", label: "roteiros na região" },
  ],

  /**
   * Destaque do caiaque na home; `match` acha o passeio no DunasTour (preço, duração e roteiro saem de lá).
   * `youtubeId` = id do vídeo/Shorts (o que vem depois de /shorts/ ou ?v=). Vazio = mostra a foto
   * `poster` no quadro vertical. O link do site antigo (XKfCEsUyISQ) NÃO é do caiaque — é outro vídeo.
   */
  kayak: {
    youtubeId: "",
    poster: "/fotos/caiaque/caiaque3.jpeg",
    match: /caiaque/i,
    text: "Saímos de 4x4 até o povoado de Sobradinho e descemos o Rio Preguiças a favor da correnteza, remando sem esforço entre manguezais, macacos-prego e a mata das margens, até o balneário do Recanto.",
    facts: ["A favor da correnteza", "Parada pra mergulho no rio", "Caiaque, colete e guia", "Não precisa ter experiência"],
    photos: ["/fotos/caiaque/caiaque1.jpeg", "/fotos/caiaque/caiaque4.jpeg", "/fotos/caiaque/caiaque6.jpeg"],
  },

  /**
   * Posts/reels do Instagram (URL do post ou reel — da Levada ou de quem viajou com ela) pra faixa "Quem já viajou
   * com a Levada", embaixo do perfil. Vazio = sem a faixa.
   */
  instagramReels: [
    "https://www.instagram.com/s_eduarda45/reel/DD9xSQsu76R/",
    "https://www.instagram.com/maurileia_santos/reel/DEc1nqNOB3b/",
    "https://www.instagram.com/levada_turismo/p/DBtWKJquZNQ/",
    "https://www.instagram.com/clarice_guia/reel/DI-JXJKN02K/",
    "https://www.instagram.com/levada_turismo/p/C60zQQuux0z/",
    "https://www.instagram.com/levada_turismo/p/CeUEpLjuy8o/",
    "https://www.instagram.com/levada_turismo/p/CdhQjUMsaVw/",
  ] as string[],

  /** true = embed oficial do perfil (últimos 6 posts reais, atualiza sozinho); false = grade com as fotos dos passeios. */
  instagramProfileEmbed: true,

  /** Compra pelo site está desligada: o "Minha viagem" junta tudo e finaliza no WhatsApp. */
  onlineBooking: false,
  cart: true,

  /** Destinos da região — `match` liga o destino aos passeios do DunasTour pelo título. */
  destinations: [
    {
      id: "lencois",
      name: "Lençóis Maranhenses",
      kicker: "Parque Nacional",
      image: "/fotos/lencois-maranhenses.jpg",
      text: "Dunas brancas que se estendem por quilômetros e, na temporada de chuvas, milhares de lagoas de água doce entre elas. Uma paisagem que parece saída de um sonho.",
      match: /lagoa|(?<!pequenos )len[cç][oó]is/i,
    },
    {
      id: "atins",
      name: "Atins",
      kicker: "Onde o rio encontra o mar",
      image: "/fotos/atins.webp",
      text: "Vila de pescadores entre as dunas e o oceano, com ruas de areia, casas simples e o camarão grelhado mais famoso da região. Paraíso do kitesurf.",
      match: /atins/i,
    },
    {
      id: "mandacaru",
      name: "Mandacaru",
      kicker: "Vila do farol",
      image: "/fotos/mandacaru.webp",
      text: "Às margens do Rio Preguiças, com um farol histórico de onde se vê o parque, o rio e o mar de uma vez só.",
      match: /mandacaru|vassouras|caburé|cabure/i,
    },
    {
      id: "pequenos-lencois",
      name: "Pequenos Lençóis",
      kicker: "Mais intimista",
      image: "/fotos/pequenos-lencois.jpg",
      text: "A extensão do parque do outro lado do rio: dunas menores, lagoas cristalinas, várzeas e manguezais, com bem menos gente.",
      match: /pequenos/i,
    },
    {
      id: "cardosa",
      name: "Povoado Cardosa",
      kicker: "Cultura e rio",
      image: "/fotos/cardosa.webp",
      text: "Comunidade tradicional às margens do Rio Formiga — boia-cross na água cristalina e contato com o jeito de viver maranhense.",
      match: /cardosa|caiaque/i,
    },
  ],

  transfer: {
    images: ["/fotos/carro4.jpeg", "/fotos/carro1.jpeg", "/fotos/carro2.jpeg", "/fotos/carro3.jpeg", "/fotos/carro.jpeg"],
    text: "Do aeroporto de São Luís até a porta da sua pousada em Barreirinhas, com motorista da casa, carro climatizado e horário marcado pelo seu voo.",
    features: ["Carros modernos e climatizados", "Motoristas profissionais", "Pontualidade garantida", "Atendimento 24 horas", "Preço justo", "Privativo ou compartilhado"],
    /** Trechos mais pedidos — o formulário também aceita outro. */
    routes: [
      { from: "Aeroporto de São Luís", to: "Barreirinhas", km: 260, time: "≈ 4h" },
      { from: "São Luís (hotel)", to: "Barreirinhas", km: 250, time: "≈ 4h" },
      { from: "Barreirinhas", to: "Atins", km: 40, time: "≈ 1h30 de 4x4" },
      { from: "Barreirinhas", to: "Santo Amaro", km: 180, time: "≈ 3h" },
      { from: "Barreirinhas", to: "Jericoacoara", km: 520, time: "Rota das Emoções" },
    ],
  },

  lodging: [
    {
      id: "pousada",
      name: "Pousadas",
      singular: "Pousada",
      image: "/fotos/pousada.png",
      text: "As pousadas com melhor custo-benefício e localização da cidade — perto do rio e do ponto de saída dos passeios.",
      features: ["Café da manhã incluso", "Perto dos pontos turísticos", "Wi-Fi", "Atendimento de família"],
    },
    {
      id: "hostel",
      name: "Hostels",
      singular: "Hostel",
      image: "/fotos/hostel.png",
      text: "Opções econômicas e aconchegantes pra quem viaja sozinho, em casal ou com a galera e gosta de trocar história.",
      features: ["Quarto compartilhado ou privativo", "Cozinha compartilhada", "Área de convivência", "Clima descontraído"],
    },
    {
      id: "hotel",
      name: "Hotéis",
      singular: "Hotel",
      image: "/fotos/hotel.png",
      text: "Parceiros com estrutura completa pra quem quer conforto total entre um passeio e outro.",
      features: ["Serviço de quarto", "Restaurante", "Piscina e academia", "Recepção 24h"],
    },
  ],

  /** Estações — `months` (1–12) marca o período no gráfico do nível das lagoas. */
  seasons: [
    {
      id: "chuva",
      name: "Época de chuva",
      period: "Janeiro a junho",
      months: [1, 2, 3, 4, 5, 6],
      level: 60,
      image: "/fotos/lagoa-azul-meio-cheio.jpg",
      text: "As chuvas enchem as dunas e as lagoas vão se formando. Paisagem mais verde e temperatura mais amena.",
      tip: "Pra quem quer ver as lagoas nascendo.",
    },
    {
      id: "cheia",
      name: "Lagoas cheias",
      period: "Julho a setembro",
      months: [7, 8, 9],
      level: 100,
      image: "/fotos/Lencois-1.jpg",
      text: "Lagoas no nível máximo, água morna e céu aberto. É a época mais procurada — e a melhor pra foto.",
      tip: "Reserve com antecedência.",
    },
    {
      id: "seca",
      name: "Período seco",
      period: "Outubro a dezembro",
      months: [10, 11, 12],
      level: 30,
      image: "/fotos/lagoa-azul-seca.jpg",
      text: "As lagoas começam a baixar, mas as perenes seguem boas de banho. Menos movimento e preços melhores.",
      tip: "Bom pra quem foge de multidão.",
    },
  ],

  /** Diferenciais (faixa logo depois do hero). */
  promises: [
    { icon: "anchor", title: "Gente daqui", text: "Família de Barreirinhas guiando no parque desde 1999." },
    { icon: "shield", title: "Cadastur", text: "Agência registrada no Ministério do Turismo." },
    { icon: "car", title: "Busca no hotel", text: "Todo passeio sai da porta da sua hospedagem." },
    { icon: "route", title: "Viagem inteira", text: "Transfer, hospedagem e passeios num só atendimento." },
  ],

  faqs: [
    {
      question: "Como funciona a reserva pelo site?",
      answer:
        "Escolha o passeio, a data e quantas pessoas vão e toque em “Adicionar à viagem”. Dá pra juntar vários passeios, o transfer e a hospedagem. No fim, “Enviar pelo WhatsApp” abre a conversa com tudo preenchido e a gente confirma as vagas e combina o pagamento por lá.",
    },
    {
      question: "Qual a melhor época para visitar os Lençóis?",
      answer:
        "Entre junho e setembro as lagoas estão cheias depois das chuvas e o clima é perfeito pra banho. Mas dá pra visitar o ano todo: veja a seção “Quando ir” com o nível das lagoas mês a mês.",
    },
    {
      question: "Como chegar a Barreirinhas?",
      answer:
        "O caminho mais comum é voar até São Luís e seguir de carro, cerca de 4 horas por asfalto. A gente faz o transfer do aeroporto até a sua pousada.",
    },
    {
      question: "Quais documentos preciso levar?",
      answer:
        "Documento de identificação com foto (RG ou CNH). Menores de idade precisam de autorização dos pais ou responsáveis. Leve também a carteirinha do plano de saúde.",
    },
    {
      question: "O que levar para os passeios?",
      answer:
        "Protetor solar, óculos de sol, chapéu ou boné, roupa leve, roupa de banho, toalha, água e repelente. Nos passeios de lagoa, uma muda de roupa extra e uma sacola pra proteger o celular da areia.",
    },
    {
      question: "Os passeios são seguros?",
      answer:
        "Sim. Todos são feitos com condutores credenciados e experientes, veículos revisados e protocolo de segurança. A Levada é registrada no Cadastur.",
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Cartão de crédito e débito, PIX e transferência. Para grupos, temos condições especiais — fale com a gente.",
    },
  ],
};

export type SiteConfig = typeof site;
export type Destination = (typeof site.destinations)[number];
export type LodgingType = (typeof site.lodging)[number];

/** Carrinho visível: sozinho (finaliza no WhatsApp) ou junto com a compra pelo site. */
export const cartEnabled = site.onlineBooking || site.cart;

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${site.address.lat},${site.address.lng}&travelmode=driving`;
export const mapsEmbed = `https://www.google.com/maps?q=${site.address.lat},${site.address.lng}&z=16&output=embed`;
