import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from './actionTypes';

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

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};
