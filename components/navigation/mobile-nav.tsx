"use client";

import { AlignJustify, ChevronLeft, X } from "lucide-react";
import { links } from "../../json/nav-links";
import styles from "./bg-pattern.module.css";
import icon from "@/app/[lang]/styles//islamic-icon.module.css";

import Link from "next/link";
import { useState } from "react";
import { Locale } from "@/lib/dictionary";
import { DictionarySchema } from "@/types/dictionary";

const MobileNave = ({
  dictionary,
  locale,
}: {
  dictionary: DictionarySchema;
  locale: Locale;
}) => {
  const [nav, setNav] = useState(false);
  const [isSubMenu, SetIsSubMenu] = useState("NONE");

  return (
    <div className=" flex h-full w-full flex-col items-center justify-between px-4 text-gray-50 md:hidden">
      <div className="flex h-full w-full items-center justify-between ">
        <div className="text-3xl text-black">
          {dictionary.mainPage?.mainPage}
        </div>

        <div className="z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-primary-color  text-[var(--button-primary-color)] ">
          {nav ? (
            <X
              size={30}
              color="var(--button-primary-color)"
              onClick={(e) => {
                setNav(false);
                SetIsSubMenu("NONE");
                e.stopPropagation();
              }}
            />
          ) : (
            <AlignJustify
              size={30}
              color="var(--button-primary-color)"
              onClick={(e) => {
                setNav(true);
              }}
            />
          )}
        </div>
      </div>
      {nav && (
        <div className={`${styles.islamicBgPattern}  w-screen border-b`}>
          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
          <div className="relative z-20 ">
            <div
              className="border-t bg-white bg-opacity-30 py-1 backdrop-blur-md  "
              onClick={() => {
                setTimeout(() => {
                  setNav(false);
                }, 1000);
              }}
            >
              <ul className=" ac flex h-screen w-screen flex-col items-start justify-start py-5">
                {links.map(({ id, link, title }) => (
                  <li
                    key={id}
                    className="flex w-screen items-center justify-start border-b-2  border-primary-color py-11 text-black"
                  >
                    {isSubMenu === "NONE" && (
                      <Link
                        className="z-20 flex  w-full items-center justify-around gap-7 px-5"
                        href={`${link}` || "/"}
                      >
                        <div
                          className={`${icon.islamicIcon}`}
                          style={{
                            ["--icon-dim" as any]: "20px",
                          }}
                        />
                        <div className=" w-46 flex-grow text-3xl">
                          {dictionary.navigation.links[title]}
                        </div>
                      </Link>
                    )}
                    {/* <div
                      className="bordor- flex w-16 items-center justify-end border-s-4"
                      onClick={() => {
                        SetIsSubMenu(link);
                      }}
                    >
                      {isSubMenu === "NONE" && (
                        <ChevronLeft strokeWidth="3px" size="30px" />
                      )}
                    </div> */}

                    {isSubMenu === link && <div className=""></div>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNave;
