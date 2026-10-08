"use client";

import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  aspectRatio?: "square" | "4/3";
  /** Nome do produto abaixo da foto, no mesmo botão. */
  caption?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ProductCard({
  product,
  onClick,
  aspectRatio = "square",
  caption = false,
  className,
  imageClassName,
}: ProductCardProps) {
  const aspectClass = aspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-square";
  const sizes =
    aspectRatio === "4/3"
      ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  const image = (
    <Image
      src={product.src}
      alt={product.alt}
      fill
      className={cn(
        "object-contain p-2 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
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
        <span className={cn("relative block overflow-hidden rounded-2xl bg-secondary", aspectClass)}>
          {image}
        </span>
        <span className="mt-3 block text-sm font-medium text-foreground transition-colors group-hover:text-accent">
          {product.name}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        aspectClass,
        className
      )}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      {image}
    </button>
  );
}
