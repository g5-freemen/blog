import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import feedReducer from './reducers/feedReducer';
import globalReducer from './reducers/globalReducer';
import userReducer from './reducers/userReducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  globalReducer,
  feedReducer,
  userReducer,
});
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
