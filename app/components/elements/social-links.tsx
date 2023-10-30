import { Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export const SocialLinks = ({
  platform,
  link,
}: {
  platform: string;
  link: string;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size="18" />;
      case "twitter":
        return <Twitter size="18" />;
      case "youtube":
        return <Youtube size="18" />;
    }
  };
  return <Link href={link}>{getIcon(platform)}</Link>;
};
