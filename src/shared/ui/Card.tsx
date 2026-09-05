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

export const Card = ({
  title,
  description,
  isChecked,
  onDelete,
}: TCardProps) => {
  const { t } = useTranslation();

  return (
    <MantineCard
      padding="md"
      radius="md"
      withBorder
      className="border-border bg-card text-fg flex h-full max-h-80 w-full max-w-sm flex-col gap-3 overflow-hidden"
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 grow [scrollbar-width:thin] overflow-x-auto whitespace-nowrap">
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
            className="text-fg-secondary hover:bg-bg-secondary hover:text-fg shrink-0 rounded-full p-1 transition"
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>
      <div className="max-h-40 min-h-0 grow [scrollbar-width:thin] overflow-y-auto pr-1 break-words">
        <Text size="sm" className="text-fg-secondary">
          {description}
        </Text>
      </div>
      <StatusBadge isChecked={isChecked} />
    </MantineCard>
  );
};
