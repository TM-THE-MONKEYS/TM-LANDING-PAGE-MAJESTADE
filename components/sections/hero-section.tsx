"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

const word = "MAJESTADE";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1514228742587-6b1558fcca73?q=80&w=1000",
    alt: "Canecas personalizadas corporativas",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000",
    alt: "Squeeze personalizado para empresas",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000",
    alt: "Equipe corporativa em reunião",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e161446a209?q=80&w=1000",
    alt: "Brindes corporativos em ambiente empresarial",
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
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000"
                alt="Ambiente corporativo com brindes personalizados"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-foreground/30" />
              
              <div 
                className="absolute inset-0 flex flex-col items-start justify-between overflow-hidden pb-8 pl-6 md:pl-10"
                style={{ opacity: textOpacity }}
              >
                <div className="flex w-full items-start justify-end pt-24 pr-6 md:pr-10">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-foreground shadow-lg transition-all hover:bg-white/90 hover:scale-105 animate-[reveal-up_0.6s_ease-out_1s_forwards] opacity-0"
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" />
                    Solicitar orçamento
                  </a>
                </div>

                <h1 className="w-full whitespace-nowrap text-[17vw] font-medium leading-[0.8] tracking-tighter text-white">
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
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
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
          Brindes corporativos personalizados
          <br />
          com mais de 15 anos de experiência.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground md:text-base">
          Fabricação própria em Montenegro, RS — fortalecendo marcas de empresas em todo o Brasil.
        </p>
      </div>
    </section>
  );
}
