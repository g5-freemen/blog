import { ArticleType } from '../../components/Article/Article';
import { RootState } from '../store';
import { SET_ACTIVE_PILL, SET_ARTICLES, SET_TAGS } from './actions/feedActions';
import { ActionType } from './types';

const initialState = {
  tags: [],
  articles: [],
  activePill: undefined,
};

export default function feedReducer(
  state = initialState,
  action: ActionType = {},
) {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_ACTIVE_PILL:
      return { ...state, activePill: action.payload };
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

export const setActivePill = (value: string | undefined) => ({
  type: SET_ACTIVE_PILL,
  payload: value,
});

export const selectTags = (store: RootState) => store.feedReducer.tags;
export const selectArticles = (store: RootState) => store.feedReducer.articles;
export function selectActivePill(store: RootState) {
  return store.feedReducer.activePill;
}
