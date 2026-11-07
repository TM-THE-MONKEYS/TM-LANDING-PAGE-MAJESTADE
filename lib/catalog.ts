/**
 * ─── SISTEMA DE REFERÊNCIA DE PRODUTOS ───────────────────────────────────────
 *
 * Cada produto possui duas referências:
 *   • ref  — número inteiro sequencial e único (referência numérica)
 *   • name — nome do produto (referência nominal)
 *
 * ╔══ REGRAS AO ADICIONAR UM NOVO PRODUTO ═══════════════════════════════════╗
 * ║  1. Consulte NEXT_PRODUCT_REF no final deste arquivo.                    ║
 * ║  2. Use esse valor como `ref` do novo produto.                           ║
 * ║  3. Incremente NEXT_PRODUCT_REF em +1 após adicionar.                   ║
 * ║  4. Nunca reutilize um ref de produto removido — anote em             ║
 * ║     RETIRED_PRODUCT_REFS e siga com NEXT_PRODUCT_REF.                 ║
 * ║  5. refs devem ser sempre inteiros positivos e únicos dentro do arquivo. ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * Formato de exibição: use formatRef(product.ref) → "001", "038", etc.
 *
 * Fotos do mesmo produto:
 *   src + alt → foto principal (cards, carrossel e primeira imagem do popup)
 *   photos    → fotos adicionais, na ordem em que aparecem no popup
 *   Sem `photos`, ou com a lista vazia, o popup mostra só a foto principal.
 *
 *   photos: [
 *     { src: "/images/oficiais/produto-lado.jpg", alt: "Vista lateral do produto" },
 *     { src: "/images/oficiais/produto-tampa.jpg", alt: "Detalhe da tampa" },
 *   ],
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Tipos ─────────────────────────────────────────────────────────────────────

export type ProductPhoto = {
  src: string;
  alt: string;
};

export type Product = {
  /** Referência numérica única e permanente do produto. */
  ref: number;
  /** Slug único em kebab-case, usado em URLs e como chave interna. */
  id: string;
  /** Referência nominal — nome comercial exibido ao cliente. */
  name: string;
  shortDescription: string;
  /** Foto principal. É a que aparece nos cards e a primeira do popup. */
  src: string;
  alt: string;
  /**
   * Fotos adicionais do mesmo produto.
   * Omitir quando houver apenas a foto principal.
   */
  photos?: ProductPhoto[];
  featured?: boolean;
};

