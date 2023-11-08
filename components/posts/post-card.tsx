import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";
import { Locale } from "@/utils/get-dictionary";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: Locale;
}

export default function PostCard({
  post,
  layout = "horizontal",
  reverse = false,
  locale = "ar",
}: PostProps) {
  return (
    <Link
      className={`my-8 @container ${
        layout === "horizontal"
          ? "grid grid-cols-1 items-center gap-10 md:grid-cols-2"
          : "space-y-10"
      }`}
      href={`/post/${post.slug}`}
    >
      {post.type === "textWithImage" && (
        <Image
          className={`h-full max-h-[300px] w-full rounded-md object-cover object-center${
            reverse ? "md:order-last" : ""
          }`}
          alt={post.title}
          src={`${
            !post.isDummy
              ? process.env.NEXT_PUBLIC_ASSETS_URL +
                "/" +
                post.image +
                "?key=optimized"
              : post.image
          }`}
          width={600}
          height={300}
        />
      )}
      <PostContent post={post} locale={locale} />
    </Link>
  );
}
