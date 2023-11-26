"use client";

import { Post } from "@/types/collection";
import { ArrowLeft } from "lucide-react";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Locale, getDictionary } from "@/lib/dictionary";
import { DictionarySchema } from "@/types/dictionary";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: Locale;
  dictionary: DictionarySchema;
  layout?: "vertical" | "horizontal" | "mainPage" | "categoryList";
}

export default function PostContent({
  post,
  isPostPage = false,
  locale,
  dictionary,
  layout,
}: PostContentProps) {
  return (
    <section
      className={`flex ${
        layout === "horizontal" ? "h-[300px]" : "h-[230px]"
      } flex-col justify-between space-y-3 font-noto-kufi`}
    >
      {/*Tags */}
      <div
        className={`text-neutral-40 flex flex-wrap items-center  gap-2 ${
          isPostPage ? "text-sm  md:text-xl" : "text-sm"
        }`}
      >
        <div style={{ color: post?.category.color }}>
          {post?.category.title}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{getReadingTime(post?.body, locale)}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-200" />
          <div>{getRelativeDate(post?.date_created, locale)}</div>
        </div>
      </div>
      {/* Title */}
      <div>
        <h2
          className={`${
            isPostPage
              ? "text-2xl font-bold md:text-3xl lg:text-4xl"
              : " text-md font-bold   @md:text-xl  @lg:text-2xl"
          }`}
        >
          {post?.title}
        </h2>
      </div>
      {/* Description */}
      <div>
        <p className="test-sm md:text-md overflow-hidden text-base leading-snug text-neutral-600">
          {post?.description?.substring(0, 65).concat(" ...")}
        </p>
      </div>
      {!isPostPage && (
        <div className="text-md flex items-center justify-end gap-2 pt-3 text-secondary-color">
          {dictionary?.buttons?.readMore} <ArrowLeft size="14" />
        </div>
      )}
    </section>
  );
}
