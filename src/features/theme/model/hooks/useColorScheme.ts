import { useThemeStore } from "../store/themeStore";
import { useState, useEffect } from "react";

export const useColorScheme = (): "light" | "dark" => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? "dark" : "light");
    };

    if (theme === "light") {
      mediaQuery.removeEventListener("change", handleChange);
      setColorScheme("light");
      return;
    } else if (theme === "dark") {
      mediaQuery.removeEventListener("change", handleChange);
      setColorScheme("dark");
      return;
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return colorScheme;
};
