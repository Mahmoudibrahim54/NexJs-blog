"use client";

import { Category, Post } from "@/types/collection";
import { useState } from "react";
import PostList from "../posts/post-lists";
import { DictionarySchema, Locale } from "@/types/dictionary";
import PostTitlesList from "../posts/post-titles-list";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryGrid = ({
  categories,
  locale,
  layout,
  dictionary,
  categoryData,
  currentSubcategory = { slug: categories[0]?.slug },
  totalRecordsNum,
}: {
  categories: Category[];
  locale: Locale;
  layout?: "vertical" | "horizontal" | "mainPage" | "categoryList";
  dictionary: DictionarySchema;
  categoryData: { slug: string; title: string };
  currentSubcategory?: { slug: string };
  totalRecordsNum: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams().get("page");

  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, []);
  // if (!hydrated) {
  //   // Returns null on first render, so the client and server match
  //   return null;
  // }

  const [activeTab, setActiveTab] = useState(
    categories.find(
      (subcategory) => subcategory.slug === currentSubcategory.slug,
    ) ||
      categories?.[0] ||
      [],
  );
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col rounded-md">
      <div className=" border-b-md flex h-auto w-full flex-wrap items-center justify-center gap-2 rounded-t-md bg-white p-2">
        {categories.map((category) => {
          return (
            <div key={category.slug}>
              <button
                className={`rounded-md hover:bg-secondary-color ${
                  category.slug === activeTab.slug
                    ? "bg-secondary-color"
                    : "bg-primary-color"
                } px-3 py-3 font-noto-kufi font-semibold text-neutral-100 md:rounded-b-none`}
                onClick={() => {
                  setActiveTab(category);
                  layout === "categoryList" &&
                    router.push(
                      `/${categoryData.slug}/${category.slug}?page=1`,
                    );
                  router.refresh();
                }}
              >
                {category.title}
              </button>
            </div>
          );
        })}
      </div>
      {layout === "mainPage" ? (
        <div>
          <PostTitlesList locale={locale} posts={activeTab?.posts} />
        </div>
      ) : (
        <div className="h-full">
          <PostList
            locale={locale}
            posts={activeTab?.posts}
            layout="categoryList"
            dictionary={dictionary}
            totalRecordsNum={10}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
