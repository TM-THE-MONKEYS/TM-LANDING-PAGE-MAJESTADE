"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="sobre" className="bg-background">
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="text-xs uppercase tracking-widest text-accent mb-6">Sobre nós</p>
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

      <div className="relative aspect-[16/9] w-full">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"
          alt="Processo de fabricação de brindes corporativos"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
