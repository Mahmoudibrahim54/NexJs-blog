import { ReactNode } from "react";

export const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-7xl px-8 py-3">{children}</div>;
};
