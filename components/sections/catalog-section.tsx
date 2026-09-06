"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Active category via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const entries = new Map<string, boolean>();

    catalogCategories.forEach(({ id }) => {
      const el = sectionRefs.current.get(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          entries.set(id, entry.isIntersecting);
          // Pick the first visible category
          const first = catalogCategories.find((c) => entries.get(c.id));
          if (first) setActiveCategory(first.id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const normalized = query.trim().toLowerCase();

  // Filter categories and products by query
  const visibleCategories = catalogCategories
    .map((cat) => ({
      ...cat,
      products: normalized
        ? cat.products.filter(
            (p) =>
              p.name.toLowerCase().includes(normalized) ||
              p.shortDescription.toLowerCase().includes(normalized) ||
              cat.title.toLowerCase().includes(normalized)
          )
        : cat.products,
    }))
    .filter((cat) => cat.products.length > 0);

  return (
    <section className="bg-background">
      <div className="px-6 pt-24 pb-10 text-center md:px-12 md:pt-28 lg:px-20">
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          {description}
        </p>

        {/* Busca client-side */}
        <div className="mx-auto mt-8 max-w-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto…"
              aria-label="Buscar produto no catálogo"
              className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          {normalized && (
            <p className="mt-2 text-xs text-muted-foreground">
              {visibleCategories.reduce((acc, c) => acc + c.products.length, 0)} produto(s) encontrado(s)
            </p>
          )}
        </div>
      </div>

      {/* Sticky nav de categorias — só exibe quando não há busca ativa */}
      {!normalized && (
        <nav
          aria-label="Categorias do catálogo"
          className="sticky top-20 z-40 border-y border-border bg-background/95 backdrop-blur-sm"
        >
          <div className="flex gap-1 overflow-x-auto px-4 py-3 md:justify-center md:gap-2 md:px-12 lg:px-20">
            {catalogCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.title}
                </a>
              );
            })}
          </div>
        </nav>
      )}

      <div className="px-6 pb-8 md:px-12 lg:px-20">
        {visibleCategories.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">
              Nenhum produto encontrado para{" "}
              <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 md:gap-20">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(category.id, el);
                  else sectionRefs.current.delete(category.id);
                }}
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
        )}
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
