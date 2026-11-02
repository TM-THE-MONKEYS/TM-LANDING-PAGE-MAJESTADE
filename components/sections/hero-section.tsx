"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
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

        <div className="absolute inset-0 bg-brand-ink/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] motion-safe:opacity-0">
            <Image
              src="/logo-majestade-hero.png"
              alt="Majestade Personalizados"
              width={720}
              height={240}
              className="h-auto w-[min(640px,88vw)] md:w-[min(720px,70vw)]"
              priority
              sizes="(max-width: 768px) 88vw, 70vw"
            />
          </div>

          <p className="mt-6 max-w-md motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.35s_forwards] motion-safe:opacity-0 text-sm text-white/75 md:max-w-lg md:text-base">
            Brindes corporativos com produção própria em Montenegro, RS.
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3 motion-safe:animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.55s_forwards] motion-safe:opacity-0">
            <Button
              asChild
              className="h-14 w-full max-w-sm rounded-full bg-brand-gold px-8 text-base font-semibold text-white shadow-[0_8px_28px_-6px_rgba(184,134,11,0.65)] hover:bg-brand-gold/90 hover:shadow-[0_10px_32px_-4px_rgba(184,134,11,0.75)]"
            >
              <Link href="/produtos">Ver produtos</Link>
            </Button>
            <Button asChild variant="brandOnDark" size="cta" className="w-full max-w-sm justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Pedir orçamento no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Carrossel de produtos em destaque ───────────────────────── */}
      <ImageAutoSlider
        products={featuredProducts}
        className="bg-background pb-6 pt-12 md:pb-8 md:pt-16"
      />

      {/* ── Texto institucional ──────────────────────────────────────── */}
      <div className="px-6 pb-16 pt-4 md:px-12 md:pb-20 md:pt-8 lg:px-20 lg:pb-24">
        <p className="mx-auto max-w-3xl text-center text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Silk, bordado e sublimação —
          <br className="hidden sm:block" />
          com a melhor qualidade do mercado.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          Há mais de 15 anos personalizamos brindes corporativos com produção própria:
          a peça passa pelo nosso controle de qualidade antes de ir para a sua empresa, sem surpresas, com a melhor qualidade do mercado e em qualquer lugar do Brasil.
        </p>
      </div>
    </section>
  );
}
