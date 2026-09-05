import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";

const getSystemColorScheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useColorScheme = (): "light" | "dark" => {
  const theme = useThemeStore((state) => state.theme);
  const [systemColorScheme, setSystemColorScheme] = useState<"light" | "dark">(
    getSystemColorScheme,
  );

  useEffect(() => {
    if (theme !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemColorScheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  return systemColorScheme;
};
