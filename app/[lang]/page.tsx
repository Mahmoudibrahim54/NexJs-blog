import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import { PaddingContainer } from "@/components/layout/padding-container";
import PostCard from "@/components/posts/post-card";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PostList from "@/components/posts/post-lists";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { client } from "@/utils/directus";
import { Locale, getDictionary } from "@/utils/get-dictionary";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;

  const dictionary = getDictionary(locale);

  const getAllPosts = async () => {
    try {
      const posts = await client.items("post").readByQuery({
        fields: [
          "*",
          "category.*",
          "translations.*",
          "category.translations.*",
        ],
        filter: {
          translations: {
            languages_code: "en-US",
          },
        },
      });
      console.log(posts?.data?.[0]);

      if (locale === "ar") return posts.data;
      else {
        const localizedPosts = posts.data?.map((post) => {
          return {
            ...post,
            title: post?.translations?.[0]?.title,
            description: post?.translations?.[0]?.description,
            body: post?.translations?.[0]?.body,
            category: {
              ...post?.category,
              title: post?.category.translations?.[0]?.title,
            },
          };
        });
        return localizedPosts;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching Posts");
    }
  };
  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main>
        <div className="my-5 flex w-full flex-row items-center justify-start gap-5">
          <div
            className={`${styles.islamicIcon} `}
            style={{
              ["--icon-dim" as any]: "30px",
            }}
          />
          <div className="inline-block text-3xl ">
            {(await dictionary).mainPage.featured}
          </div>
        </div>
        <PostCard locale={locale} post={posts[0]} />
        <PostList
          locale={locale}
          category={posts[1]?.category?.slug}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CTACard locale={locale} />
        <PostCard locale={locale} reverse post={posts[3]} />
        <PostList
          locale={locale}
          category={posts[4]?.category?.slug}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
