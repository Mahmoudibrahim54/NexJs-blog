import { LinkType } from "@/types/links";
import { BookOpen, CassetteTape, ScrollText, User2, Video } from "lucide-react";

export const links: LinkType[] = [
  {
    id: 1,
    link: "/",
    title: "mainPage",
    mobileOnly: true,
  },
  {
    id: 2,
    link: "/articles",
    title: "articles",
    icon: <ScrollText size="30" color="var(--button-primary-color)" />,
  },
  {
    id: 3,
    link: "/video",
    title: "videos",
    icon: <Video size="30px" color="var(--button-primary-color)" />,
  },
  {
    id: 4,
    link: "records",
    title: "records",
    icon: <CassetteTape size="30px" color="var(--button-primary-color)" />,
  },
  {
    id: 5,
    link: "books",
    title: "books",
    icon: <BookOpen size="30" color="var(--button-primary-color)" />,
  },

  {
    id: 6,
    link: "/about",
    title: "about",
    icon: <User2 size="30" color="var(--button-primary-color)" />,
  },
];
