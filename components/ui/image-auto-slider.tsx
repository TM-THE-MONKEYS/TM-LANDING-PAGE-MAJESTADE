"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ProductModal } from "@/components/products/product-modal";
import { useDragMarquee } from "@/hooks/use-drag-marquee";
import { formatRef } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ImageAutoSliderProps = {
  products: Product[];
  /** Velocidade da rotação automática em px/s. Padrão: 44. */
  speed?: number;
  className?: string;
};

const controlClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-brand-stone/30 bg-background text-foreground transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

/**
 * Carrossel de destaques da home: gira sem parar, pode ser arrastado com mouse
 * ou dedo, e para enquanto o popup do produto está aberto.
 *
 * Passar o mouse por cima não pausa. A rotação só para ao clicar/arrastar, ao
 * navegar por teclado e pelo botão de pausa. Toda a mecânica fica em
 * `useDragMarquee`.
 */
export function ImageAutoSlider({ products, speed = 44, className }: ImageAutoSliderProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  const { viewportRef, trackRef, setRef, copies, glideBy, getStep, revealElement, bind } =
    useDragMarquee({ speed, paused: userPaused || modalOpen || keyboardFocus });

  if (products.length === 0) return null;

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const renderSet = (copyIndex: number) => (
    <div
      key={copyIndex}
      ref={copyIndex === 0 ? setRef : undefined}
      aria-hidden={copyIndex > 0 ? true : undefined}
      className="flex shrink-0 gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]"
    >
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          tabIndex={copyIndex > 0 ? -1 : 0}
          onClick={() => openProduct(product)}
          onFocus={(event) => {
            // só pausa e reposiciona quando o foco vem do teclado
            if (event.currentTarget.matches(":focus-visible")) {
              setKeyboardFocus(true);
              revealElement(event.currentTarget);
            }
          }}
          onBlur={() => setKeyboardFocus(false)}
          aria-label={`Ver detalhes de ${product.name}`}
          className="group block w-[58vw] shrink-0 select-none text-left focus-visible:outline-none sm:w-60 md:w-64 lg:w-72 2xl:w-80"
        >
          <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl border border-brand-stone/15 bg-card transition-colors group-hover:border-brand-gold group-focus-visible:border-brand-gold group-focus-visible:ring-2 group-focus-visible:ring-accent">
            <Image
              src={product.src}
              alt=""
              fill
              draggable={false}
              className="object-contain p-4 md:p-5"
              sizes="(max-width: 640px) 58vw, (max-width: 1024px) 256px, 320px"
            />
          </span>
          <span className="mt-3 block truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand-gold md:text-base">
            {product.name}
          </span>
          <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
            Ref. {formatRef(product.ref)}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className={cn("w-full", className)}>
        <div className="mb-6 flex items-center justify-between gap-4 px-6 md:mb-8 md:px-12 lg:px-20">
          <div className="min-w-0">
            <span aria-hidden className="mb-3 block h-0.5 w-10 bg-brand-gold" />
            <h2 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Destaques do catálogo
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Arraste para o lado ou toque em um produto para ver os detalhes.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setUserPaused((current) => !current)}
              aria-label={userPaused ? "Retomar rotação do carrossel" : "Pausar rotação do carrossel"}
              aria-pressed={userPaused}
              className={cn(
                controlClass,
                userPaused && "border-brand-navy bg-brand-navy text-white hover:text-white",
              )}
            >
              {userPaused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => glideBy(-getStep())}
              aria-label="Produto anterior"
              className={cn(controlClass, "hidden sm:inline-flex")}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => glideBy(getStep())}
              aria-label="Próximo produto"
              className={cn(controlClass, "hidden sm:inline-flex")}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <Link
              href="/produtos"
              className="ml-2 hidden rounded-sm text-sm font-medium text-brand-navy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:inline"
            >
              Ver todos os produtos
            </Link>
          </div>
        </div>

        <div
          ref={viewportRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Destaques do catálogo"
          {...bind}
          className="marquee-mask cursor-grab touch-pan-y overflow-x-clip py-2 [--marquee-gap:1rem] data-[dragging=true]:cursor-grabbing md:[--marquee-gap:1.5rem]"
        >
          <div ref={trackRef} className="flex w-max will-change-transform">
            {Array.from({ length: copies }, (_, index) => renderSet(index))}
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
