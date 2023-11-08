interface I18nConfig {
  defaultLocale: string;
  locales: string[];
}

export const i18n: I18nConfig = {
  defaultLocale: "ar",
  locales: ["ar", "en"],
};
