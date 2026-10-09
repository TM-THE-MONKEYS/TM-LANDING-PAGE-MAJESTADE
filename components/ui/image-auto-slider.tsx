"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductModal } from "@/components/products/product-modal";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ImageAutoSliderProps = {
  products: Product[];
  /** Duração de um loop completo em segundos. Padrão: 32s */
  durationSec?: number;
  className?: string;
};

/**
 * Carrossel de produtos em scroll automático contínuo (CSS animation).
 * — Duplica os itens para um loop sem corte visível.
 * — Pausa no hover (mouse) e mantém posição.
 * — Respeita prefers-reduced-motion (estático quando ativo).
 * — Clique abre o ProductModal.
 */
export function ImageAutoSlider({
  products,
  durationSec = 32,
  className,
}: ImageAutoSliderProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  // Duplicar para o loop seamless: animar -50% do total
  const items = [...products, ...products];

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <div className={cn("w-full overflow-hidden", className)}>
        {/* Máscara de fade nas bordas */}
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track animado */}
          <div
            className="product-auto-slider-track flex gap-3 md:gap-4"
            data-paused={paused ? "true" : "false"}
            style={
              { "--slider-duration": `${durationSec}s` } as React.CSSProperties
            }
            aria-label="Destaques de produtos"
            role="region"
          >
            {items.map((product, i) => {
              const isClone = i >= products.length;
              return (
                <button
                  key={`${product.id}-${i}`}
                  type="button"
                  onClick={() => openProduct(product)}
                  aria-label={`Ver detalhes de ${product.name}`}
                  aria-hidden={isClone ? true : undefined}
                  tabIndex={isClone ? -1 : 0}
                  className="group relative flex-shrink-0 w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden rounded-2xl bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 240px"
                    loading="lazy"
                  />

                  {/* Overlay sutil no hover */}
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/6" />

                  {/* Badge "Ver produto" */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    <span className="translate-y-1 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                      Ver produto
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
