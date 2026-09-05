import { createTheme, MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";
import { useThemeStore } from "@/features/theme";

const theme = createTheme({
  fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif",
});

export const RootProviders = ({ children }: { children: ReactNode }) => {
  const themeMode = useThemeStore((state) => state.theme);
  const forceColorScheme = themeMode === "auto" ? undefined : themeMode;

  return (
    <MantineProvider theme={theme} forceColorScheme={forceColorScheme}>
      {children}
    </MantineProvider>
  );
};
