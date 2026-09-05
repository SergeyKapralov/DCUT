import { Button, TextInput, Textarea } from "@mantine/core";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/Card";
import { Modal } from "@/shared/ui/Modal";
import { useHover } from "@/shared/model/hooks/useHover";
import { cn } from "@/shared/utils";
import { useCarouselStore } from "@/entities/carousel";
import {
  useCarouselAdd,
  useCarouselAutoplay,
  useCarouselControls,
  useCarouselDelete,
  useCarouselViewed,
} from "../model/hooks";

export const Carousel = () => {
  const slides = useCarouselStore((state) => state.slides);
  const { t } = useTranslation();
  const {
    emblaRef,
    emblaApi,
    canPrev,
    canNext,
    selectedIndex,
    snapCount,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useCarouselControls();
  const { isHovered, hoverHandlers } = useHover();
  const add = useCarouselAdd();
  const { deleteTarget, requestDelete, cancelDelete, confirmDelete } =
    useCarouselDelete();

  useCarouselViewed(emblaApi);
  useCarouselAutoplay(emblaApi, isHovered || add.open || deleteTarget !== null);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={scrollPrev}
          className="bg-bg-secondary border-border text-fg rounded-full p-2 transition opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>
        <div
          ref={emblaRef}
          {...hoverHandlers}
          className="min-w-0 flex-1 overflow-hidden"
        >
          <div className="flex gap-4">
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-0 flex-[0_0_18rem]">
                <Card
                  title={slide.title}
                  description={slide.annotation}
                  isChecked={slide.isChecked}
                  onDelete={() => requestDelete(slide)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Next"
          disabled={!canNext}
          onClick={scrollNext}
          className="bg-bg-secondary border-border text-fg rounded-full p-2 transition opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: snapCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1} / ${snapCount}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition",
              index === selectedIndex ? "bg-fg" : "bg-fg-secondary/40",
            )}
          />
        ))}
      </div>
      <Button leftSection={<Plus size={16} aria-hidden />} onClick={add.openModal}>
        {t("carousel.add_slide")}
      </Button>
      <Modal open={add.open} onClose={add.closeModal} title={t("carousel.add_slide")}>
        <form onSubmit={add.submit} className="flex flex-col gap-4">
          <TextInput
            label={t("carousel.title")}
            placeholder={t("carousel.title_placeholder")}
            value={add.title}
            onChange={(event) => add.setTitle(event.currentTarget.value)}
            error={add.error ? t("carousel.title_required") : undefined}
          />
          <Textarea
            label={t("carousel.annotation")}
            placeholder={t("carousel.annotation_placeholder")}
            autosize
            minRows={2}
            maxRows={5}
            value={add.annotation}
            onChange={(event) => add.setAnnotation(event.currentTarget.value)}
            classNames={{ input: "break-words" }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="subtle" onClick={add.closeModal}>
              {t("carousel.confirm_no")}
            </Button>
            <Button type="submit">{t("carousel.add_submit")}</Button>
          </div>
        </form>
      </Modal>
      <Modal
        open={deleteTarget !== null}
        onClose={cancelDelete}
        title={t("carousel.delete_title")}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-fg-secondary">{t("carousel.delete_confirm")}</p>
          <div className="flex justify-end gap-2">
            <Button variant="subtle" onClick={cancelDelete}>
              {t("carousel.confirm_no")}
            </Button>
            <Button onClick={confirmDelete}>{t("carousel.confirm_yes")}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};