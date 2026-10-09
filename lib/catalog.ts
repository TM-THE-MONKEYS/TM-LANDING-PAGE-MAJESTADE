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
  // ── 01. Squeeze e Garrafas ── refs 1–8 ──────────────────────────────────────
  {
    id: "squeeze-garrafas",
    title: "Squeeze e Garrafas",
    description:
      "Squeezes em inox e acrílico, e garrafas térmicas para uso diário da equipe ou como brinde institucional.",
    products: [
      {
        ref: 1,
        id: "squeeze-acrilico",
        name: "Squeeze Acrílico",
        shortDescription:
          "Squeeze transparente em acrílico, com tampa e base em aço inox.",
        src: "/images/oficiais/squeeze-acrilico.jpg",
        alt: "Squeeze acrílico azul com tampa e base de inox",
      },
      {
        ref: 2,
        id: "squeeze-inox-alca",
        name: "Squeeze Inox com Alça",
        shortDescription:
          "Squeeze em aço inox com alça na tampa, para levar no dia a dia.",
        src: "/images/oficiais/squeeze-inox-alca.jpg",
        alt: "Squeeze inox preto com alça na tampa",
      },
      {
        ref: 3,
        id: "garrafa-termica-alca",
        name: "Garrafa Térmica com Alça",
        shortDescription:
          "Garrafa térmica alta em inox, com alça lateral e copo na tampa.",
        src: "/images/oficiais/garrafa-termica-alca.jpg",
        alt: "Garrafa térmica de inox com alça",
      },
      {
        ref: 4,
        id: "garrafa-termica-slim",
        name: "Garrafa Térmica",
        shortDescription:
          "Garrafa térmica slim em inox, sem alça, para uso pessoal e brindes.",
        src: "/images/oficiais/garrafa-termica-slim.jpg",
        alt: "Garrafa térmica slim de inox",
      },
      {
        ref: 5,
        id: "squeeze-inox-900ml",
        name: "Squeeze Inox",
        shortDescription:
          "Squeeze em aço inox, em acabamento fosco ou escovado.",
        src: "/images/oficiais/squeeze-inox.jpg",
        alt: "Squeezes de inox fosco e escovado",
        featured: true,
      },
      {
        ref: 6,
        id: "garrafa-termica-infusor",
        name: "Garrafa Térmica com Infusor",
        shortDescription:
          "Garrafa térmica com infusor, em várias cores, para chá ou café.",
        src: "/images/oficiais/garrafa-termica-infusor.jpg",
        alt: "Garrafas térmicas coloridas com infusor",
      },
      {
        ref: 7,
        id: "squeeze-tampa",
        name: "Squeeze com Tampa",
        shortDescription:
          "Squeeze com tampa de bico, em inox e pintura, para o uso diário.",
        src: "/images/oficiais/squeeze-tampa.jpg",
        alt: "Squeezes com tampa de bico",
      },
      {
        ref: 8,
        id: "squeeze-manga",
        name: "Squeeze com Manga de Silicone",
        shortDescription:
          "Squeeze térmico com manga de silicone e copo na tampa.",
        src: "/images/oficiais/squeeze-manga.jpg",
        alt: "Squeezes com manga de silicone",
      },
    ],
  },

  // ── 02. Canecas Térmicas ── refs 9–10, 39–43 (11 aposentado) ───────────────
  {
    id: "canecas-termicas",
    title: "Canecas Térmicas",
    description:
      "Canecas com tampa, canudo, abridor ou display — a linha mais pedida para brindes corporativos.",
    products: [
      {
        ref: 9,
        id: "caneca-termica-abridor-500ml",
        name: "Caneca Térmica com Abridor 500ml",
        shortDescription:
          "Caneca térmica com abridor de garrafas embutido na base, um diferencial que chama atenção como brinde.",
        src: "/images/catalogo/04-canecas-termicas/caneca-termica-abridor-500ml.png",
        alt: "Caneca térmica com abridor 500ml",
        featured: true,
      },
      {
        ref: 10,
        id: "caneca-termica-canudo-1200ml",
        name: "Caneca Térmica com Canudo 1200ml",
        shortDescription:
          "Caneca de grande capacidade com canudo e alça, a linha mais pedida atualmente para brindes corporativos.",
        src: "/images/catalogo/04-canecas-termicas/caneca-termica-canudo-1200ml.png",
        alt: "Caneca térmica com canudo 1200ml",
      },
      {
        ref: 39,
        id: "caneca-termica-inox-tampa",
        name: "Caneca Térmica Inox com Tampa",
        shortDescription:
          "Caneca térmica em inox com tampa, base e alça pretas, para o uso diário da equipe.",
        src: "/images/oficiais/caneca-termica-inox-tampa.jpg",
        alt: "Caneca térmica de inox com tampa e base pretas",
      },
      {
        ref: 40,
        id: "caneca-termica-alca",
        name: "Caneca Térmica com Alça",
        shortDescription:
          "Caneca térmica com alça e tampa, em inox ou pintura, com o interior à mostra na linha de cores.",
        src: "/images/oficiais/caneca-termica-alca.jpg",
        alt: "Caneca térmica com alça preta e variações de cor",
      },
      {
        ref: 41,
        id: "caneca-termica-alta",
        name: "Caneca Térmica Alta",
        shortDescription:
          "Caneca térmica alta em inox, com alça anatômica e tampa de aço.",
        src: "/images/oficiais/caneca-termica-alta.jpg",
        alt: "Caneca térmica alta de inox com alça preta",
      },
      {
        ref: 42,
        id: "caneca-termica-alca-acrilica",
        name: "Caneca Térmica com Alça Acrílica",
        shortDescription:
          "Caneca térmica com alça em acrílico colorido e tampa, em várias cores para a marca do cliente.",
        src: "/images/oficiais/caneca-termica-alca-acrilica.jpg",
        alt: "Canecas térmicas com alça de acrílico em várias cores",
      },
      {
        ref: 43,
        id: "caneca-termica-cores",
        name: "Caneca Térmica em Cores",
        shortDescription:
          "Caneca térmica alta com pintura e tampa, disponível em várias cores, com o interior à mostra.",
        src: "/images/oficiais/caneca-termica-cores.jpg",
        alt: "Caneca térmica preta e a linha em outras cores",
      },
    ],
  },

  // ── 03. Canecas e Copos Térmicos ── refs 12–14 ──────────────────────────────
  {
    id: "canecas-copos",
    title: "Canecas e Copos Térmicos",
    description:
      "Linha inox parede dupla e copos térmicos com abridor, para presentear com praticidade.",
    products: [
      {
        ref: 12,
        id: "caneca-inox-parede-dupla-250ml",
        name: "Caneca Inox Parede Dupla 250ml",
        shortDescription:
          "Caneca compacta em inox com parede dupla, mantém a bebida na temperatura certa e tem ótimo acabamento.",
        src: "/images/catalogo/03-canecas/caneca-inox-parede-dupla-250ml.png",
        alt: "Caneca inox parede dupla 250ml",
      },
      {
        ref: 13,
        id: "caneca-inox-alca-acrilica-400ml",
        name: "Caneca Inox com Alça Acrílica 400ml",
        shortDescription:
          "Caneca em inox com alça em acrílico colorido, disponível em diversas cores para combinar com a marca do cliente.",
        src: "/images/catalogo/03-canecas/caneca-inox-alca-acrilica-400ml.png",
        alt: "Caneca inox com alça acrílica 400ml",
      },
      {
        ref: 14,
        id: "copo-termico-abridor-500ml",
        name: "Copo Térmico com Abridor 500ml",
        shortDescription:
          "Copo térmico de parede dupla com abridor de garrafas na base, prático para eventos e happy hours corporativos.",
        src: "/images/catalogo/05-copos-termicos/copo-termico-abridor-500ml.png",
        alt: "Copo térmico com abridor 500ml",
      },
    ],
  },

  // ── 04. Cuia e Bomba ── refs 15–17 ──────────────────────────────────────────
  {
    id: "cuia-e-bomba",
    title: "Cuia e Bomba",
    description:
      "Cuias de madeira, com pintura ou pé de massa, e bombas em inox — a tradição gaúcha personalizada com a marca da sua empresa.",
    products: [
      {
        ref: 15,
        id: "cuia-pe-de-massa-medalhao",
        name: "Cuia Pé de Massa com Medalhão",
        shortDescription:
          "Cuia tradicional com pé de massa e medalhão personalizável — a tradição gaúcha com a marca da sua empresa.",
        src: "/images/catalogo/02-cuia-e-bomba/cuia-pe-de-massa-medalhao.png",
        alt: "Cuia com pé de massa e medalhão",
        featured: true,
      },
      {
        ref: 16,
        id: "cuia-com-pedestal",
        name: "Cuia com Pedestal",
        shortDescription:
          "Cuia com base em pedestal, acabamento resistente, ideal para presentear parceiros e clientes.",
        src: "/images/catalogo/02-cuia-e-bomba/cuia-com-pedestal.png",
        alt: "Cuia com pedestal",
      },
      {
        ref: 17,
        id: "bomba-inox-rosca",
        name: "Bomba Inox com Rosca",
        shortDescription:
          "Bomba em aço inox com filtro de rosca, complemento perfeito para qualquer cuia personalizada.",
        src: "/images/catalogo/02-cuia-e-bomba/bomba-inox-rosca.png",
        alt: "Bomba inox com rosca",
      },
    ],
  },

  // ── 05. Kit Vinho ── refs 18–20 ─────────────────────────────────────────────
  {
    id: "kit-vinho",
    title: "Kit Vinho",
    description:
      "Kits em caixa de madeira, caixa xadrez ou estojo de garrafa, ideais para presentes institucionais e datas comemorativas.",
    products: [
      {
        ref: 18,
        id: "kit-vinho-caixa-madeira",
        name: "Kit Vinho Caixa de Madeira",
        shortDescription:
          "Kit com acessórios de vinho em estojo de madeira, presente institucional elegante para datas comemorativas.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-madeira.png",
        alt: "Kit vinho em caixa de madeira",
      },
      {
        ref: 19,
        id: "kit-vinho-caixa-xadrez",
        name: "Kit Vinho Caixa Xadrez",
        shortDescription:
          "Kit vinho com tabuleiro de xadrez embutido na tampa da caixa — um brinde diferente para clientes e parceiros.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-xadrez.png",
        alt: "Kit vinho em caixa xadrez",
        featured: true,
      },
      {
        ref: 20,
        id: "kit-vinho-garrafa-4-pecas",
        name: "Kit Vinho Garrafa 4 Peças",
        shortDescription:
          "Estojo em formato de garrafa com 4 acessórios essenciais para harmonização, prático para transportar e presentear.",
        src: "/images/catalogo/06-kit-vinho/kit-vinho-garrafa-4-pecas.png",
        alt: "Kit vinho garrafa 4 peças",
      },
    ],
  },

  // ── 06. Chaveiros ── refs 21–23 ─────────────────────────────────────────────
  {
    id: "chaveiros",
    title: "Chaveiros",
    description:
      "Chaveiros em couro ou metal, alta visibilidade para reforçar a marca no dia a dia do cliente.",
    products: [
      {
        ref: 21,
        id: "chaveiro-couro-sortido",
        name: "Chaveiro em Couro",
        shortDescription:
          "Chaveiro em couro legítimo com gravação personalizada, alta durabilidade e visibilidade no dia a dia do cliente.",
        src: "/images/catalogo/07-chaveiros/chaveiro-couro-sortido.png",
        alt: "Chaveiros em couro sortidos",
        featured: true,
      },
      {
        ref: 22,
        id: "chaveiro-couro-individual",
        name: "Chaveiro em Couro — Modelo Individual",
        shortDescription:
          "Variação em couro com mosquetão, ideal para personalização de logo e informações de contato.",
        src: "/images/catalogo/07-chaveiros/chaveiro-couro-individual-a.png",
        alt: "Chaveiro em couro individual",
      },
      {
        ref: 23,
        id: "chaveiro-metal-sortido",
        name: "Chaveiro em Metal",
        shortDescription:
          "Chaveiro em metal resistente, acabamento premium, ótimo para marcas que buscam um brinde mais robusto.",
        src: "/images/catalogo/07-chaveiros/chaveiro-metal-sortido.png",
        alt: "Chaveiros em metal sortidos",
      },
    ],
  },

  // ── 07. Canetas ── refs 24–26 ────────────────────────────────────────────────
  {
    id: "canetas",
    title: "Canetas",
    description:
      "Diversas linhas e acabamentos, o brinde corporativo mais clássico e versátil.",
    products: [
      {
        ref: 24,
        id: "canetas-linha-01",
        name: "Linha de Canetas Clássica",
        shortDescription:
          "Canetas em diversas cores e acabamentos foscos ou metalizados, o brinde corporativo mais versátil que existe.",
        src: "/images/catalogo/08-canetas/canetas-linha-01.png",
        alt: "Linha de canetas 01",
      },
      {
        ref: 25,
        id: "canetas-linha-02",
        name: "Linha de Canetas Executiva",
        shortDescription:
          "Canetas com clipe metálico e corpo colorido, acabamento mais sofisticado para brindes institucionais.",
        src: "/images/catalogo/08-canetas/canetas-linha-02.png",
        alt: "Linha de canetas 02",
        featured: true,
      },
      {
        ref: 26,
        id: "canetas-linha-03",
        name: "Linha de Canetas Touch",
        shortDescription:
          "Canetas com ponteira touch para telas sensíveis ao toque, praticidade extra no dia a dia do cliente.",
        src: "/images/catalogo/08-canetas/canetas-linha-03.png",
        alt: "Linha de canetas 03",
      },
    ],
  },

  // ── 08. Uniformes Industriais ── refs 62–66 (27–29 aposentados) ─────────────
  {
    id: "uniformes-industriais",
    title: "Uniformes Industriais",
    description:
      "Macacões, camisetas, polos e calças para equipes operacionais, com a identidade visual da empresa.",
    products: [
      {
        ref: 62,
        id: "macacao-industrial",
        name: "Macacão Industrial",
        shortDescription:
          "Macacão com bolsos, cós elástico e espaço para a marca no peito e nas costas.",
        src: "/images/oficiais/macacao-industrial-frente.jpg",
        alt: "Macacão industrial cinza, vista de frente",
        featured: true,
        photos: [
          {
            src: "/images/oficiais/macacao-industrial-maleta.jpg",
            alt: "Macacão industrial em uso, com maleta",
          },
          {
            src: "/images/oficiais/macacao-industrial-lado.jpg",
            alt: "Macacão industrial de lado",
          },
          {
            src: "/images/oficiais/macacao-industrial-costas.jpg",
            alt: "Costas do macacão industrial",
          },
          {
            src: "/images/oficiais/macacao-industrial-bolso.jpg",
            alt: "Bolso do peito do macacão industrial",
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
            alt: "Costas da camiseta com recorte",
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
        ref: 65,
        id: "calca-cargo",
        name: "Calça Cargo",
        shortDescription:
          "Calça cargo com bolsos laterais e traseiros, botão e zíper, para o dia a dia operacional.",
        src: "/images/oficiais/calca-cargo-costas.jpg",
        alt: "Calça cargo preta, vista de costas",
        photos: [
          {
            src: "/images/oficiais/calca-cargo-bolso.jpg",
            alt: "Bolso lateral da calça cargo",
          },
          {
            src: "/images/oficiais/calca-cargo-cinto.jpg",
            alt: "Cós e zíper da calça cargo",
          },
          {
            src: "/images/oficiais/calca-cargo-botao.jpg",
            alt: "Botão da calça cargo",
          },
        ],
      },
      {
        ref: 66,
        id: "blusa-manga-longa",
        name: "Blusa Manga Longa",
        shortDescription:
          "Blusa de manga longa com punho e barra em ribana, com a marca no peito.",
        src: "/images/oficiais/blusa-manga-longa-lado.jpg",
        alt: "Blusa preta de manga longa, vista de lado",
        photos: [
          {
            src: "/images/oficiais/blusa-manga-longa-punho.jpg",
            alt: "Punho em ribana da blusa de manga longa",
          },
          {
            src: "/images/oficiais/blusa-manga-longa-barra.jpg",
            alt: "Barra em ribana da blusa de manga longa",
          },
        ],
      },
    ],
  },

  // ── 09. Vestuário Corporativo ── refs 44–54 (30–32 aposentados) ──────────
  {
    id: "vestuario-corporativo",
    title: "Vestuário Corporativo",
    description:
      "Jaquetas, coletes, moletons, camisas sociais e jalecos para uniformizar a equipe.",
    products: [
      {
        ref: 44,
        id: "jaqueta-forro-personalizada",
        name: "Jaqueta com Forro Personalizada",
        shortDescription:
          "Jaqueta matelassada com forro, bolso interno e bordado da marca na frente e nas costas.",
        src: "/images/oficiais/jaqueta-forro-frente.jpg",
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
        src: "/images/oficiais/camisa-social-branca-frente.jpg",
        alt: "Camisa social branca personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-branca-peito.jpg",
            alt: "Bordado no peito da camisa social branca",
          },
          {
            src: "/images/oficiais/camisa-social-branca-punho.jpg",
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
        src: "/images/oficiais/camisa-social-preta-frente.jpg",
        alt: "Camisa social preta personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-preta-costas.jpg",
            alt: "Costas da camisa social preta",
          },
          {
            src: "/images/oficiais/camisa-social-preta-detalhe.jpg",
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
        src: "/images/oficiais/camisa-social-cinza-frente.jpg",
        alt: "Camisa social cinza, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camisa-social-cinza-costas.jpg",
            alt: "Costas da camisa social cinza",
          },
          {
            src: "/images/oficiais/camisa-social-cinza-punho.jpg",
            alt: "Punho da camisa social cinza",
          },
        ],
      },
      {
        ref: 48,
        id: "jaleco-manga-curta",
        name: "Jaleco Manga Curta",
        shortDescription:
          "Jaleco de manga curta com bolsos frontais, para equipes operacionais e técnicas.",
        src: "/images/oficiais/jaleco-manga-curta-frente.jpg",
        alt: "Jaleco preto de manga curta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaleco-manga-curta-costas.jpg",
            alt: "Costas do jaleco de manga curta",
          },
          {
            src: "/images/oficiais/jaleco-manga-curta-bolso.jpg",
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
        alt: "Jaleco cinza com zíper, vista de lado",
        photos: [
          {
            src: "/images/oficiais/jaleco-ziper-costas.jpg",
            alt: "Costas do jaleco com bordado",
          },
          {
            src: "/images/oficiais/jaleco-ziper-bordado.jpg",
            alt: "Bordado no bolso do peito do jaleco",
          },
          {
            src: "/images/oficiais/jaleco-ziper-manga.jpg",
            alt: "Bordado na manga do jaleco",
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
            src: "/images/oficiais/colete-forro.jpg",
            alt: "Forro interno do colete",
          },
          {
            src: "/images/oficiais/colete-gola.jpg",
            alt: "Gola do colete com bordado",
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
          "Moletom com capuz e bolso canguru, com bordado no peito para a marca da empresa.",
        src: "/images/oficiais/moletom-frente.jpg",
        alt: "Moletom cinza com capuz, vista de frente",
        photos: [
          {
            src: "/images/oficiais/moletom-bolso.jpg",
            alt: "Bolso canguru do moletom",
          },
          {
            src: "/images/oficiais/moletom-barra.jpg",
            alt: "Barra do moletom",
          },
        ],
      },
      {
        ref: 52,
        id: "jaqueta-corta-vento-verde",
        name: "Jaqueta Corta-Vento Verde",
        shortDescription:
          "Jaqueta corta-vento com recorte nos ombros, forro matelassado e bolsos laterais.",
        src: "/images/oficiais/jaqueta-corta-vento-verde-frente.jpg",
        alt: "Jaqueta corta-vento verde, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaqueta-corta-vento-verde-costas.jpg",
            alt: "Costas da jaqueta corta-vento verde",
          },
          {
            src: "/images/oficiais/jaqueta-corta-vento-verde-forro.jpg",
            alt: "Forro matelassado da jaqueta verde",
          },
          {
            src: "/images/oficiais/jaqueta-corta-vento-verde-bolso.jpg",
            alt: "Bolso da jaqueta corta-vento verde",
          },
        ],
      },
      {
        ref: 53,
        id: "jaqueta-corta-vento",
        name: "Jaqueta Corta-Vento",
        shortDescription:
          "Jaqueta corta-vento em dois tons, com forro matelassado, bolso e punho ajustável.",
        src: "/images/oficiais/jaqueta-corta-vento-frente.jpg",
        alt: "Jaqueta corta-vento cinza, vista de frente",
        photos: [
          {
            src: "/images/oficiais/jaqueta-corta-vento-forro.jpg",
            alt: "Forro matelassado da jaqueta corta-vento",
          },
          {
            src: "/images/oficiais/jaqueta-corta-vento-bolso.jpg",
            alt: "Bolso da jaqueta corta-vento",
          },
          {
            src: "/images/oficiais/jaqueta-corta-vento-punho.jpg",
            alt: "Punho com fecho da jaqueta corta-vento",
          },
        ],
      },
      {
        ref: 54,
        id: "jaqueta-matelassada",
        name: "Jaqueta Matelassada",
        shortDescription:
          "Jaqueta matelassada com gola, forro e bordado no peito e nas costas.",
        src: "/images/oficiais/jaqueta-matelassada-costas.jpg",
        alt: "Jaqueta matelassada preta, vista de costas",
        photos: [
          {
            src: "/images/oficiais/jaqueta-matelassada-peito.jpg",
            alt: "Bordado no peito da jaqueta matelassada",
          },
          {
            src: "/images/oficiais/jaqueta-matelassada-gola.jpg",
            alt: "Gola da jaqueta matelassada",
          },
          {
            src: "/images/oficiais/jaqueta-matelassada-forro.jpg",
            alt: "Forro interno da jaqueta matelassada",
          },
          {
            src: "/images/oficiais/jaqueta-matelassada-bolso.jpg",
            alt: "Bolso da jaqueta matelassada",
          },
        ],
      },
    ],
  },

  // ── 10. Camisetas ── refs 55–61 (33–35 aposentados) ─────────────────────────
  {
    id: "camisetas",
    title: "Camisetas",
    description:
      "Camisetas e polos personalizados para eventos, campanhas e uniforme da equipe.",
    products: [
      {
        ref: 55,
        id: "camiseta-azul",
        name: "Camiseta Azul",
        shortDescription:
          "Camiseta de manga curta em tecido leve, com espaço para a marca no peito.",
        src: "/images/oficiais/camiseta-azul-frente.jpg",
        alt: "Camiseta azul personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-azul-lado.jpg",
            alt: "Camiseta azul de lado",
          },
          {
            src: "/images/oficiais/camiseta-azul-costas.jpg",
            alt: "Costas da camiseta azul",
          },
        ],
      },
      {
        ref: 56,
        id: "camiseta-preta",
        name: "Camiseta Preta",
        shortDescription:
          "Camiseta de manga curta com a marca no peito e estampa grande nas costas.",
        src: "/images/oficiais/camiseta-preta-frente.jpg",
        alt: "Camiseta preta personalizada, vista de lado",
        photos: [
          {
            src: "/images/oficiais/camiseta-preta-costas.jpg",
            alt: "Costas da camiseta preta com estampa",
          },
          {
            src: "/images/oficiais/camiseta-preta-estampa.jpg",
            alt: "Detalhe da estampa nas costas da camiseta preta",
          },
        ],
      },
      {
        ref: 57,
        id: "camiseta-verde",
        name: "Camiseta Verde",
        shortDescription:
          "Camiseta de manga curta com bordado pequeno no peito.",
        src: "/images/oficiais/camiseta-verde-frente.jpg",
        alt: "Camiseta verde personalizada, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-verde-peito.jpg",
            alt: "Bordado no peito da camiseta verde",
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
            src: "/images/oficiais/camiseta-gola-v-peito.jpg",
            alt: "Estampa no peito da camiseta de gola V",
          },
          {
            src: "/images/oficiais/camiseta-gola-v-costas.jpg",
            alt: "Costas da camiseta de gola V",
          },
        ],
      },
      {
        ref: 59,
        id: "camiseta-manga-longa",
        name: "Camiseta Manga Longa",
        shortDescription:
          "Camiseta de manga longa com a marca no peito, para uniforme e ações de equipe.",
        src: "/images/oficiais/camiseta-manga-longa-frente.jpg",
        alt: "Camiseta vermelha de manga longa, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-manga-longa-lado.jpg",
            alt: "Camiseta de manga longa de lado",
          },
          {
            src: "/images/oficiais/camiseta-manga-longa-peito.jpg",
            alt: "Estampa no peito da camiseta de manga longa",
          },
        ],
      },
      {
        ref: 60,
        id: "camiseta-vies",
        name: "Camiseta com Viés",
        shortDescription:
          "Camiseta com gola e mangas em viés contrastante, com a marca no peito e nas costas.",
        src: "/images/oficiais/camiseta-vies-frente.jpg",
        alt: "Camiseta cinza com viés preto, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-vies-costas.jpg",
            alt: "Costas da camiseta com viés",
          },
        ],
      },
      {
        ref: 61,
        id: "camiseta-polo",
        name: "Camisa Polo",
        shortDescription:
          "Polo de manga curta com a marca no peito e nas costas, e gola com vista interna.",
        src: "/images/oficiais/camiseta-polo-frente.jpg",
        alt: "Camisa polo preta, vista de frente",
        photos: [
          {
            src: "/images/oficiais/camiseta-polo-costas.jpg",
            alt: "Costas da camisa polo",
          },
          {
            src: "/images/oficiais/camiseta-polo-gola.jpg",
            alt: "Gola da camisa polo",
          },
        ],
      },
    ],
  },

  // ── 11. Acessórios ── refs 36–38 ─────────────────────────────────────────────
  {
    id: "acessorios",
    title: "Chapéus, Bonés e Acessórios",
    description:
      "Bonés, chapéus, mochilas, bolsas térmicas e guarda-chuvas para completar o kit de brindes da sua empresa.",
    products: [
      {
        ref: 36,
        id: "bone-e-chapeu",
        name: "Bonés e Chapéus",
        shortDescription:
          "Bonés e chapéus personalizados com bordado ou silk, alta visibilidade da marca em uso externo.",
        src: "/images/catalogo/12-chapeus-bones/bone-e-chapeu.png",
        alt: "Boné e chapéu personalizados",
      },
      {
        ref: 37,
        id: "mochila-bolsa-termica",
        name: "Mochilas e Bolsas Térmicas",
        shortDescription:
          "Mochilas para notebook e bolsas térmicas personalizadas, brindes de alto valor percebido pelo cliente.",
        src: "/images/catalogo/13-mochilas-bolsas-termicas/mochila-bolsa-termica.png",
        alt: "Mochila e bolsa térmica",
        featured: true,
      },
      {
        ref: 38,
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

// ── Utilitários ───────────────────────────────────────────────────────────────

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = catalogCategories.flatMap((category) =>
    category.products.filter((product) => product.featured),
  );
  return limit ? featured.slice(0, limit) : featured;
}

export const CATALOG_PAGE_COUNT = 23;

export function getCatalogPageSrc(page: number): string {
  return `/images/catalogo-paginas/pagina-${String(page).padStart(2, "0")}.jpg`;
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
export const NEXT_PRODUCT_REF = 67;

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
 */
export const RETIRED_PRODUCT_REFS = [11, 27, 28, 29, 30, 31, 32, 33, 34, 35] as const;

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
