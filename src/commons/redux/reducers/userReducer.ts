import { RootState } from '../store';
import { SET_USER } from './actions/userActions';
import { ActionType, UserType } from './types';

const initialState = {
  user: undefined,
};

export default function rootReducer(
  state = initialState,
  action: ActionType = {},
) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const setUser = (value: UserType | null) => ({
  type: SET_USER,
  payload: value,
});

export const selectUser = (store: RootState) => store.userReducer.user;
