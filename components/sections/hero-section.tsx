"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProductModal } from "@/components/products/product-modal";
import { catalogCategories } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";

const PREVIEW_IDS = [
  "caneca-termica-canudo-1200ml",
  "squeeze-inox-900ml",
  "kit-vinho-caixa-madeira",
  "chaveiro-couro-sortido",
];

function getProductById(id: string): Product | undefined {
  for (const cat of catalogCategories) {
    const found = cat.products.find((p) => p.id === id);
    if (found) return found;
  }
}

export function HeroSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const previewProducts = PREVIEW_IDS.map(getProductById).filter(
    (p): p is Product => !!p
  );

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section className="relative bg-background">
      {/* Hero — tela cheia */}
      <div className="relative h-screen overflow-hidden">
        {/* Foto de fundo corporativa */}
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2400"
          alt="Parceria corporativa Majestade Personalizados"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay escuro na paleta da marca */}
        <div className="absolute inset-0 bg-[#0F1B2D]/65" />

        {/* Logo e tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] opacity-0">
            <Image
              src="/logo-majestade-white-gold.png"
              alt="Majestade Personalizados"
              width={420}
              height={140}
              className="h-auto w-[min(380px,72vw)]"
              priority
            />
          </div>

          <p className="mt-6 max-w-sm animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.35s_forwards] text-sm text-white/70 opacity-0 md:max-w-md md:text-base">
            Brindes corporativos personalizados — da ideia à entrega.
          </p>
        </div>
      </div>

      {/* Preview de produtos — aparece ao rolar */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 bg-background px-4 py-6 md:grid-cols-4 md:gap-4 md:px-6 md:py-8"
      >
        {previewProducts.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => openProduct(product)}
            aria-label={`Ver detalhes de ${product.name}`}
            className={`group relative aspect-square overflow-hidden rounded-2xl bg-[#F0EDE6] transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              gridVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: gridVisible ? `${index * 0.1}s` : "0s" }}
          >
            <Image
              src={product.src}
              alt={product.alt}
              fill
              className="object-contain p-5 transition-transform duration-500 group-hover:scale-110 md:p-7"
              sizes="(max-width: 768px) 50vw, 25vw"
            />

            {/* Hover overlay com label */}
            <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/8" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="translate-y-2 rounded-full bg-foreground/80 px-3 py-1.5 text-xs font-medium text-background backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                Ver produto
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Texto institucional */}
      <div className="px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-8 lg:px-20 lg:pb-24">
        <p className="mx-auto max-w-3xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Brindes corporativos personalizados,
          <br />
          fabricados por nós — do primeiro rascunho à entrega.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground md:text-base">
          Mais de 15 anos de experiência e estrutura própria em Montenegro, RS, atendendo
          empresas em todo o Brasil.
        </p>
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
