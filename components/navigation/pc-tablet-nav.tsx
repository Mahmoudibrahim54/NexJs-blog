"use client";

import Link from "next/link";
import globalIcon from "@/app/[lang]/styles//islamic-icon.module.css";
import { links } from "@/json/nav-links";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Locale } from "@/lib/dictionary";
import { Navigation } from "@/types/dictionary";
import ListTitle from "../layout/title-bg";
import { useParams, usePathname } from "next/navigation";

const LargeScreenNav = ({
  dictionary,
  locale,
}: {
  dictionary: Navigation;
  locale: Locale;
}) => {
  const [subMenu, setSubMenu] = useState("NONE");
  const path = usePathname().split("/");

  return (
    <div className="hidden md:block">
      <ul className="  flex items-center justify-around font-reem-kufi text-neutral-600 lg:mx-80">
        {links.map(({ id, link, title, icon, mobileOnly }) => {
          return (
            !mobileOnly && (
              <li key={id}>
                <Link
                  href={`${link}` || "/"}
                  onMouseOver={() => setSubMenu(link)}
                  onMouseLeave={() => setSubMenu("NONE")}
                >
                  <div className=" flex  w-44 flex-col items-center justify-center">
                    <div
                      className={`${`${globalIcon.islamicIcon} my-3`} hidden md:block`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                        ["--icon-color" as any]: path.includes(link.slice(1))
                          ? "var(--secondary-color)"
                          : "var(--primary-color)",
                      }}
                    ></div>

                    <div className="absolute top-[21px]  block">{icon}</div>
                    <div className=" flex items-center justify-between gap-1">
                      <div className=" text-md font-semibold text-gray-200">
                        {dictionary.links[title]}
                      </div>
                      <div
                        className="flex h-full items-center justify-center"
                        onClick={() => {}}
                      >
                        <div>
                          <ChevronDown
                            strokeWidth="3px"
                            size="20px"
                            color="var(--primary-color)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {subMenu === link && (
                    <div className="absolute mt-[3px]  h-[300px] w-40 rounded-b-md">
                      <ListTitle
                        tw={{
                          bg: "h-[300px]",
                          overlay: "rounded-b-md h-[300px]",
                        }}
                      >
                        <div className="flex flex-col"></div>
                      </ListTitle>
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
