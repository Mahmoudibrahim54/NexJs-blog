interface I18Config {
  defaultLocale: string;
  locales: string[];
}

export const i18: I18Config = {
  defaultLocale: "ar",
  locales: ["ar", "en"],
};
