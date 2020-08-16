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
  RESET_ERROR,
} from './actionTypes';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: payload,
      };
    }
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USERS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case ADD_USER_SUCCESS:
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
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
    case RESET_ERROR: {
      return {
        ...state,
        error: null,
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
