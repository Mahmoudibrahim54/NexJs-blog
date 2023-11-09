import styles from "./bg-pattern.module.css";

import Link from "next/link";
import { Locale, getDictionary } from "@/utils/get-dictionary";
import { DictionarySchema } from "@/types/dictionary";
import LanguageSelector from "./language-selector";

const Header = async ({ locale }: { locale: Locale }) => {
  const dictionary: DictionarySchema = await getDictionary(locale);

  return (
    <div
      className={`${styles.styleOne} relative z-[999] mb-0 w-screen border-b `}
    >
      {/* Header */}

      <div
        className={`absolute inset-0 z-10 ${
          locale === "ar" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
        } from-white/95 via-white/70 to-white/30`}
      />
      <div
        className={`absolute inset-0 z-10 ${
          locale === "ar" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
        } from-black/95 via-black/70 to-black/30`}
      />

      <div className="relative z-20 flex w-screen items-center justify-around px-24">
        <div className="flex w-screen items-center justify-between">
          <div className="relative flex flex-col items-start   justify-center py-5 md:items-start">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-200">
                {dictionary.header.textOne}
              </h1>
              <div className="text-2xl font-bold text-gray-200">
                {dictionary.header.textTow}{" "}
              </div>
            </Link>
          </div>
          <div>
            <LanguageSelector
              languageText={dictionary.header.changeLangButton}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
