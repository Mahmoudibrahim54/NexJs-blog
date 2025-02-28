import CTACard from "@/components/elements/cta-card";
import { SocialLinks } from "@/components/elements/social-links";
import { PaddingContainer } from "@/components/layout/padding-container";
import PostBody from "@/components/posts/post-body";
import PostHero from "@/components/posts/post-hero";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { DictionarySchema, Lang } from "@/types/dictionary";
import { getPostData } from "@/lib/api/get-data";
import { getPostMetadata } from "@/lib/get-metadata";
import { getPostStaticParams } from "@/lib/get-static-params";
import { i18n } from "@/i81n.config";
import ListTitleBg from "@/components/layout/title-bg";

// Generate Metadata Function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: Lang;
  };
}) => {
  return getPostMetadata(slug, lang);
};

export const generateStaticParams = async () => {
  return await getPostStaticParams();
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: Lang;
    category: string;
    subcategory: string;
  };
}) => {
  const locale = i18n.locales[params.lang];

  const { lang } = locale;

  const post = await getPostData(params.slug, lang);

  if (
    !post ||
    params.category !== post?.category?.slug ||
    params.subcategory !== post?.subcategory?.slug
  ) {
    notFound();
  }
  const dictionary: DictionarySchema = await getDictionary(params.lang);

  //Structured Data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    //  "alternativeHeadline": "This article is also about robots and stuff",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${post?.image}`,
    author: dictionary.config.siteName,
    //  "award": "Best article ever written",
    //  "editor": "Craig Mount",
    genre: post?.category?.title + " " + post.subcategory?.title,
    keywords: post?.keywords,
    // wordcount: "1120",
    publisher: {
      "@type": "public figure",
      name: dictionary.config.siteName,
      // logo: {
      //   "@type": "ImageObject",
      //   url: "https://google.com/logo.jpg",
      // },
    },
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post?.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://google.com/article",
    },
    datePublished: new Date(post?.date_created)?.toISOString(),
    dateCreated: new Date(post?.date_created)?.toISOString(),
    dateModified: new Date(post?.date_updated)?.toISOString(),
    description: post?.description,
    articleBody: post?.body,
  };

  const iconConfig = {
    iconColor: "var(--primary-color)",
    iconFontSize: "large" as "small" | "large" | "medium",
  };
  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container */}
      <div className="my-12  flex h-full w-full flex-col gap-10 space-y-10 rounded-md bg-white px-5 py-10 shadow-md">
        {/* Post Hero */}
        <PostHero locale={locale} post={post} dictionary={dictionary} />
        {/*        Post Body and Social Share */}

        <div className=" flex h-full flex-col gap-7 md:flex-row">
          <div className="font-reem-kufi text-xl text-primary-color md:hidden">
            {dictionary.socialLinks.shareLarge}{" "}
          </div>
          <div className="sticky top-[73px] flex md:top-32 md:h-full md:flex-col">
            <ListTitleBg
              isBg={true}
              tw={{
                bg: "md:rounded-full  w-full  rounded-b-full md:w-20 min-h-[60px] md:h-[475px]",
                overlay: "md:rounded-full rounded-b-full    h-full",
                main: " h-full w-full ",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-5">
                <div className="hidden h-14 w-full items-center  justify-center rounded-t-full bg-secondary-color font-reem-kufi font-medium text-button-primary-color md:flex">
                  {dictionary.socialLinks.shareMini}
                </div>
                <div className="my-2 flex h-full flex-wrap items-center justify-center gap-4 md:flex-col md:gap-5">
                  <SocialLinks
                    isShareURL
                    platform="facebook"
                    link={`https://www.facebook.com/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                    fontSize={iconConfig.iconFontSize}
                    iconColor={iconConfig.iconColor}
                  />
                  <SocialLinks
                    isShareURL
                    platform="twitter"
                    link={`https://www.twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                    fontSize={iconConfig.iconFontSize}
                    iconColor={iconConfig.iconColor}
                  />
                  <SocialLinks
                    isShareURL
                    platform="linkedin"
                    link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                    fontSize={iconConfig.iconFontSize}
                    iconColor={iconConfig.iconColor}
                  />
                  <SocialLinks
                    isShareURL
                    platform="whatsapp"
                    link={""}
                    fontSize={iconConfig.iconFontSize}
                    iconColor={iconConfig.iconColor}
                  />
                  <SocialLinks
                    isShareURL
                    platform="telegram"
                    link={""}
                    fontSize={iconConfig.iconFontSize}
                    iconColor={iconConfig.iconColor}
                  />
                </div>
              </div>
            </ListTitleBg>
          </div>
          <div className="max-w-fit">
            <PostBody body={post.body} />
          </div>
        </div>
        <div>
          {/* CTA Card */}
          <CTACard locale={locale} />
        </div>
      </div>
    </PaddingContainer>
  );
};
export default Page;
