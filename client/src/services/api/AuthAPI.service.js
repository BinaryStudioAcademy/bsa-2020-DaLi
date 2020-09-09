import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = config.api.url;

class AuthAPIService extends baseAPIService {
  constructor() {
    super(`${API_URL}/api/auth`);
  }

  loginUser = (data) => {
    return this.postData('/login', data);
  };

  getCurrentUser = () => {
    return this.getData('/user', '');
  };

  registerUser = (data) => {
    return this.postData('/register', data);
  };

  isFirstLogIn = () => {
    return this.getData('/isFirstLogIn', '');
  };
}

export const authAPIService = new AuthAPIService();
