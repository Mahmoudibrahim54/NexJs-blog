"use client";
import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import { Post } from "@/types/collection";
import PostCard from "./post-card";
import { Locale } from "@/lib/dictionary";
import Link from "next/link";
import TitleBg from "../layout/title-bg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "antd";
import { DictionarySchema } from "@/types/dictionary";
import { useEffect, useState } from "react";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal" | "categoryList";
  locale: Locale;
  dictionary: DictionarySchema;
  category?: string;
}

const PostList = ({
  locale,
  posts,
  layout = "vertical",
  dictionary,
  category,
}: PostListProps) => {
  const [hydrated, setHydrated] = useState(false);
  console.log(layout);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div className=" mb-5 flex h-full min-h-[100px] w-full  flex-col  rounded-md shadow-md">
      {layout !== "categoryList" && (
        <div
          className={`text-md  mb-2 flex h-10 w-auto flex-col  items-start justify-center border-b-2 `}
        >
          <TitleBg
            tw={{
              bg: "rounded-t-md h-[12] w-auto h-full",
              overlay: "rounded-t-md w-64 h-[12]  w-auto h-full",
            }}
          >
            <Link
              href={`/${
                posts?.[0]?.category?.slug ? posts?.[0]?.category?.slug : "/"
              }  `}
              className=" flex  h-full flex-row items-center gap-5 rounded-t-md px-3 font-reem-kufi text-neutral-100"
            >
              <div
                className={`${styles.islamicIcon}`}
                style={{
                  ["--icon-dim" as any]: `${"20px"}`,
                  ["--icon-color" as any]: "var(--secondary-color)",
                }}
              />
              <div className="font-semibold">
                {dictionary?.navigation?.links?.[category || ""] ||
                  posts?.[0]?.category?.title}
              </div>
            </Link>
          </TitleBg>
        </div>
      )}
      <div className="  h-full min-h-[100px] rounded-b-md bg-white py-7 shadow-md">
        <div className=" h-full px-7">
          <PostCard
            locale={locale}
            post={posts[0]}
            dictionary={dictionary}
            layout="horizontal"
          />
        </div>
        <div
          className={`grid h-full rounded-b-md bg-white ${
            layout === "horizontal"
              ? " grid-cols-1 rounded-b-md px-5"
              : " grid-cols-1 gap-5 px-7 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {posts.map((post, idx) => {
            return (
              // idx !== 0 && (
              <PostCard
                post={post}
                locale={locale}
                dictionary={dictionary}
                key={post?.id}
              />
            );
            // );
          })}
        </div>
      </div>
      <div
        className="flex w-full items-center justify-center bg-white py-7"
        style={{ direction: `ltr` }}
      >
        <Pagination
          total={85}
          showTotal={(total) => `Total ${total} items`}
          defaultPageSize={20}
          defaultCurrent={1}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};
export default PostList;
