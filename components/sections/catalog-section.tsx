"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ProductModal } from "@/components/products/product-modal";
import { catalogCategories, formatRef } from "@/lib/catalog";
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

  // Rastreia qual categoria está visível no viewport
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
      {/* ── Hero band — cor escura da marca, flui do navbar ──────────── */}
      <div className="bg-[#2b2112] pb-12 pt-24 text-center md:pb-16 md:pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-400/70">
            Majestade Personalizados
          </p>
          <h1 className="text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50 md:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* ── Navegação por categoria — busca ao lado de Acessórios ────── */}
      <nav
        aria-label="Linhas de produtos"
        className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {catalogCategories.map((category) => {
            const isActive = !normalized && activeCategory === category.id;
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "bg-foreground font-medium text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {NAV_LABELS[category.id] ?? category.title}
              </a>
            );
          })}
          <div className="relative ml-1 w-44 shrink-0 sm:w-52">
            <label htmlFor="catalog-search" className="sr-only">
              Buscar produto
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto"
              aria-describedby={normalized ? "catalog-search-count" : undefined}
              className="w-full rounded-full border border-border bg-background py-1.5 pl-8 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
        {normalized && (
          <p
            id="catalog-search-count"
            aria-live="polite"
            className="px-6 pb-2 text-center text-xs text-muted-foreground"
          >
            {resultCount === 1
              ? "1 produto encontrado"
              : `${resultCount} produtos encontrados`}
          </p>
        )}
      </nav>

      {/* ── Grid de produtos ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-24">
        {visibleCategories.length === 0 ? (
          /* Estado vazio de busca */
          <div className="py-32 text-center">
            <p className="text-lg font-medium text-foreground">
              Nenhum produto com &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Tente outro termo ou navegue pelas categorias.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-20 md:gap-24">
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
                {/* Cabeçalho da categoria */}
                <div className="mb-8 border-t border-border pt-8 text-center">
                  <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                    {category.title}
                  </h2>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs tabular-nums text-muted-foreground">
                    {category.products.length === 1
                      ? "1 produto"
                      : `${category.products.length} produtos`}
                  </span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                  {category.products.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => openProduct(product)}
                      aria-label={`Ver detalhes de ${product.name}`}
                      className="group w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {/* Imagem */}
                      <span className="relative block aspect-square overflow-hidden rounded-2xl bg-secondary transition-shadow duration-300 group-hover:shadow-md">
                        <Image
                          src={product.src}
                          alt={product.alt}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        {/* Badge "Ver produto" no hover */}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 flex translate-y-1 justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <span className="rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
                            Ver produto
                          </span>
                        </span>
                      </span>

                      {/* Nome + ref abaixo */}
                      <span className="mt-2.5 block truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
                        Ref. {formatRef(product.ref)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA de orçamento ─────────────────────────────────────────── */}
      <div className="bg-[#2b2112]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-14 text-center md:py-16">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              Quer um orçamento?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
              Diga o produto, a quantidade e o prazo. A proposta volta pelo WhatsApp.
            </p>
          </div>
          <a
            href={WHATSAPP_QUOTE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2112]"
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
