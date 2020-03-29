import { takeEvery, call, put } from 'redux-saga/effects';
import { get } from 'lodash';

import { postLogin } from '../../api';
import { AUTH } from '../actionTypes';
import * as actions from '../actions';

function* authLogin(action) {
  try {
    yield put(actions.authStart());
    const response = yield call(postLogin, get(action, 'email'), get(action, 'password'));
    const data = get(response, 'data');
    const token = get(data, 'token');
    const userId = get(data, 'userId');
    const username = get(data, 'username');
    const companyId = get(data, 'companyId');
    const authData = {
      token,
      userId,
      username,
      companyId
    };
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('companyId', companyId);
    yield put(actions.authLogin(authData));
  } catch (error) {
    yield put(actions.authFail(get(error.response, 'data.message')));
  }
}

function* authSaga() {
  yield takeEvery(AUTH.AUTH_INIT, authLogin);
}

export default authSaga;