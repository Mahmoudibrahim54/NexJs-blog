import { DictionarySchema } from "@/dictionaries/schema";
import { stringify } from "postcss";

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
  if (!locale || locale == undefined) {
    return dictionaries["ar"]();
  } else {
    return dictionaries[locale]();
  }
};
