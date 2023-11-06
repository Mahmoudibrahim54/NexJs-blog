import { Post } from "@/types/collection";
import PostContent from "./post-content";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
}

const PostHero = ({ post }: PostHeroProps) => {
  return (
    <>
      <PostContent post={post} isPostPage />
      {post.type === "textWithImage" && (
        <Image
          className="my-3 h-[300] rounded-md object-cover object-center md:h-[500]"
          width={1280}
          height={500}
          alt={post.title}
          src={`${
            !post.isDummy
              ? process.env.NEXT_PUBLIC_ASSETS_URL +
                "/" +
                post.image +
                "?key=optimized"
              : post.image
          }`}
        />
      )}
    </>
  );
};

export default PostHero;
