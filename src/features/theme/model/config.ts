import type { TTheme } from "./types";
import { ALargeSmall, Moon, Sun } from "lucide-react";

export const OPTIONS: { value: TTheme; label: string }[] = [
  { value: "auto", label: "Авто" },
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
];

export const ICONS: Record<TTheme, typeof Sun> = {
  auto: ALargeSmall,
  light: Sun,
  dark: Moon,
};

export const THUMB_POSITION = [
  "translate-x-0",
  "translate-x-10",
  "translate-x-20",
];
