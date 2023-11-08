"use client";

import Link from "next/link";
import globalIcon from "@/app/[lang]/styles//islamic-icon.module.css";
import { links } from "@/json/nav-links";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Navigation } from "@/dictionaries/schema";
import { Locale } from "@/utils/get-dictionary";

const LargeScreenNav = ({
  dictionary,
  locale,
}: {
  dictionary: Navigation;
  locale: Locale;
}) => {
  const [isSubMenu, SetIsSubMenu] = useState("NONE");

  return (
    <div className="hidden  md:block">
      <ul className="flex  items-center justify-around text-neutral-600 lg:mx-80">
        {links.map(({ id, link, title, icon, mobileOnly }) => {
          return (
            !mobileOnly && (
              <li key={id}>
                <Link
                  href={`${locale}/${link}`}
                  onMouseOver={() => SetIsSubMenu(link)}
                  onMouseLeave={() => SetIsSubMenu("NONE")}
                >
                  <div className=" flex  w-40 flex-col items-center justify-center">
                    <div
                      className={`${`${globalIcon.islamicIcon} my-3`} hidden md:block`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                      }}
                    ></div>

                    <div className="absolute top-[21px]  block">{icon}</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className=" text-gray-200">
                        {dictionary.links[title]}
                      </div>
                    </div>
                  </div>
                  {isSubMenu === link && (
                    <div
                      className="items-top absolute flex h-[300px] w-40   justify-center rounded-b-md bg-primary-color"
                      onClick={() => {}}
                    >
                      <ChevronDown
                        strokeWidth="3px"
                        size="20px"
                        color="#898989"
                      />
                    </div>
                  )}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default LargeScreenNav;
