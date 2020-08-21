import * as PermissionService from '../services/permissionService';
import * as UserGroupsService from '../services/userGroupsService';
import * as AuthService from '../services/authService';

export const permissionsMiddleware = async (req, res) => {
  console.log('/////////////////////////////////////////////////////////');
  console.log(req.path);

  const token = req.headers.authorization;
  const { response } = await AuthService.getUserByToken(token);
  const permissions = await PermissionService.getPermissions();
  const groups = await UserGroupsService.getGroupsByUser(response.user.id);
  permissions.permissions[0].groups[0].access = 'denied';

  const groupsArray = groups.map((group) => group.userGroups_id);
  console.log('/////////////////////////////////////////////////////////');
  let databasesId = [];
  permissions.permissions.map((elem) => {
    let accessStatus;

    if (req.path.include('tables')) {
      accessStatus = elem.groups.filter((el) => el.access && groupsArray.indexOf(el.groupId) !== -1);
    } else {
      accessStatus = elem.groups.filter(
        (el) => (el.access === 'granted' || el.access === 'limited') && groupsArray.indexOf(el.groupId) !== -1
      );
    }

    if (accessStatus.length) {
      databasesId = [...databasesId, elem.databaseId];
    }
    return databasesId;
  });
  console.log(databasesId);

  // const data = res.data.filter((elem) => databasesId.indexOf(elem.id) !== -1);
  // console.log(data);

  // databases.map((elem) => {
  //   let index;
  //   if (elem.access === 'granted') {
  //     index = res.data.findIndex((el) => elem.databaseId === el.id);
  //     data = [...data, res.data[index]];
  //   }
  //   return data;
  // });
  res.send(res.data);
};
