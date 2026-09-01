"use client";

import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  aspectRatio?: "square" | "4/3";
  className?: string;
  imageClassName?: string;
};

export function ProductCard({
  product,
  onClick,
  aspectRatio = "square",
  className,
  imageClassName,
}: ProductCardProps) {
  const aspectClass = aspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-square";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-[#F0EDE6] text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        aspectClass,
        className
      )}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <Image
        src={product.src}
        alt={product.alt}
        fill
        className={cn(
          "object-contain p-8 transition-transform duration-500 group-hover:scale-105",
          aspectRatio === "4/3" && "p-6",
          imageClassName
        )}
        sizes={
          aspectRatio === "4/3"
            ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
      />
    </button>
  );
}
