import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export const useCarouselControls = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(1);

  useEffect(() => {
    const onSelect = () => {
      setCanPrev(emblaApi?.canScrollPrev() ?? false);
      setCanNext(emblaApi?.canScrollNext() ?? true);
      setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0);
      setSnapCount(emblaApi?.scrollSnapList().length ?? 1);
    };
    onSelect();
    emblaApi?.on("select", onSelect);
    emblaApi?.on("reInit", onSelect);
    window.addEventListener("resize", onSelect);
    return () => {
      emblaApi?.off("select", onSelect);
      emblaApi?.off("reInit", onSelect);
      window.removeEventListener("resize", onSelect);
    };
  }, [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    canPrev,
    canNext,
    selectedIndex,
    snapCount,
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    scrollTo: (index: number) => emblaApi?.scrollTo(index),
  };
};