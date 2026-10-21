"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ProductCard } from "@/components/products/product-card";
import { ProductModal } from "@/components/products/product-modal";
import { Button } from "@/components/ui/button";
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

const CATEGORY_PRIORITY = ["uniformes-industriais", "vestuario-corporativo"];

const orderedCategories = [...catalogCategories].sort((a, b) => {
  const rank = (id: string) => {
    const index = CATEGORY_PRIORITY.indexOf(id);
    return index === -1 ? CATEGORY_PRIORITY.length : index;
  };
  return rank(a.id) - rank(b.id);
});

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
  const [activeCategory, setActiveCategory] = useState(orderedCategories[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Rastreia qual categoria está visível no viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const entries = new Map<string, boolean>();

    orderedCategories.forEach(({ id }) => {
      const el = sectionRefs.current.get(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          entries.set(id, entry.isIntersecting);
          const first = orderedCategories.find((c) => entries.get(c.id));
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

  const fold = (value: string) =>
    value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

  const normalized = fold(query.trim());

  const visibleCategories = orderedCategories
    .map((cat) => ({
      ...cat,
      products: normalized
        ? cat.products.filter(
            (p) =>
              fold(p.name).includes(normalized) ||
              fold(p.shortDescription).includes(normalized) ||
              fold(cat.title).includes(normalized)
          )
        : cat.products,
    }))
    .filter((cat) => cat.products.length > 0);

  const resultCount = visibleCategories.reduce((acc, c) => acc + c.products.length, 0);

  return (
    <section className="w-full overflow-x-clip bg-background">
      {/* ── Hero band — foto + overlay da marca, flui do navbar ───────── */}
      <div className="relative overflow-hidden px-4 pb-8 pt-20 text-center sm:px-6 md:pb-10 md:pt-24 lg:px-8 xl:px-10">
        <Image
          src="/images/produtos/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-ink/80" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand-gold/80">
            Majestade Personalizados
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* ── Navegação por categoria — linhas à esquerda, busca à direita */}
      <nav
        aria-label="Linhas de produtos"
        className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="flex w-full min-w-0 flex-col gap-2 px-4 py-3 sm:px-6 lg:h-14 lg:flex-row lg:items-center lg:gap-4 lg:px-8 lg:py-0 xl:px-10">
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:[scrollbar-width:thin]">
            <div className="flex w-max gap-1.5 pr-2">
              {orderedCategories.map((category) => {
                const isActive = !normalized && activeCategory === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "inline-flex min-h-11 shrink-0 items-center rounded-full px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:min-h-9 lg:px-3",
                      isActive
                        ? "bg-brand-navy font-medium text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {NAV_LABELS[category.id] ?? category.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="relative w-full shrink-0 lg:w-56">
            <label htmlFor="catalog-search" className="sr-only">
              Buscar produto
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto"
              aria-describedby={normalized ? "catalog-search-count" : undefined}
              className="h-11 w-full rounded-full border border-border bg-background py-2 pl-9 pr-10 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:h-9 lg:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        {normalized && (
          <p
            id="catalog-search-count"
            aria-live="polite"
            className="px-4 pb-2 text-xs text-muted-foreground sm:px-6 lg:px-8"
          >
            {resultCount === 1
              ? "1 produto encontrado"
              : `${resultCount} produtos encontrados`}
          </p>
        )}
      </nav>

      {/* ── Grid de produtos ──────────────────────────────────────────── */}
      <div className="w-full px-4 pb-20 pt-8 sm:px-6 md:pb-24 md:pt-10 lg:px-8 xl:px-10">
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
          <div className="flex flex-col gap-14 md:gap-16">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(category.id, el);
                  else sectionRefs.current.delete(category.id);
                }}
                className="scroll-mt-48 lg:scroll-mt-32"
              >
                {/* Cabeçalho da categoria */}
                <div className="mb-6 border-t border-border pt-6 text-center md:mb-8 md:pt-8">
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

                {/* Cards — ProductCard compartilhado (foto cobre o quadro) */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-x-5 lg:gap-y-10">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => openProduct(product)}
                      caption
                      align="center"
                      showHoverHint
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA de orçamento ─────────────────────────────────────────── */}
      <div className="bg-brand-ink">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-14 text-center md:py-16">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
              Quer um orçamento?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
              Diga o produto, a quantidade e o prazo. A proposta volta pelo WhatsApp.
            </p>
          </div>
          <Button asChild variant="brandOnDark" size="cta">
            <a href={WHATSAPP_QUOTE} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </Button>
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
