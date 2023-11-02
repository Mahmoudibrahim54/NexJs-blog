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
  return (
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
  );
}
