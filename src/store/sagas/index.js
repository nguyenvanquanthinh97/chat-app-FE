import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import chatSaga from './chatSaga';

export default function* watchAll() {
  yield all([
    authSaga(),
    chatSaga()
  ]);
}