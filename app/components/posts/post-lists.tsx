import styles from "../../styles/islamic-icon.module.css";
import { Post } from "@/types/collection";
import PostCard from "./post-card";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
}

export default function PostList({
  posts,
  layout = "vertical",
}: PostListProps) {
  return posts[0]?.id ? (
    <div className="mt-8  flex  flex-col gap-5">
      <div className="flex w-full flex-row items-center gap-5">
        <div
          className={`${styles.islamicIcon} `}
          style={{
            ["--icon-dim" as any]: "30px",
          }}
        />
        <div className=" text-3xl">{posts[0]?.category.title}</div>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
        {posts.map((post) => (
          <PostCard key={post.id} layout={layout} post={post} />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/100 via-black/50 to-black/0" />
      <div className="relative z-20">
        <div className="z-20 flex h-96 w-full items-center justify-center gap-8">
          <div
            className={`${styles.islamicIcon} z-30`}
            style={{
              ["--icon-dim" as any]: "30px",
            }}
          />
          <h3 className="z-30 text-4xl"> المحتوى تحت التطوير</h3>
          <div
            className={`${styles.islamicIcon} z-30 `}
            style={{
              ["--icon-dim" as any]: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
