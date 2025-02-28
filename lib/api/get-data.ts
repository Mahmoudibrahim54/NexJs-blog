import { client } from "./directus";
import { cache } from "react";
import { Subcategory } from "../../types/collection";
import { Lang } from "@/types/dictionary";

export const getAllCategories = cache(async (locale: Lang) => {
  try {
    const category = await client.items("category").readByQuery({
      fields: [
        "*",
        "translations.*",
        "subcategories.*",
        "subcategories.translations.*",
      ],
    });

    if (locale === "ar") return category?.data;
    else {
      const fetchedCategories = category.data;

      const localizedData = fetchedCategories?.map((category) => {
        return {
          ...category,
          title: category?.translations?.[0].title,
          description: category?.translations?.[0]?.description,
          subcategories: category?.subcategories?.map((subcategory: any) => {
            return {
              ...subcategory,
              title: subcategory?.translations?.[0]?.title,
              description: subcategory.translations?.[0]?.description,
            };
          }),
        };
      });

      return localizedData || [];
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all categories");
  }

  // return [
  //   {
  //     id: "1",
  //     title: "Category 1",
  //     slug: "category_1",
  //     description: "Category 1",
  //     color: "blue",
  //     posts: [
  //       {
  //         id: "1",
  //         title: "Post 1",
  //         description: "Post 1",
  //         // category: Category,
  //         // subcategory: Subcategory,
  //         slug: "post_1",
  //         // image?: string,
  //         body: "Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 ",
  //         // date_created: string,
  //         // date_updated: string,
  //         // media?: string,
  //         type: "textOnly",

  //         isDummy: true,
  //       },
  //     ],
  //     subcategories: [
  //       {
  //         id: "1",
  //         title: "Subcategory 1",
  //         slug: "subcategory_1",
  //         description: "Subcategory 1",
  //         color: "green",
  //         posts: [
  //           {
  //             id: "1",
  //             title: "Post 1",
  //             description: "Post 1",
  //             // category: Category,
  //             // subcategory: Subcategory,
  //             slug: "post_1",
  //             // image?: string,
  //             body: "Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 ",
  //             // date_created: string,
  //             // date_updated: string,
  //             // media?: string,
  //             type: "textOnly",

  //             isDummy: true,
  //           },
  //         ],
  //         featured: true,
  //         translations: {
  //           title: "Subcategory 1",
  //           description: "Subcategory 1",
  //         },
  //       },
  //     ],
  //     featured: true,
  //     translations: { title: "Category 1", description: "Category 1" },
  //   },
  // ];
});

export const getAllCategoriesData = async (locale: Lang) => {
  try {
    const category = await client.items("category").readByQuery({
      fields: [
        "*",
        "translations.*",
        "subcategories.*",
        "subcategories.translations.*",
        "posts.*",
        "posts.translations.*",
        "posts.category.*",
        "posts.category.translations.*",
        "posts.subcategory.*",
        "posts.subcategory.translations.*",
      ],
      deep: { subcategories: { posts: { _limit: 10, _offset: 0 } } },
    });

    if (locale === "ar") return category?.data;
    else {
      const fetchedCategories = category.data;

      const localizedData = fetchedCategories?.map((category) => {
        return {
          ...category,
          title: category?.translations?.[0].title,
          description: category?.translations?.[0]?.description,
          subcategories: category.subcategories.map((subcategory: any) => {
            return {
              ...subcategory,
              title: subcategory?.translations?.[0]?.title,
              description: subcategory?.translations?.[0]?.description,
              posts: subcategory?.posts?.map((post: any) => {
                return {
                  ...post,
                  title: post?.translations?.[0]?.title,
                  description: post?.translations?.[0]?.description,
                  body: post?.translations?.[0]?.body,
                  category: {
                    ...post.category,
                    title: post?.category?.translations?.[0]?.title,
                  },
                  subcategory: {
                    ...post.subcategory,
                    title: post?.subcategory?.translations?.[0]?.title,
                  },
                };
              }),
            };
          }),
          posts: category?.posts?.map((post: any) => {
            return {
              ...post,
              title: post?.translations?.[0]?.title,
              description: post?.translations?.[0]?.description,
              body: post?.translations?.[0]?.body,
              category: {
                ...post.category,
                title: post?.category?.translations?.[0]?.title,
              },
            };
          }),
        };
      });

      return localizedData;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all categories data");
  }
  // return [
  //   {
  //     id: "1",
  //     title: "Category 1",
  //     slug: "category_1",
  //     description: "Category 1",
  //     color: "blue",
  //     posts: [
  //       {
  //         id: "1",
  //         title: "Post 1",
  //         description: "Post 1",
  //         // category: Category,
  //         // subcategory: Subcategory,
  //         slug: "post_1",
  //         // image?: string,
  //         body: "Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 ",
  //         // date_created: string,
  //         // date_updated: string,
  //         // media?: string,
  //         type: "textOnly",

  //         isDummy: true,
  //       },
  //     ],
  //     subcategories: [
  //       {
  //         id: "1",
  //         title: "Subcategory 1",
  //         slug: "subcategory_1",
  //         description: "Subcategory 1",
  //         color: "green",
  //         posts: [
  //           {
  //             id: "1",
  //             title: "Post 1",
  //             description: "Post 1",
  //             // category: Category,
  //             // subcategory: Subcategory,
  //             slug: "post_1",
  //             // image?: string,
  //             body: "Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 Body 1 ",
  //             // date_created: string,
  //             // date_updated: string,
  //             // media?: string,
  //             type: "textOnly",

  //             isDummy: true,
  //           },
  //         ],
  //         featured: true,
  //         translations: {
  //           title: "Subcategory 1",
  //           description: "Subcategory 1",
  //         },
  //       },
  //     ],
  //     featured: true,
  //     translations: { title: "Category 1", description: "Category 1" },
  //   },
  // ];
};

export const getCategoryData = async (
  categorySlug: string,
  locale: Lang,
  postsPageNum: number,
  pageSize?: number,
) => {
  try {
    const offset = postsPageNum - 1 * (pageSize || 10);

    const category = await client.items("category").readByQuery({
      filter: {
        slug: {
          _eq: categorySlug,
        },
      },
      fields: [
        "*",
        "translations.*",
        "subcategories.*",
        "subcategories.translations.*",
        "subcategories.posts.*",
        "subcategories.posts.translations.*",
        "subcategories.posts.category.*",
        "subcategories.posts.category.translations.*",
        "subcategories.posts.subcategory.*",
        "subcategories.posts.subcategory.translation.*",
      ],
      deep: {
        subcategories: { posts: { _limit: pageSize, _offset: offset } },
      },
      aggregation: { subcategories: { posts: { _count: true } } },
    });

    if (locale === "ar") {
      return category?.data?.[0];
    } else {
      const fetchedCategory = category?.data?.[0];
      const localizedCategory = {
        ...fetchedCategory,
        title: fetchedCategory?.translations?.[0]?.title,
        description: fetchedCategory?.translations?.[0]?.description,
        subcategories: fetchedCategory.subcategories.map((subcategory: any) => {
          return {
            ...subcategory,
            title: subcategory?.translations?.[0]?.title,
            description: subcategory?.translations?.[0]?.description,
            posts: subcategory?.posts?.map((post: any) => {
              return {
                ...post,
                title: post?.translations?.[0]?.title,
                description: post?.translations?.[0]?.description,
                body: post?.translations?.[0]?.body,
                category: {
                  ...post.category,
                  title: post?.category?.translations?.[0]?.title,
                },
              };
            }),
          };
        }),
      };
      return localizedCategory;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching category");
  }
};

export const getSubcategoryData = cache(
  async (subcategorySlug: string, locale: Lang) => {
    try {
      const category = await client.items("subcategory").readByQuery({
        filter: {
          slug: {
            _eq: subcategorySlug,
          },
        },
        fields: [
          "*",
          "translations.*",
          "posts.*",
          "posts.translations.*",
          "posts.category.*",
          "posts.category.translations.*",
          "posts.subcategory.*",
          "posts.subcategory.translation.*",
        ],
      });

      if (locale === "ar") {
        return category?.data?.[0];
      } else {
        const fetchedSubcategory = category?.data?.[0];
        const localizedCategory = {
          ...fetchedSubcategory,
          title: fetchedSubcategory?.translations?.[0]?.title,
          description: fetchedSubcategory?.translations?.[0]?.description,
          category: {
            ...fetchedSubcategory.category,
            title: fetchedSubcategory?.category?.translations?.[0]?.title,
            description: fetchedSubcategory?.translations?.[0]?.description,
          },
          posts: fetchedSubcategory?.posts?.map((post: any) => {
            return {
              ...post,
              title: post?.translations?.[0]?.title,
              description: post?.translations?.[0]?.description,
              body: post?.translations?.[0]?.body,
              category: {
                ...post.category,
                title: post?.category?.translations?.[0]?.title,
                description: post?.translations?.[0]?.description,
              },
            };
          }),
        };
        return localizedCategory;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching subcategory");
    }
  },
);

export const getPostData = cache(async (slug: string, lang: Lang) => {
  try {
    const post = await client.items("post").readByQuery({
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: [
        "*",
        "category.*",
        "translations.*",
        "category.translations.*",
        "subcategory.*",
        "subcategory.translations.*",
      ],
    });

    if (lang === "ar") return post.data?.[0];
    else {
      const postData = post.data?.[0];
      const localizedPosts = {
        ...postData,
        title: postData?.translations?.[0]?.title,
        description: postData?.translations?.[0]?.description,
        body: postData?.translations?.[0]?.body,
        featured: postData?.translations?.[0]?.featured,
        subcategory: {
          ...postData?.subcategory,
          title: postData?.subcategory?.translations?.[0]?.title,
          description: postData?.subcategory?.translations?.[0]?.description,
        },
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
          description: postData?.category?.translations?.[0]?.description,
        },
      };

      return localizedPosts;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching post");
  }
});

export const getSubcategoryPages = async (
  subcategorySlug: string,
  lang: Lang,
  postsPageNum: number,
  pageSize = 10,
) => {
  try {
    const offset = (postsPageNum - 1) * pageSize;

    const data = await client.items("subcategory").readByQuery({
      fields: [
        "*",
        "translations.*",
        "category.*",
        "category.translations.*",
        "posts.*",
        "posts.translations.*",
      ],
      filter: {
        slug: {
          _eq: subcategorySlug,
        },
      },
      deep: { posts: { _limit: pageSize, _offset: offset } },
      aggregation: { posts: { _count: true } },
    });

    if (lang === "ar") {
      return {
        props: {
          data: data?.data?.[0],
          total: data,
        },
      };
    } else {
      const subcategory = data.data?.[0];
      const localizedSubcategory: Subcategory = {
        ...subcategory,
        title: subcategory?.translations?.[0]?.title,
        description: subcategory?.translations?.[0]?.description,
        category: {
          ...subcategory?.category,
          title: subcategory?.category?.translations?.[0]?.title,
          description: subcategory?.category?.translations?.[0]?.description,
        },
        posts: subcategory?.posts?.map((post: any) => {
          return {
            ...post,
            title: post?.translations?.[0]?.title,
            description: post?.translations?.[0]?.description,
            body: post?.translations?.[0]?.body,
            category: {
              ...post.category,
              title: post?.category?.translations?.[0]?.title,
              description: post?.translations?.[0]?.description,
            },
          };
        }),
      };

      return {
        props: {
          data: localizedSubcategory,
          total: data?.meta?.filter_count,
        },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching Page");
  }
};
