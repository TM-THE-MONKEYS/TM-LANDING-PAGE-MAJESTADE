"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="historia" className="bg-background">
      <div className="px-6 pt-24 pb-12 text-center md:px-12 md:pt-28 lg:px-20">
        <h1 className="text-[10vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[8vw] lg:text-[6vw]">
          Nossa História.
        </h1>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden motion-reduce:transition-none transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(-48px)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200"
            alt="Início da produção artesanal de brindes"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-foreground/25" />
          <p className="absolute bottom-6 left-6 text-sm font-medium text-white">
            O começo
          </p>
        </div>

        <div
          className="relative aspect-[4/3] overflow-hidden motion-reduce:transition-none transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(48px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: isVisible ? "150ms" : "0ms",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200"
            alt="Estrutura própria da Majestade Personalizados em Montenegro, RS"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-foreground/25" />
          <p className="absolute bottom-6 left-6 text-sm font-medium text-white">
            Hoje
          </p>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <p className="mx-auto max-w-4xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl">
          Tudo começou no porão da casa do fundador, em Montenegro, RS. Com trabalho
          constante, a Majestade se consolidou: hoje temos estrutura própria, equipe
          dedicada e mais de 15 anos fortalecendo marcas corporativas em todo o Brasil.
        </p>
      </div>
    </section>
  );
}
