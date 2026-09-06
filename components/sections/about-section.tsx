"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

export function AboutSection({ showVideo = false }: { showVideo?: boolean }) {
  return (
    <section id="sobre" className="bg-background">
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20">
        <h2 className="mb-8 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Sobre nós
        </h2>
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          A Majestade Personalizados é uma fábrica gaúcha de brindes corporativos, com mais
          de 15 anos de experiência e estrutura própria. Entendemos o que o mercado B2B precisa:
          prazo, volume e consistência na personalização — do primeiro pedido de teste ao contrato recorrente.
        </p>
        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Começamos no porão da casa do fundador. Hoje somos referência em personalização
          corporativa em Montenegro, RS e região. Em cada peça, a identidade da sua empresa
          — e o mesmo cuidado que carregamos desde o primeiro dia.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <WhatsAppIcon className="size-4" />
            Falar no WhatsApp
          </a>
          <Link
            href="/produtos"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Ver produtos
          </Link>
        </div>
      </div>

      {showVideo ? (
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1-cNBCz5fomcLRmm1cTXSBOKCq10VP91.mp4"
          />
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="px-6 text-center text-xl font-medium text-white md:text-3xl">
              Fabricação própria. Qualidade garantida. Atendimento corporativo.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000"
            alt="Produção e fabricação de brindes corporativos Majestade Personalizados"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
