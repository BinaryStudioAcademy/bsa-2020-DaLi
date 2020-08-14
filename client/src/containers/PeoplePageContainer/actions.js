import { GET_USERS, ADD_USER, DELETE_USER, IS_LOADING, RESET_ERROR } from './actionTypes';

export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id,
  };
};

export const addUser = (user) => {
  console.log('add user action');
  return {
    type: ADD_USER,
    user,
  };
};

export const SetIsLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};
