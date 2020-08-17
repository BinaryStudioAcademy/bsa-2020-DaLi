import { DELETE_DATABASE, IS_DATABASE_LOADING } from './actionTypes';

export const deleteDatabase = (id) => {
  return {
    type: DELETE_DATABASE,
    payload: { id },
  };
};

export const SetIsLoading = (payload) => {
  return {
    type: IS_DATABASE_LOADING,
    payload,
  };
};
