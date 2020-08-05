import baseAPIService from './baseAPI.service';

class UserAPIService extends baseAPIService {
  constructor() {
    super('http://localhost:5000/');
  }
}

export const userAPIService = new UserAPIService();
