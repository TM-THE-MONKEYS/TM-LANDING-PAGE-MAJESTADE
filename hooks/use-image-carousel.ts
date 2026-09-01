"use client";

import { useCallback, useEffect, useState } from "react";

type UseImageCarouselOptions = {
  total: number;
  initialIndex?: number;
  loop?: boolean;
};

export function useImageCarousel({
  total,
  initialIndex = 0,
  loop = true,
}: UseImageCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goTo = useCallback(
    (index: number) => {
      if (total <= 0) return;
      if (loop) {
        const wrapped = ((index % total) + total) % total;
        setCurrentIndex(wrapped);
        return;
      }
      setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
    },
    [loop, total]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return {
    currentIndex,
    goTo,
    goNext,
    goPrev,
    canGoPrev: loop || currentIndex > 0,
    canGoNext: loop || currentIndex < total - 1,
  };
}
