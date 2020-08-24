import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER_FROM_LIST,
  DELETE_USER,
  TOGGLE_USER_STATUS,
  IS_LOADING,
  RESET_NOTIFICATION,
} from './actionTypes';

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

export const toggleUserStatus = (payload) => {
  return {
    type: TOGGLE_USER_STATUS,
    payload,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER_FROM_LIST,
    payload,
  };
};

export const SetIsLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};

export const resetNotification = () => {
  return {
    type: RESET_NOTIFICATION,
  };
};
