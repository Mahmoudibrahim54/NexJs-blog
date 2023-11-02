import styles from "./bg-pattern.module.css";
import icon from "../../styles/islamic-icon.module.css";

import { BookOpen, ScrollText, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div
      className={`${styles.styleOne} sticky top-0 z-[999]  mt-0 w-screen border-b`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <div className="border-t bg-white bg-opacity-30 py-1 backdrop-blur-md  ">
          <nav>
            <ul className="flex items-center justify-around text-neutral-600 lg:mx-80">
              <li>
                <Link href="/records">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`${icon.islamicIcon} my-3  hidden md:block`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                        ["--icon-color" as any]: "#3D4042",
                      }}
                    ></div>
                    <div className="absolute top-5  hidden md:block">
                      <Video size="30px" color="#898989" />
                    </div>
                    <div className="text-white">فتاوى مرئية ومسموعة</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  {" "}
                  <div className=" flex flex-col items-center justify-center">
                    <div
                      className={`${`${icon.islamicIcon} my-3`} hidden md:block`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                        ["--icon-color" as any]: "#3D4042",
                      }}
                    >
                      {" "}
                    </div>
                    <div className="absolute top-5  hidden md:block">
                      <ScrollText size="30" color="#898989" />{" "}
                    </div>
                    <div className="text-white">الفتاوى والمقالات</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/books">
                  {" "}
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      className={`${`${icon.islamicIcon} my-3  hidden md:block`}`}
                      style={{
                        ["--icon-dim" as any]: "40px",
                        ["--icon-color" as any]: "#3D4042",
                      }}
                    >
                      {" "}
                    </div>
                    <div className="absolute top-5  hidden md:block">
                      <BookOpen size="30" color="#898989" />{" "}
                    </div>
                    <div className="flex w-20 items-center justify-center pr-5 text-white">
                      الكتب
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
