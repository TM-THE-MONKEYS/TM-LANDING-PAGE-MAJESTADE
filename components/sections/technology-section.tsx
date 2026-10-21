"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { getProductsByIds } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Peças que mostram a variedade da produção. Saem do catálogo, nunca de arquivo solto. */
const showcaseProducts = getProductsByIds([
  "macacao-industrial",
  "caneca-termica-canudo-1200ml",
  "colete-personalizado",
  "kit-vinho-caixa-xadrez",
  "squeeze-inox-900ml",
  "cuia-pe-de-massa-medalhao",
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

const titleLines = ["Por que escolher", "a Majestade."];

export function TechnologySection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    const node = copyRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="diferenciais" className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-14 md:gap-14 md:px-12 md:pb-28 md:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-20 lg:px-20 lg:pt-20">
        <div ref={copyRef} className="lg:pt-1">
          <h2 className="text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            {titleLines.map((line, lineIndex) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className={cn(
                    "block transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    revealed
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[0.55em] opacity-0",
                  )}
                  style={{ transitionDelay: revealed ? `${lineIndex * 120}ms` : "0ms" }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <p
            className={cn(
              "mt-8 flex items-baseline gap-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: revealed ? "260ms" : "0ms" }}
          >
            <span className="text-6xl font-semibold leading-none tracking-tight text-brand-gold md:text-7xl lg:text-8xl">
              15+
            </span>
            <span className="max-w-[12ch] text-sm leading-snug text-white/70 md:text-base">
              anos de estrada atendendo empresas
            </span>
          </p>

          <dl
            className={cn(
              "mt-10 divide-y divide-white/15 border-y border-b-white/15 border-t-brand-gold transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: revealed ? "400ms" : "0ms" }}
          >
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

        <div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5">
            {showcaseProducts.map((product, index) => (
              <li key={product.id} className={cn(index % 2 === 1 && "mt-8 md:mt-12")}>
                <ProductCard
                  product={product}
                  onClick={() => openProduct(product)}
                  caption
                  captionTone="onDark"
                  showRef={false}
                  sizes="(max-width: 1024px) 45vw, 320px"
                />
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center lg:text-left">
            <Link
              href="/produtos"
              className="inline-flex text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
            >
              Ver mais produtos
            </Link>
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
