import { createPersistedStore } from "@/shared/utils";
import { INITIAL_SLIDES } from "../config";
import type { TCarouselStore, TSlide } from "../types";

export const useCarouselStore = createPersistedStore<TCarouselStore>(
  "carousel-v4",
  (set) => ({
    slides: INITIAL_SLIDES,
    addSlide: (data) =>
      set((state) => {
        const slide: TSlide = {
          id: crypto.randomUUID(),
          ...data,
          isChecked: false,
        };
        state.slides.push(slide);
      }),
    removeSlide: (id) =>
      set((state) => {
        state.slides = state.slides.filter((slide) => slide.id !== id);
      }),
    markChecked: (id) =>
      set((state) => {
        const slide = state.slides.find((slide) => slide.id === id);
        if (slide) slide.isChecked = true;
      }),
  }),
);
