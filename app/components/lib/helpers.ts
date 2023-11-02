import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string) => {
  console.log(readingTime(text).text);
  return readingTime(text).text;
};

export const getRelativeDate = (date: string) => {
  return DateTime.fromISO(date).toRelative();
};
