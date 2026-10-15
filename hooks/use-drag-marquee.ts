"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";

type UseDragMarqueeOptions = {
  /** Velocidade da rotação automática em px/s. */
  speed: number;
  /** Para a rotação automática (ex.: popup aberto, botão de pausa). */
  paused: boolean;
};

/** Distância mínima (px) para um toque virar arraste e não clique. */
const DRAG_THRESHOLD = 6;
/** Janela (ms) usada para medir a velocidade do arremesso ao soltar. */
const VELOCITY_WINDOW = 100;
const MAX_FLING = 2400;
const TWEEN_MS = 520;

type Sample = { t: number; x: number };
type Tween = { from: number; delta: number; start: number };

const mod = (value: number, size: number) => ((value % size) + size) % size;

/**
 * Carrossel contínuo e infinito, arrastável por mouse e toque.
 *
 * - A lista é repetida `copies` vezes (o suficiente para cobrir a largura da
 *   tela) e o deslocamento volta exatamente uma largura de conjunto, então
 *   não existe ponto de "reset" visível.
 * - Posição e inércia ficam em refs e vão direto para o `transform`, sem
 *   re-render por frame.
 * - Respeita `prefers-reduced-motion` (sem rotação automática; arraste segue
 *   funcionando) e só anima enquanto está visível na tela.
 */
export function useDragMarquee({ speed, paused }: UseDragMarqueeOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(3);

  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);

  const state = useRef({
    offset: 0,
    setWidth: 0,
    velocity: 0,
    factor: 1,
    pressed: false,
    dragging: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startOffset: 0,
    samples: [] as Sample[],
    tween: null as Tween | null,
    reduced: false,
  });

  useEffect(() => {
    pausedRef.current = paused;
    speedRef.current = speed;
  }, [paused, speed]);

  useEffect(() => {
    const st = state.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = setRef.current;
    if (!viewport || !track || !firstSet) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    st.reduced = motionQuery.matches;
    const onMotionChange = (event: MediaQueryListEvent) => {
      st.reduced = event.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    const measure = () => {
      const width = firstSet.getBoundingClientRect().width;
      if (width <= 0) return;
      st.setWidth = width;
      const needed = Math.max(2, Math.ceil(viewport.clientWidth / width) + 1);
      setCopies((current) => (current === needed ? current : needed));
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(firstSet);

    let frameId = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (st.setWidth > 0) {
        if (st.dragging || st.pressed) {
          // posição controlada pelo ponteiro
        } else if (st.tween) {
          const progress = Math.min((now - st.tween.start) / TWEEN_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          st.offset = st.tween.from + st.tween.delta * eased;
          if (progress >= 1) st.tween = null;
        } else {
          const stopped = pausedRef.current || st.reduced;
          st.factor += ((stopped ? 0 : 1) - st.factor) * (1 - Math.exp(-dt * 5));
          st.offset += (speedRef.current * st.factor + st.velocity) * dt;
          st.velocity *= Math.exp(-dt * 3);
          if (Math.abs(st.velocity) < 1) st.velocity = 0;
        }

        const wrapped = mod(st.offset, st.setWidth);
        const shift = wrapped - st.offset;
        if (shift !== 0) {
          if (st.tween) st.tween.from += shift;
          if (st.dragging) st.startOffset += shift;
          st.offset = wrapped;
        }
        track.style.transform = `translate3d(${-st.offset}px,0,0)`;
      }

      frameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (frameId) return;
      last = performance.now();
      frameId = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visibilityObserver.observe(viewport);

    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const st = state.current;
    st.pressed = true;
    st.dragging = false;
    st.moved = false;
    st.pointerId = event.pointerId;
    st.startX = event.clientX;
    st.startOffset = st.offset;
    st.velocity = 0;
    st.tween = null;
    st.samples = [{ t: performance.now(), x: event.clientX }];
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const st = state.current;
    if (!st.pressed || event.pointerId !== st.pointerId) return;

    if (!st.dragging) {
      if (Math.abs(event.clientX - st.startX) < DRAG_THRESHOLD) return;
      st.dragging = true;
      st.moved = true;
      // recomeça do ponto atual para o arraste não "pular" os primeiros pixels
      st.startX = event.clientX;
      st.startOffset = st.offset;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }

    st.offset = st.startOffset - (event.clientX - st.startX);
    const now = performance.now();
    st.samples.push({ t: now, x: event.clientX });
    while (st.samples.length > 2 && now - st.samples[0].t > VELOCITY_WINDOW) {
      st.samples.shift();
    }
  }, []);

  const release = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const st = state.current;
    if (!st.pressed || event.pointerId !== st.pointerId) return;
    st.pressed = false;
    delete event.currentTarget.dataset.dragging;

    if (st.dragging) {
      st.dragging = false;
      const first = st.samples[0];
      const lastSample = st.samples[st.samples.length - 1];
      const span = lastSample.t - first.t;
      if (span > 0 && performance.now() - lastSample.t < VELOCITY_WINDOW) {
        const pointerSpeed = ((lastSample.x - first.x) / span) * 1000;
        st.velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, -pointerSpeed));
      }
    }
  }, []);

  const onPointerLeave = useCallback(() => {
    const st = state.current;
    // soltou fora da área antes de virar arraste: não deixa o carrossel preso
    if (st.pressed && !st.dragging) st.pressed = false;
  }, []);

  /** Depois de um arraste, o clique que o navegador dispara não pode abrir o produto. */
  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (state.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      state.current.moved = false;
    }
  }, []);

  /** Desloca o carrossel com animação suave (botões anterior/próximo). */
  const glideBy = useCallback((delta: number) => {
    const st = state.current;
    st.velocity = 0;
    st.tween = { from: st.offset, delta, start: performance.now() };
  }, []);

  /** Distância entre o início de um cartão e o do próximo (cartão + espaço). */
  const getStep = useCallback(() => {
    const cards = setRef.current?.children;
    if (!cards || cards.length < 2) return 0;
    return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
  }, []);

  /** Garante que um cartão focado pelo teclado fique visível dentro da área útil. */
  const revealElement = useCallback((element: HTMLElement) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const box = element.getBoundingClientRect();
    const area = viewport.getBoundingClientRect();
    const margin = Math.min(96, area.width * 0.08);
    if (box.left < area.left + margin) {
      glideBy(box.left - (area.left + margin));
    } else if (box.right > area.right - margin) {
      glideBy(box.right - (area.right - margin));
    }
  }, [glideBy]);

  return {
    viewportRef,
    trackRef,
    setRef,
    copies,
    glideBy,
    getStep,
    revealElement,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: release,
      onPointerCancel: release,
      onPointerLeave,
      onClickCapture,
    },
  };
}
