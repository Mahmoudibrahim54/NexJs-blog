import { ReactNode } from "react";
import styles from "@/app/[lang]/styles/islamic-icon.module.css";
import TitleElement from "../elements/title-link";

const ListTitleBg = ({
  tw,
  link,
  title,
  iconDim,
  isBg = false,
  children,
}: {
  children?: ReactNode;
  link?: string;
  title?: string;
  iconDim?: string;
  tw?: { bg?: string; overlay?: string; main?: string };
  isBg?: boolean;
}) => {
  return (
    <div
      className={`${
        !isBg &&
        "text-md border-fourth-color mb-2 flex h-10 w-auto flex-col  items-start justify-center border-b-2  font-reem-kufi "
      } ${tw?.main && tw?.main}`}
    >
      <div
        className={`${styles.islamicBgPattern} relative  ${tw?.bg && tw?.bg}`}
      >
        <div
          className={`${
            tw?.overlay && tw?.overlay
          }  absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30`}
        />

        <div
          className={`${
            tw?.overlay && tw?.overlay
          }  absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-black/30`}
        />

        <div
          className={`${
            tw?.overlay && tw?.overlay
          }    bg-white bg-opacity-30 backdrop-blur-md`}
        >
          {!isBg && iconDim && title ? (
            <TitleElement link={link} title={title} iconDim={iconDim} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default ListTitleBg;
