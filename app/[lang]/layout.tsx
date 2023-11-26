import "./globals.css";
import bgPattern from "./styles/islamic-bg-pattern.module.css";
import Header from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import Navigation from "@/components/navigation/navigation";
import { Locale, getDictionary } from "@/lib/dictionary";
import siteConfig from "@/config/site";
import localFont from "next/font/local";
import SideNav from "@/components/navigation/side-nav";
import PathLink from "@/components/navigation/path-link";

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
  const dictionary = await getDictionary(lang as Locale);

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
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang as Locale);

  const appDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang}>
      <body
        className={`${notoKufiArabic.variable} ${reemKufi.variable} m-0 h-full w-screen`}
        style={{
          direction: appDir,
        }}
      >
        <Header locale={lang} />
        <Navigation locale={lang} />
        <div className={` ${bgPattern.bgPattern} relative  w-screen`}>
          <div
            className={`absolute inset-0 h-full w-screen bg-gradient-to-br from-white/40 via-white/30 to-white/20`}
          />

          <div
            className={`absolute inset-0 h-full w-screen bg-gradient-to-br from-black/40 via-black/30 to-black/20`}
          />
          <div className={"h-full backdrop-opacity-100"}>
            {/* <PathLink dictionary={dictionary} /> */}

            <div className="flex h-full">
              <div className=" h-full min-h-[calc(100vh-300px)] w-full py-7">
                {children}
              </div>
              <SideNav locale={lang} />
            </div>
          </div>
        </div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
