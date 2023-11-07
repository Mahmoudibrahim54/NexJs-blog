import styles from "./bg-pattern.module.css";

import Link from "next/link";
import { PaddingContainer } from "../layout/padding-container";

const Header = () => {
  return (
    <div
      className={`${styles.styleOne} relative z-[999] mb-0 w-screen border-b px-7`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <div className="flex w-52 flex-col items-start justify-center py-5   md:items-center ">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-200">موقع الشيخ</h1>
            <div className="text-2xl font-bold text-gray-200">
              أسامة عبد العظيم
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
