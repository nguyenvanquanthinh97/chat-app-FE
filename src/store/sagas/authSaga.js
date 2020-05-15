import { takeEvery, call, put } from 'redux-saga/effects';
import { get } from 'lodash';

import { postLogin, postLogout, getUser } from '../../api';
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
    const email = get(data, 'email');
    const companyId = get(data, 'companyId');
    const img = get(data, 'img');
    const authData = {
      token,
      userId,
      username,
      email,
      companyId,
      img
    };
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    yield put(actions.authLogin(authData));
  } catch (error) {
    yield put(actions.authFail(get(error.response, 'data.message')));
  }
}

function* authCheckState() {
  try {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');

    const response = yield call(getUser, token, userId);
    const data = get(response, 'data');
    const username = get(data, 'username');
    const email = get(data, 'email');
    const companyId = get(data, 'companyId');
    const img = get(data, 'img');

    if (!token) {
      yield put(actions.authLogout());
      return;
    }
    const authData = {
      token,
      userId,
      username,
      email,
      companyId,
      img
    };
    yield put(actions.authLogin(authData));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

function* authLogout() {
  try {
    yield call(postLogout);
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('username');
    yield localStorage.removeItem('email');
    yield localStorage.removeItem('companyId');
  } catch (error) {
    yield put(actions.authFail(get(error.response, 'data.message')));
  }
}

function* authSaga() {
  yield takeEvery(AUTH.AUTH_INIT, authLogin);
  yield takeEvery(AUTH.AUTH_CHECK_STATE, authCheckState);
  yield takeEvery(AUTH.AUTH_LOGOUT, authLogout);
}

export default authSaga;