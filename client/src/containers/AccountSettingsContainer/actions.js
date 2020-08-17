import { UPDATE_USER, HIDE_USER_UPDATE_MESSAGE, UPDATE_USER_ERROR } from './actionTypes';

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const hideUserUpdateMessage = () => {
  return {
    type: HIDE_USER_UPDATE_MESSAGE,
  };
};

export const updateUserError = (payload) => {
  return {
    type: UPDATE_USER_ERROR,
    payload,
  };
};
