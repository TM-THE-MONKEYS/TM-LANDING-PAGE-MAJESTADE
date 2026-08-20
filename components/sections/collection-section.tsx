"use client";

import { FadeImage } from "@/components/fade-image";

const useCases = [
  {
    id: 1,
    name: "Relacionamento com Clientes",
    description: "Brindes estratégicos para fidelizar e fortalecer laços comerciais",
    tag: "B2B",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
  },
  {
    id: 2,
    name: "Presentes para Colaboradores",
    description: "Reconhecimento interno com produtos personalizados da empresa",
    tag: "RH",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800",
  },
  {
    id: 3,
    name: "Eventos e Feiras",
    description: "Materiais promocionais para maximizar a visibilidade da marca",
    tag: "Marketing",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f0021eec?q=80&w=800",
  },
  {
    id: 4,
    name: "Kits de Boas-vindas",
    description: "Composição de brindes institucionais para novos colaboradores e parceiros",
    tag: "Institucional",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800",
  },
  {
    id: 5,
    name: "Datas Comemorativas",
    description: "Ações sazonais com produtos personalizados para campanhas especiais",
    tag: "Campanhas",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800",
  },
  {
    id: 6,
    name: "Ações Promocionais",
    description: "Brindes em volume para distribuição em ações de marketing e vendas",
    tag: "Vendas",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
  },
];

export function CollectionSection() {
  return (
    <section id="aplicacoes" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <p className="text-xs uppercase tracking-widest text-accent">Aplicações</p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Soluções para cada necessidade corporativa
        </h2>
      </div>

      <div className="pb-24">
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {useCases.map((item) => (
            <div key={item.id} className="group flex-shrink-0 w-[75vw] snap-center">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              <div className="py-6">
                <p className="mb-2 text-xs uppercase tracking-widest text-accent">
                  {item.tag}
                </p>
                <h3 className="text-lg font-medium leading-snug text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {useCases.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              <div className="py-6">
                <p className="mb-2 text-xs uppercase tracking-widest text-accent">
                  {item.tag}
                </p>
                <h3 className="text-lg font-medium leading-snug text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
