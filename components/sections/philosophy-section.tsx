"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [leftTranslateX, setLeftTranslateX] = useState(-100);
  const [rightTranslateX, setRightTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    setLeftTranslateX((1 - progress) * -100);
    setRightTranslateX((1 - progress) * 100);
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="historia" className="bg-background">
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[10vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[8vw] lg:text-[6vw] text-center px-6">
                Nossa História.
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${leftTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${leftTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
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
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${rightTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${rightTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1200"
                  alt="Estrutura própria da Majestade Personalizados"
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
          </div>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-accent">
            Tradição e superação
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center max-w-4xl mx-auto">
            Tudo começou no porão da casa do fundador, em Montenegro. Com dedicação e trabalho constante, 
            a Majestade cresceu até se tornar uma empresa consolidada, com estrutura própria e uma equipe 
            dedicada — mais de 15 anos fortalecendo marcas corporativas em todo o Brasil.
          </p>
        </div>
      </div>
    </section>
  );
}
