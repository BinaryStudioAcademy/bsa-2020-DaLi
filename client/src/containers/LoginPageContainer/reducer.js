import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './actionTypes';

const initialState = {
  user: '',
  error: '',
  isAuthorized: false,
  token: '',
  updateUserMessage: '',
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        error: '',
        isAuthorized: Boolean(payload.user),
        isLoading: false,
        token: payload.token,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        error: '',
        isAuthorized: false,
        isLoading: false,
        token: '',
      };
    }
    case LOGIN_USER_ERROR:
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        error: payload.message,
        isLoading: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const { firstName, lastName, email, id } = payload;
      return {
        ...state,
        user: {
          firstName,
          lastName,
          email,
          id,
        },
        updateUserMessage: 'Data successfully updated',
        updateUserStatus: 'success',
      };
    }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserMessage: payload.message,
        updateUserStatus: 'error',
      };
    default:
      return state;
  }
};

export default loginReducer;
