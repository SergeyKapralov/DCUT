import { useTranslation } from "react-i18next";
import { Carousel } from "@/widgets/carousel";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-fg flex w-full flex-col items-center gap-8 py-8">
      <div className="text-2xl font-bold">{t("pages.home_title")}</div>
      <Carousel />
    </div>
  );
};
