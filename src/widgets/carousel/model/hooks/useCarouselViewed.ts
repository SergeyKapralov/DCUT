import { useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { useCarouselStore } from "@/entities/carousel";

export const useCarouselViewed = (emblaApi: EmblaCarouselType | undefined) => {
  useEffect(() => {
    if (!emblaApi) return;
    const markInView = () => {
      const { slides, markChecked } = useCarouselStore.getState();
      for (const index of emblaApi.slidesInView()) {
        const slide = slides[index];
        if (slide) markChecked(slide.id);
      }
    };
    markInView();
    emblaApi.on("scroll", markInView);
    emblaApi.on("reInit", markInView);
    return () => {
      emblaApi.off("scroll", markInView);
      emblaApi.off("reInit", markInView);
    };
  }, [emblaApi]);
};
