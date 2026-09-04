import { useTranslation } from "react-i18next";
import { cn } from "@/shared/utils";
import { useThemeStore } from "../model/store/themeStore";
import { OPTIONS, ICONS, THUMB_POSITION } from "../model/config";

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { t } = useTranslation();

  const activeIndex = OPTIONS.findIndex((option) => option === theme);

  return (
    <div className="relative inline-flex items-center rounded-full bg-bg-secondary p-1">
      <span
        aria-hidden
        className={cn(
          "absolute top-1 left-1 h-10 w-10 rounded-full bg-fg transition-transform duration-300 ease-out",
          THUMB_POSITION[activeIndex],
        )}
      />
      {OPTIONS.map((value) => {
        const active = theme === value;
        const Icon = ICONS[value];
        const label = t(`theme.${value}`);

        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className="flex h-10 w-10 items-center justify-center rounded-full"
          >
            <Icon
              size={20}
              aria-hidden
              className={cn("z-1", active ? "text-bg" : "text-fg-secondary")}
            />
          </button>
        );
      })}
    </div>
  );
}

