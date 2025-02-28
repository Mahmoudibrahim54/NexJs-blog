/* eslint-disable @next/next/no-img-element */

import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { ImageResponse } from "next/server";
import { getDictionary } from "@/lib/dictionary";
import { Lang } from "@/types/dictionary";
import siteConfig from "@/config/site";
import { getPostData } from "@/lib/api/get-data";

export const size = {
  width: 1200,
  height: 630,
};
export const alt = siteConfig.siteName;
export const contentType = "image/png";

export default async function og({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) {
  // Get Data from CMS
  const post = await getPostData(slug, lang as Lang);

  const dictionary = await getDictionary(lang as Lang);

  const getArabicParagraph = (text: string | undefined | null) => {
    if (lang === "ar" && text) {
      return text.split(" ").reverse().join(" ").trim();
    } else return text;
  };

  const arabicSansSemibold = fetch(
    new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/NotoSansArabic-SemiBold.ttf`),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 object-cover w-full h-full object-center"
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
            alt={getArabicParagraph(post?.title)!!}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50 items-center justify-center">
          {/* Title */}
          {/* <div tw="text-[60px]">{getArabicParagraph(post?.title)}</div> */}
          {/* Description */}
          {/* <div tw="text-2xl max-w-4xl">
            {getArabicParagraph(post?.description)}
          </div> */}
          {/* Tags */}
          <div tw="flex mt-6 flex-wrap items-center text-3xl text-neutral-200 justify-center">
            <div tw="flex items-center justify-center">
              <div tw={`font-medium text-[${post?.category?.color}]`}>
                {getArabicParagraph(post?.category.title)}
              </div>
              <div
                tw={` ${
                  lang === "ar" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
            </div>
            <div tw="flex items-center justify-center">
              <div
                tw={`flex ${
                  lang === "en" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
              <div>{`${getArabicParagraph(dictionary.config.siteName)}`}</div>
              <div
                tw={`flex ${
                  lang === "ar" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
            </div>
            <div tw="flex items-center justify-center">
              <div
                tw={`flex ${
                  lang === "en" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
              <div>
                {getArabicParagraph(getReadingTime(post?.body!!, lang as Lang))}
              </div>
              <div
                tw={`flex ${
                  lang === "ar" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
            </div>
            <div tw="flex items-center justify-center">
              <div
                tw={` ${
                  lang === "en" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
              <div>
                {getArabicParagraph(
                  getRelativeDate(post?.date_created!!, lang as Lang),
                )}
              </div>
              <div
                tw={` ${
                  lang === "ar" && "w-4 h-4 mx-6 rounded-full bg-neutral-300"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
