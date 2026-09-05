import { createPersistedStore } from "@/shared/utils";
import { INITIAL_SLIDES } from "../config";
import type { TCarouselStore } from "../types";

export const useCarouselStore = createPersistedStore<TCarouselStore>(
  "carousel-v2",
  (set) => ({
    slides: INITIAL_SLIDES,
    markChecked: (id) =>
      set((state) => {
        const slide = state.slides.find((slide) => slide.id === id);
        if (slide) slide.isChecked = true;
      }),
  }),
);