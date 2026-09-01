"use client";

import { useState } from "react";
import { CatalogCta } from "@/components/products/catalog-cta";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { catalogCategories } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";

export function CatalogSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section className="bg-background">
      <div className="px-6 pt-16 pb-10 text-center md:px-12 md:pt-20 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-accent">Produtos</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Nossos produtos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Conheça as linhas disponíveis para personalização. Sem preços — cada pedido é tratado
          individualmente conforme volume, prazo e especificações da sua empresa.
        </p>
      </div>

      <div className="px-6 pb-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-16 md:gap-20">
          {catalogCategories.map((category) => (
            <div key={category.id} className="border-t border-border pt-12">
              <div className="mb-8 max-w-xl">
                <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => openProduct(product)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CatalogCta />

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
