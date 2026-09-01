export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  src: string;
  alt: string;
  featured?: boolean;
};

export type CatalogCategory = {
  id: string;
  title: string;
  description: string;
  products: Product[];
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "squeeze-garrafas",
    title: "Squeeze e Garrafas",
    description:
      "Squeeze inox, alumínio e plástico em diversas cores e capacidades, para uso diário da sua equipe ou como brinde institucional.",
    products: [
      {
        id: "squeeze-inox-900ml",
        name: "Squeeze Inox 900ml",
        shortDescription:
          "Squeeze em aço inox com alça, ideal para uso diário da equipe e brindes institucionais de alto volume.",
        src: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-900ml.png",
        alt: "Squeeze inox 900ml",
      },
      {
        id: "squeeze-inox-750ml",
        name: "Squeeze Inox 750ml",
        shortDescription:
          "Versão compacta em inox, prática para levar ao trabalho ou à academia, com boa área de personalização.",
        src: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-750ml.png",
        alt: "Squeeze inox 750ml",
        featured: true,
      },
      {
        id: "squeeze-aluminio-800ml",
        name: "Squeeze Alumínio 800ml",
        shortDescription:
          "Squeeze leve em alumínio, disponível em diversas cores — ótimo custo-benefício para grandes quantidades.",
        src: "/images/catalogo/01-squeeze-garrafas/squeeze-aluminio-800ml.png",
        alt: "Squeeze alumínio 800ml",
      },
    ],
  },
  {
    id: "canecas-termicas",
    title: "Canecas Térmicas",
    description:
      "Canecas com tampa, canudo, abridor ou display — a linha mais pedida para brindes corporativos.",
    products: [
      {
        id: "caneca-termica-abridor-500ml",
        name: "Caneca Térmica com Abridor 500ml",
        shortDescription:
          "Caneca térmica com abridor de garrafas embutido na base, um diferencial que chama atenção como brinde.",
        src: "/images/catalogo/04-canecas-termicas/caneca-termica-abridor-500ml.png",
        alt: "Caneca térmica com abridor 500ml",
        featured: true,
      },
      {
        id: "caneca-termica-canudo-1200ml",
        name: "Caneca Térmica com Canudo 1200ml",
        shortDescription:
          "Caneca de grande capacidade com canudo e alça, a linha mais pedida atualmente para brindes corporativos.",
        src: "/images/catalogo/04-canecas-termicas/caneca-termica-canudo-1200ml.png",
        alt: "Caneca térmica com canudo 1200ml",
      },
      {
        id: "caneca-termica-tampa-700ml",
        name: "Caneca Térmica com Tampa 700ml",
        shortDescription:
          "Caneca térmica com tampa vazada para bebidas quentes, mantendo a temperatura por mais tempo.",
        src: "/images/catalogo/04-canecas-termicas/caneca-termica-tampa-700ml-a.png",
        alt: "Caneca térmica com tampa 700ml",
      },
    ],
  },
  {
    id: "canecas-copos",
    title: "Canecas e Copos Térmicos",
    description:
      "Linha inox parede dupla e copos térmicos com abridor, para presentear com praticidade.",
    products: [
      {
        id: "caneca-inox-parede-dupla-250ml",
        name: "Caneca Inox Parede Dupla 250ml",
        shortDescription:
          "Caneca compacta em inox com parede dupla, mantém a bebida na temperatura certa e tem ótimo acabamento.",
        src: "/images/catalogo/03-canecas/caneca-inox-parede-dupla-250ml.png",
        alt: "Caneca inox parede dupla 250ml",
      },
      {
        id: "caneca-inox-alca-acrilica-400ml",
        name: "Caneca Inox com Alça Acrílica 400ml",
        shortDescription:
          "Caneca em inox com alça em acrílico colorido, disponível em diversas cores para combinar com a marca do cliente.",
        src: "/images/catalogo/03-canecas/caneca-inox-alca-acrilica-400ml.png",
        alt: "Caneca inox com alça acrílica 400ml",
      },
      {
        id: "copo-termico-abridor-500ml",
        name: "Copo Térmico com Abridor 500ml",
        shortDescription:
          "Copo térmico de parede dupla com abridor de garrafas na base, prático para eventos e happy hours corporativos.",
        src: "/images/catalogo/05-copos-termicos/copo-termico-abridor-500ml.png",
        alt: "Copo térmico com abridor 500ml",
      },
    ],
  },
  {
    id: "cuia-e-bomba",
    title: "Cuia e Bomba",
    description:
      "Cuias de madeira, com pintura ou pé de massa, e bombas em inox — a tradição gaúcha personalizada com a marca da sua empresa.",
    products: [
      {
        id: "cuia-pe-de-massa-medalhao",
        name: "Cuia Pé de Massa com Medalhão",
        shortDescription:
          "Cuia tradicional com pé de massa e medalhão personalizável — a tradição gaúcha com a marca da sua empresa.",
        src: "/images/catalogo/02-cuia-e-bomba/cuia-pe-de-massa-medalhao.png",
        alt: "Cuia com pé de massa e medalhão",
        featured: true,
      },
      {
        id: "cuia-com-pedestal",
        name: "Cuia com Pedestal",
        shortDescription:
          "Cuia com base em pedestal, acabamento resistente, ideal para presentear parceiros e clientes.",
        src: "/images/catalogo/02-cuia-e-bomba/cuia-com-pedestal.png",
        alt: "Cuia com pedestal",
      },
      {
        id: "bomba-inox-rosca",
        name: "Bomba Inox com Rosca",
        shortDescription:
          "Bomba em aço inox com filtro de rosca, complemento perfeito para qualquer cuia personalizada.",
        src: "/images/catalogo/02-cuia-e-bomba/bomba-inox-rosca.png",
        alt: "Bomba inox com rosca",
      },
    ],
  },
  {
    id: "kit-vinho",
    title: "Kit Vinho",
    description:
      "Kits em caixa de madeira, caixa xadrez ou estojo de garrafa, ideais para presentes institucionais e datas comemorativas.",
    products: [
      {
        id: "kit-vinho-caixa-madeira",
        name: "Kit Vinho Caixa de Madeira",
        shortDescription:
          "Kit com acessórios de vinho em estojo de madeira, presente institucional elegante para datas comemorativas.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-madeira.png",
        alt: "Kit vinho em caixa de madeira",
      },
      {
        id: "kit-vinho-caixa-xadrez",
        name: "Kit Vinho Caixa Xadrez",
        shortDescription:
          "Kit vinho com tabuleiro de xadrez embutido na tampa da caixa — um brinde diferente para clientes e parceiros.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-xadrez.png",
        alt: "Kit vinho em caixa xadrez",
        featured: true,
      },
      {
        id: "kit-vinho-garrafa-4-pecas",
        name: "Kit Vinho Garrafa 4 Peças",
        shortDescription:
          "Estojo em formato de garrafa com 4 acessórios essenciais para harmonização, prático para transportar e presentear.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-garrafa-4-pecas.png",
        alt: "Kit vinho garrafa 4 peças",
      },
    ],
  },
  {
    id: "chaveiros",
    title: "Chaveiros",
    description:
      "Chaveiros em couro ou metal, alta visibilidade para reforçar a marca no dia a dia do cliente.",
    products: [
      {
        id: "chaveiro-couro-sortido",
        name: "Chaveiro em Couro",
        shortDescription:
          "Chaveiro em couro legítimo com gravação personalizada, alta durabilidade e visibilidade no dia a dia do cliente.",
        src: "/images/catalogo/07-chaveiros/chaveiro-couro-sortido.png",
        alt: "Chaveiros em couro sortidos",
        featured: true,
      },
      {
        id: "chaveiro-couro-individual",
        name: "Chaveiro em Couro — Modelo Individual",
        shortDescription:
          "Variação em couro com mosquetão, ideal para personalização de logo e informações de contato.",
        src: "/images/catalogo/07-chaveiros/chaveiro-couro-individual-a.png",
        alt: "Chaveiro em couro individual",
      },
      {
        id: "chaveiro-metal-sortido",
        name: "Chaveiro em Metal",
        shortDescription:
          "Chaveiro em metal resistente, acabamento premium, ótimo para marcas que buscam um brinde mais robusto.",
        src: "/images/catalogo/07-chaveiros/chaveiro-metal-sortido.png",
        alt: "Chaveiros em metal sortidos",
      },
    ],
  },
  {
    id: "canetas",
    title: "Canetas",
    description:
      "Diversas linhas e acabamentos, o brinde corporativo mais clássico e versátil.",
    products: [
      {
        id: "canetas-linha-01",
        name: "Linha de Canetas Clássica",
        shortDescription:
          "Canetas em diversas cores e acabamentos foscos ou metalizados, o brinde corporativo mais versátil que existe.",
        src: "/images/catalogo/08-canetas/canetas-linha-01.png",
        alt: "Linha de canetas 01",
      },
      {
        id: "canetas-linha-02",
        name: "Linha de Canetas Executiva",
        shortDescription:
          "Canetas com clipe metálico e corpo colorido, acabamento mais sofisticado para brindes institucionais.",
        src: "/images/catalogo/08-canetas/canetas-linha-02.png",
        alt: "Linha de canetas 02",
        featured: true,
      },
      {
        id: "canetas-linha-03",
        name: "Linha de Canetas Touch",
        shortDescription:
          "Canetas com ponteira touch para telas sensíveis ao toque, praticidade extra no dia a dia do cliente.",
        src: "/images/catalogo/08-canetas/canetas-linha-03.png",
        alt: "Linha de canetas 03",
      },
    ],
  },
  {
    id: "uniformes-industriais",
    title: "Uniformes Industriais",
    description:
      "Macacões, jalecos, calças e bermudas para equipes operacionais, com identidade visual da empresa.",
    products: [
      {
        id: "macacao-azul",
        name: "Macacão Industrial",
        shortDescription:
          "Macacão profissional em tecido resistente, disponível em cores diversas, para equipes operacionais.",
        src: "/images/catalogo/09-uniformes-industriais/macacao-azul.png",
        alt: "Macacão industrial azul",
        featured: true,
      },
      {
        id: "jaleco-social-camisa",
        name: "Jaleco e Camisa Social",
        shortDescription:
          "Jaleco e camisas sociais para equipes técnicas e administrativas, com bordado ou silk da marca da empresa.",
        src: "/images/catalogo/09-uniformes-industriais/jaleco-social-camisa.png",
        alt: "Jaleco social e camisa",
      },
      {
        id: "bermuda-uniforme",
        name: "Bermuda de Uniforme",
        shortDescription:
          "Bermuda resistente para uso operacional, compõe o uniforme completo junto com camisas e jalecos.",
        src: "/images/catalogo/09-uniformes-industriais/bermuda-uniforme.png",
        alt: "Bermuda uniforme",
      },
    ],
  },
  {
    id: "vestuario-corporativo",
    title: "Vestuário Corporativo",
    description:
      "Jaquetas, moletons, camisas sociais e polos para uniformizar sua equipe com elegância.",
    products: [
      {
        id: "jaqueta-corta-vento",
        name: "Jaqueta Corta-Vento",
        shortDescription:
          "Jaqueta corta-vento personalizada, ideal para equipes externas e brindes de fim de ano.",
        src: "/images/catalogo/10-jaquetas-moletons-camisas/jaqueta-corta-vento.png",
        alt: "Jaqueta corta-vento personalizada",
      },
      {
        id: "camisa-social",
        name: "Camisa Social Corporativa",
        shortDescription:
          "Camisa social personalizada com bordado, para uniformizar equipes comerciais e administrativas com elegância.",
        src: "/images/catalogo/10-jaquetas-moletons-camisas/camisa-social.png",
        alt: "Camisa social personalizada",
      },
      {
        id: "polo-preta-detalhe",
        name: "Camisa Polo Corporativa",
        shortDescription:
          "Polo com detalhes de acabamento premium, uma das peças mais pedidas para uniformizar equipes.",
        src: "/images/catalogo/10-jaquetas-moletons-camisas/polo-preta-detalhe.png",
        alt: "Polo preta com detalhe",
      },
    ],
  },
  {
    id: "camisetas",
    title: "Camisetas",
    description:
      "Camisetas esportivas e básicas personalizadas para eventos, campanhas e ações promocionais.",
    products: [
      {
        id: "camiseta-esportiva-cinza",
        name: "Camiseta Esportiva",
        shortDescription:
          "Camiseta em tecido tecnológico, respirável, ideal para eventos esportivos e ações de equipe.",
        src: "/images/catalogo/11-camisetas/camiseta-esportiva-cinza.png",
        alt: "Camiseta esportiva cinza",
      },
      {
        id: "camiseta-laranja-esportiva",
        name: "Camiseta Esportiva Colorida",
        shortDescription:
          "Mesma linha esportiva em cores vibrantes, ótima para campanhas e ações promocionais de marca.",
        src: "/images/catalogo/11-camisetas/camiseta-laranja-esportiva.png",
        alt: "Camiseta esportiva laranja",
      },
      {
        id: "camiseta-basica",
        name: "Camiseta Básica Personalizada",
        shortDescription:
          "Camiseta básica de algodão, o modelo mais versátil para brindes em grande volume.",
        src: "/images/catalogo/11-camisetas/camiseta-basica.png",
        alt: "Camiseta básica personalizada",
      },
    ],
  },
  {
    id: "acessorios",
    title: "Chapéus, Bonés e Acessórios",
    description:
      "Bonés, chapéus, mochilas, bolsas térmicas e guarda-chuvas para completar o kit de brindes da sua empresa.",
    products: [
      {
        id: "bone-e-chapeu",
        name: "Bonés e Chapéus",
        shortDescription:
          "Bonés e chapéus personalizados com bordado ou silk, alta visibilidade da marca em uso externo.",
        src: "/images/catalogo/12-chapeus-bones/bone-e-chapeu.png",
        alt: "Boné e chapéu personalizados",
      },
      {
        id: "mochila-bolsa-termica",
        name: "Mochilas e Bolsas Térmicas",
        shortDescription:
          "Mochilas para notebook e bolsas térmicas personalizadas, brindes de alto valor percebido pelo cliente.",
        src: "/images/catalogo/13-mochilas-bolsas-termicas/mochila-bolsa-termica.png",
        alt: "Mochila e bolsa térmica",
        featured: true,
      },
      {
        id: "guarda-chuva-guarda-sol",
        name: "Guarda-Chuva e Guarda-Sol",
        shortDescription:
          "Guarda-chuvas e guarda-sóis personalizados, ótimos para ações sazonais e presença de marca ao ar livre.",
        src: "/images/catalogo/14-guarda-chuvas/guarda-chuva-guarda-sol.png",
        alt: "Guarda-chuva e guarda-sol",
      },
    ],
  },
];

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = catalogCategories.flatMap((category) =>
    category.products.filter((product) => product.featured)
  );

  return limit ? featured.slice(0, limit) : featured;
}

export const CATALOG_PAGE_COUNT = 23;

export function getCatalogPageSrc(page: number): string {
  return `/images/catalogo-paginas/pagina-${String(page).padStart(2, "0")}.jpg`;
}
