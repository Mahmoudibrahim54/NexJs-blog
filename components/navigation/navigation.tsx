"use client";

import MobileNave from "./mobile-nav";
import LargeScreenNav from "./pc-tablet-nav";
import { DictionarySchema, Locale } from "@/types/dictionary";
import ListTitleBg from "../layout/title-bg";
import { Category } from "@/types/collection";

const Navigation = ({
  locale,
  categories,
  dictionary,
  isVisible,
}: {
  locale: Locale;
  categories: Category[];
  dictionary: DictionarySchema;
  isVisible: boolean;
}) => {
  return (
    <div>
      <ListTitleBg isBg={true} tw={{ main: `z-50` }}>
        <MobileNave
          locale={locale}
          dictionary={dictionary}
          categories={categories as Category[]}
          isVisible={isVisible}
        />
      </ListTitleBg>
      <ListTitleBg isBg={true} tw={{ main: `z-50 ` }}>
        <LargeScreenNav
          dictionary={dictionary.navigation}
          categories={categories as Category[]}
          isVisible={isVisible}
        />
      </ListTitleBg>
    </div>
  );
};

export default Navigation;
