import { AUTH } from '../actionTypes';
import { get } from 'lodash';

const initialState = {
  token: null,
  userId: null,
  username: null,
  avatar: null,
  email: null,
  companyId: null,
  img: null,
  error: null,
  loading: false,
  isLogin: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AUTH.AUTH_SUCCESS:
      return {
        ...state,
        token: get(action.authData, 'token', null),
        userId: get(action.authData, 'userId', null),
        username: get(action.authData, 'username', null),
        email: get(action.authData, 'email', null),
        companyId: get(action.authData, 'companyId', null),
        img: get(action.authData, 'img', null),
        loading: false,
        isLogin: true
      };
    case AUTH.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: get(action, 'error')
      };
    case AUTH.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        username: null,
        email: null,
        companyId: null,
        img: null,
        isLogin: false
      };
    default:
      return state;
  }
};

export default reducer;