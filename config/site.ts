export interface SiteConfig {
  siteName: string;
  description: string;
  country: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "الشيخ اسامة عبد العظيم",
  description: "الموقع الرسمي لفضيلة الشيخ اسامة عبد العظيم",
  country: "الإسكندرية",
  socialLinks: {
    facebook: "",
    twitter: "",
    youtube: "",
  },
};

export default siteConfig;
