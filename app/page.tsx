import styles from "./styles/islamic-icon.module.css";
import { PaddingContainer } from "./components/layout/padding-container";
import PostCard from "./components/posts/post-card";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PostList from "./components/posts/post-lists";
import CTACard from "./components/elements/cta-card";

export default function Home() {
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
          <PostCard post={DUMMY_POSTS[0]} />
          <PostList
            posts={DUMMY_POSTS.filter((_post, index) => index > 0 && index < 3)}
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
