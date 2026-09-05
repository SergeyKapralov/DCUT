import { useTranslation } from "react-i18next";
import { CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@mantine/core";
import { cn } from "@/shared/utils";

export const StatusBadge = ({ isChecked }: { isChecked: boolean }) => {
  const { t } = useTranslation();

  return (
    <Badge
      radius="xl"
      className={cn(
        "w-fit text-xs font-normal tracking-normal normal-case",
        isChecked ? "bg-fg text-bg" : "bg-bg-secondary text-fg-secondary",
      )}
      leftSection={
        isChecked ? (
          <CheckCircle2 size={14} aria-hidden />
        ) : (
          <Circle size={14} aria-hidden />
        )
      }
    >
      {isChecked ? t("card.checked") : t("card.not_checked")}
    </Badge>
  );
};
