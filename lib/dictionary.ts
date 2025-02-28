import { DictionarySchema, Lang } from "@/types/dictionary";

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

export const getDictionary = async (lang: Lang) => {
  if (!lang || lang == undefined || (lang !== "en" && lang !== "ar")) {
    return dictionaries["ar"]();
  } else {
    return dictionaries[lang]();
  }
};
