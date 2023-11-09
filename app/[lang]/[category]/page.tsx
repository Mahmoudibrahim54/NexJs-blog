import { PaddingContainer } from "@/components/layout/padding-container";
import PostList from "@/components/posts/post-lists";
import { client } from "@/utils/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { Locale } from "@/utils/get-dictionary";

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

  const getCategoryData = async () => {
    try {
      const category = await client.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },
        fields: [
          "*",
          "posts.*",
          "posts.category.*",
          "translations.*",
          "posts.category.translations.*",
        ],
      });

      if (locale === "ar") {
        return category?.data?.[0];
      } else {
        const fetchedCategory = category?.data?.[0];
        const localizedCategory = {
          ...fetchedCategory,
          title: fetchedCategory.translations[0].title,
          description: fetchedCategory.translations[0].description,
          posts: fetchedCategory.posts.map((post: any) => {
            return {
              ...post,
              title: post.translations[0].title,
              description: post.translations[0].description,
              body: post.translations[0].body,
              category: {
                ...post.category,
                title: fetchedCategory.translations[0].title,
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
  };

  const category = await getCategoryData();
  console.log(category);

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

  return (
    <PaddingContainer>
      <PostList
        locale={locale}
        posts={typeCorrectedCategory.posts}
        category={params.category}
      />
    </PaddingContainer>
  );
};
export default Page;
