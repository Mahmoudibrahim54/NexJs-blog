import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  // console.log(text);
  // console.log(locale);

  const minutes = readingTime(text).minutes;
  const minutesRounded = Math.floor(minutes);
  if (locale == "ar") {
    if (minutesRounded <= 1) return "قراءة لمدة دقيقة واحدة";
    else if (minutesRounded == 2) return "قراءة لمدة دقيقتان";
    else if (minutesRounded > 2 && minutesRounded < 11)
      return `دقائق ${minutesRounded} قراءة لمدة`;
    else return `دقيقة ${minutes} قراءة لمدة`;
  }

  return readingTime(text).text;
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
