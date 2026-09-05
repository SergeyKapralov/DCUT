import { useTranslation } from "react-i18next";
<<<<<<< Updated upstream
import { Carousel } from "@/widgets/carousel/ui/Carousel";
=======
import { useAuthStore } from "@/features/auth";
import { Carousel } from "@/widgets/carousel";
>>>>>>> Stashed changes

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center gap-8 py-8 text-fg">
      <div className="text-2xl font-bold">{t("pages.home_title")}</div>
      <Carousel />
    </div>
  );
};