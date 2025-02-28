import { ReactNode } from "react";

export const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className=" h-full w-full  px-3 py-7 md:px-8">{children}</div>;
};
