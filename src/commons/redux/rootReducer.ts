import { ArticleType } from '../components/Article/Article';
import { DEFAULT_ARTICLES_LIMIT } from '../utils/constants';
import { RootState } from './store';

const SET_TAGS = 'SET_TAGS';
const SET_ARTICLES = 'SET_ARTICLES';
const SET_LOADING = 'SET_LOADING';
const SET_LIMIT = 'SET_LIMIT';
const SET_USER = 'SET_USER';

type ActionType = {
  type?: string;
  payload?: any;
};

export type UserType = {
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
};

const initialState = {
  tags: [],
  articles: [],
  loading: false,
  limit: DEFAULT_ARTICLES_LIMIT,
  user: undefined,
};

export default function rootReducer(
  state = initialState,
  action: ActionType = {},
) {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const setTags = (value: string[] | string) => ({
  type: SET_TAGS,
  payload: value,
});

export const setArticles = (value: ArticleType[] | string) => ({
  type: SET_ARTICLES,
  payload: value,
});

export const setLoading = (value: boolean) => ({
  type: SET_LOADING,
  payload: value,
});

export const setLimit = (value: number) => ({
  type: SET_LIMIT,
  payload: value,
});

export const setUser = (value: UserType) => ({
  type: SET_USER,
  payload: value,
});

export const selectTags = (store: RootState) => store.tags;
export const selectArticles = (store: RootState) => store.articles;
export const selectLoading = (store: RootState) => store.loading;
export const selectLimit = (store: RootState) => store.limit;
export const selectUser = (store: RootState) => store.user;
