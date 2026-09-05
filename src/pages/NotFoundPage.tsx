import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-fg flex w-full flex-col items-center gap-4 py-16 text-center">
      <p className="text-7xl font-bold">404</p>
      <p className="text-fg-secondary">{t("pages.not_found_message")}</p>
      <Button renderRoot={(props) => <Link to="/" {...props} />}>
        {t("pages.not_found_back")}
      </Button>
    </div>
  );
};
