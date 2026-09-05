export type TSlide = {
  id: string;
  title: string;
  annotation: string;
  detail: string;
  image?: string;
  isChecked: boolean;
};

export type TCarouselStore = {
  slides: TSlide[];
  markChecked: (id: string) => void;
};