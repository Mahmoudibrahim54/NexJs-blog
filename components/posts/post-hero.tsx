import { Post } from "@/types/collection";
import PostContent from "./post-content";
import Image from "next/image";
import { Locale } from "@/lib/dictionary";
import { Category } from "../../types/collection";

interface PostHeroProps {
  post: Post;
  locale: Locale;
}

const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <>
      <PostContent locale={locale} post={post} isPostPage />
      <section>
        {post.type === "withImage" && (
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
        {post.type === "withAudio" && <div></div>}
        {post.type === "withVideo" && <div></div>}
      </section>
    </>
  );
};

export default PostHero;
