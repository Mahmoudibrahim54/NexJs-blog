import { DictionarySchema } from "@/types/dictionary";

export type Locale = "en" | "ar";

const dictionaries = {
  ar: () =>
    import("@/dictionaries/ar.json").then(
      (module): DictionarySchema => module.default,
    ),
  en: () =>
    import("@/dictionaries/en.json").then(
      (module): DictionarySchema => module.default,
    ),
};

export const getDictionary = async (locale: Locale) => {
  if (!locale || locale == undefined || (locale !== "en" && locale !== "ar")) {
    return dictionaries["ar"]();
  } else {
    return dictionaries[locale]();
  }
};
