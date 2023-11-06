import { AlignJustify, ChevronLeft } from "lucide-react";
import { links } from "../../json/nav-links";
import styles from "./bg-pattern.module.css";
import icon from "@/app/styles/islamic-icon.module.css";

import Link from "next/link";

const MobileNave = ({
  setOpen,
  isOpen,
  clicked,
  setClicked,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className=" flex h-full w-full flex-col items-center justify-between px-4 text-gray-50 md:hidden">
      <div className="flex h-full w-full items-center justify-between ">
        <div className="text-3xl text-black">القائمة الرئيسية</div>

        <div
          onClick={() => setOpen(!isOpen)}
          className="z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-[#353738]  text-[#898989] "
        >
          {isOpen ? (
            <AlignJustify size={30} color="#898989" />
          ) : (
            <AlignJustify size={30} color="#898989" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className={`${styles.styleOne}  w-screen border-b`}>
          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

          <div className="absolute inset-0 top-14 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
          <div className="relative z-20">
            <div className="border-t bg-white bg-opacity-30 py-1 backdrop-blur-md  ">
              <ul className=" flex h-screen w-full flex-col items-start justify-start px-5 py-5">
                {links.map(({ id, link, title }) => (
                  <li
                    key={id}
                    className="flex w-full items-center justify-start border-b-2  border-[#353738] px-6 py-11 text-black"
                  >
                    <Link onClick={() => setOpen(!isOpen)} href={link}>
                      <div className="z-20 flex w-96 items-center justify-around gap-7">
                        <div
                          className={`${icon.islamicIcon} `}
                          style={{
                            ["--icon-dim" as any]: "20px",
                          }}
                        />
                        <div className=" w-48 text-3xl">{title}</div>
                        <div onClick={() => {}}>
                          <ChevronLeft strokeWidth="3px" size="30px" />
                        </div>
                      </div>
                    </Link>
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
