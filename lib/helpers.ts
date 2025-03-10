import { DateTime } from "luxon";
import { Lang } from "@/types/dictionary";

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

export const getRelativeDate = (date: string, locale: Lang) => {
  const DateLocale = locale === "ar" ? "ar-EG" : "en-US";

  if (date) return DateTime.fromISO(date).setLocale(DateLocale).toRelative();
  else return "";
};
