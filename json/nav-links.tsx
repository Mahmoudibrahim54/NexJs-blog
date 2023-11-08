import { BookOpen, CassetteTape, ScrollText, User2, Video } from "lucide-react";
import { JsxElement } from "typescript";

interface LinkType {
  id: number;
  link: string;
  title: string;
  icon?: JSX.Element;
  mobileOnly?: boolean;
}

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
    icon: <ScrollText size="30" color="#898989" />,
  },
  {
    id: 3,
    link: "/video",
    title: "videos",
    icon: <Video size="30px" color="#898989" />,
  },
  {
    id: 4,
    link: "records",
    title: "records",
    icon: <CassetteTape size="30px" color="#898989" />,
  },
  {
    id: 5,
    link: "books",
    title: "books",
    icon: <BookOpen size="30" color="#898989" />,
  },

  {
    id: 6,
    link: "/about",
    title: "about",
    icon: <User2 size="30" color="#898989" />,
  },
];
