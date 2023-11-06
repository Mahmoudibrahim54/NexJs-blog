import { PaddingContainer } from "@/components/layout/padding-container";
import PostList from "@/components/posts/post-lists";
import { client } from "@/utils/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
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
      return { category: category.slug as string };
    });

    return params || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching Categories");
  }
};

const Page = async ({ params }: { params: { category: string } }) => {
  const getCategoryData = async () => {
    try {
      const category = await client.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },
        fields: ["*", "posts.*", "posts.category.id", "posts.category.title"],
      });
      return category?.data?.[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching data");
    }
  };

  const category = await getCategoryData();

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    slug: string;
    description?: string;
    color: string;
    posts: Post[];
  };

  if (!typeCorrectedCategory?.posts?.[0]?.id) {
    notFound();
  }

  return (
    <PaddingContainer>
      <PostList posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};
export default Page;
