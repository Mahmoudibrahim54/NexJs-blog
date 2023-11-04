import { Post } from "@/types/collection";
import PostContent from "./post-content";
import { PaddingContainer } from "../layout/padding-container";
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
          src={
            post.image ||
            "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwxOHx8RWxlcGhhbnRzJTIwdGhhaWxhbmR8ZW58MHx8fHwxNjcwMzIyNzUx&ixlib=rb-4.0.3"
          }
        />
      )}
    </>
  );
};

export default PostHero;
