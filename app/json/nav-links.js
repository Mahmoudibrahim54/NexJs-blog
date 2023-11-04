import { BookOpen, CassetteTape, ScrollText, User2, Video } from "lucide-react";

export const links = [
  {
    id: 1,
    link: "/articles",
    title: "الفتاوى والمقالات",

    icon: <ScrollText size="30" color="#898989" />,
  },
  {
    id: 2,
    link: "/video",
    title: "فتاوى مرئية",
    icon: <Video size="30px" color="#898989" />,
  },
  {
    id: 3,
    link: "audio",
    title: "فتاوى مسموعة",
    icon: <CassetteTape size="30px" color="#898989" />,
  },
  {
    id: 4,
    link: "books",
    title: "الكتب",
    icon: <BookOpen size="30" color="#898989" />,
  },

  {
    id: 5,
    link: "/about",
    title: "عن الشيخ",
    icon: <User2 size="30" color="#898989" />,
  },
];
