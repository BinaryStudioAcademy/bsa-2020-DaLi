import { LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT_USER_SUCCESS, LOGOUT_USER_ERROR } from './actionTypes';

const initialState = {
  user: '',
  isAuthorized: false,
  isLoading: false,
  token: '',
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        isAuthorized: Boolean(payload.user),
        isLoading: true,
        token: payload.token,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        isAuthorized: false,
        isLoading: true,
        token: '',
      };
    }
    case LOGIN_USER_ERROR:
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
