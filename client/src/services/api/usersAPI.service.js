import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/users`;

class UsersAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getUsers = () => this.getData('');

  createUser = (newUser) => this.postData('', newUser);

  updateUser = (id, updatedUser) => this.patchData(`/${id}`, updatedUser);

  toggleUserStatus = async (id, user) => {
    const updatedStatus = !user.isActive;
    const updatedUser = { ...user, isActive: updatedStatus };
    await this.patchData(`/${id}`, updatedUser);
  };

  deleteUser = (id) => this.deleteData(`${id}`);
}
export const usersAPIService = new UsersAPIService();
