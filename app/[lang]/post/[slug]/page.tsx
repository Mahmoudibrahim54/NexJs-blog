import CTACard from "@/components/elements/cta-card";
import { SocialLinks } from "@/components/elements/social-links";
import { PaddingContainer } from "@/components/layout/padding-container";
import { client } from "@/utils/directus";
import PostBody from "@/components/posts/post-body";
import PostHero from "@/components/posts/post-hero";
import { notFound } from "next/navigation";
import { Locale } from "@/utils/get-dictionary";

export const generateStaticParams = async () => {
  try {
    const posts = await client.items("post").readByQuery({
      filter: {
        status: { _eq: "published" },
      },
      fields: ["slug"],
    });

    const params = posts?.data?.map((post) => {
      return { slug: post.slug as string };
    });
    return params || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

const Page = async ({ params }: { params: { slug: string; lang: Locale } }) => {
  const getPostData = async () => {
    try {
      const post = await client.items("post").readByQuery({
        filter: {
          slug: {
            _eq: params.slug,
          },
        },
        fields: [
          "*",
          "category.id",
          "category.title",
          "category.color",
          "category.slug",
        ],
      });

      return post?.data?.[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching post");
    }
  };

  const post = await getPostData();

  if (!post) {
    notFound();
  }
  return (
    <PaddingContainer>
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero locale={params.lang} post={post} />
        {/*        Post Body and Social Share */}
        <div className="  flex flex-col gap-7 md:flex-row">
          <div className="relative">
            <div className="sticky top-12 flex items-center gap-5 md:top-28 md:flex-col">
              <div className="font-medium md:hidden">شارك هذا المحتوى</div>
              <SocialLinks
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLinks
                isShareURL
                platform="twitter"
                link={`https://www.twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLinks
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        {/* CTA Card */}
        <CTACard locale={params.lang} />
      </div>
    </PaddingContainer>
  );
};
export default Page;
