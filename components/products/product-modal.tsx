"use client";

import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/lib/catalog";
import { buildWhatsAppUrl } from "@/lib/contact";

type ProductModalProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  if (!product) return null;

  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de saber mais sobre o produto: ${product.name}.`
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0 sm:max-w-xl">
        <div className="relative aspect-square w-full bg-secondary">
          <Image
            src={product.src}
            alt={product.alt}
            fill
            className="object-contain p-8"
            sizes="(max-width: 640px) 100vw, 512px"
          />
        </div>

        <div className="space-y-4 p-6">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.shortDescription}</DialogDescription>
          </DialogHeader>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="size-4" />
            Pedir esse produto no WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
