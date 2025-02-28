import {  getDictionary } from "@/lib/dictionary";
import ListTitleBg from "../layout/title-bg";
import CategoryGrid from "../category/category-grid";
import { Locale } from "@/types/dictionary";

const SideNav = async ({ locale }: { locale: Locale }) => {

  const { lang } = locale;

  const dictionary = await getDictionary(lang);

  return (
    <div className="mx-auto h-[1000px] w-full  max-w-screen-2xl px-3  md:px-8 lg:my-9 lg:me-10 lg:w-[350px] lg:px-0">
      <ListTitleBg
        iconDim={"15px"}
        title={dictionary.mainPage.sideNav}
        tw={{
          bg: "rounded-t-md h-[12] w-auto h-full",
          overlay: "rounded-t-md  h-[12]  w-auto h-full",
        }}
      />
      <ListTitleBg
        isBg={true}
        tw={{
          bg: "rounded-t-md h-[900px] ",
          overlay: "rounded-t-md h-[900px] ",
        }}
      >
        {/* <CategoryGrid
          categoryData={{
            slug: "/",
            title: dictionary.navigation.links.allCategoriesSelection,
          }}
          locale={locale}
          categories={categoriesPosts}
          layout="mainPage"
          dictionary={dictionary}
        /> */}
      </ListTitleBg>
    </div>
  );
};

export default SideNav;
