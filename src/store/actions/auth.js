import { AUTH } from '../actionTypes';

export const authInit = (email, password) => ({
  type: AUTH.AUTH_INIT,
  email: email,
  password: password
})

export const authStart = () => ({
  type: AUTH.AUTH_START
});

export const authLogin = (authData) => ({
  type: AUTH.AUTH_SUCCESS,
  authData: authData
});

export const authFail = (error) => ({
  type: AUTH.AUTH_FAIL,
  error: error
});

export const authLogout = () => ({
  type: AUTH.AUTH_LOGOUT
});
