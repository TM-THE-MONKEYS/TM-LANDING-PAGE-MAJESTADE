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
      <div className="px-6 pt-20 pb-12 text-center md:px-12 md:pt-28 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-accent">Nossa Trajetória</p>
        <h2 className="mt-3 text-[10vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[8vw] lg:text-[6vw]">
          Nossa História.
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl transition-all duration-700 ease-out"
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
          />
          <div className="absolute bottom-6 left-6">
            <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
              O começo
            </span>
          </div>
        </div>

        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl transition-all duration-700 ease-out"
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
          />
          <div className="absolute bottom-6 left-6">
            <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
              Hoje
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-accent">
            Tradição e superação
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center max-w-4xl mx-auto">
            Tudo começou no porão da casa do fundador, em Montenegro, RS. Com trabalho constante,
            a Majestade se consolidou: hoje temos estrutura própria, equipe dedicada e mais de 15 anos
            fortalecendo marcas corporativas em todo o Brasil.
          </p>
        </div>
      </div>
    </section>
  );
}
