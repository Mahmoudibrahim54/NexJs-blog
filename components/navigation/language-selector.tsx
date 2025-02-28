"use client";
import { Translate } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { Locale } from "@/types/dictionary";

const LanguageSelector = ({
  locale,
  languageText,
}: {
  locale: Locale;
  languageText: string;
}) => {
  const { lang } = locale;

  const pathname = usePathname();

  const targetLanguage = lang === "en" ? "ar" : "en";

  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  const newPath = redirectTarget() as string;

  return (
    <div className="font-noto-kufi">
      <Link
        href={newPath}
        locale={lang}
        className="hidden h-10 w-28 items-center justify-around rounded-b-md bg-primary-color font-extrabold text-button-primary-color hover:bg-secondary-color active:bg-primary-color active:text-button-primary-color md:flex"
        onClick={() => {
          setCookie("BROWSER_LANGUAGE", targetLanguage);
        }}
      >
        {languageText}
        <Translate
          fontSize="medium"
          sx={{ color: "var(--button-primary-color)" }}
        />
      </Link>
      <Link
        href={newPath}
        locale={lang}
        className="h-42 flex w-16 items-center justify-center gap-1 rounded-b-md bg-primary-color font-bold text-neutral-300  md:hidden"
        onClick={() => {
          setCookie("BROWSER_LANGUAGE", targetLanguage);
        }}
      >
        <span>{targetLanguage === "en" ? "ar" : "en"} | </span>
        {targetLanguage.toUpperCase()}
      </Link>
    </div>
  );
};

export default LanguageSelector;
