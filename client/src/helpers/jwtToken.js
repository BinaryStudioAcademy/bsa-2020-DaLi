export const setToken = (token, rememberMe = false) => {
  return rememberMe ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
};
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};
export const removeToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};
