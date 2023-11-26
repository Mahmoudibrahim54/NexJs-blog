import styles from "./bg-pattern.module.css";

import Link from "next/link";
import { Locale, getDictionary } from "@/lib/dictionary";
import { DictionarySchema } from "@/types/dictionary";
import LanguageSelector from "./language-selector";
import Image from "next/image";

const Header = async ({ locale }: { locale: Locale }) => {
  const dictionary: DictionarySchema = await getDictionary(locale);

  return (
    <div
      className={`${styles.islamicBgPattern}   relative z-[999] mb-0 h-24 w-screen`}
    >
      {/* Header */}

      <div
        className={`absolute inset-0 z-10  ${
          locale === "ar" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
        } from-white/95 via-white/70 to-white/30`}
      />
      <div
        className={`absolute inset-0 z-10 ${
          locale === "ar" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
        } from-black/95 via-black/70 to-black/30`}
      />

      <div className=" relative z-20 flex h-full w-screen  items-center justify-between px-4 font-reem-kufi md:gap-12 md:px-24">
        <div className="relative flex h-20 flex-col items-center  justify-center md:items-start">
          <Link href={`/`}>
            <Image
              src={`${
                locale === "ar"
                  ? `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_ar.png`
                  : `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_en.png`
              }`}
              alt={dictionary.config.siteName}
              width={`${locale === "ar" ? "270" : "400"}`}
              height="100"
            />
          </Link>
        </div>
        <div className="flex h-full flex-col items-start justify-start">
          <LanguageSelector
            languageText={dictionary.header.changeLangButton}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
