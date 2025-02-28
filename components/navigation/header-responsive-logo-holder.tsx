import { Config, Locale } from "@/types/dictionary";
import Image from "next/image";
import Link from "next/link";

const LogoHolder = ({
  locale,
  config,
  isVisible,
}: {
  locale: Locale;
  config: Config;
  isVisible: boolean;
}) => {
  const { langDir } = locale;

  return (
    <Link href={`/`}>
      <div className={`${!isVisible && "hidden"}`}>
        <Image
          src={`${
            langDir === "rtl"
              ? `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_ar.png`
              : `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_en.png`
          }`}
          alt={config?.siteName}
          width={`${langDir === "rtl" ? "270" : "400"}`}
          height="100"
        />
      </div>
      <div className={`${isVisible && "hidden"}`}>
        <Image
          src={`${
            langDir === "rtl"
              ? `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_sm_ar.png`
              : `${process.env.NEXT_PUBLIC_SITE_URL}/website_logo_sm_en.png`
          }`}
          alt={config?.siteName}
          width={`${langDir === "rtl" ? "270" : "400"}`}
          height="100"
        />
      </div>
    </Link>
  );
};

export default LogoHolder;
