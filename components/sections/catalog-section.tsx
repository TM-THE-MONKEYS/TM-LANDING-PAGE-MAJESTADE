"use client";

import { useState } from "react";
import { CatalogCta } from "@/components/products/catalog-cta";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { catalogCategories } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";

type CatalogSectionProps = {
  title?: string;
  description?: string;
};

export function CatalogSection({
  title = "Catálogo de produtos",
  description = "Navegue pelas linhas, clique no produto que interessar e fale conosco no WhatsApp para orçamento ou mais detalhes.",
}: CatalogSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section className="bg-background">
      <div className="px-6 pt-24 pb-10 text-center md:px-12 md:pt-28 lg:px-20">
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <nav
        aria-label="Categorias do catálogo"
        className="sticky top-20 z-40 border-y border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="flex gap-1 overflow-x-auto px-4 py-3 md:justify-center md:gap-2 md:px-12 lg:px-20">
          {catalogCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="shrink-0 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {category.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="px-6 pb-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-16 md:gap-20">
          {catalogCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="scroll-mt-36 border-t border-border pt-12 first:border-t-0 first:pt-8"
            >
              <div className="mb-8 max-w-xl">
                <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      product={product}
                      onClick={() => openProduct(product)}
                    />
                    <div className="pt-4">
                      <h3 className="text-lg font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <button
                        type="button"
                        onClick={() => openProduct(product)}
                        className="mt-3 text-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CatalogCta
        title="Quer um orçamento ou não achou o que precisa?"
        description="Conte o volume, o prazo e o produto — montamos a proposta sob medida e enviamos pelo WhatsApp."
        ctaLabel="Falar no WhatsApp"
        whatsappMessage="Olá! Gostaria de um orçamento de brindes personalizados."
      />

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
