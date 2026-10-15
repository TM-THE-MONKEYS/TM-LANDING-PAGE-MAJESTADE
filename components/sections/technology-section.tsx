import Image from "next/image";
import { getProductsByIds } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Peças que mostram a variedade da produção. Saem do catálogo, nunca de arquivo solto. */
const showcaseProducts = getProductsByIds([
  "macacao-industrial",
  "caneca-termica-canudo-1200ml",
  "colete-personalizado",
  "kit-vinho-caixa-xadrez",
]);

const pillars = [
  {
    title: "Fabricação própria",
    text: "Cada brinde sai da nossa estrutura, pronto para representar a credibilidade da sua empresa.",
  },
  {
    title: "Atendimento pensado para empresas",
    text: "Volume, prazo e consistência na marca: o que o mercado B2B mais cobra.",
  },
  {
    title: "Do evento ao uniforme",
    text: "Do brinde de um evento corporativo ao uniforme da equipe.",
  },
];

export function TechnologySection() {
  return (
    <section id="diferenciais" className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20 lg:px-20">
        <div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Por que escolher
            <br />
            a Majestade.
          </h2>

          <p className="mt-8 flex items-baseline gap-4">
            <span className="text-6xl font-semibold leading-none tracking-tight text-brand-gold md:text-7xl">
              15+
            </span>
            <span className="max-w-[12ch] text-sm leading-snug text-white/70 md:text-base">
              anos de estrada atendendo empresas
            </span>
          </p>

          <dl className="mt-10 divide-y divide-white/15 border-y border-b-white/15 border-t-brand-gold">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="py-5">
                <dt className="text-base font-medium md:text-lg">{pillar.title}</dt>
                <dd className="mt-1.5 max-w-prose text-sm leading-relaxed text-white/70 md:text-base">
                  {pillar.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5">
          {showcaseProducts.map((product, index) => (
            <li key={product.id} className={cn(index % 2 === 1 && "mt-8 md:mt-12")}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">
                  <Image
                    src={product.src}
                    alt=""
                    fill
                    className="object-contain p-4 md:p-6"
                    sizes="(max-width: 1024px) 45vw, 320px"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-white/80">{product.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
