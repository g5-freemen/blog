import { ArticleType } from '../components/Article/Article';
import { RootState } from './store';

const SET_TAGS = 'SET_TAGS';
const SET_ARTICLES = 'SET_ARTICLES';

type ActionType = {
  type?: string;
  payload?: any;
};

// ArticleType[] | null

const initialState = {
  tags: [],
  articles: [],
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
    default:
      return state;
  }
}

export const setTags = (value: string[] | null) => ({
  type: SET_TAGS,
  payload: value,
});

export const setArticles = (value: ArticleType[] | null) => ({
  type: SET_ARTICLES,
  payload: value,
});

export const selectTags = (store: RootState) => store.tags;
export const selectArticles = (store: RootState) => store.articles;
