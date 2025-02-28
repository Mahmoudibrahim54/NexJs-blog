import { Post } from "@/types/collection";
import PostCard from "./post-card";

import { DictionarySchema, Locale } from "@/types/dictionary";
import PostsListPagination from "./posts-list-paginagtion";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal" | "categoryList";
  locale: Locale;
  dictionary: DictionarySchema;
  totalRecordsNum: number;
}

const PostList = ({
  locale,
  posts,
  layout = "vertical",
  dictionary,
  totalRecordsNum,
}: PostListProps) => {
  return (
    <div className=" mb-5 flex h-full min-h-[100px] w-full  flex-col  rounded-md shadow-md">
      <div className="  h-full min-h-[100px] rounded-b-md bg-white py-7 shadow-md">
        <div className=" h-full px-7">
          <PostCard
            locale={locale}
            post={posts[0]}
            dictionary={dictionary}
            layout="horizontal"
          />
        </div>
        <div
          className={`grid h-full rounded-b-md bg-white ${
            layout === "horizontal"
              ? " grid-cols-1 rounded-b-md px-5"
              : " grid-cols-1 gap-5 px-7 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {posts.map((post, idx) => {
            return (
              idx !== 0 && (
                <PostCard
                  post={post}
                  locale={locale}
                  dictionary={dictionary}
                  key={post?.id}
                />
              )
            );
          })}
        </div>
      </div>
      <div className="flex w-full">
        <PostsListPagination totalRecordsNum={10} locale={locale} />
      </div>
    </div>
  );
};
export default PostList;
