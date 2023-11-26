import React, { ReactNode } from "react";
import styles from "@/app/[lang]/styles/islamic-icon.module.css";

const TitleBg = ({
  children,
  tw,
}: {
  children: ReactNode;
  tw?: { bg?: string; overlay?: string };
}) => {
  return (
    <div className={`${styles.islamicBgPattern} relative  ${tw?.bg}`}>
      <div
        className={`${tw?.overlay}  absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30`}
      />

      <div
        className={`${tw?.overlay}  absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-black/30`}
      />

      <div
        className={`${tw?.overlay}   bg-white bg-opacity-30 py-1 backdrop-blur-md`}
      >
        {children}
      </div>
    </div>
  );
};

export default TitleBg;
