import { Post } from "@/types/collection";
import { ArrowLeft } from "lucide-react";
import { getReadingTime, getRelativeDate } from "../lib/helpers";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
}

export default function PostContent({
  post,
  isPostPage = false,
}: PostContentProps) {
  return (
    <div className="max-h[200px] h-full space-y-3">
      {/*Tags */}
      <div
        className={`flex flex-wrap items-center gap-2  text-neutral-400 ${
          isPostPage ? "text-sm" : "text-sm  @md:text-sm"
        }`}
      >
        <div style={{ color: post.category.color }}>{post.category.title}</div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{getReadingTime(post.body)}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{getRelativeDate(post.date_created)}</div>
        </div>
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "lg:4xl text-2xl font-bold md:text-3xl"
            : " text-xl font-medium  @md:text-2xl  @lg:text-3xl"
        }`}
      >
        {post.title}
      </h2>
      {/* Description */}
      <p className="overflow-hidden text-base leading-snug text-neutral-600 @lg:text-lg">
        {post.description}
      </p>
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3 text-xl">
          تابع القراءة
          <ArrowLeft size="14" />
        </div>
      )}
    </div>
  );
}
