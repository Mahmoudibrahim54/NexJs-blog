import { DateTime } from "luxon";
import { Locale } from "./get-dictionary";

export const getReadingTime = (text: string, locale: string) => {
  if (text?.length) {
    const words = Math.ceil(text.length / 5);

    const minuets = Math.ceil(words / 238);

    if (locale == "ar") {
      if (minuets <= 1) return "قراءة لمدة دقيقة واحدة";
      else if (minuets == 2) return "قراءة لمدة دقيقتان";
      else if (minuets > 2 && minuets < 11)
        return ` قراءة لمدة ${minuets} دقائق`;
      else return `قراءة لمدة  ${minuets} دقيقة  `;
    } else return `${minuets} Minutes Read`;
  }
};

export const getRelativeDate = (date: string, locale: Locale) => {
  if (date) return DateTime.fromISO(date).setLocale("EN").toRelative();
  else return "";
};
