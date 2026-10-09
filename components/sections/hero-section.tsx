"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { getFeaturedProducts } from "@/lib/catalog";
import { WHATSAPP_URL } from "@/lib/contact";

// Lista de produtos em destaque vinda do catálogo (source of truth único)
const featuredProducts = getFeaturedProducts();

export function HeroSection() {
  return (
    <section className="relative bg-background">
      {/* ── Hero — tela cheia ────────────────────────────────────────── */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2400"
          alt="Parceria corporativa Majestade Personalizados"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-foreground/65" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] motion-safe:opacity-0">
            <Image
              src="/logo-majestade-white-gold.png"
              alt="Majestade Personalizados"
              width={720}
              height={240}
              className="h-auto w-[min(640px,88vw)] md:w-[min(720px,70vw)]"
              priority
              sizes="(max-width: 768px) 88vw, 70vw"
            />
          </div>

          <p className="mt-6 max-w-sm motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.35s_forwards] motion-safe:opacity-0 text-sm text-white/70 md:max-w-md md:text-base">
            Fabricação própria. Atendimento B2B. Montenegro, RS.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.55s_forwards] motion-safe:opacity-0 sm:flex-row sm:gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              <WhatsAppIcon className="size-4" />
              Solicitar orçamento
            </a>
            <Link
              href="/catalogo"
              className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* ── Auto-slider de produtos em destaque ─────────────────────── */}
      <ImageAutoSlider
        products={featuredProducts}
        className="bg-background py-6 md:py-8"
      />

      {/* ── Texto institucional ──────────────────────────────────────── */}
      <div className="px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-8 lg:px-20 lg:pb-24">
        <p className="mx-auto max-w-3xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Estrutura própria de produção — silk, bordado,
          <br />
          sublimação — com controle de qualidade interno.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground md:text-base">
          Mais de 15 anos atendendo empresas em todo o Brasil.
          Do briefing ao envio, sem terceirização da produção.
        </p>
      </div>
    </section>
  );
}
