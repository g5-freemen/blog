export type CommentType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: null | string;
    image: string;
    following: boolean;
  };
};

export type ArticleType = {
  author: {
    bio: null | string;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin';
export type RequestCredentials = 'same-origin' | 'include' | 'omit';
export type ReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export type RequestType = {
  method?: MethodType;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  referrerPolicy?: ReferrerPolicy;
  headers: {
    'Content-Type': string;
    Authorization?: string;
    'Cache-Control'?: string;
    Pragma?: string;
    Expires?: string;
  };
  body?: string;
};

export type ErrorType = {
  message: string;
};

export type UpdateUserType = {
  email?: string;
  username?: string;
  password?: string;
  bio?: string | null;
  image?: string | null;
};

export interface IArticles {
  articles: ArticleType[];
  articlesCount: number;
}

export type UserProfileType = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type ProfileResponse = { profile: UserProfileType };