export type CatalogCategory = {
  id: string;
  title: string;
  description: string;
  products: Product[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Formata o ref numérico para exibição: 1 → "001", 38 → "038" */
export function formatRef(ref: number): string {
  return String(ref).padStart(3, "0");
}

/** Foto principal seguida das extras, sem repetir o mesmo arquivo. */
export function getProductPhotos(product: Product): ProductPhoto[] {
  const extras = (product.photos ?? []).filter((photo) => photo.src !== product.src);
  return [{ src: product.src, alt: product.alt }, ...extras];
}

// ── Catálogo ──────────────────────────────────────────────────────────────────

export const catalogCategories: CatalogCategory[] = [
  // ── 01. Squeeze e Garrafas ── refs 84–97 (1–8 aposentados) ──────────────────
  {
    id: "squeeze-garrafas",
    title: "Squeeze e Garrafas",
    description:
      "Garrafas térmicas, squeezes, copos e coqueteleiras para o dia a dia ou brinde institucional.",
    products: [
      {
        ref: 84,
        id: "garrafa-termica-formato-coca",
        name: "Garrafa Térmica Formato Coca",
        shortDescription:
          "Garrafa térmica em inox com silhueta de garrafa de refrigerante e tampa rosqueável.",
        src: "/images/oficiais/garrafa-termica-formato-coca-frente.jpg",
        alt: "Garrafas térmicas formato coca em preto e inox",
      },
      {
        ref: 85,
        id: "squeeze-inox-alca-tampa",
        name: "Squeeze Inox com Alça na Tampa",
        shortDescription:
          "Squeeze em inox com ombros curvos e tampa preta com alça.",
        src: "/images/oficiais/squeeze-inox-alca-tampa-frente.jpg",
        alt: "Squeezes de inox com alça na tampa, em várias cores",
        featured: true,
      },
      {
        ref: 86,
        id: "squeeze-termico-copo",
        name: "Squeeze Térmico com Copo",
        shortDescription:
          "Squeeze térmico com copo na tampa e alça no copo, em várias cores.",
        src: "/images/oficiais/squeeze-termico-copo-frente.jpg",
        alt: "Squeezes térmicos com copo na tampa em várias cores",
      },
      {
        ref: 87,
        id: "garrafa-termica-alca",
        name: "Garrafa Térmica com Alça",
        shortDescription:
          "Garrafa térmica alta em inox, com alça lateral e copo na tampa.",
        src: "/images/oficiais/garrafa-termica-alca-frente.jpg",
        alt: "Garrafa térmica de inox com alça lateral",
      },
      {
        ref: 88,
        id: "coqueteleira-compartimentos",
        name: "Coqueteleira com Compartimentos",
        shortDescription:
          "Coqueteleira com tampa de bico, grade misturadora e compartimento na base.",
        src: "/images/oficiais/coqueteleira-compartimentos-frente.jpg",
        alt: "Coqueteleira com compartimentos, montada e desmontada",
      },
      {
        ref: 89,
        id: "garrafa-termica-slim",
        name: "Garrafa Térmica Slim",
        shortDescription:
          "Garrafa térmica slim em inox, com copo na tampa e sem alça.",
        src: "/images/oficiais/garrafa-termica-slim-frente.jpg",
        alt: "Garrafa térmica slim de inox",
      },
      {
        ref: 90,
        id: "garrafa-termica-infusor",
        name: "Garrafa Térmica com Infusor",
        shortDescription:
          "Garrafa térmica com faixa de temperatura na tampa e infusor interno, em várias cores.",
        src: "/images/oficiais/garrafa-termica-infusor-frente.jpg",
        alt: "Garrafas térmicas coloridas com infusor e display",
      },
      {
        ref: 91,
        id: "copo-twister",
        name: "Copo Twister",
        shortDescription:
          "Copo plástico com textura twister, tampa e canudo, em várias cores.",
        src: "/images/oficiais/copo-twister-frente.jpg",
        alt: "Copos twister com tampa e canudo em várias cores",
      },
      {
        ref: 92,
        id: "coqueteleira-plastica",
        name: "Coqueteleira Plástica",
        shortDescription:
          "Coqueteleira plástica com tampa e coador, em várias cores.",
        src: "/images/oficiais/coqueteleira-plastica-frente.jpg",
        alt: "Coqueteleiras plásticas em várias cores",
      },
      {
        ref: 93,
        id: "copo-tampa-canudo",
        name: "Copo com Tampa e Canudo",
        shortDescription:
          "Copo plástico transparente com tampa colorida e canudo.",
        src: "/images/oficiais/copo-tampa-canudo-frente.jpg",
        alt: "Copos transparentes com tampa colorida e canudo",
      },
      {
        ref: 94,
        id: "copo-parede-dupla-canudo",
        name: "Copo Parede Dupla com Canudo",
        shortDescription:
          "Copo de parede dupla transparente com tampa e canudo interno, em várias cores.",
        src: "/images/oficiais/copo-parede-dupla-canudo-frente.jpg",
        alt: "Copos de parede dupla com tampa e canudo",
      },
      {
        ref: 95,
        id: "coqueteleira-shake",
        name: "Coqueteleira Shake",
        shortDescription:
          "Coqueteleira plástica com escala, tampa de bico e mola misturadora, em várias cores de tampa.",
        src: "/images/oficiais/coqueteleira-shake-frente.jpg",
        alt: "Coqueteleiras shake com tampas coloridas",
      },
      {
        ref: 96,
        id: "garrafa-termica-corda",
        name: "Garrafa Térmica com Corda",
        shortDescription:
          "Garrafa térmica formato coca com tampa de inox e alça de corda.",
        src: "/images/oficiais/garrafa-termica-corda-frente.jpg",
        alt: "Garrafa térmica preta com corda na tampa",
      },
      {
        ref: 97,
        id: "squeeze-acrilico",
        name: "Squeeze Acrílico",
        shortDescription:
          "Squeeze transparente em acrílico, com tampa e base em aço inox.",
        src: "/images/oficiais/squeeze-acrilico-frente.jpg",
        alt: "Squeeze acrílico azul com tampa e base de inox",
      },
    ],
  },

  // ── 02. Canecas e Copos Térmicos ── refs 98–102 (9–11, 14, 39–43 aposentados)
  {
    id: "canecas-termicas",
    title: "Canecas e Copos Térmicos",
    description:
      "Canecas e copos térmicos com alça ou tampa — a linha mais pedida para brindes corporativos.",
    products: [
      {
        ref: 98,
        id: "caneca-termica-alca-base",
        name: "Caneca Térmica com Alça e Base",
        shortDescription:
          "Caneca térmica em inox com alça, tampa e base pretas.",
        src: "/images/oficiais/caneca-termica-alca-base-frente.jpg",
        alt: "Caneca térmica de inox com alça, tampa e base pretas",
        featured: true,
      },
      {
        ref: 99,
        id: "caneca-termica-pint",
        name: "Caneca Térmica Pint",
        shortDescription:
          "Caneca térmica cônica com borda de inox, disponível em várias cores.",
        src: "/images/oficiais/caneca-termica-pint-frente.jpg",
        alt: "Canecas térmicas pint em várias cores",
      },
      {
        ref: 100,
        id: "caneca-termica-tampa-loop",
        name: "Caneca Térmica com Tampa",
        shortDescription:
          "Caneca térmica cônica com tampa preta de abertura deslizante e alça na tampa.",
        src: "/images/oficiais/caneca-termica-tampa-loop-frente.jpg",
        alt: "Caneca térmica azul com tampa preta",
      },
      {
        ref: 101,
        id: "caneca-termica-alta-alca",
        name: "Caneca Térmica Alta com Alça",
        shortDescription:
          "Caneca térmica alta em inox com alça preta, anéis na base e tampa de aço.",
        src: "/images/oficiais/caneca-termica-alta-alca-frente.jpg",
        alt: "Caneca térmica alta de inox com alça preta",
      },
      {
        ref: 102,
        id: "caneca-termica-alca-cores",
        name: "Caneca Térmica com Alça",
        shortDescription:
          "Caneca térmica com alça e tampa pretas, disponível em várias cores.",
        src: "/images/oficiais/caneca-termica-alca-cores-frente.jpg",
        alt: "Canecas térmicas com alça preta em várias cores",
      },
    ],
  },

  // ── 03. Cuia e Bomba ── refs 103–105 (15–17 aposentados) ────────────────────
  {
    id: "cuia-e-bomba",
    title: "Cuia e Bomba",
    description:
      "Cuias de madeira com pé de massa, bocal de metal ou pintura — a tradição gaúcha com a marca da sua empresa.",
    products: [
      {
        ref: 103,
        id: "cuia-pe-de-massa",
        name: "Cuia Pé de Massa",
        shortDescription:
          "Cuia com acabamento natural e pé de massa, com área para a marca na cuia e no pé.",
        src: "/images/oficiais/cuia-pe-de-massa-frente.jpg",
        alt: "Cuia com pé de massa, vista de frente",
        featured: true,
      },
      {
        ref: 104,
        id: "cuia-bocal-pe-metal",
        name: "Cuia com Bocal e Pé de Metal",
        shortDescription:
          "Cuia com acabamento natural, bocal e pé de metal, com área para a marca na frente.",
        src: "/images/oficiais/cuia-bocal-pe-metal-frente.jpg",
        alt: "Cuia natural com bocal e pé de metal",
      },
      {
        ref: 105,
        id: "cuia-preta",
        name: "Cuia Preta",
        shortDescription:
          "Cuia de madeira com pintura preta e área para gravação na frente.",
        src: "/images/oficiais/cuia-preta-frente.jpg",
        alt: "Cuia preta com gravação na frente",
      },
    ],
  },

  // ── 05. Kit Queijo e Vinho ── refs 20, 68–72, 112, 113, 115 ────────────────
  {
    id: "kit-queijo-e-vinho",
    title: "Kit Queijo e Vinho",
    description:
      "Kits de vinho e queijo, saca-rolhas e abridor elétrico — presentes institucionais para datas comemorativas.",
    products: [
      {
        ref: 20,
        id: "kit-vinho-garrafa-4-pecas",
        name: "Kit Vinho Garrafa 4 Peças",
        shortDescription:
          "Estojo em formato de garrafa com tampa, espuma e 4 acessórios de vinho.",
        src: "/images/oficiais/kit-vinho-garrafa-4-pecas-frente.jpg",
        alt: "Kit vinho em estojo de garrafa aberto com 4 peças",
      },
      {
        ref: 68,
        id: "kit-vinho-2-pecas",
        name: "Kit Vinho 2 Peças",
        shortDescription:
          "Caixa de madeira com tampa deslizante, espuma e 2 acessórios de vinho.",
        src: "/images/oficiais/kit-vinho-2-pecas-frente.jpg",
        alt: "Kit vinho 2 peças em caixa de madeira aberta",
      },
      {
        ref: 69,
        id: "kit-vinho-5-pecas",
        name: "Kit Vinho 5 Peças",
        shortDescription:
          "Caixa com espuma e 5 acessórios de vinho, incluindo saca-rolhas e termômetro.",
        src: "/images/oficiais/kit-vinho-5-pecas-frente.jpg",
        alt: "Kit vinho 5 peças em caixa aberta",
      },
      {
        ref: 70,
        id: "kit-vinho-suporte-madeira",
        name: "Kit Vinho Suporte de Madeira",
        shortDescription:
          "Bloco de madeira com acessórios de vinho encaixados no suporte.",
        src: "/images/oficiais/kit-vinho-suporte-madeira-frente.jpg",
        alt: "Kit vinho em suporte vertical de madeira",
      },
      {
        ref: 71,
        id: "saca-rolhas",
        name: "Saca-Rolhas",
        shortDescription:
          "Saca-rolhas de aço com alavanca, espiral e lâmina corta-lacre.",
        src: "/images/oficiais/saca-rolhas-frente.jpg",
        alt: "Saca-rolhas de aço aberto, vista de frente",
      },
      {
        ref: 72,
        id: "abridor-eletrico-vinho",
        name: "Abridor Elétrico de Vinho",
        shortDescription:
          "Abridor elétrico de vinho em acabamento metálico, com botão e espiral visível.",
        src: "/images/oficiais/abridor-eletrico-vinho-frente.jpg",
        alt: "Abridores elétricos de vinho em várias cores",
      },
      {
        ref: 112,
        id: "kit-queijo-3-pecas-encaixe",
        name: "Kit Queijo 3 Peças com Encaixe",
        shortDescription:
          "Tábua de madeira com encaixes, garfo e faca com cabos de madeira.",
        src: "/images/oficiais/kit-churrasco-3-pecas-encaixe-frente.jpg",
        alt: "Kit queijo 3 peças em tábua com encaixes",
      },
      {
        ref: 113,
        id: "kit-queijo-4-pecas",
        name: "Kit Queijo 4 Peças",
        shortDescription:
          "Tábua oval de madeira com três utensílios para queijo e cabos combinando.",
        src: "/images/oficiais/kit-queijo-4-pecas-frente.jpg",
        alt: "Kit queijo 4 peças em tábua oval",
      },
      {
        ref: 115,
        id: "kit-queijo-3-pecas",
        name: "Kit Queijo 3 Peças",
        shortDescription:
          "Caixa kraft com tábua redonda e utensílios de queijo com cabos de madeira.",
        src: "/images/oficiais/kit-queijo-3-pecas-frente.jpg",
        alt: "Kit queijo 3 peças em caixa kraft aberta",
      },
    ],
  },

  // ── 05b. Kit Churrasco ── refs 110, 111, 114, 116, 117 ──────────────────────
  {
    id: "kit-churrasco",
    title: "Kit Churrasco",
    description:
      "Kits churrasco e tábuas de corte — presentes para a temporada e o dia a dia.",
    products: [
      {
        ref: 110,
        id: "kit-churrasco-4-pecas",
        name: "Kit Churrasco 4 Peças",
        shortDescription:
          "Tábua de bambu com faca, garfo, chaira e pegador com cabos de madeira.",
        src: "/images/oficiais/kit-churrasco-4-pecas-frente.jpg",
        alt: "Kit churrasco 4 peças sobre tábua de bambu",
      },
      {
        ref: 111,
        id: "kit-churrasco-2-pecas",
        name: "Kit Churrasco 2 Peças",
        shortDescription:
          "Faca e garfo com cabos de madeira, acompanhados de estojo preto.",
        src: "/images/oficiais/kit-churrasco-2-pecas-frente.jpg",
        alt: "Kit churrasco 2 peças com estojo preto",
      },
      {
        ref: 114,
        id: "kit-churrasco-7-pecas",
        name: "Kit Churrasco 7 Peças",
        shortDescription:
          "Conjunto com tábua, facas e garfo em estojo preto com tampa.",
        src: "/images/oficiais/kit-churrasco-caixa-tabua-frente.jpg",
        alt: "Kit churrasco 7 peças com caixa preta e tábua",
      },
      {
        ref: 116,
        id: "kit-churrasco-3-pecas",
        name: "Kit Churrasco 3 Peças com Tábua",
        shortDescription:
          "Faca, garfo e tábua retangular de madeira com canaleta.",
        src: "/images/oficiais/kit-churrasco-3-pecas-frente.jpg",
        alt: "Kit churrasco com faca, garfo e tábua",
      },
      {
        ref: 117,
        id: "tabua-corte-alca",
        name: "Tábua de Corte com Alça",
        shortDescription:
          "Tábua vertical de bambu com alça e base, acompanhada de acessório de madeira.",
        src: "/images/oficiais/tabua-corte-alca-frente.jpg",
        alt: "Tábua de corte com alça e base de bambu",
      },
    ],
  },

  // ── 06. Bolsas Térmicas ── refs 118–119 ─────────────────────────────────────
  {
    id: "bolsas-termicas",
    title: "Bolsas Térmicas",
    description:
      "Bolsas térmicas para personalizar — alça de ombro ou alças de mão, com área para a marca.",
    products: [
      {
        ref: 118,
        id: "bolsa-termica-ombro",
        name: "Bolsa Térmica de Ombro",
        shortDescription:
          "Bolsa térmica preta com alça de ombro ajustável, zíper no topo e bolso frontal.",
        src: "/images/oficiais/bolsa-termica-ombro-frente.jpg",
        alt: "Bolsa térmica preta de ombro, vista de frente",
        photos: [
          {
            src: "/images/oficiais/bolsa-termica-ombro-lado.jpg",
            alt: "Bolsa térmica de ombro em três quartos",
          },
          {
            src: "/images/oficiais/bolsa-termica-ombro-interno.jpg",
            alt: "Bolsa térmica de ombro aberta, interior térmico",
          },
        ],
      },
      {
        ref: 119,
        id: "bolsa-termica-alcas",
        name: "Bolsa Térmica com Alças",
        shortDescription:
          "Bolsa térmica preta com alças de mão, bolso frontal com zíper e área para a marca.",
        src: "/images/oficiais/bolsa-termica-alcas-frente.jpg",
        alt: "Bolsa térmica preta com alças de mão, vista de frente",
      },
    ],
  },

  // ── 07. Guarda-sóis ── refs 120–122 ─────────────────────────────────────────
  {
    id: "guarda-sois",
    title: "Guarda-sóis",
    description:
      "Guarda-sóis personalizados — painéis coloridos, dupla cobertura ou capa colorida para a marca.",
    products: [
      {
        ref: 120,
        id: "guarda-sol-azul-amarelo",
        name: "Guarda-sol Azul e Amarelo",
        shortDescription:
          "Guarda-sol com painéis azul e amarelo, abas laterais e área para a marca.",
        src: "/images/oficiais/guarda-sol-azul-amarelo-frente.jpg",
        alt: "Guarda-sol azul e amarelo aberto, vista de frente",
      },
      {
        ref: 121,
        id: "guarda-sol-duplo",
        name: "Guarda-sol Duplo",
        shortDescription:
          "Guarda-sol de dupla cobertura em painéis azul e branco, com área para a marca.",
        src: "/images/oficiais/guarda-sol-duplo-frente.jpg",
        alt: "Guarda-sol duplo azul e branco visto de cima",
      },
      {
        ref: 122,
        id: "guarda-sol-com-capa",
        name: "Guarda-sol com Capa",
        shortDescription:
          "Guarda-sol azul com borda branca, mastro articulado e capas em várias cores.",
        src: "/images/oficiais/guarda-sol-com-capa-frente.jpg",
        alt: "Guarda-sol azul com capa e capas coloridas ao lado",
      },
    ],
  },

  // ── 08. Chaveiros ── refs 76–83 (21–23 aposentados) ─────────────────────────
  {
    id: "chaveiros",
    title: "Chaveiros",
    description:
      "Chaveiros em metal — mosquetão, abridor, pneu e formatos especiais para personalizar com a marca.",
    products: [
      {
        ref: 76,
        id: "chaveiro-formato-pneu",
        name: "Chaveiro Formato Pneu",
        shortDescription:
          "Chaveiro em formato de pneu com aro colorido e argola, disponível em várias cores.",
        src: "/images/oficiais/chaveiro-formato-pneu-frente.jpg",
        alt: "Chaveiros formato pneu em várias cores de aro",
      },
      {
        ref: 77,
        id: "chaveiro-mosquetao-placa",
        name: "Chaveiro Mosquetão com Placa",
        shortDescription:
          "Mosquetão de metal com placa retangular para a marca e furo para argola.",
        src: "/images/oficiais/chaveiro-mosquetao-placa-frente.jpg",
        alt: "Chaveiro mosquetão de metal com placa frontal",
      },
      {
        ref: 78,
        id: "chaveiro-mosquetao-abridor",
        name: "Chaveiro Mosquetão Abridor",
        shortDescription:
          "Chaveiro de metal com abridor, placa para a marca e mosquetão na base.",
        src: "/images/oficiais/chaveiro-mosquetao-abridor-frente.jpg",
        alt: "Chaveiro mosquetão abridor com placa frontal",
      },
      {
        ref: 79,
        id: "chaveiro-mosquetao-abridor-argola",
        name: "Chaveiro Mosquetão Abridor com Argola",
        shortDescription:
          "Mosquetão de metal com abridor, placa para a marca e argola giratória.",
        src: "/images/oficiais/chaveiro-mosquetao-abridor-argola-frente.jpg",
        alt: "Chaveiro mosquetão abridor com argola giratória",
      },
      {
        ref: 80,
        id: "chaveiro-bomba-combustivel",
        name: "Chaveiro Bomba de Combustível",
        shortDescription:
          "Chaveiro de metal em formato de bico de bomba, com mosquetão e argola.",
        src: "/images/oficiais/chaveiro-bomba-combustivel-frente.jpg",
        alt: "Chaveiro de metal em formato de bomba de combustível",
      },
      {
        ref: 81,
        id: "chaveiro-metal-abridor",
        name: "Chaveiro Metal Abridor",
        shortDescription:
          "Chaveiro abridor de metal com argola, disponível em várias cores.",
        src: "/images/oficiais/chaveiro-metal-abridor-frente.jpg",
        alt: "Chaveiros abridor de metal em várias cores",
      },
      {
        ref: 82,
        id: "chaveiro-bota-abridor",
        name: "Chaveiro Bota Abridor",
        shortDescription:
          "Chaveiro de metal em formato de bota, com mosquetão, abridor e área para a marca.",
        src: "/images/oficiais/chaveiro-bota-abridor-frente.jpg",
        alt: "Chaveiro de metal em formato de bota com abridor",
      },
      {
        ref: 83,
        id: "chaveiro-metal-retangular-abridor",
        name: "Chaveiro Metal Retangular Abridor",
        shortDescription:
          "Chaveiro abridor retangular de metal com placa para a marca e argola.",
        src: "/images/oficiais/chaveiro-metal-retangular-abridor-frente.jpg",
        alt: "Chaveiro abridor retangular de metal com placa",
      },
    ],
  },

  // ── 09. Canetas ── refs 106–109 (24–26 aposentados) ─────────────────────────
  {
    id: "canetas",
    title: "Canetas",
    description:
      "Canetas touch, metal, plásticas e com estojo — o brinde corporativo mais clássico e versátil.",
    products: [
      {
        ref: 106,
        id: "caneta-touch-metal",
        name: "Caneta Touch Metal",
        shortDescription:
          "Caneta metálica com ponteira touch e clipe, disponível em várias cores.",
        src: "/images/oficiais/caneta-touch-metal-frente.jpg",
        alt: "Canetas touch metálicas em várias cores",
        featured: true,
      },
      {
        ref: 107,
        id: "caneta-metal-estojo",
        name: "Caneta Metal com Estojo",
        shortDescription:
          "Caneta metálica preta com detalhes dourados e estojo para presentear.",
        src: "/images/oficiais/caneta-metal-estojo-frente.jpg",
        alt: "Canetas metálicas pretas com estojo",
      },
      {
        ref: 108,
        id: "caneta-metal-grip",
        name: "Caneta Metal com Grip",
        shortDescription:
          "Caneta metálica com grip emborrachado, clipe e área para a marca no corpo.",
        src: "/images/oficiais/caneta-metal-grip-frente.jpg",
        alt: "Canetas metálicas com grip emborrachado",
      },
      {
        ref: 109,
        id: "caneta-plastica-colorida",
        name: "Caneta Plástica Colorida",
        shortDescription:
          "Caneta plástica com corpo branco, grip e clipe coloridos, em várias cores.",
        src: "/images/oficiais/caneta-plastica-colorida-frente.jpg",
        alt: "Canetas plásticas com grip colorido",
      },
    ],
  },

  // ── 10. Uniformes Industriais ── inclui vestuário + camisetas (antes categorias separadas)
  // refs 62–66, 44–51, 67, 56–59, 61 (27–35, 52–55, 60, 65 aposentados)
  {
    id: "uniformes-industriais",
    title: "Uniformes Industriais",
    description:
      "Macacões, camisetas, polos, jaquetas, camisas e jalecos para uniformizar a equipe — operacional e corporativo.",
    products: [
      {
        ref: 62,
        id: "macacao-industrial",
        name: "Macacão Industrial",
        shortDescription:
          "Macacão com bolsos, cós elástico e espaço para a marca no peito e nas costas.",
        src: "/images/oficiais/macacao-industrial-frente-atual.jpg",
        alt: "Macacão industrial cinza, vista de frente",
        featured: true,
        photos: [
          {
            src: "/images/oficiais/macacao-industrial-costas.jpg",
            alt: "Costas do macacão industrial",
          },
          {
            src: "/images/oficiais/macacao-industrial-bolso.jpg",
            alt: "Bolso do peito do macacão com a marca",
          },
          {
            src: "/images/oficiais/macacao-industrial-cintura.jpg",
            alt: "Cós elástico e bolso traseiro do macacão",
          },
        ],
      },
      {
        ref: 63,
        id: "camiseta-recorte",
        name: "Camiseta com Recorte",
        shortDescription:
          "Camiseta de manga curta com gola e mangas em recorte contrastante, com a marca no peito e nas costas.",
        src: "/images/oficiais/camiseta-recorte-frente.jpg",
        alt: "Camiseta laranja com mangas cinza, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-recorte-costas.jpg",
            alt: "Costas da camiseta com recorte e estampa",
          },
          {
            src: "/images/oficiais/camiseta-recorte-peito.jpg",
            alt: "Marca no peito da camiseta com recorte",
          },
        ],
      },
      {
        ref: 64,
        id: "polo-operacional",
        name: "Polo Operacional",
        shortDescription:
          "Polo de manga curta com a marca no peito, para o uniforme da equipe operacional.",
        src: "/images/oficiais/polo-operacional-frente.jpg",
        alt: "Polo preta com calça cargo, vista de frente",
      },
      {
        ref: 66,
        id: "blusa-manga-longa",
        name: "Blusa Manga Longa",
        shortDescription:
          "Blusa de manga longa com punho e barra em ribana, com a marca no peito.",
        src: "/images/oficiais/blusa-manga-longa-frente.jpg",
        alt: "Blusa preta de manga longa, vista de frente",
        photos: [
          {
            src: "/images/oficiais/blusa-manga-longa-punho.jpg",
            alt: "Punho e marca no peito da blusa de manga longa",
          },
          {
            src: "/images/oficiais/blusa-manga-longa-barra.jpg",
            alt: "Barra e punho da blusa de manga longa",
          },
        ],
      },
      {
        ref: 44,
        id: "jaqueta-forro-personalizada",
        name: "Jaqueta com Forro Personalizada",
        shortDescription:
          "Jaqueta matelassada com forro, bolso interno e bordado da marca na frente e nas costas.",
        src: "/images/oficiais/jaqueta-forro-frente-atual.jpg",
        alt: "Jaqueta personalizada preta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaqueta-forro-lado.jpg",
            alt: "Jaqueta personalizada de lado",
          },
          {
            src: "/images/oficiais/jaqueta-forro-costas.jpg",
            alt: "Costas da jaqueta com a marca bordada",
          },
          {
            src: "/images/oficiais/jaqueta-forro-interno.jpg",
            alt: "Forro interno da jaqueta",
          },
          {
            src: "/images/oficiais/jaqueta-forro-bordado.jpg",
            alt: "Detalhe do bordado no peito",
          },
          {
            src: "/images/oficiais/jaqueta-forro-bolso.jpg",
            alt: "Bolso interno da jaqueta",
          },
        ],
      },
      {
        ref: 45,
        id: "camisa-social-branca",
        name: "Camisa Social Branca",
        shortDescription:
          "Camisa social branca com bordado no peito, para equipes comerciais e administrativas.",
        src: "/images/oficiais/camisa-social-branca-frente-atual.jpg",
        alt: "Camisa social branca personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-branca-peito-atual.jpg",
            alt: "Bordado no peito da camisa social branca",
          },
          {
            src: "/images/oficiais/camisa-social-branca-punho-atual.jpg",
            alt: "Punho da camisa social branca",
          },
        ],
      },
      {
        ref: 46,
        id: "camisa-social-preta",
        name: "Camisa Social Preta",
        shortDescription:
          "Camisa social preta com bordado no peito, para uniformizar a equipe com um visual sóbrio.",
        src: "/images/oficiais/camisa-social-preta-frente-atual.jpg",
        alt: "Camisa social preta personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-preta-costas-atual.jpg",
            alt: "Costas da camisa social preta",
          },
          {
            src: "/images/oficiais/camisa-social-preta-detalhe-atual.jpg",
            alt: "Bordado e punho da camisa social preta",
          },
        ],
      },
      {
        ref: 47,
        id: "camisa-social-cinza",
        name: "Camisa Social Cinza",
        shortDescription:
          "Camisa social cinza de manga longa, com punho ajustável, para o uniforme do dia a dia.",
        src: "/images/oficiais/camisa-social-cinza-frente-atual.jpg",
        alt: "Camisa social cinza, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-cinza-costas-atual.jpg",
            alt: "Costas da camisa social cinza",
          },
          {
            src: "/images/oficiais/camisa-social-cinza-punho-atual.jpg",
            alt: "Punho da camisa social cinza",
          },
          {
            src: "/images/oficiais/camisa-social-cinza-peito-atual.jpg",
            alt: "Botões da camisa social cinza",
          },
        ],
      },
      {
        ref: 48,
        id: "jaleco-manga-curta",
        name: "Jaleco Manga Curta",
        shortDescription:
          "Jaleco de manga curta com bolsos frontais e a marca no peito e nas costas.",
        src: "/images/oficiais/jaleco-manga-curta-frente-atual.jpg",
        alt: "Jaleco preto de manga curta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaleco-manga-curta-costas-atual.jpg",
            alt: "Costas do jaleco de manga curta",
          },
          {
            src: "/images/oficiais/jaleco-manga-curta-bolso-atual.jpg",
            alt: "Bolsos do jaleco de manga curta",
          },
        ],
      },
      {
        ref: 49,
        id: "jaleco-ziper",
        name: "Jaleco com Zíper",
        shortDescription:
          "Jaleco de manga longa com zíper, bolsos e espaço para bordado no peito, nas costas e na manga.",
        src: "/images/oficiais/jaleco-ziper-frente.jpg",
        alt: "Jaleco cinza com zíper, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaleco-ziper-lado.jpg",
            alt: "Jaleco cinza com zíper, vista de lado",
          },
          {
            src: "/images/oficiais/jaleco-ziper-costas.jpg",
            alt: "Costas do jaleco com bordado",
          },
          {
            src: "/images/oficiais/jaleco-ziper-manga.jpg",
            alt: "Bordado na manga do jaleco",
          },
          {
            src: "/images/oficiais/jaleco-ziper-detalhe.jpg",
            alt: "Detalhe do zíper do jaleco",
          },
        ],
      },
      {
        ref: 50,
        id: "colete-personalizado",
        name: "Colete Personalizado",
        shortDescription:
          "Colete matelassado com gola, bolso com zíper e área de bordado na frente e nas costas.",
        src: "/images/oficiais/colete-frente.jpg",
        alt: "Colete matelassado preto, vista de frente",
        photos: [
          {
            src: "/images/oficiais/colete-lado.jpg",
            alt: "Colete matelassado de lado",
          },
          {
            src: "/images/oficiais/colete-costas.jpg",
            alt: "Costas do colete matelassado",
          },
          {
            src: "/images/oficiais/colete-peito.jpg",
            alt: "Bordado no peito e ombro do colete",
          },
          {
            src: "/images/oficiais/colete-bolso.jpg",
            alt: "Bolso com zíper do colete",
          },
        ],
      },
      {
        ref: 51,
        id: "moletom-capuz",
        name: "Moletom com Capuz",
        shortDescription:
          "Moletom com capuz e bolso canguru, com a marca no peito.",
        src: "/images/oficiais/moletom-frente.jpg",
        alt: "Moletom cinza com capuz, vista de frente",
        photos: [
          {
            src: "/images/oficiais/moletom-bolso.jpg",
            alt: "Bolso canguru do moletom",
          },
          {
            src: "/images/oficiais/moletom-barra.jpg",
            alt: "Barra e bolso do moletom",
          },
        ],
      },
      {
        ref: 67,
        id: "jaqueta-matelassada",
        name: "Jaqueta Matelassada",
        shortDescription:
          "Jaqueta matelassada com zíper e bordado da marca no peito e nas costas.",
        src: "/images/oficiais/jaqueta-matelassada-peito.jpg",
        alt: "Jaqueta matelassada preta com bordado no peito",
        photos: [
          {
            src: "/images/oficiais/jaqueta-matelassada-costas.jpg",
            alt: "Costas da jaqueta matelassada com estampa",
          },
          {
            src: "/images/oficiais/jaqueta-matelassada-bolso.jpg",
            alt: "Bolso lateral da jaqueta matelassada",
          },
          {
            src: "/images/oficiais/jaqueta-matelassada-gola.jpg",
            alt: "Gola e zíper da jaqueta matelassada",
          },
        ],
      },
      {
        ref: 56,
        id: "camiseta-preta",
        name: "Camiseta Preta",
        shortDescription:
          "Camiseta de manga curta com a marca no peito e estampa nas costas.",
        src: "/images/oficiais/camiseta-preta-frente.jpg",
        alt: "Camiseta preta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-preta-costas.jpg",
            alt: "Costas da camiseta preta com estampa",
          },
        ],
      },
      {
        ref: 57,
        id: "camiseta-verde",
        name: "Camiseta Verde",
        shortDescription:
          "Camiseta de manga curta com a marca no peito.",
        src: "/images/oficiais/camiseta-verde-frente.jpg",
        alt: "Camiseta verde, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-verde-peito.jpg",
            alt: "Marca no peito da camiseta verde",
          },
        ],
      },
      {
        ref: 58,
        id: "camiseta-gola-v",
        name: "Camiseta Gola V",
        shortDescription:
          "Camiseta de gola V com a marca no peito e estampa nas costas.",
        src: "/images/oficiais/camiseta-gola-v-frente.jpg",
        alt: "Camiseta preta de gola V, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-gola-v-costas.jpg",
            alt: "Costas da camiseta de gola V com estampa",
          },
        ],
      },
      {
        ref: 59,
        id: "camiseta-manga-longa",
        name: "Camiseta Manga Longa",
        shortDescription:
          "Camiseta de manga longa com a marca no peito.",
        src: "/images/oficiais/camiseta-manga-longa-frente.jpg",
        alt: "Camiseta vermelha de manga longa, vista de frente",
      },
      {
        ref: 61,
        id: "camiseta-polo",
        name: "Camisa Polo",
        shortDescription:
          "Polo de manga curta com a marca no peito e nas costas.",
        src: "/images/oficiais/camiseta-polo-frente.jpg",
        alt: "Camisa polo preta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-polo-costas.jpg",
            alt: "Costas da camisa polo com estampa",
          },
          {
            src: "/images/oficiais/camiseta-polo-gola.jpg",
            alt: "Gola e vista da camisa polo",
          },
        ],
      },
    ],
  },

  // ── 11. Acessórios ── refs 73–75 (36–38 aposentados) ────────────────────────
  {
    id: "acessorios",
    title: "Agendas, Cadernos e Blocos",
    description:
      "Agendas, cadernos e blocos de anotações para completar o kit de brindes.",
    products: [
      {
        ref: 73,
        id: "agenda-diaria",
        name: "Agenda Diária",
        shortDescription:
          "Agenda diária com capa emborrachada, costura na borda e marcador de página.",
        src: "/images/oficiais/agenda-diaria-frente.jpg",
        alt: "Agenda diária preta com costura na capa",
      },
      {
        ref: 74,
        id: "caderno-espiral",
        name: "Caderno Espiral",
        shortDescription:
          "Caderno com capa bicolor e espiral metálica na lateral.",
        src: "/images/oficiais/caderno-espiral-frente.jpg",
        alt: "Caderno espiral preto com faixa lateral",
      },
      {
        ref: 75,
        id: "bloco-anotacoes-eco",
        name: "Bloco de Anotações Ecológico com Caneta",
        shortDescription:
          "Bloco ecológico com espiral, autoadesivos coloridos e caneta no elástico.",
        src: "/images/oficiais/bloco-anotacoes-eco-frente.jpg",
        alt: "Bloco ecológico aberto com autoadesivos e caneta",
      },
    ],
  },
];

