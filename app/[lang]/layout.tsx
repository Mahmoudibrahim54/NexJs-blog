import "./globals.css";
import bgPattern from "@/app/[lang]/styles/islamic-bg-pattern.module.css";
import Header from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { getDictionary } from "@/lib/dictionary";
import siteConfig from "@/config/site";
import localFont from "next/font/local";
import SideNav from "@/components/navigation/side-nav";
import { getAllCategories } from "@/lib/api/get-data";
import { Category } from "@/types/collection";
import { i18n } from "@/i81n.config";
import { Lang } from "@/types/dictionary";

const notoKufiArabic = localFont({
  src: "../../public/fonts/NotoKufiArabic-VariableFont_wght.woff2",
  variable: "--font-noto-kufi",
});

const reemKufi = localFont({
  src: "../../public/fonts/ReemKufi-VariableFont_wght.woff2",
  variable: "--font-reem-kufi",
});
export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  // Get the dictionary based on Lang
  const dictionary = await getDictionary(lang as Lang);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: {
      template: "%s | " + dictionary.config.siteName,
      default: dictionary.config.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: dictionary.footer.titleOne + " " + dictionary.footer.titleTwo,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: dictionary.footer.titleOne + " " + dictionary.footer.titleTwo,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: siteConfig.twitter.card,
      site: siteConfig.twitter.site,
      title: siteConfig.twitter.title,
      description: siteConfig.twitter.description,
      image: siteConfig.twitter.image,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "ar-SA": `${process.env.NEXT_PUBLIC_SITE_URL}/ar`,
      },
    },
    /* Verification for Google Search Console */
    verification: {
      google: "",
    },
  };
};

export default async function RootLaout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const dictionary = await getDictionary(lang as Lang);
  const categories = await getAllCategories(lang as Lang);

  const appDir = i18n.locales[lang].langDir ?? i18n.defaultLocale.langDir;

  const locale = { lang: lang, langDir: appDir };

  return (
    <html lang={lang}>
      <body
        className={`${notoKufiArabic.variable} ${reemKufi.variable} m-0 h-full w-screen`}
        style={{
          direction: appDir,
        }}
      >
        <Header
          locale={locale}
          dictionary={dictionary}
          categories={categories as Category[]}
        />

        <div className={` ${bgPattern.bgPattern}   w-screen`}>
          <div
            className={`absolute inset-0 h-full w-screen bg-gradient-to-br from-white/40 via-white/30 to-white/20`}
          />

          <div
            className={`absolute inset-0 h-full w-screen bg-gradient-to-br from-black/40 via-black/30 to-black/20`}
          />
          <div className={"h-full backdrop-opacity-100"}>
            {/* <PathLink dictionary={dictionary} /> */}

            <div className="flex h-full w-full flex-wrap items-start justify-center lg:flex-nowrap">
              <div className=" h-full  w-full py-7">{children}</div>
              <SideNav locale={locale} />
            </div>
          </div>
        </div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
