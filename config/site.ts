export interface SiteConfig {
  siteName: string;
  description: string;
  country: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
  };
  openGraph: { title: string; description: string; image: string };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "موقع | الشيخ اسامة عبد العظيم رحمه الله",
  description: "description",
  country: "country",
  socialLinks: {
    facebook: "",
    twitter: "",
    youtube: "",
  },
  openGraph: {
    title: "",
    description: "",
    image: "",
  },
  twitter: {
    card: "",
    site: "",
    title: "",
    description: "",
    image: "",
  },
};

export default siteConfig;
