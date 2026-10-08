"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatRef, getProductPhotos } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { buildWhatsAppUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ProductModalProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Ficha do produto. Um único popup para home, carrossel e /produtos.
 * Com mais de uma foto, a troca fica nas miniaturas sob a imagem.
 */
export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const photos = product ? getProductPhotos(product) : [];
  const [index, setIndex] = useState(0);
  const panelId = useId();
  const statusId = useId();
  const hasGallery = photos.length > 1;
  const photo = photos[index] ?? photos[0];

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, product?.id]);

  useEffect(() => {
    if (!open || !hasGallery) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hasGallery, photos.length]);

  if (!product || !photo) return null;

  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de saber mais sobre o produto: ${product.name} (Ref. ${formatRef(product.ref)}).`,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-none sm:max-w-4xl md:grid md:h-[min(40rem,calc(100dvh-2rem))] md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:grid-rows-1 motion-reduce:animate-none"
      >
        <DialogClose className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary">
          <X className="size-4" aria-hidden />
          <span className="sr-only">Fechar</span>
        </DialogClose>

        <div className="flex shrink-0 flex-col bg-secondary md:min-h-0">
          <div
            id={panelId}
            role={hasGallery ? "tabpanel" : undefined}
            className="relative h-[42dvh] min-h-52 md:h-auto md:min-h-0 md:flex-1"
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain p-3"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>

          {hasGallery && (
            <div className="flex items-center gap-3 px-3 pb-3">
              <div
                className="flex min-w-0 flex-1 gap-2 overflow-x-auto"
                role="tablist"
                aria-label="Fotos do produto"
              >
                {photos.map((item, photoIndex) => {
                  const selected = photoIndex === index;
                  return (
                    <button
                      key={`${item.src}-${photoIndex}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={panelId}
                      onClick={() => setIndex(photoIndex)}
                      className={cn(
                        "relative size-12 shrink-0 overflow-hidden rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                        selected ? "ring-2 ring-accent" : "ring-1 ring-foreground/15",
                      )}
                    >
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                      <span className="sr-only">
                        Foto {photoIndex + 1} de {photos.length}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="shrink-0 font-mono text-xs text-muted-foreground" aria-hidden>
                {index + 1}/{photos.length}
              </p>
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <p className="font-mono text-xs text-muted-foreground">
            Ref. {formatRef(product.ref)}
          </p>
          <DialogTitle className="mt-2 text-left text-2xl font-medium tracking-tight text-foreground">
            {product.name}
          </DialogTitle>
          <DialogDescription className="mt-3 max-w-prose text-left text-sm leading-relaxed">
            {product.shortDescription}
          </DialogDescription>
          <p id={statusId} className="sr-only" aria-live="polite">
            {hasGallery
              ? `Foto ${index + 1} de ${photos.length}: ${photo.alt}`
              : photo.alt}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:mt-auto"
          >
            <WhatsAppIcon className="size-4" />
            Pedir esse produto no WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