// ── Utilitários ───────────────────────────────────────────────────────────────

/** Busca produtos pelo `id`, na ordem pedida. Ids inexistentes são ignorados. */
export function getProductsByIds(ids: string[]): Product[] {
  const all = catalogCategories.flatMap((category) => category.products);
  return ids
    .map((id) => all.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = catalogCategories.flatMap((category) =>
    category.products.filter((product) => product.featured),
  );
  return limit ? featured.slice(0, limit) : featured;
}

// ── Controle de referências ───────────────────────────────────────────────────

/**
 * Próximo ref disponível.
 * Ao adicionar um novo produto, use este número e incremente em +1.
 *
 * Exemplo:
 *   { ref: 39, id: "novo-produto", name: "Novo Produto", ... }
 *   Depois: NEXT_PRODUCT_REF = 40
 */
export const NEXT_PRODUCT_REF = 123;

/**
 * Refs de produtos removidos do catálogo. Permanentes: não reutilizar.
 * 11 — Caneca Térmica com Tampa 700ml
 * 30 — Jaqueta Corta-Vento (ilustração)
 * 31 — Camisa Social Corporativa (ilustração)
 * 32 — Camisa Polo Corporativa (ilustração)
 * 33 — Camiseta Esportiva (ilustração)
 * 34 — Camiseta Esportiva Colorida (ilustração)
 * 35 — Camiseta Básica Personalizada (ilustração)
 * 27 — Macacão Industrial (ilustração)
 * 28 — Jaleco e Camisa Social (ilustração)
 * 29 — Bermuda de Uniforme (ilustração)
 * 65 — Calça Cargo
 * 52 — Jaqueta Corta-Vento Verde
 * 53 — Jaqueta Corta-Vento
 * 54 — Jaqueta Matelassada
 * 55 — Camiseta Azul
 * 60 — Camiseta com Viés
 * 13 — Caneca Inox com Alça Acrílica 400ml
 * 42 — Caneca Térmica com Alça Acrílica
 * 18 — Kit Vinho Caixa de Madeira
 * 19 — Kit Vinho Caixa Xadrez
 * 12 — Caneca Inox Parede Dupla 250ml
 * 21 — Chaveiro em Couro
 * 22 — Chaveiro em Couro — Modelo Individual
 * 23 — Chaveiro em Metal
 * 1 — Squeeze Acrílico
 * 2 — Squeeze Inox com Alça
 * 3 — Garrafa Térmica com Alça (foto antiga)
 * 4 — Garrafa Térmica Slim (foto antiga)
 * 5 — Squeeze Inox
 * 6 — Garrafa Térmica com Infusor (foto antiga)
 * 7 — Squeeze com Tampa
 * 8 — Squeeze com Manga de Silicone
 * 9 — Caneca Térmica com Abridor 500ml
 * 10 — Caneca Térmica com Canudo 1200ml
 * 39 — Caneca Térmica Inox com Tampa
 * 40 — Caneca Térmica com Alça (foto antiga)
 * 41 — Caneca Térmica Alta
 * 43 — Caneca Térmica em Cores
 * 14 — Copo Térmico com Abridor 500ml
 * 36 — Bonés e Chapéus
 * 37 — Mochilas e Bolsas Térmicas
 * 38 — Guarda-Chuva e Guarda-Sol
 * 15 — Cuia Pé de Massa com Medalhão
 * 16 — Cuia com Pedestal
 * 17 — Bomba Inox com Rosca
 * 24 — Linha de Canetas Clássica
 * 25 — Linha de Canetas Executiva
 * 26 — Linha de Canetas Touch
 */
export const RETIRED_PRODUCT_REFS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
  52, 53, 54, 55, 60, 65,
] as const;

