import { ArticleType } from '../../components/Article/Article';

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestType = {
  method?: MethodType;
  headers: {
    'Content-Type': string;
    Authorization?: string;
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
