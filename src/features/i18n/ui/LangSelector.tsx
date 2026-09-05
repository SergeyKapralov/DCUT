import { Check } from "lucide-react";
import { Menu, UnstyledButton } from "@mantine/core";
import { SUPPORTED_LOCALES, type TLocale } from "../model/config";
import { cn } from "@/shared/utils";
import { useTrans } from "../model/useTrans";
import ru from "@/shared/asset/flags/ru.svg";
import us from "@/shared/asset/flags/us.svg";

const FLAGS: Record<TLocale, string> = { ru, en: us };

const Flag = ({ locale }: { locale: TLocale }) => {
  return (
    <img
      aria-hidden
      src={FLAGS[locale]}
      alt=""
      className="shadow-sm h-3.5 w-5 rounded-[2px]"
    />
  );
}

export const LangSelector = () => {
  const { t, selectedLang, selectLang } = useTrans();

  return (
    <Menu position="bottom-end" offset={8} withArrow>
      <Menu.Target>
        <UnstyledButton
          aria-label={t("lang.select")}
          className="text-fg hover:underline flex items-center gap-2 text-sm"
        >
          <Flag locale={selectedLang} />
          {t(`lang.${selectedLang}`)}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className="border-border bg-card text-fg">
        {SUPPORTED_LOCALES.map((locale) => {
          const selected = locale === selectedLang;

          return (
            <Menu.Item
              key={locale}
              onClick={() => selectLang(locale)}
              leftSection={<Flag locale={locale} />}
              rightSection={selected ? <Check size={16} /> : null}
              className={cn(
                "text-fg hover:bg-fg hover:text-bg",
                selected && "font-bold",
              )}
            >
              {t(`lang.${locale}`)}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}