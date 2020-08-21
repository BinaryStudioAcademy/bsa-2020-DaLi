import * as PermissionService from '../services/permissionService';
import * as UserGroupsService from '../services/userGroupsService';

export const permissionsMiddleware = async (req, res) => {
  console.log('/////////////////////////////////////////////////////////');

  // console.log(UsersUserGroupsRepository);
  const userId = '8c88104c-09a0-4a4b-ab60-68ab3a40e66b';
  const permissions = await PermissionService.getPermissions();
  const groups = await UserGroupsService.getGroupsByUser(userId);
  const userGroup = await UserGroupsService.getUserGroup({
    id: '91051fbd-8778-4279-a9b7-74f22f309297',
    // id: '66f6f47c-71c1-4c15-8018-ff056b180957',
  });
  console.log('/////////////////////////////////////////////////////////');
  console.log(groups);
  let databases;
  permissions.permissions.map((elem) => {
    if (elem.groupId === userGroup.id) {
      databases = elem.databases;
    }
    return databases;
  });
  let data = [];
  databases.map((elem) => {
    let index;
    if (elem.access === 'granted') {
      index = res.data.findIndex((el) => elem.databaseId === el.id);
      data = [...data, res.data[index]];
    }
    return data;
  });
  console.log(data);
  res.send(data);
};
