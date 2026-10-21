"use client";

import Image from "next/image";
import { formatRef } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  /**
   * 4/5 é a proporção padrão do site.
   * "square" fica reservado para grades bem compactas.
   */
  aspectRatio?: "square" | "4/5";
  /** Nome (e ref, se showRef) abaixo da foto. */
  caption?: boolean;
  /** `onDark` para faixas escuras (ex. Por que escolher a Majestade). */
  captionTone?: "default" | "onDark";
  /** Exibe a referência sob o nome. Default: true quando há caption. */
  showRef?: boolean;
  /** Alinhamento do texto da caption. */
  align?: "left" | "center";
  /** Badge "Ver produto" no hover da foto. */
  showHoverHint?: boolean;
  /** `sizes` do next/image — ajuste conforme a coluna da grade. */
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Card reutilizável de produto.
 * Foto preenche o quadro (object-cover), sem faixa vazia entre imagem e borda.
 */
export function ProductCard({
  product,
  onClick,
  aspectRatio = "4/5",
  caption = false,
  captionTone = "default",
  showRef = true,
  align = "left",
  showHoverHint = false,
  sizes,
  className,
  imageClassName,
}: ProductCardProps) {
  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[4/5]";
  const imageSizes =
    sizes ??
    (aspectRatio === "square"
      ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw");

  const focusRing =
    captionTone === "onDark"
      ? "focus-visible:ring-brand-gold focus-visible:ring-offset-brand-ink"
      : "focus-visible:ring-accent focus-visible:ring-offset-2";

  const media = (
    <span
      className={cn(
        "relative block overflow-hidden rounded-2xl border border-brand-stone/15 bg-card transition-shadow duration-300 group-hover:shadow-md",
        aspectClass,
      )}
    >
      <Image
        src={product.src}
        alt={product.alt}
        fill
        className={cn(
          "object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          imageClassName,
        )}
        sizes={imageSizes}
      />
      {showHoverHint && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 flex translate-y-1 justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
            Ver produto
          </span>
        </span>
      )}
    </span>
  );

  if (caption) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          align === "center" ? "text-center" : "text-left",
          focusRing,
          className,
        )}
        aria-label={`Ver detalhes de ${product.name}`}
      >
        {media}
        <span
          className={cn(
            "mt-2.5 block text-sm font-medium leading-snug transition-colors",
            align === "center" && "line-clamp-2",
            captionTone === "onDark"
              ? "text-white/80 group-hover:text-white"
              : "text-foreground group-hover:text-accent",
          )}
        >
          {product.name}
        </span>
        {showRef && (
          <span
            className={cn(
              "mt-0.5 block font-mono text-xs",
              captionTone === "onDark" ? "text-white/45" : "text-muted-foreground",
            )}
          >
            Ref. {formatRef(product.ref)}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-brand-stone/15 bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        aspectClass,
        focusRing,
        className,
      )}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <Image
        src={product.src}
        alt={product.alt}
        fill
        className={cn(
          "object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          imageClassName,
        )}
        sizes={imageSizes}
      />
      {showHoverHint && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 flex translate-y-1 justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
            Ver produto
          </span>
        </span>
      )}
    </button>
  );
}
