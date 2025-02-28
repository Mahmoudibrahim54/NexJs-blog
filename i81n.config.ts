import { Locale } from "./types/dictionary";

interface I18nConfig {
  defaultLocale: Locale;
  locales: { [x: string]: Locale };
}

export const i18n: I18nConfig = {
  defaultLocale: { lang: "ar", langDir: "rtl" },
  locales: {
    ar: { lang: "ar", langDir: "rtl" },
    en: { lang: "en", langDir: "ltr" },
  },
};
