import { createPersistedStore } from "@/shared/utils";
import type { TThemeStore, TThemeState, TTheme } from "../types";

const initialState: TThemeState = {
  theme: "auto",
};

const applyColorScheme = (theme: TTheme) => {
  const root = document.documentElement;
  if (theme === "auto") root.removeAttribute("data-color-scheme");
  else root.setAttribute("data-color-scheme", theme);
};

export const useThemeStore = createPersistedStore<TThemeStore>(
  "theme",
  (set) => ({
    ...initialState,
    setTheme: (theme) =>
      set((state) => {
        state.theme = theme;
      }),
  }),
);

applyColorScheme(useThemeStore.getState().theme);
useThemeStore.subscribe((state) => applyColorScheme(state.theme));
