import { PaddingContainer } from "@/components/layout/padding-container";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import CategoryGrid from "@/components/category/category-grid";
import PostTitlesList from "@/components/posts/post-titles-list";

import { getAllCategoriesData } from "@/lib/api/get-data";
import ListTitleBg from "@/components/layout/title-bg";
import { Lang } from "@/types/dictionary";
import { i18n } from "../../i81n.config";

export default async function Home({ params }: { params: { lang: Lang } }) {
  const locale = i18n.locales[params.lang];

  const { lang } = locale;

  const dictionary = await getDictionary(lang);

  const categoriesPosts = await getAllCategoriesData(lang);

  if (!categoriesPosts) {
    notFound();
  }
  const featuredPosts =
    (categoriesPosts as any)
      ?.map(({ posts }: { posts: any }) => {
        return posts?.filter((post: any) => post.featured);
      })
      .flat() || [];

  return (
    <PaddingContainer>
      <main className="font-noto-kufi">
        <div className="flex w-full flex-col lg:flex-row lg:gap-10">
          {featuredPosts?.length > 0 && (
            <div className="w-full">
              <ListTitleBg
                iconDim={"15px"}
                title={dictionary.navigation.links.featured}
                tw={{
                  bg: "rounded-t-md h-[12] w-auto h-full",
                  overlay: "rounded-t-md h-[12]  w-auto h-full",
                }}
              />
              <PostTitlesList locale={locale} posts={featuredPosts} />
            </div>
          )}
          <div className="w-full">
            <ListTitleBg
              link={"/"}
              iconDim={"15px"}
              title={dictionary.navigation.links.allCategoriesSelection}
              tw={{
                bg: "rounded-t-md h-[12] w-auto h-full",
                overlay: "rounded-t-md  h-[12]  w-auto h-full",
              }}
            />
            <div className="flex h-full w-full flex-col lg:me-5 lg:flex-row">
              <CategoryGrid
                categoryData={{
                  slug: "/",
                  title: dictionary.navigation.links.allCategoriesSelection,
                }}
                locale={locale}
                categories={categoriesPosts}
                layout="mainPage"
                dictionary={dictionary}
                totalRecordsNum={5}
              />
            </div>
          </div>
        </div>

        <div className="my-7 block">
          <CTACard locale={locale} />
        </div>
        <div className="flex  w-full flex-col lg:flex-row lg:gap-10">
          <div className="w-full ">
            {(categoriesPosts as any)?.map?.((category: any, idx: number) => {
              if (category?.posts?.length > 0 && idx % 2 === 0) {
                const mainPagePosts =
                  category.posts.filter((post: any, idx: number) => idx <= 7) ||
                  [];
                return (
                  <div key={category?.id}>
                    <ListTitleBg
                      link={"/" + category?.slug}
                      iconDim={"15px"}
                      title={category.title}
                      tw={{
                        bg: "rounded-t-md h-[12] w-auto h-full",
                        overlay: "rounded-t-md  h-[12]  w-auto h-full",
                      }}
                    />
                    <PostTitlesList locale={locale} posts={mainPagePosts} />
                  </div>
                );
              }
            })}
          </div>
          <div className="w-full">
            {(categoriesPosts as any)?.map?.((category: any, idx: number) => {
              if (category?.posts?.length > 0 && idx % 2 !== 0) {
                const mainPagePosts =
                  category.posts.filter((post: any, idx: number) => idx <= 7) ||
                  [];
                return (
                  <div key={category?.id}>
                    <ListTitleBg
                      link={"/" + category?.slug}
                      iconDim={"15px"}
                      title={category.title}
                      tw={{
                        bg: "rounded-t-md h-[12] w-auto h-full",
                        overlay: "rounded-t-md  h-[12]  w-auto h-full",
                      }}
                    />
                    <PostTitlesList
                      key={category?.id}
                      locale={locale}
                      posts={mainPagePosts}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </main>
    </PaddingContainer>
  );
}
