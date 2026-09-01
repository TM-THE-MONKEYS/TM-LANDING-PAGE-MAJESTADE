"use client";

import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";
import { catalogCategories } from "@/lib/catalog";

const CATALOG_WHATSAPP_URL =
  "https://wa.me/5551995451992?text=" +
  encodeURIComponent("Olá! Gostaria de receber o catálogo completo da Majestade Personalizados.");

export function CatalogSection() {
  return (
    <section className="bg-background">
      <div className="px-6 pt-16 pb-10 text-center md:px-12 md:pt-20 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-accent">Catálogo</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Nossos produtos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Conheça as linhas disponíveis para personalização. Sem preços — cada pedido é tratado
          individualmente conforme volume, prazo e especificações da sua empresa.
        </p>
      </div>

      <div className="px-6 pb-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-16 md:gap-20">
          {catalogCategories.map((category) => (
            <div key={category.id} className="border-t border-border pt-12">
              <div className="mb-8 max-w-xl">
                <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.photos.map((photo) => (
                  <div
                    key={photo.src}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-[#F0EDE6]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border px-6 py-16 text-center md:px-12 md:py-20 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-accent">Atendimento B2B</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Não encontrou o que precisa?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          Receba o catálogo completo em PDF com todas as linhas, referências e opções de
          personalização — direto no WhatsApp.
        </p>
        <a
          href={CATALOG_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4" />
          Solicitar catálogo no WhatsApp
        </a>
      </div>
    </section>
  );
}
