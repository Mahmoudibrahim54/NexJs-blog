import { DictionarySchema } from "@/dictionaries/schema";
import { Locale, getDictionary } from "@/utils/get-dictionary";
import styles from "./bg-pattern.module.css";
import MobileNave from "./monile-nav";
import LargeScreenNav from "./pc-tablet-nav";

const Navigation = async ({ locale }: { locale: Locale }) => {
  const dictionary: DictionarySchema = await getDictionary(locale);

  return (
    <div
      className={`${styles.styleOne} top-50 sticky z-[999]  mt-0 w-screen  border-b`}
    >
      {/*Sticky Navigation Bar */}

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <div className="border-t bg-white bg-opacity-30 py-1 backdrop-blur-md  ">
          <MobileNave locale={locale} dictionary={dictionary} />
          <LargeScreenNav locale={locale} dictionary={dictionary.navigation} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
