export interface ResponsePosts {
  id: number;
  title: string;
  text: string;
  image: string;
  user_tag: string;
}

export interface CreatePost {
  title: string;
  text: string;
  image: string | ArrayBuffer | null;
  user_tag: string;
}
