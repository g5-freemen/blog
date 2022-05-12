import { takeEvery, put } from 'redux-saga/effects';
// import { sagaActions } from './sagaActions';
import { SET_TAGS } from './reducers/actions/feedActions';

export function* fetchDataSaga() {
  try {
    console.log(SET_TAGS);
    // let result = yield call(() => {});
    // yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: 'TODO_FETCH_FAILED' });
  }
}

export default function* rootSaga() {
  // yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
  yield takeEvery(SET_TAGS, fetchDataSaga);
}
