"use client";

import Image from "next/image";

export function AboutSection({ showVideo = false }: { showVideo?: boolean }) {
  return (
    <section id="sobre" className="bg-background">
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20">
        <p className="mb-6 text-xs uppercase tracking-widest text-accent">Sobre nós</p>
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          A Majestade Personalizados é uma empresa gaúcha especializada na fabricação 
          de brindes corporativos — com mais de 15 anos de experiência, estrutura própria 
          e uma equipe dedicada que entende as necessidades do mercado B2B.
        </p>
        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Nossa trajetória começou de forma simples, no porão da casa do fundador, 
          e hoje somos referência em personalização corporativa em Montenegro e região. 
          Cada brinde que fabricamos carrega a identidade visual do cliente e o compromisso 
          de quem construiu este negócio com dedicação e trabalho constante.
        </p>
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
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"
            alt="Processo de fabricação de brindes corporativos"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
