import { useEffect, useRef } from "react";
import type { EmblaCarouselType } from "embla-carousel";

const AUTOPLAY_INTERVAL = 2500;

export const useCarouselAutoplay = (
  emblaApi: EmblaCarouselType | undefined,
  paused: boolean,
) => {
  const directionRef = useRef<1 | -1>(1);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const timer = window.setInterval(() => {
      const canNext = emblaApi.canScrollNext();
      const canPrev = emblaApi.canScrollPrev();
      if (!canNext && !canPrev) {
        directionRef.current = 1;
        return;
      }
      if (directionRef.current === 1) {
        if (canNext) {
          emblaApi.scrollNext();
        } else {
          directionRef.current = -1;
          emblaApi.scrollPrev();
        }
      } else if (canPrev) {
        emblaApi.scrollPrev();
      } else {
        directionRef.current = 1;
        emblaApi.scrollNext();
      }
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused]);
};
