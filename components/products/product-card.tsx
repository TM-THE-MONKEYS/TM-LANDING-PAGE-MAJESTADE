"use client";

import Image from "next/image";
import { formatRef } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  /**
   * 4/5 é a proporção padrão do site — combina com a maioria das fotos
   * (retrato) sem sobrar muita faixa vazia nas laterais. "square" fica
   * reservado para grades bem compactas (ex. carrossel na home).
   */
  aspectRatio?: "square" | "4/5";
  /** Nome do produto abaixo da foto, no mesmo botão. */
  caption?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ProductCard({
  product,
  onClick,
  aspectRatio = "4/5",
  caption = false,
  className,
  imageClassName,
}: ProductCardProps) {
  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-[4/5]";
  const sizes =
    aspectRatio === "square"
      ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw";

  const image = (
    <Image
      src={product.src}
      alt={product.alt}
      fill
      className={cn(
        "object-contain p-3 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        imageClassName
      )}
      sizes={sizes}
    />
  );

  if (caption) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          className
        )}
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <span className={cn("relative block overflow-hidden rounded-2xl border border-brand-stone/15 bg-card", aspectClass)}>
          {image}
        </span>
        <span className="mt-3 block text-sm font-medium text-foreground transition-colors group-hover:text-accent">
          {product.name}
        </span>
        <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
          Ref. {formatRef(product.ref)}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-brand-stone/15 bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        aspectClass,
        className
      )}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      {image}
    </button>
  );
}
