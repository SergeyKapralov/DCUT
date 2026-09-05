export type TSlide = {
  id: string;
  title: string;
  annotation: string;
  isChecked: boolean;
};

export type TCarouselStore = {
  slides: TSlide[];
  addSlide: (data: Pick<TSlide, "title" | "annotation">) => void;
  removeSlide: (id: string) => void;
  markChecked: (id: string) => void;
};
