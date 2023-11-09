import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import { Post } from "@/types/collection";
import PostCard from "./post-card";
import { Locale, getDictionary } from "@/utils/get-dictionary";
import { DictionarySchema } from "@/types/dictionary";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
  locale: Locale;
  category: string;
}

export default async function PostList({
  locale,
  posts,
  layout = "vertical",
  category,
}: PostListProps) {
  const dictionary: DictionarySchema = await getDictionary(locale);

  return (
    <div className="flex flex-col  gap-5 py-5 ">
      <div className="flex w-full flex-row items-center gap-5">
        <div
          className={`${styles.islamicIcon} `}
          style={{
            ["--icon-dim" as any]: "30px",
          }}
        />
        <div className=" text-3xl">{dictionary.navigation.links[category]}</div>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} layout={layout} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
