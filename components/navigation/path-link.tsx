"use client";

import { DictionarySchema } from "@/types/dictionary";
import { usePathname } from "next/navigation";

const PathLink = ({ dictionary }: { dictionary: DictionarySchema }) => {
  const path = usePathname();
  const pathArray = path?.split("/").slice(2);
  return (
    pathArray.length > 0 && (
      <div className="px-16 py-5">
        <div className="flex h-[10] w-full items-center justify-start gap-1 bg-button-primary-color">
          {pathArray.map((pathEl, idx) => {
            return (
              <div
                key={pathEl}
                className={`${
                  idx === pathArray.length - 1
                    ? "text-secondary-color"
                    : "text-button-secondary-color"
                }`}
              >{`${dictionary?.navigation?.links?.[pathEl] || pathEl}/`}</div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default PathLink;
