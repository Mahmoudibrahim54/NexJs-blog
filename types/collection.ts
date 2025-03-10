export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
  slug: string;
  image?: string;
  body: string;
  date_created: string;
  date_updated: string;
  media?: string;
  type:
    | "withImage"
    | "withAudio"
    | "withVideo"
    | "textOnly"
    | "videoOnly"
    | "audioOnly";
  isDummy?: boolean;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  color: string;
  posts: Post[];
  subcategories: Subcategory[];
  featured: boolean;
  translations: { title: string; description: string };
}
export interface Subcategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
  color: string;
  posts: Post[];
  featured: boolean;
  translations: { title: string; description: string };
}
