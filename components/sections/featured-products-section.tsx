"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Canecas Personalizadas",
    description: "Linha premium",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca73?q=80&w=800",
  },
  {
    title: "Chaveiros Corporativos",
    description: "Alta visibilidade",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800",
  },
  {
    title: "Squeezes e Garrafas",
    description: "Uso diário",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800",
  },
  {
    title: "Kits Institucionais",
    description: "Boas-vindas",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800",
  },
  {
    title: "Brindes para Eventos",
    description: "Feiras e campanhas",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f0021eec?q=80&w=800",
  },
  {
    title: "Personalização Completa",
    description: "Sua marca em destaque",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="produtos" className="bg-background">
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Produtos que fortalecem
          <br />
          a identidade da sua empresa.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm text-muted-foreground md:text-base">
          Fabricamos brindes corporativos sob demanda, com logotipo, cores e mensagens personalizadas para cada cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>

            <div className="py-6">
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

      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Solicitar catálogo e orçamento
        </a>
      </div>
    </section>
  );
}
