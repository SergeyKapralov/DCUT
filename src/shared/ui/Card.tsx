import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card as MantineCard, Text } from "@mantine/core";
import { StatusBadge } from "@/shared/ui/StatusBadge";

type TCardProps = {
  title: string;
  description: string;
  isChecked: boolean;
  onDelete?: () => void;
};

export const Card = ({ title, description, isChecked, onDelete }: TCardProps) => {
  const { t } = useTranslation();

  return (
    <MantineCard
      padding="md"
      radius="md"
      withBorder
      className="flex h-full max-h-80 w-full max-w-sm flex-col gap-3 overflow-hidden border-border bg-card text-fg"
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 grow overflow-x-auto whitespace-nowrap [scrollbar-width:thin]">
          <Text fw={500} className="text-fg">
            {title}
          </Text>
        </div>
        {onDelete && (
          <button
            type="button"
            aria-label={t("card.delete")}
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="shrink-0 rounded-full p-1 text-fg-secondary transition hover:bg-bg-secondary hover:text-fg"
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>
      <div className="min-h-0 max-h-40 grow overflow-y-auto pr-1 [scrollbar-width:thin]">
        <Text size="sm" className="text-fg-secondary">
          {description}
        </Text>
      </div>
      <StatusBadge isChecked={isChecked} />
    </MantineCard>
  );
};