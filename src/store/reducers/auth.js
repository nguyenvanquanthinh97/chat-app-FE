import { AUTH } from '../actionTypes';
import { get } from 'lodash';

const initialState = {
  token: null,
  userId: null,
  username: null,
  companyId: null,
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
        companyId: get(action.authData, 'companyId', null),
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
        companyId: null,
        isLogin: false
      };
    default:
      return state;
  }
};

export default reducer;