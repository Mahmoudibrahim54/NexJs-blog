import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CTACard from "@/app/components/elements/cta-card";
import { SocialLinks } from "@/app/components/elements/social-links";
import { PaddingContainer } from "@/app/components/layout/padding-container";
import PostBody from "@/app/components/posts/post-body";
import PostHero from "@/app/components/posts/post-hero";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => {
    return { slug: post.slug };
  });
};

const Page = ({ params }: { params: { slug: string } }) => {
  const post = DUMMY_POSTS.find((post) => post.slug == params.slug);

  if (!post) {
    notFound();
  }
  return (
    <PaddingContainer>
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}

        <PostHero post={post} />
        {/* Post Body and Social Share*/}
        <div className="flex flex-col gap-7 md:flex-row">
          <div className="relative">
            <div className="sticky top-28 flex items-center gap-5 md:flex-col">
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
        <CTACard />
      </div>
    </PaddingContainer>
  );
};
export default Page;
