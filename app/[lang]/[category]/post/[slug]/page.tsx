import CTACard from "@/components/elements/cta-card";
import { SocialLinks } from "@/components/elements/social-links";
import { PaddingContainer } from "@/components/layout/padding-container";
import { client } from "@/lib/directus";
import PostBody from "@/components/posts/post-body";
import PostHero from "@/components/posts/post-hero";
import { notFound } from "next/navigation";
import { Locale, getDictionary } from "@/lib/dictionary";
import { cache } from "react";
import { DictionarySchema } from "@/types/dictionary";
import siteConfig from "@/config/site";

export const getPostData = cache(async (slug: string, lang: Locale) => {
  try {
    const post = await client.items("post").readByQuery({
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: ["*", "category.*", "translations.*", "category.translations.*"],
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

//Generate Metadata Function

// Generate Metadata Function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  // Get Post Data from Directus
  const post = await getPostData(slug, lang as Locale);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      siteName: post?.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "ar-SA": `${process.env.NEXT_PUBLIC_SITE_URL}/ar/post/${slug}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
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
    throw new Error("Error fetching posts");
  }
};
const Page = async ({
  params,
}: {
  params: { slug: string; lang: Locale; category: string };
}) => {
  const post = await getPostData(params.slug, params.lang);

  if (!post || params.category !== post?.category?.slug) {
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
  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container */}
      <div className="space-y-10 rounded-md bg-white px-5 py-10 shadow-md">
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
