export const I18N_LNG_KEY = "i18n-lng";
export const SUPPORTED_LOCALES = ["ru", "en"] as const;
export type TLocale = (typeof SUPPORTED_LOCALES)[number];
