"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

const features = [
  {
    title: "Canecas Térmicas",
    description: "Linha premium",
    image: "/images/catalogo/04-canecas-termicas/caneca-termica-abridor-500ml.png",
  },
  {
    title: "Squeezes e Garrafas",
    description: "Uso diário",
    image: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-750ml.png",
  },
  {
    title: "Chaveiros Corporativos",
    description: "Alta visibilidade",
    image: "/images/catalogo/07-chaveiros/chaveiro-couro-sortido.png",
  },
  {
    title: "Kit Vinho",
    description: "Presentes institucionais",
    image: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-xadrez.png",
  },
  {
    title: "Cuia e Bomba",
    description: "Diferencial gaúcho",
    image: "/images/catalogo/02-cuia-e-bomba/cuia-pe-de-massa-medalhao.png",
  },
  {
    title: "Canetas",
    description: "Clássico e versátil",
    image: "/images/catalogo/08-canetas/canetas-linha-02.png",
  },
  {
    title: "Uniformes Industriais",
    description: "Equipes operacionais",
    image: "/images/catalogo/09-uniformes-industriais/macacao-azul.png",
  },
  {
    title: "Mochilas e Bolsas",
    description: "Brindes de alto impacto",
    image: "/images/catalogo/13-mochilas-bolsas-termicas/mochila-bolsa-termica.png",
  },
];

type FeaturedProductsSectionProps = {
  limit?: number;
};

export function FeaturedProductsSection({ limit }: FeaturedProductsSectionProps) {
  const displayedFeatures = limit ? features.slice(0, limit) : features;

  return (
    <section id="produtos" className="bg-background">
      <div className="px-6 py-16 text-center md:px-12 md:py-20 lg:px-20 lg:py-24">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Produtos que carregam
          <br />
          a identidade da sua empresa.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm text-muted-foreground md:text-base">
          Da caneca ao uniforme, cada peça é produzida sob demanda — com seu logotipo, suas cores e o acabamento que sua marca merece.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-12 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:px-20">
        {displayedFeatures.map((feature) => (
          <div key={feature.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F0EDE6]">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="py-6 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-accent">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 px-6 pb-20 md:px-12 lg:px-20">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4" />
          Solicitar catálogo no WhatsApp
        </a>
        {limit && (
          <Link
            href="/empresa#aplicacoes"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver todas as aplicações corporativas →
          </Link>
        )}
      </div>
    </section>
  );
}
