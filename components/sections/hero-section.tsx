"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "MAJESTADE";

const sideImages = [
  {
    src: "/images/catalogo/04-canecas-termicas/caneca-termica-canudo-1200ml.png",
    alt: "Caneca térmica personalizada com canudo 1200ml",
    position: "left",
    span: 1,
  },
  {
    src: "/images/catalogo/01-squeeze-garrafas/squeeze-inox-900ml.png",
    alt: "Squeeze inox personalizado 900ml",
    position: "left",
    span: 1,
  },
  {
    src: "/images/catalogo/06-kit-vinho/kit-vinho-caixa-madeira.png",
    alt: "Kit vinho em caixa de madeira personalizado",
    position: "right",
    span: 1,
  },
  {
    src: "/images/catalogo/07-chaveiros/chaveiro-couro-sortido.png",
    alt: "Chaveiros em couro personalizados",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollableHeight = window.innerHeight * 1.4;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - (imageProgress * 58);
  const centerHeight = 100 - (imageProgress * 30);
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform bg-[#F0EDE6]"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ))}
            </div>

            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2400"
                alt="Produção de brindes corporativos personalizados"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-foreground/30" />
              
              <div
                className="absolute inset-0 flex items-end justify-center overflow-hidden px-6 pb-8 md:px-10"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full whitespace-nowrap text-center text-[17vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform bg-[#F0EDE6]"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[140vh]" />

      <div className="px-6 pt-20 pb-16 md:pt-28 md:px-12 md:pb-20 lg:px-20 lg:pt-32 lg:pb-24">
        <p className="mx-auto max-w-3xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Brindes corporativos personalizados,
          <br />
          fabricados por nós — do primeiro rascunho à entrega.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground md:text-base">
          Mais de 15 anos de experiência e estrutura própria em Montenegro, RS, atendendo empresas em todo o Brasil.
        </p>
      </div>
    </section>
  );
}
