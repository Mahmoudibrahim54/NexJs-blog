import Link from "next/link";
import globalIcon from "@/app/styles/islamic-icon.module.css";
import { links } from "@/json/nav-links";
import React from "react";
import { ChevronDown } from "lucide-react";

const LargeScreenNav = ({
  clicked,
  setClicked,
}: {
  clicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="hidden  md:block">
      <ul className="flex  items-center justify-around text-neutral-600 lg:mx-80">
        {links.map(({ id, link, title, icon, mobileOnly }) => {
          return (
            !mobileOnly && (
              <li key={id}>
                <Link href={link}>
                  <div className=" flex  w-40 flex-col items-center justify-center">
                    <div
                      className={`${`${globalIcon.islamicIcon} my-3`} hidden md:block`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                      }}
                    ></div>

                    <div className="absolute top-[21px]  block">{icon}</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="ms-5 text-white">{title} </div>
                      <div className="w-5 rounded-md bg-[#353738]">
                        <ChevronDown
                          strokeWidth="3px"
                          size="20px"
                          color="#898989"
                        />
                      </div>
                    </div>
                  </div>
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
