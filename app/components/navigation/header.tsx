import styles from "./bg-pattern.module.css";

import Link from "next/link";
import { PaddingContainer } from "../layout/padding-container";
import { Video, ScrollText, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <div
      className={`${styles.styleOne} relative z-[999] mb-0 w-screen border-b`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <PaddingContainer>
          <div className="flex w-52 flex-col items-start justify-center py-5   md:items-center ">
            <Link href="/">
              <h1 className="text-2xl  font-bold text-white">موقع الشيخ</h1>
              <div className="text-2xl font-bold text-white">
                أسامة عبد العظيم
              </div>
            </Link>
          </div>
        </PaddingContainer>
      </div>
    </div>
  );
};

export default Header;
