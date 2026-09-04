import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";

export const I18N_LNG_KEY = "i18n-lng";
export const SUPPORTED_LOCALES = ["ru", "en"] as const;
export type TLocale = (typeof SUPPORTED_LOCALES)[number];

i18next.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: localStorage.getItem(I18N_LNG_KEY) ?? "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export { i18next };