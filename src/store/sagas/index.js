import { all } from 'redux-saga/effects';

import authSaga from './authSaga';

export default function* watchAll() {
  yield all([
    authSaga()
  ]);
}