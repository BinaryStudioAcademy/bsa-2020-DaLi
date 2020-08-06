import { LOGIN_USER } from './actionTypes';

export const loginUser = (request) => {
  return {
    type: LOGIN_USER,
    request,
  };
};
