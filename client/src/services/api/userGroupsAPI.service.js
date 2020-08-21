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

  addUserToGroup = (userGroupsId, usersId) => this.postData(`/${userGroupsId}`, { users_id: usersId });

  deleteUserFromGroup = (userGroupsId, usersUserGroupsId) => this.deleteData(`/${userGroupsId}`, { usersUserGroupsId });
}
export const userGroupsAPIService = new UserGroupsAPIService();
