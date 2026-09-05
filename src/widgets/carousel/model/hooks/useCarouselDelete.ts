import { useState } from "react";
import { useCarouselStore } from "@/entities/carousel/model/store/carouselStore";
import type { TSlide } from "@/entities/carousel/model/types";

export const useCarouselDelete = () => {
  const removeSlide = useCarouselStore((state) => state.removeSlide);
  const [deleteTarget, setDeleteTarget] = useState<TSlide | null>(null);

  const requestDelete = (slide: TSlide) => setDeleteTarget(slide);

  const cancelDelete = () => setDeleteTarget(null);

  const confirmDelete = () => {
    if (deleteTarget) removeSlide(deleteTarget.id);
    setDeleteTarget(null);
  };

  return { deleteTarget, requestDelete, cancelDelete, confirmDelete };
};