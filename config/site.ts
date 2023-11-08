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
  siteName: "siteName",
  description: "description",
  country: "country",
  socialLinks: {
    facebook: "",
    twitter: "",
    youtube: "",
  },
};

export default siteConfig;
