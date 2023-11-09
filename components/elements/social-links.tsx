import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export const SocialLinks = ({
  platform,
  link,
  isShareURL,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size="20" />;
      case "twitter":
        return <Twitter size="20" />;
      case "youtube":
        return <Youtube size="20" />;

      case "linkedin":
        return <Linkedin size="20" />;
    }
  };
  return (
    <Link href={link || "/"}>
      <div
        className={`${
          isShareURL
            ? "rounded-md bg-slate-200 px-3  py-2 text-neutral-600 transition-colors duration-100 ease-in-out hover:bg-neutral-800 hover:text-neutral-600"
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};
