import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = config.api.url;

class UserAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  updateUserData = (userId, data) => {
    return this.patchData(`/api/users/${userId}`, data);
  };
}

export const userAPIService = new UserAPIService();
