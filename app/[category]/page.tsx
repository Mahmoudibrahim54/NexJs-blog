import styles from "../styles/islamic-icon.module.css";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import { PaddingContainer } from "../components/layout/padding-container";
import PostList from "../components/posts/post-lists";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((category) => {
    console.log({ category: category.slug });

    return { category: category.slug };
  });
};

const Page = ({ params }: { params: { category: string } }) => {
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.slug.toLowerCase() === params.category,
  );

  return (
    <PaddingContainer>
      <PostList posts={posts} />
    </PaddingContainer>
  );
};
export default Page;
