import { PaddingContainer } from "@/components/layout/padding-container";
import PostList from "@/components/posts/post-lists";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { client } from "@/lib/directus";
import { Locale, getDictionary } from "@/lib/dictionary";
import CategoryGrid from "@/components/category/category-grid";
import PostTitlesList from "@/components/posts/post-titles-list";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;

  const dictionary = await getDictionary(locale);

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

  const categoriesPosts = await getCategoryData();

  if (!categoriesPosts) {
    notFound();
  }
  const featuredPosts = (categoriesPosts as any)
    ?.map(({ posts }: { posts: any }) => {
      return posts?.filter((post: any) => post.featured);
    })
    .flat();

  return (
    <PaddingContainer>
      <main className="font-noto-kufi">
        <div className="flex w-full">
          {featuredPosts?.length > 0 && (
            <div className="me-5 w-full">
              <PostTitlesList
                locale={locale}
                category={"featured"}
                posts={featuredPosts}
                layout="list"
                dictionary={dictionary}
              />
            </div>
          )}
          <div className="me-5 h-full w-full">
            <CategoryGrid
              locale={locale}
              categories={categoriesPosts}
              layout="mainPage"
              dictionary={dictionary}
            />
          </div>
        </div>

        <div className="my-7 block">
          <CTACard locale={locale} />
        </div>
        <div className="flex w-full ">
          <div className="me-5 w-full">
            {(categoriesPosts as any)?.map?.((category: any, idx: number) => {
              if (category?.posts?.length > 0 && idx % 2 === 0 && idx > 0) {
                const mainPagePosts = category.posts.filter(
                  (post: any, idx: number) => idx <= 7,
                );
                return (
                  <PostTitlesList
                    key={category?.id}
                    locale={locale}
                    category={category?.slug}
                    posts={mainPagePosts}
                    layout="list"
                    dictionary={dictionary}
                  />
                );
              }
            })}
          </div>
          <div className="ms-5 w-full">
            {(categoriesPosts as any)?.map?.((category: any, idx: number) => {
              if (category?.posts?.length > 0 && idx % 2 != 0) {
                const mainPagePosts = category.posts.filter(
                  (post: any, idx: number) => idx <= 7,
                );
                return (
                  <PostTitlesList
                    key={category?.id}
                    locale={locale}
                    category={category?.slug}
                    posts={mainPagePosts}
                    layout="mainPage"
                    dictionary={dictionary}
                  />
                );
              }
            })}
          </div>
        </div>
      </main>
    </PaddingContainer>
  );
}
