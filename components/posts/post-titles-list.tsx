import { Post } from "@/types/collection";
import Link from "next/link";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Locale } from "@/types/dictionary";

interface PostTitlesListProps {
  posts: Post[];
  locale: Locale;
}

const PostTitlesList = ({ locale, posts }: PostTitlesListProps) => {
  const { langDir } = locale;

  return (
    <div className=" mb-5 flex min-h-[200px] w-full  flex-col rounded-md shadow-md">
      <div className="  h-full min-h-[300px] rounded-b-md bg-white shadow-md">
        <div className={`grid grid-cols-1 rounded-b-md  bg-white  px-5`}>
          {posts.map((post, idx) => (
            <Link
              href={`/${post?.category?.slug}/${post?.subcategory?.slug}/post/${post.slug}`}
              key={post?.id}
              className="  my-3 flex max-h-[300px] items-start border-b-2 pb-6 text-secondary-color"
            >
              {langDir === "rtl" ? (
                <div>
                  <ArrowBackIos
                    fontSize="medium"
                    sx={{ color: "var(--secondary-color)" }}
                  />
                </div>
              ) : (
                <div>
                  <ArrowForwardIos
                    fontSize="medium"
                    sx={{ color: "var(--secondary-color)" }}
                  />
                </div>
              )}
              <h2
                className={`${" text-md px-7   font-bold  @md:text-xl @lg:text-2xl"}`}
              >
                {post?.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostTitlesList;
