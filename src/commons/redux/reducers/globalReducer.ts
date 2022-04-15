import { DEFAULT_ARTICLES_LIMIT } from '../../utils/constants';
import { RootState } from '../store';
import {
  SET_LIMIT,
  SET_LOADING,
  SET_SHOWPASSWORD,
} from './actions/globalActions';
import { ActionType } from './types';

const initialState = {
  loading: false,
  limit: DEFAULT_ARTICLES_LIMIT,
  showPassword: false,
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
    case SET_SHOWPASSWORD:
      return { ...state, showPassword: action.payload };
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

export const setShowPassword = (value: boolean) => ({
  type: SET_SHOWPASSWORD,
  payload: value,
});

export const selectLoading = (store: RootState) => store.globalReducer.loading;
export const selectLimit = (store: RootState) => store.globalReducer.limit;
export function selectShowPassword(store: RootState) {
  return store.globalReducer.showPassword;
}
