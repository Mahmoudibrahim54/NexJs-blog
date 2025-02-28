import Link from "next/link";
import globalIcon from "@/app/[lang]/styles//islamic-icon.module.css";
import { links } from "@/json/nav-links";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/types/dictionary";
import ListTitleBg from "../layout/title-bg";
import { usePathname } from "next/navigation";
import { Category, Subcategory } from "@/types/collection";

const LargeScreenNav = ({
  dictionary,
  categories,
  isVisible,
}: {
  dictionary: Navigation;
  categories: Category[];
  isVisible: boolean;
}) => {
  const [subMenu, setSubMenu] = useState("NONE");
  console.log(subMenu);

  const path = usePathname().split("/");

  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (subMenu === "NONE") return;

    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setSubMenu("NONE");
      }
    }

    window.addEventListener("mousedown", handleClick);

    // clean up
    return () => window.removeEventListener("mousedown", handleClick);
  }, [subMenu]);

  function MenuItem({
    id,
    link,
    icon,
    title,
  }: {
    id: number;
    link: string;
    icon?: JSX.Element;
    title: string;
    subcategories?: Subcategory[];
  }) {
    return (
      <li key={id}>
        <div
          onClick={() => {
            console.log(link);

            subMenu === link ? setSubMenu("NONE") : setSubMenu(link);
          }}
          className={`${
            subMenu === link && "bg-button-primary-color"
          } flex  flex-col items-center justify-center hover:cursor-pointer  lg:w-40`}
        >
          {" "}
          <div
            className={`relative flex h-full  items-center justify-center transition-all duration-500 ease-out ${
              !isVisible && "hidden h-0"
            }`}
          >
            <div
              className={`${`${globalIcon.islamicIcon} my-3`} relative h-full w-full items-center  justify-center hover:bg-secondary-color hover:before:bg-secondary-color md:block ${
                !isVisible && "hidden h-0"
              }`}
              style={{
                ["--icon-dim" as any]: "40px",
                ["--icon-color" as any]:
                  (path.length > 2 && path[2] === link.slice(1)) ||
                  (path.length === 2 && link === "/")
                    ? "var(--secondary-color)"
                    : "var(--primary-color)",
              }}
            >
              <div className="absolute left-[2px] top-[2px] -rotate-45 ">
                {icon}
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-between gap-1">
            <div
              className={`text-lg font-semibold text-neutral-100 ${
                !isVisible && "hover:text-secondary-color"
              }`}
            >
              {dictionary.links[title]}
            </div>
            {categories.some(({ slug }) => slug === link.slice(1)) && (
              <div className="flex h-full items-center justify-center">
                <div>
                  <KeyboardArrowDown
                    fontSize="small"
                    sx={{ color: "var(--button-primary-color)" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }
  function SubMenuItem({
    id,
    link,
    subcategories,
  }: {
    id: number;
    link: string;
    subcategories?: Subcategory[];
  }) {
    return (
      <div
        key={id}
        className={` 
      
         absolute top-[21]  rounded-b-md pt-[3px] transition-all duration-500 ease-in-out lg:w-40   ${
           subMenu === link ? "max-h-52 " : "invisible max-h-0"
         }`}
      >
        <ListTitleBg
          tw={{
            overlay: "rounded-b-md",
          }}
          isBg={true}
        >
          <ul className=" flex-col items-start justify-start ">
            {subcategories?.map(({ slug, title, id }, idx) => (
              <li
                key={id}
                className={`flex  items-center justify-start ${
                  idx !== subcategories.length! - 1 &&
                  "border-b-2  border-primary-color"
                }  py-3 text-neutral-300 hover:bg-button-primary-color hover:text-secondary-color`}
              >
                <Link
                  className=" flex  w-full items-center justify-around gap-7 px-5"
                  href={`${link}/${slug}`}
                  onClick={() =>
                    setTimeout(() => {
                      setSubMenu("NONE");
                    }, 1000)
                  }
                >
                  <div className="text-lg">{title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </ListTitleBg>
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <ul>
        <div
          ref={dropdown}
          className="flex items-center justify-around font-reem-kufi text-neutral-600 lg:mx-80"
        >
          {Object.values(links)?.map(({ id, link, title, icon }) => {
            const subcategories = categories?.find(
              ({ slug }) => slug === link?.slice(1),
            )?.subcategories;
            return subcategories && subcategories?.length > 1 ? (
              <div key={id}>
                <MenuItem
                  id={id}
                  link={link}
                  title={title}
                  icon={icon}
                  subcategories={subcategories}
                />

                <SubMenuItem
                  id={id}
                  link={link}
                  subcategories={subcategories}
                />
              </div>
            ) : (
              <Link href={link} key={id}>
                <MenuItem
                  id={id}
                  link={link}
                  title={title}
                  icon={icon}
                  subcategories={subcategories}
                />
              </Link>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default LargeScreenNav;
