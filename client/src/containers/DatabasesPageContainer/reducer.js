import { DELETE_DATABASE_SUCCESS, DELETE_DATABASE_ERROR, IS_DATABASE_LOADING } from './actionTypes';

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
      console.log('error')
      return {
        ...state,
        error: payload,
        message: payload.message,
        status: 'error',
      };
    case DELETE_DATABASE_SUCCESS: {
      console.log('success')
      return {
        ...state,
        isLoading: false,
        message: 'Data successfully updated',
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
