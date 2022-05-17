import { takeEvery, put } from 'redux-saga/effects';
import { SET_ARTICLES, SET_TAGS } from './reducers/actions/feedActions';
import {
  SET_LOADING_ARTICLES,
  SET_LOADING_TAGS,
} from './reducers/actions/globalActions';

export function* finishLoading(val: string) {
  const loadedType = val === 'tags' ? SET_LOADING_TAGS : SET_LOADING_ARTICLES;
  yield put({ type: loadedType, payload: false });
}

export default function* rootSaga() {
  yield takeEvery(SET_ARTICLES, () => finishLoading('articles'));
  yield takeEvery(SET_TAGS, () => finishLoading('tags'));
}
