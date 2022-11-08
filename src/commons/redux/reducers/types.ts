import { ArticleType } from '../../components/Article/Article';

export type ActionType = {
  type?: string;
  payload?: any;
};

export type UserType = {
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
};

export type State = {
  tags: string[] | string;
  articles: ArticleType[] | string;
  articlesCount: number;
  page: number;
  activePill: string;
};
