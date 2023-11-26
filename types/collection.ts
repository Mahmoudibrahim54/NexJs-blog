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
}
