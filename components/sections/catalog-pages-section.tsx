"use client";

import Image from "next/image";
import { useState } from "react";
import { CatalogCta } from "@/components/products/catalog-cta";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATALOG_PAGE_COUNT, getCatalogPageSrc } from "@/lib/catalog";

const pages = Array.from({ length: CATALOG_PAGE_COUNT }, (_, index) => index + 1);

export function CatalogPagesSection() {
  const [lightboxPage, setLightboxPage] = useState<number | null>(null);

  return (
    <section className="bg-background">
      <div className="px-6 pt-24 pb-10 text-center md:px-12 md:pt-28 lg:px-20">
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Catálogo oficial
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Páginas do catálogo atual da Majestade. Role para ver todas ou toque em
          qualquer página para ampliar.
        </p>
      </div>

      <nav
        aria-label="Ir para página do catálogo"
        className="sticky top-20 z-40 border-y border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="flex gap-1 overflow-x-auto px-4 py-3 md:justify-center md:px-12 lg:px-20">
          {pages.map((page) => (
            <a
              key={page}
              href={`#catalogo-pagina-${page}`}
              className="flex size-9 shrink-0 items-center justify-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {page}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 md:gap-10 md:px-6 md:py-14">
        {pages.map((page) => {
          const src = getCatalogPageSrc(page);

          return (
            <figure
              key={page}
              id={`catalogo-pagina-${page}`}
              className="scroll-mt-36"
            >
              <button
                type="button"
                onClick={() => setLightboxPage(page)}
                className="group relative block w-full overflow-hidden bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={`Ampliar página ${page} do catálogo`}
              >
                <div className="relative aspect-[1240/1754] w-full">
                  <Image
                    src={src}
                    alt={`Página ${page} do catálogo Majestade Personalizados`}
                    fill
                    className="object-contain transition-opacity group-hover:opacity-95"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority={page <= 2}
                    loading={page <= 2 ? "eager" : "lazy"}
                  />
                </div>
              </button>
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                Página {page} de {CATALOG_PAGE_COUNT}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <CatalogCta
        title="Quer o PDF ou um orçamento sob medida?"
        description="Enviamos o catálogo completo e montamos a proposta conforme volume, prazo e personalização."
        ctaLabel="Falar no WhatsApp"
        whatsappMessage="Olá! Gostaria de receber o catálogo em PDF e um orçamento."
      />

      <Dialog
        open={lightboxPage !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxPage(null);
        }}
      >
        <DialogContent className="max-h-[95vh] max-w-4xl overflow-y-auto border-0 bg-background p-2 sm:p-4">
          <DialogTitle className="sr-only">
            Página {lightboxPage} do catálogo ampliada
          </DialogTitle>
          {lightboxPage !== null && (
            <div className="relative mx-auto aspect-[1240/1754] w-full">
              <Image
                src={getCatalogPageSrc(lightboxPage)}
                alt={`Página ${lightboxPage} do catálogo Majestade Personalizados`}
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
