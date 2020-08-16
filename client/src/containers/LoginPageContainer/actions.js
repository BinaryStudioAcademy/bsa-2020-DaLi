import { LOGIN_USER, LOGOUT_USER } from './actionTypes';

export const login = (request) => {
  return {
    type: LOGIN_USER,
    request,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

/* export const hideUserUpdateMessage = () => {
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

 */
