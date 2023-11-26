"use client";
import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";
import { Locale } from "@/lib/dictionary";
import AudioViewer from "./audio-viewer";
import VideoViewer from "./video-viewer";
import { DictionarySchema } from "@/types/dictionary";
import styles from "@/app/[lang]/styles/islamic-icon.module.css";
import TitleBg from "../layout/title-bg";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal" | "mainPage" | "categoryList";
  reverse?: boolean;
  locale: Locale;
  dictionary: DictionarySchema;
}

export default function PostCard({
  post,
  layout = "vertical",
  reverse = false,
  locale,
  dictionary,
}: PostProps) {
  console.log(layout);

  return (
    <Link
      className={`my-7 w-full rounded-md  border-2 bg-white p-3 font-noto-kufi  ${
        layout !== "horizontal" && "h-[520px]"
      }
       @container${
         layout === "vertical" ||
         layout === "mainPage" ||
         post?.type === "textOnly"
           ? "grid grid-cols-1"
           : " grid grid-cols-1 items-center gap-10 md:grid-cols-2 "
       }`}
      href={`/${post?.category?.slug}/post/${post?.slug}` || "/"}
    >
      <div>
        {post?.type === "withImage" && layout !== "mainPage" && (
          <div className="h-full">
            <Image
              className={` h-[250px]
              w-auto rounded-md object-cover object-center  ${
                reverse ? "md:order-last" : ""
              }`}
              alt={post?.title}
              src={`${
                !post?.isDummy
                  ? process.env.NEXT_PUBLIC_ASSETS_URL +
                    "/" +
                    post?.image +
                    "?key=optimized"
                  : post?.image
              }`}
              width={600}
              height={300}
            />
          </div>
        )}

        {(post?.type === "withAudio" || post?.type === "audioOnly") &&
          layout !== "mainPage" &&
          post?.media && (
            <div className="">
              <AudioViewer
                source={`${process.env.NEXT_PUBLIC_ASSETS_URL + post?.media}`}
              />
            </div>
          )}
        {(post?.type === "withVideo" || post?.type === "videoOnly") &&
          layout !== "mainPage" &&
          post?.media && (
            <div className="">
              <VideoViewer
                hight={50}
                width={600}
                source={`${process.env.NEXT_PUBLIC_ASSETS_URL + post?.media}`}
              />
            </div>
          )}
        {post?.type !== "withImage" &&
          post?.type !== "withVideo" &&
          post?.type !== "withAudio" &&
          layout !== "mainPage" && (
            <TitleBg>
              <div className="flex h-[250px] items-center justify-center ">
                <div
                  className={`${styles.islamicIcon}`}
                  style={{
                    ["--icon-dim" as any]: "75px",
                    ["--icon-color" as any]: "var(--primary-color)",
                  }}
                />
              </div>
            </TitleBg>
          )}
      </div>

      <div className="max-e h-full p-3">
        <PostContent
          post={post}
          locale={locale}
          dictionary={dictionary}
          layout={layout}
        />
      </div>
    </Link>
  );
}
