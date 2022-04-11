import { DEFAULT_ARTICLES_LIMIT } from '../../utils/constants';
import { RootState } from '../store';
import { SET_LIMIT, SET_LOADING } from './actions/globalActions';
import { ActionType } from './types';

const initialState = {
  loading: false,
  articlesLimit: DEFAULT_ARTICLES_LIMIT,
};

export default function globalReducer(
  state = initialState,
  action: ActionType = {},
) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
}

export const setLoading = (value: boolean) => ({
  type: SET_LOADING,
  payload: value,
});

export const setLimit = (value: number) => ({
  type: SET_LIMIT,
  payload: value,
});

export const selectLoading = (store: RootState) => store.globalReducer.loading;
export function selectLimit(store: RootState) {
  return store.globalReducer.articlesLimit;
}
