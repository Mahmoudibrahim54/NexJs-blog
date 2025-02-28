import {
  getCategoryData,
  getPostData,
  getSubcategoryData,
} from "./api/get-data";
import { Lang } from "@/types/dictionary";

export const getCategoryMetadata = async (category: string, lang: Lang) => {
  // Get Data from Directus
  const categoryData = await getCategoryData(category, lang, 1);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "ar-SA": `${process.env.NEXT_PUBLIC_SITE_URL}/ar/${category}`,
      },
    },
  };
};
export const getSubcategoryMetadata = async (
  category: string,
  subcategory: string,
  lang: Lang,
) => {
  // Get Data from Directus
  const subcategoryData = await getSubcategoryData(subcategory, lang);

  return {
    title: subcategoryData?.title,
    description: subcategoryData?.description,
    openGraph: {
      title: subcategoryData?.title,
      description: subcategoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${subcategory}/${category}`,
      siteName: subcategoryData?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}/${subcategory}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}/${subcategory}`,
        "ar-SA": `${process.env.NEXT_PUBLIC_SITE_URL}/ar/${category}/${subcategory}`,
      },
    },
  };
};

export const getPostMetadata = async (slug: string, lang: Lang) => {
  // Get Post Data from Directus
  const post = await getPostData(slug, lang as Lang);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      siteName: post?.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "ar-SA": `${process.env.NEXT_PUBLIC_SITE_URL}/ar/post/${slug}`,
      },
    },
  };
};
