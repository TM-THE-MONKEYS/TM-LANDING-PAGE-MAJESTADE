"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductModal } from "@/components/products/product-modal";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductCarouselProps = {
  products: Product[];
  /** Intervalo entre avanços automáticos em ms. Padrão: 3 800 ms. */
  intervalMs?: number;
  className?: string;
};

/** Quantos itens clonar no final do track para o loop contínuo. */
const CLONE_BUFFER = 4;

/**
 * Carrossel de produtos com auto-play lento, pausa no hover/modal,
 * loop infinito e abertura do ProductModal ao clicar.
 *
 * Estruturado para ser reutilizado em qualquer seção que precise
 * exibir uma lista de produtos em sequência.
 */
export function ProductCarousel({
  products,
  intervalMs = 3800,
  className,
}: ProductCarouselProps) {
  const n = products.length;

  // Track items: originais + buffer de clones para wrap contínuo
  const items = [...products, ...products.slice(0, CLONE_BUFFER)];

  const containerRef = useRef<HTMLDivElement>(null);

  // Largura de cada slot (px) — recalculada no mount e no resize
  const [itemWidth, setItemWidth] = useState(0);

  // Índice atual (pode passar de n durante o clone zone)
  const [index, setIndex] = useState(0);

  // Controla se a transição CSS está ativa (desativada no snap silencioso)
  const [animated, setAnimated] = useState(true);

  // Estados de pausa
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Visibilidade (fade-in via IntersectionObserver)
  const [visible, setVisible] = useState(false);

  // prefers-reduced-motion
  const [prefersReduced, setPrefersReduced] = useState(false);

  // ── Detectar prefers-reduced-motion ─────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Medir largura de cada slot (responsivo) ──────────────────────────
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.offsetWidth;
      const cols = window.innerWidth >= 768 ? 4 : 2;
      setItemWidth(cw / cols);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── IntersectionObserver para fade-in ───────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────────────
  useEffect(() => {
    // Não avança: reduced-motion, hover ativo, modal aberto
    if (prefersReduced || hovering || modalOpen) return;

    const timer = setInterval(() => {
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [prefersReduced, hovering, modalOpen, intervalMs]);

  // ── Loop infinito: ao entrar na clone zone, faz snap silencioso ──────
  useEffect(() => {
    if (index < n) return;

    // Aguarda a transição (650 ms) terminar antes do snap
    const t = setTimeout(() => {
      setAnimated(false);
      setIndex((prev) => prev % n);
    }, 680);

    return () => clearTimeout(t);
  }, [index, n]);

  // ── Reabilitar animação após o snap ──────────────────────────────────
  useEffect(() => {
    if (animated) return;

    // Dois frames garante que o browser pintou a posição sem transição
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animated]);

  // ── Abrir modal ──────────────────────────────────────────────────────
  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  // ── Ir para dot específico ────────────────────────────────────────────
  const goTo = useCallback((i: number) => {
    setAnimated(true);
    setIndex(i);
  }, []);

  const translateX = -(index * itemWidth);
  const activeIndex = index % n;

  return (
    <>
      {/* ── Container ────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={cn(
          "overflow-hidden transition-opacity duration-700",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        role="region"
        aria-label="Destaques de produtos"
        aria-roledescription="carrossel"
      >
        {/* ── Track ────────────────────────────────────────────────── */}
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            transition:
              animated && !prefersReduced
                ? "transform 650ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            willChange: "transform",
          }}
        >
          {items.map((product, i) => {
            const isClone = i >= n;
            return (
              <div
                key={`${product.id}-${i}`}
                className="w-1/2 flex-shrink-0 px-1.5 md:w-1/4 md:px-2"
                aria-hidden={isClone ? true : undefined}
              >
                <button
                  type="button"
                  onClick={() => openProduct(product)}
                  aria-label={`Ver detalhes de ${product.name}`}
                  tabIndex={isClone ? -1 : 0}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/8" />

                  {/* Hover badge */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="translate-y-2 rounded-full bg-foreground/80 px-3 py-1.5 text-xs font-medium text-background backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                      Ver produto
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Dot indicators ───────────────────────────────────────── */}
        <div
          className="flex justify-center gap-1.5 pb-2 pt-4"
          role="tablist"
          aria-label="Posição no carrossel"
        >
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Produto ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                i === activeIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/25 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Modal de produto ─────────────────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
