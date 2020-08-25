import { ADD_DATABASE_ERROR, ADD_DATABASE_HIDE } from './actionTypes';

const initialState = {
  isNotification: false,
  message: '',
  status: 'error',
};

const connectionDatabaseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DATABASE_ERROR:
      return {
        ...state,
        isNotification: true,
        message: payload.message,
        status: 'error',
      };
    case ADD_DATABASE_HIDE:
      return {
        ...state,
        isNotification: false,
      };
    default:
      return state;
  }
};

export default connectionDatabaseReducer;
