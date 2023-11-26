import { PaddingContainer } from "@/components/layout/padding-container";
import PostList from "@/components/posts/post-lists";
import { client } from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { Locale, getDictionary } from "@/lib/dictionary";
import { cache } from "react";
import { DictionarySchema } from "@/types/dictionary";
import CategoryGrid from "@/components/category/category-grid";

export const getCategoryData = cache(
  async (categorySlug: string, locale: Locale) => {
    try {
      const category = await client.items("category").readByQuery({
        filter: {
          slug: {
            _eq: categorySlug,
          },
        },
        fields: [
          "*",
          "posts.*",
          "posts.category.*",
          "translations.*",
          "posts.category.translations.*",
          "posts.translations.*",
        ],
      });

      if (locale === "ar") {
        return category?.data?.[0];
      } else {
        const fetchedCategory = category?.data?.[0];
        const localizedCategory = {
          ...fetchedCategory,
          title: fetchedCategory?.translations?.[0]?.title,
          description: fetchedCategory?.translations?.[0]?.description,
          posts: fetchedCategory?.posts?.map((post: any) => {
            return {
              ...post,
              title: post?.translations?.[0]?.title,
              description: post?.translations?.[0]?.description,
              body: post?.translations?.[0]?.body,
              category: {
                ...post.category,
                title: post?.category?.translations?.[0]?.title,
              },
            };
          }),
        };
        return localizedCategory;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  },
);

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: Locale;
  };
}) => {
  // Get Data from Directus
  const categoryData = await getCategoryData(category, lang);

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

export const generateStaticParams = async () => {
  try {
    const categories = await client.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localizedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "ar",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error st static params ");
  }
};

const Page = async ({
  params,
}: {
  params: { category: string; lang: Locale };
}) => {
  const locale = params.lang;

  const getCategoriesData = async () => {
    try {
      const category = await client.items("category").readByQuery({
        fields: [
          "*",
          "posts.*",
          "posts.category.*",
          "translations.*",
          "posts.translations.*",
        ],
      });

      if (locale === "ar") return category?.data;
      else {
        const fetchedCategories = category.data;

        const localizedData = fetchedCategories?.map((category) => {
          return {
            ...category,
            title: category?.translations?.[0].title,
            description: category?.translations?.[0]?.description,
            posts: category?.posts?.map((post: any) => {
              return {
                ...post,
                title: post?.translations?.[0]?.title,
                description: post?.translations?.[0]?.description,
                body: post?.translations?.[0]?.body,
                featured: post?.translations?.[0]?.featured,

                category: {
                  ...post.category,
                  title: post?.category?.translations?.[0]?.title,
                  description: post?.category?.translations?.[0]?.description,
                },
              };
            }),
          };
        });

        return localizedData;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching data");
    }
  };

  const categoriesPosts = await getCategoriesData();

  const dictionary = await getDictionary(locale);

  const category = await getCategoryData(params.category, params.lang);

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    slug: string;
    description?: string;
    color: string;
    posts: Post[];
    featured: boolean;
    translations: { title: string; description: string };
  };

  if (!typeCorrectedCategory?.posts?.[0]?.id) {
    notFound();
  }
  if (!categoriesPosts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <CategoryGrid
        locale={locale}
        categories={categoriesPosts}
        dictionary={dictionary}
        layout="categoryList"
      />
    </PaddingContainer>
  );
};
export default Page;
