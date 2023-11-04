"use client";
import styles from "./bg-pattern.module.css";

import { useState } from "react";
import MobileNave from "./monile-nav";
import LargeScreenNav from "./pc-tablet-nav";

export default function Navigation() {
  const [nav, setNav] = useState(false);

  return (
    <div
      className={`${styles.styleOne} sticky top-0 z-[999]  mt-0 w-screen border-b`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/95 via-black/70 to-black/30" />
      <div className="relative z-20">
        <div className="border-t bg-white bg-opacity-30 py-1 backdrop-blur-md  ">
          <MobileNave isOpen={nav} setOpen={setNav} />
          <LargeScreenNav />
        </div>
      </div>
    </div>
  );
}
