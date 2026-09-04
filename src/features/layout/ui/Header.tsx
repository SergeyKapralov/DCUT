import { AppShell } from "@mantine/core";
import { LangSelector } from "@/features/i18n/ui/LangSelector";
import { ThemeSwitcher } from "@/features/theme/ui/ThemeSwitcher";
import dcut from "@/shared/asset/dcut.png";

export const Header = () => {
  return (
    <AppShell.Header className="border-border flex flex-wrap items-center gap-2 border-b bg-card px-4 py-2 sm:gap-3">
      <img src={dcut} alt="DCUT" className="h-8 w-auto sm:h-10" />
      <div className="ml-auto flex items-center gap-3">
        <LangSelector />
        <ThemeSwitcher />
      </div>
    </AppShell.Header>
  );
}