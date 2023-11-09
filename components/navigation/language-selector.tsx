"use client";
import { Locale } from "@/utils/get-dictionary";
import { ArrowLeftRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const LanguageSelector = ({
  locale,
  languageText,
}: {
  locale: Locale;
  languageText: string;
}) => {
  const router = useRouter();

  const targetLanguage = locale === "en" ? "ar" : "en";
  const pathname = usePathname();
  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  const newPath = redirectTarget();

  return (
    <button
      className="bg-button-primary-color active:text-button-primary-color flex h-10 w-28 items-center justify-around rounded-md text-primary-color active:bg-primary-color"
      onClick={() => {
        router.push(newPath);
      }}
    >
      <ArrowLeftRight />
      {languageText}
    </button>
  );
};

export default LanguageSelector;
