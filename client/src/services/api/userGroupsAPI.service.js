import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/user-groups`;

class UserGroupsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getUserGroups = () => this.getData('');

  getUserGroup = (id) => this.getDataById(`/${id}`);

  createUserGroup = (newUserGroup) => this.postData('', newUserGroup);

  updateUserGroup = (id, updatedUserGroup) => this.patchData(`/${id}`, updatedUserGroup);

  deleteUserGroup = (id) => this.deleteData(`${id}`);
}
export const userGroupsAPIService = new UserGroupsAPIService();
