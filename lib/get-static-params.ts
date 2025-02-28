import { client } from "./api/directus";

export const getCategoryStaticParams = async () => {
  try {
    const categories = await client.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localizedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "ar",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error at category static params ");
  }
};

export const getSubcategoryStaticParams = async () => {
  try {
    const subcategories = await client.items("subcategory").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = subcategories?.data?.map((subcategory) => {
      return {
        subcategory: subcategory.slug as string,
        lang: "en",
      };
    });

    const localizedParams = subcategories?.data?.map((subcategory) => {
      return {
        subcategory: subcategory.slug as string,
        lang: "ar",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error at subcategory static params ");
  }
};

export const getPostStaticParams = async () => {
  /* return DUMMY_POSTS.map((post) => {
      return {
        slug: post.slug,
      };
    }); */
  try {
    const posts = await client.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "ar",
      };
    });

    const localizedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "en",
      };
    });

    // Concat Localized and Regular Params
    const allParams = params?.concat(localizedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error at post static params");
  }
};
