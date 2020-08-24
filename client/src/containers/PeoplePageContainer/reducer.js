import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  IS_LOADING,
  RESET_NOTIFICATION,
} from './actionTypes';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  message: '',
  status: '',
};

const usersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS: {
      const users = [...payload].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        users,
      };
    }
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USERS_ERROR: {
      return {
        ...state,
        error: payload,
        message: payload.message,
        status: 'error',
      };
    }
    case ADD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Data successfully updated',
        status: 'success',
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        message: null,
        status: null,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default usersListReducer;
