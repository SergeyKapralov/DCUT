import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, type TLocale } from "@/app/i18n";
import { I18N_LNG_KEY } from "@/app/i18n";

export const useTrans = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = (i18n.resolvedLanguage ?? i18n.language) as TLocale;

  const selectLang = (lang: TLocale) => {
    if (!SUPPORTED_LOCALES.includes(lang)) return;
    void i18n.changeLanguage(lang);
    localStorage.setItem(I18N_LNG_KEY, lang);
  };

  return { t, selectedLang, selectLang };
}