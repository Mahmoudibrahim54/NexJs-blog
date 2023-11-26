/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/server";
import { getCategoryData } from "./page";
import siteConfig from "@/config/site";
import { Locale } from "@/lib/dictionary";

export const size = {
  width: 1200,
  height: 630,
};
export const alt = siteConfig.siteName;
export const contentType = "image/png";

export default async function og({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) {
  const getArabicParagraph = (text: string | undefined) => {
    if (lang === "ar" && text) {
      return text.split(" ").reverse().join(" ").trim();
    } else return text;
  };
  // Get Data from CMS
  const categoryData = await getCategoryData(category, lang as Locale);

  const arabicSansSemibold = fetch(
    new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/NotoSansArabic-SemiBold.ttf`),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center  text-primary-color ">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1 object-cover w-full h-full object-center"
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`}
            alt={getArabicParagraph(categoryData.title)}
          />
          {/* Overlay */}
          <div
            tw={`absolute flex inset-0 bg-opacity-50 bg-[${categoryData?.color}]`}
          />
        </div>
        <div tw="flex flex-col text-primary-color items-center justify-center">
          {/* Title */}
          <div tw="text-[60px]">{getArabicParagraph(categoryData?.title)}</div>
          {/* Description */}
          <div tw="text-3xl max-w-4xl">
            {getArabicParagraph(categoryData?.description)}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
