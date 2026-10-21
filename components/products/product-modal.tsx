"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
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

const navButtonClass =
  "absolute top-1/2 z-[1] inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-[transform,background-color,opacity,box-shadow] duration-200 hover:bg-background hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:transition-none motion-reduce:active:scale-100 md:size-11 md:opacity-0 md:group-hover/gallery:opacity-100 md:group-focus-within/gallery:opacity-100";

/**
 * Ficha do produto. Um único popup para home, carrossel e /produtos.
 * Com mais de uma foto: setas na imagem, miniaturas e teclado ← →.
 */
export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const photos = product ? getProductPhotos(product) : [];
  const [index, setIndex] = useState(0);
  const panelId = useId();
  const statusId = useId();
  const hasGallery = photos.length > 1;
  const photo = photos[index] ?? photos[0];

  const goNext = () => {
    setIndex((current) => (current + 1) % photos.length);
  };

  const goPrev = () => {
    setIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, product?.id]);

  useEffect(() => {
    if (!open || !hasGallery) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
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

        <div className="flex shrink-0 flex-col bg-card md:min-h-0">
          <div
            id={panelId}
            role={hasGallery ? "tabpanel" : undefined}
            className={cn(
              "group/gallery relative h-[42dvh] min-h-52 md:h-auto md:min-h-0 md:flex-1",
              hasGallery && "select-none",
            )}
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain p-3 motion-safe:animate-[fadeIn_0.28s_ease-out]"
              sizes="(max-width: 768px) 100vw, 520px"
            />

            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Foto anterior"
                  className={cn(navButtonClass, "left-2 md:left-3")}
                >
                  <ChevronLeft className="size-5 md:size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próxima foto"
                  className={cn(navButtonClass, "right-2 md:right-3")}
                >
                  <ChevronRight className="size-5 md:size-6" aria-hidden />
                </button>
              </>
            )}
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
          <Button asChild variant="brand" size="cta" className="mt-8 md:mt-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Pedir esse produto no WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
