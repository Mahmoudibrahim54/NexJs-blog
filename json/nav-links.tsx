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
    title: "الصفحة الرئيسية",
    mobileOnly: true,
  },
  {
    id: 2,
    link: "/articles",
    title: "الفتاوى والمقالات",
    icon: <ScrollText size="30" color="#898989" />,
  },
  {
    id: 3,
    link: "/video",
    title: "فتاوى مرئية",
    icon: <Video size="30px" color="#898989" />,
  },
  {
    id: 4,
    link: "audio",
    title: "فتاوى مسموعة",
    icon: <CassetteTape size="30px" color="#898989" />,
  },
  {
    id: 5,
    link: "books",
    title: "الكتب",
    icon: <BookOpen size="30" color="#898989" />,
  },

  {
    id: 6,
    link: "/about",
    title: "عن الشيخ",
    icon: <User2 size="30" color="#898989" />,
  },
];
