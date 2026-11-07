"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Fotos em /public/images/tecnicas — ver SOURCES.md (Pexels, licença livre).
 *
 * Padrão: palco fotográfico + chrome de vidro sobre a imagem
 * (Apple Photos / Control Center / páginas de produto).
 * Glass só aparece onde há foto para desfocar — nunca no fundo creme.
 */
type Technique = {
  id: string;
  name: string;
  summary: string;
  supports: string;
  image: string;
  alt: string;
};

const TECHNIQUES: Technique[] = [
  {
    id: "silk",
    name: "Silk",
    summary:
      "Serigrafia com tinta sobre tela — boa para volumes maiores e cores sólidas em tecido.",
    supports: "Camisetas, polos, uniformes e outras peças têxteis.",
    image: "/images/tecnicas/silk-wide.jpg",
    alt: "Tela de serigrafia com tinta e rodo em oficina de impressão",
  },
  {
    id: "dtf",
    name: "DTF",
    summary:
      "Impressão em filme transferida a calor — detalhe fino e cores variadas em tecido.",
    supports: "Malhas claras e escuras, uniformes e vestuário corporativo.",
    image: "/images/tecnicas/dtf-wide.jpg",
    alt: "Prensa térmica transferindo filme DTF em camiseta",
  },
  {
    id: "laser",
    name: "Laser",
    summary:
      "Gravação a laser — marca permanente, sem tinta, em superfície rígida.",
    supports: "Metal, madeira, inox e peças rígidas do catálogo.",
    image: "/images/tecnicas/laser-wide.jpg",
    alt: "Máquina a laser gravando superfície em oficina",
  },
  {
    id: "bordado",
    name: "Bordado",
    summary:
      "Linha bordada na peça — textura e acabamento durável para a marca.",
    supports: "Camisas, jalecos, jaquetas, coletes e bonés.",
    image: "/images/tecnicas/bordado-wide.jpg",
    alt: "Máquina de bordado industrial com linhas coloridas",
  },
  {
    id: "dtf-uv",
    name: "DTF UV",
    summary:
      "Impressão UV em filme para aplicação em superfícies rígidas — cores e detalhe digitais.",
    supports: "Garrafas, canecas, kits e outros itens rígidos.",
    image: "/images/tecnicas/dtf-uv-wide.jpg",
    alt: "Impressão UV em item rígido na oficina",
  },
];

export function TechniquesSection() {
  const baseId = useId();
  const [activeId, setActiveId] = useState(TECHNIQUES[0].id);
  const active = TECHNIQUES.find((t) => t.id === activeId) ?? TECHNIQUES[0];
  const panelId = `${baseId}-panel`;

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = TECHNIQUES.findIndex((t) => t.id === activeId);
    if (index < 0) return;

    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % TECHNIQUES.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + TECHNIQUES.length) % TECHNIQUES.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = TECHNIQUES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextId = TECHNIQUES[next].id;
    setActiveId(nextId);
    document.getElementById(`${baseId}-tab-${nextId}`)?.focus();
  };

  return (
    <section
      id="tecnicas"
      aria-labelledby={`${baseId}-title`}
      className="scroll-mt-[calc(var(--promo-bar-height,0px)+var(--site-header-height,4rem))] bg-background"
    >
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-8 px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-20 lg:px-20 lg:pt-24">
        <h2
          id={`${baseId}-title`}
          className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          Técnicas
        </h2>
        <p className="hidden max-w-[22ch] text-right text-sm leading-snug text-muted-foreground md:block md:text-[0.9375rem]">
          Personalização na fábrica — a técnica muda com o produto.
        </p>
      </div>

      <div className="relative isolate min-h-[32rem] overflow-hidden bg-brand-ink sm:min-h-[36rem] lg:min-h-[42rem]">
        {TECHNIQUES.map((technique) => {
          const visible = technique.id === active.id;
          return (
            <div
              key={technique.id}
              className={cn(
                "absolute inset-0",
                "motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:transition-none",
                visible ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!visible}
            >
              <Image
                src={technique.image}
                alt={technique.alt}
                fill
                sizes="100vw"
                    className="object-cover object-[center_70%]"
                priority={technique.id === TECHNIQUES[0].id}
              />
            </div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-transparent"
        />

        <div className="absolute inset-x-0 top-0 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="technique-dock mx-auto max-w-7xl px-5 py-5 sm:px-6 md:px-8 md:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div
                id={panelId}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${active.id}`}
                className="min-w-0 max-w-xl"
              >
                <h3 className="text-[1.75rem] font-medium leading-none tracking-[-0.03em] text-white md:text-[2.25rem]">
                  {active.name}
                </h3>
                <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.55] text-white/90 md:text-base md:leading-[1.6]">
                  {active.summary}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-white/65 md:text-[0.9375rem]">
                  {active.supports}
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Técnicas de personalização"
                aria-orientation="horizontal"
                onKeyDown={onTabKeyDown}
                className="technique-segment shrink-0 self-start"
              >
                {TECHNIQUES.map((technique) => {
                  const selected = technique.id === active.id;
                  return (
                    <button
                      key={technique.id}
                      id={`${baseId}-tab-${technique.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-pressed={selected}
                      aria-controls={panelId}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(technique.id)}
                      className="technique-segment__item"
                    >
                      {technique.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
