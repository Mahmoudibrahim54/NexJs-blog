"use client";

import { Category } from "@/types/collection";
import { useState, useEffect } from "react";
import { Locale } from "@/lib/dictionary";
import TitleBg from "../layout/title-bg";
import Link from "next/link";
import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import PostList from "../posts/post-lists";
import { DictionarySchema } from "@/types/dictionary";
import PostTitlesList from "../posts/post-titles-list";

const CategoryGrid = ({
  categories,
  locale,
  layout,
  dictionary,
}: {
  categories: Category[];
  locale: Locale;
  layout?: "vertical" | "horizontal" | "mainPage" | "categoryList";
  dictionary: DictionarySchema;
}) => {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  console.log(categories?.[1]);

  return (
    <div className="flex h-full min-h-[300px] w-full flex-col rounded-md">
      <div
        className={`text-md border-fourth-color "font-reem-kufi text-2xl" mb-2 flex h-10  w-auto flex-col items-start  justify-center border-b-2`}
      >
        <TitleBg
          tw={{
            bg: "rounded-t-md h-[12] w-auto h-full",
            overlay: "rounded-t-md w-64 h-[12]  w-auto h-full",
          }}
        >
          <Link
            href={`/${
              categories?.[0]?.posts?.[0]?.category?.slug
                ? categories?.[0]?.posts?.[0]?.category?.slug
                : "/"
            }  `}
            className=" flex  h-full flex-row items-center gap-5 rounded-t-md px-3 font-reem-kufi text-neutral-100"
          >
            <div
              className={`${styles.islamicIcon}`}
              style={{
                ["--icon-dim" as any]: `${
                  layout === "mainPage" ? "15px" : "20px"
                }`,
                ["--icon-color" as any]: "var(--secondary-color)",
              }}
            />
            <div className="font-semibold">
              {categories?.[2]?.posts?.[0]?.category?.title}
            </div>
          </Link>
        </TitleBg>
      </div>
      <div className=" border-b-md flex h-auto w-full items-center justify-center gap-2 rounded-t-md bg-white p-2">
        {categories.map((category) => {
          return (
            <div key={category.slug}>
              <button
                className="rounded-t-md bg-primary-color px-3 py-3 font-noto-kufi text-button-primary-color"
                onClick={() => setActiveTab(category)}
              >
                {category.title}
              </button>
            </div>
          );
        })}
      </div>
      {layout === "mainPage" ? (
        <div>
          <PostTitlesList
            locale={locale}
            posts={activeTab?.posts}
            layout="categoryList"
            dictionary={dictionary}
          />
        </div>
      ) : (
        <div className="h-full">
          <PostList
            locale={locale}
            posts={activeTab?.posts}
            layout="categoryList"
            dictionary={dictionary}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
