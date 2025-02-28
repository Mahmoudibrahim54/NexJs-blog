import {
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  WhatsApp,
  Telegram,
} from "@mui/icons-material";
import Link from "next/link";

export const SocialLinks = ({
  platform,
  link,
  fontSize,
  isShareURL,
  iconColor,
}: {
  platform: string;
  link: string;
  fontSize: "small" | "medium" | "large";
  isShareURL?: boolean;
  iconColor: string;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook fontSize={fontSize} sx={{ color: iconColor }} />;
      case "twitter":
        return <Twitter fontSize={fontSize} sx={{ color: iconColor }} />;
      case "youtube":
        return <YouTube fontSize={fontSize} sx={{ color: iconColor }} />;

      case "linkedin":
        return <LinkedIn fontSize={fontSize} sx={{ color: iconColor }} />;

      case "whatsapp":
        return <WhatsApp fontSize={fontSize} sx={{ color: iconColor }} />;

      case "telegram":
        return <Telegram fontSize={fontSize} sx={{ color: iconColor }} />;
    }
  };
  return (
    <Link href={link || "/"}>
      <div
        className={`${
          isShareURL
            ? " flex h-11 w-11 items-center justify-center rounded-full bg-neutral-300 hover:bg-secondary-color hover:text-neutral-300 md:h-14 md:w-14"
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};
