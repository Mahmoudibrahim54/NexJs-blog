"use client";

import {
  ArrowBackIos,
  ArrowForwardIos,
  Menu,
  Clear,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { links } from "../../json/nav-links";
import styles from "./bg-pattern.module.css";
import icon from "@/app/[lang]/styles//islamic-icon.module.css";

import Link from "next/link";
import { useState } from "react";
import { DictionarySchema, Locale } from "@/types/dictionary";
import { Category } from "@/types/collection";
import { usePathname } from "next/navigation";

const MobileNave = ({
  locale,
  dictionary,
  categories,
  isVisible,
}: {
  locale: Locale;
  dictionary: DictionarySchema;
  categories: Category[];
  isVisible: boolean;
}) => {
  const { langDir } = locale;

  const [nav, setNav] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState("NONE");
  const currentPath = usePathname().split("/")[2];

  function MenuItem({ link, title }: { link?: string; title: string }) {
    return (
      <li
        className="flex w-screen items-center justify-between border-b-2  border-primary-color py-5 text-button-primary-color focus:text-secondary-color"
        onClick={() => {
          link
            ? isSubMenu === link
              ? setIsSubMenu("NONE")
              : setIsSubMenu(link)
            : setTimeout(() => {
                setNav(true);
                setIsSubMenu("NONE");
              }, 200);
        }}
      >
        <div className="z-20 flex  w-full items-center justify-between gap-5 px-5">
          <div
            className={`${icon.islamicIcon}`}
            style={{
              ["--icon-dim" as any]: "20px",
            }}
          />
          <div className=" w-46 flex-grow text-2xl">
            {dictionary.navigation.links[title]}
          </div>
        </div>

        <div className="border-b-md flex w-16 items-center justify-end">
          {((isSubMenu === "NONE" &&
            categories.some(({ slug }) => slug === link?.slice(1))) ||
            !link) && (
            <div className="pe-7">
              {langDir === "rtl" ? (
                <ArrowBackIos
                  fontSize="medium"
                  sx={{ color: "var(--button-primary-color)" }}
                />
              ) : (
                <ArrowForwardIos
                  fontSize="medium"
                  sx={{ color: "var(--button-primary-color)" }}
                />
              )}
            </div>
          )}
        </div>
      </li>
    );
  }

  function SubmenuItem({
    link,
    slug,
    title,
  }: {
    link: string;
    slug?: string;
    title: string;
  }) {
    return (
      <li className="flex w-screen items-center justify-start border-b-2  border-primary-color py-5 text-button-primary-color">
        <Link
          className="z-20 flex  w-full items-center justify-around gap-7 px-5"
          href={`${slug ? link + "/" + slug : link}`}
          onClick={() =>
            setTimeout(() => {
              setNav(false);
            }, 200)
          }
        >
          <div
            className={`${icon.islamicIcon}`}
            style={{
              ["--icon-dim" as any]: "20px",
            }}
          />
          <div className=" w-46 flex-grow text-2xl">{title}</div>
        </Link>
      </li>
    );
  }

  return (
    <div className=" flex h-full w-full flex-col items-center justify-between px-2 text-neutral-300 md:hidden md:px-4">
      <div className="flex h-full w-full items-center justify-between ">
        <div className="my-1 w-full font-reem-kufi text-xl text-primary-color">
          {dictionary.navigation.links?.[currentPath] ||
            dictionary.mainPage.mainPage}
        </div>
        <div
          className={`flex w-full items-center justify-end ${
            !isVisible && "hidden"
          }`}
        >
          <div
            className={`z-10 my-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-primary-color`}
          >
            {nav ? (
              <Clear
                fontSize="large"
                sx={{ color: "var(--button-primary-color)" }}
                onClick={(e) => {
                  setTimeout(() => {
                    setNav(false);
                  }, 200);
                  setIsSubMenu("NONE");
                  e.stopPropagation();
                }}
              />
            ) : (
              <Menu
                fontSize="large"
                sx={{ color: "var(--button-primary-color)" }}
                onClick={(e) => {
                  setNav(true);
                }}
              />
            )}
          </div>
        </div>
        <div
          className={`flex h-full items-center justify-center gap-2 ${
            isVisible && "hidden"
          }`}
          onClick={(e) => {
            setNav(!nav);
            isSubMenu !== "NONE" && setIsSubMenu("NONE");
          }}
        >
          <div
            className={`z-10 mx-3 my-2 flex h-5 w-5 cursor-pointer  items-center justify-center rounded-md font-reem-kufi text-xl`}
          >
            {dictionary.navigation.links.menu}
          </div>
          <div
            className={`${
              isVisible && "hidden"
            } flex h-5 w-5 items-center justify-center rounded-full bg-secondary-color `}
          >
            <KeyboardArrowDown
              fontSize="small"
              sx={{ color: "var(--button-primary-color)" }}
            />
          </div>
        </div>
      </div>
      {nav && (
        <div
          className={`${styles.islamicBgPattern} ${
            nav && "duration-2000 transition-all ease-out"
          }  mt-1 w-screen border-b font-reem-kufi text-neutral-300 `}
        >
          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
          <div className="relative z-20 ">
            <div className="border-t bg-white bg-opacity-30 py-1  backdrop-blur-md">
              <ul className=" ac flex h-screen w-screen flex-col items-start justify-start py-5">
                {Object.values(links)?.map(({ id, link, title }) => {
                  const subcategories = categories?.find(
                    ({ slug }) => slug === link.slice(1),
                  )?.subcategories;
                  return subcategories && subcategories.length > 1 ? (
                    <div key={id}>
                      <div>
                        {isSubMenu === "NONE" && (
                          <MenuItem link={link} title={title} />
                        )}
                      </div>
                      {isSubMenu === link && <MenuItem title={"mainMenu"} />}
                      {isSubMenu === link &&
                        subcategories.map((subcategory) => (
                          <SubmenuItem
                            key={subcategory.id}
                            link={link}
                            slug={subcategory.slug}
                            title={subcategory.title}
                          />
                        ))}
                    </div>
                  ) : (
                    isSubMenu === "NONE" && (
                      <Link
                        key={id}
                        href={link}
                        onClick={() =>
                          setTimeout(() => {
                            setNav(false);
                          }, 200)
                        }
                      >
                        <MenuItem link={link} title={title} />
                      </Link>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNave;
