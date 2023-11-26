import Link from "next/link";
import styles from "@/app/[lang]/styles//islamic-icon.module.css";
import { ChevronsRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="w-screen">
      <div className="absolute inset-0 z-10 w-screen bg-gradient-to-br from-black/100 via-black/50 to-black/0" />
      <div className="relative z-20 h-full">
        <div className="flex h-96 flex-col items-center justify-center">
          <div className="z-20 flex h-40 w-full items-center justify-center gap-8">
            <div
              className={`${styles.islamicIcon} z-30`}
              style={{
                ["--icon-dim" as any]: "30px",
              }}
            />
            <h3 className="z-30 text-2xl md:text-4xl"> المحتوى تحت التطوير</h3>
            <div
              className={`${styles.islamicIcon} z-30 `}
              style={{
                ["--icon-dim" as any]: "30px",
              }}
            />
          </div>

          <Link
            className="flex h-14 w-72 items-center justify-center gap-px rounded-md bg-primary-color text-button-primary-color"
            href="/"
          >
            <ChevronsRight size="35px" />
            <h3 className="text-xl md:text-2xl"> العودة للصفحة الرئيسية</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
