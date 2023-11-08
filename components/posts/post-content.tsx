import { Post } from "@/types/collection";
import { ArrowLeft } from "lucide-react";
import { getReadingTime, getRelativeDate } from "@/utils/helpers";
import { DictionarySchema } from "@/dictionaries/schema";
import { Locale, getDictionary } from "@/utils/get-dictionary";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: Locale;
}

export default async function PostContent({
  post,
  isPostPage = false,
  locale,
}: PostContentProps) {
  const dictionary: DictionarySchema = await getDictionary(locale);

  return (
    <div className="max-h[200px] my-2 h-full space-y-3">
      {/*Tags */}
      <div
        className={`flex flex-wrap items-center gap-2  text-neutral-400 ${
          isPostPage ? "text-sm  md:text-xl" : "text-sm"
        }`}
      >
        <div style={{ color: post.category.color }}>
          {dictionary.navigation.links[post.category.slug]}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          {/* <div>{getReadingTime(post.body, locale)}</div> */}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{getRelativeDate(post.date_created, locale)}</div>
        </div>
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "text-2xl font-bold md:text-3xl lg:text-4xl"
            : " text-2xl font-bold   @md:text-3xl  @lg:text-4xl"
        }`}
      >
        {post.title}
      </h2>
      {/* Description */}
      <p className="overflow-hidden text-base leading-snug text-neutral-600 md:text-lg">
        {post.description}
      </p>
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3 text-xl">
          {dictionary.buttons.readMore} <ArrowLeft size="14" />
        </div>
      )}
    </div>
  );
}