/**
 * Valida integridade dos refs em desenvolvimento.
 * Detecta refs duplicados, reuso de ref aposentado e divergência de NEXT_PRODUCT_REF.
 * Chame em layout.tsx ou _app.tsx apenas em NODE_ENV=development.
 */
export function validateProductRefs(): void {
  if (process.env.NODE_ENV !== "development") return;

  const all = catalogCategories.flatMap((c) => c.products);
  const refs = all.map((p) => p.ref);

  // Checar duplicados
  const seen = new Set<number>();
  const dupes: number[] = [];
  refs.forEach((r) => {
    if (seen.has(r)) dupes.push(r);
    seen.add(r);
  });
  if (dupes.length > 0) {
    console.error("[catalog] ❌ Refs DUPLICADOS:", dupes);
  }

  const retiredInUse = refs.filter((ref) =>
    (RETIRED_PRODUCT_REFS as readonly number[]).includes(ref),
  );
  if (retiredInUse.length > 0) {
    console.error("[catalog] ❌ Refs aposentados reutilizados:", retiredInUse);
  }

  // Lacuna só é esperada quando o número está em RETIRED_PRODUCT_REFS
  const maxRef = Math.max(...refs);
  for (let expected = 1; expected <= maxRef; expected += 1) {
    const retired = (RETIRED_PRODUCT_REFS as readonly number[]).includes(expected);
    const present = seen.has(expected);
    if (!present && !retired) {
      console.warn(`[catalog] ⚠️  Ref ${expected} ausente e não está aposentado`);
    }
  }

  // Checar NEXT_PRODUCT_REF
  if (NEXT_PRODUCT_REF !== maxRef + 1) {
    console.warn(
      `[catalog] ⚠️  NEXT_PRODUCT_REF deveria ser ${maxRef + 1}, está ${NEXT_PRODUCT_REF}`,
    );
  }

  if (dupes.length === 0) {
    console.info(`[catalog] ✅ ${all.length} produtos com refs válidos (1–${maxRef})`);
  }
}
