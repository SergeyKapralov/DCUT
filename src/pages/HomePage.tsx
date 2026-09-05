import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/features/auth/model/store/authStore";
import { Carousel } from "@/widgets/carousel/ui/Carousel";

export const HomePage = () => {
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center gap-8 py-8 text-fg">
      <div className="text-2xl font-bold">{t("pages.home_title")}</div>
      <div className="border-border flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
        <div>{t("pages.logged_in")}</div>
        <button type="button" onClick={logout}>
          {t("pages.logout")}
        </button>
      </div>
      <Carousel />
    </div>
  );
};