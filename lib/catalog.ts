export type CatalogCategory = {
  id: string;
  title: string;
  description: string;
  photos: { src: string; alt: string }[];
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "squeeze-garrafas",
    title: "Squeeze e Garrafas",
    description:
      "Squeeze inox, alumínio e plástico em diversas cores e capacidades, para uso diário da sua equipe ou como brinde institucional.",
    photos: [
      { src: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-900ml.png", alt: "Squeeze inox 900ml" },
      { src: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-750ml.png", alt: "Squeeze inox 750ml" },
      { src: "/images/catalogo/01-squeeze-garrafas/squeeze-aluminio-800ml.png", alt: "Squeeze alumínio 800ml" },
    ],
  },
  {
    id: "canecas-termicas",
    title: "Canecas Térmicas",
    description:
      "Canecas com tampa, canudo, abridor ou display — a linha mais pedida para brindes corporativos.",
    photos: [
      { src: "/images/catalogo/04-canecas-termicas/caneca-termica-abridor-500ml.png", alt: "Caneca térmica com abridor 500ml" },
      { src: "/images/catalogo/04-canecas-termicas/caneca-termica-canudo-1200ml.png", alt: "Caneca térmica com canudo 1200ml" },
      { src: "/images/catalogo/04-canecas-termicas/caneca-termica-tampa-700ml-a.png", alt: "Caneca térmica com tampa 700ml" },
    ],
  },
  {
    id: "canecas-copos",
    title: "Canecas e Copos Térmicos",
    description:
      "Linha inox parede dupla e copos térmicos com abridor, para presentear com praticidade.",
    photos: [
      { src: "/images/catalogo/03-canecas/caneca-inox-parede-dupla-250ml.png", alt: "Caneca inox parede dupla 250ml" },
      { src: "/images/catalogo/03-canecas/caneca-inox-alca-acrilica-400ml.png", alt: "Caneca inox com alça acrílica 400ml" },
      { src: "/images/catalogo/05-copos-termicos/copo-termico-abridor-500ml.png", alt: "Copo térmico com abridor 500ml" },
    ],
  },
  {
    id: "cuia-e-bomba",
    title: "Cuia e Bomba",
    description:
      "Cuias de madeira, com pintura ou pé de massa, e bombas em inox — a tradição gaúcha personalizada com a marca da sua empresa.",
    photos: [
      { src: "/images/catalogo/02-cuia-e-bomba/cuia-pe-de-massa-medalhao.png", alt: "Cuia com pé de massa e medalhão" },
      { src: "/images/catalogo/02-cuia-e-bomba/cuia-com-pedestal.png", alt: "Cuia com pedestal" },
      { src: "/images/catalogo/02-cuia-e-bomba/bomba-inox-rosca.png", alt: "Bomba inox com rosca" },
    ],
  },
  {
    id: "kit-vinho",
    title: "Kit Vinho",
    description:
      "Kits em caixa de madeira, caixa xadrez ou estojo de garrafa, ideais para presentes institucionais e datas comemorativas.",
    photos: [
      { src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-madeira.png", alt: "Kit vinho em caixa de madeira" },
      { src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-xadrez.png", alt: "Kit vinho em caixa xadrez" },
      { src: "/images/catalogo/06-kit-vinho/kit-vinho-garrafa-4-pecas.png", alt: "Kit vinho garrafa 4 peças" },
    ],
  },
  {
    id: "chaveiros",
    title: "Chaveiros",
    description:
      "Chaveiros em couro ou metal, alta visibilidade para reforçar a marca no dia a dia do cliente.",
    photos: [
      { src: "/images/catalogo/07-chaveiros/chaveiro-couro-sortido.png", alt: "Chaveiros em couro sortidos" },
      { src: "/images/catalogo/07-chaveiros/chaveiro-couro-individual-a.png", alt: "Chaveiro em couro individual" },
      { src: "/images/catalogo/07-chaveiros/chaveiro-metal-sortido.png", alt: "Chaveiros em metal sortidos" },
    ],
  },
  {
    id: "canetas",
    title: "Canetas",
    description:
      "Diversas linhas e acabamentos, o brinde corporativo mais clássico e versátil.",
    photos: [
      { src: "/images/catalogo/08-canetas/canetas-linha-01.png", alt: "Linha de canetas 01" },
      { src: "/images/catalogo/08-canetas/canetas-linha-02.png", alt: "Linha de canetas 02" },
      { src: "/images/catalogo/08-canetas/canetas-linha-03.png", alt: "Linha de canetas 03" },
    ],
  },
  {
    id: "uniformes-industriais",
    title: "Uniformes Industriais",
    description:
      "Macacões, jalecos, calças e bermudas para equipes operacionais, com identidade visual da empresa.",
    photos: [
      { src: "/images/catalogo/09-uniformes-industriais/macacao-azul.png", alt: "Macacão industrial azul" },
      { src: "/images/catalogo/09-uniformes-industriais/jaleco-social-camisa.png", alt: "Jaleco social e camisa" },
      { src: "/images/catalogo/09-uniformes-industriais/bermuda-uniforme.png", alt: "Bermuda uniforme" },
    ],
  },
  {
    id: "vestuario-corporativo",
    title: "Vestuário Corporativo",
    description:
      "Jaquetas, moletons, camisas sociais e polos para uniformizar sua equipe com elegância.",
    photos: [
      { src: "/images/catalogo/10-jaquetas-moletons-camisas/jaqueta-corta-vento.png", alt: "Jaqueta corta-vento personalizada" },
      { src: "/images/catalogo/10-jaquetas-moletons-camisas/camisa-social.png", alt: "Camisa social personalizada" },
      { src: "/images/catalogo/10-jaquetas-moletons-camisas/polo-preta-detalhe.png", alt: "Polo preta com detalhe" },
    ],
  },
  {
    id: "camisetas",
    title: "Camisetas",
    description:
      "Camisetas esportivas e básicas personalizadas para eventos, campanhas e ações promocionais.",
    photos: [
      { src: "/images/catalogo/11-camisetas/camiseta-esportiva-cinza.png", alt: "Camiseta esportiva cinza" },
      { src: "/images/catalogo/11-camisetas/camiseta-laranja-esportiva.png", alt: "Camiseta esportiva laranja" },
      { src: "/images/catalogo/11-camisetas/camiseta-basica.png", alt: "Camiseta básica personalizada" },
    ],
  },
  {
    id: "acessorios",
    title: "Chapéus, Bonés e Acessórios",
    description:
      "Bonés, chapéus, mochilas, bolsas térmicas e guarda-chuvas para completar o kit de brindes da sua empresa.",
    photos: [
      { src: "/images/catalogo/12-chapeus-bones/bone-e-chapeu.png", alt: "Boné e chapéu personalizados" },
      { src: "/images/catalogo/13-mochilas-bolsas-termicas/mochila-bolsa-termica.png", alt: "Mochila e bolsa térmica" },
      { src: "/images/catalogo/14-guarda-chuvas/guarda-chuva-guarda-sol.png", alt: "Guarda-chuva e guarda-sol" },
    ],
  },
];
