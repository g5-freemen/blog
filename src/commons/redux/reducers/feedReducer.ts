import { ArticleType } from '../../utils/httpServices/types';
import { RootState } from '../store';
import {
  SET_ACTIVE_PILL,
  SET_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_ARTICLES_PAGE,
  SET_TAGS,
} from './actions/feedActions';
import { ActionType, State } from './types';

const initialState: State = {
  tags: [],
  articles: [],
  articlesCount: 0,
  page: 1,
  activePill: 'Global',
};

export default function feedReducer(state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case SET_TAGS: {
      return { ...state, tags: action.payload };
    }
    case SET_ARTICLES: {
      return { ...state, articles: action.payload };
    }
    case SET_ARTICLES_COUNT: {
      return { ...state, articlesCount: action.payload };
    }
    case SET_ARTICLES_PAGE: {
      return { ...state, page: action.payload };
    }
    case SET_ACTIVE_PILL: {
      return { ...state, activePill: action.payload };
    }
    default: {
      return state;
    }
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

export const setArticlesCount = (value: number) => ({
  type: SET_ARTICLES_COUNT,
  payload: value,
});

export const setPage = (value: number) => ({
  type: SET_ARTICLES_PAGE,
  payload: value,
});

export const setActivePill = (value: string) => ({
  type: SET_ACTIVE_PILL,
  payload: value,
});

export const selectTags = (store: RootState) => store.feedReducer.tags;
export const selectPage = (store: RootState): number => store.feedReducer.page;
export const selectArticles = (store: RootState) => store.feedReducer.articles;
export function selectArticlesCount(store: RootState) {
  return store.feedReducer.articlesCount;
}
export function selectActivePill(store: RootState) {
  return store.feedReducer.activePill;
}
