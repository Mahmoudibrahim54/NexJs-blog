import { Locale, getDictionary } from "@/lib/dictionary";
import MobileNave from "./mobile-nav";
import LargeScreenNav from "./pc-tablet-nav";
import { DictionarySchema } from "@/types/dictionary";
import TitleBg from "../layout/title-bg";

const Navigation = async ({ locale }: { locale: Locale }) => {
  const dictionary: DictionarySchema = await getDictionary(locale);
  return (
    <TitleBg tw={{ bg: "sticky top-0 z-[999] w-screen" }}>
      <MobileNave locale={locale} dictionary={dictionary} />
      <LargeScreenNav locale={locale} dictionary={dictionary.navigation} />
    </TitleBg>
  );
};

export default Navigation;
