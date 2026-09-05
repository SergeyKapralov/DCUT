import { AppShell } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <AppShell.Footer className="border-border bg-card text-fg-secondary flex items-center justify-center border-t">
      {t("layout.made_by")}
    </AppShell.Footer>
  );
};
