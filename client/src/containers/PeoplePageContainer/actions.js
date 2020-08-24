import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER_FROM_LIST,
  DELETE_USER,
  IS_LOADING,
  SET_TEMPORARY_PASSWORD,
  TOGGLE_USER_STATUS,
  CLEAR_TEMPORARY_PASSWORD,
  RESET_PASSWORD,
  GET_MEMBERSHIPS,
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

export const setTemporaryPassword = (payload) => {
  return {
    type: SET_TEMPORARY_PASSWORD,
    payload,
  };
};

export const clearTemporaryPassword = () => {
  return {
    type: CLEAR_TEMPORARY_PASSWORD,
  };
};

export const resetPassword = (id) => {
  return {
    type: RESET_PASSWORD,
    id,
  };
};

export const getMembership = () => {
  return {
    type: GET_MEMBERSHIPS,
  };
};
