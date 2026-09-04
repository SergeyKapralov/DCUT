export type TTheme = "auto" | "light" | "dark";

export type TThemeState = {
  theme: TTheme;
};

export type TThemeActions = {
  setTheme: (theme: TTheme) => void;
};

export type TThemeStore = TThemeState & TThemeActions;
