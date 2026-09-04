import { AppShell } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <AppShell.Footer className="border-border flex items-center justify-center border-t bg-card text-fg-secondary">
      {t("layout.made_by")}
    </AppShell.Footer>
  );
}