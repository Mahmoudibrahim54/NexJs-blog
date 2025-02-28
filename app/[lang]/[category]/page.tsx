import { Post, Subcategory } from "@/types/collection";
import { notFound, usePathname } from "next/navigation";
import { getCategoryData } from "@/lib/api/get-data";
import { getCategoryStaticParams } from "@/lib/get-static-params";
import { getCategoryMetadata } from "@/lib/get-metadata";
import { redirect } from "next/navigation";
import { Lang } from "@/types/dictionary";

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: Lang;
  };
}) => {
  return await getCategoryMetadata(category, lang);
};

export const generateStaticParams = async () => {
  return await getCategoryStaticParams();
};

const Page = async ({
  params,
}: {
  params: { category: string; lang: Lang };
}) => {
  const category = await getCategoryData(params.category, params.lang, 1);

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

  if (!typeCorrectedCategory?.subcategories) {
    notFound();
  }
  if (!category) {
    notFound();
  }
  redirect(`/${category?.slug}/${category?.subcategories?.[0]?.slug}?page=1`);
};
export default Page;
