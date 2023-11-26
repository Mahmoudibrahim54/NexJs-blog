"use client";
import { Locale } from "@/lib/dictionary";
import { ArrowLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

const LanguageSelector = ({
  locale,
  languageText,
}: {
  locale: Locale;
  languageText: string;
}) => {
  const pathname = usePathname();

  const targetLanguage = locale === "en" ? "ar" : "en";

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
        locale={locale}
        className="hidden h-10 w-28 items-center justify-around rounded-b-md bg-primary-color font-extrabold text-button-primary-color active:bg-primary-color active:text-button-primary-color md:flex"
        onClick={() => {
          setCookie("BROWSER_LANGUAGE", targetLanguage);
        }}
      >
        <ArrowLeftRight />
        {languageText}
      </Link>
      <Link
        href={newPath}
        locale={locale}
        className="h-42 flex w-16 items-center justify-center gap-1 rounded-b-md bg-button-primary-color font-bold text-button-primary-color md:hidden"
        onClick={() => {
          setCookie("BROWSER_LANGUAGE", targetLanguage);
        }}
      >
        <span>{targetLanguage === "en" ? "AR" : "EN "}</span>
        {targetLanguage.toUpperCase()}
      </Link>
    </div>
  );
};

export default LanguageSelector;
