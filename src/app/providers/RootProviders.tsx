import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";
import { useThemeStore } from "@/features/theme/model/store/themeStore";

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);
  const forceColorScheme = theme === "auto" ? undefined : theme;

  return (
    <MantineProvider forceColorScheme={forceColorScheme}>
      {children}
    </MantineProvider>
  );
}