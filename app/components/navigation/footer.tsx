import siteConfig from "@/config/site";
import { PaddingContainer } from "../layout/padding-container";
import Link from "next/link";
import { SocialLinks } from "../elements/social-links";

export const Footer = () => {
  return (
    <div className="py-8 mt-10 border-t  bg-blue-950  text-white">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-lg">{siteConfig.description}</p>
        </div>

        {/*social and country section*/}
        <div className="mt-6 flex justify-between gap-4 flex-wrap">
          <div>
            <div className="font-medium text-lg">السوشيال ميديا</div>
            <div className="flex items-center gap-3 mt-2">
              <SocialLinks
                platform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
              <SocialLinks
                platform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <SocialLinks
                platform="facebook"
                link={siteConfig.socialLinks.facebook}
              />
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">البلد</div>

            <div className="px-3 py-2 bg-white shadow-md rounded-md flex items-center gap-2 text-sm text-black">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              {siteConfig.country}
            </div>
          </div>
        </div>

        {/*bottom section*/}
        <div className="border-t py-3 flex flex-wrap items-center justify-between mt-16 gap-4 ">
          <div className="text-sm">
            Made by{" "}
            <Link
              className="underline underline-offset-4"
              href="https://www.linkedin.com/in/mahmoud-m-ibrahim/"
            >
              Mahmoud Ibrahim
            </Link>
          </div>
          <div className="text-sm text-neutral-400">
            All rights reserved | Copyright {new Date().getFullYear()}
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};
