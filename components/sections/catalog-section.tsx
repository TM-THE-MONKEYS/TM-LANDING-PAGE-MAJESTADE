"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { catalogCategories } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { buildWhatsAppUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const NAV_LABELS: Record<string, string> = {
  "squeeze-garrafas": "Garrafas",
  "canecas-termicas": "Canecas",
  "canecas-copos": "Copos",
  "cuia-e-bomba": "Cuia",
  "kit-vinho": "Kit vinho",
  chaveiros: "Chaveiros",
  canetas: "Canetas",
  "uniformes-industriais": "Uniformes",
  "vestuario-corporativo": "Vestuário",
  camisetas: "Camisetas",
  acessorios: "Acessórios",
};

const WHATSAPP_QUOTE = buildWhatsAppUrl(
  "Olá! Gostaria de um orçamento de brindes personalizados."
);

type CatalogSectionProps = {
  title?: string;
  description?: string;
};

export function CatalogSection({
  title = "Catálogo de produtos",
  description = "Escolha a linha, abra o produto e peça o orçamento pelo WhatsApp.",
}: CatalogSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(catalogCategories[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const entries = new Map<string, boolean>();

    catalogCategories.forEach(({ id }) => {
      const el = sectionRefs.current.get(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          entries.set(id, entry.isIntersecting);
          const first = catalogCategories.find((c) => entries.get(c.id));
          if (first) setActiveCategory(first.id);
        },
        { rootMargin: "-28% 0px -60% 0px" }
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

  const resultCount = visibleCategories.reduce((acc, c) => acc + c.products.length, 0);

  return (
    <section className="bg-background">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-8 pt-24 md:flex-row md:items-end md:justify-between md:pt-28">
          <div className="max-w-xl">
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          </div>

          <div className="w-full md:w-72 md:shrink-0">
            <label htmlFor="catalog-search" className="sr-only">
              Buscar produto
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar"
                className="w-full border-b border-border bg-transparent py-2 pl-7 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpar busca"
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {normalized && (
              <p className="mt-2 text-xs text-muted-foreground">
                {resultCount === 1 ? "1 produto" : `${resultCount} produtos`}
              </p>
            )}
          </div>
        </div>
      </div>

      {!normalized && (
        <nav
          aria-label="Linhas de produtos"
          className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6">
            {catalogCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "shrink-0 border-b-2 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isActive
                      ? "border-accent font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {NAV_LABELS[category.id] ?? category.title}
                </a>
              );
            })}
          </div>
        </nav>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20">
        {visibleCategories.length === 0 ? (
          <div className="py-24">
            <p className="text-foreground">
              Nenhum produto com &ldquo;{query}&rdquo;.
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
          <div className="flex flex-col gap-16 md:gap-20">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(category.id, el);
                  else sectionRefs.current.delete(category.id);
                }}
                className="scroll-mt-32"
              >
                <div className="mb-6 flex items-end justify-between gap-6 border-t border-border pt-6">
                  <div className="max-w-xl">
                    <h2 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-muted-foreground">
                    {category.products.length === 1
                      ? "1 produto"
                      : `${category.products.length} produtos`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      caption
                      onClick={() => openProduct(product)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between md:py-16">
          <div className="max-w-lg">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Quer um orçamento?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Diga o produto, a quantidade e o prazo. A proposta volta pelo WhatsApp.
            </p>
          </div>
          <a
            href={WHATSAPP_QUOTE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <WhatsAppIcon className="size-4" />
            Falar no WhatsApp
          </a>
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
