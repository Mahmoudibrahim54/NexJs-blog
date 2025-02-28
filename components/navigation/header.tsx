"use client";
import styles from "./bg-pattern.module.css";

import { DictionarySchema, Locale } from "@/types/dictionary";
import LanguageSelector from "./language-selector";
import LogoHolder from "./header-responsive-logo-holder";
import { useState, useCallback, useEffect } from "react";
import { Category } from "@/types/collection";
import Navigation from "./navigation";

const Header = ({
  locale,
  dictionary,
  categories,
}: {
  locale: Locale;
  dictionary: DictionarySchema;
  categories: Category[];
}) => {
  const { langDir } = locale;

  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const scroll = window.scrollY;
    console.log(scroll, isVisible);

    const shouldBeVisible = scroll <= 40;
    if (shouldBeVisible === isVisible) return;
    setIsVisible(shouldBeVisible);
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.body.addEventListener("touchmove", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("touchmove", handleScroll);
    };
  }, [isVisible, handleScroll]);

  return (
    <div
      className={` transform:translateY(-116px) sticky top-0 z-40 mb-0 flex max-h-[300] w-screen flex-col transition-[min-height] duration-500 ease-out ${
        !isVisible && "min-h-[40px] md:min-h-[70px]"
      }`}
    >
      <div className={`${styles.islamicBgPattern} z-30 min-h-[52] pb-2`}>
        {/* Header */}

        <div
          className={`absolute inset-0 z-10  h-full ${
            langDir === "rtl" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
          } from-white/95 via-white/70 to-white/30 `}
        />
        <div
          className={`absolute inset-0 z-10 h-full ${
            langDir === "rtl" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
          } from-black/95 via-black/70 to-black/30`}
        />

        <div className="flex h-full w-screen justify-between py-0 font-reem-kufi md:gap-12 md:px-24">
          <div className="relative z-20 flex w-full  flex-col items-center justify-center md:items-start ">
            <LogoHolder
              config={dictionary.config}
              locale={locale}
              isVisible={isVisible}
            />
          </div>
          <div className="z-20 flex h-full flex-col items-start justify-start">
            <LanguageSelector
              languageText={dictionary.header.changeLangButton}
              locale={locale}
            />
          </div>
        </div>
      </div>
      <div className="z-50">
        <Navigation
          locale={locale}
          dictionary={dictionary}
          categories={categories as Category[]}
          isVisible={isVisible}
        />
      </div>
    </div>
  );
};

export default Header;
