import styles from "./bg-pattern.module.css";
import icon from "../../styles/islamic-icon.module.css";

import siteConfig from "@/config/site";
import { PaddingContainer } from "../layout/padding-container";
import Link from "next/link";
import { SocialLinks } from "../elements/social-links";
import { useState } from "react";

export const Footer = () => {
  return (
    <div className={` ${styles.styleOne} relative  mt-5 border-t py-8`}>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <PaddingContainer>
          <div className="text-white ">
            <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
            <p className="mt-2 max-w-md text-lg">{siteConfig.description}</p>
          </div>

          {/*social and country section*/}
          <div className="mt-6 flex flex-col flex-wrap justify-between gap-4 text-white md:flex-row ">
            <div>
              <div className="text-lg font-medium">السوشيال ميديا</div>
              <div className="mt-2 flex items-center gap-3">
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

              <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-black opacity-50 shadow-md backdrop-blur-md">
                <div
                  className={`${icon.islamicIcon}`}
                  style={{
                    ["--icon-dim" as any]: "15px",
                  }}
                />
                {siteConfig.country}
              </div>
            </div>
          </div>

          {/*bottom section*/}
          <div className="mt-16 flex flex-wrap items-center  justify-between gap-4 border-t py-3 text-white ">
            <div className="text-sm">
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
    </div>
  );
};
