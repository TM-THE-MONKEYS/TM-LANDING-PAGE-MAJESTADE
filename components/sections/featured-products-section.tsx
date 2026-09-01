"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { getFeaturedProducts } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { buildWhatsAppUrl } from "@/lib/contact";

type FeaturedProductsSectionProps = {
  limit?: number;
};

export function FeaturedProductsSection({ limit }: FeaturedProductsSectionProps) {
  const products = getFeaturedProducts(limit);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const catalogWhatsAppUrl = buildWhatsAppUrl(
    "Olá! Gostaria de receber o catálogo completo da Majestade Personalizados."
  );

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
        {products.map((product) => (
          <div key={product.id} className="group">
            <ProductCard
              product={product}
              aspectRatio="4/3"
              onClick={() => openProduct(product)}
            />

            <div className="py-6 text-center">
              <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {product.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 px-6 pb-20 md:px-12 lg:px-20">
        <a
          href={catalogWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4" />
          Solicitar catálogo no WhatsApp
        </a>
        {limit && (
          <Link
            href="/catalogo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver catálogo completo →
          </Link>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
