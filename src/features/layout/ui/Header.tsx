import { AppShell } from "@mantine/core";
import { LangSelector } from "@/features/i18n";
import { ThemeSwitcher } from "@/features/theme";
import { LogoutButton } from "@/features/layout/ui/LogoutButton";
import { useAuthStore } from "@/features/auth";
import dcut from "@/shared/asset/dcut.png";

export const Header = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <AppShell.Header className="border-border bg-card flex flex-wrap items-center gap-2 border-b px-4 py-2 sm:gap-3">
      <img src={dcut} alt="DCUT" className="h-8 w-auto sm:h-10" />
      <div className="ml-auto flex items-center gap-3">
        <LangSelector />
        <ThemeSwitcher />
        {token && <LogoutButton />}
      </div>
    </AppShell.Header>
  );
};
