import { NavLinks } from "@/types/links";

import {
  Home,
  Feed,
  Videocam,
  GraphicEq,
  Person,
  CollectionsBookmark,
} from "@mui/icons-material";

const fontSizeOne = "35px";
const color = " var(--button-primary-color)";

export const links: NavLinks = {
  mainPage: {
    id: 1,
    link: "/",
    title: "mainPage",
    icon: <Home sx={{ color: color, fontSize: fontSizeOne }} />,
  },
  articles: {
    id: 2,
    link: "/articles",
    title: "articles",
    icon: <Feed sx={{ color: color, fontSize: fontSizeOne }} />,
  },
  videos: {
    id: 3,
    link: "/videos",
    title: "videos",
    icon: <Videocam sx={{ color: color, fontSize: fontSizeOne }} />,
  },
  records: {
    id: 4,
    link: "/records",
    title: "records",
    icon: <GraphicEq sx={{ color: color, fontSize: fontSizeOne }} />,
  },
  books: {
    id: 5,
    link: "/books",
    title: "books",
    icon: <CollectionsBookmark sx={{ color: color, fontSize: fontSizeOne }} />,
  },

  about: {
    id: 6,
    link: "/about",
    title: "about",
    icon: <Person sx={{ color: color, fontSize: fontSizeOne }} />,
  },
};
