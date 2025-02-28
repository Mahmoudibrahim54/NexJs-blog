import { PaddingContainer } from "@/components/layout/padding-container";
import { Post, Subcategory } from "@/types/collection";
import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import CategoryGrid from "@/components/category/category-grid";
import { getCategoryData, getSubcategoryPages } from "@/lib/api/get-data";
import { getSubcategoryStaticParams } from "@/lib/get-static-params";
import { getSubcategoryMetadata } from "@/lib/get-metadata";
import ListTitleBg from "@/components/layout/title-bg";
import { Lang, Locale } from "@/types/dictionary";
import { i18n } from "@/i81n.config";

// Generate Metadata Function
export const generateMetadata = async ({
  params: { subcategory, category, lang },
}: {
  params: {
    subcategory: string;
    category: string;
    lang: Lang;
  };
}) => {
  return await getSubcategoryMetadata(category, subcategory, lang);
};

export const generateStaticParams = async () => {
  return await getSubcategoryStaticParams();
};

const Page = async ({
  params,
  searchParams,
}: {
  params: {
    category: string;
    lang: Lang;
    subcategory: string;
    data: Post[];
    total: number;
  };
  searchParams: { page: string; query: string };
}) => {
  !searchParams.page &&
    redirect(`/${params.category}/${params.subcategory}?page=1`);

  const locale = i18n.locales[params.lang];

  const { lang } = locale;

  const dictionary = await getDictionary(lang);

  const category = await getCategoryData(
    params.category,
    params.lang,
    parseInt(searchParams.page || "1"),
    1,
  );

  console.log(category?.subcategories?.[0]?.posts?.[0]?.slug);

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    slug: string;
    description?: string;
    color: string;
    posts: Post[];
    subcategories: Subcategory[];
    featured: boolean;
    translations: { title: string; description: string };
  };

  if (!typeCorrectedCategory?.subcategories?.[0]?.posts?.[0]?.id) {
    notFound();
  }
  if (!category) {
    notFound();
  }

  return (
    <PaddingContainer>
      <ListTitleBg
        link={"/" + params.category}
        iconDim={"20px"}
        title={typeCorrectedCategory?.title}
        tw={{
          bg: "rounded-t-md h-[20] w-64 h-full",
          overlay: "rounded-t-md w-64 h-[20]  w-auto h-full",
          main: "text-lg md:text-2xl",
        }}
      />

      <CategoryGrid
        categoryData={{
          slug: typeCorrectedCategory.slug,
          title: typeCorrectedCategory.title,
        }}
        locale={locale}
        categories={category?.subcategories}
        dictionary={dictionary}
        layout="categoryList"
        currentSubcategory={{ slug: params.subcategory }}
        totalRecordsNum={200}
      />
    </PaddingContainer>
  );
};

export default Page;
