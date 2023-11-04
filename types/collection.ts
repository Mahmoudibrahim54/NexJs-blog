export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  slug: string;
  image?: string;
  body: string;
  date_created: string;
  date_updated: string;
  file?: string;
  type: "textOnly" | "videoOnly" | "textWithImage" | "textWithAudio";
  isDummy?: boolean;
}
export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  color: string;
}
