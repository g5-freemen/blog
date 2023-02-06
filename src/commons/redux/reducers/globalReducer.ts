import { DEFAULT_ARTICLES_LIMIT } from '../../utils/constants';
import { RootState } from '../store';
import {
  SET_LIMIT,
  SET_LOADING_ARTICLES,
  SET_LOADING_TAGS,
  SET_SHOWPASSWORD,
} from './actions/globalActions';
import { ActionType } from './types';

const initialState = {
  loadingArticles: false,
  loadingTags: false,
  limit: DEFAULT_ARTICLES_LIMIT,
  showPassword: false,
};

export default function globalReducer(state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case SET_LOADING_ARTICLES: {
      return { ...state, loadingArticles: action.payload };
    }
    case SET_LOADING_TAGS: {
      return { ...state, loadingTags: action.payload };
    }
    case SET_LIMIT: {
      return { ...state, limit: action.payload };
    }
    case SET_SHOWPASSWORD: {
      return { ...state, showPassword: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const setLoadingArticles = (value: boolean) => ({
  type: SET_LOADING_ARTICLES,
  payload: value,
});

export const setLoadingTags = (value: boolean) => ({
  type: SET_LOADING_TAGS,
  payload: value,
});

export const setLimit = (value: number) => ({
  type: SET_LIMIT,
  payload: value,
});

export const setShowPassword = (value: boolean) => ({
  type: SET_SHOWPASSWORD,
  payload: value,
});

export const selectLimit = (store: RootState) => store.globalReducer.limit;
export function selectLoadingArticles(store: RootState) {
  return store.globalReducer.loadingArticles;
}
export function selectLoadingTags(store: RootState) {
  return store.globalReducer.loadingTags;
}
export function selectShowPassword(store: RootState) {
  return store.globalReducer.showPassword;
}
