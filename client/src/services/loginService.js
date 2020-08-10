// import { LOGIN_API_ENDPOINT } from '../config/API';
import callApi from '../helpers/callApi';

export const loginService = async (request) => {
  const response = await callApi({
    endpoint: 'http://localhost:5000/api/auth/login',
    type: 'POST',
    request,
  });
  return response.json();
};

export const getCurrentUserService = async () => {
  try {
    const response = await callApi({
      endpoint: 'http://localhost:5000/api/auth/user',
      type: 'GET',
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
