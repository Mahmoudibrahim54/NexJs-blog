import { PaddingContainer } from "@/components/layout/padding-container";
import PostCard from "@/components/posts/post-card";
import PostList from "@/components/posts/post-lists";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { client } from "@/utils/directus";
import { Locale, getDictionary } from "@/utils/get-dictionary";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;

  const dictionary = getDictionary(locale);

  const getCategoryData = async () => {
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
            title: category?.translations[0].title,
            description: category?.translations[0].description,
            posts: category?.posts?.map((post: any) => {
              return {
                ...post,
                title: post.translations[0].title,
                description: post.translations[0].description,
                body: post.translations[0].body,
                category: {
                  ...post.category,
                  title: post.category.translations[0].title,
                  description: post.category.translations[0]?.description,
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

  const categoriesPosts = await getCategoryData();
  console.log(categoriesPosts);

  if (categoriesPosts) {
    notFound();
  }
  const featuredPosts = (categoriesPosts as any)?.map(
    ({ posts }: { posts: any }) => {
      return posts?.filter((post: any) => post.featured);
    },
  );
  return (
    <PaddingContainer>
      <main>
        {featuredPosts?.length > 0 && (
          <div>
            <PostList
              locale={locale}
              category={"featured"}
              posts={featuredPosts}
            />

            <CTACard locale={locale} />
          </div>
        )}
        {(categoriesPosts as any)?.map?.((category: any) => {
          if (category?.posts?.length > 0) {
            return (
              <div key={category.id}>
                <PostCard locale={locale} post={category.posts[0]} />
                <PostList
                  locale={locale}
                  category={category?.slug}
                  posts={category.posts}
                />
              </div>
            );
          }
        })}
      </main>
    </PaddingContainer>
  );
}
