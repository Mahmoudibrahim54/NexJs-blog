import styles from "@/app/styles/islamic-icon.module.css";
import { PaddingContainer } from "@/components/layout/padding-container";
import PostCard from "@/components/posts/post-card";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PostList from "@/components/posts/post-lists";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { client } from "@/utils/directus";

export default async function Home() {
  const getAllPosts = async () => {
    try {
      const posts = await client
        .items("post")
        .readByQuery({ fields: ["*", "category.id", "category.title"] });

      return posts.data;
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
    <div>
      <PaddingContainer>
        <main>
          <div className="my-5 flex w-full flex-row items-center justify-start gap-5">
            <div
              className={`${styles.islamicIcon} `}
              style={{
                ["--icon-dim" as any]: "30px",
              }}
            />
            <div className="inline-block text-3xl ">اخترنا لك</div>
          </div>
          <PostCard post={posts[0]} />
          <PostList
            posts={posts.filter((_post, index) => index > 0 && index < 3)}
          />
          <CTACard />
          <PostCard reverse post={DUMMY_POSTS[3]} />
          <PostList
            posts={DUMMY_POSTS.filter((_post, index) => index > 3 && index < 6)}
          />
        </main>
      </PaddingContainer>
    </div>
  );
}
