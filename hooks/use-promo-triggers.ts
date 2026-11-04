"use client";

import { useEffect, useRef, useState } from "react";

type PromoTriggers = {
  delayMs: number;
  scrollPercent: number;
  exitIntent: boolean;
};

/**
 * Dispara uma única vez quando delay, scroll ou exit-intent forem satisfeitos.
 * `enabled` deve ser false após o modal abrir ou se a campanha estiver inativa.
 */
export function usePromoTriggers(
  triggers: PromoTriggers,
  enabled: boolean
): boolean {
  const [fired, setFired] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!enabled || firedRef.current) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setFired(true);
    };

    const timers: number[] = [];
    const cleanups: Array<() => void> = [];

    if (triggers.delayMs > 0) {
      timers.push(window.setTimeout(fire, triggers.delayMs));
    }

    if (triggers.scrollPercent > 0) {
      const onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const pct = (window.scrollY / max) * 100;
        if (pct >= triggers.scrollPercent) fire();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    if (triggers.exitIntent) {
      const onMouseOut = (event: MouseEvent) => {
        if (event.clientY <= 0 && !event.relatedTarget) fire();
      };
      document.addEventListener("mouseout", onMouseOut);
      cleanups.push(() => document.removeEventListener("mouseout", onMouseOut));
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.forEach((fn) => fn());
    };
  }, [enabled, triggers.delayMs, triggers.scrollPercent, triggers.exitIntent]);

  return fired;
}
