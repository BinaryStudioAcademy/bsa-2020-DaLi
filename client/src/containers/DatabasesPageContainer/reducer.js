import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_ERROR,
  IS_DATABASE_LOADING,
  GET_DATABASES_ERROR,
  GET_DATABASES_SUCCESS,
  ADD_DATABASE_ERROR,
} from './actionTypes';

const initialState = {
  databases: [],
  isLoading: false,
  error: null,
  message: '',
  status: '',
};

const databasesListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_DATABASE_ERROR:
    case GET_DATABASES_ERROR:
    case ADD_DATABASE_ERROR:
      return {
        ...state,
        error: payload,
        message: payload.message,
        status: 'error',
      };

    case DELETE_DATABASE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Data successfully updated',
        status: 'success',
      };
    }
    case GET_DATABASES_SUCCESS: {
      return {
        ...state,
        databases: payload,
        isLoading: false,
        status: 'success',
      };
    }
    case IS_DATABASE_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default databasesListReducer;
