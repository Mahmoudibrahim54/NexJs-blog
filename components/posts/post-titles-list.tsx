import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import { Post } from "@/types/collection";
import { Locale } from "@/lib/dictionary";
import Link from "next/link";
import TitleBg from "../layout/title-bg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DictionarySchema } from "@/types/dictionary";

interface PostTitlesListProps {
  posts: Post[];
  locale: Locale;
  dictionary: DictionarySchema;
  category?: string;
  layout: "list" | "categoryList";
}

const PostTitlesList = ({
  locale,
  posts,
  dictionary,
  category,
  layout,
}: PostTitlesListProps) => {
  return (
    <div className=" mb-5 flex min-h-[200px] w-full  flex-col rounded-md shadow-md">
      {layout !== "categoryList" && (
        <div
          className={`text-md  mb-2 flex h-10 w-auto flex-col  items-start justify-center border-b-2`}
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
                  ["--icon-dim" as any]: `${"15px"}`,
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
      <div className="  h-full min-h-[300px] rounded-b-md bg-white shadow-md">
        <div className={`grid grid-cols-1 rounded-b-md  bg-white  px-5`}>
          {posts.map((post, idx) => (
            <Link
              href={`/${post?.category?.slug}/post/${post.slug}`}
              key={post?.id}
              className="  my-3 flex max-h-[300px] items-start border-b-2 pb-6 text-secondary-color"
            >
              {locale === "ar" ? (
                <div>
                  <ChevronLeft
                    strokeWidth="3px"
                    size="20px"
                    color="var(--secondary-color)"
                  />
                </div>
              ) : (
                <div>
                  <ChevronRight
                    strokeWidth="3px"
                    size="20px"
                    color="var(--secondary-color)"
                  />
                </div>
              )}
              <h2
                className={`${" text-md px-7   font-bold  @md:text-xl @lg:text-2xl"}`}
              >
                {post?.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostTitlesList;
