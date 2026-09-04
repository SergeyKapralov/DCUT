import { AppShell } from "@mantine/core";
import { ThemeSwitcher } from "@/features/theme/ui/ThemeSwitcher";
import dcut from "@/shared/asset/dcut.png";

export function Header() {
  return (
    <AppShell.Header className="border-border flex items-center justify-between border-b bg-card px-4">
      <img src={dcut} alt="DCUT" className="h-10 w-auto" />
      <ThemeSwitcher />
    </AppShell.Header>
  );
}