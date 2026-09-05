<<<<<<< Updated upstream
import { useState, type SubmitEvent } from "react";
import { useCarouselStore } from "@/entities/carousel/model/store/carouselStore";
=======
import { useState, type FormEvent } from "react";
import { useCarouselStore } from "@/entities/carousel";
>>>>>>> Stashed changes

export const useCarouselAdd = () => {
  const addSlide = useCarouselStore((state) => state.addSlide);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [error, setError] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
    setTitle("");
    setAnnotation("");
    setError(false);
  };

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError(true);
      return;
    }
    addSlide({ title: trimmedTitle, annotation: annotation.trim() });
    closeModal();
  };

  return {
    open,
    error,
    title,
    annotation,
    openModal,
    closeModal,
    setTitle,
    setAnnotation,
    submit,
  };
};