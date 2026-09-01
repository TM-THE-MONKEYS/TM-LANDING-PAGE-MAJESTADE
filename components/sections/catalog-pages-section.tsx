"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CatalogCta } from "@/components/products/catalog-cta";
import { Button } from "@/components/ui/button";
import { CATALOG_PAGE_COUNT, getCatalogPageSrc } from "@/lib/catalog";
import { useImageCarousel } from "@/hooks/use-image-carousel";
import { cn } from "@/lib/utils";

export function CatalogPagesSection() {
  const { currentIndex, goTo, goNext, goPrev } = useImageCarousel({
    total: CATALOG_PAGE_COUNT,
  });

  const currentPage = currentIndex + 1;
  const currentSrc = getCatalogPageSrc(currentPage);

  return (
    <section className="bg-background">
      <div className="px-6 pt-16 pb-10 text-center md:px-12 md:pt-20 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-accent">Catálogo</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Catálogo completo
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Folheie todas as páginas do catálogo oficial — linhas, referências e opções de
          personalização em um só lugar.
        </p>
      </div>

      <div className="px-6 pb-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="relative aspect-[1240/1754] overflow-hidden rounded-2xl bg-[#F0EDE6]">
              <Image
                key={currentSrc}
                src={currentSrc}
                alt={`Página ${currentPage} do catálogo Majestade Personalizados`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority={currentPage === 1}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goPrev}
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-md"
              aria-label="Página anterior"
            >
              <ChevronLeft className="size-5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={goNext}
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-md"
              aria-label="Próxima página"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Página {currentPage} de {CATALOG_PAGE_COUNT}
          </p>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: CATALOG_PAGE_COUNT }, (_, index) => {
              const page = index + 1;
              const isActive = index === currentIndex;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goTo(index)}
                  className={cn(
                    "relative h-20 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-[#F0EDE6] transition-colors",
                    isActive ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  aria-label={`Ir para página ${page}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <Image
                    src={getCatalogPageSrc(page)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <CatalogCta />
    </section>
  );
}
